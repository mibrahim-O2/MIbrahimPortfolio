import SectionTitle from '@/components/SectionTitle';
import TerminalWidget from '@/components/TerminalWidget';
import AboutBioCard from '@/components/AboutBioCard';
import FocusAreas from '@/components/FocusAreas';

export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="about-bg-orb about-bg-orb-1"></div>
      <div className="about-bg-orb about-bg-orb-2"></div>
      <div className="about-bg-orb about-bg-orb-3"></div>

      <div className="container">
        <SectionTitle
          title="About Me"
          description="Here's a brief introduction about myself, my core profile, and specialized skill domains."
          ghost="ABOUT"
        />

        <div className="about-grid">
          <div className="about-image-container" data-aos="clip-up">
            <div className="about-image-wrapper">
              <img
                src="https://github.com/mibrahim-O2.png?size=400"
                alt="Muhammad Ibrahim"
                className="about-image"
              />
            </div>
          </div>

          <div className="about-content" data-aos="rise-blur" data-aos-delay="70">
            <AboutBioCard />
          </div>
        </div>

        {/* Interactive AI Core Terminal */}
        <div data-aos="pop-scale">
          <TerminalWidget />
        </div>

        {/* Focus areas (bento cards) */}
        <FocusAreas />
      </div>
    </section>
  );
}
