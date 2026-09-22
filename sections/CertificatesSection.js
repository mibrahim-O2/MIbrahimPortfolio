import SectionTitle from '@/components/SectionTitle';
import CertificateWall from '@/components/CertificateWall';

export default function CertificatesSection() {
  return (
    <section id="certificates" className="section section-bg-muted">
      <div className="container">
        <SectionTitle
          icon="fas fa-certificate"
          ghost="CERTIFICATES"
          title="Certifications"
          description="Verified courses and programs in AI, cybersecurity, and software automation."
        />

        <CertificateWall />
      </div>
    </section>
  );
}
