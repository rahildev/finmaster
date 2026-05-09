'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface Program33SectionProps {
  courseId: number;
  headingAz: string | null;
  headingEn: string | null;
  descriptionAz: string | null;
  descriptionEn: string | null;
}

export default function Program33Section({ courseId, headingAz, headingEn, descriptionAz, descriptionEn }: Program33SectionProps) {
  const { language } = useLanguage();

  const heading = language === 'en'
    ? (headingEn || headingAz || 'A strong career begins with the right system.')
    : (headingAz || 'Güclü karyera, doğru sistemlə başlayır.');

  const body = language === 'en'
    ? (descriptionEn || descriptionAz || '')
    : (descriptionAz || '');

  const lines = body.split('\n').map(l => l.trim());
  const nonEmptyLines = lines.filter(Boolean);
  const lastParagraph = nonEmptyLines[nonEmptyLines.length - 1] || '';
  // All lines except the last non-empty one
  const lastIndex = lines.lastIndexOf(lastParagraph);
  const mainLines = lines.slice(0, lastIndex);

  const renderBold = (text: string) =>
    text.split(/([“"][^“”"]*[”"])/g).map((part, i) =>
      /^[“"].*[”"]$/.test(part)
        ? <strong key={i} className="font-semibold text-gray-800">{part}</strong>
        : part
    );

  return (
    <section className="py-16 bg-[#f6f6f5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Başlıq — tam genişlik */}
        <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug mb-10">
          {heading}
        </h2>

        {/* Float layout: şəkil sağa float olur, mətn yanından axır */}
        <div className="overflow-hidden">

          {/* Şəkil — sağa float */}
          <div className="float-right ml-10 mb-6 mt-4 w-full lg:w-[52%] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/programs-33.png"
              alt="33 Addımda Mühasibat uçotu"
              width={0}
              height={0}
              sizes="(max-width: 1024px) 100vw, 52vw"
              unoptimized
              className="w-full h-auto"
            />
          </div>

          {/* Əsas mətn — float şəkilin yanından axır */}
          <div className="text-gray-600 leading-relaxed text-xl">
            {mainLines.map((line, i) =>
              line === ''
                ? <div key={i} className="h-6" />
                : <p key={i} className="mb-1">{renderBold(line)}</p>
            )}
          </div>

          <div className="clear-both" />

          {/* Son paraqraf — şəkilin altında, tam genişlikdə */}
          {lastParagraph && (
            <p className="mt-1 text-gray-600 leading-relaxed text-xl">{renderBold(lastParagraph)}</p>
          )}

          {/* Düymə — sağa */}
          <div className="flex justify-end mt-6">
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
    </section>
  );
}
