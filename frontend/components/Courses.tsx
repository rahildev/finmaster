'use client';

import { motion } from 'framer-motion';
import { getImageUrl } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Course, Contact } from '@/types/landing';

interface CoursesProps {
  data: Course[];
  contacts?: Contact[];
}

const courseIcons = [
  // Calculator — display + button grid
  <svg key="calc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-7 h-7 text-gray-500">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <rect x="7" y="5" width="10" height="3.5" rx="0.5" />
    <rect x="7" y="11" width="2.5" height="2" rx="0.4" fill="currentColor" stroke="none" />
    <rect x="10.75" y="11" width="2.5" height="2" rx="0.4" fill="currentColor" stroke="none" />
    <rect x="14.5" y="11" width="2.5" height="2" rx="0.4" fill="currentColor" stroke="none" />
    <rect x="7" y="14.5" width="2.5" height="2" rx="0.4" fill="currentColor" stroke="none" />
    <rect x="10.75" y="14.5" width="2.5" height="2" rx="0.4" fill="currentColor" stroke="none" />
    <rect x="14.5" y="14.5" width="2.5" height="2" rx="0.4" fill="currentColor" stroke="none" />
    <rect x="7" y="18" width="5.75" height="2" rx="0.4" fill="currentColor" stroke="none" />
    <rect x="14.5" y="18" width="2.5" height="2" rx="0.4" fill="currentColor" stroke="none" />
  </svg>,
  // Bar chart — ascending bars with dot at top
  <svg key="chart" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-7 h-7 text-gray-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 19h18" />
    <rect x="4" y="12" width="3.5" height="7" rx="0.5" />
    <rect x="10.25" y="7" width="3.5" height="12" rx="0.5" />
    <rect x="16.5" y="4" width="3.5" height="15" rx="0.5" />
    <circle cx="18.25" cy="3" r="1" fill="currentColor" stroke="none" />
  </svg>,
  // Document with horizontal lines (spreadsheet)
  <svg key="doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-7 h-7 text-gray-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 13h8M8 17h5" />
  </svg>,
];

export default function Courses({ data, contacts = [] }: CoursesProps) {
  const { language } = useLanguage();

  if (!data || data.length === 0) return null;

  const whatsapp = contacts.find(c => c.type === 'whatsapp');
  const whatsappHref = whatsapp
    ? `https://wa.me/${whatsapp.value.replace(/\D/g, '')}`
    : '#contact';

  return (
    <section id="courses" className="py-20 bg-background border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-5 h-px bg-[#0A4D2C]" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#0A4D2C] uppercase">
              {language === 'en' ? 'Programs' : 'Proqramlar'}
            </span>
            <div className="w-5 h-px bg-[#0A4D2C]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {language === 'en'
              ? 'The right choice for professional development.'
              : 'Peşəkar inkişaf üçün doğru seçim.'}
          </h2>
        </motion.div>

        {/* Course cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((course, i) => {
            const name = language === 'en' && (course as any).name_en ? (course as any).name_en : course.name;
            const desc = language === 'en' ? (course as any).description_en || course.description : course.description;
            const duration = language === 'en' ? (course as any).duration_en || course.duration : course.duration;

            const icon = courseIcons[i % courseIcons.length];

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 bg-white flex flex-col"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                    {icon}
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-bold text-gray-900 text-xl mb-3 leading-snug">{name}</h3>

                {/* Description */}
                {desc && (
                  <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-8 line-clamp-3">{desc}</p>
                )}

                {/* Footer row */}
                <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    {duration || (parseFloat(course.price) > 0 ? `${parseFloat(course.price)} ₼` : '')}
                  </span>
                  <a
                    href={whatsappHref}
                    target={whatsapp ? '_blank' : undefined}
                    rel={whatsapp ? 'noopener noreferrer' : undefined}
                    onClick={!whatsapp ? (e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); } : undefined}
                    className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 hover:text-[#0A4D2C] transition-colors group"
                  >
                    {language === 'en' ? 'Learn more' : 'Ətraflı məlumat'}
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* "Bütün proqramlara bax" link */}
        <div className="text-center mt-10">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#0A4D2C] transition-colors"
          >
            {language === 'en' ? 'View all programs' : 'Bütün proqramlara bax'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
