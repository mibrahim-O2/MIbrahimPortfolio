'use client';

import { useState } from 'react';
import Reveal from '@/components/motion/Reveal';
import { personalInfo } from '@/data/personal';
import styles from './ContactSection.module.css';

const CHANNELS = ['Email', 'LinkedIn', 'GitHub', 'Phone'];

const display = (social) => {
  if (social.name === 'Email') return personalInfo.email;
  if (social.name === 'Phone') return personalInfo.phone;
  return social.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
};

// "Let's work together": direct channels from data/personal.js and a form. The site has no backend, so the
// form opens the visitor's email app with a ready-to-send message addressed to personalInfo.email.
export default function ContactSection({ headingLevel = 'h2' }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [opened, setOpened] = useState(false);
  const Heading = headingLevel;

  const channels = CHANNELS.map((name) => personalInfo.socialLinks.find((social) => social.name === name)).filter(Boolean);
  const pill = personalInfo.statusPill || '';

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (opened) setOpened(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const subject = form.subject.trim() || 'Portfolio enquiry';
    const body = `${form.message.trim()}\n\n${form.name.trim()}\n${form.email.trim()}`;
    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  return (
    <section id="contact" className={`section ${styles.section}`}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.layout}`}>
        <Reveal className={styles.intro}>
          <span className="eyebrow">Contact</span>
          <Heading className={styles.title}>
            Let&apos;s build something <span className="text-gradient">that works.</span>
          </Heading>
          <p className={styles.lead}>
            Have a role, a project or a collaboration in mind? Send a message and I&apos;ll get back to you.
          </p>
          {pill && (
            <p className={styles.available}>
              <span aria-hidden="true" /> {pill}
            </p>
          )}

          <ul className={styles.channels}>
            {channels.map((social) => {
              const external = social.url.startsWith('http');
              return (
                <li key={social.name}>
                  <a
                    href={social.url}
                    className={styles.channel}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span className={styles.channelIcon} aria-hidden="true">
                      <i className={social.icon}></i>
                    </span>
                    <span className={styles.channelText}>
                      <span className={styles.channelName}>{social.name}</span>
                      <span className={styles.channelValue}>{display(social)}</span>
                    </span>
                    <i className={`fas fa-arrow-right ${styles.channelArrow}`} aria-hidden="true"></i>
                  </a>
                </li>
              );
            })}
          </ul>
          <p className={styles.location}>
            <i className="fas fa-location-dot" aria-hidden="true"></i> {personalInfo.location}
          </p>
        </Reveal>

        <Reveal delay={0.1} className={`card ${styles.formCard}`}>
          <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.row}>
              <label className={styles.field}>
                <span>Your name</span>
                <input name="name" type="text" value={form.name} onChange={onChange} maxLength={100} autoComplete="name" required />
              </label>
              <label className={styles.field}>
                <span>Your email</span>
                <input name="email" type="email" value={form.email} onChange={onChange} maxLength={200} autoComplete="email" required />
              </label>
            </div>
            <label className={styles.field}>
              <span>Subject</span>
              <input name="subject" type="text" value={form.subject} onChange={onChange} maxLength={150} required />
            </label>
            <label className={styles.field}>
              <span>Message</span>
              <textarea name="message" rows={5} value={form.message} onChange={onChange} maxLength={1500} required />
            </label>
            <button type="submit" className={`btn btn-primary ${styles.submit}`}>
              <i className="fas fa-paper-plane" aria-hidden="true"></i> Send via email
            </button>
            <p className={styles.note} role="status">
              {opened ? (
                <>
                  Your email app should now be open with the message ready. Press send there. If nothing opened, write to{' '}
                  <a className="link" href={`mailto:${personalInfo.email}`}>
                    {personalInfo.email}
                  </a>
                  .
                </>
              ) : (
                'This opens your email app with the message ready to send.'
              )}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
