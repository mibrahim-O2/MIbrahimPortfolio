// Professional experience, displayed by components/ExperienceStack.js.
// Shape: { id, company, project, role, start, end, period, logo, icon, points: [] }
//  - start / end: ISO dates ("2026-06-10") used to compute the duration chip; use null when only years are known
//  - period: display string
//  - logo: path in /public (exact file name and casing), or null -> the `icon` (Font Awesome class) is shown instead
// Order: newest first by end date; entries without dates last.
export const experienceData = [
  {
    id: "imcs-timetable",
    company: "IMCS, University of Sindh",
    project: "Timetable Automation",
    role: "Software Developer and Researcher",
    start: "2026-06-10",
    end: "2026-11-10",
    period: "10 Jun 2026 – 10 Nov 2026",
    logo: "/logos/IMCSLogo.png",
    icon: null,
    points: [
      "Replaced the manual, spreadsheet-style timetable process at IMCS with an automated scheduling system that generates conflict-free timetables for the department.",
      "Researched Google OR-Tools alongside genetic algorithms for constraint-based scheduling, and implemented a genetic algorithm engine with hard constraints, weighted fitness penalties, custom crossover and mutation operators, and constructive seeding, served through a FastAPI backend."
    ]
  },
  {
    id: "dairy-v2",
    company: "Bin Khalid Dairy Farm",
    project: "Management System V2",
    role: "Independent Software Developer",
    start: "2026-06-07",
    end: "2026-09-15",
    period: "07 Jun 2026 – 15 Sep 2026",
    logo: "/logos/logoDairy.png",
    icon: null,
    points: [
      "Rebuilt the farm's management system as an advanced full-stack platform using Next.js, TypeScript, Drizzle ORM, and Firebase, replacing the earlier Flask version.",
      "Delivers billing, inventory, and reporting through operational dashboards, secured with session-based authentication and Firestore security rules.",
      "Built as a self-driven project to learn modern full-stack development while solving a real day-to-day problem."
    ]
  },
  {
    id: "finlytics",
    company: "Finlytics",
    project: "Personal Finance Tracker",
    role: "Independent Software Developer (Personal Project)",
    start: "2026-07-20",
    end: "2026-08-25",
    period: "20 Jul 2026 – 25 Aug 2026",
    logo: null,
    icon: "fa-solid fa-chart-pie",
    points: [
      "Built a private, full-stack finance application in React and Supabase to track income, expenses, monthly spending goals, account balances, and money owed by others, used in my own daily routine.",
      "Designed the Postgres schema with Row-Level Security and an atomic balance-change function, and added scheduled Edge Functions that deliver daily reminders and monthly and annual reports by email.",
      "Built as a self-driven project to learn modern full-stack development while solving a real day-to-day problem."
    ]
  },
  {
    id: "dairy-v1",
    company: "Bin Khalid Dairy Farm",
    project: "Management System V1",
    role: "Independent Software Developer",
    start: "2025-03-10",
    end: "2025-04-05",
    period: "10 Mar 2025 – 05 Apr 2025",
    logo: "/logos/logoDairy.png",
    icon: null,
    points: [
      "Built a Flask and SQLite web application to manage dairy farm operations and billing, with a bilingual Urdu and English interface.",
      "Added mobile-optimized bill sharing so bills can be sent directly from a phone.",
      "Built as a self-driven project to learn modern full-stack development while solving a real day-to-day problem."
    ]
  },
  {
    id: "abstractminds",
    company: "AbstractMinds",
    project: "Academic Project Leadership",
    role: "Team Lead",
    start: null,
    end: null,
    period: "2025 – 2026",
    logo: null,
    icon: "fa-solid fa-people-group",
    points: [
      "Led a three-person team on the AI Lab course project, building an AI-based system that predicts student performance and generates adaptive learning recommendations.",
      "Led the same team through the final year project, coordinating design, development, and delivery under faculty supervision."
    ]
  }
];
