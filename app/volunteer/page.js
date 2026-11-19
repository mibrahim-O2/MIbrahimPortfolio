import { buildMetadata } from '@/utils/seo';
import VolunteerSection from '@/sections/VolunteerSection';

export const metadata = buildMetadata({
  title: 'Volunteer Experience | Muhammad Ibrahim',
  description: "Volunteer experience of Muhammad Ibrahim: the seniors' project exhibition, the Sports Gala, and the ICT Lab at IMCS, University of Sindh.",
  path: '/volunteer'
});

export default function VolunteerPage() {
  return (
    <div className="subpage">
      <VolunteerSection headingLevel="h1" />
    </div>
  );
}
