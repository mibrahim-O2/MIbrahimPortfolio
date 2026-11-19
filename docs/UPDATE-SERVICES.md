# Update the Services pages

The services live in **`data/services.js`**. Each entry becomes:

- a card in the homepage **Services** section and on `/services`
- its own page at `/services/<slug>` (with structured data and an FAQ)
- an entry in `sitemap.xml` and `/llms.txt`

## Fields

| Field | What it does |
|---|---|
| `slug` | URL part: `/services/<slug>`. Lowercase, words joined with `-`. Changing it changes the URL. |
| `icon` | Font Awesome class shown on the card |
| `name` | Card title and page H1 |
| `short` | One sentence on the card |
| `title`, `description` | Browser tab title and search snippet (keep the description under about 160 characters) |
| `intro` | Paragraph under the page title |
| `forWho`, `builds` | Bullet lists: who it is for, what you build |
| `stack` | Tools you really use for this kind of work |
| `proof` | Project ids from `data/projects.js` that prove the service, in display order |
| `faq` | Questions buyers really ask, with honest answers |
| `updatedAt` | Date (YYYY-MM-DD) of the last real change to this page, used in sitemap.xml |

`commonFaq` holds questions shown on every service page (location, student status, how to start).

## Rules (important for search engines and for trust)

- **Only claim what a linked project proves.** No invented clients, results, ratings or tools.
- **Do not create a page per keyword, city or tool.** Google treats thin, near-duplicate pages as spam.
  Add a new service only when you have real projects behind it.
- **n8n:** add n8n to a service only after you publish a real n8n project (and ideally templates on the
  n8n Creators directory). Until then the FAQ says honestly that your automations are written in code.

## Prompt for an AI agent

```text
Read docs/UPDATE-SERVICES.md. In data/services.js, add <project id> to the proof list of the
"AI Voice Agents" service and add this FAQ: <question / answer>. Update its updatedAt date.
Do not change components. Work on a branch and give me the Vercel Preview URL.
```
