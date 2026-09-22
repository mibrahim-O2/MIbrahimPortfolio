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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 5000);
  };

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
                  <a href="mailto:mibrahimkhalid306@gmail.com">mibrahimkhalid306@gmail.com</a>
                </div>
              </div>

              <div className="contact-info-item" data-aos="rise-blur" data-aos-delay="140">
                <div className="contact-info-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-info-content">
                  <h3>Phone</h3>
                  <a href="tel:+923242991303">+92 324 2991303</a>
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
                <div className="form-success" style={{ display: 'block' }}>
                  <i className="fas fa-check-circle"></i> Thank you for your message! I'll get back to you soon.
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
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  <i className="fas fa-paper-plane"></i> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
