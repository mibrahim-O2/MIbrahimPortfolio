import Navbar from '@/components/Navbar';
import FooterSection from '@/sections/FooterSection';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';
import ProjectMedia from '@/components/ProjectCover';
import { projectsData } from '@/data/projects';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id
  }));
}

export default function ProjectDetailPage({ params }) {
  const project = projectsData.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <main className="main-content" style={{ minHeight: '100vh' }}>
      <Navbar />

      <div style={{ paddingTop: '120px', paddingBottom: '4rem' }}>
        <div className="container">
          <Link
            href="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--accent)',
              fontWeight: 600,
              marginBottom: '2rem',
              textDecoration: 'none'
            }}
          >
            <i className="fas fa-arrow-left"></i> Back to All Projects
          </Link>

          {/* Hero Banner Card */}
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: '24px',
              border: '1px solid var(--border)',
              overflow: 'hidden',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
              marginBottom: '3rem'
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: 'clamp(220px, 30vw, 420px)', overflow: 'hidden' }}>
              <ProjectMedia project={project} src={project.heroBanner} variant="hero" />
            </div>

            <div style={{ padding: '2.5rem' }}>
              <span
                style={{
                  background: 'rgba(var(--accent-rgb), 0.15)',
                  color: 'var(--accent)',
                  padding: '0.35rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'inline-block',
                  marginBottom: '1rem'
                }}
              >
                {project.badge || 'Project Showcase'}
              </span>
              {project.status && (
                <span
                  style={{
                    background: 'rgba(var(--rust-rgb), 0.3)',
                    color: project.status === 'Live' ? 'var(--teal-soft)' : project.status === 'In progress' ? 'var(--accent)' : 'var(--accent-soft)',
                    border: '1px solid var(--border-accent)',
                    padding: '0.35rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    display: 'inline-block',
                    marginBottom: '1rem',
                    marginLeft: '0.6rem'
                  }}
                >
                  {project.status}
                </span>
              )}
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.75rem' }}>
                {project.title}
              </h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                {project.subtitle}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                {(project.tags || []).map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'var(--surface-2)',
                      color: 'var(--text)',
                      padding: '0.4rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 500
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <i className="fas fa-external-link-alt" style={{ marginRight: '0.5rem' }}></i> Live Demo
                  </a>
                )}
                {project.videoUrl && (
                  <a
                    href={project.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    <i className="fas fa-play" style={{ marginRight: '0.5rem' }}></i> Watch Video
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    <i className="fab fa-github" style={{ marginRight: '0.5rem' }}></i> Source Code
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Details Content Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* Problem & Solution Card */}
            <div
              style={{
                background: 'var(--surface)',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid var(--border)'
              }}
            >
              {project.problemStatement && (
                <>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1rem' }}>
                    <i className="fas fa-exclamation-triangle" style={{ color: 'var(--accent)', marginRight: '0.5rem' }}></i>
                    Problem Statement
                  </h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: project.solution ? '2rem' : 0 }}>
                    {project.problemStatement}
                  </p>
                </>
              )}

              {project.solution && (
                <>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1rem' }}>
                    <i className="fas fa-lightbulb" style={{ color: 'var(--teal)', marginRight: '0.5rem' }}></i>
                    Proposed Solution
                  </h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                    {project.solution}
                  </p>
                </>
              )}
            </div>

            {/* Key Features Card */}
            {(project.features || []).length > 0 && (
            <div
              style={{
                background: 'var(--surface)',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid var(--border)'
              }}
            >
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1.5rem' }}>
                <i className="fas fa-star" style={{ color: 'var(--accent-soft)', marginRight: '0.5rem' }}></i>
                Key Features
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {project.features.map((feat, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      marginBottom: '1rem',
                      color: 'var(--text)',
                      lineHeight: 1.6
                    }}
                  >
                    <i className="fas fa-check-circle" style={{ color: 'var(--accent)', marginTop: '0.25rem' }}></i>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            )}
          </div>

          {/* Architecture & Challenges */}
          {(project.architectureDiagram || (project.challenges || []).length > 0 || (project.lessonsLearned || []).length > 0) && (
            <div
              style={{
                background: 'var(--surface)',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                marginTop: '2rem'
              }}
            >
              {project.architectureDiagram && (
                <>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1rem' }}>
                    <i className="fas fa-sitemap" style={{ color: 'var(--accent)', marginRight: '0.5rem' }}></i>
                    System Architecture Flow
                  </h3>
                  <div
                    style={{
                      background: 'var(--bg)',
                      padding: '1.25rem 1.5rem',
                      borderRadius: '12px',
                      fontFamily: 'monospace',
                      color: 'var(--text)',
                      marginBottom: '2rem',
                      borderLeft: '4px solid var(--accent)',
                      overflowWrap: 'anywhere'
                    }}
                  >
                    {project.architectureDiagram}
                  </div>
                </>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {(project.challenges || []).length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>
                      Engineering Challenges
                    </h4>
                    <ul style={{ color: 'var(--text-muted)', lineHeight: 1.6, paddingLeft: '1.1rem', margin: 0 }}>
                      {project.challenges.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: '0.6rem' }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {(project.lessonsLearned || []).length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>
                      Lessons Learned
                    </h4>
                    <ul style={{ color: 'var(--text-muted)', lineHeight: 1.6, paddingLeft: '1.1rem', margin: 0 }}>
                      {project.lessonsLearned.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: '0.6rem' }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Results */}
          {project.results && (
            <div
              style={{
                background: 'var(--surface)',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                marginTop: '2rem'
              }}
            >
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1rem' }}>
                <i className="fas fa-chart-line" style={{ color: 'var(--teal)', marginRight: '0.5rem' }}></i>
                Results
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, margin: 0, overflowWrap: 'anywhere' }}>{project.results}</p>
            </div>
          )}
        </div>
      </div>

      <FooterSection />
      <ScrollToTop />
    </main>
  );
}
