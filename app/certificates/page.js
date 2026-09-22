import Navbar from '@/components/Navbar';
import CertificatesSection from '@/sections/CertificatesSection';
import FooterSection from '@/sections/FooterSection';
import ScrollToTop from '@/components/ScrollToTop';

export default function CertificatesPage() {
  return (
    <main className="main-content" style={{ paddingTop: '80px' }}>
      <Navbar />

      <CertificatesSection />

      <FooterSection />
      <ScrollToTop />
    </main>
  );
}
