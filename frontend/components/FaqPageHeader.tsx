'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function FaqPageHeader() {
  const { language } = useLanguage();

  return (
    <div className="mb-10">
      <p className="text-[11px] font-bold tracking-[0.2em] text-[#0A4D2C] uppercase mb-3">FAQ</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
        {language === 'en' ? 'Frequently Asked Questions' : 'Tez-tez verilən suallar'}
      </h1>
    </div>
  );
}
