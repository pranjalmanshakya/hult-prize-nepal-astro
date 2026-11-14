// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // The public address of the site. Canonical tags, the sitemap, robots.txt,
  // llms.txt, share images and structured data are all built from this one value.
  // When the custom domain is connected, change it here and rebuild.
  site: 'https://efhultprizenepal.netlify.app',
  // Clean URLs: every page is a folder (/about/, /team/), always with a trailing slash.
  trailingSlash: 'always',
  build: { format: 'directory' },
  vite: {
    // No source maps in the production build.
    build: { sourcemap: false },
  },
});
