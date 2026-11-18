# Update Skills

**File to edit:** `data/skills.js`

It contains two lists:

| Export | Shown where | Displayed by |
|---|---|---|
| `skillCategories` | Technology stack: homepage "Technology stack" section and `/skills` | `sections/SkillsSection.js` |
| `softSkills` | "Working strengths" cards on the `/skills` page only | `app/skills/page.js` |

(`skillsData` at the bottom is just another name for `skillCategories`, kept for compatibility.)

---

## The rule: skills must match your projects

Every technology in `skillCategories` is used in at least one project in `data/projects.js`. The comment
above each card in `data/skills.js` lists which projects use it. Keep it that way:

- **Adding a skill?** Make sure a project (or an experience entry) actually uses it, and add the project to
  the comment above the card.
- **Removing a project?** Check whether any skill was only used in that project, and remove it too.

Current cards: Languages · AI Agents and LLMs · Machine Learning and Data · Backend and APIs · Frontend ·
Databases and Auth · Security, Testing and Delivery.

## Technical skills

Each category is a card:

```js
  {
    id: "frontend",
    title: "Frontend",
    icon: "fa-solid fa-laptop-code",
    items: [
      { name: "React", icon: "devicon-react-original", color: "#61DAFB" },
      { name: "Next.js", icon: "devicon-nextjs-plain", color: "#FFFFFF" }
    ]
  },
```

| Field | Meaning |
|---|---|
| `id` | Unique internal name for the card |
| `title` | Card heading |
| `icon` | Font Awesome icon next to the heading |
| `live` | Optional. `live: true` shows a small green "active" indicator next to the title (no card uses it at the moment) |
| `items` | The skill chips |

Each skill chip:

| Field | Meaning |
|---|---|
| `name` | Technology name, official spelling (`"PostgreSQL"`, `"scikit-learn"`) |
| `icon` | Icon class: a **Devicon** class or a **Font Awesome** class (see below) |
| `color` | The technology's brand colour as a hex code, used for the icon and the chip's hover glow |

### Add a skill

Add one line to the right category's `items`. Put a comma after the previous line:

```js
      { name: "Docker", icon: "devicon-docker-plain", color: "#2496ED" },
```

### Remove a skill

Delete its line. Make sure the line before the closing `]` has **no** trailing comma problem (a trailing
comma is allowed in JavaScript, a missing one between items is not).

### Add a category

Copy a whole category block `{ id, title, icon, items: [...] },` and paste it in the position you want.
Cards are shown in array order.

### Finding icons

1. **Devicon** (preferred for technologies): open <https://devicon.dev>, search the technology and copy the
   class, e.g. `devicon-fastapi-plain`, `devicon-postgresql-plain`. Use the `-plain` or `-original` variant.
   (Devicon v2.16.0 is loaded in `app/layout.js`.)
2. **Font Awesome 6.4 free** (for concepts without a logo): <https://fontawesome.com/v6/search?o=r&m=free>,
   e.g. `fa-solid fa-database`, `fa-solid fa-gears`.
3. Rule used in this file: **a card never repeats an icon**.
4. Brand colours: search "<technology> brand color hex", or use the colour from the official logo.
   Icons are brightened slightly so dark brand colours stay visible, but very dark colours (e.g. `#150458`) may
   still look dim, so pick a lighter shade if needed.

If an icon class is wrong, the chip just shows an empty tile. Check the Preview.

---

## Soft skills

```js
  {
    id: "problem-solving",
    title: "Problem Solving",
    icon: "fa-solid fa-puzzle-piece",
    description: "Breaks complex, constraint-heavy problems such as timetable scheduling into structured, testable solutions."
  },
```

Each needs a unique `id`, a `title`, a Font Awesome `icon` and a one-sentence `description` backed by a real
example.

---

## Related content

- The Technical Expertise cards are in `data/focusAreas.js`, see [UPDATE-PROFILE.md](./UPDATE-PROFILE.md).
- Project technology tags are separate and live in each project's `tags` in `data/projects.js`.

## Common mistakes

| Mistake | Result |
|---|---|
| `icon: "devicon-react"` (missing variant) | Empty icon tile |
| Two skills sharing an `icon` in one card | Looks repetitive; pick another icon |
| `color: "61DAFB"` (no `#`) | Default colour used |
| Missing comma between items | Build fails |

## Prompt for an AI agent

```text
Read docs/UPDATE-SKILLS.md. In data/skills.js (only add skills a project in data/projects.js really uses):
- add "<skill>" to the "<category title>" card (find the right Devicon class and brand colour)
- remove "<skill>"
Do not modify components. Work on a branch and give me the Preview URL.
```
