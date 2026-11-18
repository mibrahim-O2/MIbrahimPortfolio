# Homepage Sections: Order, Visibility, New Sections

## How the homepage is built

The homepage is `app/page.js`. It lists section components from the `sections/` folder, top to bottom:

```jsx
export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <ExpertiseSection />
      <ExperienceSection />
      <AboutSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
    </>
  );
}
```

**The order of these lines is the order on the page.** The navigation bar, footer, scroll progress bar and
back-to-top button are not sections. They come from `app/layout.js` and appear on every page automatically.

| # | Component | File | `id` (anchor) | Content comes from | Own page |
|---|---|---|---|---|---|
| 1 | `HeroSection` | `sections/HeroSection.js` | `home` | `data/personal.js` (+ counts from projects, experience, certificates) | - |
| 2 | `ProjectsSection` | `sections/ProjectsSection.js` | `projects` | featured projects in `data/projects.js` | `/projects` (archive) |
| 3 | `ExpertiseSection` | `sections/ExpertiseSection.js` | `expertise` | `data/focusAreas.js` | shown on `/about` |
| 4 | `ExperienceSection` | `sections/ExperienceSection.js` | `experience` | `data/experience.js` (**hidden while empty**, see [EXPERIENCE.md](./EXPERIENCE.md)) | `/experience` |
| 5 | `AboutSection` | `sections/AboutSection.js` | `about` | `data/about.js`, gallery highlights | `/about` |
| 6 | `SkillsSection` | `sections/SkillsSection.js` | `skills` | `data/skills.js` | `/skills` |
| 7 | `EducationSection` | `sections/EducationSection.js` | `education` | `data/education.js` + `data/certificates.js` | `/education`, `/certificates` |
| 8 | `ContactSection` | `sections/ContactSection.js` | `contact` | `data/personal.js` | `/contact` |

Not on the homepage, own pages only: `VolunteerSection` (`/volunteer`) and the gallery (`/gallery`). Both are
linked from the About section's "Beyond code" card and from the footer.

Sections are reused on their own pages (`app/<name>/page.js`), so removing one from the homepage does **not**
remove its page.

## Places that link to sections

When you change sections, keep these in sync:

1. **`app/page.js`**: what is rendered and in which order.
2. **`components/Navbar.js`**: the `NAV_ITEMS` list at the top (`label`, `id`, `pages`). Each link goes to
   `/#id`. `pages` lists the routes that highlight the link when you're on them. Contact is a button
   ("Let's talk") on desktop and the last item in the mobile menu.
3. **`sections/FooterSection.js`**: the `QUICK_LINKS` (homepage anchors) and `MORE_LINKS` (other pages) lists.

Optional: `app/sitemap.js` lists pages in `PAGES`; only change it when you add or delete a page.

## Change the order

Move the line in `app/page.js`, then reorder the matching entries in `NAV_ITEMS` and `QUICK_LINKS` so the
menus follow the page. Sections have no numbers in their headings, so nothing else needs renumbering.

## Hide (disable) a section on the homepage

Delete its line from `app/page.js` (or turn it into a comment to keep it as a note):

```jsx
      {/* <SkillsSection /> */}
```

Then:

- Remove its import at the top of `app/page.js` if you deleted the line.
- In `components/Navbar.js` remove its `NAV_ITEMS` entry (the link would point at a missing anchor), and in
  `sections/FooterSection.js` remove it from `QUICK_LINKS`. If it has its own page, you can list that page
  in `MORE_LINKS` instead.

The standalone page keeps working.

## Remove a section completely (page too)

1. Remove it from `app/page.js`, the navbar and the footer as above.
2. Delete its page folder `app/<name>/` and remove the path from `PAGES` in `app/sitemap.js`.
3. Search the repo for the component name before deleting the component file. Other pages may use it
   (e.g. `EducationSection` is used by `/education` and `/certificates`).

## Edit a section's heading

Each section's eyebrow, title and lead text are at the top of its file in `sections/`, in the
`<SectionHeader eyebrow="…" title="…" lead="…" />` line. Edit the text there. Section content itself always
comes from `data/`.

## Add a new section

Example: a "Publications" section.

1. **Data:** create `data/publications.js`:

   ```js
   export const publicationsData = [
     { id: "paper-1", title: "…", venue: "…", year: "2026", url: "https://…" }
   ];
   ```

2. **Section component:** create `sections/PublicationsSection.js`. Copy the structure of a simple section
   such as `sections/SkillsSection.js`:

   ```jsx
   import SectionHeader from '@/components/ui/SectionHeader';
   import Reveal from '@/components/motion/Reveal';
   import { publicationsData } from '@/data/publications';

   export default function PublicationsSection({ headingLevel = 'h2' }) {
     return (
       <section id="publications" className="section">
         <div className="container">
           <SectionHeader as={headingLevel} eyebrow="Research" title="Publications" />
           <ul>
             {publicationsData.map((item) => (
               <Reveal as="li" key={item.id} className="card" style={{ padding: '1.25rem', marginBottom: '0.75rem' }}>
                 <a className="link" href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                 <p className="mono" style={{ color: 'var(--text-muted)' }}>{item.venue} · {item.year}</p>
               </Reveal>
             ))}
           </ul>
         </div>
       </section>
     );
   }
   ```

   Shared building blocks you can use: `section`, `container`, `card`, `btn btn-primary` / `btn btn-ghost`,
   `tag`, `eyebrow`, `link` classes (in `styles/globals.css`), `SectionHeader`, and `Reveal` (scroll-in animation).
   For more styling, add a `PublicationsSection.module.css` file next to the component, like the other sections.
3. **Homepage:** import it in `app/page.js` and place `<PublicationsSection />` where it should appear.
4. **Navigation:** add `{ label: 'Publications', id: 'publications', pages: [] }` to `NAV_ITEMS` (keep the
   desktop menu to about 5 items) and/or a footer quick link.
5. Optional own page: create `app/publications/page.js`:

   ```jsx
   import PublicationsSection from '@/sections/PublicationsSection';
   export const metadata = { title: 'Publications | Muhammad Ibrahim' };
   export default function Page() {
     return <div className="subpage"><PublicationsSection headingLevel="h1" /></div>;
   }
   ```

   and add `'/publications'` to `PAGES` in `app/sitemap.js`.

## Common mistakes

| Mistake | Result |
|---|---|
| Removing a section but keeping its navbar link | The link scrolls nowhere on the homepage |
| Two sections with the same `id` | Navigation jumps to the first one |
| Deleting a component that another page imports | Build fails. Search for its name first |
| A new page without the `subpage` wrapper | Its heading hides under the fixed navigation bar |

## Prompt for an AI agent

```text
Read docs/UPDATE-HOMEPAGE-SECTIONS.md. On the homepage:
- move <Section> after <Section>
- hide <Section> (keep its standalone page)
Keep the navbar and footer links in sync. Work on a branch and give me the Preview URL.
```
