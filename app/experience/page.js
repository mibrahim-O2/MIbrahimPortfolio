import { buildMetadata } from '@/utils/seo';
import { notFound } from 'next/navigation';
import ExperienceSection from '@/sections/ExperienceSection';
import { hasExperience } from '@/data/experience';

export const metadata = buildMetadata({
  title: 'Experience | Muhammad Ibrahim',
  description: 'Software development, research and leadership experience of Muhammad Ibrahim.',
  path: '/experience'
});

export default function ExperiencePage() {
  // No roles yet: the page does not exist (see docs/EXPERIENCE.md)
  if (!hasExperience) notFound();
  return (
    <div className="subpage">
      <ExperienceSection headingLevel="h1" />
    </div>
  );
}
