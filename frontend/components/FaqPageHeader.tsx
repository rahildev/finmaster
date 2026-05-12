'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function FaqPageHeader() {
  const { language } = useLanguage();

  return (
    <div className="text-center mb-12">
      <p className="text-lg text-gray-500 leading-relaxed max-w-sm mx-auto">
        {language === 'en'
          ? 'Find answers to the most frequently asked questions about Finmaster Academy.'
          : 'Finmaster Akademiyası ilə bağlı ən çox maraqlandırılan sualların cavablarını burada tapa bilərsiniz.'}
      </p>
    </div>
  );
}
