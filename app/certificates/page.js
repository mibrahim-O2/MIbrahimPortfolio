import { buildMetadata } from '@/utils/seo';
import EducationSection from '@/sections/EducationSection';

export const metadata = buildMetadata({
  title: 'Certifications | Muhammad Ibrahim',
  description: 'Certifications of Muhammad Ibrahim, Agentic AI & Automation Engineer, in AI, cybersecurity and IT automation, with verification links.',
  path: '/certificates'
});

export default function CertificatesPage() {
  return (
    <div className="subpage">
      <EducationSection show="certificates" headingLevel="h1" />
    </div>
  );
}
