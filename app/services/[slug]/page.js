import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageIntro from '@/components/PageIntro';
import ProjectCard from '@/components/ProjectCard';
import FaqList, { faqJsonLd } from '@/components/FaqList';
import Reveal from '@/components/motion/Reveal';
import { servicesData, getService, commonFaq } from '@/data/services';
import { publishedProjects } from '@/data/projects';
import { personalInfo } from '@/data/personal';
import { buildMetadata, absoluteUrl } from '@/utils/seo';
import { breadcrumbNode, jsonLdScript, PERSON_ID, WEBSITE_ID } from '@/utils/schema';
import styles from '../services.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }) {
  const service = getService(params.slug);
  if (!service) return {};
  return buildMetadata({ title: service.title, description: service.description, path: `/services/${service.slug}` });
}

const STEPS = [
  ['Map the workflow', 'what triggers it, which systems it touches, where a person must decide.'],
  ['Prototype on demo data', 'a working version you can run and test, before any real data or paid model.'],
  ['Add the guardrails', 'approval steps, validation, logs and tests for the risky parts.'],
  ['Connect and hand over', 'real integrations, documentation and the code in your repository.']
];

export default function ServicePage({ params }) {
  const service = getService(params.slug);
  if (!service) notFound();
  const proof = service.proof.map((id) => publishedProjects.find((project) => project.id === id)).filter(Boolean);
  const faq = [...service.faq, ...commonFaq];
  const url = absoluteUrl(`/services/${service.slug}`);
  const others = servicesData.filter((s) => s.slug !== service.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: service.name, isPartOf: { '@id': WEBSITE_ID }, about: { '@id': `${url}#service` } },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.name,
        description: service.intro,
        serviceType: service.name,
        provider: { '@id': PERSON_ID },
        areaServed: 'Worldwide (remote)',
        url
      },
      breadcrumbNode([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: service.name, path: `/services/${service.slug}` }
      ]),
      faqJsonLd(faq)
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />
      <PageIntro eyebrow="Service" title={service.name} lead={service.intro} back={{ href: '/services', label: 'All services' }} />

      <div className={`container ${styles.wrap}`}>
        <div className={`${styles.columns} ${styles.section}`}>
          <Reveal as="section" className={styles.block}>
            <h2 className={styles.blockTitle}>Who it is for</h2>
            <ul className={styles.bullets}>
              {service.forWho.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal as="section" className={styles.block} delay={0.06}>
            <h2 className={styles.blockTitle}>What I build</h2>
            <ul className={styles.bullets}>
              {service.builds.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className={`${styles.columns} ${styles.section}`}>
          <Reveal as="section" className={styles.block}>
            <h2 className={styles.blockTitle}>How I work</h2>
            <ol className={styles.steps}>
              {STEPS.map(([title, text]) => (
                <li key={title}>
                  <span>
                    <strong>{title}:</strong> {text}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal as="section" className={styles.block} delay={0.06}>
            <h2 className={styles.blockTitle}>Tools I use for this</h2>
            <ul className={styles.tags}>
              {service.stack.map((tag) => (
                <li key={tag} className="tag">
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <section className={styles.section} aria-labelledby="proof-title">
          <Reveal className={styles.block}>
            <h2 id="proof-title" className={styles.blockTitle}>
              Projects that prove it
            </h2>
          </Reveal>
          <ul className={styles.proof} style={{ marginTop: '1rem' }}>
            {proof.map((project, index) => (
              <Reveal as="li" key={project.id} delay={(index % 2) * 0.06} style={{ display: 'grid' }}>
                <ProjectCard project={project} variant="compact" />
              </Reveal>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="faq-title">
          <Reveal className={styles.block}>
            <h2 id="faq-title" className={styles.blockTitle}>
              Questions
            </h2>
          </Reveal>
          <div style={{ marginTop: '1rem' }}>
            <FaqList items={faq} />
          </div>
        </section>

        <section className={styles.section}>
          <Reveal className={`card ${styles.cta}`}>
            <h2 className={styles.ctaTitle}>Have a project like this in mind?</h2>
            <p className={styles.ctaText}>Send a short description of the task and the systems involved. I reply with questions and a suggested first step.</p>
            <div className={styles.ctaActions}>
              <a href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(service.name)}`} className="btn btn-primary">
                <i className="fas fa-envelope" aria-hidden="true"></i> Email me
              </a>
              {others.map((other) => (
                <Link key={other.slug} href={`/services/${other.slug}`} className="btn btn-ghost">
                  {other.name}
                </Link>
              ))}
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
