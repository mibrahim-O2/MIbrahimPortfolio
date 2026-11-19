import Link from 'next/link';
import PageIntro from '@/components/PageIntro';
import ServiceList from '@/components/ServiceList';
import FaqList, { faqJsonLd } from '@/components/FaqList';
import Reveal from '@/components/motion/Reveal';
import { commonFaq } from '@/data/services';
import { personalInfo } from '@/data/personal';
import { buildMetadata } from '@/utils/seo';
import { breadcrumbNode, jsonLdScript, PERSON_ID, WEBSITE_ID } from '@/utils/schema';
import { absoluteUrl } from '@/utils/seo';
import styles from './services.module.css';

export const metadata = buildMetadata({
  title: 'Services: AI Agents, Voice Agents & Automation | Muhammad Ibrahim',
  description:
    'What Muhammad Ibrahim builds for businesses: custom AI agents, AI voice agents, and business and workflow automation, each backed by real, public projects.',
  path: '/services'
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'CollectionPage', '@id': `${absoluteUrl('/services')}#webpage`, url: absoluteUrl('/services'), name: 'Services', isPartOf: { '@id': WEBSITE_ID }, about: { '@id': PERSON_ID } },
    breadcrumbNode([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]),
    faqJsonLd(commonFaq)
  ]
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />
      <PageIntro
        eyebrow="Services"
        title="AI agents and automation, built to be checked"
        lead="Three kinds of work I take on. Each page explains what I build and links to the real projects that prove it."
      />
      <div className={`container ${styles.wrap}`}>
        <section className={styles.section} aria-labelledby="services-list">
          <h2 id="services-list" className="sr-only">Services</h2>
          <ServiceList />
        </section>

        <section className={styles.section} aria-labelledby="services-faq">
          <Reveal className={styles.block}>
            <h2 id="services-faq" className={styles.blockTitle}>Common questions</h2>
          </Reveal>
          <FaqList items={commonFaq} />
        </section>

        <section className={styles.section}>
          <Reveal className={`card ${styles.cta}`}>
            <h2 className={styles.ctaTitle}>Have a workflow in mind?</h2>
            <p className={styles.ctaText}>Describe the task, the systems it touches and what a good result looks like.</p>
            <div className={styles.ctaActions}>
              <a href={`mailto:${personalInfo.email}`} className="btn btn-primary">
                <i className="fas fa-envelope" aria-hidden="true"></i> {personalInfo.email}
              </a>
              <Link href="/projects" className="btn btn-ghost">
                See all projects
              </Link>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
