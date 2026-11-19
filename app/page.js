import HeroSection from '@/sections/HeroSection';
import ProjectsSection from '@/sections/ProjectsSection';
import ServicesSection from '@/sections/ServicesSection';
import ExpertiseSection from '@/sections/ExpertiseSection';
import ExperienceSection from '@/sections/ExperienceSection';
import AboutSection from '@/sections/AboutSection';
import SkillsSection from '@/sections/SkillsSection';
import EducationSection from '@/sections/EducationSection';
import ContactSection from '@/sections/ContactSection';
import { buildMetadata } from '@/utils/seo';
import { profilePageGraph, jsonLdScript } from '@/utils/schema';

export const metadata = buildMetadata({
  title: 'Muhammad Ibrahim | Agentic AI & Automation Engineer',
  description:
    'Muhammad Ibrahim, Agentic AI & Automation Engineer in Pakistan: AI agents, voice agents and business automation with human approval, plus full-stack products.',
  path: '/'
});

// Homepage. The order of the lines below is the order of the sections on the page.
// The navigation bar and footer come from app/layout.js. See docs/UPDATE-HOMEPAGE-SECTIONS.md.
export default function Home() {
  return (
    <>
      {/* Structured data: WebSite + ProfilePage + Person (utils/schema.js) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(profilePageGraph('/'))} />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <ExpertiseSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
    </>
  );
}
