import { notFound } from 'next/navigation';
import ExperienceSection from '@/sections/ExperienceSection';
import { hasExperience } from '@/data/experience';

export const metadata = {
  title: 'Experience | Muhammad Ibrahim',
  description: 'Software development, research and leadership experience of Muhammad Ibrahim.',
  alternates: { canonical: '/experience' }
};

export default function ExperiencePage() {
  // No roles yet: the page does not exist (see docs/EXPERIENCE.md)
  if (!hasExperience) notFound();
  return (
    <div className="subpage">
      <ExperienceSection headingLevel="h1" />
    </div>
  );
}
