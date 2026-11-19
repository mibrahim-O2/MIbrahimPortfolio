// Public site URL, used for metadata (Open Graph links), sitemap.xml and robots.txt. Server-side only.
// Order of preference:
//  1. NEXT_PUBLIC_SITE_URL, if it is set in the Vercel project settings (Settings -> Environment Variables)
//  2. VERCEL_PROJECT_PRODUCTION_URL, which Vercel sets automatically during every build (your production domain)
//  3. The custom domain below
const FALLBACK_URL = 'https://www.mibrahimdev.tech'; // the live host (mibrahimdev.tech redirects here)

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return FALLBACK_URL;
}

// No trailing slash, so `${SITE_URL}/path` never produces a double slash
export const SITE_URL = resolveSiteUrl().replace(/\/+$/, '');
