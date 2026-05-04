'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Footer Component - Apple stil
 * Logo + copyright, minimalist
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface QuickLink {
  name: string;
  href: string;
  sectionKey?: string;
}

interface Contact {
  id: number;
  type: string;
  label: string;
  value: string;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean> | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/landing`);
        const data = await response.json();
        setSectionVisibility(data.section_visibility || {});
        setContacts(data.contacts || []);
      } catch (error) {
        console.error('Error fetching footer data:', error);
        setSectionVisibility({});
      }
    };

    fetchData();
  }, []);

  const allQuickLinks: QuickLink[] = [
    { name: 'Haqqımızda', href: '#teacher', sectionKey: 'teacher' },
    { name: 'Kurslar', href: '#courses', sectionKey: 'courses' },
    { name: 'Videolar', href: '#videos', sectionKey: 'videos' },
    { name: 'FAQ', href: '#faq', sectionKey: 'faq' },
    { name: 'Əlaqə', href: '#contact', sectionKey: 'contact' },
  ];

  // Filter links based on section visibility
  const quickLinks = sectionVisibility === null ? [] : allQuickLinks.filter(link => {
    if (!link.sectionKey) return true;
    return sectionVisibility[link.sectionKey] !== false;
  });

  return (
    <footer className="bg-gray-dark text-white py-12 sm:py-16">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo və təsvir */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="relative">
                <img
                  src="/brand/finmaster-icon.png"
                  alt="Finmaster Icon"
                  className="h-20 w-auto object-contain transition-transform group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col -ml-3">
                <span className="text-white font-bold text-xl leading-tight tracking-tight">
                  FinMaster
                </span>
                <span className="text-green-400 font-semibold text-sm leading-tight tracking-[0.2em]">
                  ACADEMY
                </span>
                <span className="text-gray-300 font-medium text-[7px] leading-tight tracking-wider">
                  ACCOUNTING & FINANCE TRAINING
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Mühasibatlıq və maliyyə tədrisi üzrə peşəkar təhsil platforması
            </p>
          </div>

          {/* Sürətli linklər */}
          {quickLinks.length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-4">Sürətli Keçidlər</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-green-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Əlaqə */}
          {contacts.length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-4">Əlaqə</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    {contact.label}: {contact.value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Finmaster Academy. Bütün hüquqlar qorunur.
            </p>
            <div className="flex items-center space-x-6 text-xs text-gray-500">
              <Link href="#" className="hover:text-green-400 transition-colors duration-300">
                Gizlilik Siyasəti
              </Link>
              <Link href="#" className="hover:text-green-400 transition-colors duration-300">
                İstifadə Şərtləri
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
