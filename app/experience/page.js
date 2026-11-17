import ExperienceSection from '@/sections/ExperienceSection';

export const metadata = {
  title: 'Experience | Muhammad Ibrahim',
  description: 'Software development, research and leadership experience of Muhammad Ibrahim.'
};

export default function ExperiencePage() {
  return (
    <div className="subpage">
      <ExperienceSection headingLevel="h1" />
    </div>
  );
}
