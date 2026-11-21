// The blurred photo behind each page. Keys are page slugs from src/data/pages.ts;
// values are file names (without extension) from src/assets/photos, or
// "art-confetti" from src/assets/brand.
//
// The blurred versions are made by `npm run brand-assets` and saved as
// public/bg/<slug>.jpg. Run it again after changing this list.
export const backdrops: Record<string, string> = {
  home: 'ef-hult-community',
  about: 'global-flags',
  challenge: 'art-confetti',
  compete: 'global-pitch',
  nepal: 'event-hall',
  team: 'hpn-team',
  champions: 'g-trophy',
  awards: 'global-celebrate',
  campuses: 'g-group',
  host: 'event-speaker',
  nationals: 'event-panelists',
  partners: 'global-celebrate',
  gallery: 'g-panel',
  faq: 'global-workshop',
  contact: 'summit-4',
  sources: 'global-hp23',
  legal: 'summit-2',
};

/** Path of the blurred background for a page, falling back to the home one. */
export const backdropFor = (slug: string) => `/bg/${slug in backdrops ? slug : 'home'}.jpg`;
