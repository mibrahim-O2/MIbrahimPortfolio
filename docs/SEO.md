# SEO and AI search: how the site is set up

Nothing here guarantees rankings or AI citations. These are the pieces that make the site easy to crawl,
understand and quote; most remaining visibility comes from your profiles elsewhere (see the end).

## What the code does

| Piece | Where | Notes |
|---|---|---|
| Title, description, canonical, Open Graph, Twitter card for every page | `utils/seo.js` (`buildMetadata`), called by every `page.js` | Keep the role label "Agentic AI & Automation Engineer" everywhere |
| Share images for case studies | `public/og/<project-id>.jpg`, built by `python3 scripts/build-og-images.py` | Re-run after adding a project or changing its screenshot. JPEG on purpose (LinkedIn ignores WebP) |
| Structured data (JSON-LD) | `utils/schema.js` | WebSite + ProfilePage + Person on `/` and `/about`; WebPage + BreadcrumbList + SoftwareSourceCode on case studies; Service + FAQPage on service pages. Every value must match visible text |
| sitemap.xml | `app/sitemap.js` | Dates come from `data/siteDates.js` and each project's / service's `updatedAt`. Change a date only when that page really changes |
| robots.txt | `app/robots.js` | Everything allowed; AI search crawlers (OAI-SearchBot, Claude-SearchBot, PerplexityBot...) named explicitly |
| /llms.txt | `app/llms.txt/route.js` | Generated from the data files. Optional extra: no major provider has confirmed using it |
| Site URL | `utils/siteUrl.js` | Live host is `https://www.mibrahimdev.tech`. Set `NEXT_PUBLIC_SITE_URL` in Vercel to be explicit |
| Content visible without JavaScript | `components/motion/Reveal.js`, `utils/revealScript.js` | Crawlers and no-JS visitors see every section; animations only run in the browser |

## When you add a project

1. Add it to `data/projects.js` (see ADD-PROJECT.md) with an `updatedAt` date.
2. Run `python3 scripts/build-og-images.py` to create its share image.
3. If it proves a service, add its id to that service's `proof` list in `data/services.js`.

## Things only you can do (they matter more than any tag)

1. Google Search Console: verify the domain, submit `https://www.mibrahimdev.tech/sitemap.xml`, inspect the homepage.
2. Bing Webmaster Tools: import from Search Console, submit the sitemap, watch the AI Performance report (Copilot citations).
3. Use the same name, role and site link on LinkedIn, GitHub, X, YouTube and PyPI.
4. Publish short demo videos of your agents on YouTube and link them from the case studies.
5. Answer real questions in communities (n8n forum, Reddit, MCP / OpenAI Agents SDK discussions), never with planted mentions.
6. Build and publish one real n8n project before targeting "n8n automation developer".
