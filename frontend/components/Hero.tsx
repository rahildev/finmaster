'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import type { HeroSection as HeroType, Contact } from '@/types/landing';

interface HeroProps {
  data: HeroType[];
  contacts?: Contact[];
}

export default function Hero({ data, contacts = [] }: HeroProps) {
  const { language } = useLanguage();

  if (!data || data.length === 0) return null;

  const hero = data[0];
  const title = language === 'en' ? (hero as any).title_en || hero.title : hero.title;
  const subtitle = language === 'en' ? (hero as any).subtitle_en || hero.subtitle : hero.subtitle;

  const whatsapp = contacts.find(c => c.type === 'whatsapp');
  const whatsappHref = whatsapp
    ? `https://wa.me/${whatsapp.value.replace(/\D/g, '')}`
    : '#contact';

  return (
    <section id="hero" className="bg-background overflow-hidden pt-16">

      {/* Desktop layout */}
      <div className="hidden lg:flex items-center relative" style={{ minHeight: '77vh' }}>

        {/* Desktop image — absolute right half with mask */}
        <div
          className="absolute top-0 bottom-0 right-0"
          style={{
            left: '40%',
            maskImage: 'linear-gradient(to right, transparent 0%, black 14%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 14%)',
          }}
        >
          <Image
            src="/hero-photo.png"
            alt=""
            fill
            priority
            unoptimized
            className="object-cover"
            style={{ objectPosition: 'center 40%' }}
            sizes="50vw"
          />
        </div>

        {/* Desktop text */}
        <div className="relative z-10 max-w-7xl mx-auto px-10 w-full py-16">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-5"
            >
              <span className="font-inter text-[13px] font-bold tracking-[0.2em] text-gray-500">
                {language === 'en' ? 'Systematic. Simple. Logical.' : 'Sistemli. Sadə. Lojik.'}
              </span>
              <div className="w-8 h-px bg-gray-400 mt-2" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[3.25rem] font-bold text-gray-900 leading-[1.15] mb-6"
            >
              {title}
            </motion.h1>

            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-xl text-gray-500 leading-relaxed max-w-xs"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile layout — mətn üstdə, şəkil altda */}
      <div className="lg:hidden flex flex-col">

        {/* Mobile text */}
        <div className="px-6 pt-10 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="text-[11px] font-bold tracking-[0.2em] text-gray-500">
              {language === 'en' ? 'Systematic. Simple. Logical.' : 'Sistemli. Sadə. Lojik.'}
            </span>
            <div className="w-7 h-px bg-gray-400 mt-2" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[2.6rem] font-bold text-gray-900 leading-[1.15] mb-5"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-gray-500 leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Mobile image — tam genişlik, altda */}
        <Image
          src="/hero-mobile.png"
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          priority
          unoptimized
          className="w-full h-auto block"
        />
      </div>

    </section>
  );
}
