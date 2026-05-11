'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { getImageUrl } from '@/lib/api';
import type { HeroSection as HeroType, Contact } from '@/types/landing';

const FALLBACK_AZ =
`Mühasibat və maliyyə sahəsində peşəkar inkişafı hədəfləyənlər üçün yaradılmış premium təhsil platforması.

Finmaster Akademiyası, nəzəri bilik ilə real iş təcrübəsini bir araya gətirərək tələbələrə sistemli, müasir və praktik yönümlü öyrənmə mühiti təqdim etməkdədir :
— Müasir və premium təhsil sistemi ;
— Praktiki mühasibat təlimləri ;
— Real iş proseslərinə əsaslanan yanaşma ;
— Peşəkar inkişaf yönümlü proqramlar ;
— Sertifikatlaşdırma imkanları .

Düzgün təhsil yalnız bilik vermir, eyni zamanda insanın gələcəyini formalaşdırır. Finmaster Akademiyası da məhz bu məqsədlə yaradılmışdır.`;

const FALLBACK_EN =
`A premium education platform created for those aiming for professional growth in accounting and finance.

Finmaster Academy brings together theoretical knowledge and real-world work experience, providing students with a systematic, modern and practice-oriented learning environment :
— Modern and premium education system ;
— Practical accounting training ;
— Approach based on real work processes ;
— Career-oriented development programs ;
— Certification opportunities .

Quality education does not only provide knowledge — it shapes a person's future. Finmaster Academy was created for exactly this purpose.`;

const cleanLine = (l: string) => l.replace(/[­​‌‍⁠﻿]/g, '').trim();

interface HeroProps {
  data: HeroType[];
  contacts?: Contact[];
}

export default function Hero({ data, contacts = [] }: HeroProps) {
  const { language } = useLanguage();

  if (!data || data.length === 0) return null;

  const hero = data[0];

  const raw = language === 'en'
    ? ((hero as any).subtitle_en || hero.subtitle || FALLBACK_EN)
    : (hero.subtitle || FALLBACK_AZ);

  const allLines = raw.split('\n').map(cleanLine);
  const nonEmpty = allLines.filter(Boolean);
  const lastParagraph = nonEmpty[nonEmpty.length - 1] ?? '';
  const lastIdx = allLines.lastIndexOf(lastParagraph);
  const lines = allLines.slice(0, lastIdx);

  const desktopSrc = (hero.image_url ? getImageUrl(hero.image_url) : null) ?? '/hero-photo.png';
  const mobileSrc  = (hero.image_url_mobile ? getImageUrl(hero.image_url_mobile) : null) ?? '/hero-mobile.png';

  return (
    <section id="hero" className="bg-background pt-16">

      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 overflow-hidden">

          {/* Şəkil — sağa float */}
          <div
            className="float-right ml-10 mb-6 -mt-2"
            style={{ width: '52%' }}
          >
            <Image
              src={desktopSrc}
              alt=""
              width={900}
              height={700}
              priority
              unoptimized
              className="w-full h-auto"
              style={{
                maskImage: 'linear-gradient(to left, black 70%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to left, black 70%, transparent 100%)',
              }}
            />
          </div>

          {/* Mətn */}
          <div className="text-gray-600 leading-relaxed text-xl">
            {lines.map((line: string, i: number) => {
              if (line === '') return <div key={i} className="h-5" />;
              const isBullet = line.startsWith('—');
              return (
                <p key={i} className="mb-0.5" style={isBullet ? {} : { textIndent: '2em' }}>
                  {line}
                </p>
              );
            })}
          </div>

          <div className="clear-both" />

          {lastParagraph && (
            <p className="mt-1 text-gray-600 leading-relaxed text-xl">
              {lastParagraph}
            </p>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <Image
          src={mobileSrc}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          priority
          unoptimized
          className="w-full h-auto block"
        />
        <div className="px-6 py-10 text-gray-600 leading-relaxed text-lg">
          {lines.map((line, i) => {
            if (line === '') return <div key={i} className="h-3" />;
            const isBullet = line.startsWith('—');
            return (
              <p key={i} className="mb-0.5" style={isBullet ? {} : { textIndent: '2em' }}>
                {line}
              </p>
            );
          })}
        </div>
      </div>

    </section>
  );
}
