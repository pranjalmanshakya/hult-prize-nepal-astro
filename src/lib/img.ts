import type { ImageMetadata } from 'astro';

const photos = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.{jpg,png}', { eager: true });
// Sharper, larger copies of small photos, made by scripts/upscale-photos.mjs.
const photosHd = import.meta.glob<{ default: ImageMetadata }>('../assets/photos-hd/*.jpg', { eager: true });
const sdgIcons = import.meta.glob<{ default: ImageMetadata }>('../assets/sdg/*.png', { eager: true });
const brandArt = import.meta.glob<{ default: ImageMetadata }>('../assets/brand/*.{jpg,png}', { eager: true });

function find(set: Record<string, { default: ImageMetadata }>, name: string, kind: string): ImageMetadata {
  const hit = Object.entries(set).find(([path]) => path.split('/').pop()!.replace(/\.(jpg|png)$/, '') === name);
  if (!hit) throw new Error(`Missing ${kind}: ${name}`);
  return hit[1].default;
}

/**
 * Look up a photo in src/assets/photos by file name without extension.
 * Uses the sharper copy from src/assets/photos-hd when there is one.
 */
export const photo = (name: string) => {
  const hd = Object.entries(photosHd).find(([path]) => path.endsWith(`/${name}.jpg`));
  return hd ? hd[1].default : find(photos, name, 'photo');
};

/** Look up a logo or artwork in src/assets/brand by file name without extension. */
export const brand = (name: string) => find(brandArt, name, 'brand image');

/** SDG icon 1–17 from the Hult Prize Nepal proposal. */
export function sdgIcon(n: number): ImageMetadata {
  const key = `../assets/sdg/sdg-${String(n).padStart(2, '0')}.png`;
  const hit = sdgIcons[key];
  if (!hit) throw new Error(`Missing SDG icon ${n}`);
  return hit.default;
}
