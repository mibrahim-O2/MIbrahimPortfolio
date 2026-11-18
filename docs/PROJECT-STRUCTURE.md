# Project Structure

Next.js 14 (App Router), React 18, plain JavaScript, plain CSS + CSS Modules, Framer Motion for animation.
No database, no backend services.

```
app/            Pages (one folder = one URL), shared layout and page transition
sections/       Page sections used on the homepage and on their own pages (each with a .module.css)
components/     Smaller building blocks (navbar, project card, UI pieces, animation helpers)
data/           ALL editable content (you edit these)
public/         Images and icons (served as-is)
styles/         globals.css (design system) + legacy.css (gallery page and image viewer)
theme/          Animation timings for JavaScript
utils/          Small helpers
docs/           This documentation
scripts/        Build helper that generates the self-hosted icon font
next.config.js  Next.js settings, image optimisation and security headers
package.json    Dependencies: next, react, react-dom, framer-motion (+ build-only: icon packages, subset-font)
```

---

## `app/`: pages and routes

| File | URL | Purpose |
|---|---|---|
| `app/layout.js` | (every page) | Fonts (Inter + JetBrains Mono via `next/font`), SEO metadata, self-hosted icons, navbar, footer, scroll progress, back-to-top |
| `app/template.js` | (every page) | Page transition (fade + rise) and "reduce motion" support for all animations |
| `app/page.js` | `/` | Homepage: lists the sections in order (see [UPDATE-HOMEPAGE-SECTIONS.md](./UPDATE-HOMEPAGE-SECTIONS.md)) |
| `app/projects/page.js` | `/projects` | Project archive with category filters |
| `app/projects/[id]/page.js` + `project.module.css` | `/projects/<id>` | Case study page, one per published project |
| `app/about/page.js` | `/about` | About + Technical Expertise |
| `app/experience/page.js` | `/experience` | Experience (404 while `data/experience.js` is empty) |
| `app/education/page.js` | `/education` | Education |
| `app/certificates/page.js` | `/certificates` | Certifications |
| `app/skills/page.js` + `skills.module.css` | `/skills` | Technology stack + working strengths (soft skills) |
| `app/volunteer/page.js` | `/volunteer` | Volunteer work |
| `app/gallery/page.js` + `layout.js` | `/gallery` | Photo gallery with categories and lightbox |
| `app/contact/page.js` | `/contact` | Contact |
| `app/api/gallery/route.js` | `/api/gallery` | Lists the files in `public/gallery/` (generated at build time) |
| `app/sitemap.js`, `app/robots.js` | `/sitemap.xml`, `/robots.txt` | Search engines |

## `data/`: content (the only folder you normally edit)

