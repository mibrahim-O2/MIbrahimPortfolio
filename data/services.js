// Services. Each one becomes a page at /services/<slug> and is listed on the homepage and /services.
// Rules: describe only what the linked projects really do (see each project's repo). No invented clients,
// results or tools. `proof` lists project ids from data/projects.js, in the order they should appear.
// `updatedAt` (YYYY-MM-DD) feeds sitemap.xml: change it only when the page content really changes.

export const servicesData = [
  {
    slug: 'ai-agent-development',
    icon: 'fa-solid fa-diagram-project',
    name: 'AI Agent Development',
    short: 'Agents that plan, call tools and finish real business tasks, with a person approving anything risky.',
    title: 'AI Agent Development | Muhammad Ibrahim',
    description:
      'Custom AI agents and multi-agent systems by Muhammad Ibrahim: planning, tool calling through MCP, grounded answers with sources, and human approval for every risky action.',
    intro:
      'I design and build AI agents that take a business task, plan the steps, call your systems through controlled tools and report a result you can check. Anything that changes data waits for a person, and every step is traced.',
    forWho: [
      'Teams with a repetitive, rules-based workflow (refund requests, invoice follow-ups, enquiry triage) that still needs judgement',
      'Founders who want an agent prototype that runs offline and is tested before any paid model is called',
      'Developers who need tools exposed to agents through the Model Context Protocol (MCP)'
    ],
    builds: [
      'A planner plus specialist agents with least-privilege tool access',
      'MCP servers whose tools have typed schemas, validation and risk levels',
      'Retrieval-augmented generation (RAG) over your documents, with citations and an "I don\'t know" rule',
      'Approval policies: which tool calls run, wait for a person, or are refused',
      'Tracing, structured logs and audit trails, plus tests that run without an API key'
    ],
    stack: ['Python', 'OpenAI Agents SDK', 'Model Context Protocol (MCP)', 'FastAPI', 'Pydantic', 'SQLite', 'RAG'],
    proof: ['autonomous-ai-business-operations-agent', 'lead-generation-agent-inbound', 'finlexpurple'],
    faq: [
      {
        q: 'What is the difference between an AI agent and a normal automation?',
        a: 'A normal automation follows fixed steps. An agent decides which steps to take and which tools to call based on the task. That flexibility is why I keep risky actions behind an approval step and check results with deterministic code.'
      },
      {
        q: 'Which models do you use?',
        a: 'My agents use OpenAI models through the OpenAI Agents SDK, and the multi-agent platform also has an Anthropic adapter. They also run on a built-in mock or deterministic offline model, so the pipeline and tests run without paying for API calls.'
      },
      {
        q: 'Can the agent connect to our CRM, calendar or billing system?',
        a: 'Yes, through tools. In my projects these are exposed through MCP servers with validation and risk levels. The public repositories use mock systems with demo data; a real integration is built against your system\'s API.'
      }
    ],
    updatedAt: '2026-11-19'
  },
  {
    slug: 'ai-voice-agents',
    icon: 'fa-solid fa-headset',
    name: 'AI Voice Agents',
    short: 'Voice agents that answer calls, qualify leads and book appointments, with a person approving sensitive actions.',
    title: 'AI Voice Agent Development | Muhammad Ibrahim',
    description:
      'AI voice agents by Muhammad Ibrahim that answer inbound calls, qualify leads and book appointments, built with the OpenAI Agents SDK, an MCP server and human approval.',
    intro:
      'I build voice agents that answer questions from your own knowledge base, qualify callers and book appointments. Creating a lead, booking or cancelling waits for human approval, so the agent never acts on a guess.',
    forWho: [
      'Service businesses that miss calls or spend hours on the same booking questions',
      'Teams that want a voice agent they can test and audit before it talks to customers'
    ],
    builds: [
      'Speech-to-speech voice mode (OpenAI Realtime) plus a text mode for testing',
      'An MCP server with CRM and calendar tools, each with validation and a sensitivity flag',
      'Answers grounded in a local knowledge base, which say "I don\'t know" instead of guessing',
      'A human-in-the-loop approval gate for every sensitive action',
      'Structured session logs, guardrails and offline tests'
    ],
    stack: ['Python', 'OpenAI Agents SDK', 'OpenAI Realtime API', 'Model Context Protocol (MCP)', 'RAG'],
    proof: ['ai-voice-agent-for-business', 'lead-generation-agent-inbound'],
    faq: [
      {
        q: 'Is the voice agent production ready?',
        a: 'The agent, MCP server, knowledge base and approval gate are built and covered by 158 offline tests; the dashboard is still in progress. It runs on fictional demo data, and a real deployment is set up for your business and phone provider.'
      },
      {
        q: 'Do you build on Vapi or Retell?',
        a: 'My voice agent is built directly on the OpenAI Agents SDK and Realtime API, not on a hosted voice platform. That keeps every tool call and approval step in code you own and can audit.'
      }
    ],
    updatedAt: '2026-11-19'
  },
  {
    slug: 'business-automation',
    icon: 'fa-solid fa-gears',
    name: 'Business & Workflow Automation',
    short: 'Lead intake, order and email pipelines, billing and reports, automated in software your team uses every day.',
    title: 'Business Process & Workflow Automation | Muhammad Ibrahim',
    description:
      'Business process automation by Muhammad Ibrahim: lead scoring and draft replies, order and email pipelines, billing and ledger systems, and scheduled reports, with human approval where it matters.',
    intro:
      'I automate the repetitive parts of running a business: reading and scoring enquiries, drafting replies for approval, sending order and status emails, keeping ledgers and sending scheduled reports. The automation lives inside real software, not a fragile chain of scripts.',
    forWho: [
      'Small businesses with manual order, billing or follow-up work',
      'Teams that want AI to draft, while a person approves what is sent'
    ],
    builds: [
      'Inbound lead agents that extract details, score each lead and draft a reply for approval',
      'E-commerce order flows with server-computed totals, transactional emails and low-stock alerts',
      'Billing, ledger and payroll dashboards where new accounts wait for admin approval',
      'Scheduled email reports and reminders'
    ],
    stack: ['Python', 'TypeScript', 'Next.js', 'React', 'Cloudflare Workers', 'Supabase', 'PostgreSQL'],
    proof: ['lead-generation-agent-inbound', 'sn-noor-herbal-store', 'bin-khalid-dairy-v2', 'finlytics-tracker'],
    faq: [
      {
        q: 'Do you build with n8n, Make or Zapier?',
        a: 'My projects so far are written in code (Python and TypeScript), which gives full control over approvals, tests and data. I have not published an n8n project yet, so I do not list it as experience.'
      },
      {
        q: 'Will AI send emails or change data on its own?',
        a: 'Not by default. In my automations AI drafts and suggests, and a person approves anything that is sent or changes data. Totals, scores and rules are computed by code, not by the model.'
      }
    ],
    updatedAt: '2026-11-19'
  }
];

// Questions that apply to every engagement (shown on /services and each service page)
export const commonFaq = [
  {
    q: 'Where are you based, and do you work remotely?',
    a: 'I am in Pakistan (PKT, UTC+5) and work remotely. Most communication is by email, with calls scheduled to overlap your working hours.'
  },
  {
    q: 'Are you a student?',
    a: 'Yes. I am in the final year of a BS in Computer Science at IMCS, University of Sindh (2023 to 2027) and take on freelance and project work alongside it. My projects, tests and code are public on GitHub so you can check the work directly.'
  },
  {
    q: 'How do we start?',
    a: 'Email a short description of the workflow, the systems it touches and what a good result looks like. I reply with questions and a suggested first step, usually a small working prototype on demo data.'
  }
];

export function getService(slug) {
  return servicesData.find((service) => service.slug === slug);
}
