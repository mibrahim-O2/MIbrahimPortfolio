import { buildMetadata } from '@/utils/seo';
import ContactSection from '@/sections/ContactSection';

export const metadata = buildMetadata({
  title: 'Contact | Muhammad Ibrahim',
  description: 'Contact Muhammad Ibrahim, Agentic AI & Automation Engineer, about AI agent, automation and full-stack roles, projects and collaborations.',
  path: '/contact'
});

export default function ContactPage() {
  return (
    <div className="subpage">
      <ContactSection headingLevel="h1" />
    </div>
  );
}
