# Update an Existing Project

**File to edit:** `data/projects.js`

Find the project by its `id` or `title` (search the file for the project name), then change only the
fields you need. Field meanings are explained in [ADD-PROJECT.md](./ADD-PROJECT.md#every-field-explained).

Current project ids, in display order:

| id | Title | Featured |
|---|---|---|
| `neurocode` | NeuroCode | ✅ |
| `verdexai` | VerdexAI | ✅ |
| `imcs-scheduler` | IMCS Scheduler | ✅ |
| `ai-tutor-plr` | AI Tutor for Personalized Learning Recommendations | |
| `bin-khalid-dairy-v2` | Bin Khalid Dairy Farm V2 | ✅ |
| `finlytics-tracker` | Finlytics | |
| `pulsegrid` | PulseGrid | |
| `bin-khalid-dairy-farm` | Bin Khalid Dairy Farm V1 | |
| `event-registration-system` | EventHub | |
| `restaurant-management-system` | Restaurant Management System | |
| `url-shortener` | URL Shortener | |

---

## Change the image

1. Upload the new screenshot to `public/images/projects/<id>.webp` (see [UPDATE-IMAGES.md](./UPDATE-IMAGES.md)).
2. Update both fields:

```js
    image: "/images/projects/neurocode.webp",
    ...
    heroBanner: "/images/projects/neurocode.webp",
```

To replace an image that is already a local file, upload the new file **with the same name**. GitHub asks
to replace it, and no code change is needed.

## Change the description or case study

Edit the text inside the quotes. Keep the quotes and the trailing comma:

```js
    description: "New description text here.",
```

If your text contains a double quote, write it as `\"` or use single quotes inside: `'like this'`.

## Change technologies

Edit the `tags` list. One item per line, each in quotes, commas between items, **no comma after the last
item**:

```js
    tags: [
      "Next.js",
      "TypeScript",
      "Drizzle ORM"
    ],
```

## Change links

```js
    demoUrl: "https://new-demo-url.vercel.app/",
    githubUrl: "https://github.com/mibrahim-O2/repo-name",
    videoUrl: "",
```

`""` hides a button. Always use full `https://` URLs.

## Feature or unfeature

```js
    featured: true,    // highlighted project
    featured: false,   // normal project
```

Keep 3–4 featured projects in total.

## Hide (unpublish) a project without deleting it

```js
    published: false,
```

The project disappears from the cards, the terminal and chatbot, and the sitemap, and `/projects/<id>` shows the
404 page. Set it back to `true` to restore it.

## Remove a project permanently

1. Delete the project's whole block, from its `{` to its `},`.
2. Check the comma rules: the block before it must still end with `},` and the list must still end with `];`.
3. Optionally delete its images from `public/images/projects/`.
4. Optionally delete its line from `COVER_ICONS` in `components/ProjectCover.js`.

Prefer `published: false` if you might want it back.

## Change the order

Cut the whole `{ … },` block and paste it at the new position.

## Change status

`status: "Live"`, `"Completed"` or `"In progress"`, spelled exactly like this.

---

## Common mistakes

- Changing the `id` breaks links people already shared. Change the `title` instead.
- Removing a trailing comma when editing text causes a build failure.
- A featured project with `published: false` is hidden. `published` always wins.

## Prompt for an AI agent

```text
Read docs/UPDATE-PROJECT.md. In data/projects.js, update the project with id "<id>":
- <field>: <new value>
Do not change any other project or component. Work on a branch and give me the Preview URL.
```
