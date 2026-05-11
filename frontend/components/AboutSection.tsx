'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { getImageUrl } from '@/lib/api';
import type { TeacherInfo } from '@/types/landing';

// Fallback mətnlər — admin paneldə setting yoxdursa göstərilir
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

function parseContent(raw: string) {
  const lines = raw.split('\n').map(cleanLine);
  const nonEmpty = lines.filter(Boolean);
  const lastParagraph = nonEmpty[nonEmpty.length - 1] ?? '';
  const lastIndex = lines.lastIndexOf(lastParagraph);
  return { mainLines: lines.slice(0, lastIndex), lastParagraph };
}

interface Props {
  teacher?: TeacherInfo | null;
}

export default function AboutSection({ teacher }: Props) {
  const { language } = useLanguage();

  const raw = language === 'en'
    ? ((teacher as any)?.bio_en || teacher?.bio || FALLBACK_EN)
    : (teacher?.bio || FALLBACK_AZ);

  const { mainLines, lastParagraph } = parseContent(raw);

  const desktopSrc = (teacher?.photo_url ? getImageUrl(teacher.photo_url) : null) ?? '/akademiya-desktop.png';
  const mobileSrc = ((teacher as any)?.photo_url_mobile ? getImageUrl((teacher as any).photo_url_mobile) : null) ?? '/akademiya-mobile.png';

  return (
    <section className="py-16 bg-[#f6f6f5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="overflow-hidden">

          {/* Desktop şəkil — sola float */}
          <div className="hidden lg:block float-left mr-10 mb-6 -mt-2 w-[38%] rounded-2xl overflow-hidden">
            <Image
              src={desktopSrc}
              alt="Finmaster Akademiyası"
              width={1536}
              height={1024}
              className="w-full h-auto"
              unoptimized
            />
          </div>

          {/* Mobile şəkil — tam genişlik, mətnin üstündə */}
          <div className="lg:hidden mb-6 rounded-2xl overflow-hidden">
            <Image
              src={mobileSrc}
              alt="Finmaster Akademiyası"
              width={941}
              height={1672}
              className="w-full h-auto"
              unoptimized
            />
          </div>

          {/* Əsas mətn */}
          <div className="text-gray-600 leading-relaxed text-xl">
            {mainLines.map((line, i) => {
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

          {/* Son cümlə — şəkilin altından, tam genişlikdə, abzassız */}
          {lastParagraph && (
            <p className="mt-1 text-gray-600 leading-relaxed text-xl">
              {lastParagraph}
            </p>
          )}

        </div>
      </div>

      {/* Qurucu bölməsi */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-6 pb-10">
        <div className="lg:grid lg:grid-cols-[45fr_55fr] lg:gap-12 items-start">

          {/* Sol: mətn */}
          <div>

            {(() => {
              const expRaw = language === 'en'
                ? ((teacher as any)?.experience_en || (teacher as any)?.experience || '')
                : ((teacher as any)?.experience || '');
              if (!expRaw) return null;
              return (
                <div className="text-gray-600 text-lg leading-relaxed mb-6 space-y-4">
                  {expRaw.split('\n').map((line: string, i: number) =>
                    line.trim() === ''
                      ? null
                      : <p key={i} className={line.trim().startsWith('"') ? 'italic' : ''}>{line}</p>
                  )}
                </div>
              );
            })()}

            <p className="text-[1.2rem] sm:text-xl text-gray-700 leading-relaxed italic mb-8">
              {language === 'en'
                ? 'Drawing on years of practical experience in finance and accounting, I founded Finmaster Academy with the goal of making learning simpler, more systematic, and more effective.'
                : 'Maliyyə və mühasibat sahəsində uzun illərin praktik təcrübəsinə əsaslanaraq, öyrənməyi daha sadə, daha sistemli və daha effektiv etmək məqsədilə Finmaster Academy-ni yaratdım.'}
            </p>

            <Image
              src="/signature-transparent.png"
              alt="İmza"
              width={180}
              height={90}
              className="w-40 h-auto mb-3"
            />

            <p className="text-sm font-bold tracking-[0.15em] text-[#1D1D1F] uppercase">
              {language === 'en' ? 'Toghrul Allahverdiyev' : 'Toğrul Allahverdiyev'}
            </p>
            <p className="text-xs tracking-[0.12em] text-gray-500 uppercase mt-0.5 mb-3">
              Founder &amp; Director
            </p>
            <div className="w-6 h-px bg-gray-400" />
          </div>

          {/* Sağ: qurucu şəkli */}
          <div className="hidden lg:block">
            <Image
              src="/qurucu-desktop-t.webp"
              alt="Qurucu"
              width={700}
              height={560}
              className="w-full h-auto"
              unoptimized
            />
          </div>

          {/* Mobile: şəkil altda */}
          <div className="lg:hidden mt-6">
            <Image
              src="/qurucu-mobile-t.webp"
              alt="Qurucu"
              width={480}
              height={640}
              className="w-full h-auto"
              unoptimized
            />
          </div>

        </div>
      </div>
    </section>
  );
}
