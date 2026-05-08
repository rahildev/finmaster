'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Faq } from '@/types/landing';

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const { language } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);

  if (!faqs.length) {
    return (
      <p className="text-gray-400 text-sm">
        {language === 'en' ? 'No questions yet.' : 'Hələ sual yoxdur.'}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {faqs.map(faq => {
        const question = language === 'en' && (faq as any).question_en ? (faq as any).question_en : faq.question;
        const answer   = language === 'en' && (faq as any).answer_en   ? (faq as any).answer_en   : faq.answer;
        const isOpen   = open === faq.id;

        return (
          <div key={faq.id} className={`border rounded-xl overflow-hidden transition-colors ${isOpen ? 'border-[#0A4D2C]' : 'border-gray-200'}`}>
            <button
              onClick={() => setOpen(isOpen ? null : faq.id)}
              className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
            >
              <span className="font-medium text-gray-800 text-sm sm:text-base">{question}</span>
              <svg
                className={`w-5 h-5 shrink-0 text-[#0A4D2C] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                <div className="pt-4">{answer}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
