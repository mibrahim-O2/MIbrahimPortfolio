// Volunteer entries shown by components/VolunteerCards.js (home + /volunteer).
// Shape: { id, role, organization, period, years (array | null), logos: [{ src, alt }], icon, description }.
// `organization` may be "" (nothing is rendered for it). A card shows cream logo plates when `logos` has
// entries, otherwise a gradient icon tile with `icon`. `years` renders as small chips when present.
export const volunteerData = [
  {
    id: 'fyp-exhibition-2026',
    role: "Volunteer, Seniors' Project Exhibition",
    organization: '',
    period: '10 Feb 2026',
    years: null,
    logos: [],
    icon: 'fa-solid fa-lightbulb',
    description:
      "Volunteered at the seniors' project exhibition and used the opportunity to study the projects on display in depth. The experience exposed me to new trends and helped me refine my understanding of the work being presented."
  },
  {
    id: 'sports-gala',
    role: 'Volunteer, Sports Gala',
    organization: '',
    period: '2024 · 2025 · 2026',
    years: ['2024', '2025', '2026'],
    logos: [],
    icon: 'fa-solid fa-trophy',
    description:
      'Volunteered at the Sports Gala for three consecutive years (2024, 2025, and 2026), supporting event management and working alongside the sports team to help the event run smoothly.'
  },
  {
    id: 'ict-lab',
    role: 'Volunteer, ICT Lab',
    organization: 'IMCS, University of Sindh, Jamshoro',
    period: '05 Feb 2023 – 12 Jun 2023',
    years: null,
    logos: [
      { src: '/logos/UOSlogo.png', alt: 'University of Sindh logo' },
      { src: '/logos/IMCSLogo.png', alt: 'IMCS logo' }
    ],
    icon: 'fa-solid fa-computer',
    description:
      "Volunteered in the ICT Lab at IMCS, University of Sindh, Jamshoro, supporting lab operations and gaining early hands-on exposure to the department's computing environment."
  }
];
