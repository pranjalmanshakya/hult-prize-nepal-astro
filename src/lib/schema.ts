// Structured data (schema.org JSON-LD). Built from the same data the pages use,
// so it cannot drift from what visitors see.
import { org, season, team } from '../data/site';
import type { PageMeta } from '../data/pages';

const abs = (site: URL, path: string) => new URL(path, site).href;
export const orgId = (site: URL) => abs(site, '/#organization');
export const websiteId = (site: URL) => abs(site, '/#website');
const jobTitle = (role: string) => role.replace(' 2027', '');

/** The organization, described as both an Organization and a LocalBusiness serving Nepal. */
export function organizationSchema(site: URL) {
  return {
    '@type': ['Organization', 'LocalBusiness'],
    '@id': orgId(site),
    name: org.name,
    alternateName: org.alternateName,
    description: org.description,
    url: abs(site, '/'),
    logo: { '@type': 'ImageObject', url: abs(site, '/icon-512.png'), width: 512, height: 512 },
    image: abs(site, '/og/home.png'),
    email: org.email,
    foundingDate: org.foundingYear,
    address: { '@type': 'PostalAddress', addressCountry: org.country },
    areaServed: { '@type': 'Country', name: org.countryName },
    parentOrganization: { '@type': 'Organization', name: 'EF Hult Prize', url: season.official },
    sameAs: [season.instagram],
    contactPoint: team.map((p) => ({
      '@type': 'ContactPoint',
      contactType: jobTitle(p.role),
      name: p.name,
      email: p.email,
      areaServed: org.country,
      availableLanguage: ['en', 'ne'],
    })),
  };
}

export function websiteSchema(site: URL) {
  return {
    '@type': 'WebSite',
    '@id': websiteId(site),
    url: abs(site, '/'),
    name: org.name,
    alternateName: org.alternateName,
    inLanguage: 'en',
    publisher: { '@id': orgId(site) },
  };
}

export function breadcrumbSchema(site: URL, page: PageMeta) {
  return {
    '@type': 'BreadcrumbList',
    '@id': abs(site, page.path) + '#breadcrumb',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: abs(site, '/') },
      { '@type': 'ListItem', position: 2, name: page.label, item: abs(site, page.path) },
    ],
  };
}

export function webPageSchema(site: URL, page: PageMeta, hasBreadcrumb: boolean) {
  const url = abs(site, page.path);
  return {
    '@type': 'WebPage',
    '@id': url + '#webpage',
    url,
    name: page.title,
    description: page.description,
    inLanguage: 'en',
    isPartOf: { '@id': websiteId(site) },
    about: { '@id': orgId(site) },
    primaryImageOfPage: { '@type': 'ImageObject', url: abs(site, `/og/${page.slug}.png`), width: 1200, height: 630 },
    ...(hasBreadcrumb ? { breadcrumb: { '@id': url + '#breadcrumb' } } : {}),
  };
}

export function faqSchema(site: URL, page: PageMeta, faqs: string[][]) {
  return {
    '@type': 'FAQPage',
    '@id': abs(site, page.path) + '#faq',
    mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
}

export function teamSchema(site: URL) {
  return team.map((p) => ({
    '@type': 'Person',
    name: p.name,
    jobTitle: jobTitle(p.role),
    email: p.email,
    worksFor: { '@id': orgId(site) },
  }));
}

/** The National Competition as a schema.org Event, so search engines can show its dates. */
export function nationalsEventSchema(site: URL) {
  return {
    '@type': 'Event',
    '@id': abs(site, '/nationals/#event'),
    name: 'Hult Prize Nepal National Competition 2027',
    description: `The two-day Hult Prize Nepal National Competition, ${season.nationalsDays}. Qualified teams from campuses across Nepal pitch for the chance to represent Nepal in the EF Hult Prize.`,
    startDate: season.nationalsStart,
    endDate: season.nationalsEnd,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: { '@type': 'Place', name: 'Nepal', address: { '@type': 'PostalAddress', addressCountry: org.country } },
    image: abs(site, '/og/nationals.png'),
    url: abs(site, '/nationals/'),
    organizer: { '@id': orgId(site) },
  };
}

/** Serialise for a <script type="application/ld+json"> tag without letting content close the tag. */
export const toJsonLd = (graph: unknown[]) =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
