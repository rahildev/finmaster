'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Video } from '@/types/landing';

/**
 * Videos Section - YouTube embed grid
 * Apple stil, responsive video player
 */

interface VideosProps {
  shorts: Video[];
  videos: Video[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8 },
};

export default function Videos({ shorts, videos }: VideosProps) {
  const { language, t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const hasShorts = shorts && shorts.length > 0;
  const hasVideos = videos && videos.length > 0;

  if (!hasShorts && !hasVideos) return null;

  // İlk 4 video göstər (2 sıra x 2 sütun)
  const initialCount = 4;
  const displayedVideos = showAll ? videos : videos.slice(0, initialCount);
  const hasMore = videos.length > initialCount;

  return (
    <section id="videos" className="py-20 sm:py-32 bg-gray-light">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-green-900 mb-4">
            {t.videos.title}
          </h2>
          <p className="text-xl text-green-800 max-w-2xl mx-auto">
            {t.videos.subtitle}
          </p>
        </motion.div>

        {/* Shorts - Horizontal Carousel */}
        {hasShorts && (
          <div className="mb-16">
            <div className="overflow-x-auto pb-4 -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
              <div className="flex gap-4 min-w-min">
                {shorts.map((short, index) => (
                  <motion.div
                    key={short.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex-none w-[200px] sm:w-[240px] group"
                  >
                    <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-lg hover:shadow-2xl transition-all">
                      <iframe
                        src={short.video_url}
                        title={short.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />

                      {/* Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <h3 className="text-white font-semibold text-sm line-clamp-2">
                          {language === 'en' ? (short as any).title_en || short.title : short.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Long-form Videos - Grid */}
        {hasVideos && (
          <>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              {displayedVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-primary/30 transition-all hover:shadow-xl">
                    {/* Video player - 16:9 aspect ratio */}
                    <div className="relative aspect-video bg-black">
                      <iframe
                        src={video.video_url}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      ></iframe>
                    </div>

                    {/* Video info */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-green-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                        {language === 'en' ? (video as any).title_en || video.title : video.title}
                      </h3>

                      {(language === 'en' ? (video as any).description_en || video.description : video.description) && (
                        <p className="text-green-800 text-sm leading-relaxed mb-3 line-clamp-2">
                          {language === 'en' ? (video as any).description_en || video.description : video.description}
                        </p>
                      )}

                      {video.course && (
                        <div className="flex items-center text-sm text-green-700">
                          <svg
                            className="w-4 h-4 mr-1.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                            />
                          </svg>
                          {video.course.name}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Daha Çox Button */}
            {hasMore && !showAll && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mt-12"
              >
                <button
                  onClick={() => setShowAll(true)}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <span>{t.videos.loadMore}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
