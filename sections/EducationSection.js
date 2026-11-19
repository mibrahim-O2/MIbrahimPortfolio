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
              <Reveal as="li" key={entry.id} delay={index * 0.05} className={`card ${styles.edu} ${entry.status ? styles.current : ''}`}>
                <div className={styles.logos}>
                  {(entry.logos || []).map((logo) => (
                    <span key={logo.src} className={styles.logo}>
                      <Image src={logo.src} alt={logo.alt} width={40} height={40} />
                    </span>
                  ))}
                </div>
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
              </Reveal>
            ))}
          </ol>
        )}

        {showCerts && (
          <>
            {showEducation && <H3 className={styles.subhead}>Certifications</H3>}
            <ul className={styles.certs}>
              {certificatesData.map((cert, index) => (
                <Reveal as="li" key={cert.id} delay={(index % 3) * 0.05} className={`card ${styles.cert}`}>
                  <span className={styles.certLogo}>
                    {cert.logo ? <Image src={cert.logo} alt={`${cert.issuer} logo`} width={40} height={40} /> : <i className="fas fa-certificate" aria-hidden="true"></i>}
                  </span>
                  <div className={styles.certText}>
                    <CertH className={styles.certTitle}>{cert.title}</CertH>
                    <p className={styles.certIssuer}>
                      {cert.issuer}
                      {cert.issuerVia && <> · via {cert.issuerVia}</>}
                      <span className={styles.certDate}>{cert.date}</span>
                    </p>
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
