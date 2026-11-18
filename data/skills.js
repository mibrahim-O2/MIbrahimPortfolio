// Technology stack shown by sections/SkillsSection.js (homepage and /skills).
// Every skill here is used in at least one project in data/projects.js; the comment above each card lists where.
// Shape: { id, title, icon, items: [{ name, icon, color }] }.
// `icon` is a Devicon class (https://devicon.dev, v2.16.0 is loaded) or a Font Awesome 6.4 free class.
// `color` is the technology's brand colour, used for the icon. See docs/UPDATE-SKILLS.md.
export const skillCategories = [
  // FinLexPurple, AI agents, AI Tutor (Python); SN Noor, Bin Khalid V2, dashboards (TypeScript); Finlytics, NeuroCode, VerdexAI (JavaScript)
  {
    id: "languages",
    title: "Languages",
    icon: "fa-solid fa-code",
    items: [
      { name: "Python", icon: "devicon-python-plain", color: "#3776AB" },
      { name: "TypeScript", icon: "devicon-typescript-plain", color: "#3178C6" },
      { name: "JavaScript", icon: "devicon-javascript-plain", color: "#F0DB4F" },
      { name: "SQL", icon: "fa-solid fa-database", color: "#F29111" }
    ]
  },
  // AI Voice Agent, Autonomous Business Ops Agent, Lead Generation Agent, FinLexPurple, NeuroCode, VerdexAI
  {
    id: "ai-agents",
    title: "AI Agents and LLMs",
    icon: "fa-solid fa-robot",
    items: [
      { name: "OpenAI Agents SDK", icon: "fa-solid fa-robot", color: "#10A37F" },
      { name: "Model Context Protocol (MCP)", icon: "fa-solid fa-plug", color: "#D97B4A" },
      { name: "RAG", icon: "fa-solid fa-book-open-reader", color: "#B08968" },
      { name: "Human-in-the-loop approvals", icon: "fa-solid fa-user-check", color: "#7FA3A6" },
      { name: "OpenAI API", icon: "fa-solid fa-brain", color: "#74AA9C" },
      { name: "Google Gemini", icon: "fa-solid fa-wand-magic-sparkles", color: "#8E75FF" },
      { name: "Ollama (local models)", icon: "fa-solid fa-microchip", color: "#E8E2DA" },
      { name: "ChromaDB", icon: "fa-solid fa-vector-square", color: "#FF6446" }
    ]
  },
  // AI Tutor for Personalized Learning Recommendations, NeuroCode
  {
    id: "ml-data",
    title: "Machine Learning and Data",
    icon: "fa-solid fa-chart-simple",
    items: [
      { name: "scikit-learn", icon: "devicon-scikitlearn-plain", color: "#F7931E" },
      { name: "pandas", icon: "devicon-pandas-plain", color: "#E70488" },
      { name: "NumPy", icon: "devicon-numpy-plain", color: "#4DABCF" },
      { name: "Plotly", icon: "devicon-plotly-plain", color: "#7A76FF" },
      { name: "Streamlit", icon: "devicon-streamlit-plain", color: "#FF4B4B" }
    ]
  },
  // FastAPI (Business Ops Agent, Lead Gen Agent, NeuroCode), Express (VerdexAI), Hono (SN Noor), Pydantic (agents), Zod (SN Noor, Bin Khalid V2)
  {
    id: "backend",
    title: "Backend and APIs",
    icon: "fa-solid fa-server",
    items: [
      { name: "FastAPI", icon: "devicon-fastapi-plain", color: "#009688" },
      { name: "Node.js", icon: "devicon-nodejs-plain", color: "#68A063" },
      { name: "Express", icon: "devicon-express-original", color: "#FFFFFF" },
      { name: "Hono", icon: "fa-solid fa-fire-flame-curved", color: "#FF5B11" },
      { name: "Pydantic", icon: "fa-solid fa-shield-halved", color: "#E92063" },
      { name: "Zod", icon: "fa-solid fa-list-check", color: "#3E67B1" }
    ]
  },
  // Next.js (Bin Khalid V2, VerdexAI), React and Vite (SN Noor, Finlytics, NeuroCode, Lead Gen dashboard), shadcn/ui (Bin Khalid V2), Recharts (Finlytics)
  {
    id: "frontend",
    title: "Frontend",
    icon: "fa-solid fa-laptop-code",
    items: [
      { name: "React", icon: "devicon-react-original", color: "#61DAFB" },
      { name: "Next.js", icon: "devicon-nextjs-plain", color: "#FFFFFF" },
      { name: "Vite", icon: "devicon-vitejs-plain", color: "#9C8CFF" },
      { name: "Tailwind CSS", icon: "devicon-tailwindcss-original", color: "#38BDF8" },
      { name: "shadcn/ui", icon: "fa-solid fa-cube", color: "#FFFFFF" },
      { name: "Framer Motion", icon: "devicon-framermotion-original", color: "#E94FF5" },
      { name: "Recharts", icon: "fa-solid fa-chart-line", color: "#22B5BF" }
    ]
  },
  // PostgreSQL + Drizzle (Bin Khalid V2), Supabase (Finlytics, NeuroCode), Firebase (Bin Khalid V2, NeuroCode, VerdexAI),
  // MongoDB (VerdexAI), SQLite (Business Ops Agent), Cloudflare D1 (SN Noor)
  {
    id: "databases",
    title: "Databases and Auth",
    icon: "fa-solid fa-database",
    items: [
      { name: "PostgreSQL", icon: "devicon-postgresql-plain", color: "#5B8FE8" },
      { name: "Supabase", icon: "devicon-supabase-plain", color: "#3ECF8E" },
      { name: "Firebase", icon: "devicon-firebase-plain", color: "#FFCA28" },
      { name: "MongoDB", icon: "devicon-mongodb-plain", color: "#47A248" },
      { name: "SQLite", icon: "devicon-sqlite-plain", color: "#5DA9E9" },
      { name: "Cloudflare D1", icon: "devicon-cloudflare-plain", color: "#F38020" },
      { name: "Drizzle ORM", icon: "fa-solid fa-layer-group", color: "#C5F74F" }
    ]
  },
  // Sigstore and PyPI Trusted Publishing (FinLexPurple), pytest (agents, FinLexPurple), Vitest (SN Noor, Lead Gen dashboard),
  // GitHub Actions (FinLexPurple, agents), Docker (Business Ops Agent, NeuroCode), hosting on Vercel, Netlify and Cloudflare Workers
  {
    id: "delivery",
    title: "Security, Testing and Delivery",
    icon: "fa-solid fa-shield-halved",
    items: [
      { name: "Sigstore and DSSE/in-toto", icon: "fa-solid fa-file-signature", color: "#F0A070" },
      { name: "PyPI Trusted Publishing", icon: "devicon-pypi-plain", color: "#3775A9" },
      { name: "pytest", icon: "devicon-pytest-plain", color: "#0A9EDC" },
      { name: "Vitest", icon: "devicon-vitest-plain", color: "#FCC72B" },
      { name: "GitHub Actions", icon: "devicon-githubactions-plain", color: "#2088FF" },
      { name: "Docker", icon: "devicon-docker-plain", color: "#2496ED" },
      { name: "Cloudflare Workers", icon: "devicon-cloudflareworkers-plain", color: "#F38020" },
      { name: "Vercel", icon: "devicon-vercel-original", color: "#FFFFFF" },
      { name: "Netlify", icon: "devicon-netlify-plain", color: "#00C7B7" },
      { name: "Git", icon: "devicon-git-plain", color: "#F05032" }
    ]
  }
];

