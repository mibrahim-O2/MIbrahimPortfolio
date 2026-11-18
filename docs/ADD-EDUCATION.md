# Add or Update Education

**File to edit:** `data/education.js`
**Displayed by:** `sections/EducationSection.js` (homepage "Education & certifications" section and `/education`)

Each school, degree or program is one object in the `educationData` array, **newest first**.

---

## Template

```js
  {
    id: "msc-ai",
    period: "2027 – 2029",
    status: "In progress",
    degree: "MSc",
    short: "MSc",
    title: "Master of Science in Artificial Intelligence",
    institutionName: "University Name",
    chip: "City, Country",
    logos: [
      { src: "/logos/university-logo.png", alt: "University Name logo" }
    ],
    summary: "One sentence about the program, or \"\" to hide it.",
    metas: [
      { label: "Result", value: "3.6 CGPA" }
    ]
  },
```

## Fields

| Field | What it does | Example from this repo |
|---|---|---|
| `id` | Unique internal name | `"bscs"` |
| `period` | Years shown on the card | `"2023 – 2027"` |
| `status` | **Optional.** Shows a status pill and highlights the card with a copper border. Remove the line when finished. | `"In progress"` |
| `degree` | Small label above the title | `"BSCS"`, `"FSc Pre-Engineering"` |
| `short` | Short label. **Not displayed**, kept for compatibility. | `"BSCS"` |
| `title` | Main heading | `"Bachelor of Science in Computer Science"` |
| `institutionName` | Institution under the title | `"IMCS, University of Sindh"` |
| `chip` | Small location/board chip with a pin icon | `"Jamshoro, Sindh"`, `"BISE Nawabshah"` |
| `campusImage` | **Not displayed** (the cards no longer have banners). Kept for compatibility; you can leave it out. | `"/logos/UOSimage.webp"` |
| `logos` | 1 or 2 logos shown left to right. Each needs `src` and `alt`. | UoS + IMCS logos |
| `summary` | **Optional.** One short sentence. `""` = hidden. Avoid filler. | |
| `metas` | Real results only (grade, CGPA), shown as small tiles: `{ label, value }`. `[]` = none. | `{ label: "Result", value: "94%" }` |

## Images

- `logos[].src`: square logo, ~200×200, PNG/WebP, in `public/logos/`.
- Paths start with `/logos/…` and must match the file name's upper/lower case exactly.

See [UPDATE-IMAGES.md](./UPDATE-IMAGES.md).

## Finishing a degree

When a program ends:

1. Delete the `status: "In progress",` line.
2. Update `period` if the end year changed.
3. Optionally add a result tile: `{ label: "Result", value: "3.6 CGPA" }`.

## Remove an entry

Delete its whole `{ … },` block and check that the array still ends with `];`.

## Common mistakes

| Mistake | Result |
|---|---|
| `logos: { src: … }` (object instead of list) | Page crashes. `logos` must be a list `[ … ]`, even with one logo. |
| `metas` missing | Card crashes. Use `metas: []` if you have none. |
| Wrong order | Cards are displayed in array order, so keep newest first |

## Prompt for an AI agent

```text
Read docs/ADD-EDUCATION.md and add this entry to data/education.js (newest first):
title: … / institution: … / period: … / location chip: … / status: in progress or finished
logos: public/logos/<file> (alt: …)
summary: one short sentence or none
result: … (only if real)
Do not modify components. Work on a branch and give me the Preview URL.
```
