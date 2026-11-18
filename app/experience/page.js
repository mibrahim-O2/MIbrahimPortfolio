import ExperienceSection from '@/sections/ExperienceSection';

export const metadata = {
  title: 'Experience | Muhammad Ibrahim',
  description: 'Software development, research and leadership experience of Muhammad Ibrahim.',
  alternates: { canonical: '/experience' }
};

export default function ExperiencePage() {
  return (
    <div className="subpage">
      <ExperienceSection headingLevel="h1" />
    </div>
  );
}
