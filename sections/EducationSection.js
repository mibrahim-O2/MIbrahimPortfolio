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
export default function EducationSection({ show = 'both', headingLevel = 'h2' }) {
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
          <div className={styles.eduGrid}>
            {educationData.map((entry, index) => (
              <Reveal key={entry.id} delay={(index % 2) * 0.08} className={`card ${styles.edu}`}>
                <div className={styles.banner}>
                  {entry.campusImage && <Image src={entry.campusImage} alt={`${entry.institutionName} campus`} fill sizes="(min-width: 820px) 560px, 100vw" />}
                  <div className={styles.logos}>
                    {(entry.logos || []).map((logo) => (
                      <span key={logo.src} className={styles.logo}>
                        <Image src={logo.src} alt={logo.alt} width={40} height={40} />
                      </span>
                    ))}
                  </div>
                  {entry.status && (
                    <span className="status" data-status="In progress" style={{ position: 'absolute', top: '0.85rem', right: '0.85rem' }}>
                      {entry.status}
                    </span>
                  )}
                </div>
                <div className={styles.eduBody}>
                  <div className={styles.eduMeta}>
                    <span>{entry.period}</span>
                    <span className={styles.dotSep} aria-hidden="true" />
                    <span>{entry.degree}</span>
                  </div>
                  <h3 className={styles.eduTitle}>{entry.title}</h3>
                  <p className={styles.institution}>
                    {entry.institutionName}
                    {entry.chip && (
                      <span className={styles.chip}>
                        <i className="fas fa-location-dot" aria-hidden="true"></i> {entry.chip}
                      </span>
                    )}
                  </p>
                  <p className={styles.summary}>{entry.summary}</p>
                  {entry.metas && entry.metas.length > 0 && (
                    <dl className={styles.metas}>
                      {entry.metas.map((meta) => (
                        <div key={meta.label}>
                          <dt>{meta.label}</dt>
                          <dd>{meta.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {showCerts && (
          <>
            {showEducation && <h3 className={styles.subhead}>Certifications</h3>}
            <ul className={styles.certs}>
              {certificatesData.map((cert, index) => (
                <Reveal as="li" key={cert.id} delay={(index % 3) * 0.05} className={`card ${styles.cert}`}>
                  <span className={styles.certLogo}>
                    {cert.logo ? <Image src={cert.logo} alt={`${cert.issuer} logo`} width={40} height={40} /> : <i className="fas fa-certificate" aria-hidden="true"></i>}
                  </span>
                  <div className={styles.certText}>
                    <h4 className={styles.certTitle}>{cert.title}</h4>
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
