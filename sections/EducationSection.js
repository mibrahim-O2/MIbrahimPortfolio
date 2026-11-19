'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/motion/Reveal';
import ImageLightbox from '@/components/ImageLightbox';
import { educationData } from '@/data/education';
import { certificatesData } from '@/data/certificates';
import styles from './EducationSection.module.css';

// "Education & Certifications". `show` = "both" (homepage), "education" (/education) or "certificates" (/certificates).
function showEducationFor(show) {
  return show !== 'certificates';
}

export default function EducationSection({ show = 'both', headingLevel = 'h2' }) {
  // Heading levels follow the section heading (h1 on its own page, h2 on the homepage)
  const level = headingLevel === 'h1' ? 1 : 2;
  const H3 = `h${level + 1}`;
  const H4 = `h${level + 2}`;
  const CertH = showEducationFor(show) ? H4 : H3;
  const [activeCert, setActiveCert] = useState(null);
  const showEducation = show !== 'certificates';
  const showCerts = show !== 'education';

  const heading = {
    both: { eyebrow: 'Education & certifications', title: 'Foundations and continuous learning' },
    education: { eyebrow: 'Education', title: 'Academic background' },
    certificates: { eyebrow: 'Certifications', title: 'Verified courses and programs' }
  }[show];

  return (
    <section id={show === 'certificates' ? 'certificates' : 'education'} className="section">
      <div className="container">
        <SectionHeader eyebrow={heading.eyebrow} title={heading.title} as={headingLevel} />

        {showEducation && (
          <ol className={styles.timeline}>
            {educationData.map((entry, index) => (
              <Reveal as="li" key={entry.id} delay={index * 0.05} className={`card fx ${styles.edu} ${entry.status ? styles.current : ''} ${entry.logos && entry.logos.length > 1 ? styles.twoLogos : ''}`}>
                {/* Two logos: one on each side of the card. One logo: on the left. */}
                {entry.logos && entry.logos[0] && (
                  <span className={`${styles.logo} ${styles.logoStart}`}>
                    <Image src={entry.logos[0].src} alt={entry.logos[0].alt} width={48} height={48} />
                  </span>
                )}
                <div className={styles.eduBody}>
                  <div className={styles.eduMeta}>
                    <span className={styles.period}>{entry.period}</span>
                    <span className={styles.degree}>{entry.degree}</span>
                    {entry.status && (
                      <span className="status" data-status="In progress">
                        {entry.status}
                      </span>
                    )}
                  </div>
                  <H3 className={styles.eduTitle}>{entry.title}</H3>
                  <p className={styles.institution}>
                    {entry.institutionName}
                    {entry.chip && <span className={styles.chip}> · {entry.chip}</span>}
                  </p>
                  {entry.summary && <p className={styles.summary}>{entry.summary}</p>}
                  {entry.metas && entry.metas.length > 0 && (
                    <ul className={styles.results}>
                      {entry.metas.map((meta) => (
                        <li key={meta.label}>
                          <span>{meta.label}</span> {meta.value}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {entry.logos && entry.logos[1] && (
                  <span className={`${styles.logo} ${styles.logoEnd}`}>
                    <Image src={entry.logos[1].src} alt={entry.logos[1].alt} width={48} height={48} />
                  </span>
                )}
              </Reveal>
            ))}
          </ol>
        )}

        {showCerts && (
          <>
            {showEducation && <H3 className={styles.subhead}>Certifications</H3>}
            <ul className={styles.certs}>
              {certificatesData.map((cert, index) => (
                <Reveal as="li" key={cert.id} delay={(index % 3) * 0.05} className={`card fx ${styles.cert}`}>
                  <div className={styles.certTop}>
                    <span className={styles.certLogo}>
                      {cert.logo ? <Image src={cert.logo} alt={`${cert.issuer} logo`} width={44} height={44} /> : <i className="fas fa-certificate" aria-hidden="true"></i>}
                    </span>
                    {cert.viaLogo && (
                      <span className={`${styles.certLogo} ${styles.certVia}`}>
                        <Image src={cert.viaLogo} alt={`${cert.issuerVia} logo`} width={44} height={44} />
                      </span>
                    )}
                    <span className={styles.certDate}>
                      <i className="fas fa-calendar-check" aria-hidden="true"></i> {cert.date}
                    </span>
                  </div>
                  <div className={styles.certText}>
                    <CertH className={styles.certTitle}>{cert.title}</CertH>
                    <p className={styles.certIssuer}>
                      {cert.issuer}
                      {cert.issuerVia && <span className={styles.certViaText}> · via {cert.issuerVia}</span>}
                    </p>
                    {cert.topics && <p className={styles.certTopics}>{cert.topics}</p>}
                    {cert.credentialText && <p className={styles.certCode}>{cert.credentialText}</p>}
                  </div>
                  <div className={styles.certActions}>
                    {cert.credentialUrl && (
                      <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                        <i className="fas fa-arrow-up-right-from-square" aria-hidden="true"></i> View credential
                      </a>
                    )}
                    {cert.image && (
                      <button type="button" className="btn btn-ghost btn-sm" aria-haspopup="dialog" onClick={() => setActiveCert(cert)}>
                        <i className="fas fa-award" aria-hidden="true"></i> View certificate
                      </button>
                    )}
                  </div>
                </Reveal>
              ))}
            </ul>
          </>
        )}
      </div>

      <AnimatePresence>
        {activeCert && (
          <ImageLightbox
            key={activeCert.id}
            src={activeCert.image}
            alt={`${activeCert.title} certificate`}
            label={`${activeCert.title} certificate`}
            closeLabel="Close certificate"
            onClose={() => setActiveCert(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
