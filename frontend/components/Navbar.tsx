'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Navbar Component - Apple stil
 * Sticky navbar, blur backdrop, scroll edəndə arxa plan effekti
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface MenuItem {
  name: string;
  href: string;
  sectionKey?: string;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean> | null>(null);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled state for background
      setScrolled(currentScrollY > 20);

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        // Scrolling up or near top - show navbar
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and not near top - hide navbar
        setVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Fetch section visibility settings
  useEffect(() => {
    const fetchSectionVisibility = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/landing`);
        const data = await response.json();
        setSectionVisibility(data.section_visibility || {});
      } catch (error) {
        console.error('Error fetching section visibility:', error);
        // Set to empty object on error so menu still shows
        setSectionVisibility({});
      }
    };

    fetchSectionVisibility();
  }, []);

  const allMenuItems: MenuItem[] = [
    { name: t.nav.about, href: '#teacher', sectionKey: 'teacher' },
    { name: t.nav.courses, href: '#courses', sectionKey: 'courses' },
    { name: t.nav.videos, href: '#videos', sectionKey: 'videos' },
    { name: t.nav.faq, href: '#faq', sectionKey: 'faq' },
    { name: t.nav.contact, href: '#contact', sectionKey: 'contact' },
  ];

  // Filter menu items based on section visibility
  // Only render menu when visibility data is loaded
  const menuItems = sectionVisibility === null ? [] : allMenuItems.filter(item => {
    if (!item.sectionKey) return true;
    return sectionVisibility[item.sectionKey] !== false;
  });

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } ${
        scrolled
          ? 'bg-white/98 backdrop-blur-lg shadow-lg border-b border-gray-200'
          : 'bg-white/95 backdrop-blur-md border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative w-24 h-24 flex-shrink-0 -my-5">
              <img
                src="/brand/finmaster-icon.png"
                alt="Finmaster Icon"
                width={96}
                height={96}
                className="h-full w-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col -ml-4">
              <span className="text-primary-dark font-bold text-xl leading-tight tracking-tight">
                FinMaster
              </span>
              <span className="text-primary font-semibold text-sm leading-tight tracking-[0.2em]">
                ACADEMY
              </span>
              <span className="text-primary-dark font-medium text-[7px] leading-tight tracking-wider">
                ACCOUNTING & FINANCE TRAINING
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="px-4 py-2 text-sm font-medium text-green-800 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-all duration-300"
              >
                {item.name}
              </Link>
            ))}

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'az' ? 'en' : 'az')}
              className="ml-2 px-3 py-2 text-sm font-semibold text-green-800 hover:text-green-600 border border-green-800 hover:border-green-600 rounded-lg transition-all duration-300 flex items-center gap-1.5"
            >
              {language === 'az' ? (
                <>
                  <span className="text-base">🇺🇸</span>
                  <span>EN</span>
                </>
              ) : (
                <>
                  <span className="text-base">🇦🇿</span>
                  <span>AZ</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    handleSmoothScroll(e, item.href);
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-green-800 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-all duration-300"
                >
                  {item.name}
                </Link>
              ))}

              {/* Language Switcher Mobile */}
              <div className="pt-2">
                <button
                  onClick={() => setLanguage(language === 'az' ? 'en' : 'az')}
                  className="w-full px-4 py-2 text-sm font-semibold text-green-800 border border-green-800 rounded-lg transition-all flex items-center justify-center gap-1.5"
                >
                  {language === 'az' ? (
                    <>
                      <span className="text-base">🇺🇸</span>
                      <span>EN</span>
                    </>
                  ) : (
                    <>
                      <span className="text-base">🇦🇿</span>
                      <span>AZ</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
