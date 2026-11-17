import EducationSection from '@/sections/EducationSection';

export const metadata = {
  title: 'Certifications | Muhammad Ibrahim',
  description: 'Certifications of Muhammad Ibrahim in AI, cybersecurity and software automation, with verification links.'
};

export default function CertificatesPage() {
  return (
    <div className="subpage">
      <EducationSection show="certificates" headingLevel="h1" />
    </div>
  );
}
