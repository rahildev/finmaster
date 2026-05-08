'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Contact } from '@/types/landing';

interface FooterProps {
  contacts: Contact[];
}

const SocialIcon = ({ type }: { type: string }) => {
  if (type === 'instagram') return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
  if (type === 'linkedin') return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
  if (type === 'youtube') return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
  if (type === 'tiktok') return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
  return null;
};

export default function Footer({ contacts }: FooterProps) {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [certId, setCertId] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const socialContacts = contacts.filter(c => ['instagram', 'linkedin', 'youtube', 'tiktok'].includes(c.type));
  const infoContacts = contacts.filter(c => ['phone', 'whatsapp', 'email'].includes(c.type));

  const getSocialHref = (c: Contact) => {
    if (c.value.startsWith('http')) return c.value;
    if (c.type === 'instagram') return `https://instagram.com/${c.value.replace('@', '')}`;
    if (c.type === 'linkedin')  return `https://linkedin.com/company/${c.value}`;
    if (c.type === 'youtube')   return `https://youtube.com/@${c.value}`;
    if (c.type === 'tiktok')    return `https://tiktok.com/@${c.value}`;
    return '#';
  };

  const getInfoHref = (c: Contact) => {
    if (c.type === 'email') return `mailto:${c.value}`;
    if (c.type === 'phone' || c.type === 'whatsapp') return `tel:${c.value.replace(/\s/g, '')}`;
    return '#';
  };

  const getInfoIcon = (type: string) => {
    if (type === 'email') return (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
    return (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    );
  };

  const whatsapp = contacts.find(c => c.type === 'whatsapp');
  const whatsappHref = whatsapp ? `https://wa.me/${whatsapp.value.replace(/\D/g, '')}` : '#footer';

  return (
    <footer id="footer" className="bg-[#f6f6f5] text-gray-800 border-t border-gray-900/[0.06]">


      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 divide-y divide-gray-900/[0.05] sm:divide-y-0">

          {/* Brand */}
          <div className="-mt-20">
            <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Image src="/brand/finmaster-logo.png" alt="FinMaster Academy" width={180} height={180} unoptimized className="w-56 h-auto object-contain" />
            </Link>
            <div className="-mt-14 ml-6 flex flex-col gap-0.5">
              {(language === 'en'
                ? ['Simple.', 'Systematic.', 'Logical.']
                : ['Sistemli.', 'Sadə.', 'Lojik.']
              ).map(word => (
                <span key={word} className="font-inter text-[13px] font-semibold text-gray-600 leading-snug">— {word}</span>
              ))}
            </div>
          </div>

          {/* Əlaqə */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-4">
              {language === 'en' ? 'Contact' : 'Əlaqə'}
            </h4>
            <ul className="space-y-2.5">
              {infoContacts.map(c => (
                <li key={c.id}>
                  <a href={getInfoHref(c)} className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2">
                    {getInfoIcon(c.type)}
                    <span className="font-inter">{c.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Bizi İzləyin */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-4">
              {language === 'en' ? 'Follow Us' : 'Bizi İzləyin'}
            </h4>
            <div className="flex flex-row gap-4">
              {socialContacts.length > 0
                ? socialContacts.map(c => (
                  <a
                    key={c.id}
                    href={getSocialHref(c)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-500 transition-colors
                      ${c.type === 'instagram' ? 'hover:text-[#E1306C]' : ''}
                      ${c.type === 'linkedin'  ? 'hover:text-[#0077B5]' : ''}
                      ${c.type === 'youtube'   ? 'hover:text-[#FF0000]' : ''}
                      ${c.type === 'tiktok'    ? 'hover:text-[#010101]' : ''}
                    `}
                  >
                    <SocialIcon type={c.type} />
                  </a>
                ))
                : ['instagram', 'linkedin', 'youtube', 'tiktok'].map(type => (
                  <span key={type} className="text-gray-300">
                    <SocialIcon type={type} />
                  </span>
                ))
              }
            </div>
          </div>

          {/* Sertifikat Doğrulama */}
          <div id="certificate" className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-4">
              {language === 'en' ? 'Verify Certificate' : 'Sertifikatı Doğrulayın'}
            </h4>
            <p className="font-inter text-sm text-gray-500 mb-3">
              {language === 'en'
                ? 'Enter your certificate ID to verify.'
                : 'Sertifikatınızı yoxlamaq üçün ID daxil edin.'}
            </p>
            <form onSubmit={handleVerify} className="flex gap-2">
              <input
                type="text"
                value={certId}
                onChange={e => setCertId(e.target.value)}
                placeholder="Certificate ID"
                className="flex-1 min-w-0 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0A4D2C] focus:ring-1 focus:ring-[#0A4D2C] bg-white"
              />
              <button
                type="submit"
                className="shrink-0 bg-[#0A4D2C] text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-[#0c5e35] transition-colors"
              >
                {language === 'en' ? 'Verify' : 'Doğrula'}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 pt-6 flex flex-col items-center gap-2">
          <p className="font-inter text-gray-400 text-sm text-center" suppressHydrationWarning>
            © {currentYear} Finmaster Academy. {language === 'en' ? 'All rights reserved.' : 'Bütün hüquqlar qorunur.'}
          </p>
          <div className="font-inter flex gap-5 text-sm text-gray-400">
            <span className="hover:text-gray-700 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-gray-700 cursor-pointer transition-colors">Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
