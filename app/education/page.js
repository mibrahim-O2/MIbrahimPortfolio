import EducationSection from '@/sections/EducationSection';

export const metadata = {
  title: 'Education | Muhammad Ibrahim',
  description: 'Academic background of Muhammad Ibrahim: BS Computer Science at IMCS, University of Sindh, PIAIC and earlier education.',
  alternates: { canonical: '/education' }
};

export default function EducationPage() {
  return (
    <div className="subpage">
      <EducationSection show="education" headingLevel="h1" />
    </div>
  );
}
