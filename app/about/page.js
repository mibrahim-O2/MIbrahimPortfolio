import AboutSection from '@/sections/AboutSection';
import ExpertiseSection from '@/sections/ExpertiseSection';

export const metadata = {
  title: 'About | Muhammad Ibrahim',
  description: 'About Muhammad Ibrahim, a Full-Stack Developer and AI Engineer: background, focus areas and the projects behind them.',
  alternates: { canonical: '/about' }
};

export default function AboutPage() {
  return (
    <div className="subpage">
      <AboutSection headingLevel="h1" />
      <ExpertiseSection />
    </div>
  );
}
