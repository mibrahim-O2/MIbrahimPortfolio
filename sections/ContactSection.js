'use client';

import { useState } from 'react';
import Reveal from '@/components/motion/Reveal';
import { personalInfo } from '@/data/personal';
import styles from './ContactSection.module.css';

const CHANNELS = ['Email', 'LinkedIn', 'GitHub'];

const display = (social) => {
  if (social.name === 'Email') return personalInfo.email;
  return social.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
};

// "Let's work together": direct channels from data/personal.js and a form. The site has no backend, so the
// form opens the visitor's email app with a ready-to-send message addressed to personalInfo.email.
export default function ContactSection({ headingLevel = 'h2' }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [opened, setOpened] = useState(false);
  const Heading = headingLevel;

  const channels = CHANNELS.map((name) => personalInfo.socialLinks.find((social) => social.name === name)).filter(Boolean);

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

  const firstName = personalInfo.name.split(' ')[0];

  return (
    <section id="contact" className={`section ${styles.section}`}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.wrap}`}>
        <div className={styles.layout}>
          <Reveal className={styles.intro}>
            <span className={styles.kicker}>
              <span className={styles.kickerIcon} aria-hidden="true">
                <i className="fas fa-satellite-dish"></i>
              </span>
              Contact
            </span>
            <Heading className={styles.title}>
              Let&apos;s build something <span className="text-gradient">that works.</span>
            </Heading>
            <p className={styles.lead}>
              Have a role, a project or a collaboration in mind? Send a message and I&apos;ll get back to you.
            </p>
            <ul className={styles.chips} aria-label="Availability">
              <li>
                <span className={styles.live} aria-hidden="true" /> Open to work
              </li>
              <li>
                <i className="fas fa-location-dot" aria-hidden="true"></i> {personalInfo.location}
              </li>
              <li>
                <i className="fas fa-clock" aria-hidden="true"></i> PKT, UTC+5
              </li>
              <li>
                <i className="fas fa-globe" aria-hidden="true"></i> Remote
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1} className={styles.console}>
            {/* window bar: the form is styled as a message console */}
            <div className={styles.bar} aria-hidden="true">
              <span className={styles.dots}>
                <i />
                <i />
                <i />
              </span>
              <span className={styles.barTitle}>new-message → {firstName.toLowerCase()}</span>
              <i className={`fas fa-lock ${styles.barLock}`}></i>
            </div>
            <form onSubmit={onSubmit} className={styles.form}>
              <div className={styles.row}>
                <label className={styles.field}>
                  <span className={styles.label}>Your name</span>
                  <span className={styles.control}>
                    <i className="fas fa-user" aria-hidden="true"></i>
                    <input name="name" type="text" value={form.name} onChange={onChange} maxLength={100} autoComplete="name" placeholder="Jane Doe" required />
                  </span>
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>Your email</span>
                  <span className={styles.control}>
                    <i className="fas fa-at" aria-hidden="true"></i>
                    <input name="email" type="email" value={form.email} onChange={onChange} maxLength={200} autoComplete="email" placeholder="you@company.com" required />
                  </span>
                </label>
              </div>
              <label className={styles.field}>
                <span className={styles.label}>Subject</span>
                <span className={styles.control}>
                  <i className="fas fa-tag" aria-hidden="true"></i>
                  <input name="subject" type="text" value={form.subject} onChange={onChange} maxLength={150} placeholder="AI agent for our support inbox" required />
                </span>
              </label>
              <label className={styles.field}>
                <span className={styles.label}>Message</span>
                <span className={`${styles.control} ${styles.area}`}>
                  <i className="fas fa-message" aria-hidden="true"></i>
                  <textarea name="message" rows={5} value={form.message} onChange={onChange} maxLength={1500} placeholder="What should it do, which systems does it touch, and what does a good result look like?" required />
                </span>
              </label>
              <button type="submit" className={`btn btn-primary ${styles.submit}`}>
                <i className="fas fa-paper-plane" aria-hidden="true"></i> Send message
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
                  'Opens your email app with the message ready to send.'
                )}
              </p>
            </form>
          </Reveal>
        </div>

        <ul className={styles.channels}>
          {channels.map((social, index) => {
            const external = social.url.startsWith('http');
            return (
              <Reveal as="li" key={social.name} delay={index * 0.06}>
                <a
                  href={social.url}
                  className={`card fx ${styles.channel}`}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className={styles.channelIcon} aria-hidden="true">
                    <i className={social.icon}></i>
                  </span>
                  <span className={styles.channelText}>
                    <span className={styles.channelName}>{social.name}</span>
                    <span className={styles.channelValue}>{display(social)}</span>
                  </span>
                  <span className={styles.channelArrow} aria-hidden="true">
                    <i className="fas fa-arrow-up-right-from-square"></i>
                  </span>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
