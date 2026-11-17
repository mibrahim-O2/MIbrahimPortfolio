# Update Your Profile

Your personal information is split across three data files:

| File | Contains |
|---|---|
| `data/personal.js` | Name, title, greeting, availability, photo, email, phone, location, social links, hero typing lines |
| `data/about.js` | The About section text (and its highlighted words) |
| `data/focusAreas.js` | The four expertise cards under the About section |

Components read these files. **Never type your email, phone or links directly into a component.**
They are all read from `data/personal.js`, so one edit updates the hero, contact section, footer,
terminal and chatbot together.

---

## `data/personal.js`

```js
export const personalInfo = {
  name: "Muhammad Ibrahim",
  greeting: "Welcome, I'm",
  title: "Full-Stack & AI Integration Engineer",
  statusPill: "Open to Work: Full-Stack and AI Engineering Roles",
  avatarUrl: "https://github.com/mibrahim-O2.png?size=400",
  location: "Pakistan",
  email: "contact@mibrahimdev.tech",
  phone: "+92 324 2991303",
  gpa: "3.6 CGPA",
  typingSvgUrl: "https://readme-typing-svg.herokuapp.com?...",
  bio: ...,
  socialLinks: [ ... ]
};
```

| Field | Where it appears | How to change it |
|---|---|---|
| `name` | Hero title (the **last word** gets the copper gradient), About photo alt text, footer © line, terminal, chatbot | Plain text |
| `greeting` | Small line above your name in the hero | e.g. `"Hi, I'm"` |
| `title` | Hero subtitle, terminal, chatbot | Your professional headline |
| `statusPill` | Availability badge at the top of the hero. **The text before the first `:` is coloured** (e.g. "Open to Work:"). | `"Open to Work: Remote AI Engineering Roles"`. Without a colon the whole text is plain. |
| `avatarUrl` | About section photo, chatbot avatar | A full URL, or a local file such as `"/images/profile/portrait.webp"` (see [UPDATE-IMAGES.md](./UPDATE-IMAGES.md)) |
| `location` | Contact section, footer, terminal, chatbot, map on `/contact` | e.g. `"Sindh, Pakistan"` |
| `email` | Contact section, footer, the contact form's destination, `/contact` CV button, terminal, chatbot | Also update the `Email` social link below |
| `phone` | Contact section, footer, terminal, chatbot | Write it readably, e.g. `"+92 324 2991303"`; links are built automatically. Also update the `Phone` social link below |
| `gpa` | Currently not displayed | |
| `typingSvgUrl` | The animated typing lines in the hero (an external image service) | See "Hero typing lines" below. This will be replaced by real text in the redesign. |
| `bio` | Built automatically from `data/about.js`, **don't edit here** | |

### Social links

```js
  socialLinks: [
    { name: "GitHub",   url: "https://github.com/mibrahim-O2",              icon: "fab fa-github" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/muhammad-ibrahim-o2", icon: "fab fa-linkedin-in" },
    { name: "Email",    url: "mailto:contact@mibrahimdev.tech",             icon: "fas fa-envelope" },
    { name: "Phone",    url: "tel:+923242991303",                           icon: "fas fa-phone" },
    { name: "YouTube",  url: "https://www.youtube.com/@mIbrahim_02",        icon: "fab fa-youtube" },
    { name: "X",        url: "https://x.com/MIbraheem_02",                  icon: "" }
  ]
```

- **Keep the `name` values exactly as they are.** Components pick links by name:
  - Hero icons: `GitHub`, `LinkedIn`, `Email`, `Phone` (in that order), in `sections/HeroSection.js`
  - Footer icons: `GitHub`, `LinkedIn`, `X`, `YouTube`, in `sections/FooterSection.js`
  - Terminal `socials` command and chatbot: by name
- `Email` URL must start with `mailto:`; `Phone` URL must start with `tel:` and contain no spaces.
- `X` has an empty `icon` on purpose: Font Awesome 6.4 has no X logo, so `components/XIcon.js` draws it.
- To remove a link from the site, delete its line. It disappears from the hero/footer automatically.
- Adding a brand-new network (e.g. Instagram) to the data is safe, but it is only shown once its name is
  added to the `HERO_SOCIALS` or `FOOTER_SOCIALS` list at the top of those two section files.

### Hero typing lines

The lines are inside `typingSvgUrl` after `lines=`, separated by `;`, with `+` instead of spaces:

```
...&lines=AI+is+not+the+future.+AI+is+the+present.;AI+Integration+%26+Automation;Building+Scalable+Systems;
```

`%26` means `&`. Edit only the part after `lines=`.

---

## `data/about.js` (About text)

```js
export const aboutParagraphs = [
  {
    text: "I am a passionate AI engineer and researcher ...",
    highlights: ["AI engineer", "genetic algorithms", "Google OR-Tools", ...]
  },
  {
    text: "Alongside this, I build full-stack web applications ...",
    highlights: ["full-stack web applications", "applied AI", ...]
  }
];
```

- Each object is one paragraph.
- `highlights` are phrases that get emphasised. **Every highlight must appear word-for-word (any case)
  inside that same paragraph's `text`**, otherwise it is simply not highlighted.
- This text is used by the About section, `/about`, the terminal `about` command and the chatbot.

## `data/focusAreas.js` (expertise cards)

```js
  {
    icon: "fa-solid fa-robot",
    category: "LLM Application and AI Platform Engineering",
    description: "LLM-powered learning platform with code analysis, chat, and assessment workflows.",
    technologies: ["FastAPI", "OpenAI", "Google Gemini", ...],
    evidence: "NueroCode-Official",
    repoUrl: ""
  },
```

| Field | Meaning |
|---|---|
| `icon` | Font Awesome icon |
| `category` | Card title |
| `description` | One sentence |
| `technologies` | Chips on the card |
| `evidence` | Shown as "Built in · <evidence>" (the proof project/repo name) |
| `repoUrl` | Link to that repo, `""` for none |

---

## Things that are **not** in data files yet

Some text is still written directly in components. It will move into data files during the redesign:

- Footer tagline ("Software Developer | Full Stack Engineer | …"): `sections/FooterSection.js`
- Section headings and descriptions: each file in `sections/`
- Mission/Vision cards: `app/about/page.js`
- Résumé card text: `app/contact/page.js`

## Prompt for an AI agent

```text
Read docs/UPDATE-PROFILE.md. Update my profile in data/personal.js (and data/about.js if needed):
- <field>: <new value>
Keep all socialLinks names unchanged. Do not hard-code values in components.
Work on a branch and give me the Preview URL.
```
