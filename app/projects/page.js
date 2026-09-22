import Navbar from '@/components/Navbar';
import ProjectsSection from '@/sections/ProjectsSection';
import FooterSection from '@/sections/FooterSection';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata = {
  title: 'Projects Showcase | Muhammad Ibrahim',
  description: 'Explore AI/ML models, RAG engines, full-stack Next.js web applications, and software engineering projects by Muhammad Ibrahim.'
};

export default function ProjectsPage() {
  return (
    <main className="main-content" style={{ paddingTop: '80px' }}>
      <Navbar />

      <ProjectsSection />

      <FooterSection />
      <ScrollToTop />
    </main>
  );
}
