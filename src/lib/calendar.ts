// "Add to calendar" links for the Nepal National Competition, built from the
// dates in src/data/site.ts so they always match the rest of the site.
import { season } from '../data/site';

const title = 'Hult Prize Nepal National Competition 2027';
const details = 'The two-day Hult Prize Nepal National Competition. Qualified teams from campuses across Nepal pitch for the chance to represent Nepal. Details: https://efhultprizenepal.netlify.app/nationals/';
const compact = (iso: string) => iso.replace(/-/g, '');

/** The day after the last day, as calendars expect for all-day events. */
const dayAfter = (iso: string) => {
  const d = new Date(iso + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
};

/** Opens Google Calendar with the event filled in. */
export const googleCalendarLink = () =>
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  '&text=' + encodeURIComponent(title) +
  '&dates=' + compact(season.nationalsStart) + '/' + compact(dayAfter(season.nationalsEnd)) +
  '&details=' + encodeURIComponent(details) +
  '&location=' + encodeURIComponent('Nepal');

/** A standard .ics calendar file, for Apple Calendar, Outlook and others. */
export const icsFile = (stamp: string) => [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//Hult Prize Nepal//Nationals//EN',
  'CALSCALE:GREGORIAN',
  'METHOD:PUBLISH',
  'BEGIN:VEVENT',
  'UID:nationals-2027@efhultprizenepal.netlify.app',
  'DTSTAMP:' + stamp,
  'DTSTART;VALUE=DATE:' + compact(season.nationalsStart),
  'DTEND;VALUE=DATE:' + compact(dayAfter(season.nationalsEnd)),
  'SUMMARY:' + title,
  'DESCRIPTION:' + details.replace(/,/g, '\\,'),
  'LOCATION:Nepal',
  'END:VEVENT',
  'END:VCALENDAR',
  '',
].join('\r\n');
