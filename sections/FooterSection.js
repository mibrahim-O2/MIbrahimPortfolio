import Link from 'next/link';
import { personalInfo } from '@/data/personal';
import XIcon from '@/components/XIcon';
import styles from './FooterSection.module.css';

// Social icons in the footer, in this order (URLs and icons come from personalInfo.socialLinks)
const FOOTER_SOCIALS = ['GitHub', 'LinkedIn', 'X', 'YouTube'];
const footerSocials = FOOTER_SOCIALS
  .map((name) => personalInfo.socialLinks.find((social) => social.name === name))
  .filter((social) => social && social.url);

// Quick links. Homepage sections use "/#id" so they work from every page.
const QUICK_LINKS = [
  { label: 'Projects', href: '/#projects' },
  { label: 'Expertise', href: '/#expertise' },
  { label: 'Experience', href: '/#experience' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' }
];

const MORE_LINKS = [
  { label: 'All projects', href: '/projects' },
  { label: 'Certifications', href: '/certificates' },
  { label: 'Volunteer', href: '/volunteer' },
  { label: 'Gallery', href: '/gallery' }
];

const phoneHref = `tel:${personalInfo.phone.replace(/[^+\d]/g, '')}`;

export default function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.cta}>
          <p className={styles.ctaText}>Have something in mind?</p>
          <a href={`mailto:${personalInfo.email}`} className={styles.ctaMail}>
            {personalInfo.email} <i className="fas fa-arrow-right" aria-hidden="true"></i>
          </a>
        </div>

        <div className={styles.grid}>
          <div className={styles.brand}>
            <p className={styles.name}>{personalInfo.name}</p>
            <p className={styles.tagline}>{personalInfo.title}. Building AI systems, optimization tools and full-stack web applications.</p>
            <ul className={styles.socials}>
              {footerSocials.map((social) => (
                <li key={social.name}>
                  <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name} title={social.name}>
                    {social.name === 'X' ? <XIcon /> : <i className={social.icon} aria-hidden="true"></i>}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <p className={styles.heading}>Navigate</p>
            <ul className={styles.links}>
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={styles.heading}>More</p>
            <ul className={styles.links}>
              {MORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={styles.heading}>Contact</p>
            <ul className={styles.links}>
              <li>
                <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
              </li>
              <li>
                <a href={phoneHref}>{personalInfo.phone}</a>
              </li>
              <li className={styles.muted}>{personalInfo.location}</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            &copy; {year} {personalInfo.name}. All rights reserved.
          </p>
          <a href="#main" className={styles.top}>
            Back to top <i className="fas fa-arrow-up" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
