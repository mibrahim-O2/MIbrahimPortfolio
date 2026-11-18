# Update Your Profile

Your personal information is split across three data files:

| File | Contains |
|---|---|
| `data/personal.js` | Name, title, hero headline and intro, availability, photo, email, location, social links, résumé link |
| `data/about.js` | The About section text (and its highlighted phrases) |
| `data/focusAreas.js` | The Technical Expertise cards |

Components read these files. **Never type your email or links directly into a component.** One edit
in `data/personal.js` updates the hero, navigation menu, contact section and footer together.

---

## `data/personal.js`

```js
export const personalInfo = {
  name: "Muhammad Ibrahim",
  greeting: "Welcome, I'm",
  title: "Agentic AI & Automation Engineer",
  headline: "I build AI agents and automation that businesses can actually trust.",
  headlineAccent: "AI agents",
  intro: "Voice agents that book appointments, multi-agent systems that …",
  resumeUrl: "",
  statusPill: "Open to Work: Agentic AI, Automation and Full-Stack Roles",
  avatarUrl: "https://github.com/mibrahim-O2.png?size=400",
  location: "Pakistan",
  email: "contact@mibrahimdev.tech",
  gpa: "3.6 CGPA",
  bio: ...,
  socialLinks: [ ... ]
};
```

| Field | Where it appears | Notes |
|---|---|---|
| `name` | Hero (above the headline), navbar logo (initials + name), footer, page titles | Plain text. The navbar logo uses the first letters of the first and last word. |
| `title` | Hero (next to your name), footer tagline | Your professional title |
| `headline` | The big animated hero heading (`<h1>`) | One sentence. About 8–14 words looks best. |
| `headlineAccent` | The words inside `headline` that get the copper gradient | Must appear **word for word** in `headline` (any upper/lower case). `""` = no gradient. |
| `intro` | Paragraph under the hero heading | 1–2 sentences |
| `resumeUrl` | Shows a **Résumé** button in the hero when filled | Upload `public/resume.pdf` and set `resumeUrl: "/resume.pdf"`. `""` = no button. |
| `statusPill` | Availability badge at the top of the hero. **The text before the first `:` is bold** (e.g. "Open to Work"). | `"Open to Work: Remote AI Engineering Roles"`. Use `""` to hide the badge. |
| `avatarUrl` | Hero portrait card | A local file such as `"/images/profile/portrait.webp"` (square, see [UPDATE-IMAGES.md](./UPDATE-IMAGES.md)) or a GitHub avatar URL. A photo from any other website must also be added to `img-src` in `next.config.js` (see [DEPLOYMENT.md](./DEPLOYMENT.md#security-headers)). |
| `location` | Contact section | e.g. `"Sindh, Pakistan"` |
| `email` | Contact section, contact form destination, footer call to action, hero icon | Also update the `Email` social link below |
| `greeting`, `gpa` | Currently not displayed | |
| `bio` | Built automatically from `data/about.js`. **Don't edit it here.** | |

### Social links

```js
  socialLinks: [
    { name: "GitHub",   url: "https://github.com/mibrahim-O2",                  icon: "fab fa-github" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/muhammad-ibrahim-o2", icon: "fab fa-linkedin-in" },
    { name: "Email",    url: "mailto:contact@mibrahimdev.tech",                 icon: "fas fa-envelope" },
    { name: "YouTube",  url: "https://www.youtube.com/@mIbrahim_02",            icon: "fab fa-youtube" },
    { name: "X",        url: "https://x.com/MIbraheem_02",                      icon: "" }
  ]
```

- **Keep the `name` values exactly as they are.** Components pick links by name:

  | Where | Links shown (in this order) | List defined in |
  |---|---|---|
  | Hero icons | GitHub, LinkedIn, Email | `HERO_SOCIALS` in `sections/HeroSection.js` |
  | Contact section | Email, LinkedIn, GitHub | `CHANNELS` in `sections/ContactSection.js` |
  | Mobile menu | GitHub, LinkedIn, Email | `MENU_SOCIALS` in `components/Navbar.js` |
  | Footer icons | GitHub, LinkedIn, X, YouTube | `FOOTER_SOCIALS` in `sections/FooterSection.js` |

- `Email` URL must start with `mailto:`.
- `X` has an empty `icon` on purpose: Font Awesome 6.4 has no X logo, so `components/XIcon.js` draws it.
- To remove a link from the site, delete its line. It disappears everywhere automatically.
- A brand-new network (e.g. Instagram) can be added to the data safely, but it is only shown once its name
  is added to one of the lists in the table above.
- **Phone number:** the site intentionally shows no phone number; email is the contact method. To add one
  back, add `phone` and a `Phone` social link (`url: "tel:+92…"`, `icon: "fas fa-phone"`) and ask the agent to list
  it in `CHANNELS` (contact section) and the footer.

---

## `data/about.js` (About text)

```js
export const aboutParagraphs = [
  {
    text: "I am a passionate AI engineer and researcher ...",
    highlights: ["AI engineer", "genetic algorithms", "Google OR-Tools", ...]
  },
  ...
];
```

- Each object is one paragraph.
- `highlights` are phrases shown with a copper marker underline. **Every highlight must appear
  word-for-word (any case) inside that paragraph's `text`**, otherwise it is simply not highlighted.

## `data/focusAreas.js` (Technical Expertise cards)

```js
  {
    icon: "fa-solid fa-shield-halved",
    category: "Security Engineering and Verifiable Evidence",
    description: "Security-testing agents where AI can plan the tests but only deterministic code verifies a finding…",
    evidence: "FinLexPurple",
    projectId: "finlexpurple",
    repoUrl: "https://github.com/FinLexPurple/finlexpurple"
  },
```

| Field | Meaning |
|---|---|
| `icon` | Font Awesome icon |
| `category` | Card title |
| `description` | One or two sentences |
| `projectId` | Id of the project that proves this skill (from `data/projects.js`). The card shows **Proof: <project title>** and links to its case study. |
| `evidence` | Fallback text ("Built in · …") shown only when `projectId` is empty or not found |
| `repoUrl` | Kept for reference; not displayed |

The cards have no technology chips: the Tech Stack section (`data/skills.js`) already lists them.

Card order = array order. On desktop the first two cards are wider.

---

## Text that lives in components

Section headings (eyebrow, title, lead) are written at the top of each file in `sections/`
(the `<SectionHeader … />` line), plus:

- Contact heading "Let's build something that works.": `sections/ContactSection.js`
- About "Beyond code" card text: `sections/AboutSection.js`
- Footer tagline: `sections/FooterSection.js` (it uses `title` + a short sentence)

Ask the agent to edit those lines directly; they are plain text.

## Prompt for an AI agent

```text
Read docs/UPDATE-PROFILE.md. Update my profile in data/personal.js (and data/about.js if needed):
- <field>: <new value>
Keep all socialLinks names unchanged. Do not hard-code values in components.
Work on a branch and give me the Preview URL.
```
