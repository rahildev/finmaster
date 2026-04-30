'use client';

import Image from 'next/image';
import Link from 'next/link';

/**
 * Footer Component - Apple stil
 * Logo + copyright, minimalist
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Haqqımızda', href: '#teacher' },
    { name: 'Kurslar', href: '#courses' },
    { name: 'Videolar', href: '#videos' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Əlaqə', href: '#contact' },
  ];

  return (
    <footer className="bg-gray-dark text-white py-12 sm:py-16">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo və təsvir */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative w-40 h-12">
                <Image
                  src="/brand/finmaster-logo.png"
                  alt="Finmaster Academy"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Mühasibatlıq və maliyyə tədrisi üzrə peşəkar təhsil platforması
            </p>
          </div>

          {/* Sürətli linklər */}
          <div>
            <h3 className="text-white font-semibold mb-4">Sürətli Keçidlər</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-light transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Əlaqə */}
          <div>
            <h3 className="text-white font-semibold mb-4">Əlaqə</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Tel: +994 50 123 45 67</li>
              <li>Email: info@finmaster.academy</li>
              <li>Instagram: @finmaster.academy</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Finmaster Academy. Bütün hüquqlar qorunur.
            </p>
            <div className="flex items-center space-x-6 text-xs text-gray-500">
              <Link href="#" className="hover:text-gray-300 transition-colors">
                Gizlilik Siyasəti
              </Link>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                İstifadə Şərtləri
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
