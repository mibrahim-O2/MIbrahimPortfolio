import Navbar from '@/components/Navbar';
import VolunteerSection from '@/sections/VolunteerSection';
import FooterSection from '@/sections/FooterSection';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata = {
  title: 'Volunteer Experience | Muhammad Ibrahim',
  description: "Volunteer experience of Muhammad Ibrahim: the seniors' project exhibition, the Sports Gala, and the ICT Lab at IMCS, University of Sindh."
};

export default function VolunteerPage() {
  return (
    <main className="main-content" style={{ paddingTop: '80px' }}>
      <Navbar />

      <VolunteerSection />

      <FooterSection />
      <ScrollToTop />
    </main>
  );
}
