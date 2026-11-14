// Email links open Gmail's compose window in a new tab, with the address (and a
// subject, where useful) already filled in. A plain mailto: link does nothing for
// visitors who have no email app set up, which is most people on a laptop.

/** A Gmail compose link for the given address. */
export const gmailCompose = (to: string, subject?: string) =>
  'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to) + (subject ? '&su=' + encodeURIComponent(subject) : '');
