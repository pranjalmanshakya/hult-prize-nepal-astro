// /llms.txt: a plain-language summary of the site for AI assistants (llmstxt.org format).
// Built from the same data as the pages, so the facts stay in step with the site.
import type { APIRoute } from 'astro';
import { pages, type PageKey } from '../data/pages';
import { org, season, team, champions, faqs } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const link = (key: PageKey) => `- [${pages[key].label === 'Home' ? org.name : pages[key].title.replace(' | Hult Prize Nepal', '')}](${new URL(pages[key].path, site).href}): ${pages[key].blurb}`;
  const section = (title: string, keys: PageKey[]) => `## ${title}\n\n${keys.map(link).join('\n')}`;
  const latest = [...champions].sort((a, b) => b.y - a.y);

  const body = [
    `# ${org.name}`,
    `> ${org.description}`,
    [
      `- Season: ${season.name}. Challenge: ${season.challenge} (any for-profit startup with measurable social impact that serves at least one UN Sustainable Development Goal).`,
      `- Who can enter: teams of 2 to 4 students, each 18 or older and enrolled in a degree program. Registration is free at ${season.register}`,
      `- Qualifier rounds (OnCampus Programs and the Open Application) must finish before ${season.qualifiersCloseLabel}.`,
      `- National Competition: a two-day event on ${season.nationalsDays}. The winner represents Nepal and joins the Hult Prize Digital Incubator.`,
      `- Global prize: US$1,000,000 in seed funding for the winning team at the Global Finals.`,
      `- National champions: ${latest.map((c) => `${c.team}, ${c.college} (${c.y})`).join('; ')}.`,
      `- National team: ${team.map((p) => `${p.name} (${p.role})`).join('; ')}.`,
      `- Official global site: ${season.official}. Instagram: ${season.instagram}`,
    ].join('\n'),
    section('Compete', ['challenge', 'compete', 'nationals', 'faq']),
    section('Hult Prize Nepal', ['home', 'about', 'nepal', 'team', 'awards', 'champions', 'gallery']),
    section('Get involved', ['campuses', 'host', 'partners', 'contact']),
    `## Common questions\n\n${faqs.map(([q, a]) => `- ${q} ${a}`).join('\n')}`,
    section('Optional', ['sources', 'legal']),
  ].join('\n\n');

  return new Response(body + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
