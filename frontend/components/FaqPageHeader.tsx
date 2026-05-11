'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function FaqPageHeader() {
  const { language } = useLanguage();

  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-5">
        <span className="w-10 h-px bg-gray-300" />
        <span className="text-[11px] font-semibold tracking-[0.3em] text-[#0A4D2C] uppercase">FAQ</span>
        <span className="w-10 h-px bg-gray-300" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold text-[#1D1D1F] mb-5 leading-tight">
        {language === 'en' ? 'Frequently Asked Questions' : 'Tez-tez Verilən Suallar'}
      </h1>
      <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
        {language === 'en'
          ? 'Find answers to the most frequently asked questions about Finmaster Academy.'
          : 'Finmaster Academy ilə bağlı ən çox maraqlandırılan sualların cavablarını burada tapa bilərsiniz.'}
      </p>
    </div>
  );
}
