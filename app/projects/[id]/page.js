import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProjectMedia from '@/components/ProjectCover';
import Reveal from '@/components/motion/Reveal';
import { publishedProjects } from '@/data/projects';
import { projectLinks, youtubeEmbedUrl } from '@/utils/projectLinks';
import styles from './project.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProjects.map((project) => ({ id: project.id }));
}

export function generateMetadata({ params }) {
  const project = publishedProjects.find((p) => p.id === params.id);
  if (!project) return {};
  const title = `${project.title} | Case Study | Muhammad Ibrahim`;
  const local = project.image && project.image.startsWith('/') ? project.image : null;
  return {
    title,
    description: project.subtitle || project.description,
    openGraph: { title, description: project.subtitle || project.description, ...(local ? { images: [local] } : {}) }
  };
}

function Block({ title, children }) {
  return (
    <Reveal as="section" className={styles.block}>
      <h2 className={styles.blockTitle}>{title}</h2>
      {children}
    </Reveal>
  );
}

export default function ProjectDetailPage({ params }) {
  const index = publishedProjects.findIndex((p) => p.id === params.id);
  if (index === -1) notFound();
  const project = publishedProjects[index];
  const prev = publishedProjects[(index - 1 + publishedProjects.length) % publishedProjects.length];
  const next = publishedProjects[(index + 1) % publishedProjects.length];
  const links = projectLinks(project);
  const steps = (project.architectureDiagram || '').split('->').map((step) => step.trim()).filter(Boolean);
  const features = project.features || [];
  const challenges = project.challenges || [];
  const lessons = project.lessonsLearned || [];
  const videoEmbed = youtubeEmbedUrl(project.videoUrl);

  return (
    <article className={styles.page}>
      <header className={`container page-top ${styles.header}`}>
        <Reveal className={styles.headerInner}>
          <Link href="/projects" className={styles.back}>
            <i className="fas fa-arrow-left" aria-hidden="true"></i> All projects
          </Link>
          <div className={styles.labels}>
            {project.badge && <span className="eyebrow">{project.badge}</span>}
            {project.status && (
              <span className="status" data-status={project.status}>
                {project.status}
              </span>
            )}
          </div>
          <h1 className={styles.title}>{project.title}</h1>
          {project.subtitle && <p className={styles.subtitle}>{project.subtitle}</p>}
          {project.highlight && <p className={styles.highlight}>{project.highlight}</p>}
          {links.length > 0 && (
            <div className={styles.links}>
              {links.map((link, i) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${i === 0 ? 'btn-primary' : 'btn-ghost'}`}
                  title={link.title || link.label}
                >
                  <i className={link.icon} aria-hidden="true"></i> {link.label}
                </a>
              ))}
            </div>
          )}
        </Reveal>
      </header>

      <div className="container">
        <Reveal className={styles.hero}>
          <ProjectMedia project={project} src={project.heroBanner || project.image} sizes="(min-width: 1200px) 1180px, 100vw" priority />
        </Reveal>
      </div>

      <div className={`container ${styles.body}`}>
        <div className={styles.main}>
          {(project.problemStatement || project.solution) && (
            <div className={styles.overview}>
              {project.problemStatement && (
                <Reveal className={`card ${styles.overviewCard}`}>
                  <span className={styles.overviewLabel}>The problem</span>
                  <p>{project.problemStatement}</p>
                </Reveal>
              )}
              {project.solution && (
                <Reveal delay={0.08} className={`card ${styles.overviewCard} ${styles.solution}`}>
                  <span className={styles.overviewLabel}>The solution</span>
                  <p>{project.solution}</p>
                </Reveal>
              )}
            </div>
          )}

          {/* Video area: only rendered when the project has a videoUrl in data/projects.js */}
          {project.videoUrl && (
            <Block title={project.videoLabel || 'Watch video'}>
              {videoEmbed ? (
                <div className={styles.video}>
                  <iframe
                    src={videoEmbed}
                    title={`${project.title}: ${project.videoLabel || 'video'}`}
                    loading="lazy"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              ) : (
                <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className={`card ${styles.videoLink}`}>
                  <i className="fas fa-play" aria-hidden="true"></i> {project.videoLabel || 'Watch video'}
                </a>
              )}
            </Block>
          )}

          {features.length > 0 && (
            <Block title="Key features">
              <ol className={styles.features}>
                {features.map((feature, i) => (
                  <li key={feature}>
                    <span className={styles.featureNum}>{String(i + 1).padStart(2, '0')}</span>
                    <p>{feature}</p>
                  </li>
                ))}
              </ol>
            </Block>
          )}

          {steps.length > 0 && (
            <Block title="Architecture">
              <ol className={styles.flow}>
                {steps.map((step, i) => (
                  <li key={step} className={styles.step}>
                    <span className={styles.stepNum}>{i + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </Block>
          )}

          {challenges.length > 0 && (
            <Block title="Engineering challenges">
              <ul className={styles.list}>
                {challenges.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Block>
          )}

          {lessons.length > 0 && (
            <Block title="Lessons learned">
              <ul className={styles.list}>
                {lessons.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Block>
          )}

          {project.results && (
            <Block title="Results">
              <p className={styles.results}>{project.results}</p>
            </Block>
          )}
        </div>

        <aside className={styles.aside}>
          <div className={`card ${styles.sideCard}`}>
            <h2 className={styles.sideTitle}>Tech stack</h2>
            <ul className={styles.tags}>
              {(project.tags || []).map((tag) => (
                <li key={tag} className="tag">
                  {tag}
                </li>
              ))}
            </ul>
            {project.categories && project.categories.length > 0 && (
              <>
                <h2 className={styles.sideTitle}>Area</h2>
                <p className={styles.sideText}>{project.categories.join(' · ')}</p>
              </>
            )}
            {links.length > 0 && (
              <>
                <h2 className={styles.sideTitle}>Links</h2>
                <ul className={styles.sideLinks}>
                  {links.map((link) => (
                    <li key={link.label}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="link">
                        <i className={link.icon} aria-hidden="true"></i> {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </aside>
      </div>

      {publishedProjects.length > 1 && (
        <nav className={`container ${styles.pager}`} aria-label="More projects">
          <Link href={`/projects/${prev.id}`} className={`card ${styles.pagerLink}`}>
            <span className={styles.pagerLabel}>
              <i className="fas fa-arrow-left" aria-hidden="true"></i> Previous
            </span>
            <span className={styles.pagerTitle}>{prev.title}</span>
          </Link>
          <Link href={`/projects/${next.id}`} className={`card ${styles.pagerLink} ${styles.pagerNext}`}>
            <span className={styles.pagerLabel}>
              Next <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </span>
            <span className={styles.pagerTitle}>{next.title}</span>
          </Link>
        </nav>
      )}
    </article>
  );
}
