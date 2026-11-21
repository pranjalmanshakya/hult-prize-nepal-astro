// /nationals-2027.ics: the National Competition as a calendar file.
import type { APIRoute } from 'astro';
import { icsFile } from '../lib/calendar';

export const GET: APIRoute = () => {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
  return new Response(icsFile(stamp), {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8', 'Content-Disposition': 'attachment; filename="hult-prize-nepal-nationals-2027.ics"' },
  });
};
