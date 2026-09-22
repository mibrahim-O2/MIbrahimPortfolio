// Technical skills shown by components/SkillsStack.js (home + /skills) and read by the terminal and chatbot.
// Shape: { id, title, icon, items: [{ name, icon }], live? }.
// Every chip has its own icon: a Devicon glyph (loaded in app/layout.js, monochrome, tinted by the theme) when Devicon has one,
// otherwise a Font Awesome 6.4 icon. No per-technology colors. A card never repeats an icon.
// `live: true` shows a small pulsing "active" indicator next to the title (used for the automation card,
// since it is about live/running workflows).
export const skillCategories = [
  {
    id: "languages",
    title: "Languages",
    icon: "fa-solid fa-code",
    items: [
      { name: "Python", icon: "devicon-python-plain" },
      { name: "JavaScript", icon: "devicon-javascript-plain" },
      { name: "TypeScript", icon: "devicon-typescript-plain" },
      { name: "SQL", icon: "fa-solid fa-database" },
      { name: "C++", icon: "devicon-cplusplus-plain" }
    ]
  },
  {
    id: "ai-ml",
    title: "AI / ML",
    icon: "fa-solid fa-brain",
    items: [
      { name: "scikit-learn", icon: "devicon-scikitlearn-plain" },
      { name: "pandas", icon: "devicon-pandas-plain" },
      { name: "NumPy", icon: "devicon-numpy-plain" },
      { name: "Plotly", icon: "devicon-plotly-plain" },
      { name: "Genetic Algorithms", icon: "fa-solid fa-dna" },
      { name: "Google OR-Tools", icon: "fa-solid fa-route" },
      { name: "RAG", icon: "fa-solid fa-book-open-reader" },
      { name: "LLM Integration (OpenAI, Google Gemini)", icon: "fa-solid fa-robot" },
      { name: "ChromaDB", icon: "fa-solid fa-vector-square" },
      { name: "sentence-transformers", icon: "fa-solid fa-language" },
      { name: "Tree-sitter", icon: "fa-solid fa-tree" },
      { name: "Prompt and Context Engineering", icon: "fa-solid fa-wand-magic-sparkles" }
    ]
  },
  {
    id: "backend",
    title: "Backend",
    icon: "fa-solid fa-server",
    items: [
      { name: "FastAPI", icon: "devicon-fastapi-plain" },
      { name: "Flask", icon: "devicon-flask-plain" },
      { name: "Node.js", icon: "devicon-nodejs-plain" },
      { name: "Express", icon: "devicon-express-original" },
      { name: "REST APIs", icon: "fa-solid fa-plug" },
      { name: "SQLAlchemy", icon: "devicon-sqlalchemy-plain" },
      { name: "Alembic", icon: "fa-solid fa-code-branch" },
      { name: "Drizzle ORM", icon: "fa-solid fa-droplet" },
      { name: "Pydantic", icon: "fa-solid fa-shield-halved" },
      { name: "Jinja2", icon: "fa-solid fa-file-lines" },
      { name: "Socket.io", icon: "devicon-socketio-plain" },
      { name: "JWT Authentication", icon: "fa-solid fa-key" },
      { name: "Firebase Authentication", icon: "fa-solid fa-user-shield" },
      { name: "Resend", icon: "fa-solid fa-paper-plane" }
    ]
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: "fa-solid fa-laptop-code",
    items: [
      { name: "React", icon: "devicon-react-plain" },
      { name: "Next.js", icon: "devicon-nextjs-plain" },
      { name: "Vite", icon: "devicon-vitejs-plain" },
      { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain" },
      { name: "shadcn/ui", icon: "fa-solid fa-cube" },
      { name: "Framer Motion", icon: "devicon-framermotion-plain" },
      { name: "Recharts", icon: "fa-solid fa-chart-line" },
      { name: "Monaco Editor", icon: "fa-solid fa-file-code" },
      { name: "Bootstrap", icon: "devicon-bootstrap-plain" },
      { name: "HTML", icon: "devicon-html5-plain" },
      { name: "CSS", icon: "devicon-css3-plain" }
    ]
  },
  {
    id: "databases",
    title: "Databases",
    icon: "fa-solid fa-database",
    items: [
      { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
      { name: "MongoDB (Mongoose)", icon: "devicon-mongodb-plain" },
      { name: "SQLite", icon: "devicon-sqlite-plain" },
      { name: "Supabase", icon: "devicon-supabase-plain" },
      { name: "Firebase / Firestore", icon: "devicon-firebase-plain" }
    ]
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    icon: "fa-solid fa-screwdriver-wrench",
    items: [
      { name: "Git", icon: "devicon-git-plain" },
      { name: "GitHub", icon: "devicon-github-plain" },
      { name: "Docker", icon: "devicon-docker-plain" },
      { name: "Netlify", icon: "devicon-netlify-plain" },
      { name: "Vercel", icon: "devicon-vercel-plain" },
      { name: "Railway", icon: "devicon-railway-plain" },
      { name: "Streamlit", icon: "devicon-streamlit-plain" },
      { name: "Arduino", icon: "devicon-arduino-plain" },
      { name: "Linux", icon: "devicon-linux-plain" },
      { name: "Piston", icon: "fa-solid fa-gears" }
    ]
  },
  {
    id: "automation",
    title: "Business Process Automation",
    icon: "fa-solid fa-gears",
    live: true,
    items: [
      { name: "n8n", icon: "fa-solid fa-diagram-project" },
      { name: "Chatwoot", icon: "fa-solid fa-headset" },
      { name: "WhatsApp Cloud API", icon: "fa-brands fa-whatsapp" },
      { name: "AI Sales Agents", icon: "fa-solid fa-robot" },
      { name: "Lead Collection", icon: "fa-solid fa-funnel-dollar" },
      { name: "Webhooks", icon: "fa-solid fa-tower-broadcast" },
      { name: "Google Sheets API", icon: "fa-solid fa-table-cells" },
      { name: "Workflow Orchestration", icon: "fa-solid fa-sitemap" }
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
