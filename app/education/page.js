import { buildMetadata } from '@/utils/seo';
import EducationSection from '@/sections/EducationSection';

export const metadata = buildMetadata({
  title: 'Education | Muhammad Ibrahim',
  description: 'Education of Muhammad Ibrahim: BS Computer Science at IMCS, University of Sindh, the PIAIC Robotic & Agentic AI program and earlier schooling.',
  path: '/education'
});

export default function EducationPage() {
  return (
    <div className="subpage">
      <EducationSection show="education" headingLevel="h1" />
    </div>
  );
}
