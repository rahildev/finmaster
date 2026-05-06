'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavbarProps {
  sectionVisibility?: Record<string, boolean>;
}

export default function Navbar({ sectionVisibility = {} }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: language === 'en' ? 'Home' : 'Ana Səhifə', href: '#hero' },
    { label: language === 'en' ? 'Programs' : 'Proqramlar', href: '#courses' },
    { label: language === 'en' ? 'About' : 'Haqqımızda', href: '#teacher' },
    { label: language === 'en' ? 'Certificate' : 'Sertifikat', href: '#certificate' },
    { label: language === 'en' ? 'Contact' : 'Əlaqə', href: '#footer' },
  ];

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-background transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'border-b border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-0 group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative w-20 h-20 flex-shrink-0 -my-4 -ml-2 transition-transform duration-200 group-hover:scale-110">
              <Image
                src="/brand/finmaster-icon.png"
                alt="FinMaster"
                width={80}
                height={80}
                priority
                unoptimized
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="flex flex-col -ml-5">
              <span className="font-bold text-[16px] leading-tight tracking-tight text-[#0A4D2C]">FinMaster</span>
              <span className="font-bold text-[9px] leading-tight tracking-[0.3em] text-[#3d7a52]">ACADEMY</span>
              <span className="hidden lg:block font-semibold text-[6.5px] leading-tight tracking-[0.12em] text-gray-500">ACCOUNTING & FINANCE TRAINING</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => scrollTo(e, item.href)}
                className="px-4 py-2 text-[13px] font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Language + Mobile */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 text-[13px] font-semibold text-gray-700">
              <button
                onClick={() => setLanguage('az')}
                className={language === 'az' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600 transition-colors'}
              >
                AZ
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={language === 'en' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600 transition-colors'}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => scrollTo(e, item.href)}
                className="block px-2 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 px-2 pt-3 border-t border-gray-100 mt-2">
              <button onClick={() => { setLanguage('az'); setMobileMenuOpen(false); }} className={`text-sm font-semibold ${language === 'az' ? 'text-gray-900' : 'text-gray-400'}`}>AZ</button>
              <span className="text-gray-300">|</span>
              <button onClick={() => { setLanguage('en'); setMobileMenuOpen(false); }} className={`text-sm font-semibold ${language === 'en' ? 'text-gray-900' : 'text-gray-400'}`}>EN</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
