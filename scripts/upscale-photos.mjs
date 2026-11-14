// Makes sharper, larger copies of the small photos in src/assets/photos.
//
//   npm run upscale-photos
//
// Many of the event photos came in very small (some only about 220 pixels wide),
// so they look soft when shown at full size. This enlarges each photo narrower
// than 1000 pixels with a high-quality resampling filter, cleans up compression
// noise, and sharpens edges. The results go to src/assets/photos-hd/ with the
// same file names; the originals are never changed. src/lib/img.ts uses the HD
// copy whenever one exists.
//
// This cannot recover detail that was never in the original. For true HD,
// replace the file in src/assets/photos with a larger original and run this again.
import { mkdir, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'src/assets/photos');
const outDir = path.join(root, 'src/assets/photos-hd');
const TARGET = 1000;
await mkdir(outDir, { recursive: true });

// Portraits of the national team are left alone: they are already large enough,
// and noise cleaning can smudge faces.
const skip = /^(nc|ncc|dnc)-/;
for (const file of (await readdir(srcDir)).filter((f) => /\.(jpe?g|png)$/i.test(f) && !skip.test(f))) {
  const input = path.join(srcDir, file);
  const { width, height } = await sharp(input).metadata();
  if (width >= TARGET) continue;
  const factor = Math.min(4, Math.ceil(TARGET / width));
  let img = sharp(input).resize(width * factor, height * factor, { kernel: 'lanczos3' });
  // Strong enlargements also need compression blocks smoothed before sharpening.
  if (factor >= 3) img = img.median(3);
  img = img.sharpen({ sigma: factor >= 3 ? 1.6 : 1.0, m1: 1.0, m2: factor >= 3 ? 2.2 : 1.6 }).modulate({ saturation: 1.04 });
  await img.jpeg({ quality: 92, mozjpeg: true }).toFile(path.join(outDir, file.replace(/\.png$/i, '.jpg')));
  console.log(`${file}: ${width}x${height} -> ${width * factor}x${height * factor}`);
}
