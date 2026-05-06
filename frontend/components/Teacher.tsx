'use client';

import { motion } from 'framer-motion';
import { getImageUrl } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TeacherInfo, Contact } from '@/types/landing';

interface TeacherProps {
  data: TeacherInfo[];
  contacts?: Contact[];
}

export default function Teacher({ data, contacts = [] }: TeacherProps) {
  const { language } = useLanguage();

  if (!data || data.length === 0) return null;

  const teacher = data[0];
  const title = language === 'en' ? (teacher as any).title_en || teacher.title : teacher.title;
  const bio = language === 'en' ? (teacher as any).bio_en || teacher.bio : teacher.bio;
  const photoUrl = getImageUrl(teacher.photo_url);

  const whatsapp = contacts.find(c => c.type === 'whatsapp');
  const whatsappHref = whatsapp
    ? `https://wa.me/${whatsapp.value.replace(/\D/g, '')}`
    : '#contact';

  return (
    <section id="teacher" className="bg-background border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 items-stretch">

          {/* Left — Photo (full height, no padding) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative min-h-[300px] lg:min-h-0 lg:h-full bg-gray-100 overflow-hidden"
          >
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={teacher.name}
                className="w-full h-full object-cover object-top absolute inset-0"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 absolute inset-0">
                <span className="text-8xl font-bold text-gray-400">{teacher.name.charAt(0)}</span>
              </div>
            )}
          </motion.div>

          {/* Right — Info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col justify-center px-10 py-16 lg:px-16"
          >
            {/* Label */}
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#C07A2E] uppercase mb-4">
              {language === 'en' ? 'About Us' : 'Haqqımızda'}
            </p>

            {/* Name */}
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{teacher.name}</h2>

            {/* Title in green */}
            {title && (
              <p className="text-[#0A4D2C] font-semibold text-base mb-6">{title}</p>
            )}

            {/* Bio */}
            {bio && (
              <p className="text-gray-500 text-base leading-relaxed mb-8">{bio}</p>
            )}

            {/* Signature */}
            <div className="mb-8">
              <span className="font-['Georgia',serif] italic text-2xl text-gray-700">
                T. {teacher.name.split(' ').slice(-1)[0]}
              </span>
            </div>

            {/* Button */}
            <div>
              <a
                href={whatsappHref}
                target={whatsapp ? '_blank' : undefined}
                rel={whatsapp ? 'noopener noreferrer' : undefined}
                onClick={!whatsapp ? (e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); } : undefined}
                className="inline-flex items-center gap-2 bg-[#0A4D2C] text-white font-semibold px-6 py-3.5 rounded-md hover:bg-[#0c5e35] transition-colors text-sm"
              >
                {language === 'en' ? 'Learn more' : 'Ətraflı məlumat'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
