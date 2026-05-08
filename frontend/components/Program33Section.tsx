'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface Program33SectionProps {
  courseId: number;
  descriptionAz: string | null;
  descriptionEn: string | null;
}

export default function Program33Section({ courseId, descriptionAz, descriptionEn }: Program33SectionProps) {
  const { language } = useLanguage();

  const heading = language === 'en'
    ? 'A strong career begins with the right system.'
    : 'Güclü karyera, doğru sistemlə başlayır.';

  const body = language === 'en'
    ? (descriptionEn || descriptionAz || '')
    : (descriptionAz || '');

  return (
    <section className="py-16 bg-[#f6f6f5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Sol — mətn */}
          <div className="space-y-6">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
              {heading}
            </h2>
            {body && (
              <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                {body}
              </div>
            )}
          </div>

          {/* Sağ — şəkil + düymə */}
          <div className="flex flex-col gap-4 pt-44">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/programs-33.png"
                alt="33 Addımda Mühasibat uçotu"
                width={0}
                height={0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
                className="w-full h-auto"
              />
            </div>
            <div className="flex justify-end">
              <Link
                href={`/videos#course-${courseId}`}
                className="font-inter inline-flex items-center gap-1.5 text-sm border border-[#0A4D2C] text-[#0A4D2C] font-semibold px-4 py-2 rounded-lg hover:bg-[#0A4D2C] hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                {language === 'en' ? 'Go to videos' : 'Videolara keçid'}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
