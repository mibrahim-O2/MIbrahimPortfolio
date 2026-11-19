'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { personalInfo } from '@/data/personal';
import { hasExperience } from '@/data/experience';
import Logo from '@/components/Logo';
import styles from './Navbar.module.css';

// Main navigation. `id` = the homepage section it scrolls to; `pages` = routes that mark it active.
// Experience is listed only while data/experience.js has at least one role.
const NAV_ITEMS = [
  { label: 'Projects', id: 'projects', pages: ['/projects'] },
  { label: 'Services', id: 'services', pages: ['/services'] },
  { label: 'Expertise', id: 'expertise', pages: [] },
  { label: 'Experience', id: 'experience', pages: ['/experience'], show: hasExperience },
  { label: 'About', id: 'about', pages: ['/about', '/volunteer', '/gallery'] },
  { label: 'Stack', id: 'skills', pages: ['/skills'] }
].filter((item) => item.show !== false);

const MENU_SOCIALS = ['GitHub', 'LinkedIn', 'Email'];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeId, setActiveId] = useState(null);

  // Background after scrolling; hide while scrolling down, show again when scrolling up
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 12);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 320);
        lastY = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Scroll spy on the homepage: the section crossing the upper third of the screen is active
  useEffect(() => {
    if (!isHome) {
      setActiveId(null);
      return undefined;
    }
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
    const hero = document.getElementById('home');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id === 'home' ? null : entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -60% 0px' }
    );
    [hero, ...sections].filter(Boolean).forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  // Close the menu on navigation; lock page scroll while it is open; Esc closes it
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (item) => (isHome ? activeId === item.id : item.pages.some((page) => pathname.startsWith(page)));
  const socials = MENU_SOCIALS.map((name) => personalInfo.socialLinks.find((social) => social.name === name)).filter(Boolean);
  const [firstName, ...rest] = personalInfo.name.split(' ');

  return (
    <>
      <header className={`${styles.header} ${scrolled || open ? styles.scrolled : ''} ${hidden && !open ? styles.hidden : ''}`}>
        <nav className={`container ${styles.nav}`} aria-label="Main">
          <Link href="/" className={styles.brand}>
            <Logo size={36} className={styles.mark} />
            <span className={styles.brandName}>
              {firstName} <span className={styles.brandLast}>{rest.join(' ')}</span>
              <span className="sr-only">, home</span>
            </span>
          </Link>

          <ul className={styles.links}>
            {NAV_ITEMS.map((item) => {
              const active = isActive(item);
              return (
                <li key={item.id}>
                  <Link href={`/#${item.id}`} className={`${styles.link} ${active ? styles.active : ''}`} aria-current={active ? 'page' : undefined}>
                    {active && <motion.span layoutId="nav-pill" className={styles.pill} transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                    <span className={styles.linkText}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={styles.actions}>
            <Link href="/#contact" className={`btn btn-primary btn-sm ${styles.cta}`}>
              Let&apos;s talk
            </Link>
            <button
              type="button"
              className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className={styles.sheet}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.ul
              className={`container ${styles.sheetLinks}`}
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
            >
              {[...NAV_ITEMS, { label: 'Contact', id: 'contact', pages: ['/contact'] }].map((item, index) => (
                <motion.li
                  key={item.id}
                  variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } }}
                >
                  <Link href={`/#${item.id}`} className={styles.sheetLink} onClick={() => setOpen(false)}>
                    <span className={styles.sheetIndex}>0{index + 1}</span>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <div className={`container ${styles.sheetFooter}`}>
              <p className={styles.sheetEmail}>
                <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
              </p>
              <div className={styles.sheetSocials}>
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    aria-label={social.name}
                    {...(social.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <i className={social.icon} aria-hidden="true"></i>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
