'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Faq } from '@/types/landing';

/**
 * FAQ Section - Apple support stili
 * Accordion animasiyaları ilə
 */

interface FAQProps {
  data: Faq[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
};

export default function FAQ({ data }: FAQProps) {
  const [openId, setOpenId] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 sm:py-32 bg-white">
      <div className="max-w-[900px] mx-auto px-6 sm:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-dark mb-4">
            Tez-tez Verilən Suallar
          </h2>
          <p className="text-xl text-gray-600">
            Ağlınıza gələn sualların cavabları
          </p>
        </motion.div>

        <div className="space-y-4">
          {data.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="border border-gray-200 rounded-2xl overflow-hidden hover:border-primary/30 transition-colors"
            >
              {/* Sual - Click edilə bilən */}
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                aria-expanded={openId === faq.id}
              >
                <span className="text-lg font-semibold text-gray-dark pr-8">
                  {faq.question}
                </span>
                <motion.svg
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6 text-primary flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </button>

              {/* Cavab - Animasiyalı açılır */}
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
