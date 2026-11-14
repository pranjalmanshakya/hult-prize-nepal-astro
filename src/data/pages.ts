// One entry per page. The header, footer, breadcrumbs, "keep exploring" links,
// sitemap.xml, llms.txt and the share images are all built from this list,
// so a page only has to be described once.

export interface PageMeta {
  /** Used for the share image file name and for look-ups. */
  slug: string;
  /** Clean URL path, always with a trailing slash. */
  path: string;
  /** Short label for navigation and breadcrumbs. */
  label: string;
  /** Unique <title>. Keep under ~60 characters. */
  title: string;
  /** Unique meta description. Keep between ~120 and ~160 characters. */
  description: string;
  /** One line used on link cards and in llms.txt. */
  blurb: string;
  /** Two short lines for the share image headline. */
  share: [string, string];
}

const suffix = ' | Hult Prize Nepal';

export const pages = {
  home: {
    slug: 'home', path: '/', label: 'Home',
    title: 'EF Hult Prize Nepal | Student Startup Competition 2026–27',
    description: "EF Hult Prize Nepal runs the world's largest student startup competition in Nepal. Win your campus, pitch at Nationals and compete for US$1M in seed funding.",
    blurb: 'The national program of the EF Hult Prize in Nepal.',
    share: ['Changing the world', 'with social enterprise'],
  },
  about: {
    slug: 'about', path: '/about/', label: 'About',
    title: 'About the EF Hult Prize' + suffix,
    description: 'What the EF Hult Prize is, how it grew from a 2010 student challenge into a US$1M global competition, who leads it, and the startups that have won.',
    blurb: 'What the prize is, where it came from and who has won it.',
    share: ['About the', 'EF Hult Prize'],
  },
  challenge: {
    slug: 'challenge', path: '/challenge/', label: 'Challenge',
    title: 'The 2026–27 Challenge: Unlimited' + suffix,
    description: 'The 2026–27 EF Hult Prize challenge is Unlimited: pitch any for-profit startup with measurable social impact that serves at least one of the 17 UN SDGs.',
    blurb: 'This season has no single topic. Any SDG, any for-profit idea.',
    share: ['The 2026–27 challenge:', 'Unlimited'],
  },
  compete: {
    slug: 'compete', path: '/compete/', label: 'Compete',
    title: 'How to Enter from Nepal' + suffix,
    description: 'Enter the EF Hult Prize from Nepal: every team represents its campus at the qualifier level. Who can enter, how to qualify, key dates and the five stages.',
    blurb: 'Represent your campus: who can enter, how to qualify and key dates.',
    share: ['How to enter', 'from Nepal'],
  },
  nepal: {
    slug: 'nepal', path: '/nepal/', label: 'In Nepal',
    title: 'Hult Prize in Nepal: Our Story' + suffix,
    description: 'How the Hult Prize grew in Nepal since 2016: 550+ startups and 280+ OnCampus events last season, campuses across the country and two National Competitions.',
    blurb: 'Our numbers, where we work and the story since 2016.',
    share: ['Hult Prize in Nepal:', 'our story since 2016'],
  },
  team: {
    slug: 'team', path: '/team/', label: 'Team',
    title: 'National Team 2027' + suffix,
    description: 'Meet the 2027 Hult Prize Nepal national team: the National Coordinator, Deputy National Coordinator and National Community Coordinator, plus past leadership.',
    blurb: 'The people leading Hult Prize Nepal this season.',
    share: ['Meet the 2027', 'national team'],
  },
  champions: {
    slug: 'champions', path: '/champions/', label: 'Champions',
    title: 'National Champions' + suffix,
    description: 'The startups that won the Hult Prize Nepal National Competition: Team Fluxelle in 2026 and Team Vayudristi in 2025, and what each of them built.',
    blurb: 'The startups that won Nationals and what they built.',
    share: ["Nepal's national", 'champions'],
  },
  campuses: {
    slug: 'campuses', path: '/campuses/', label: 'Campuses',
    title: 'OnCampus Programs in Nepal' + suffix,
    description: 'How colleges across Nepal run Hult Prize OnCampus Programs, from IOE Pulchowk in 2016 to 40+ campuses in 2025–26, with the stories of past campus winners.',
    blurb: 'How colleges across Nepal run their OnCampus Programs.',
    share: ['OnCampus Programs', 'across Nepal'],
  },
  host: {
    slug: 'host', path: '/host/', label: 'Host a program',
    title: 'Bring Hult Prize to Your Campus' + suffix,
    description: 'Host a Hult Prize OnCampus Program at your college in Nepal: what students do, what the national team provides, six steps to launch and the key dates.',
    blurb: 'What hosting involves, six steps to launch and who can host.',
    share: ['Bring the Hult Prize', 'to your campus'],
  },
  nationals: {
    slug: 'nationals', path: '/nationals/', label: 'Nationals',
    title: 'National Competition 2027' + suffix,
    description: 'The Hult Prize Nepal National Competition takes place in the last week of April 2027. See who qualifies, the workshops before it and what the winner gets.',
    blurb: 'Who qualifies, the workshops before it and what comes after.',
    share: ['National Competition', 'April 2027'],
  },
  partners: {
    slug: 'partners', path: '/partners/', label: 'Partners',
    title: 'Partner with Us' + suffix,
    description: 'Partner with Hult Prize Nepal to reach student founders from 50+ colleges: brand visibility, judging seats, speaking slots and early access to talent.',
    blurb: 'Why organizations back us and what partners receive.',
    share: ["Back Nepal's", 'next founders'],
  },
  gallery: {
    slug: 'gallery', path: '/gallery/', label: 'Gallery',
    title: 'Photo Gallery' + suffix,
    description: 'Photos from Hult Prize Nepal OnCampus events, panels and finals, plus Hult Prize regional summits in Taipei, Monterrey, Melbourne, Boston, Mumbai and Dubai.',
    blurb: 'Photos from OnCampus events, finals and regional summits.',
    share: ['Hult Prize Nepal', 'in pictures'],
  },
  faq: {
    slug: 'faq', path: '/faq/', label: 'FAQ',
    title: 'Frequently Asked Questions' + suffix,
    description: 'Answers to common questions about the EF Hult Prize in Nepal: cost, eligibility, team rules, the Open Application, prizes and becoming a Campus Director.',
    blurb: 'Cost, eligibility, team rules and what winners get.',
    share: ['Frequently asked', 'questions'],
  },
  contact: {
    slug: 'contact', path: '/contact/', label: 'Contact',
    title: 'Contact the National Team' + suffix,
    description: 'Email the Hult Prize Nepal national team about registration, hosting an OnCampus Program or partnering, or follow @hultprizenepal on Instagram.',
    blurb: 'Email the national team or find us on Instagram.',
    share: ['Talk to our', 'national team'],
  },
  sources: {
    slug: 'sources', path: '/sources/', label: 'Sources',
    title: 'Sources and Verification' + suffix,
    description: 'The press coverage, official pages and reports behind every figure and claim on the Hult Prize Nepal website, with a link to each source.',
    blurb: 'Where every figure and claim on this site comes from.',
    share: ['Sources and', 'verification'],
  },
  legal: {
    slug: 'legal', path: '/legal/', label: 'Privacy & terms',
    title: 'Privacy and Terms' + suffix,
    description: 'How the Hult Prize Nepal website handles privacy, the terms that apply to its content, and how to correct or remove information about you.',
    blurb: 'How this site handles privacy, and the terms for its content.',
    share: ['Privacy', 'and terms'],
  },
} satisfies Record<string, PageMeta>;

export type PageKey = keyof typeof pages;

/** Main navigation, in order. */
export const primaryNav: PageKey[] = ['about', 'challenge', 'compete', 'nepal', 'campuses', 'nationals', 'partners', 'contact'];

/** Footer columns. */
export const footerNav: { heading: string; keys: PageKey[] }[] = [
  { heading: 'Compete', keys: ['challenge', 'compete', 'nationals', 'faq'] },
  { heading: 'Hult Prize Nepal', keys: ['about', 'nepal', 'team', 'champions', 'gallery'] },
  { heading: 'Get involved', keys: ['campuses', 'host', 'partners', 'contact'] },
];

/** Every indexable page, used by sitemap.xml and llms.txt. */
export const allPages: PageMeta[] = Object.values(pages);
