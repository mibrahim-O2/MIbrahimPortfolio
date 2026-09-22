import { personalInfo } from '@/data/personal';
import XIcon from '@/components/XIcon';
import Reveal from '@/components/motion/Reveal';
import RevealGroup from '@/components/motion/RevealGroup';

// No negative bottom margin: the footer sits at the very end of the page and must still trigger
const FOOTER_VIEW = { once: true, amount: 0.1 };

const xUrl = personalInfo.socialLinks.find((social) => social.name === 'X')?.url;

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
              <a
                href="https://github.com/mibrahim-O2"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-ibrahim-o2"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href={xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="X (Twitter)"
                title="X"
              >
                <XIcon />
              </a>
              <a
                href="https://www.youtube.com/@mIbrahim_02"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </Reveal>

          <Reveal variant="rise">
            <h3 className="footer-heading">Quick Links</h3>
            <div className="footer-links">
              <a href="#home" className="footer-link">
                <i className="fas fa-chevron-right"></i> Home
              </a>
              <a href="#about" className="footer-link">
                <i className="fas fa-chevron-right"></i> About
              </a>
              <a href="#education" className="footer-link">
                <i className="fas fa-chevron-right"></i> Education
              </a>
              <a href="#experience" className="footer-link">
                <i className="fas fa-chevron-right"></i> Experience
              </a>
              <a href="#projects" className="footer-link">
                <i className="fas fa-chevron-right"></i> Projects
              </a>
              <a href="#contact" className="footer-link">
                <i className="fas fa-chevron-right"></i> Contact
              </a>
            </div>
          </Reveal>

          <Reveal variant="rise">
            <h3 className="footer-heading">Contact Info</h3>
            <div className="footer-links">
              <a href="mailto:mibrahimkhalid306@gmail.com" className="footer-link">
                <i className="fas fa-envelope"></i> mibrahimkhalid306@gmail.com
              </a>
              <a href="tel:+923242991303" className="footer-link">
                <i className="fas fa-phone"></i> +92 324 2991303
              </a>
              <a href="#" className="footer-link">
                <i className="fas fa-map-marker-alt"></i> {personalInfo.location}
              </a>
            </div>
          </Reveal>
        </RevealGroup>

        <Reveal variant="fade" className="footer-bottom" viewport={FOOTER_VIEW}>
          <p className="footer-copyright">
            &copy; <span>{new Date().getFullYear()}</span> Muhammad Ibrahim. All Rights Reserved.
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
