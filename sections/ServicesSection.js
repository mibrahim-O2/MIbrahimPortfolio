import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import ServiceList from '@/components/ServiceList';

// Homepage "Services": the three kinds of work, each linking to its own page (data/services.js)
export default function ServicesSection() {
  return (
    <section id="services" className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Services"
          title="What I can build for you"
          lead="AI agents, voice agents and business automation, each one backed by projects you can open and check."
          action={
            <Link href="/services" className="btn btn-ghost">
              All services <i className="fas fa-arrow-right btn-arrow" aria-hidden="true"></i>
            </Link>
          }
        />
        <ServiceList />
      </div>
    </section>
  );
}
