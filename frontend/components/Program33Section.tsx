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

  // Görünməz simvolları silib sətri təmizlə
  const cleanLine = (l: string) => l.replace(/[­​‌‍⁠﻿]/g, '').trim();
  const lines = body.split('\n').map(cleanLine);
  const nonEmptyLines = lines.filter(Boolean);
  const lastParagraph = nonEmptyLines[nonEmptyLines.length - 1] || '';
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

        {/* Float layout: şəkil sağa float olur, mətn yanından axır */}
        <div className="overflow-hidden">

          {/* Şəkil — sağa float */}
          <div className="float-right ml-10 mb-6 -mt-2 w-full lg:w-[48%] rounded-2xl overflow-hidden">
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
            {mainLines.map((line, i) => {
              if (line === '') return <div key={i} className="h-5" />;
              const isBullet = line.startsWith('•');
              return (
                <p key={i} className="mb-0.5" style={isBullet ? {} : { textIndent: '2em' }}>
                  {renderBold(line)}
                </p>
              );
            })}
          </div>

          <div className="clear-both" />

          {/* Son paraqraf — şəkilin altında, tam genişlikdə */}
          {lastParagraph && (
            <p className="mt-1 text-gray-600 leading-relaxed text-xl" style={{ textIndent: '2em' }}>{renderBold(lastParagraph)}</p>
          )}


        </div>
      </div>
    </section>
  );
}
