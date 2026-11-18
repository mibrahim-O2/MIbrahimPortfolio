// Professional experience, shown by sections/ExperienceSection.js (homepage timeline and /experience).
//
// The list is EMPTY on purpose. While it is empty the Experience section, the /experience page, its
// navigation and footer links and its sitemap entry are all hidden automatically.
// Add your first role by following docs/EXPERIENCE.md; everything reappears as soon as the list has an entry.
//
// Shape of one entry: { id, company, project, role, start, end, period, logo, icon, points: [] }
export const experienceData = [];

// True when there is at least one role to show (used to hide links to an empty section)
export const hasExperience = experienceData.length > 0;
