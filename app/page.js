import HeroSection from '@/sections/HeroSection';
import ProjectsSection from '@/sections/ProjectsSection';
import ExpertiseSection from '@/sections/ExpertiseSection';
import ExperienceSection from '@/sections/ExperienceSection';
import AboutSection from '@/sections/AboutSection';
import SkillsSection from '@/sections/SkillsSection';
import EducationSection from '@/sections/EducationSection';
import ContactSection from '@/sections/ContactSection';
import { personalInfo } from '@/data/personal';
import { SITE_URL } from '@/utils/siteUrl';

// Structured data (schema.org Person) so search engines understand who the site is about
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personalInfo.name,
  url: SITE_URL,
  jobTitle: personalInfo.title,
  description: personalInfo.intro,
  email: `mailto:${personalInfo.email}`,
  image: personalInfo.avatarUrl,
  address: { '@type': 'PostalAddress', addressCountry: personalInfo.location },
  sameAs: personalInfo.socialLinks.map((social) => social.url).filter((url) => url.startsWith('http')),
  knowsAbout: ['Agentic AI', 'AI agents', 'Model Context Protocol', 'Retrieval-augmented generation', 'Business automation', 'Full-stack web development', 'Python', 'Next.js']
};

// Homepage. The order of the lines below is the order of the sections on the page.
// The navigation bar and footer come from app/layout.js. See docs/UPDATE-HOMEPAGE-SECTIONS.md.
export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }} />
      <HeroSection />
      <ProjectsSection />
      <ExpertiseSection />
      <ExperienceSection />
      <AboutSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
    </>
  );
}
