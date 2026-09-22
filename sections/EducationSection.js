import EducationTimeline from '@/components/EducationTimeline';
import SectionTitle from '@/components/SectionTitle';

export default function EducationSection() {
  return (
    <section id="education" className="section edu-v4-section">
      <div className="container">
        <SectionTitle
          icon="fas fa-graduation-cap"
          title="Academic Background"
          description="The schools, university, and professional programs that shaped my engineering foundation."
          extraClass="education-title-container"
          ghost="EDUCATION"
        />

        <EducationTimeline />
      </div>
    </section>
  );
}