// Compatible export name (kept for older imports).
export const skillsData = skillCategories;

// Soft skills shown on /skills. Shape: { id, title, icon, description }.
export const softSkills = [
  {
    id: "team-leadership",
    title: "Team Leadership",
    icon: "fa-solid fa-people-group",
    description: "Led a three-person team through a course project and the final year project, coordinating design, development, and delivery."
  },
  {
    id: "problem-solving",
    title: "Problem Solving",
    icon: "fa-solid fa-puzzle-piece",
    description: "Breaks complex, constraint-heavy problems such as timetable scheduling into structured, testable solutions."
  },
  {
    id: "self-directed-learning",
    title: "Self-Directed Learning",
    icon: "fa-solid fa-book-open",
    description: "Learns new stacks and tools independently through self-built projects and certifications."
  },
  {
    id: "ownership",
    title: "Ownership",
    icon: "fa-solid fa-flag-checkered",
    description: "Takes projects from idea to deployment alone, including design, development, testing, and hosting."
  },
  {
    id: "collaboration",
    title: "Collaboration",
    icon: "fa-solid fa-handshake",
    description: "Works effectively in teams using Git-based workflows and through volunteering at university events."
  },
  {
    id: "adaptability",
    title: "Adaptability",
    icon: "fa-solid fa-rotate",
    description: "Moves between languages, frameworks, and domains, from Flask prototypes to production-style Next.js and FastAPI systems."
  }
];