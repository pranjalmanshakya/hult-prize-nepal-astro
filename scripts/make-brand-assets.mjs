// Generates the favicon set and one social share image per page.
//
//   node scripts/make-brand-assets.mjs
//
// Run it again whenever a page is added to src/data/pages.ts or a share
// headline changes. The results are written to public/ and committed, so the
// site build itself never depends on this script.
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';
import { allPages } from '../src/data/pages.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const at = (...p) => path.join(root, ...p);
const font = (dir, file) => at('node_modules/@expo-google-fonts/figtree', dir, file);
const FONT_BLACK = font('900Black', 'Figtree_900Black.ttf');
const FONT_BOLD = font('700Bold', 'Figtree_700Bold.ttf');

const INK = '#150007', HERITAGE = '#FF3298', PURPLE = '#8A2890', SUN = '#FDD40E';
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Render text with Figtree, shrinking it if it would be wider than maxWidth. */
async function text(markup, fontfile, px, maxWidth) {
  const render = (size) => sharp({ text: { text: markup, font: `Figtree ${size}`, fontfile, rgba: true, dpi: 72, spacing: -4 } }).png().toBuffer({ resolveWithObject: true });
  let out = await render(px);
  if (out.info.width > maxWidth) out = await render(Math.floor((px * maxWidth) / out.info.width));
  return out;
}

/* ---------- The arch from the logo, cropped out of the logo file ---------- */
// In the logo file the gradient is semi-transparent towards the top, which makes it
// fade away on a dark tile. Each row is brought up to full opacity (keeping the
// soft edge of the curve) so the icon stays readable at 16 pixels.
async function mark(size) {
  const { data, info } = await sharp(at('src/assets/brand/logo-mark-light.png')).extract({ left: 263, top: 0, width: 178, height: 178 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let y = 0; y < info.height; y++) {
    let max = 0;
    for (let x = 0; x < info.width; x++) max = Math.max(max, data[(y * info.width + x) * 4 + 3]);
    if (!max) continue;
    for (let x = 0; x < info.width; x++) { const i = (y * info.width + x) * 4 + 3; data[i] = Math.round((data[i] / max) * 255); }
  }
  return sharp(data, { raw: info }).resize(size, size).png().toBuffer();
}

/* ---------- Favicons ---------- */
async function icon(size, { pad = 0.2, radius = 0.22 } = {}) {
  const inner = Math.round(size * (1 - pad * 2));
  const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${size * radius}" fill="${INK}"/></svg>`);
  return sharp(bg).composite([{ input: await mark(inner), left: Math.round((size - inner) / 2), top: Math.round((size - inner) / 2) }]).png().toBuffer();
}
function ico(pngs) {
  const head = Buffer.alloc(6 + 16 * pngs.length);
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(pngs.length, 4);
  let offset = head.length;
  pngs.forEach(({ size, data }, i) => {
    const e = 6 + i * 16;
    head.writeUInt8(size, e); head.writeUInt8(size, e + 1); head.writeUInt8(0, e + 2); head.writeUInt8(0, e + 3);
    head.writeUInt16LE(1, e + 4); head.writeUInt16LE(32, e + 6); head.writeUInt32LE(data.length, e + 8); head.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([head, ...pngs.map((p) => p.data)]);
}

/* ---------- Share images (1200 x 630) ---------- */
async function shareImage(page) {
  const W = 1200, H = 630, M = 72;
  // Ink panel with the logo arch in the City Pop gradient, bottom right.
  const aw = 300, ah = 330, ax = W - M - aw, ay = H - ah;
  const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${HERITAGE}"/><stop offset="1" stop-color="${PURPLE}"/></linearGradient></defs>
    <rect width="${W}" height="${H}" fill="${INK}"/>
    <path fill="url(#g)" d="M${ax} ${ay} H${ax + aw} V${ay + ah * 0.06} A${aw * 0.56} ${ah * 0.94} 0 0 0 ${ax + aw * 0.44} ${ay + ah} H${ax} Z"/>
  </svg>`);
  const logo = await sharp(at('src/assets/brand/logo-mark-light.png')).resize({ height: 84 }).png().toBuffer();
  const kicker = await text(`<span foreground="${SUN}" letter_spacing="3000">EF HULT PRIZE NEPAL  ·  2026–27 SEASON</span>`, FONT_BOLD, 26, 760);
  const headline = await text(`<span foreground="#FFFFFF">${esc(page.share[0])}</span>\n<span foreground="${HERITAGE}">${esc(page.share[1])}</span>`, FONT_BLACK, 86, 760);
  const top = H - M - headline.info.height;
  return sharp(bg).composite([
    { input: logo, left: M, top: M },
    { input: kicker.data, left: M, top: top - kicker.info.height - 22 },
    { input: headline.data, left: M, top },
  ]).png({ compressionLevel: 9, palette: true, quality: 90 }).toBuffer();
}

await mkdir(at('public/og'), { recursive: true });
await writeFile(at('public/favicon.ico'), ico(await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await icon(size, { pad: 0.12 }) })))));
await writeFile(at('public/icon-192.png'), await icon(192));
await writeFile(at('public/icon-512.png'), await icon(512));
await writeFile(at('public/apple-touch-icon.png'), await icon(180, { radius: 0 }));
for (const page of allPages) {
  await writeFile(at('public/og', `${page.slug}.png`), await shareImage(page));
  console.log('share image:', page.slug);
}
console.log('done');
