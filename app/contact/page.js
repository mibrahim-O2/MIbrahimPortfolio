'use client';

import Navbar from '@/components/Navbar';
import ContactSection from '@/sections/ContactSection';
import FooterSection from '@/sections/FooterSection';
import ScrollToTop from '@/components/ScrollToTop';
import SectionTitle from '@/components/SectionTitle';
import { personalInfo } from '@/data/personal';

export default function ContactPage() {
  return (
    <main className="main-content" style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <Navbar />

      <ContactSection />

      {/* Resume Download & Map Placeholder */}
      <section className="section" style={{ padding: '4rem 0' }}>
        <div className="container">
          <SectionTitle
            icon="fas fa-file-download"
            subtitle="Resume & Connect"
            title="Download CV & Location"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* Resume Card */}
            <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(var(--accent-rgb), 0.15)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '1.25rem' }}>
                <i className="fas fa-file-pdf"></i>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>
                Official Resume / CV
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Download a PDF copy of my latest software engineering resume detailing AI projects, technical skills, and research background.
              </p>
              <a
                href={`mailto:${personalInfo.email}?subject=Resume Request`}
                className="btn btn-primary"
                style={{ alignSelf: 'flex-start' }}
              >
                <i className="fas fa-download" style={{ marginRight: '0.5rem' }}></i> Request Latest CV
              </a>
            </div>

            {/* Google Maps embed of my location (no API key) */}
            <div style={{ background: 'var(--surface)', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden' }}>
              <iframe
                title="Location Map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(personalInfo.location)}&output=embed`}
                width="100%"
                height="260"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
      <ScrollToTop />
    </main>
  );
}
