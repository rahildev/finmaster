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
  const mainBody = lines.slice(0, lines.map(l => l).lastIndexOf(nonEmptyLines[nonEmptyLines.length - 1]));
  const lastParagraph = nonEmptyLines[nonEmptyLines.length - 1] || '';

  const renderBold = (text: string) =>
    text.split(/("(?:[^"]*)")/g).map((part, i) =>
      /^".*"$/.test(part)
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

        {/* İki sütun: mətn sol, şəkil sağ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_52%] gap-12">

          {/* Sol — əsas mətn (həmişə render olunur) */}
          <div className="text-gray-600 leading-relaxed text-lg">
            {mainBody.map((line, i) =>
              line === ''
                ? <div key={i} className="h-6" />
                : <p key={i} className="mb-1">{renderBold(line)}</p>
            )}
          </div>

          {/* Sağ — şəkil + son paraqraf + düymə */}
          <div className="flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
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
            {lastParagraph && (
              <div className="text-gray-600 leading-relaxed text-lg">
                {renderBold(lastParagraph)}
              </div>
            )}
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
