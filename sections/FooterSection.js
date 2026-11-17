import { personalInfo } from '@/data/personal';
import XIcon from '@/components/XIcon';
import Reveal from '@/components/motion/Reveal';
import RevealGroup from '@/components/motion/RevealGroup';

// No negative bottom margin: the footer sits at the very end of the page and must still trigger
const FOOTER_VIEW = { once: true, amount: 0.1 };

// Social icons in the footer, in this order (URLs and icons come from personalInfo.socialLinks)
const FOOTER_SOCIALS = ['GitHub', 'LinkedIn', 'X', 'YouTube'];
const footerSocials = FOOTER_SOCIALS
  .map((name) => personalInfo.socialLinks.find((social) => social.name === name))
  .filter((social) => social && social.url);

// Quick links point at homepage sections. The leading "/" makes them work from every page, not only the homepage.
const QUICK_LINKS = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Education', href: '/#education' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/#contact' }
];

const phoneHref = `tel:${personalInfo.phone.replace(/[^+\d]/g, '')}`;

export default function FooterSection() {
  return (
    <footer className="footer">
      <div className="container">
        <RevealGroup className="footer-content" stagger={0.12} viewport={FOOTER_VIEW}>
          <Reveal variant="rise">
            <div className="footer-brand">
              Muhammad<span className="text-gradient">Ibrahim</span>
            </div>
            <p className="footer-description">
              Software Developer | Full Stack Engineer | Problem Solver | Passionate about creating elegant
              solutions to complex problems
            </p>
            <div className="footer-social">
              {footerSocials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={social.name}
                  title={social.name}
                >
                  {social.name === 'X' ? <XIcon /> : <i className={social.icon} aria-hidden="true"></i>}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal variant="rise">
            <h3 className="footer-heading">Quick Links</h3>
            <div className="footer-links">
              {QUICK_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="footer-link">
                  <i className="fas fa-chevron-right" aria-hidden="true"></i> {link.label}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal variant="rise">
            <h3 className="footer-heading">Contact Info</h3>
            <div className="footer-links">
              <a href={`mailto:${personalInfo.email}`} className="footer-link">
                <i className="fas fa-envelope" aria-hidden="true"></i> {personalInfo.email}
              </a>
              <a href={phoneHref} className="footer-link">
                <i className="fas fa-phone" aria-hidden="true"></i> {personalInfo.phone}
              </a>
              <span className="footer-link">
                <i className="fas fa-map-marker-alt" aria-hidden="true"></i> {personalInfo.location}
              </span>
            </div>
          </Reveal>
        </RevealGroup>

        <Reveal variant="fade" className="footer-bottom" viewport={FOOTER_VIEW}>
          <p className="footer-copyright">
            &copy; <span>{new Date().getFullYear()}</span> {personalInfo.name}. All Rights Reserved.
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
