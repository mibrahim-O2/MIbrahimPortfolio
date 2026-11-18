// Focus areas shown as the Technical Expertise cards (sections/ExpertiseSection.js).
// `projectId` links the card to the project that proves it (must be an id in data/projects.js).
// Order = display order; on desktop the first two cards are wider.
export const focusAreas = [
  {
    icon: "fa-solid fa-diagram-project",
    category: "Agentic AI and Business Automation",
    description: "Multi-agent, voice and lead agents that plan, call tools through MCP and act on business systems, with human approval gates, audit logs and evaluation built in.",
    evidence: "Autonomous AI Business Operations Agent",
    projectId: "autonomous-ai-business-operations-agent", // card links to /projects/autonomous-ai-business-operations-agent
    repoUrl: "https://github.com/mibrahim-O2/autonomous-ai-business-operations-agent"
  },
{
    icon: "fa-solid fa-shield-halved",
    category: "Security Engineering and Verifiable Evidence",
    description: "Security-testing agents where AI can plan the tests but only deterministic code verifies a finding, with signed evidence anyone can re-check offline.",
    evidence: "FinLexPurple",
    projectId: "finlexpurple", // card links to /projects/finlexpurple
    repoUrl: "https://github.com/FinLexPurple/finlexpurple"
  },
{
    icon: "fa-solid fa-robot",
    category: "LLM Application and AI Platform Engineering",
    description: "LLM-powered learning platform with code analysis, chat, and assessment workflows.",
    evidence: "NueroCode-Official",
    projectId: "neurocode", // card links to /projects/neurocode
    repoUrl: "" // TODO: add real repo link
  },
  {
    icon: "fa-solid fa-layer-group",
    category: "Full-Stack Products for Real Businesses",
    description: "Production web apps for a client brand and a family business: e-commerce with an admin, billing, ledgers, payroll and reporting.",
    evidence: "SN Noor Herbal Store",
    projectId: "sn-noor-herbal-store", // card links to /projects/sn-noor-herbal-store
    repoUrl: ""
  },
{
    icon: "fa-solid fa-sitemap",
    category: "Machine Learning and Decision Systems",
    description: "Applied machine learning for student performance prediction and adaptive recommendations.",
    evidence: "AI_Tutor_PLR_AbstractMinds",
    projectId: "ai-tutor-plr", // card links to /projects/ai-tutor-plr
    repoUrl: "" // TODO: add real repo link
  }
];
