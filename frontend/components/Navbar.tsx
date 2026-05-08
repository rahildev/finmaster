'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Course, Contact } from '@/types/landing';

interface NavbarProps {
  sectionVisibility?: Record<string, boolean>;
  courses?: Course[];
  contacts?: Contact[];
}

export default function Navbar({ sectionVisibility = {}, courses = [], contacts = [] }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDrop = (key: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setOpenDropdown(key);
  };
  const closeDrop = () => {
    dropdownTimer.current = setTimeout(() => setOpenDropdown(null), 350);
  };
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') { setActiveSection(''); return; }
    const map: Record<string, string> = {
      hero: 'home', courses: 'programs', teacher: 'about', contact: 'contact',
    };
    const observers: IntersectionObserver[] = [];
    Object.keys(map).forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(map[id]); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [pathname]);

  const isActive = (key: string) => {
    if (pathname !== '/') {
      if (key === 'programs') return pathname.startsWith('/programs');
      if (key === 'videos')   return pathname === '/videos';
      if (key === 'blog')     return pathname.startsWith('/blog');
      if (key === 'about')    return pathname === '/about';
      if (key === 'faq')      return pathname === '/faq';
      if (key === 'login')    return pathname === '/login';
      if (key === 'register') return pathname === '/register';
      return false;
    }
    if (key === 'home')     return activeSection === 'home' || activeSection === '';
    if (key === 'programs') return activeSection === 'programs';
    if (key === 'about')    return activeSection === 'about';
    if (key === 'contact')  return activeSection === 'contact';
    return false;
  };

  const activeClass = 'border-b-2 border-b-gray-900';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      if (mobileMenuOpen) closeMobileMenu();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const infoContacts = contacts.filter(c => ['phone', 'whatsapp', 'email'].includes(c.type));

  const openMobileMenu = () => {
    setMobileMenuVisible(true);
    requestAnimationFrame(() => setMobileMenuOpen(true));
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setTimeout(() => setMobileMenuVisible(false), 300);
  };

  const scrollToHero = () => {
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
    <nav className={`font-inter fixed top-0 left-0 right-0 z-50 bg-background transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'border-b border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-0 group" onClick={scrollToHero}>
            <div className="relative w-28 h-28 flex-shrink-0 -my-6 -ml-2 transition-transform duration-200 group-hover:scale-110">
              <Image src="/brand/finmaster-icon.png" alt="FinMaster" width={112} height={112} priority unoptimized className="h-full w-auto object-contain" />
            </div>
            <div className="flex flex-col -ml-5">
              <span className="font-bold text-[16px] leading-tight tracking-tight text-[#0A4D2C]">FinMaster</span>
              <span className="font-bold text-[9px] leading-tight tracking-[0.3em] text-[#3d7a52]">ACADEMY</span>
              <span className="hidden lg:block font-semibold text-[6.5px] leading-tight tracking-[0.12em] text-gray-500">ACCOUNTING & FINANCE TRAINING</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">

            <Link href="/" className={`px-3 py-2 text-[13px] font-medium text-gray-700 hover:text-[#0A4D2C] transition-colors ${isActive('home') ? activeClass : ''}`}>
              {language === 'en' ? 'Home' : 'Ana Səhifə'}
            </Link>

            {/* Proqramlar dropdown */}
            <div className="relative" onMouseEnter={() => openDrop('programs')} onMouseLeave={closeDrop}>
              <button className={`px-3 py-2 text-[13px] font-medium text-gray-700 hover:text-[#0A4D2C] transition-colors ${isActive('programs') ? activeClass : ''}`}>
                {language === 'en' ? 'Programs' : 'Proqramlar'}
              </button>
              <div className="absolute top-full left-0 right-0 h-4" onMouseEnter={() => openDrop('programs')} />
              <div onMouseEnter={() => openDrop('programs')} onMouseLeave={closeDrop} className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-visible z-50 transition-all duration-500 ease-in-out origin-top ${openDropdown === 'programs' ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'}`}>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2 overflow-hidden">
                  <div className="w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45 translate-y-1 mx-auto shadow-sm" />
                </div>
                {courses.length > 0 ? courses.map(c => (
                  <Link key={c.id} href={`/programs/${c.id}`} className="block px-4 py-3 transition-colors group">
                    <div className="text-sm font-medium text-gray-800 group-hover:text-[#0A4D2C] transition-colors">
                      {language === 'en' && (c as any).name_en ? (c as any).name_en : c.name}
                    </div>
                  </Link>
                )) : (
                  <div className="px-4 py-4 text-sm text-gray-400">{language === 'en' ? 'No programs yet' : 'Proqram tapılmadı'}</div>
                )}
              </div>
            </div>

            <Link href="/videos" className={`px-3 py-2 text-[13px] font-medium text-gray-700 hover:text-[#0A4D2C] transition-colors ${isActive('videos') ? activeClass : ''}`}>
              {language === 'en' ? 'Videos' : 'Video'}
            </Link>

            <Link href="/blog" className={`px-3 py-2 text-[13px] font-medium text-gray-700 hover:text-[#0A4D2C] transition-colors ${isActive('blog') ? activeClass : ''}`}>
              Blog
            </Link>

            <Link href="/about" className={`px-3 py-2 text-[13px] font-medium text-gray-700 hover:text-[#0A4D2C] transition-colors ${isActive('about') ? activeClass : ''}`}>
              {language === 'en' ? 'About' : 'Haqqımızda'}
            </Link>

            {/* Əlaqə dropdown */}
            <div className="relative" onMouseEnter={() => openDrop('contact')} onMouseLeave={closeDrop}>
              <button className={`px-3 py-2 text-[13px] font-medium text-gray-700 hover:text-[#0A4D2C] transition-colors ${isActive('contact') ? activeClass : ''}`}>
                {language === 'en' ? 'Contact' : 'Əlaqə'}
              </button>
              <div className="absolute top-full left-0 right-0 h-4" onMouseEnter={() => openDrop('contact')} />
              <div onMouseEnter={() => openDrop('contact')} onMouseLeave={closeDrop} className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-visible z-50 transition-all duration-500 ease-in-out origin-top ${openDropdown === 'contact' ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'}`}>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2 overflow-hidden">
                  <div className="w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45 translate-y-1 mx-auto shadow-sm" />
                </div>
                <div className="px-4 py-2">
                  {infoContacts.map(c => (
                    <a
                      key={c.id}
                      href={c.type === 'whatsapp' ? `https://wa.me/${c.value.replace(/\D/g, '')}` : c.type === 'email' ? `mailto:${c.value}` : `tel:${c.value.replace(/\s/g, '')}`}
                      target={c.type === 'whatsapp' ? '_blank' : undefined}
                      rel={c.type === 'whatsapp' ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-2 py-2.5 text-sm text-gray-700 hover:text-[#0A4D2C] transition-colors border-b border-gray-50 last:border-0"
                      >
                        <span className="shrink-0">
                          {c.type === 'whatsapp' && (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.529 5.851L.057 23.57a.75.75 0 00.921.92l5.764-1.49A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.7-.505-5.25-1.385l-.372-.214-3.853.997.985-3.768-.234-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>)}
                          {c.type === 'phone' && (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>)}
                          {c.type === 'email' && (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>)}
                        </span>
                        <span className="truncate">{c.value}</span>
                      </a>
                    ))}
                  </div>
              </div>
            </div>

            <Link href="/faq" className={`px-3 py-2 text-[13px] font-medium text-gray-700 hover:text-[#0A4D2C] transition-colors ${isActive('faq') ? activeClass : ''}`}>
              FAQ
            </Link>

            {/* Giriş / Qeydiyyat */}
            <div className="flex items-center gap-2 ml-3 pl-3 border-l border-gray-200">
              <Link href="/login" className={`px-3 py-1.5 text-[13px] font-medium border border-gray-300 rounded-md text-gray-700 hover:border-[#0A4D2C] hover:text-[#0A4D2C] transition-colors ${isActive('login') ? 'border-[#0A4D2C] text-[#0A4D2C]' : ''}`}>
                {language === 'en' ? 'Login' : 'Daxil ol'}
              </Link>
              <Link href="/register" className={`px-3 py-1.5 text-[13px] font-semibold bg-[#0A4D2C] text-white rounded-md hover:bg-[#0c5e35] transition-colors`}>
                {language === 'en' ? 'Register' : 'Qeydiyyat'}
              </Link>
            </div>

          </div>

          {/* Language + Hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-1.5 font-semibold text-gray-700">
              <button onClick={() => setLanguage('az')} className={`text-[11px] transition-colors pb-0.5 ${language === 'az' ? 'text-[#0A4D2C] border-b-2 border-b-[#0A4D2C]' : 'text-gray-400 hover:text-[#0A4D2C]'}`}>AZ</button>
              <span className="text-[11px] text-gray-300">|</span>
              <button onClick={() => setLanguage('en')} className={`text-[11px] transition-colors pb-0.5 ${language === 'en' ? 'text-[#0A4D2C] border-b-2 border-b-[#0A4D2C]' : 'text-gray-400 hover:text-[#0A4D2C]'}`}>EN</button>
            </div>
            <button
              onClick={() => mobileMenuOpen ? closeMobileMenu() : openMobileMenu()}
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
        {mobileMenuVisible && (
          <div className={`lg:hidden border-t border-gray-100 overflow-hidden transition-[max-height,opacity] ease-in-out ${mobileMenuOpen ? 'max-h-[800px] opacity-100 duration-300' : 'max-h-0 opacity-0 duration-300'}`}>
            <div className="py-2">

            <Link href="/" onClick={closeMobileMenu} className="block px-2 py-2.5 text-sm font-medium text-gray-700 hover:text-[#0A4D2C] rounded-lg">
              {language === 'en' ? 'Home' : 'Ana Səhifə'}
            </Link>

            {/* Proqramlar accordion */}
            <div>
              <button
                onClick={() => setMobileAccordion(prev => prev === 'programs' ? null : 'programs')}
                className="w-full flex items-center justify-between px-2 py-2.5 text-sm font-medium text-gray-700 hover:text-[#0A4D2C] rounded-lg"
              >
                {language === 'en' ? 'Programs' : 'Proqramlar'}
                <svg className={`w-4 h-4 transition-transform duration-200 ${mobileAccordion === 'programs' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileAccordion === 'programs' && (
                <div className="ml-2 mb-2 border-l-2 border-gray-100 pl-4">
                  {courses.length > 0 ? courses.map(c => (
                    <Link
                      key={c.id}
                      href={`/programs/${c.id}`}
                      onClick={closeMobileMenu}
                      className="block py-2 border-b border-gray-50 last:border-0"
                    >
                      <div className="text-sm text-gray-700">
                        {language === 'en' && (c as any).name_en ? (c as any).name_en : c.name}
                      </div>
                      <div className="flex gap-3 mt-0.5">
                        {c.duration && <span className="text-xs text-gray-400">{c.duration}</span>}
                        {parseFloat(c.price) > 0 && (
                          <span className="text-xs font-semibold text-[#0A4D2C]">{parseFloat(c.price).toFixed(0)} ₼</span>
                        )}
                      </div>
                    </Link>
                  )) : (
                    <p className="py-2 text-sm text-gray-400">{language === 'en' ? 'No programs yet' : 'Proqram tapılmadı'}</p>
                  )}
                </div>
              )}
            </div>

            <Link href="/videos" onClick={closeMobileMenu} className="block px-2 py-2.5 text-sm font-medium text-gray-700 hover:text-[#0A4D2C] rounded-lg">
              {language === 'en' ? 'Videos' : 'Video'}
            </Link>

            <Link href="/blog" onClick={closeMobileMenu} className="block px-2 py-2.5 text-sm font-medium text-gray-700 hover:text-[#0A4D2C] rounded-lg">
              Blog
            </Link>

            <Link href="/about" onClick={closeMobileMenu} className="block px-2 py-2.5 text-sm font-medium text-gray-700 hover:text-[#0A4D2C] rounded-lg">
              {language === 'en' ? 'About' : 'Haqqımızda'}
            </Link>

            {/* Əlaqə accordion */}
            <div>
              <button
                onClick={() => setMobileAccordion(prev => prev === 'contact' ? null : 'contact')}
                className="w-full flex items-center justify-between px-2 py-2.5 text-sm font-medium text-gray-700 hover:text-[#0A4D2C] rounded-lg"
              >
                {language === 'en' ? 'Contact' : 'Əlaqə'}
                <svg className={`w-4 h-4 transition-transform duration-200 ${mobileAccordion === 'contact' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileAccordion === 'contact' && (
                <div className="ml-2 mb-2 border-l-2 border-gray-100 pl-4 space-y-1 py-1">
                  {infoContacts.map(c => (
                    <a
                      key={c.id}
                      href={
                        c.type === 'whatsapp' ? `https://wa.me/${c.value.replace(/\D/g, '')}`
                        : c.type === 'email' ? `mailto:${c.value}`
                        : `tel:${c.value.replace(/\s/g, '')}`
                      }
                      className="flex items-center gap-2 py-1.5 text-sm text-gray-700 hover:text-[#0A4D2C]"
                    >
                      <span className="shrink-0">
                        {c.type === 'whatsapp' && (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.529 5.851L.057 23.57a.75.75 0 00.921.92l5.764-1.49A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.7-.505-5.25-1.385l-.372-.214-3.853.997.985-3.768-.234-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                          </svg>
                        )}
                        {c.type === 'phone' && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        )}
                        {c.type === 'email' && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        )}
                      </span>
                      {c.value}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <Link href="/faq" onClick={closeMobileMenu} className="block px-2 py-2.5 text-sm font-medium text-gray-700 hover:text-[#0A4D2C] rounded-lg">
              FAQ
            </Link>

            {/* Giriş / Qeydiyyat */}
            <div className="flex gap-2 px-2 pt-3 mt-1 border-t border-gray-100">
              <Link href="/login" onClick={closeMobileMenu} className="flex-1 text-center py-2 text-sm font-medium border border-gray-300 rounded-md text-gray-700 hover:border-[#0A4D2C] hover:text-[#0A4D2C] transition-colors">
                {language === 'en' ? 'Login' : 'Daxil ol'}
              </Link>
              <Link href="/register" onClick={closeMobileMenu} className="flex-1 text-center py-2 text-sm font-semibold bg-[#0A4D2C] text-white rounded-md hover:bg-[#0c5e35] transition-colors">
                {language === 'en' ? 'Register' : 'Qeydiyyat'}
              </Link>
            </div>

            <div className="flex items-center gap-3 px-2 pt-3 border-t border-gray-100 mt-2">
              <button onClick={() => { setLanguage('az'); closeMobileMenu(); }} className={`text-sm font-semibold transition-colors ${language === 'az' ? 'text-[#0A4D2C]' : 'text-gray-400 hover:text-[#0A4D2C]'}`}>AZ</button>
              <span className="text-gray-300">|</span>
              <button onClick={() => { setLanguage('en'); closeMobileMenu(); }} className={`text-sm font-semibold transition-colors ${language === 'en' ? 'text-[#0A4D2C]' : 'text-gray-400 hover:text-[#0A4D2C]'}`}>EN</button>
            </div>
          </div>
          </div>
        )}
      </div>
    </nav>

    {/* Overlay — nav-dan kənarda, z-40 menyu linklərinə mane olmur */}
    {mobileMenuVisible && (
      <div
        className="fixed inset-0 z-40 lg:hidden"
        onClick={closeMobileMenu}
      />
    )}
    </>
  );
}
