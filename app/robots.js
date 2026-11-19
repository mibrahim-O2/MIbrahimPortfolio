import { SITE_URL } from '@/utils/siteUrl';

// robots.txt. Everything is allowed. The AI search crawlers are also named explicitly so it is clear
// they may read the site (being readable is a precondition for being cited; it guarantees nothing).
// Tokens from the vendors' own docs: OpenAI (OAI-SearchBot, ChatGPT-User), Anthropic (Claude-SearchBot,
// Claude-User), Perplexity (PerplexityBot). Training crawlers (GPTBot, ClaudeBot, Google-Extended, CCBot)
// fall under the "*" rule and are allowed too; add a `disallow: '/'` group for any you want to opt out.
const AI_SEARCH_BOTS = ['OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User'];

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_SEARCH_BOTS, allow: '/' }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
