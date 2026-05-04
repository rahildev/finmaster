'use client';

import { motion } from 'framer-motion';
import type { Video } from '@/types/landing';

/**
 * Shorts Component - YouTube Shorts üçün xüsusi dizayn
 * Mobil formatda şaquli grid
 */

interface ShortsProps {
  data: Video[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8 },
};

export default function Shorts({ data }: ShortsProps) {
  if (!data || data.length === 0) return null;

  return (
    <section id="shorts" className="py-20 sm:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-dark mb-4">
            Shorts
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Qısa və faydalı videolar
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {data.map((short, index) => (
            <motion.div
              key={short.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-gray-900 shadow-lg hover:shadow-2xl transition-all">
                {/* Short iframe */}
                <iframe
                  src={short.video_url}
                  title={short.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />

                {/* Overlay info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-white font-semibold text-sm line-clamp-2">
                    {short.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
