import Navbar from '@/components/Navbar';
import SkillsSection from '@/sections/SkillsSection';
import FooterSection from '@/sections/FooterSection';
import ScrollToTop from '@/components/ScrollToTop';
import SectionTitle from '@/components/SectionTitle';
import SoftSkills from '@/components/SoftSkills';

export const metadata = {
  title: 'Skills & Tech Stack | Muhammad Ibrahim',
  description: 'Technical skills, AI/ML tools, programming languages, databases, and software engineering proficiencies of Muhammad Ibrahim.'
};

export default function SkillsPage() {
  return (
    <main className="main-content" style={{ paddingTop: '80px' }}>
      <Navbar />

      <SkillsSection />

      {/* Soft Skills Section */}
      <section className="section" style={{ padding: '4rem 0' }}>
        <div className="container">
          <SectionTitle
            icon="fas fa-users-cog"
            subtitle="Soft Skills"
            title="Professional Leadership & Soft Skills"
          />

          <SoftSkills />
        </div>
      </section>

      <FooterSection />
      <ScrollToTop />
    </main>
  );
}
