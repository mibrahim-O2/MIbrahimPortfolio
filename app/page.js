'use client';

import Navbar from '@/components/Navbar';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import ExperienceSection from '@/sections/ExperienceSection';
import EducationSection from '@/sections/EducationSection';
import ProjectsSection from '@/sections/ProjectsSection';
import SkillsSection from '@/sections/SkillsSection';
import VolunteerSection from '@/sections/VolunteerSection';
import CertificatesSection from '@/sections/CertificatesSection';
import GalleryMarqueeSection from '@/sections/GalleryMarqueeSection';
import ContactSection from '@/sections/ContactSection';
import FooterSection from '@/sections/FooterSection';
import ScrollToTop from '@/components/ScrollToTop';
import FloatingChatbot from '@/components/FloatingChatbot';

export default function Home() {
  return (
    <main className="main-content">
      <Navbar />

      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <SkillsSection />
      <VolunteerSection />
      <CertificatesSection />
      <GalleryMarqueeSection />
      <ContactSection />

      <FooterSection />

      <ScrollToTop />
      <FloatingChatbot />
    </main>
  );
}
