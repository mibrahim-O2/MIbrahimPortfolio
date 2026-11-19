import { buildMetadata } from '@/utils/seo';
import { profilePageGraph, jsonLdScript } from '@/utils/schema';
import AboutSection from '@/sections/AboutSection';
import ExpertiseSection from '@/sections/ExpertiseSection';
import SectionHeader from '@/components/ui/SectionHeader';
import FaqList, { faqJsonLd } from '@/components/FaqList';
import { personalInfo } from '@/data/personal';
import { publishedProjects } from '@/data/projects';

export const metadata = buildMetadata({
  title: 'About | Muhammad Ibrahim',
  description: 'About Muhammad Ibrahim, an Agentic AI & Automation Engineer from Pakistan: how he builds AI agents with human approval, his background and the projects behind his work.',
  path: '/about'
});

// Short, factual answers about the person (role, location, studies, stack, contact).
// Keep every answer true and in sync with data/personal.js, data/education.js and data/projects.js.
const quickFacts = [
  {
    q: `Who is ${personalInfo.name}?`,
    a: `${personalInfo.name} is an ${personalInfo.title} from Pakistan. He builds AI agents, AI voice agents and business automation where every risky action is approved by a person, verified by code or audited, plus full-stack web products for real businesses.`
  },
  {
    q: 'What has he built?',
    a: `${publishedProjects.length} published projects, including FinLexPurple (an open-source security agent on PyPI), an AI voice agent with an MCP server, a multi-agent business operations platform, an inbound lead generation agent, and a live e-commerce store for a herbal brand. Each project page links to its code or live site.`
  },
  {
    q: 'Where does he study?',
    a: 'He is studying for a BS in Computer Science at the Institute of Mathematics and Computer Science (IMCS), University of Sindh, Jamshoro (2023 to 2027), and completed a year of the PIAIC Robotic & Agentic AI program.'
  },
  {
    q: 'Which tools does he use most?',
    a: 'Python, the OpenAI Agents SDK, the Model Context Protocol (MCP), retrieval-augmented generation (RAG), FastAPI, Next.js, React, TypeScript, PostgreSQL and Supabase.'
  },
  {
    q: 'How can I contact him?',
    a: `By email at ${personalInfo.email}, or through LinkedIn and GitHub. He works remotely from Pakistan (PKT, UTC+5).`
  }
];

const jsonLd = profilePageGraph('/about');
jsonLd['@graph'].push(faqJsonLd(quickFacts));

export default function AboutPage() {
  return (
    <div className="subpage">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />
      <AboutSection headingLevel="h1" />
      <section className="section" aria-labelledby="quick-facts">
        <div className="container">
          <SectionHeader eyebrow="Quick facts" title={<span id="quick-facts">The short version</span>} />
          <FaqList items={quickFacts} />
        </div>
      </section>
      <ExpertiseSection />
    </div>
  );
}
