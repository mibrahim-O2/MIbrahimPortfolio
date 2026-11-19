// Single source for the About bio. Edit the text and the `highlights` lists here;
// the About section (homepage and /about) reads from this file.
// Each entry in `highlights` must appear (case-insensitive) inside that paragraph's text.
export const aboutParagraphs = [
  {
    text: "I build AI agents the way I would want to depend on them: they run and pass their tests offline before any paid model is called, and every step is traced. Tools sit behind MCP servers with typed schemas and risk levels, answers are grounded with hybrid BM25 and vector search and cite their sources, and anything that changes data waits for a person. In my multi-agent operations platform, a tenant's approval policy decides which tool calls run, wait or are refused, and every side effect lands in a hash-chained audit log that can be verified later.",
    highlights: ["offline", "MCP servers", "hybrid BM25 and vector search", "waits for a person", "hash-chained audit log"]
  },
  {
    text: "I also apply AI to learning and hiring. NeuroCode only shows an AI-generated practice problem after its reference solution has run and passed in a sandbox, and issues credentials anyone can verify; VerdexAI scores CVs against a job with GPT-4o-mini; and for my AI course I led a team of three on a decision-tree tutor that recommends what to study next. On the client side, I ship production software, such as an e-commerce store on Cloudflare Workers where every total is computed on the server, and a billing system where new user accounts stay locked until an admin approves them.",
    highlights: ["NeuroCode", "VerdexAI", "led a team of three", "production software"]
  }
];

// Short version shown on the homepage About card (the full paragraphs above are shown on /about).
// Keep it true and in sync with the paragraphs; each `highlights` entry must appear in `text`.
export const aboutSummary = {
  text: "I build AI agents you can depend on: they are tested offline before any paid model is called, they call tools through MCP servers with clear risk levels, their answers cite sources, and anything that changes data waits for a person. I also ship production software for real clients, from an e-commerce store on Cloudflare Workers to a dairy billing system.",
  highlights: ["AI agents you can depend on", "MCP servers", "waits for a person", "production software"],
  // Proof points shown as tiles under the text (all from real projects)
  points: [
    { icon: "fa-solid fa-plug", label: "MCP tool servers" },
    { icon: "fa-solid fa-user-check", label: "Human approval" },
    { icon: "fa-solid fa-magnifying-glass-chart", label: "Grounded answers" },
    { icon: "fa-solid fa-link", label: "Audit trails" }
  ]
};
