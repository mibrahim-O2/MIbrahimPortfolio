import SectionTitle from '@/components/SectionTitle';
import ExperienceStack from '@/components/ExperienceStack';

export default function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionTitle
          icon="fas fa-briefcase"
          ghost="EXPERIENCE"
          title="Professional Experience"
          description="Where I've applied full-stack engineering and applied AI, from department-level scheduling automation to systems built for real, everyday needs."
        />

        <ExperienceStack />
      </div>
    </section>
  );
}
