# Project Structure

Next.js 14 (App Router), React 18, plain JavaScript, plain CSS. No database, no backend services.

```
app/            Pages (one folder = one URL)
sections/       Big page sections used on the homepage and on their own pages
components/     Smaller building blocks used inside sections
data/           ALL editable content (you edit these)
public/         Images, video, sounds, favicon (served as-is)
styles/         globals.css (all styling)
theme/          Colour and animation constants for JavaScript
utils/          Small helpers
docs/           This documentation
next.config.js  Next.js settings and security headers
package.json    Dependencies and scripts
```

---

## `app/`: pages and routes

| File | URL | Purpose |
|---|---|---|
| `app/layout.js` | (every page) | HTML `<head>`, SEO metadata, fonts/icon stylesheets, site-wide background, cursor, scroll progress, smooth scroll |
| `app/page.js` | `/` | Homepage: lists the sections in order (see [UPDATE-HOMEPAGE-SECTIONS.md](./UPDATE-HOMEPAGE-SECTIONS.md)) |
| `app/about/page.js` | `/about` | About section + Mission/Vision cards |
| `app/projects/page.js` | `/projects` | All projects with filters |
| `app/projects/[id]/page.js` | `/projects/<id>` | Project detail (case study) page, one per published project |
| `app/experience/page.js` | `/experience` | Experience |
| `app/education/page.js` | `/education` | Education |
| `app/skills/page.js` | `/skills` | Technical + soft skills |
| `app/certificates/page.js` | `/certificates` | Certificates |
| `app/volunteer/page.js` | `/volunteer` | Volunteer work |
| `app/gallery/page.js` | `/gallery` | Photo gallery with categories and lightbox |
| `app/contact/page.js` | `/contact` | Contact section + CV request + map |
| `app/api/gallery/route.js` | `/api/gallery` | Lists the files in `public/gallery/` (generated at build time) |
| `app/sitemap.js` | `/sitemap.xml` | Sitemap for search engines |
| `app/robots.js` | `/robots.txt` | Search engine rules |

## `data/`: content (the only folder you normally edit)

| File | Content | Guide |
|---|---|---|
| `projects.js` | Projects, categories, `publishedProjects`, `featuredProjects` | [ADD-PROJECT.md](./ADD-PROJECT.md) |
| `experience.js` | Professional experience | [ADD-EXPERIENCE.md](./ADD-EXPERIENCE.md) |
| `education.js` | Education timeline | [ADD-EDUCATION.md](./ADD-EDUCATION.md) |
| `certificates.js` | Certifications | [ADD-CERTIFICATION.md](./ADD-CERTIFICATION.md) |
| `skills.js` | Technical skill categories + soft skills | [UPDATE-SKILLS.md](./UPDATE-SKILLS.md) |
| `personal.js` | Name, headline, contact details, social links | [UPDATE-PROFILE.md](./UPDATE-PROFILE.md) |
| `about.js` | About paragraphs | [UPDATE-PROFILE.md](./UPDATE-PROFILE.md) |
| `focusAreas.js` | Expertise cards | [UPDATE-PROFILE.md](./UPDATE-PROFILE.md) |
| `volunteer.js` | Volunteer entries: `{ id, role, organization, period, years, logos, icon, description }` | Same pattern as experience |
| `gallery.js` | Gallery categories, highlight order, portrait photos | [UPDATE-IMAGES.md](./UPDATE-IMAGES.md#gallery-photos) |

## `sections/`: page sections

| File | Shows | Reads data from |
|---|---|---|
| `HeroSection.js` | Intro: badge, name, title, typing lines, buttons, social icons, intro video | `personal.js` |
| `AboutSection.js` | Photo, bio card, terminal widget, focus areas | `personal.js`, `about.js`, `focusAreas.js` |
| `ExperienceSection.js` | Experience heading + stack | `experience.js` |
| `EducationSection.js` | Education heading + timeline | `education.js` |
| `ProjectsSection.js` | Category filters + project cards | `projects.js` |
| `SkillsSection.js` | Technical skill cards | `skills.js` |
| `VolunteerSection.js` | Volunteer cards | `volunteer.js` |
| `CertificatesSection.js` | Certificate wall | `certificates.js` |
| `GalleryMarqueeSection.js` | Scrolling strip of highlight photos | `gallery.js` |
| `ContactSection.js` | Contact details + email form | `personal.js` |
| `FooterSection.js` | Brand, social icons, quick links, contact info | `personal.js` |

## `components/`: building blocks

| Component | Purpose |
|---|---|
| `Navbar.js` | Top navigation + mobile menu (`navItems` list) |
| `SectionTitle.js` | Animated section heading (title, description, ghost text) |
| `ProjectCard.js` | One project card |
| `ProjectCover.js` | Project image with a generated fallback cover (`COVER_ICONS`) |
| `ExperienceStack.js` | Stacked experience cards with duration chips |
| `EducationTimeline.js` | Zig-zag education timeline |
| `CertificateWall.js` | Certificate cards; `ImageLightbox.js` opens certificate images |
| `SkillsStack.js`, `SkillChip.js` | Skill category cards and chips |
| `SoftSkills.js` | Soft-skill cards on `/skills` |
| `AboutBioCard.js` | About paragraphs with highlights |
| `FocusAreas.js` | Expertise bento cards |
| `VolunteerCards.js` | Volunteer cards |
| `GalleryLightbox.js` | Full-screen gallery viewer |
| `TerminalWidget.js` | Interactive terminal in the About section |
| `FloatingChatbot.js` | Keyword-based chat assistant on the homepage |
| `ScrollToTop.js` | Back-to-top button |
| `XIcon.js` | X (Twitter) logo |
| `AmbientBackground.js`, `NeuralBackground.js` | Site-wide animated background |
| `CustomCursor.js`, `ScrollProgress.js`, `SmoothScroll.js`, `AOSInit.js` | Cursor, reading progress bar, smooth scrolling, scroll animations |
| `motion/Reveal.js`, `motion/RevealGroup.js` | Reusable "appear on scroll" wrappers (Framer Motion) |

Several of the effects above (custom cursor, background canvas, AOS, terminal, chatbot, intro video) are
scheduled for removal or redesign in Phase 1–2 of the redesign. This table will be updated then.

## Other folders

| Path | Purpose |
|---|---|
| `styles/globals.css` | All CSS: colour tokens in `:root` at the top, then one block per component |
| `theme/colors.js` | Colour values for JavaScript (canvas drawing). Keep in sync with `:root` in `globals.css` |
| `theme/motion.js` | Shared animation timings |
| `utils/siteUrl.js` | Public site URL for metadata and sitemap |
| `utils/galleryLoader.js` | Gallery file list and captions |
| `utils/sound.js` | Click sound (to be removed in Phase 1) |
| `utils/highlight.js` | Highlights phrases in the About text |
| `utils/usePrefersReducedMotion.js`, `utils/useFinePointer.js` | Detect reduced-motion setting / mouse vs touch |
| `next.config.js` | Next.js settings + security headers |
| `jsconfig.json` | Lets code import with `@/` (e.g. `@/data/projects`) |

## How data reaches the page

```
data/projects.js ──► sections/ProjectsSection.js ──► components/ProjectCard.js ──► app/page.js (/) and app/projects/page.js
                 └─► app/projects/[id]/page.js (detail pages)
                 └─► app/sitemap.js
```

Every section follows the same idea: **data file → section → components → page**. That's why content
updates almost never need component changes.
