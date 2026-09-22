// Projects shown on the home page, /projects and /projects/<id>. Display order = order in this array.
// `tags` is the tech stack. Empty demoUrl / videoUrl / githubUrl / image / heroBanner mean "not available":
// the UI hides that button and shows a generated cover instead of a missing image.
// `status` is "Live", "Completed" or "In progress". `categories` must match the filter labels below exactly.
export const projectCategories = [
  { key: 'all', label: 'All Projects' },
  { key: "AI & Machine Learning", label: "AI & Machine Learning" },
  { key: "Web & Full-Stack", label: "Web & Full-Stack" },
  { key: "Optimization", label: "Optimization" },
  { key: "Freelance & Client", label: "Freelance & Client" },
  { key: "Personal", label: "Personal" }
];

export const projectsData = [
  {
    id: "neurocode",
    title: "NeuroCode",
    subtitle: "Adaptive coding practice with verified execution and verifiable credentials.",
    description: "A solo-built, AI-powered coding education platform with adaptive roadmaps, execution-verified practice, proctored assessments, and publicly verifiable credentials.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&h=760&fit=crop&auto=format&q=70",
    tags: [
      "React",
      "Vite",
      "Tailwind CSS",
      "FastAPI",
      "Python",
      "Supabase (PostgreSQL)",
      "Firebase Auth",
      "Socket.io",
      "ChromaDB",
      "Google Gemini",
      "OpenAI",
      "Tree-sitter",
      "Piston",
      "Monaco Editor",
      "Docker"
    ],
    categories: [
      "AI & Machine Learning",
      "Web & Full-Stack"
    ],
    demoUrl: "https://neurocode-official.netlify.app/",
    githubUrl: "https://github.com/mibrahim-O2/NueroCode-Official",
    videoUrl: "",
    badge: "Solo Project",
    status: "Live",
    heroBanner: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1600&h=900&fit=crop&auto=format&q=70",
    problemStatement: "Coding platforms usually keep practice, grading, and assessment separate. Students can memorize fixed question banks or trust AI-generated answers that were never validated, and assessments offer little proof that the work was genuinely the learner's own.",
    solution: "NeuroCode brings adaptive learning, execution-verified problems, and integrity-aware assessment into one workflow. AI-generated problems are validated by running reference solutions in a sandbox before students see them, submissions are graded against real test cases, and successful learners receive credentials that anyone can verify online.",
    features: [
      "Adaptive roadmap that reorders learning topics based on the learner's weak areas.",
      "AI-generated coding problems, validated by executing reference solutions in a Piston sandbox before being saved.",
      "Submission grading with real test cases and Tree-sitter structural code analysis.",
      "Proctored assessments with server-scored integrity signals: tab switching, large pastes, camera checks, and typing rhythm.",
      "Credential issuance with a public verification page, QR code, and PDF export.",
      "Learner dashboard, profile, leaderboard, and mock interviews, plus an educator and admin panel."
    ],
    architectureDiagram: "Frontend (React + Vite + Monaco Editor) -> FastAPI routes -> Services (roadmap, problem generation, grading, proctoring, credentials) -> AI providers (Gemini, OpenAI) and Piston sandbox for verification -> Supabase PostgreSQL and ChromaDB for data and embeddings -> Firebase Auth for identity -> Credential and verification pages",
    challenges: [
      "AI-generated problem quality was a risk, so every generated reference solution is executed in a sandbox before the task is saved.",
      "The Piston runtime container could start with no language runtimes loaded, which was fixed by recreating the container and documenting the setup steps.",
      "Phase-wise testing exposed an assessment navigation bug that caused a blank screen and camera permission edge cases, which were fixed and re-tested."
    ],
    lessonsLearned: [
      "Owning a large system alone, from architecture and database design to AI integration, testing, and deployment.",
      "Designing a learning loop where generation, validation, and grading all happen before a student sees a problem.",
      "Balancing AI assistance with safe learning constraints, keeping feedback hint-based instead of leaking full answers."
    ],
    results: "Built end to end as a solo project across different development phases, with phase-wise testing reports, a setup and deployment guide, and a user guide."
  },
  {
    id: "verdexai",
    title: "VerdexAI",
    subtitle: "From CV screening to onboarding, in one AI-assisted hiring workflow.",
    description: "An AI-powered recruitment platform that scores CVs, generates job-specific assessments, and manages hiring from application to onboarding, with separate flows for candidates, HR, and admins.",
    image: "https://images.unsplash.com/photo-1635253548172-d82ffe76449d?w=1200&h=760&fit=crop&auto=format&q=70",
    tags: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB (Mongoose)",
      "Firebase Authentication",
      "OpenAI GPT-4o-mini",
      "pdf-parse",
      "Resend",
      "Vercel",
      "Railway"
    ],
    categories: [
      "AI & Machine Learning",
      "Web & Full-Stack"
    ],
    demoUrl: "https://verdexai-official.vercel.app/",
    githubUrl: "https://github.com/mibrahim-O2/verdexai-official",
    videoUrl: "https://youtu.be/s-M_aoWDOkM",
    badge: "Self-Learning Project",
    status: "Live",
    heroBanner: "https://images.unsplash.com/photo-1635253548172-d82ffe76449d?w=1600&h=900&fit=crop&auto=format&q=70",
    problemStatement: "Hiring is usually fragmented across application tracking, CV review, testing, and final decisions. Candidates lack a clear path from finding a job to being evaluated, and recruiters spend hours screening CVs by hand instead of focusing on the best applicants.",
    solution: "VerdexAI puts the whole hiring lifecycle in one platform. Candidates apply with a PDF CV that is parsed and scored by AI against the job requirements, HR ranks applicants by score, and job-specific assessments are generated automatically. Selected candidates move through interview and onboarding stages, and role-based access keeps candidate, HR, and admin actions separate.",
    features: [
      "PDF CV upload with AI parsing and scoring against each job's requirements.",
      "HR job management: create, open, and close postings, with applicants ranked by AI score.",
      "AI-generated, job-specific MCQ assessments with scoring and answer review, plus a fallback question set if generation fails.",
      "Interview scheduling and hiring pipeline stages driven by application status, with email notifications through Resend.",
      "Onboarding tracker with progress steps for finalized hires.",
      "Role-based access for candidates, HR, and admins, enforced with Firebase token verification and role middleware."
    ],
    architectureDiagram: "Frontend (Next.js on Vercel) -> Express API (Railway) -> Firebase token verification and role middleware -> Business modules (jobs, applications, assessments, pipeline, admin) -> MongoDB models -> AI services (pdf-parse and OpenAI GPT-4o-mini for CV scoring and assessments) -> Resend email notifications",
    challenges: [
      "AI output and PDF extraction can fail unpredictably, so failures are caught in the application flow and a fallback question set is used when assessment generation fails.",
      "Three user types share one system, so every request is authenticated with Firebase tokens and checked by role middleware to keep candidate, HR, and admin actions separate.",
      "A hiring process has many stages, so applications move through explicit status transitions and onboarding steps instead of free-form updates."
    ],
    lessonsLearned: [
      "Building and deploying a complete product alone, from database design to frontend and hosting.",
      "Wrapping AI calls in resilient services that handle file input and model output variability.",
      "Separating user journeys and enforcing access rules consistently across frontend and backend."
    ],
    results: "Deployed with the frontend on Vercel and the backend on Railway, with a demo walkthrough video on YouTube: https://youtu.be/s-M_aoWDOkM"
  },
  {
    id: "imcs-scheduler",
    title: "IMCS Scheduler",
    subtitle: "From manual scheduling to automated timetables, papers, and events at IMCS.",
    description: "A unified academic management system for IMCS that automates timetable generation with genetic algorithms and Google OR-Tools, with paper timetables, event and seminar management in development.",
    image: "https://images.unsplash.com/photo-1611302457661-d24c21494f2a?w=1200&h=760&fit=crop&auto=format&q=70",
    tags: [
      "Python",
      "FastAPI",
      "Google OR-Tools",
      "Genetic Algorithm",
      "SQLAlchemy",
      "Alembic",
      "PostgreSQL",
      "Pydantic",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS"
    ],
    categories: [
      "Optimization",
      "Web & Full-Stack"
    ],
    demoUrl: "",
    githubUrl: "https://github.com/mibrahim-O2/IMCS-Scheduler",
    videoUrl: "",
    badge: "Final Year Project",
    status: "In progress",
    heroBanner: "https://images.unsplash.com/photo-1611302457661-d24c21494f2a?w=1600&h=900&fit=crop&auto=format&q=70",
    problemStatement: "Academic scheduling at IMCS was done entirely by hand: class timetables, paper schedules, events, and seminars. The department runs three BS programs with morning and evening shifts, around 14 rooms, labs, and halls, and about 50 teachers, many of whom teach across programs. Avoiding teacher, room, and cross-program clashes manually was slow and error-prone.",
    solution: "An automated scheduling system where a genetic algorithm and Google OR-Tools generate timetables that respect hard constraints such as teacher and room availability, while soft preferences are scored through a weighted fitness function. Academic data lives in PostgreSQL, exposed through a FastAPI backend and a Next.js interface, and the same platform is being extended to paper timetables, events, and seminars.",
    features: [
      "Automated timetable generation using a genetic algorithm (chromosome, hard and soft constraint fitness, operators, constructive seeding) together with Google OR-Tools for constraint-based scheduling.",
      "Domain data model for programs, divisions, course schemes (per program and admission year), classrooms, teachers, courses, and timetables.",
      "Database seed and rematerialization utilities for loading real academic data.",
      "Next.js interface with dashboard, schemes, and timetables sections on top of a versioned FastAPI API.",
      "In development: paper timetable generation.",
      "In development: event and seminar management, and a performance matrix for evaluating schedules."
    ],
    architectureDiagram: "Frontend (Next.js: dashboard, schemes, timetables) -> API (FastAPI, versioned router) -> Database (SQLAlchemy models, PostgreSQL) -> Scheduling layer (genetic algorithm engine and Google OR-Tools solver) -> Generated schedules saved back to the database and shown in the interface",
    challenges: [
      "Teacher initials collide across timetable sheets and refer to different people, so teachers are resolved by full name, using the original scanned timetables as the source of truth.",
      "Many teachers teach across both CS and AI, so cross-program clashes are enforced as hard constraints.",
      "Scheme documents arrive in inconsistent PDF and Word formats, so the design uses extraction with an admin review step instead of blind automatic parsing (in development)."
    ],
    lessonsLearned: [
      "Choosing between metaheuristic search and exact constraint solving depending on the shape of the scheduling problem.",
      "Validating the scheduling logic on a small problem first, then scaling it to real department data.",
      "Real institutional data is messy, so original documents must be the source of truth over any digitized copy."
    ],
    results: "Data scope: about 14 rooms, labs, and halls and about 50 teachers across 3 programs, taken from real 2026 timetables. No performance metrics yet."
  },
  {
    id: "ai-tutor-plr",
    title: "AI Tutor for Personalized Learning Recommendations",
    subtitle: "Personalized study recommendations with explainable AI.",
    description: "A Streamlit AI tutor that recommends study actions from quiz data using a rule-based engine and a decision tree, with explanations and performance dashboards.",
    image: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=1200&h=760&fit=crop&auto=format&q=70",
    tags: [
      "Python",
      "Streamlit",
      "scikit-learn",
      "pandas",
      "NumPy",
      "Plotly"
    ],
    categories: [
      "AI & Machine Learning"
    ],
    demoUrl: "",
    githubUrl: "https://github.com/mibrahim-O2/AI_Tutor_PLR_AbstractMinds",
    videoUrl: "https://www.youtube.com/watch?v=mhN8FOQ0iA8",
    badge: "Course Project",
    status: "Completed",
    heroBanner: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=1600&h=900&fit=crop&auto=format&q=70",
    problemStatement: "Students with the same quiz score can need very different help. Fixed curricula ignore response time, confidence, and prior performance, so a student who guessed correctly and one who truly understood the topic get the same next step. This project turns those learning signals into individual study recommendations.",
    solution: "The app takes quiz inputs and evaluates them with either a rule-based engine or a decision tree classifier. It returns a recommendation, the next topic, a practice count, and a revision flag, explains the reasoning behind each result, and compares both methods in a Streamlit dashboard.",
    features: [
      "Rule-based recommendation engine using score thresholds, response time, confidence, and previous score.",
      "Decision tree training and prediction pipeline for personalized recommendations.",
      "Explainability output showing the reasoning steps and the decision tree's split path.",
      "Interactive Plotly dashboards for topic performance, recommendation distribution, score trends, and student-versus-dataset comparison.",
      "Evaluation module comparing the rule-based engine and the decision tree using standard classification metrics.",
      "Synthetic dataset generator for model training and experimentation."
    ],
    architectureDiagram: "Streamlit app (app.py) -> Input validation and shared thresholds (utils/helpers.py) -> Dataset (data/student_scores.csv) -> Recommendation engine (run_rules, train_model, run_model) -> Recommendation, explanation, charts, and evaluation -> Saved model (models/decision_tree.pkl)",
    challenges: [
      "Rules, helpers, and the dataset generator could drift apart, so score and time thresholds are centralized in one helper module.",
      "Overfitting on a small synthetic dataset was reduced with noisy label generation and a maximum tree depth of 4.",
      "Prediction reliability was improved by saving the trained model, auto-training it if missing, and keeping the feature order fixed between training and prediction."
    ],
    lessonsLearned: [
      "Designing transparent AI that can be explained to a non-technical user instead of a black-box prediction.",
      "Balancing rule-based logic with machine learning so the system stays interpretable and testable.",
      "Leading a three-person team, dividing work across the recommendation engine, UI, and documentation."
    ],
    results: "On the project's synthetic dataset: the decision tree reached about 85% accuracy (F1 about 0.84) compared with about 80% accuracy (F1 about 0.79) for the rule-based engine."
  },
  {
    id: "bin-khalid-dairy-v2",
    title: "Bin Khalid Dairy Farm V2",
    subtitle: "Dairy operations, billing, and finances in one secure dashboard.",
    description: "A full-stack management system for a family dairy farm covering customers, suppliers, employees, livestock, billing, and printable invoices, rebuilt as an advanced V2 from an earlier Flask version.",
    image: "https://images.unsplash.com/photo-1573731281021-d1cc573b3310?w=1200&h=760&fit=crop&auto=format&q=70",
    tags: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "PostgreSQL",
      "Drizzle ORM",
      "Firebase Authentication",
      "Zod"
    ],
    categories: [
      "Web & Full-Stack"
    ],
    demoUrl: "https://bin-khalid-dairy.vercel.app/",
    githubUrl: "https://github.com/mibrahim-O2/Bin-Khalid-Dairy-Farm-V2",
    videoUrl: "",
    badge: "Family Business Project",
    status: "Live",
    heroBanner: "https://images.unsplash.com/photo-1573731281021-d1cc573b3310?w=1600&h=900&fit=crop&auto=format&q=70",
    problemStatement: "A dairy farm deals with customer accounts, supplier purchases, employee salaries, and livestock records every day. When these are scattered across manual records or disconnected tools, billing errors creep in, payments are missed, and the owner cannot see the true financial picture of the business.",
    solution: "V2 is a rewrite of my 2025 Flask system into a typed full-stack application. A single dashboard manages customer ledgers, supplier purchases, payroll, and livestock, backed by PostgreSQL through Drizzle ORM with server-side money handling. Access is protected by Firebase session-based authentication, and invoices can be generated and shared straight from a phone.",
    features: [
      "Customer billing and ledger tracking with detailed statements and payment history.",
      "Supplier purchase management, payment tracking, and monthly statements.",
      "Employee payroll with salary accruals, leave tracking, and deduction calculations.",
      "Livestock and farm-supply records with dashboard statistics.",
      "Printable invoices and statements with mobile share and download support.",
      "Approval-based access: new users stay pending until an administrator activates them."
    ],
    architectureDiagram: "Frontend (Next.js App Router, shadcn/ui) -> Server actions and route handlers -> Authentication (Firebase session and custom claims) -> Database layer (Drizzle ORM, Zod validation) -> PostgreSQL -> Invoice generation and sharing",
    challenges: [
      "Sharing invoice images on mobile browsers produced blank output, which was fixed with Blob-based image generation, careful object URL cleanup, iOS warm-up rendering, and reduced pixel scaling.",
      "Moving from Firestore to PostgreSQL required strict schema control, server-side money handling, and transaction-pooler compatibility work.",
      "A finance-heavy app needed tight access control, so authorization is centralized through Firebase custom claims and server-side session checks, with an approval step for new users."
    ],
    lessonsLearned: [
      "Schema-first database design makes business rules easier to enforce across finance-heavy workflows.",
      "Mobile export and share features need explicit handling for browser and OS restrictions.",
      "Rebuilding a working system means planning the migration path, not just the new features."
    ],
    results: "Rebuilt in 2026 from the 2025 Flask version (Flask and SQLite) into a Next.js, TypeScript, and PostgreSQL system, documented with system architecture, design, and phase documents."
  },
  {
    id: "finlytics-tracker",
    title: "Finlytics",
    subtitle: "One private place for spending, goals, balances, and debts.",
    description: "A private, single-user personal finance app for tracking income, expenses, monthly goals, account balances, and money owed, with automated email reminders and reports.",
    image: "https://images.unsplash.com/photo-1709534486708-fb8f94150d0a?w=1200&h=760&fit=crop&auto=format&q=70",
    tags: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "Recharts",
      "Supabase (PostgreSQL, Auth, Row-Level Security, Edge Functions)"
    ],
    categories: [
      "Web & Full-Stack",
      "Personal"
    ],
    demoUrl: "https://finlytics-tracker.netlify.app/",
    githubUrl: "https://github.com/mibrahim-O2/finlytics-tracker",
    videoUrl: "",
    badge: "Personal Project",
    status: "Completed",
    heroBanner: "https://images.unsplash.com/photo-1709534486708-fb8f94150d0a?w=1600&h=900&fit=crop&auto=format&q=70",
    problemStatement: "Personal spending usually ends up scattered across notes, bank apps, and memory, and money lent to other people is tracked informally. Without one consistent record, it is hard to see where money goes, whether monthly goals are being met, or who still owes what.",
    solution: "Finlytics brings transaction entry, category analysis, monthly goals, account balances, and debtor tracking into a single private app. A React frontend talks to Supabase for data, authentication, and Row-Level Security, while scheduled Edge Functions send daily reminders and monthly and annual reports by email.",
    features: [
      "Income and expense tracking with categories, notes, and date-based history.",
      "Dashboard analytics with a spending trend chart, category breakdown, and a goal progress ring.",
      "Monthly spending goals with progress monitoring.",
      "Account Book for balances, balance history, and money owed by others, with balance changes applied atomically through a database function.",
      "Automated daily reminders and monthly and annual reports delivered by email through scheduled Edge Functions.",
      "Single-user access with public sign-up disabled, protected routes, and Row-Level Security."
    ],
    architectureDiagram: "Frontend (React + Vite, public landing page and protected /app routes) -> AuthContext and DataContext -> Supabase (PostgreSQL, Auth, Row-Level Security, migrations) -> Edge Functions (send-reminder, send-report) triggered by scheduled jobs -> Email delivery",
    challenges: [
      "Securing a single-user app required more than a login screen, so public sign-up is disabled and access is enforced at both the route level and the database level with Row-Level Security.",
      "Balance edits could leave data inconsistent, so they run through a single database function that updates the account, the balance history, and any matching transaction together.",
      "Layouts broke on small screens, which took repeated fixes for stacking controls, text truncation, and minimum widths to stop overflow."
    ],
    lessonsLearned: [
      "Securing a private app needs both client-side route guards and database-level enforcement.",
      "Financial data stays consistent only when related updates run as one transaction.",
      "Scheduled jobs need deduplication and clear guardrails so reminders and reports do not repeat."
    ],
    results: "Built for my own daily finance tracking, with six database migrations and two scheduled Edge Functions for reminders and reports."
  },
  {
    id: "pulsegrid",
    title: "PulseGrid",
    subtitle: "Real-time industrial telemetry that runs with hardware or without it.",
    description: "A hybrid industrial IoT dashboard that monitors machine temperature and pressure from an Arduino in real time, and falls back to a built-in data simulator when no hardware is connected.",
    image: "https://images.unsplash.com/photo-1517055729445-fa7d27394b48?w=1200&h=760&fit=crop&auto=format&q=70",
    tags: [
      "Arduino",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "React",
      "Vite",
      "Tailwind CSS",
      "Socket.io",
      "Firebase Authentication"
    ],
    categories: [
      "Web & Full-Stack",
      "Personal"
    ],
    demoUrl: "",
    githubUrl: "https://github.com/mibrahim-O2/PulseGrid",
    videoUrl: "",
    badge: "Solo Project",
    status: "Completed",
    heroBanner: "https://images.unsplash.com/photo-1517055729445-fa7d27394b48?w=1600&h=900&fit=crop&auto=format&q=70",
    problemStatement: "Industrial equipment needs continuous monitoring of conditions such as temperature and pressure, and without a unified live view, threshold breaches are noticed late. Hardware-based projects are also hard to demonstrate online, because a cloud server has no physical device plugged into it.",
    solution: "PulseGrid combines an Arduino sensor layer with a MERN web dashboard. A Hybrid Detection Engine checks whether a physical Arduino is connected over USB, and if none is found it switches to a mathematically generated simulator. Both sources feed the same real-time pipeline into MongoDB and the React dashboard, so the system works identically with or without hardware.",
    features: [
      "Express API with health check and device lookup, backed by MongoDB through Mongoose.",
      "Device model with status, mode, and configurable threshold settings, plus a seed script for a default monitored device.",
      "Anomaly-only telemetry log that stores threshold breaches instead of every raw reading, keeping storage small.",
      "React and Tailwind dashboard shell with a custom industrial theme.",
      "In development: Hybrid Detection Engine that uses a connected Arduino over serial and falls back to a data simulator when none is present.",
      "In development: live streaming of temperature and pressure to the dashboard through Socket.io, with Firebase Authentication."
    ],
    architectureDiagram: "Arduino sensor node over USB serial, or the built-in simulator -> Hybrid Detection Engine (Node.js) -> Real-time pipeline (Socket.io, in development) -> MongoDB (devices and anomaly logs) -> React dashboard, with Firebase Authentication for access",
    challenges: [
      "Hardware-dependent software cannot be demonstrated on a cloud host with no device attached, so the design uses hardware detection with a simulator fallback that feeds the identical pipeline.",
      "Storing every sensor reading would grow the database quickly, so only threshold breaches are logged as telemetry events.",
      "Monitoring rules should not be hardcoded, so device thresholds live in the database schema and are loaded through seed data."
    ],
    lessonsLearned: [
      "Designing IoT data models around limited storage and high event volume.",
      "Building one pipeline that serves both real hardware and simulated data, so the same code path is tested either way.",
      "Building a hardware and software system in stages, starting with the backend core before the real-time layer."
    ],
    results: "In progress and not deployed yet. The backend core, device and telemetry schemas, and dashboard shell are implemented."
  },
  {
    id: "bin-khalid-dairy-farm",
    title: "Bin Khalid Dairy Farm V1",
    subtitle: "From manual monthly billing to automated dairy invoices.",
    description: "A Flask billing app for a family dairy farm that tracks milk vouchers, calculates monthly bills automatically, and produces printable bilingual Urdu and English invoices shareable as images.",
    image: "https://images.unsplash.com/photo-1523473827533-2a64d0d36748?w=1200&h=760&fit=crop&auto=format&q=70",
    tags: [
      "Python",
      "Flask",
      "SQLite",
      "Bootstrap",
      "html2canvas",
      "Gunicorn"
    ],
    categories: [
      "Web & Full-Stack",
      "Freelance & Client"
    ],
    demoUrl: "",
    githubUrl: "https://github.com/mibrahim-O2/bin-khalid-dairy-farm",
    videoUrl: "",
    badge: "Client Work",
    status: "Completed",
    heroBanner: "https://images.unsplash.com/photo-1523473827533-2a64d0d36748?w=1600&h=900&fit=crop&auto=format&q=70",
    problemStatement: "The farm handled customer milk billing manually every month. Repeated calculations, paper records, and manual reconciliation of totals and dues made the process slow and left room for arithmetic errors, and monthly reporting took longer than it should have.",
    solution: "A Flask web app stores voucher data in SQLite and gives the admin a dashboard for customers and monthly summaries. It calculates total milk, bill amounts, and outstanding dues automatically, and generates printable bilingual bills that can be saved as images and shared straight from a phone.",
    features: [
      "Admin-only login with session protection for the dashboard.",
      "Dashboard with monthly totals, customer list, search, and recent activity.",
      "Add, edit, and delete milk vouchers with a live calculation preview before saving.",
      "Customer history view showing previous vouchers and totals per customer.",
      "Printable, mobile-optimized bill page with bilingual English and Urdu details and payment information.",
      "Save-as-image export for sharing bills on WhatsApp."
    ],
    architectureDiagram: "Browser (Flask templates: dashboard, history, bill, login) -> Flask routes and billing logic (app.py) -> SQLite database -> Bill rendering and image export (bill.html with html2canvas)",
    challenges: [
      "Manual billing math was error-prone, so the calculation logic is centralized in one place and a live preview shows the result before a voucher is saved.",
      "Customers needed bills that look professional and are easy to send, so the bill page is mobile-optimized, bilingual, and can be saved as an image.",
      "Financial records had to stay private, so critical routes are protected with login-required checks and session-based authentication."
    ],
    lessonsLearned: [
      "Turning real operational steps into reliable calculations and data validation.",
      "A simple Flask and SQLite stack can support a genuinely useful business system when the workflow is well structured.",
      "Invoice formatting and reporting matter as much as the billing logic for adoption."
    ],
    results: "Built in 2025 as the first version of the farm's system, and later rebuilt as the advanced V2 (Next.js, TypeScript, PostgreSQL) in 2026."
  },
  {
    id: "event-registration-system",
    title: "EventHub",
    subtitle: "Discover events and manage registrations in one place.",
    description: "A Flask and SQLite event registration app for browsing upcoming events, registering with duplicate-email protection, and cancelling sign-ups.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=760&fit=crop&auto=format&q=70",
    tags: [
      "Python",
      "Flask",
      "SQLite",
      "Jinja2",
      "Bootstrap 5"
    ],
    categories: [
      "Web & Full-Stack"
    ],
    demoUrl: "",
    githubUrl: "https://github.com/mibrahim-O2/Event-Registration-System",
    videoUrl: "",
    badge: "Self-Learning Project",
    status: "Completed",
    heroBanner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&h=900&fit=crop&auto=format&q=70",
    problemStatement: "Students and organizers need a simple way to list upcoming events and collect registrations without a heavy authentication setup. Managing sign-ups through forms or messages makes it easy to lose track of who registered and to accept the same person twice.",
    solution: "A lightweight Flask application renders events and processes registrations, with SQLite storing event and participant data. Jinja2 templates and Bootstrap provide a consistent interface, while server-side validation and flash messages keep the registration flow clear.",
    features: [
      "Dashboard showing the number of available events.",
      "Event listing sorted by date.",
      "Event detail page with description, date, venue, and registration form.",
      "Duplicate registration prevention by email for each event.",
      "Registered participants list for every event.",
      "Registration cancellation with a confirmation prompt."
    ],
    architectureDiagram: "Browser (Jinja2 templates with Bootstrap) -> Flask routes and validation (app.py) -> SQLite database (database.py) -> Event and registration records",
    challenges: [
      "Duplicate sign-ups were prevented by checking for an existing registration with the same event and email before inserting a new record.",
      "Bad input was handled by validating email values in the registration route and showing clear feedback with flash messages.",
      "UI consistency across pages was kept through a shared base template and custom CSS, which also removed repeated markup."
    ],
    lessonsLearned: [
      "Building a complete small web app with Flask and SQLite, from routes to database schema.",
      "Structuring reusable Jinja templates and Bootstrap layouts.",
      "Handling form validation and user feedback with flash messages and confirmation flows."
    ],
    results: "Completed as one of my backend development and self learning."
  },
  {
    id: "restaurant-management-system",
    title: "Restaurant Management System",
    subtitle: "Menu, orders, and reservations in one simple system.",
    description: "A Flask and SQLite restaurant app for browsing the menu, placing orders with automatic totals, and managing table reservations.",
    image: "https://images.unsplash.com/photo-1613274554329-70f997f5789f?w=1200&h=760&fit=crop&auto=format&q=70",
    tags: [
      "Python",
      "Flask",
      "SQLite",
      "Jinja2",
      "Bootstrap 5"
    ],
    categories: [
      "Web & Full-Stack",
      "Personal"
    ],
    demoUrl: "",
    githubUrl: "https://github.com/mibrahim-O2/Restaurant-Management-System",
    videoUrl: "",
    badge: "Self-Learning Project",
    status: "Completed",
    heroBanner: "https://images.unsplash.com/photo-1613274554329-70f997f5789f?w=1600&h=900&fit=crop&auto=format&q=70",
    problemStatement: "Small restaurants need a simple way to show their menu and keep track of customer orders and table bookings without a full enterprise system. This project explores how that workflow can be built end to end with a lightweight stack, keeping menu, order, and reservation data in one database.",
    solution: "A Flask application serves the menu and forms, records orders with automatically calculated totals, and stores reservations in SQLite. Jinja2 templates and Bootstrap provide a simple management interface, and the database is initialized and seeded with menu items on first run.",
    features: [
      "Menu browsing grouped by category.",
      "Order creation with customer name, item selection, quantity, and an automatically calculated total.",
      "Order list with the option to delete any order.",
      "Table reservations by table and date, with a list view and cancellation.",
      "Input validation for orders and reservations.",
      "Custom 404 error page."
    ],
    architectureDiagram: "Browser (Jinja2 templates with Bootstrap) -> Flask routes (app.py) -> SQLite database (menu, orders, and reservations tables) -> Menu seeded on first run (database.py)",
    challenges: [
      "Database setup was centralized in one module that creates the tables and seeds the menu once, so the app starts from a clean, consistent state.",
      "Bad input such as empty names, missing items, invalid quantities, or incomplete reservations is rejected in the routes before anything is stored.",
      "The management workflow was kept simple, with direct SQL queries and clear delete and cancel actions, which limited complexity."
    ],
    lessonsLearned: [
      "Combining Flask routes, Jinja templates, and SQLite into a working full-stack app.",
      "Implementing form validation and CRUD actions for orders and reservations.",
      "Structuring a project so interface, styling, and database setup stay separate."
    ],
    results: "Built as a self-learning project to practice full-stack fundamentals with Flask, SQLite, and Jinja2."
  },
  {
    id: "url-shortener",
    title: "URL Shortener",
    subtitle: "Short, shareable links for long URLs.",
    description: "A Flask web app that turns long URLs into short codes, stores them in SQLite, and redirects visitors to the original link.",
    image: "https://images.unsplash.com/photo-1488272690691-2636704d6000?w=1200&h=760&fit=crop&auto=format&q=70",
    tags: [
      "Python",
      "Flask",
      "SQLite",
      "Bootstrap"
    ],
    categories: [
      "Web & Full-Stack",
      "Personal"
    ],
    demoUrl: "",
    githubUrl: "https://github.com/mibrahim-O2/Url-Shortener",
    videoUrl: "",
    badge: "Self-Learning Project",
    status: "Completed",
    heroBanner: "https://images.unsplash.com/photo-1488272690691-2636704d6000?w=1600&h=900&fit=crop&auto=format&q=70",
    problemStatement: "Long URLs are hard to share, remember, and paste cleanly into messages and documents. This project explores how a lightweight link-shortening service works, from validating input to redirecting visitors, using a simple web stack.",
    solution: "The app accepts a long URL through a web form, validates it, and generates a unique random short code. The code and original URL are stored in SQLite, and the app returns a shareable short link. Opening that link triggers a Flask route that looks up the code and redirects to the original destination.",
    features: [
      "URL input form with validation for empty or malformed submissions.",
      "Random short-code generation with a uniqueness check before saving.",
      "SQLite storage of original URL and short-code pairs.",
      "Redirect from a short link to the original URL.",
      "Result page showing the generated short link next to the original URL.",
      "Friendly 404 page when a short code does not exist."
    ],
    architectureDiagram: "Browser (index page) -> Flask routes and validation (app.py) -> SQLite database (database.py) -> Short code generated and saved -> Redirect route looks up the code -> Browser opens the original URL",
    challenges: [
      "Two URLs could end up with the same short code, so the app keeps generating a new random code until it finds one that is not already stored.",
      "Invalid submissions needed to be blocked before saving, so empty values and URLs that do not start with http:// or https:// are rejected.",
      "Unknown short links should not crash the app, so the redirect route returns a 404 page instead of a server error."
    ],
    lessonsLearned: [
      "Separating request handling, validation, and database operations into clear modules in a Flask app.",
      "Implementing redirect logic and unique code generation for link-based systems.",
      "Using templates to handle success and error states cleanly."
    ],
    results: "Built as a self-learning project to practice Flask, SQLite, and request validation fundamentals."
  }
];
