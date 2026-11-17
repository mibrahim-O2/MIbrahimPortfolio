'use client';

import { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import { personalInfo } from '@/data/personal';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitted) setSubmitted(false);
  };

  // This site has no backend, so the form does not send anything by itself. It opens the visitor's
  // email app with a ready-to-send message addressed to personalInfo.email (data/personal.js).
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = formData.subject.trim() || 'Portfolio enquiry';
    const body = `${formData.message.trim()}\n\n${formData.name.trim()}\n${formData.email.trim()}`;
    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const phoneHref = `tel:${personalInfo.phone.replace(/[^+\d]/g, '')}`;

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionTitle
          icon="fas fa-paper-plane"
          title="Get In Touch"
          description="Have a project proposal, engineering inquiry, or potential collaboration? My inbox is always open."
          ghost="CONTACT"
        />

        <div className="contact-grid">
          <div>
            <h3 className="contact-info-title" data-aos="rise-blur" data-aos-delay="0">Contact Information</h3>
            <div className="contact-info-items">
              <div className="contact-info-item" data-aos="rise-blur" data-aos-delay="70">
                <div className="contact-info-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-info-content">
                  <h3>Email</h3>
                  <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                </div>
              </div>

              <div className="contact-info-item" data-aos="rise-blur" data-aos-delay="140">
                <div className="contact-info-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-info-content">
                  <h3>Phone</h3>
                  <a href={phoneHref}>{personalInfo.phone}</a>
                </div>
              </div>

              <div className="contact-info-item" data-aos="rise-blur" data-aos-delay="210">
                <div className="contact-info-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-info-content">
                  <h3>Location</h3>
                  <p>{personalInfo.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div data-aos="slide-tilt-right">
            <div className="contact-form-container">
              <h3 className="contact-form-title">Send Me a Message</h3>
              {submitted && (
                <div className="form-success" style={{ display: 'block' }} role="status">
                  <i className="fas fa-check-circle" aria-hidden="true"></i> Your email app should now be open with your
                  message ready. Press send there to deliver it. If nothing opened, email me directly at{' '}
                  <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>.
                </div>
              )}
              <form id="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder="Muhammad Ali"
                      value={formData.name}
                      onChange={handleChange}
                      maxLength={100}
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="ali@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      maxLength={200}
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="form-control"
                    placeholder="How can I help you?"
                    value={formData.subject}
                    onChange={handleChange}
                    maxLength={150}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control form-message"
                    placeholder="Your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={1500}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  <i className="fas fa-paper-plane" aria-hidden="true"></i> Send via Email
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
