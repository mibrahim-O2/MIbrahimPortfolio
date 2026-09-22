import Navbar from '@/components/Navbar';
import ExperienceSection from '@/sections/ExperienceSection';
import FooterSection from '@/sections/FooterSection';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata = {
  title: 'Work Experience | Muhammad Ibrahim',
  description: 'Software development and research experience of Muhammad Ibrahim.'
};

export default function ExperiencePage() {
  return (
    <main className="main-content" style={{ paddingTop: '80px' }}>
      <Navbar />

      <ExperienceSection />

      <FooterSection />
      <ScrollToTop />
    </main>
  );
}
