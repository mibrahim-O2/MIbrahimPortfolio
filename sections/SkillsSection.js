import SectionTitle from '@/components/SectionTitle';
import SkillsStack from '@/components/SkillsStack';

export default function SkillsSection() {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <SectionTitle
          icon="fas fa-layer-group"
          subtitle="05. Tech Stack"
          title="Technical Skills & Proficiencies"
        />

        <SkillsStack />
      </div>
    </section>
  );
}
