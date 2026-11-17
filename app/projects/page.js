import PageIntro from '@/components/PageIntro';
import ProjectArchive from '@/components/ProjectArchive';

export const metadata = {
  title: 'Projects | Muhammad Ibrahim',
  description: 'All projects by Muhammad Ibrahim: AI and security tooling, optimization engines and full-stack web applications.'
};

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Project archive"
        title="Projects"
        lead="Everything I've built, from security tooling and AI platforms to client software and small experiments. Filter by area, or open a case study."
      />
      <section className="container" style={{ paddingBottom: 'var(--space-section)' }}>
        <ProjectArchive />
      </section>
    </>
  );
}
