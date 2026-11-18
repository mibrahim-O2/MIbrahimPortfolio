import Link from 'next/link';
import ProjectMedia from '@/components/ProjectCover';
import { projectLinks } from '@/utils/projectLinks';
import styles from './ProjectCard.module.css';

const TAG_LIMIT = { lead: 8, featured: 4, compact: 4 };
const SIZES = {
  lead: '(min-width: 1024px) 600px, 100vw',
  featured: '(min-width: 760px) 560px, 100vw',
  compact: '(min-width: 1100px) 380px, (min-width: 700px) 50vw, 100vw'
};

// One project card. variant: "lead" (first featured project, image left and text right on desktop),
// "featured" (homepage grid), "compact" (project archive on /projects). The whole card opens the case
// study (the title link is stretched over the card); the external links sit above it.
// All content comes from data/projects.js: the lead card shows `description`, the others `subtitle`.
export default function ProjectCard({ project, variant = 'featured', priority = false, wide = false }) {
  const links = projectLinks(project);
  const tags = project.tags || [];
  const shown = tags.slice(0, TAG_LIMIT[variant] || 4);
  const extra = tags.length - shown.length;
  const href = `/projects/${project.id}`;
  const visibleLinks = variant === 'lead' ? links : links.slice(0, 2);
  const isLead = variant === 'lead';

  const media = (
    <div className={styles.media}>
      <ProjectMedia project={project} src={project.image} sizes={SIZES[variant]} priority={priority} className={styles.image} />
    </div>
  );

  const tagList = (
    <ul className={styles.tags} aria-label="Technologies">
      {shown.map((tag) => (
        <li key={tag} className="tag">
          {tag}
        </li>
      ))}
      {extra > 0 && <li className={`tag ${styles.more}`}>+{extra}</li>}
    </ul>
  );

  const footer = (
    <div className={styles.footer}>
      <span className={styles.cta} aria-hidden="true">
        Case study <i className="fas fa-arrow-right" />
      </span>
      {visibleLinks.length > 0 && (
        <ul className={styles.links}>
          {visibleLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ext}
                aria-label={`${link.label} (opens in a new tab)`}
                title={link.title || link.label}
              >
                <i className={link.icon} aria-hidden="true"></i>
                {variant !== 'compact' && <span>{link.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const head = (
    <>
      <div className={styles.meta}>
        {project.badge && <span className={styles.badge}>{project.badge}</span>}
        {project.status && (
          <span className={`status ${styles.status}`} data-status={project.status}>
            {project.status}
          </span>
        )}
      </div>
      <h3 className={styles.title}>
        <Link href={href} className={styles.titleLink}>
          {project.title}
          <svg className={styles.titleArrow} viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </h3>
      <p className={styles.description}>{isLead ? project.description : project.subtitle || project.description}</p>
      {variant !== 'compact' && project.highlight && <p className={styles.highlight}>{project.highlight}</p>}
    </>
  );

  if (isLead) {
    // Desktop: screenshot, tags and links on the left; text on the right. Mobile: one column.
    return (
      <article className={`card ${styles.card} ${styles.lead}`}>
        <div className={styles.leadVisual}>
          {media}
          {tagList}
          {footer}
        </div>
        <div className={styles.leadText}>{head}</div>
      </article>
    );
  }

  return (
    <article className={`card ${styles.card} ${styles[variant]} ${wide ? styles.wide : ''}`}>
      {media}
      <div className={styles.body}>
        {head}
        {tagList}
        {footer}
      </div>
    </article>
  );
}
