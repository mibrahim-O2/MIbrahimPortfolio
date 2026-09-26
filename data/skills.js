// Technical skills shown by components/SkillsStack.js (home + /skills) and read by the terminal and chatbot.
// Shape: { id, title, icon, items: [{ name, icon, color }], live? }.
// Every chip has its own icon: a Devicon glyph (loaded in app/layout.js) when Devicon has one,
// otherwise a Font Awesome 6.4 icon. Each chip also carries its own real/brand `color`, shown on a
// light tile behind the icon (see components/SkillChip.js) so it stands out on the dark background.
// A card never repeats an icon.
// `live: true` shows a small pulsing "active" indicator next to the title (used for the automation card,
// since it is about live/running workflows).
export const skillCategories = [
  {
    id: "languages",
    title: "Languages",
    icon: "fa-solid fa-code",
    items: [
      { name: "Python", icon: "devicon-python-plain", color: "#3776AB" },
      { name: "JavaScript", icon: "devicon-javascript-plain", color: "#F0DB4F" },
      { name: "TypeScript", icon: "devicon-typescript-plain", color: "#3178C6" },
      { name: "SQL", icon: "fa-solid fa-database", color: "#F29111" },
      { name: "C++", icon: "devicon-cplusplus-plain", color: "#00599C" }
    ]
  },
  {
    id: "ai-ml",
    title: "AI / ML",
    icon: "fa-solid fa-brain",
    items: [
      { name: "scikit-learn", icon: "devicon-scikitlearn-plain", color: "#F7931E" },
      { name: "pandas", icon: "devicon-pandas-plain", color: "#150458" },
      { name: "NumPy", icon: "devicon-numpy-plain", color: "#4DABCF" },
      { name: "Plotly", icon: "devicon-plotly-plain", color: "#3F4F75" },
      { name: "Genetic Algorithms", icon: "fa-solid fa-dna", color: "#8FBC8F" },
      { name: "Google OR-Tools", icon: "fa-solid fa-route", color: "#4285F4" },
      { name: "RAG", icon: "fa-solid fa-book-open-reader", color: "#B08968" },
      { name: "LLM Integration (OpenAI, Google Gemini)", icon: "fa-solid fa-robot", color: "#10A37F" },
      { name: "ChromaDB", icon: "fa-solid fa-vector-square", color: "#6E56CF" },
      { name: "sentence-transformers", icon: "fa-solid fa-language", color: "#FFB000" },
      { name: "Tree-sitter", icon: "fa-solid fa-tree", color: "#4E944F" },
      { name: "Prompt and Context Engineering", icon: "fa-solid fa-wand-magic-sparkles", color: "#B983FF" }
    ]
  },
  {
    id: "backend",
    title: "Backend",
    icon: "fa-solid fa-server",
    items: [
      { name: "FastAPI", icon: "devicon-fastapi-plain", color: "#009688" },
      { name: "Flask", icon: "devicon-flask-plain", color: "#FFFFFF" },
      { name: "Node.js", icon: "devicon-nodejs-plain", color: "#68A063" },
      { name: "Express", icon: "devicon-express-original", color: "#FFFFFF" },
      { name: "REST APIs", icon: "fa-solid fa-plug", color: "#61AFFE" },
      { name: "SQLAlchemy", icon: "devicon-sqlalchemy-plain", color: "#D71F00" },
      { name: "Alembic", icon: "fa-solid fa-code-branch", color: "#8A8A8A" },
      { name: "Drizzle ORM", icon: "fa-solid fa-droplet", color: "#C5F74F" },
      { name: "Pydantic", icon: "fa-solid fa-shield-halved", color: "#E92063" },
      { name: "Jinja2", icon: "fa-solid fa-file-lines", color: "#B41717" },
      { name: "Socket.io", icon: "devicon-socketio-plain", color: "#FFFFFF" },
      { name: "JWT Authentication", icon: "fa-solid fa-key", color: "#FB015B" },
      { name: "Firebase Authentication", icon: "fa-solid fa-user-shield", color: "#FFCA28" },
      { name: "Resend", icon: "fa-solid fa-paper-plane", color: "#000000" }
    ]
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: "fa-solid fa-laptop-code",
    items: [
      { name: "React", icon: "devicon-react-plain", color: "#61DAFB" },
      { name: "Next.js", icon: "devicon-nextjs-plain", color: "#FFFFFF" },
      { name: "Vite", icon: "devicon-vitejs-plain", color: "#646CFF" },
      { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain", color: "#38BDF8" },
      { name: "shadcn/ui", icon: "fa-solid fa-cube", color: "#FFFFFF" },
      { name: "Framer Motion", icon: "devicon-framermotion-plain", color: "#0055FF" },
      { name: "Recharts", icon: "fa-solid fa-chart-line", color: "#22B5BF" },
      { name: "Monaco Editor", icon: "fa-solid fa-file-code", color: "#519ABA" },
      { name: "Bootstrap", icon: "devicon-bootstrap-plain", color: "#7952B3" },
      { name: "HTML", icon: "devicon-html5-plain", color: "#E34F26" },
      { name: "CSS", icon: "devicon-css3-plain", color: "#1572B6" }
    ]
  },
  {
    id: "databases",
    title: "Databases",
    icon: "fa-solid fa-database",
    items: [
      { name: "PostgreSQL", icon: "devicon-postgresql-plain", color: "#4169E1" },
      { name: "MongoDB (Mongoose)", icon: "devicon-mongodb-plain", color: "#47A248" },
      { name: "SQLite", icon: "devicon-sqlite-plain", color: "#003B57" },
      { name: "Supabase", icon: "devicon-supabase-plain", color: "#3ECF8E" },
      { name: "Firebase / Firestore", icon: "devicon-firebase-plain", color: "#FFCA28" }
    ]
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    icon: "fa-solid fa-screwdriver-wrench",
    items: [
      { name: "Git", icon: "devicon-git-plain", color: "#F05032" },
      { name: "GitHub", icon: "devicon-github-plain", color: "#FFFFFF" },
      { name: "Docker", icon: "devicon-docker-plain", color: "#2496ED" },
      { name: "Netlify", icon: "devicon-netlify-plain", color: "#00C7B7" },
      { name: "Vercel", icon: "devicon-vercel-plain", color: "#FFFFFF" },
      { name: "Railway", icon: "devicon-railway-plain", color: "#0B0D0E" },
      { name: "Streamlit", icon: "devicon-streamlit-plain", color: "#FF4B4B" },
      { name: "Arduino", icon: "devicon-arduino-plain", color: "#00979D" },
      { name: "Linux", icon: "devicon-linux-plain", color: "#FCC624" },
      { name: "Piston", icon: "fa-solid fa-gears", color: "#8A8A8A" }
    ]
  },
  {
    id: "automation",
    title: "Business Process Automation",
    icon: "fa-solid fa-gears",
    live: true,
    items: [
      { name: "n8n", icon: "fa-solid fa-diagram-project", color: "#EA4B71" },
      { name: "Chatwoot", icon: "fa-solid fa-headset", color: "#1F93FF" },
      { name: "WhatsApp Cloud API", icon: "fa-brands fa-whatsapp", color: "#25D366" },
      { name: "AI Sales Agents", icon: "fa-solid fa-robot", color: "#10A37F" },
      { name: "Lead Collection", icon: "fa-solid fa-funnel-dollar", color: "#F0A070" },
      { name: "Webhooks", icon: "fa-solid fa-tower-broadcast", color: "#7FA3A6" },
      { name: "Google Sheets API", icon: "fa-solid fa-table-cells", color: "#0F9D58" },
      { name: "Workflow Orchestration", icon: "fa-solid fa-sitemap", color: "#8F4726" }
    ]
  }
];

// Compatible export name for the importers (terminal, chatbot).
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