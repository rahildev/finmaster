'use client';

import { motion } from 'framer-motion';
import { getImageUrl } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TeacherInfo } from '@/types/landing';

/**
 * Teacher Section - Apple "Meet the team" stili
 * Foto + bio, minimalist dizayn
 */

interface TeacherProps {
  data: TeacherInfo | null;
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8 },
};

export default function Teacher({ data }: TeacherProps) {
  const { language, t } = useLanguage();

  if (!data) return null;

  const photoUrl = getImageUrl(data.photo_url);

  return (
    <section id="teacher" className="py-20 sm:py-32 bg-gray-light">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-green-900 mb-4">
            {t.teacher.title}
          </h2>
          <div className="w-20 h-1 bg-green-600 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Foto */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative max-w-xs mx-auto lg:ml-auto lg:mr-0"
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-300">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-light to-primary">
                  <span className="text-8xl text-white font-bold">
                    {data.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10"></div>
          </motion.div>

          {/* Məlumat */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-green-900 mb-2">
                {data.name}
              </h3>
              {(language === 'en' ? (data as any).title_en || data.title : data.title) && (
                <p className="text-xl text-green-700 font-medium">
                  {language === 'en' ? (data as any).title_en || data.title : data.title}
                </p>
              )}
            </div>

            {(language === 'en' ? (data as any).bio_en || data.bio : data.bio) && (
              <p className="text-lg text-green-800 leading-relaxed">
                {language === 'en' ? (data as any).bio_en || data.bio : data.bio}
              </p>
            )}

            {(language === 'en' ? (data as any).experience_en || data.experience : data.experience) && (
              <div className="pt-6 border-t border-gray-300">
                <h4 className="text-lg font-semibold text-green-900 mb-2">
                  {t.teacher.experience}
                </h4>
                <p className="text-green-800 leading-relaxed">
                  {language === 'en' ? (data as any).experience_en || data.experience : data.experience}
                </p>
              </div>
            )}

            {(language === 'en' ? (data as any).achievements_en || data.achievements : data.achievements) && (
              <div className="pt-6 border-t border-gray-300">
                <h4 className="text-lg font-semibold text-green-900 mb-2">
                  {t.teacher.achievements}
                </h4>
                <p className="text-green-800 leading-relaxed">
                  {language === 'en' ? (data as any).achievements_en || data.achievements : data.achievements}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
