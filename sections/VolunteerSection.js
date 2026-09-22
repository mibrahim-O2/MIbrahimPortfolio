import SectionTitle from '@/components/SectionTitle';
import VolunteerCards from '@/components/VolunteerCards';

export default function VolunteerSection() {
  return (
    <section id="volunteer" className="volunteer-section">
      <div className="container">
        <SectionTitle
          icon="fas fa-hands-helping"
          ghost="VOLUNTEER"
          subtitle="06. Community & Leadership"
          title="Volunteer Experience"
        />

        <VolunteerCards />
      </div>
    </section>
  );
}
