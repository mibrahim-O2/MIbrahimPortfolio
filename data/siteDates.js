// Last real content change of each page, used as <lastmod> in sitemap.xml.
// Search engines only trust lastmod when it is accurate, so update a date ONLY when that page's
// content really changes (format YYYY-MM-DD). Projects use `updatedAt` in data/projects.js,
// falling back to DEFAULT_DATE.
export const DEFAULT_DATE = '2026-11-19';

export const pageDates = {
  '': '2026-11-19',
  '/about': '2026-11-19',
  '/projects': '2026-11-19',
  '/services': '2026-11-19',
  '/skills': '2026-11-19',
  '/education': '2026-11-19',
  '/certificates': '2026-11-19',
  '/volunteer': '2026-11-19',
  '/gallery': '2026-11-19',
  '/contact': '2026-11-19'
};
