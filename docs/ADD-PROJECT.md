# Add a New Project

**File to edit:** `data/projects.js`. Nothing else is required.

Every project is one object inside the `projectsData` array. Adding an object automatically gives you:

- a card in the project archive at `/projects` (with category filters)
- a large card in the homepage **Featured projects** section, if `featured: true`
- a case study page at `/projects/<id>`
- an entry in `sitemap.xml`

---

## Step by step

1. Open `data/projects.js`.
2. Decide **where** the project goes. **Display order = order in the array**: the first object is shown first.
3. Copy the template below and paste it **between two existing projects** (or after the last one).
   Make sure there is a comma `,` after the closing `}` of the project before it.
4. Fill in every field. Keep fields you don't have as `""` (empty text) or `[]` (empty list). **Don't delete them.**
5. If you have a screenshot, add it first (see [Screenshots](#screenshots)).
6. Commit on a branch and check the Preview (see [DEPLOYMENT.md](./DEPLOYMENT.md)).

---

## Template (copy this)

```js
  {
    id: "my-new-project",
    title: "My New Project",
    subtitle: "One short sentence about what it does for the user.",
    description: "Two or three sentences shown on the project card. Say what it is, who it is for and what makes it interesting.",
    highlight: "",
    image: "/images/projects/my-new-project.webp",
    tags: [
      "Next.js",
      "FastAPI",
      "PostgreSQL"
    ],
    categories: [
      "Web & Full-Stack"
    ],
    demoUrl: "https://my-new-project.vercel.app/",
    demoLabel: "Live website",
    githubUrl: "https://github.com/mibrahim-O2/my-new-project",
    videoUrl: "",
    links: [],
    badge: "Solo Project",
    status: "Live",
    featured: false,
    published: true,
    heroBanner: "/images/projects/my-new-project.webp",
    problemStatement: "What problem existed before this project.",
    solution: "How the project solves it.",
    features: [
      "First key feature.",
      "Second key feature."
    ],
    architectureDiagram: "Frontend (Next.js) -> API routes -> Database",
    challenges: [
      "A real difficulty you faced and how you solved it."
    ],
    lessonsLearned: [
      "Something you learned."
    ],
    results: "What the finished project achieved. Only real facts."
  },
```

The first project in the file, **FinLexPurple** (`id: "finlexpurple"`), is a complete real example that uses
every field, including the optional ones.

---

## Every field explained

### Shown on cards (homepage and `/projects`)

| Field | Required | What it does | Example from this repo |
|---|---|---|---|
| `id` | **Yes** | Unique name used in the URL: `/projects/<id>`. Lowercase, words joined by `-`, no spaces. **Never reuse an id.** Changing it later breaks shared links. | `"imcs-scheduler"` |
| `title` | **Yes** | Project name. | `"IMCS Scheduler"` |
| `description` | **Yes** | The full summary: shown on the large lead card and in search/link previews. 1–4 sentences. | FinLexPurple's description |
| `subtitle` | **Yes** | One short line. Shown on every other card (homepage grid and archive) and under the title on the case study page. Keep it under ~110 characters. | `"An open-source security agent for financial apps…"` |
| `highlight` | No | One short line shown in a monospace font on featured cards and the case study page. Good for "Open source · v0.4.0 on PyPI"-style facts. `""` = hidden. | FinLexPurple's highlight |
| `image` | No | Card image. A path in `public/` (starts with `/`) or a full `https://` URL. If empty or broken, a generated cover with an icon and the title is shown instead, so you never get a broken image. | `"/images/projects/finlexpurple.webp"` |
| `tags` | **Yes** | Technology stack. Cards show the first few (8 on the lead card, 5 on featured cards, 4 in the archive) plus "+N"; the case study page shows all. Put the most important first. | `["Python", "Sigstore", …]` |
| `categories` | **Yes** | Which archive filter buttons the project appears under. **Must match a `key` in `projectCategories` exactly.** | `["AI Agents", "AI & Machine Learning"]` |
| `badge` | No | Small label next to the card number, See the badge convention below. | `"Solo Project"` |
| `status` | No | Status pill. Use exactly `"Live"`, `"Completed"` or `"In progress"`. | `"Live"` |
| `featured` | **Yes** | `true` = shown in the homepage Featured projects section. See [Featured projects](#featured-projects). | `true` |
| `published` | **Yes** | `true` = visible. `false` = hidden everywhere (cards, case study page, sitemap), but the content stays in the file. | `true` |

### Buttons

Buttons appear only for fields that have a URL. An empty `""` never shows a button.

| Field | Button | Notes |
|---|---|---|
| (always) | **Case study** | Opens `/projects/<id>` |
| `demoUrl` | **Live demo** | Leave `""` when there is no hosted demo (the button is hidden). Set `demoLabel` to change the text, e.g. `demoLabel: "Live website"` for a real product or client site, `"Live demo"` for a demo. |
| `githubUrl` | **GitHub** | Leave `""` to hide it. For a **private** repository you still want to show (e.g. a client project the client can open), keep the URL and add `githubPrivate: true`: the button then reads **Private repo** with a lock icon, so visitors know it may not open for them. |
| `videoUrl` | **Watch video** | The text can be changed with `videoLabel`, e.g. `videoLabel: "Watch it run"` |
| `links` | Extra buttons | A list of `{ label, url, icon }`, e.g. `{ label: "PyPI", url: "https://pypi.org/project/finlexpurple/", icon: "fab fa-python" }`. `icon` is a Font Awesome class (optional). An entry with `url: ""` is hidden, so you can keep placeholders. |

Cards show **Case study + the first 2 external buttons** (the lead card shows all); the case study page
shows all of them. Order: live site/demo, GitHub, video, then `links`.

On the case study page, a project with a `videoUrl` also gets a video section (titled with `videoLabel`).
YouTube links (`youtu.be/…` or `youtube.com/watch?v=…`) are embedded as a player; any other URL is shown as a
button. With `videoUrl: ""` nothing is shown.

**Placeholders:** to prepare a button for something that doesn't exist yet, keep its URL empty, e.g.
`videoUrl: ""` with `videoLabel: "Watch it run"`, or `{ label: "Blog post", url: "", icon: "fas fa-pen-nib" }`.
The button appears automatically once you paste in the URL.

### Shown only on the case study page (`/projects/<id>`)

| Field | Section on the page |
|---|---|
| `heroBanner` | Large image under the title. Can be the same file as `image`. Empty = uses `image`, then the generated cover. |
| `problemStatement` | "The problem" card |
| `solution` | "The solution" card |
| `features` | "Key features" numbered list (one item per feature) |
| `architectureDiagram` | "Architecture": one line with `->` between steps; each step becomes a numbered box |
| `challenges` | "Engineering challenges" list |
| `lessonsLearned` | "Lessons learned" list |
| `results` | "Results" paragraph. **Only real facts, no invented numbers.** |

Any of these left empty (`""` or `[]`) is simply not shown.

---

## Categories (filter buttons)

The filter buttons on `/projects` come from `projectCategories` at the top of `data/projects.js`:

```js
export const projectCategories = [
  { key: 'all', label: 'All Projects' },
  { key: "AI & Machine Learning", label: "AI & Machine Learning" },
  { key: "AI Agents", label: "AI Agents" },
  { key: "Web & Full-Stack", label: "Web & Full-Stack" },
  { key: "Security", label: "Security" },
  { key: "Optimization", label: "Optimization" },
  { key: "Freelance & Client", label: "Freelance & Client" },
  { key: "Course Projects", label: "Course Projects" },
  { key: "Personal", label: "Personal" }
];
```

- A project can have several categories.
- Every value in a project's `categories` must be **exactly** one of these keys.
- A category with no published projects is hidden automatically.
- To add a category, add a line like `{ key: "Mobile Apps", label: "Mobile Apps" },`. Keep `'all'` first.

## Technology tags

Badge convention (`badge` field): `"Solo Project"`, `"Solo · Open Source"`, `"Family Business"`,
`"Team Lead · 7th Semester"`, `"Freelance · 8th Semester"`. Keep new badges in the same style.

Use official spelling (`"Next.js"`, `"PostgreSQL"`, `"Tailwind CSS"`). Most important first. Tags are plain text.

## Featured projects

`featured: true` puts a project in the homepage **Featured projects** section:

- The **first** featured project (in array order) becomes the large lead card with the full-width screenshot.
  Currently that is **FinLexPurple**, your top project.
- The other featured projects appear in a two-column grid below it, in array order.
- Current featured projects, in order: FinLexPurple, AI Voice Agent for Business, SN Noor Herbal Store,
  Autonomous AI Business Operations Agent, Lead Generation Agent (Inbound), Bin Khalid Dairy Farm V2,
  Finlytics, NeuroCode, VerdexAI, AI Tutor for Personalized Learning Recommendations.
- Older projects (IMCS Scheduler, PulseGrid, Bin Khalid Dairy Farm V1, Event Registration, Restaurant
  Management, URL Shortener) are kept in the file with `published: false`, so they are hidden everywhere.
  Set `published: true` to show one again (it then appears on `/projects`, after the featured ones).
- An **odd** number of featured projects (lead + an even number in the grid) gives the neatest layout.

To change which project leads, move its block to the top of `projectsData` (or above the other featured ones).

## Project ordering

Order everywhere = order of objects in `projectsData`. To move a project, cut its whole `{ … },` block and
paste it in the new position. Check the commas between blocks afterwards.

## Case study pages

You don't create them by hand. `app/projects/[id]/page.js` builds one page per published project at build
time, with "Previous / Next project" links at the bottom. After deploying, open `/projects/<id>` to check it.

## Screenshots

1. Use a **1200×630** (or 2400×1260) landscape image. Every project card and case study uses this exact
   shape, so nothing gets cropped. (It is also the standard link-preview size, so an Open Graph image like
   FinLexPurple's works perfectly.)
2. Save it as **WebP** (or PNG/JPG), ideally under ~300 KB (see [UPDATE-IMAGES.md](./UPDATE-IMAGES.md)).
   The site automatically serves smaller, optimised versions to phones.
3. Name it after the project id: `my-new-project.webp`.
4. Upload it to **`public/images/projects/`**.
5. Reference it as `image: "/images/projects/my-new-project.webp"` (no `public` in the path), and usually the
   same for `heroBanner`.

**Never use unrelated stock photos.** A project without a real screenshot uses `image: ""`, which shows the
generated cover (icon + title). Good sources for a real image: a screenshot of the live site, an image
from the repository (`docs/`, `Screenshots/`, `public/`), or the project's own Open Graph image.
Remote image hosts must be listed in `images.remotePatterns` in `next.config.js`; local files never need that.

## Project icon (optional)

When a project has no image, the generated cover shows an icon from `COVER_ICONS` in
`components/ProjectCover.js`. A new project automatically gets a code icon. To pick one, add a line there,
e.g. `'my-new-project': 'fa-solid fa-robot',`. That is the only component change ever needed for a project.

---

## Common mistakes

| Mistake | Result | Fix |
|---|---|---|
| Missing comma between two project blocks | Build fails, nothing deploys | Every `}` before the next `{` needs `},` |
| Duplicate `id` | Wrong case study page | Make every id unique |
| `categories: ["Web"]` | Project never appears under a filter | Copy the exact key from `projectCategories` |
| `image: "public/images/projects/x.webp"` | Generated cover instead of the image | Remove `public`: `/images/projects/x.webp` |
| `Image.webp` on disk, `image.webp` in code | Broken on Vercel | Match upper/lower case exactly |
| Image from a new website (not Unsplash) | Fails to load | Upload it to `public/images/projects/` instead |
| Deleting a field you don't need | May break the page | Keep it as `""` or `[]` |
| Invented metrics | Damages credibility | Only real, verifiable facts |

## Prompt for an AI agent

```text
Read docs/ADD-PROJECT.md and add a new project to data/projects.js using the existing structure.
Place it after <project title>. Do not modify unrelated components.
Details:
- title / subtitle / description: …
- highlight line (optional): …
- tech: …
- categories: …
- demo: … / GitHub: … / video: … / extra links: …
- status: Live | Completed | In progress
- featured: yes/no
- screenshot: public/images/projects/<id>.webp (already uploaded) or none
- case study: problem, solution, features, architecture, challenges, lessons, results: …
Work on a new branch, run the build, and give me the Vercel Preview URL.
```

## After adding a project (search and sharing)

1. Add `updatedAt: "YYYY-MM-DD"` to the project (used in sitemap.xml; change it only when the case study really changes).
2. Run `python3 scripts/build-og-images.py` to create `public/og/<id>.jpg`, the image shown when the case study is shared.
3. If the project proves a service, add its id to that service's `proof` list in `data/services.js`.

See [SEO.md](./SEO.md).
