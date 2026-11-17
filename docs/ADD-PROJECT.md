# Add a New Project

**File to edit:** `data/projects.js`. Nothing else is required.

Every project is one object inside the `projectsData` array. Adding an object automatically gives you:

- a card in the Projects section on the homepage and on `/projects`
- a detail page at `/projects/<id>` (case study)
- an entry in `sitemap.xml`
- an entry in the homepage terminal widget and chatbot answers

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
    githubUrl: "https://github.com/mibrahim-O2/my-new-project",
    videoUrl: "",
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

---

## Every field explained

### Shown on the project card (homepage and `/projects`)

| Field | Required | What it does | Example from this repo |
|---|---|---|---|
| `id` | **Yes** | Unique name used in the URL: `/projects/<id>`. Lowercase, words joined by `-`, no spaces. **Never reuse an id.** Changing it later breaks old links. | `"imcs-scheduler"` |
| `title` | **Yes** | Project name on the card and detail page. | `"IMCS Scheduler"` |
| `description` | **Yes** | The text on the card. 1–3 sentences. | NeuroCode's description |
| `image` | No | Card image. A path in `public/` (starts with `/`) or a full `https://` URL. If empty or broken, a generated cover with an icon and the title is shown instead, so you never get a broken image. | `""` or `"/images/projects/neurocode.webp"` |
| `tags` | **Yes** | Technology stack. The card shows the **first 6** and "+N more"; the detail page shows all. Put the most important first. | `["React", "FastAPI", …]` |
| `categories` | **Yes** | Which filter buttons the project appears under. **Must match a `key` in `projectCategories` exactly** (same spelling and capitals). | `["AI & Machine Learning", "Web & Full-Stack"]` |
| `status` | No | Small pill on the card. Use exactly `"Live"`, `"Completed"` or `"In progress"`. | `"Live"` |
| `demoUrl` | No | Live site. Shows a **Demo** button. `""` hides it. | `"https://verdexai-official.vercel.app/"` |
| `videoUrl` | No | Video walkthrough. On the card a **Video** button appears **only when there is no `demoUrl`**. The detail page always shows it. | `"https://youtu.be/s-M_aoWDOkM"` |
| `githubUrl` | No | Repository. Shows a **GitHub** button. `""` hides it (e.g. private repo). | `"https://github.com/mibrahim-O2/PulseGrid"` |
| `featured` | **Yes** | `true` = one of the highlighted projects. See [Featured projects](#featured-projects). | `true` |
| `published` | **Yes** | `true` = visible. `false` = hidden everywhere (cards, detail page, sitemap) but the content stays in the file. | `true` |

### Shown only on the detail page (`/projects/<id>`)

| Field | What it does |
|---|---|
| `subtitle` | Line under the title on the detail page (and in chatbot answers). |
| `heroBanner` | Large image at the top of the detail page. Can be the same file as `image`. Empty = generated cover. |
| `badge` | Small label above the title, e.g. `"Solo Project"`, `"Team Project"`, `"Client Project"`. Empty shows "Project Showcase". |
| `problemStatement` | "Problem Statement" paragraph. |
| `solution` | "Proposed Solution" paragraph. |
| `features` | "Key Features" list (one sentence each). |
| `architectureDiagram` | "System Architecture Flow": one line, with `->` between layers. |
| `challenges` | "Engineering Challenges" list: real problems and how you solved them. |
| `lessonsLearned` | "Lessons Learned" list. |
| `results` | "Results" paragraph (hidden when empty). **Only real facts, no invented numbers.** |

---

## Categories (filter buttons)

The filter buttons come from `projectCategories` at the top of `data/projects.js`:

```js
export const projectCategories = [
  { key: 'all', label: 'All Projects' },
  { key: "AI & Machine Learning", label: "AI & Machine Learning" },
  { key: "Web & Full-Stack", label: "Web & Full-Stack" },
  { key: "Optimization", label: "Optimization" },
  { key: "Freelance & Client", label: "Freelance & Client" },
  { key: "Personal", label: "Personal" }
];
```

- A project can have several categories.
- Every value in a project's `categories` must be **exactly** one of these keys. `"AI & ML"` would not match.
- To add a new category, add a line `{ key: "Mobile Apps", label: "Mobile Apps" },` to this list. Keep `'all'` first.

## Technology tags

- Use the official spelling: `"Next.js"`, `"PostgreSQL"`, `"Tailwind CSS"`, `"scikit-learn"`.
- Most important first, because only the first 6 appear on the card.
- Tags are plain text. No icons are needed.

## Featured projects

`featured: true` marks a project as one of the highlighted projects. The current featured projects are:
**NeuroCode, VerdexAI, IMCS Scheduler, Bin Khalid Dairy Farm V2**.

- The list is available to the code as `featuredProjects` (exported at the bottom of `data/projects.js`).
  It keeps the same order as `projectsData`.
- Keep **3 or 4** featured projects. Too many and none of them stand out.
- The redesigned homepage (Phase 2) shows these as large featured cards. Until then all published
  projects are shown in array order, so put featured projects first.

## Project ordering

Order on the site = order of objects in `projectsData`. To move a project, cut its whole `{ … },` block and
paste it in the new position. Check the commas between blocks afterwards.

## Detail pages

You don't create detail pages by hand. `app/projects/[id]/page.js` builds one page per published project at
build time, using the `id` as the URL. After deploying, open `https://<your-site>/projects/<id>` to check it.

## Screenshots

1. Take or export a screenshot. A **16:10 landscape** image (e.g. **1600×1000**) looks best.
2. Convert it to **WebP**, under ~300 KB if possible (see [UPDATE-IMAGES.md](./UPDATE-IMAGES.md)).
3. Name it after the project id: `my-new-project.webp`.
4. Upload it to **`public/images/projects/`** (create the folder the first time; GitHub's
   "Add file → Upload files" lets you type the folder path).
5. Reference it as `image: "/images/projects/my-new-project.webp"` (note: **no** `public` in the path).

Several existing projects still use stock photos from `images.unsplash.com`. Replacing them with real
screenshots is the single biggest improvement you can make.

## Project icon (optional)

When a project has no image, the generated cover shows an icon. Icons per project id are listed in
`COVER_ICONS` in `components/ProjectCover.js`. A new project automatically gets a code icon (`fa-code`).
To give it a specific Font Awesome icon, add a line there, e.g. `'my-new-project': 'fa-solid fa-robot',`.
That is the only component change ever needed for a project.

---

## Common mistakes

| Mistake | Result | Fix |
|---|---|---|
| Missing comma between two project blocks | Build fails, nothing deploys | Every `}` before the next `{` needs `},` |
| Duplicate `id` | The second project's detail page shows the wrong project | Make every id unique |
| `categories: ["Web"]` | Project never appears under a filter | Copy the exact key from `projectCategories` |
| `image: "public/images/projects/x.webp"` | Broken image (falls back to cover) | Remove `public`: `/images/projects/x.webp` |
| `Image.webp` on disk, `image.webp` in code | Works on your phone preview cache, breaks on Vercel | Match upper/lower case exactly |
| Deleting a field you don't need | May break the detail page | Keep it as `""` or `[]` |
| Invented metrics ("used by 10k users") | Damages credibility | Only real, verifiable facts |

## Prompt for an AI agent

```text
Read docs/ADD-PROJECT.md and add a new project to data/projects.js using the existing structure.
Place it after <project title>. Do not modify unrelated components.
Details:
- title: …
- description: …
- tech: …
- categories: …
- demo: … / GitHub: … / video: …
- status: Live | Completed | In progress
- featured: yes/no
- screenshot: public/images/projects/<id>.webp (already uploaded) or none
- case study: problem, solution, features, challenges, lessons, results: …
Work on a new branch, run the build, and give me the Vercel Preview URL.
```
