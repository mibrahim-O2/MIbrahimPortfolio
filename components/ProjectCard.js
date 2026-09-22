import Link from 'next/link';
import ProjectMedia from '@/components/ProjectCover';

const MAX_TAGS = 6;

// Status pill colors come from the existing tokens
const STATUS_STYLES = {
  Live: { color: 'var(--teal-soft)' },
  Completed: { color: 'var(--accent-soft)' },
  'In progress': { color: 'var(--accent)' }
};

// Buttons: Details always; Demo only with a demoUrl; Video only when there is no demo but a videoUrl;
// GitHub only with a githubUrl. Never render a button with an empty link.
function buildLinks(project) {
  const links = [];
  if (project.demoUrl) links.push({ label: 'Demo', url: project.demoUrl, icon: 'fas fa-external-link-alt' });
  else if (project.videoUrl) links.push({ label: 'Video', url: project.videoUrl, icon: 'fas fa-play' });
  if (project.githubUrl) links.push({ label: 'GitHub', url: project.githubUrl, icon: 'fab fa-github' });
  return links;
}

export default function ProjectCard({ project }) {
  const links = buildLinks(project);
  const tags = project.tags || [];
  const visibleTags = tags.slice(0, MAX_TAGS);
  const hiddenCount = tags.length - visibleTags.length;

  return (
    <div className="project-card" data-category={(project.categories || []).join(' ')}>
      <div className="project-image-container">
        <ProjectMedia project={project} src={project.image} variant="card" />
        {project.status && (
          <span
            className="project-tag"
            style={{
              position: 'absolute',
              top: '0.6rem',
              left: '0.6rem',
              zIndex: 2,
              background: 'rgba(var(--surface-rgb), 0.9)',
              border: '1px solid var(--border-accent)',
              ...(STATUS_STYLES[project.status] || {})
            }}
          >
            {project.status}
          </span>
        )}
      </div>
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tags">
          {visibleTags.map((tag, idx) => (
            <span key={idx} className="project-tag">
              {tag}
            </span>
          ))}
          {hiddenCount > 0 && (
            <span className="project-tag" title="See the full list on the details page">
              +{hiddenCount} more
            </span>
          )}
        </div>
        <div className="project-links" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          <Link
            href={`/projects/${project.id}`}
            className="project-link"
            style={{ background: 'var(--gradient-button)', color: 'var(--text)', border: 'none' }}
          >
            <i className="fas fa-info-circle"></i> Details
          </Link>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              <i className={link.icon}></i> {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
