'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api';
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
  transition: { duration: 0.8, ease: 'easeOut' },
};

export default function Teacher({ data }: TeacherProps) {
  if (!data) return null;

  const photoUrl = getImageUrl(data.photo_url);

  return (
    <section id="teacher" className="py-20 sm:py-32 bg-gray-light">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-dark mb-4">
            Müəllim Haqqında
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Foto */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gray-300">
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt={data.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
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
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-dark mb-2">
                {data.name}
              </h3>
              {data.title && (
                <p className="text-xl text-primary font-medium">{data.title}</p>
              )}
            </div>

            {data.bio && (
              <p className="text-lg text-gray-600 leading-relaxed">{data.bio}</p>
            )}

            {data.experience && (
              <div className="pt-6 border-t border-gray-300">
                <h4 className="text-lg font-semibold text-gray-dark mb-2">
                  Təcrübə
                </h4>
                <p className="text-gray-600 leading-relaxed">{data.experience}</p>
              </div>
            )}

            {data.achievements && (
              <div className="pt-6 border-t border-gray-300">
                <h4 className="text-lg font-semibold text-gray-dark mb-2">
                  Nailiyyətlər
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {data.achievements}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
