'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { playClickSound } from '@/utils/sound';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  const navItems = [
    { name: 'Home', sectionId: 'home', pagePath: '/' },
    { name: 'About', sectionId: 'about', pagePath: '/about' },
    { name: 'Experience', sectionId: 'experience', pagePath: '/experience' },
    { name: 'Education', sectionId: 'education', pagePath: '/education' },
    { name: 'Projects', sectionId: 'projects', pagePath: '/projects' },
    { name: 'Skills', sectionId: 'skills', pagePath: '/skills' },
    { name: 'Volunteer', sectionId: 'volunteer', pagePath: '/volunteer' },
    { name: 'Certificates', sectionId: 'certificates', pagePath: '/certificates' },
    { name: 'Contact', sectionId: 'contact', pagePath: '/contact' },
    { name: 'Gallery', sectionId: 'gallery', pagePath: '/gallery' }
  ];

  // Scroll spy & navbar background shadow toggle
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll Spy for Home Page Sections
      if (isHomePage) {
        const sections = navItems
          .map((item) => document.getElementById(item.sectionId))
          .filter(Boolean);

        const scrollPosition = window.scrollY + 200;

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section.offsetTop <= scrollPosition) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleNavClick = (sectionId) => {
    playClickSound();
    setActiveSection(sectionId);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    playClickSound();
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`header-sticky ${scrolled ? 'header-scrolled' : ''}`} id="header" role="banner">
      <div className="container">
        <nav className="navbar-container" aria-label="Main Navigation">
          <Link href="/" className="navbar-brand-serif" onClick={() => handleNavClick('home')}>
            Muhammad<span className="brand-accent">Ibrahim</span>
          </Link>

          <ul className="nav-menu-serif" role="menubar">
            {navItems.map((item) => {
              const isSectionActive = isHomePage && activeSection === item.sectionId;
              const isPageActive = !isHomePage && pathname === item.pagePath;
              const isActive = isSectionActive || isPageActive;

              const href = (isHomePage && item.pagePath !== '/gallery') ? `#${item.sectionId}` : item.pagePath;

              return (
                <li key={item.name} className="nav-item-serif" role="none">
                  <Link
                    href={href}
                    role="menuitem"
                    aria-current={isActive ? 'page' : undefined}
                    className={`nav-link-serif ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.sectionId)}
                  >
                    <span className="nav-link-text">{item.name}</span>
                    {isActive && <span className="active-dot-glow"></span>}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mobile-nav-actions">
            <button
              id="mobile-menu-btn"
              className={`mobile-hamburger ${mobileMenuOpen ? 'open' : ''}`}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`} data-lenis-prevent>
        <ul className="mobile-menu-list">
          {navItems.map((item) => {
            const isSectionActive = isHomePage && activeSection === item.sectionId;
            const isPageActive = !isHomePage && pathname === item.pagePath;
            const isActive = isSectionActive || isPageActive;
            const href = (isHomePage && item.pagePath !== '/gallery') ? `#${item.sectionId}` : item.pagePath;

            return (
              <li key={item.name}>
                <Link
                  href={href}
                  className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.sectionId)}
                >
                  <span>{item.name}</span>
                  {isActive && <i className="fas fa-chevron-right"></i>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {mobileMenuOpen && (
        <div className="mobile-menu-backdrop" onClick={() => setMobileMenuOpen(false)}></div>
      )}
    </header>
  );
}
