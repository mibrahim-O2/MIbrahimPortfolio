# Experience: How to Add Your Roles

**File to edit:** `data/experience.js` (only this file)
**Displayed by:** `sections/ExperienceSection.js`

## Current state

The experience list is **empty on purpose**:

```js
export const experienceData = [];
```

While it is empty, the site hides everything related to experience **automatically**:

| Hidden while empty | Appears again after you add the first role |
|---|---|
| The Experience section on the homepage (between Technical Expertise and About) | ✅ |
| The **Experience** link in the navigation bar and mobile menu | ✅ |
| The **Experience** quick link in the footer | ✅ |
| The `/experience` page (it shows the 404 page) | ✅ |
| `/experience` in `sitemap.xml` | ✅ |

You never need to touch the navbar, footer, homepage or sitemap. **Adding one entry to the list is enough.**

---

## What counts as experience

Experience is for **roles**: something you did *for* an organisation or a person, over a period of time.

| Good fit for Experience | Belongs in Projects instead (`data/projects.js`) |
|---|---|
| A job or internship | A personal side project |
| Freelance or client work (e.g. building a client's store) | An open-source tool you built alone |
| A research or teaching assistant role | A course project with no outside role |
| A leadership role (team lead, society lead) | A hackathon entry |

A freelance or client job can appear in **both**: the role in Experience ("Freelance Full-Stack Developer for SN Noor"),
and the product in Projects (the SN Noor case study). Keep the wording consistent between the two.

---

## What one experience card shows

```
 [logo]  Role                                   10 Jun 2026 – 10 Nov 2026
         Company · Project                       5 mo
         – First bullet point
         – Second bullet point
```

On a phone the date sits above the card; on desktop it sits on the left of a timeline line that fills in
as you scroll.

---

## Step by step (from your phone)

1. **Optional: upload a logo.** On github.com, switch to your working branch, open `public/logos/`, tap
   **Add file → Upload files** and upload a square PNG or WebP logo (about 200×200, transparent background
   if possible). Name it in lowercase with dashes, e.g. `acme-logo.png`. See [UPDATE-IMAGES.md](./UPDATE-IMAGES.md).
2. **Open `data/experience.js`** and tap the pencil (edit) icon.
3. **Replace** `export const experienceData = [];` with the template below and fill it in.
4. **Commit** to your branch, open the Vercel Preview on your phone, and check the homepage, the
   navigation link and `/experience` (see [DEPLOYMENT.md](./DEPLOYMENT.md)).
5. **Merge** when it looks right.

Or ask an AI coding agent to do it for you (see the prompt at the end).

---

## Template: first role

```js
export const experienceData = [
  {
    id: "acme-ai-intern",
    company: "Acme Technologies",
    project: "AI Automation Team",
    role: "AI Engineering Intern",
    start: "2026-12-01",
    end: "2027-02-28",
    period: "Dec 2026 – Feb 2027",
    logo: "/logos/acme-logo.png",
    icon: null,
    points: [
      "Built an internal agent that drafts replies to support tickets, with every reply approved by a person before sending.",
      "Connected the agent to the ticketing system through an MCP server with read-only and approval-gated tools."
    ]
  }
];
```

## Template: adding more roles

Each role is one `{ … }` block. Put a **comma** after the closing `}` of every block except the last one,
and keep the **newest role first**:

```js
export const experienceData = [
  {
    id: "newest-role",
    ...
  },
  {
    id: "older-role",
    ...
  }
];
```

---

## Every field explained

| Field | Required | What it does | Example |
|---|---|---|---|
| `id` | **Yes** | Unique internal name. Lowercase, words joined by `-`. Never reuse one. | `"sn-noor-freelance"` |
| `company` | **Yes** | Organisation or client name | `"SN Noor"`, `"IMCS, University of Sindh"` |
| `project` | No | Team, product or project inside the organisation, shown after a dot. `""` to hide. | `"E-commerce store"` |
| `role` | **Yes** | Your title, the bold heading of the card | `"Freelance Full-Stack Developer"` |
| `start` / `end` | No | Dates in **`YYYY-MM-DD`** format. Used **only** to calculate the small duration chip ("3 mo", "1 yr 2 mo"). Use `null` when you only know years. | `"2026-06-10"` |
| `period` | **Yes** | The date text visitors **see**. Any format you like. | `"Jun 2026 – Nov 2026"`, `"2025 – 2026"`, `"Jan 2027 – Present"` |
| `logo` | No | Logo path in `public/` (starts with `/logos/`). Shown on a light square. `null` for no logo. | `"/logos/acme-logo.png"` |
| `icon` | When `logo` is `null` | Font Awesome icon shown instead of a logo. Use `null` when there is a logo. | `"fa-solid fa-briefcase"`, `"fa-solid fa-people-group"`, `"fa-solid fa-flask"` |
| `points` | **Yes** | 2–4 bullet points (list of text in quotes) | see below |

### The duration chip

- Both `start` and `end` set → the chip is shown (e.g. `5 mo`).
- **Current role:** set `end: null` and write `"… – Present"` in `period`. The chip is hidden, which is
  correct for an ongoing role.
- Only years known: `start: null, end: null, period: "2025 – 2026"`.

### Writing good bullet points

- **Start with a verb:** Built, Designed, Led, Replaced, Automated, Shipped.
- **Say what changed:** "Replaced the manual spreadsheet timetable with an automated scheduler" is stronger
  than "Worked on scheduling".
- **Name the real technology** when it matters (FastAPI, MCP, Next.js).
- **Only real facts.** No invented numbers, users or results. If you have a real metric, use it.
- 1–2 lines each; 2–4 bullets per role.

---

## Order

Cards are shown in the order of the list. Keep it **newest first by end date**, with ongoing roles at the
top and roles without dates at the bottom.

## Edit or remove a role

- **Edit:** find the block by its `company` or `id` and change the text.
- **Remove:** delete the whole `{ … },` block. If you remove the last one, set the file back to
  `export const experienceData = [];` and the section hides itself again.

---

## Common mistakes

| Mistake | Result | Fix |
|---|---|---|
| Missing comma between two role blocks | Build fails, Vercel keeps the old site | Every `}` before the next `{` needs `},` |
| `start: "01-12-2026"` | Duration chip missing or wrong | Use `"2026-12-01"` |
| `points: "One sentence"` (text instead of a list) | Page crashes | `points: ["One sentence"]` |
| `logo: "/logos/Acme.png"` but the file is `acme.png` | Broken logo on Vercel | Match upper/lower case exactly |
| `logo: "public/logos/acme.png"` | Broken logo | Drop `public`: `"/logos/acme.png"` |
| Both `logo` and `icon` set | The logo is shown; harmless | Set `icon: null` for clarity |
| Adding a personal project as experience | Repeats your Projects section | Put it in `data/projects.js` |

---

## Prompt for an AI agent

```text
Read docs/EXPERIENCE.md and add this role to data/experience.js (newest first).
Only change data/experience.js (and upload the logo to public/logos/ if I provide one).
- company: …
- project/team: …
- role: …
- dates: … to … (or "Present")
- logo: public/logos/<file> or none (icon: …)
- what I did:
  - …
  - …
Do not invent results or numbers. Work on a branch, run the build, and give me the Vercel Preview URL.
```
