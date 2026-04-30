'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api';
import type { Course } from '@/types/landing';

/**
 * Courses Section - Apple stil
 * Kart grid, hover lift effekti, minimalist dizayn
 */

interface CoursesProps {
  data: Course[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
};

export default function Courses({ data }: CoursesProps) {
  if (!data || data.length === 0) return null;

  return (
    <section id="courses" className="py-20 sm:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-dark mb-4">
            Kurslarımız
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Peşəkar mühasib olmaq üçün strukturlaşdırılmış təhsil proqramı
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {data.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-primary/30 transition-all hover:shadow-2xl h-full flex flex-col">
                {/* Şəkil və ya gradient placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-primary-light to-primary overflow-hidden">
                  {getImageUrl(course.image_url) ? (
                    <Image
                      src={getImageUrl(course.image_url)!}
                      alt={course.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-white/50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Məlumat */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-dark mb-2 group-hover:text-primary transition-colors">
                    {course.name}
                  </h3>

                  {course.description && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                      {course.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    {course.duration && (
                      <span className="text-sm text-gray-500 flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {course.duration}
                      </span>
                    )}

                    <span className="text-lg font-bold text-primary">
                      {parseFloat(course.price) > 0
                        ? `${parseFloat(course.price)} ₼`
                        : 'Pulsuz'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
