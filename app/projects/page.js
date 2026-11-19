import { buildMetadata } from '@/utils/seo';
import PageIntro from '@/components/PageIntro';
import ProjectArchive from '@/components/ProjectArchive';
import { publishedProjects, projectCategories } from '@/data/projects';
import { toCardProject } from '@/utils/projectLinks';

export const metadata = buildMetadata({
  title: 'Projects | Muhammad Ibrahim, Agentic AI & Automation Engineer',
  description: 'Ten projects by Muhammad Ibrahim: AI voice and lead agents, a multi-agent operations platform, an open-source security agent, and full-stack apps for real businesses.',
  path: '/projects'
});

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Project archive"
        title="Projects"
        lead="Ten projects, from AI agents and security tooling to client software. Filter by area, or open a case study."
      />
      <section className="container" style={{ paddingBottom: 'var(--space-section)' }}>
        <h2 className="sr-only">All projects</h2>
        <ProjectArchive projects={publishedProjects.map(toCardProject)} categories={projectCategories} />
      </section>
    </>
  );
}
