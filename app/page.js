import HeroSection from '@/sections/HeroSection';
import ProjectsSection from '@/sections/ProjectsSection';
import ExpertiseSection from '@/sections/ExpertiseSection';
import ExperienceSection from '@/sections/ExperienceSection';
import AboutSection from '@/sections/AboutSection';
import SkillsSection from '@/sections/SkillsSection';
import EducationSection from '@/sections/EducationSection';
import ContactSection from '@/sections/ContactSection';

// Homepage. The order of the lines below is the order of the sections on the page.
// The navigation bar and footer come from app/layout.js. See docs/UPDATE-HOMEPAGE-SECTIONS.md.
export default function Home() {
  return (
    <>
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
