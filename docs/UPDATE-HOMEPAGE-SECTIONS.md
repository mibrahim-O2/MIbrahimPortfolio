# Homepage Sections: Order, Visibility, New Sections

## How the homepage is built

The homepage is `app/page.js`. It simply lists section components from the `sections/` folder, top to bottom:

```jsx
      <Navbar />

      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <SkillsSection />
      <VolunteerSection />
      <CertificatesSection />
      <GalleryMarqueeSection />
      <ContactSection />

      <FooterSection />

      <ScrollToTop />
      <FloatingChatbot />
```

**The order of these lines is the order on the page.**

Each section has an `id` that navigation links point to:

| Component | File | `id` | Own page |
|---|---|---|---|
| `HeroSection` | `sections/HeroSection.js` | `home` | - |
| `AboutSection` | `sections/AboutSection.js` | `about` | `/about` |
| `ExperienceSection` | `sections/ExperienceSection.js` | `experience` | `/experience` |
| `EducationSection` | `sections/EducationSection.js` | `education` | `/education` |
| `ProjectsSection` | `sections/ProjectsSection.js` | `projects` | `/projects` |
| `SkillsSection` | `sections/SkillsSection.js` | `skills` | `/skills` |
| `VolunteerSection` | `sections/VolunteerSection.js` | `volunteer` | `/volunteer` |
| `CertificatesSection` | `sections/CertificatesSection.js` | `certificates` | `/certificates` |
| `GalleryMarqueeSection` | `sections/GalleryMarqueeSection.js` | `gallery-marquee-section` | `/gallery` |
| `ContactSection` | `sections/ContactSection.js` | `contact` | `/contact` |
| `FooterSection` | `sections/FooterSection.js` | - | (every page) |

Sections are also reused on their own pages (`app/<name>/page.js`), so removing one from the homepage does
**not** remove its page.

> **Coming in Phase 2:** the redesigned homepage will use the order
> Hero → Featured Projects → Technical Expertise → Experience → About → Technology Stack →
> Education & Certifications → Contact. This guide will be updated in the same pull request.

## Three places that list sections

When you change sections, keep these in sync:

1. **`app/page.js`**: what is rendered and in which order.
2. **`components/Navbar.js`**: the `navItems` list (`name`, `sectionId`, `pagePath`). On the homepage a nav
   link scrolls to `#sectionId`; on other pages it opens `pagePath`.
3. **`sections/FooterSection.js`**: the `QUICK_LINKS` list (`/#sectionId` links).

Optional: `app/sitemap.js` lists sub-pages in `PAGES`; only change it when you add or delete a page.

## Change the order

Move the line in `app/page.js`. Then reorder the matching entries in `navItems` (Navbar) and `QUICK_LINKS`
(Footer) so the menu follows the page.

## Hide (disable) a section on the homepage

Delete the line from `app/page.js` (or put `{/* … */}` around it to keep it as a note):

```jsx
      {/* <VolunteerSection /> */}
```

Then:

- In `components/Navbar.js`, either remove its `navItems` entry or keep it. On the homepage it would then
  point at a missing `#id`, so **remove it**, or link to the standalone page instead.
- Remove it from `QUICK_LINKS` in the footer if it is there.
- If nothing else imports the section, also remove its `import` line at the top of `app/page.js`
  (unused imports are harmless but untidy).

The standalone page (e.g. `/volunteer`) keeps working.

## Remove a section completely (page too)

Only do this if you're sure:

1. Remove it from `app/page.js`, the navbar and the footer as above.
2. Delete its page folder `app/<name>/` and remove the path from `PAGES` in `app/sitemap.js`.
3. Leave the data file and components in place unless you also want to delete the content.

## Add a new section

Example: a "Publications" section.

1. **Data:** create `data/publications.js`:

   ```js
   export const publicationsData = [
     { id: "paper-1", title: "…", venue: "…", year: "2026", url: "https://…" }
   ];
   ```

2. **Section component:** create `sections/PublicationsSection.js`, following the pattern of an existing
   section such as `sections/CertificatesSection.js`: a `<section id="publications" className="section">`,
   a `<div className="container">`, a `SectionTitle`, and a list that maps over `publicationsData`.
3. **Homepage:** import it in `app/page.js` and place `<PublicationsSection />` where it should appear.
4. **Navigation:** add `{ name: 'Publications', sectionId: 'publications', pagePath: '/#publications' }` to
   `navItems` and a footer quick link if wanted.
5. Optional own page: copy `app/certificates/page.js` to `app/publications/page.js`, swap the section, and add
   `'/publications'` to `PAGES` in `app/sitemap.js`.

## Floating elements

`ScrollToTop` and `FloatingChatbot` at the bottom of `app/page.js` are buttons that float over the page, not
sections. Deleting their line removes them from the homepage.

## Common mistakes

| Mistake | Result |
|---|---|
| Removing a section but keeping its navbar link | Tapping the link does nothing on the homepage |
| Two sections with the same `id` | Navigation jumps to the first one |
| Deleting a section component that another page imports | Build fails. Search for its name before deleting |

## Prompt for an AI agent

```text
Read docs/UPDATE-HOMEPAGE-SECTIONS.md. On the homepage:
- move <Section> after <Section>
- hide <Section> (keep its standalone page)
Keep the navbar and footer links in sync. Work on a branch and give me the Preview URL.
```
