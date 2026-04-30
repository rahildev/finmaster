'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { HeroSection as HeroType } from '@/types/landing';

/**
 * Hero Section - Apple stil
 * Böyük tipografiya (48-72px), gradient arxa fon, CTA button
 */

interface HeroProps {
  data: HeroType[];
}

export default function Hero({ data }: HeroProps) {
  if (!data || data.length === 0) return null;

  // İlk aktiv hero-nu göstər
  const hero = data[0];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(106,176,78,0.3),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(10,77,44,0.3),transparent_50%)]"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Ana başlıq - Apple stil böyük tipografiya */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight tracking-tight mb-6">
            {hero.title}
          </h1>

          {/* Alt başlıq */}
          {hero.subtitle && (
            <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 max-w-3xl mx-auto mb-12 font-light">
              {hero.subtitle}
            </p>
          )}

          {/* CTA Button */}
          {hero.btn_text && hero.btn_link && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                href={hero.btn_link}
                className="inline-flex items-center px-8 py-4 bg-white text-primary-dark text-lg font-semibold rounded-full hover:bg-gray-light transition-all hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                {hero.btn_text}
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-3 bg-white/80 rounded-full"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
