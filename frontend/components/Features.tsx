'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const featureData = {
  az: [
    {
      title: 'Sistemli yanaşma',
      desc: 'Məlumatlar ardıcıl və strukturlaşdırılmış şəkildə təqdim olunur.',
      icon: (
        // Layers / stacked rectangles
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-500">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 12l10 5 10-5" />
          <path d="M2 17l10 5 10-5" />
        </svg>
      ),
    },
    {
      title: 'Ezbersiz öyrənmə',
      desc: 'Praktik izahlar və real nümunalarla asan anlama.',
      icon: (
        // Open book
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-500">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
    },
    {
      title: 'Praktik tətbiq',
      desc: 'Hər mövzu real iş proseslərinə uyğun öyrədilir.',
      icon: (
        // Bar chart rising
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-500">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
      ),
    },
    {
      title: 'Mentor dəstəyi',
      desc: 'Suallarınıza cavab, yönləndirmə və daimi dəstək.',
      icon: (
        // Person / profile
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-500">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ],
  en: [
    {
      title: 'Systematic approach',
      desc: 'Information is presented in a consistent and structured manner.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-500">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 12l10 5 10-5" />
          <path d="M2 17l10 5 10-5" />
        </svg>
      ),
    },
    {
      title: 'Learning by understanding',
      desc: 'Practical explanations and real examples for easy comprehension.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-500">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
    },
    {
      title: 'Practical application',
      desc: 'Every topic is taught in alignment with real work processes.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-500">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
      ),
    },
    {
      title: 'Mentor support',
      desc: 'Answers to your questions, guidance and ongoing support.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-500">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ],
};

export default function Features() {
  const { language } = useLanguage();
  const items = featureData[language] ?? featureData.az;

  return (
    <section className="py-20 bg-background border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-5 h-px bg-[#C07A2E]" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#C07A2E] uppercase">
              {language === 'en' ? 'Why FinMaster?' : 'Niyə FinMaster?'}
            </span>
            <div className="w-5 h-px bg-[#C07A2E]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {language === 'en'
              ? 'Our difference that leads you to results.'
              : 'Sizi nəticəyə aparan fərqimiz.'}
          </h2>
        </motion.div>

        {/* 4 cards — icon LEFT, text RIGHT (exactly like design) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-gray-50 border border-gray-200 rounded-xl p-6"
            >
              {/* Icon box — top, matches design gray square */}
              <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-4 shadow-sm">
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-[15px] mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
