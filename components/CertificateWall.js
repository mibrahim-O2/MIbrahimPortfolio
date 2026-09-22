'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { certificatesData } from '@/data/certificates';
import ImageLightbox from '@/components/ImageLightbox';
import usePrefersReducedMotion from '@/utils/usePrefersReducedMotion';

const STAGGER_S = 0.09;
const EASE = [0.16, 1, 0.3, 1];
const NUMBER_PREFIX = /^Certificate No\.\s*(.+)$/;

// Copies only the number, then shows "Copied" for a moment
function CopyNumber({ number }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(0);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(number);
    } catch {
      // clipboard API blocked (for example on plain http): fall back to a temporary textarea
      const area = document.createElement('textarea');
      area.value = number;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand('copy');
      } catch {
        /* nothing else to try */
      }
      document.body.removeChild(area);
    }
    setCopied(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button type="button" className="cert-v2-copy" onClick={copy} aria-label="Copy certificate number">
      <i className={copied ? 'fas fa-check' : 'fas fa-copy'} aria-hidden="true"></i>
      <span className="cert-v2-copy-label" role="status">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  );
}

function CertificateCard({ cert, index, reduce, onOpen }) {
  const numberMatch = NUMBER_PREFIX.exec(cert.credentialText || '');

  return (
    <motion.div
      className="cert-v2-cell"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={reduce ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0 : 0.6, ease: EASE, delay: reduce ? 0 : index * STAGGER_S }}
    >
      <article className={`cert-v2-card${cert.image ? ' has-image' : ''}`}>
        <div className="cert-v2-top">
          <div className="cert-v2-logos">
            <span className="cert-v2-plate">
              <img src={cert.logo} alt={`${cert.issuer} logo`} loading="lazy" decoding="async" />
            </span>
            {cert.viaLogo && (
              <span className="cert-v2-via">
                <span>via</span>
                <span className="cert-v2-plate cert-v2-plate--sm">
                  <img src={cert.viaLogo} alt={`${cert.issuerVia} logo`} loading="lazy" decoding="async" />
                </span>
              </span>
            )}
          </div>
          <span className={`cert-v2-category${cert.category === 'AI/ML' ? ' is-ai' : ''}`}>{cert.category}</span>
        </div>

        <h3 className="cert-v2-title">{cert.title}</h3>
        <p className="cert-v2-issuer">{cert.issuer}</p>
        <span className="cert-v2-date">
          <i className="fa-regular fa-calendar" aria-hidden="true"></i> {cert.date}
        </span>

        <p className="cert-v2-topics" title={cert.topics}>
          {cert.topics}
        </p>

        <div className="cert-v2-actions">
          {cert.credentialUrl && (
            <a className="cert-v2-btn" href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-external-link-alt" aria-hidden="true"></i> View Credential
            </a>
          )}
          {cert.image && (
            <button type="button" className="cert-v2-btn cert-v2-btn--ghost" aria-haspopup="dialog" onClick={() => onOpen(cert)}>
              <i className="fas fa-award" aria-hidden="true"></i> View Certificate
            </button>
          )}
          {cert.credentialText && (
            <span className="cert-v2-code">
              <i className="fas fa-shield-halved" aria-hidden="true"></i>
              <span>{cert.credentialText}</span>
              {numberMatch && <CopyNumber number={numberMatch[1].trim()} />}
            </span>
          )}
        </div>

        {cert.image && (
          <img
            className="cert-v2-thumb"
            src={cert.image}
            alt={`${cert.title} certificate`}
            width="1108"
            height="786"
            loading="lazy"
            decoding="async"
          />
        )}
      </article>
    </motion.div>
  );
}

export default function CertificateWall() {
  const reduce = usePrefersReducedMotion();
  const [active, setActive] = useState(null);

  return (
    <>
      <div className="cert-v2-grid">
        {certificatesData.map((cert, index) => (
          <CertificateCard key={cert.id} cert={cert} index={index} reduce={reduce} onOpen={setActive} />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <ImageLightbox
            key={active.id}
            src={active.image}
            alt={`${active.title} certificate`}
            label={`${active.title} certificate`}
            closeLabel="Close certificate"
            reduce={reduce}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
