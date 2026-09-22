import Navbar from '@/components/Navbar';
import EducationSection from '@/sections/EducationSection';
import FooterSection from '@/sections/FooterSection';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata = {
  title: 'Education & Academics | Muhammad Ibrahim',
  description: 'Academic background of Muhammad Ibrahim: university, professional programs, and school education.'
};

export default function EducationPage() {
  return (
    <main className="main-content" style={{ paddingTop: '80px' }}>
      <Navbar />

      <EducationSection />

      <FooterSection />
      <ScrollToTop />
    </main>
  );
}
