import ContactSection from '@/sections/ContactSection';

export const metadata = {
  title: 'Contact | Muhammad Ibrahim',
  description: 'Get in touch with Muhammad Ibrahim for full-stack and AI engineering roles, projects, and collaborations.'
};

export default function ContactPage() {
  return (
    <div className="subpage">
      <ContactSection headingLevel="h1" />
    </div>
  );
}
