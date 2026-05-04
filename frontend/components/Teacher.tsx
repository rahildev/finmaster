'use client';

import { motion } from 'framer-motion';
import { getImageUrl } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TeacherInfo } from '@/types/landing';

interface TeacherProps {
  data: TeacherInfo[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8 },
};

export default function Teacher({ data }: TeacherProps) {
  const { language, t } = useLanguage();

  if (!data || data.length === 0) return null;

  return (
    <section id="teacher" className="py-20 sm:py-32 bg-gray-light">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-green-900 mb-4">
            {t.teacher.title}
          </h2>
          <div className="w-20 h-1 bg-green-600 mx-auto"></div>
        </motion.div>

        {data.length === 1 ? (
          /* Tək müəllim — sol şəkil, sağ məlumat */
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative max-w-xs mx-auto lg:ml-auto lg:mr-0"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-300">
                {getImageUrl(data[0].photo_url) ? (
                  <img
                    src={getImageUrl(data[0].photo_url)!}
                    alt={data[0].name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-light to-primary">
                    <span className="text-8xl text-white font-bold">{data[0].name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10"></div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-green-900 mb-2">{data[0].name}</h3>
                {(language === 'en' ? (data[0] as any).title_en || data[0].title : data[0].title) && (
                  <p className="text-xl text-green-700 font-medium">
                    {language === 'en' ? (data[0] as any).title_en || data[0].title : data[0].title}
                  </p>
                )}
              </div>
              {(language === 'en' ? (data[0] as any).bio_en || data[0].bio : data[0].bio) && (
                <p className="text-lg text-green-800 leading-relaxed">
                  {language === 'en' ? (data[0] as any).bio_en || data[0].bio : data[0].bio}
                </p>
              )}
              {(language === 'en' ? (data[0] as any).experience_en || data[0].experience : data[0].experience) && (
                <div className="pt-6 border-t border-gray-300">
                  <h4 className="text-lg font-semibold text-green-900 mb-2">{t.teacher.experience}</h4>
                  <p className="text-green-800 leading-relaxed">
                    {language === 'en' ? (data[0] as any).experience_en || data[0].experience : data[0].experience}
                  </p>
                </div>
              )}
              {(language === 'en' ? (data[0] as any).achievements_en || data[0].achievements : data[0].achievements) && (
                <div className="pt-6 border-t border-gray-300">
                  <h4 className="text-lg font-semibold text-green-900 mb-2">{t.teacher.achievements}</h4>
                  <p className="text-green-800 leading-relaxed">
                    {language === 'en' ? (data[0] as any).achievements_en || data[0].achievements : data[0].achievements}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        ) : (
          /* Çoxlu müəllim — kart grid */
          <div className="flex flex-wrap justify-center gap-8">
            {data.map((teacher, index) => {
              const photoUrl = getImageUrl(teacher.photo_url);
              return (
                <motion.div
                  key={teacher.id}
                  {...fadeInUp}
                  transition={{ delay: index * 0.15, duration: 0.8 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow w-64"
                >
                  <div className="aspect-[3/4] bg-gray-200 overflow-hidden">
                    {photoUrl ? (
                      <img src={photoUrl} alt={teacher.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-light to-primary">
                        <span className="text-6xl text-white font-bold">{teacher.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-green-900 mb-1">{teacher.name}</h3>
                    {(language === 'en' ? (teacher as any).title_en || teacher.title : teacher.title) && (
                      <p className="text-green-700 font-medium text-sm mb-3">
                        {language === 'en' ? (teacher as any).title_en || teacher.title : teacher.title}
                      </p>
                    )}
                    {(language === 'en' ? (teacher as any).bio_en || teacher.bio : teacher.bio) && (
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {language === 'en' ? (teacher as any).bio_en || teacher.bio : teacher.bio}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
