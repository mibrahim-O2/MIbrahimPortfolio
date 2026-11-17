# Add or Update Professional Experience

**File to edit:** `data/experience.js`
**Displayed by:** `components/ExperienceStack.js` (homepage Experience section and `/experience`)

Each job, role or engagement is one object in the `experienceData` array.

---

## Template

```js
  {
    id: "company-role",
    company: "Company or Organisation Name",
    project: "Project or Team Name",
    role: "Your Job Title",
    start: "2026-01-15",
    end: "2026-06-30",
    period: "15 Jan 2026 – 30 Jun 2026",
    logo: "/logos/company-logo.png",
    icon: null,
    points: [
      "What you did and the result, in one sentence.",
      "Another responsibility or achievement."
    ]
  },
```

## Fields

| Field | What it does | Notes |
|---|---|---|
| `id` | Unique internal name | Lowercase with dashes, e.g. `"imcs-timetable"` |
| `company` | Organisation name | e.g. `"IMCS, University of Sindh"` |
| `project` | Project or team inside the organisation | e.g. `"Timetable Automation"` |
| `role` | Your title | e.g. `"Software Developer and Researcher"` |
| `start` / `end` | Dates in **`YYYY-MM-DD`** format | Used **only** to calculate the small duration chip ("5 mo", "1 yr 2 mo"). Use `null` for both if you only know years; the chip is then hidden. |
| `period` | The date text people **see** | Write it however you like: `"10 Jun 2026 – 10 Nov 2026"`, `"2025 – 2026"`, `"Jan 2026 – Present"` |
| `logo` | Logo image path in `public/` | e.g. `"/logos/IMCSLogo.png"`. Use `null` for no logo. |
| `icon` | Font Awesome class shown **when `logo` is `null`** | e.g. `"fa-solid fa-people-group"`. Use `null` when there is a logo. |
| `points` | Bullet points | 2–4 short, specific sentences. Start with a verb: "Built…", "Led…", "Replaced…". |

## Ordering

The array order is the display order. Keep it **newest first by end date**, with entries that have no dates
last (the current file follows this rule).

## Current role ("Present")

For a role you are still doing:

```js
    start: "2026-09-01",
    end: null,
    period: "Sep 2026 – Present",
```

With `end: null` the duration chip is hidden, which is correct for an ongoing role.

## Logos

Upload the logo to `public/logos/` (square PNG or WebP, ~200×200, transparent background if possible) and
reference it as `"/logos/<file-name>"` with the exact same upper/lower case. See [UPDATE-IMAGES.md](./UPDATE-IMAGES.md).

## Edit or remove an entry

- **Edit:** find it by `company` or `id` and change the text.
- **Remove:** delete the whole `{ … },` block. Make sure the array still ends with `];`.

## Good practice

- Experience = real roles (employment, research, freelance/client work, leadership).
  Personal side projects belong in `data/projects.js`, not here.
- Use the same company spelling everywhere (projects, experience, education).
- No invented numbers or results.

## Common mistakes

| Mistake | Result |
|---|---|
| `start: "15-01-2026"` | Wrong format, so the duration chip is hidden or wrong. Use `"2026-01-15"`. |
| Both `logo` and `icon` set | Logo is shown; harmless, but set `icon: null` for clarity |
| `logo: "/logos/imcslogo.png"` when the file is `IMCSLogo.png` | Broken image on Vercel |
| Missing comma between entries | Build fails |

## Prompt for an AI agent

```text
Read docs/ADD-EXPERIENCE.md and add this role to data/experience.js, keeping newest-first order:
company: … / project: … / role: … / dates: … / logo: public/logos/<file> or none (icon: …)
points:
- …
- …
Do not modify components. Work on a branch and give me the Preview URL.
```
