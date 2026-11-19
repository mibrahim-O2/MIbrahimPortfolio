import Link from 'next/link';
import { personalInfo } from '@/data/personal';
import { hasExperience } from '@/data/experience';
import XIcon from '@/components/XIcon';
import Logo from '@/components/Logo';
import styles from './FooterSection.module.css';

// Social icons in the footer, in this order (URLs and icons come from personalInfo.socialLinks)
const FOOTER_SOCIALS = ['GitHub', 'LinkedIn', 'X', 'YouTube'];
const footerSocials = FOOTER_SOCIALS
  .map((name) => personalInfo.socialLinks.find((social) => social.name === name))
  .filter((social) => social && social.url);

// Footer links. Every indexable page is linked from here, so none is an orphan for crawlers.
// Homepage sections use "/#id" so they work from every page.
const QUICK_LINKS = [
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'Expertise', href: '/#expertise' },
  ...(hasExperience ? [{ label: 'Experience', href: '/#experience' }] : []),
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
];

const MORE_LINKS = [
  { label: 'Skills', href: '/skills' },
  { label: 'Education', href: '/education' },
  { label: 'Certifications', href: '/certificates' },
  { label: 'Volunteer', href: '/volunteer' },
  { label: 'Gallery', href: '/gallery' }
];


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
            <p className={styles.name}>
              <Logo size={32} />
              {personalInfo.name}
            </p>
            <p className={styles.tagline}>{personalInfo.title}. Building AI agents, business automation and full-stack products.</p>
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
