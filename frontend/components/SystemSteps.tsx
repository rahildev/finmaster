'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const steps = {
  az: [
    { num: '01', title: 'Təməl', desc: 'Əsas anlayışlar və prinsiplər' },
    { num: '02', title: 'Mövzular', desc: 'Əsas mövzuların dərin öyrənilməsi' },
    { num: '03', title: 'Tətbiq', desc: 'Praktik tapşırıqlar və nümunələr' },
    { num: '33', title: 'Peşəkarlıq', desc: 'Real iş mühitinə tam hazırlıq' },
  ],
  en: [
    { num: '01', title: 'Foundation', desc: 'Core concepts and principles' },
    { num: '02', title: 'Topics', desc: 'In-depth study of key subjects' },
    { num: '03', title: 'Application', desc: 'Practical tasks and examples' },
    { num: '33', title: 'Mastery', desc: 'Full readiness for real work environment' },
  ],
};

export default function SystemSteps() {
  const { language } = useLanguage();
  const items = steps[language] ?? steps.az;

  return (
    <section className="py-20 bg-[#F9F6F1]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-px bg-[#C07A2E]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#C07A2E] uppercase">
                {language === 'en' ? '33-Step System' : '33 Addımlıq Sistem'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">
              {language === 'en' ? 'Step-by-step\nperfection.' : 'Addım-addım\nmükəmməllik.'}
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-sm">
              {language === 'en'
                ? '33 steps — a unique methodology for learning accounting from scratch to a professional level.'
                : '33 addımdan ibarət unikal metodika ilə mühasibatı sıfırdan peşəkar səviyyəyə qədər öyrənin.'}
            </p>
            <a
              href="#courses"
              onClick={(e) => { e.preventDefault(); document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 bg-[#0A4D2C] text-white font-semibold px-6 py-3.5 rounded-md hover:bg-[#0c5e35] transition-colors text-sm"
            >
              {language === 'en' ? 'About the System' : 'Sistem haqqında'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>

          {/* Right — Steps */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            {/* Connecting line */}
            <div className="absolute top-8 left-8 right-8 h-px bg-gray-300 hidden sm:block" style={{ top: '2rem' }} />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative">
              {items.map((step, i) => (
                <div key={step.num} className="flex flex-col items-center text-center relative">
                  {/* Ellipsis between 03 and 33 */}
                  {i === 2 && (
                    <div className="absolute -right-2 top-6 hidden sm:flex items-center justify-center w-4">
                      <span className="text-gray-400 text-xs tracking-widest">···</span>
                    </div>
                  )}
                  <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-bold text-sm mb-3 bg-white z-10 ${step.num === '33' ? 'border-[#0A4D2C] text-[#0A4D2C]' : 'border-gray-300 text-gray-700'}`}>
                    {step.num}
                  </div>
                  <div className="font-semibold text-gray-900 text-sm mb-1">{step.title}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{step.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
