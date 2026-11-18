# Portfolio Documentation

This folder explains how to update every part of the portfolio **without understanding the whole codebase**.

The website is a **static, data-driven Next.js site**. There is no database, no admin panel and no login.
All content (projects, experience, education, skills, contact details…) lives in plain JavaScript files in the
`data/` folder. Pages and components only *read* those files and display them.

To change content you change a data file, commit it on a branch, check the Vercel Preview on your phone,
then merge it into `main`.

---

## Where each piece of content lives

| What you want to change | File | Guide |
|---|---|---|
| Projects (cards, detail pages, featured, hidden) | `data/projects.js` | [ADD-PROJECT.md](./ADD-PROJECT.md), [UPDATE-PROJECT.md](./UPDATE-PROJECT.md) |
| Professional experience | `data/experience.js` | [ADD-EXPERIENCE.md](./ADD-EXPERIENCE.md) |
| Education | `data/education.js` | [ADD-EDUCATION.md](./ADD-EDUCATION.md) |
| Certifications | `data/certificates.js` | [ADD-CERTIFICATION.md](./ADD-CERTIFICATION.md) |
| Technical skills and soft skills | `data/skills.js` | [UPDATE-SKILLS.md](./UPDATE-SKILLS.md) |
| Name, hero headline and intro, email, phone, location, social links, résumé link | `data/personal.js` | [UPDATE-PROFILE.md](./UPDATE-PROFILE.md) |
| About text | `data/about.js` | [UPDATE-PROFILE.md](./UPDATE-PROFILE.md) |
| Technical Expertise cards | `data/focusAreas.js` | [UPDATE-PROFILE.md](./UPDATE-PROFILE.md) |
| Volunteer work | `data/volunteer.js` | [PROJECT-STRUCTURE.md](./PROJECT-STRUCTURE.md) |
| Gallery photos and categories | `public/gallery/`, `data/gallery.js`, `utils/galleryLoader.js` | [UPDATE-IMAGES.md](./UPDATE-IMAGES.md) |
| Any image (screenshots, logos, certificates) | `public/…` | [UPDATE-IMAGES.md](./UPDATE-IMAGES.md) |
| Order and visibility of homepage sections | `app/page.js` (+ navbar and footer links) | [UPDATE-HOMEPAGE-SECTIONS.md](./UPDATE-HOMEPAGE-SECTIONS.md) |
| Publishing changes | GitHub → Vercel | [DEPLOYMENT.md](./DEPLOYMENT.md) |
| What every folder and file does | - | [PROJECT-STRUCTURE.md](./PROJECT-STRUCTURE.md) |

---

## Golden rules

1. **Change data, not components.** Almost every content change is an edit to one file in `data/`.
   If a guide does not say to touch a component, don't.
2. **One source of truth.** Each fact (your email, a project link…) is written in exactly one place.
   Never copy it into a component.
3. **Keep the JavaScript valid.** Every object needs its `{ }`, every item in a list is separated by a comma,
   and text goes inside double quotes `"…"`. A missing comma or quote breaks the build. Vercel will then
   refuse to deploy and the live site stays on the previous version, so nothing breaks for visitors.
4. **Image paths start with `/` and match the file name exactly**, including upper/lower case
   (`/logos/IMCSLogo.png` is not the same as `/logos/imcslogo.png` on Vercel).
5. **Never commit straight to `main`.** Use a branch, check the Preview URL, then merge.
   See [DEPLOYMENT.md](./DEPLOYMENT.md).

---

## How to ask an AI coding agent for an update

Copy one of these prompts and fill in the details. Always name the guide; it keeps the agent on the
existing data structure.

```text
Read docs/ADD-PROJECT.md and add a new project using the existing data structure in data/projects.js.
Do not modify unrelated components.
Project details: <title, description, tech, links, …>
Work on a new branch and give me the Vercel Preview URL.
```

```text
Read docs/UPDATE-PROJECT.md. Mark "Finlytics" as featured and replace its image with the screenshot I
uploaded to public/images/projects/finlytics.webp. Only change data/projects.js.
```

```text
Read docs/UPDATE-PROFILE.md and change my availability text to "Open to Work: Remote AI Engineering Roles".
```

```text
Read docs/ADD-CERTIFICATION.md and add this certificate: <title, issuer, date, verification link>.
```

```text
Read docs/UPDATE-HOMEPAGE-SECTIONS.md and hide the Volunteer section from the homepage
(keep the /volunteer page).
```

A good request names: **the guide**, **the exact content**, **what must not change**, and asks for a
**branch + Preview URL**.

---

## Design rules

Colours, fonts and shared styles are defined once in `styles/globals.css` (see
[PROJECT-STRUCTURE.md](./PROJECT-STRUCTURE.md#design-system)). Copper `#D97B4A` is the only accent colour.
When asking for visual changes, ask the agent to reuse the existing tokens and classes rather than adding new
colours or fonts.

When code changes how something is displayed, the matching guide is updated in the same pull request, so
these docs always describe the code on `main`.