| File | Content | Guide |
|---|---|---|
| `projects.js` | Projects, categories, `publishedProjects`, `featuredProjects` | [ADD-PROJECT.md](./ADD-PROJECT.md) |
| `experience.js` | Professional experience (empty for now; the section hides itself) | [EXPERIENCE.md](./EXPERIENCE.md) |
| `education.js` | Education | [ADD-EDUCATION.md](./ADD-EDUCATION.md) |
| `certificates.js` | Certifications | [ADD-CERTIFICATION.md](./ADD-CERTIFICATION.md) |
| `skills.js` | Technology stack + soft skills | [UPDATE-SKILLS.md](./UPDATE-SKILLS.md) |
| `personal.js` | Name, headline, intro, contact details, social links | [UPDATE-PROFILE.md](./UPDATE-PROFILE.md) |
| `about.js` | About paragraphs | [UPDATE-PROFILE.md](./UPDATE-PROFILE.md) |
| `focusAreas.js` | Technical Expertise cards | [UPDATE-PROFILE.md](./UPDATE-PROFILE.md) |
| `volunteer.js` | Volunteer entries: `{ id, role, organization, period, years, logos, icon, description }` | Same pattern as experience |
| `gallery.js` | Gallery categories, highlight order, portrait photos | [UPDATE-IMAGES.md](./UPDATE-IMAGES.md#gallery-photos) |

## `sections/`

| File | Shows |
|---|---|
| `HeroSection.js` | Availability badge, name/title, animated headline, intro, buttons, social icons, portrait card with counts, animated background |
| `ProjectsSection.js` | Featured projects: first one as a large lead card, the rest in a grid |
| `ExpertiseSection.js` | Focus-area cards, each linking to its proof project |
| `ExperienceSection.js` | Timeline with a line that fills as you scroll |
| `AboutSection.js` | Bio with highlights and the "Beyond code" card |
| `SkillsSection.js` | Technology stack cards |
| `EducationSection.js` | Education timeline cards + certifications list (`show` prop: `both`, `education`, `certificates`) |
| `ContactSection.js` | Contact channels + email form |
| `VolunteerSection.js` | Volunteer cards (`/volunteer`) |
| `FooterSection.js` | Email call-to-action, links, socials, © line |

## `components/`

| Component | Purpose |
|---|---|
| `Navbar.js` | Top navigation (`NAV_ITEMS`), animated active pill, hide-on-scroll, full-screen mobile menu |
| `ProjectCard.js` | Project card in three variants: `lead`, `featured`, `compact` |
| `ProjectCover.js` | Project image via `next/image`, with a generated cover fallback (`COVER_ICONS`) |
| `ProjectArchive.js` | Filters + animated grid on `/projects` |
| `PageIntro.js` | Header of standalone pages (back link, title, lead) |
| `ui/SectionHeader.js` | Eyebrow + title + lead used by every section |
| `motion/Reveal.js`, `motion/RevealGroup.js` | Scroll-in animations (Framer Motion) |
| `ImageLightbox.js` | Full-screen image viewer (certificates) |
| `GalleryLightbox.js` | Full-screen viewer for the gallery |
| `ScrollProgress.js` | Thin copper reading-progress bar |
| `ScrollToTop.js` | Back-to-top button (tablet/desktop) |
| `XIcon.js` | X (Twitter) logo |

## Design system

All colours, fonts, spacing and shared classes are in **`styles/globals.css`**:

- **Colour tokens** in `:root`: `--bg #0A0B0D`, `--surface #111317`, `--surface-2 #171A1F`,
  `--accent #D97B4A` (copper, the signature colour), `--accent-hover #E8935F`, `--text #EDEEF0`,
  `--text-muted #A1A7B0`, `--accent-2 #7FA3A6` (secondary, used sparingly), `--border rgba(255,255,255,0.08)`.
- **Fonts:** Inter for text and headings, JetBrains Mono for labels and metadata (`.mono`, `.eyebrow`, `.tag`).
- **Shared classes:** `container`, `section`, `card`, `btn btn-primary`, `btn btn-ghost`, `btn-sm`, `tag`,
  `status`, `eyebrow`, `link`, `text-gradient`, `spotlight`.
- Component-specific styles live in a `*.module.css` file next to each component.
- Every animation respects the visitor's "reduce motion" setting.

Never introduce a new accent colour; reuse the tokens.

## Other files

| Path | Purpose |
|---|---|
| `styles/legacy.css` | Older styles still used by the `/gallery` page and `ImageLightbox` |
| `styles/icons.css`, `public/icons/` | **Generated** icon CSS and fonts (only the icons the site uses). Do not edit by hand |
| `scripts/build-icons.mjs` | Generates the icon files above; runs automatically before `npm run dev` and `npm run build` |
| `theme/motion.js` | Shared animation timings |
| `utils/siteUrl.js` | Public site URL for metadata and sitemap |
| `utils/projectLinks.js` | Builds a project's buttons (live site/demo, GitHub or private repo, video, extra links) and YouTube embed URLs |
| `utils/useSpotlight.js` | Mouse-follow glow on cards |
| `utils/galleryLoader.js` | Gallery file list and captions |
| `utils/highlight.js` | Highlights phrases in the About text |
| `utils/usePrefersReducedMotion.js` | Detects the "reduce motion" setting |
| `next.config.js` | Image optimisation (allowed remote hosts), security headers and the Content-Security-Policy |
| `jsconfig.json` | Lets code import with `@/` (e.g. `@/data/projects`) |

## How data reaches the page

```
data/projects.js ──► sections/ProjectsSection.js ──► components/ProjectCard.js   (homepage, featured)
                 └─► components/ProjectArchive.js ──► components/ProjectCard.js   (/projects)
                 └─► app/projects/[id]/page.js                                    (case studies)
                 └─► app/sitemap.js
```

Every section follows the same idea: **data file → section → components → page**. That's why content
updates almost never need component changes.
