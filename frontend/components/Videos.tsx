'use client';

import { motion } from 'framer-motion';
import type { Video } from '@/types/landing';

/**
 * Videos Section - YouTube embed grid
 * Apple stil, responsive video player
 */

interface VideosProps {
  data: Video[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
};

export default function Videos({ data }: VideosProps) {
  if (!data || data.length === 0) return null;

  return (
    <section id="videos" className="py-20 sm:py-32 bg-gray-light">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-dark mb-4">
            Təlimat Videoları
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mühasibatlıq mövzularında pulsuz təlim materialları
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {data.map((video, index) => (
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
                  <h3 className="text-xl font-bold text-gray-dark mb-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>

                  {video.description && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                      {video.description}
                    </p>
                  )}

                  {video.course && (
                    <div className="flex items-center text-sm text-primary">
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
      </div>
    </section>
  );
}
