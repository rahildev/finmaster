'use client';

import { useState, useEffect } from 'react';
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();

  const isActive = (key: string) => {
    if (key === 'home')     return pathname === '/';
    if (key === 'programs') return pathname.startsWith('/programs');
    if (key === 'faq')      return pathname === '/faq';
    return false;
  };

  const activeClass = 'border-b-2 border-b-gray-900';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const infoContacts = contacts.filter(c => ['phone', 'whatsapp', 'email'].includes(c.type));
  const whatsapp = contacts.find(c => c.type === 'whatsapp');
  const whatsappHref = whatsapp ? `https://wa.me/${whatsapp.value.replace(/\D/g, '')}` : '#footer';

  const scrollToHero = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-background transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'border-b border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-0 group" onClick={scrollToHero}>
            <div className="relative w-20 h-20 flex-shrink-0 -my-4 -ml-2 transition-transform duration-200 group-hover:scale-110">
              <Image src="/brand/finmaster-icon.png" alt="FinMaster" width={80} height={80} priority unoptimized className="h-full w-auto object-contain" />
            </div>
            <div className="flex flex-col -ml-5">
              <span className="font-bold text-[16px] leading-tight tracking-tight text-[#0A4D2C]">FinMaster</span>
              <span className="font-bold text-[9px] leading-tight tracking-[0.3em] text-[#3d7a52]">ACADEMY</span>
              <span className="hidden lg:block font-semibold text-[6.5px] leading-tight tracking-[0.12em] text-gray-500">ACCOUNTING & FINANCE TRAINING</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">

            {/* Ana Səhifə */}
            <Link href="/" className={`px-4 py-2 text-[13px] font-medium text-gray-700 hover:text-[#0A4D2C] transition-colors ${isActive('home') ? activeClass : ''}`}>
              {language === 'en' ? 'Home' : 'Ana Səhifə'}
            </Link>

            {/* Proqramlar — hover dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('programs')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className={`px-4 py-2 text-[13px] font-medium text-gray-700 hover:text-[#0A4D2C] transition-colors ${isActive('programs') ? activeClass : ''}`}>
                {language === 'en' ? 'Programs' : 'Proqramlar'}
              </button>

              {openDropdown === 'programs' && (
                <div className="absolute top-full left-0 mt-0 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  {courses.length > 0 ? courses.map(c => (
                    <Link
                      key={c.id}
                      href={`/programs/${c.id}`}
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                    >
                      <div className="text-sm font-medium text-gray-800">
                        {language === 'en' && (c as any).name_en ? (c as any).name_en : c.name}
                      </div>
                      <div className="flex gap-3 mt-1">
                        {c.duration && <span className="text-xs text-gray-400">{c.duration}</span>}
                        {parseFloat(c.price) > 0 && (
                          <span className="text-xs font-semibold text-[#0A4D2C]">{parseFloat(c.price).toFixed(0)} ₼</span>
                        )}
                      </div>
                    </Link>
                  )) : (
                    <div className="px-4 py-4 text-sm text-gray-400">
                      {language === 'en' ? 'No programs yet' : 'Proqram tapılmadı'}
                    </div>
                  )}
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#0A4D2C] hover:underline"
                    >
                      {language === 'en' ? 'Apply via WhatsApp →' : 'WhatsApp ilə müraciət et →'}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Haqqımızda */}
            <Link href="/#footer" className="px-4 py-2 text-[13px] font-medium text-gray-700 hover:text-[#0A4D2C] transition-colors">
              {language === 'en' ? 'About' : 'Haqqımızda'}
            </Link>

            {/* Sertifikat */}
            <Link href="/#certificate" className="px-4 py-2 text-[13px] font-medium text-gray-700 hover:text-[#0A4D2C] transition-colors">
              {language === 'en' ? 'Certificate' : 'Sertifikat'}
            </Link>

            {/* Əlaqə — hover dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('contact')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="px-4 py-2 text-[13px] font-medium text-gray-700 hover:text-[#0A4D2C] transition-colors">
                {language === 'en' ? 'Contact' : 'Əlaqə'}
              </button>

              {openDropdown === 'contact' && (
                <div className="absolute top-full right-0 mt-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  <div className="px-4 py-2">
                    {infoContacts.map(c => (
                      <a
                        key={c.id}
                        href={
                          c.type === 'whatsapp' ? `https://wa.me/${c.value.replace(/\D/g, '')}`
                          : c.type === 'email' ? `mailto:${c.value}`
                          : `tel:${c.value.replace(/\s/g, '')}`
                        }
                        target={c.type === 'whatsapp' ? '_blank' : undefined}
                        rel={c.type === 'whatsapp' ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-2 py-2.5 text-sm text-gray-700 hover:text-[#0A4D2C] transition-colors border-b border-gray-50 last:border-0"
                      >
                        <span className="text-xs text-gray-400 w-16 capitalize shrink-0">{c.type}</span>
                        <span className="truncate">{c.value}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* FAQ — sağda ayrı */}
            <Link
              href="/faq"
              className={`ml-2 px-4 py-2 text-[13px] font-medium text-gray-700 hover:text-[#0A4D2C] transition-colors border-l border-gray-200 ${isActive('faq') ? activeClass : ''}`}
            >
              FAQ
            </Link>

            {/* Müraciət Et */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-8 px-4 py-1.5 text-[13px] font-semibold text-gray-800 border border-gray-400 rounded-md hover:bg-[#0A4D2C] hover:text-white hover:border-[#0A4D2C] transition-colors"
            >
              {language === 'en' ? 'Apply' : 'Müraciət Et'}
            </a>
          </div>

          {/* Language + Hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 text-[13px] font-semibold text-gray-700">
              <button onClick={() => setLanguage('az')} className={language === 'az' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600 transition-colors'}>AZ</button>
              <span className="text-gray-300">|</span>
              <button onClick={() => setLanguage('en')} className={language === 'en' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600 transition-colors'}>EN</button>
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
          <div className="lg:hidden border-t border-gray-100 py-2">

            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block px-2 py-2.5 text-sm font-medium text-gray-700 hover:text-[#0A4D2C] rounded-lg">
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
                      onClick={() => setMobileMenuOpen(false)}
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

            <Link href="/#footer" onClick={() => setMobileMenuOpen(false)} className="block px-2 py-2.5 text-sm font-medium text-gray-700 hover:text-[#0A4D2C] rounded-lg">
              {language === 'en' ? 'About' : 'Haqqımızda'}
            </Link>

            <Link href="/#certificate" onClick={() => setMobileMenuOpen(false)} className="block px-2 py-2.5 text-sm font-medium text-gray-700 hover:text-[#0A4D2C] rounded-lg">
              {language === 'en' ? 'Certificate' : 'Sertifikat'}
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
                      className="block py-1.5 text-sm text-gray-700 hover:text-[#0A4D2C]"
                    >
                      <span className="text-xs text-gray-400 capitalize">{c.type}: </span>
                      {c.value}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="block px-2 py-2.5 text-sm font-medium text-gray-700 hover:text-[#0A4D2C] rounded-lg border-t border-gray-100 mt-1 pt-3">
              FAQ
            </Link>

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
