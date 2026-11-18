// Single source for the About bio. Edit the text and the `highlights` lists here;
// the About section (homepage and /about) reads from this file.
// Each entry in `highlights` must appear (case-insensitive) inside that paragraph's text.
export const aboutParagraphs = [
  {
    text: "I'm an AI engineer focused on agentic systems: software that plans, decides and acts on its own. I have built a voice agent that answers calls, qualifies leads and books appointments, a multi-agent platform that runs business tasks such as refunds and invoice collections, and an inbound lead agent that scores enquiries and drafts replies. What ties them together is control: tools are exposed through the Model Context Protocol (MCP), answers come from retrieval-augmented generation (RAG) with sources, and every action that changes data waits for human approval or is checked by deterministic code.",
    highlights: ["agentic systems", "voice agent", "multi-agent platform", "Model Context Protocol (MCP)", "retrieval-augmented generation (RAG)", "human approval"]
  },
  {
    text: "The same principle drives FinLexPurple, my open-source security agent for financial apps, where AI may propose a test but only code can mark a finding verified, and every result ships as signed evidence. Alongside the AI work, I build full-stack products for real businesses, from a live e-commerce store for a herbal brand to a billing and ledger system for a family dairy farm, so the automation ends up in software people rely on every day.",
    highlights: ["FinLexPurple", "only code can mark a finding verified", "full-stack products", "real businesses"]
  }
];
