'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Navbar Component - Apple stil
 * Sticky navbar, blur backdrop, scroll edəndə arxa plan effekti
 */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Haqqımızda', href: '#teacher' },
    { name: 'Kurslar', href: '#courses' },
    { name: 'Videolar', href: '#videos' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-32 sm:w-40 h-10">
              <Image
                src="/brand/finmaster-logo.png"
                alt="Finmaster Academy"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-dark hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Əlaqə Button */}
          <Link
            href="#contact"
            className="hidden md:inline-flex items-center px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-full transition-all hover:scale-105"
          >
            Əlaqə
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-dark hover:text-primary"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
