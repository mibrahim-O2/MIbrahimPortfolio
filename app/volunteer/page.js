import VolunteerSection from '@/sections/VolunteerSection';

export const metadata = {
  title: 'Volunteer Experience | Muhammad Ibrahim',
  description: "Volunteer experience of Muhammad Ibrahim: the seniors' project exhibition, the Sports Gala, and the ICT Lab at IMCS, University of Sindh.",
  alternates: { canonical: '/volunteer' }
};

export default function VolunteerPage() {
  return (
    <div className="subpage">
      <VolunteerSection headingLevel="h1" />
    </div>
  );
}
