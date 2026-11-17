// Focus areas shown as the Technical Expertise cards (sections/ExpertiseSection.js).
// `projectId` links the card to the project that proves it (must be an id in data/projects.js).
export const focusAreas = [
  {
    icon: "fa-solid fa-shield-halved",
    category: "Security Engineering and Verifiable Evidence",
    description: "Security-testing agents where AI can plan the tests but only deterministic code verifies a finding, with signed evidence anyone can re-check offline.",
    technologies: ["Python", "AI agents", "DSSE/in-toto", "Sigstore", "PyPI Trusted Publishing", "GitHub Actions"],
    evidence: "FinLexPurple",
    projectId: "finlexpurple", // card links to /projects/finlexpurple
    repoUrl: "https://github.com/FinLexPurple/finlexpurple"
  },
  {
    icon: "fa-solid fa-sitemap",
    category: "Machine Learning and Decision Systems",
    description: "Applied machine learning for student performance prediction and adaptive recommendations.",
    technologies: ["Python", "Streamlit", "scikit-learn", "DecisionTreeClassifier", "pandas", "NumPy", "Plotly", "rule-based inference"],
    evidence: "AI_Tutor_PLR_AbstractMinds",
    projectId: "ai-tutor-plr", // card links to /projects/ai-tutor-plr
    repoUrl: "" // TODO: add real repo link
  },
  {
    icon: "fa-solid fa-robot",
    category: "LLM Application and AI Platform Engineering",
    description: "LLM-powered learning platform with code analysis, chat, and assessment workflows.",
    technologies: ["FastAPI", "OpenAI", "Google Gemini", "ChromaDB", "sentence-transformers", "tree-sitter", "scikit-learn", "Firebase/Supabase", "JWT auth"],
    evidence: "NueroCode-Official",
    projectId: "neurocode", // card links to /projects/neurocode
    repoUrl: "" // TODO: add real repo link
  },
  {
    icon: "fa-solid fa-dna",
    category: "Optimization and Heuristic Search",
    description: "Genetic algorithms for constrained academic timetable generation and optimization.",
    technologies: ["Genetic Algorithm", "tournament selection", "two-point crossover", "mutation", "fitness penalties", "constructive seeding", "SQLAlchemy", "FastAPI"],
    evidence: "IMCS-Scheduler",
    projectId: "imcs-scheduler", // card links to /projects/imcs-scheduler
    repoUrl: "" // TODO: add real repo link
  },
  {
    icon: "fa-solid fa-layer-group",
    category: "Full-Stack Business Software Engineering",
    description: "End-to-end business software for farm operations, billing, inventory, and reporting.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind", "Drizzle ORM", "Firestore/Firebase", "Postgres", "server actions", "shadcn/ui", "Zod"],
    evidence: "Bin-Khalid-Dairy-Farm-V2",
    projectId: "bin-khalid-dairy-v2", // card links to /projects/bin-khalid-dairy-v2
    repoUrl: "" // TODO: add real repo link
  }
];
