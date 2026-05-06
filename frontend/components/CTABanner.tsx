'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Contact } from '@/types/landing';

interface CTABannerProps {
  contacts: Contact[];
}

export default function CTABanner({ contacts }: CTABannerProps) {
  const { language } = useLanguage();

  const whatsapp = contacts.find(c => c.type === 'whatsapp');
  const whatsappHref = whatsapp
    ? `https://wa.me/${whatsapp.value.replace(/\D/g, '')}`
    : '#contact';

  return (
    <section className="bg-[#0A4D2C] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-8"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {language === 'en'
                ? 'Your next step begins with us.'
                : 'Növbəti addım sizinlə başlayır.'}
            </h2>
            <p className="text-white/60 text-sm">
              {language === 'en'
                ? 'Apply today and enter the path of professional development.'
                : 'Bugün müraciət edin və peşəkar inkişaf yoluna daxil olun.'}
            </p>
          </div>
          <a
            href={whatsappHref}
            target={whatsapp ? '_blank' : undefined}
            rel={whatsapp ? 'noopener noreferrer' : undefined}
            onClick={!whatsapp ? (e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); } : undefined}
            className="shrink-0 inline-flex items-center gap-2 bg-white text-[#0A4D2C] font-bold px-7 py-3.5 rounded-md hover:bg-gray-100 transition-colors text-sm whitespace-nowrap"
          >
            {language === 'en' ? 'Apply' : 'Müraciət Et'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
