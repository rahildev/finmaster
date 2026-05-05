'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import type { HeroSection as HeroType } from '@/types/landing';

/**
 * Hero Section - Apple stil
 * Böyük tipografiya (48-72px), gradient arxa fon, CTA button
 */

interface HeroProps {
  data: HeroType[];
}

export default function Hero({ data }: HeroProps) {
  const { language } = useLanguage();

  if (!data || data.length === 0) return null;

  // İlk aktiv hero-nu göstər
  const hero = data[0];

  return (
    <section
      id="hero"
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background image — desktop */}
      <div className="absolute inset-0 hidden sm:block">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          priority
          unoptimized
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      {/* Background image — mobile */}
      <div className="absolute inset-0 block sm:hidden">
        <Image
          src="/hero-mobile.jpg"
          alt=""
          fill
          priority
          unoptimized
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-black/20 z-[1]" />
      <div className="relative z-[2] max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-20 w-full">
        <motion.div
          className="max-w-xl -mt-24 sm:mt-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Ana başlıq */}
          <h1 className="text-lg sm:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight mb-4 uppercase">
            {language === 'en' ? (hero as any).title_en || hero.title : hero.title}
          </h1>

          {/* Alt başlıq */}
          {(language === 'en' ? (hero as any).subtitle_en || hero.subtitle : hero.subtitle) && (
            <p className="text-xs sm:text-base lg:text-lg text-white/90 mb-8 font-semibold uppercase tracking-wide">
              {language === 'en' ? (hero as any).subtitle_en || hero.subtitle : hero.subtitle}
            </p>
          )}

          {/* CTA Button */}
          {(language === 'en' ? (hero as any).btn_text_en || hero.btn_text : hero.btn_text) && hero.btn_link && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                href={hero.btn_link}
                className="inline-flex items-center px-8 py-4 bg-white text-primary-dark text-lg font-semibold rounded-full hover:bg-gray-light transition-all hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                {language === 'en' ? (hero as any).btn_text_en || hero.btn_text : hero.btn_text}
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
