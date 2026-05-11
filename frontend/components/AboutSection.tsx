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
          <div className="hidden lg:block float-left mr-10 mb-6 -mt-2 w-[46%] rounded-2xl overflow-hidden">
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

        {/* Mobile: şəkil üstdə */}
        <div className="lg:hidden mb-6">
          <Image
            src="/qurucu-mobile-t.webp"
            alt="Qurucu"
            width={480}
            height={640}
            className="w-full h-auto"
            unoptimized
          />
        </div>

        {/* Desktop: float layout */}
        <div className="hidden lg:block" style={{ overflow: 'hidden' }}>
          <img
            src="/qurucu-desktop-t.webp"
            alt="Qurucu"
            style={{ float: 'right', marginLeft: '2.5rem', marginBottom: '1rem', width: '50%' }}
          />
          {(language === 'en'
            ? ((teacher as any)?.experience_en || (teacher as any)?.experience || '')
            : ((teacher as any)?.experience || '')
          ).split('\n').filter((l: string) => l.trim() !== '').map((line: string, i: number) => (
            <p key={i} style={{ marginBottom: '1rem', fontSize: '1.125rem', lineHeight: '1.75', color: '#4b5563', fontStyle: line.trim().startsWith('"') ? 'italic' : 'normal' }}>{line}</p>
          ))}
          <p style={{ fontSize: '1.2rem', lineHeight: '1.75', color: '#374151', fontStyle: 'italic', marginBottom: '2rem' }}>
            {language === 'en'
              ? 'Drawing on years of practical experience in finance and accounting, I founded Finmaster Academy with the goal of making learning simpler, more systematic, and more effective.'
              : 'Maliyyə və mühasibat sahəsində uzun illərin praktik təcrübəsinə əsaslanaraq, öyrənməyi daha sadə, daha sistemli və daha effektiv etmək məqsədilə Finmaster Academy-ni yaratdım.'}
          </p>
          <img src="/signature-transparent.png" alt="İmza" style={{ width: '160px', height: 'auto', marginBottom: '0.75rem' }} />
          <p style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.15em', color: '#1D1D1F', textTransform: 'uppercase' }}>
            {language === 'en' ? 'Toghrul Allahverdiyev' : 'Toğrul Allahverdiyev'}
          </p>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', color: '#6b7280', textTransform: 'uppercase', marginTop: '0.125rem', marginBottom: '0.75rem' }}>
            Founder &amp; Director
          </p>
          <div style={{ width: '1.5rem', height: '1px', background: '#9ca3af' }} />
          <div style={{ clear: 'both' }} />
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden">
          {(language === 'en'
            ? ((teacher as any)?.experience_en || (teacher as any)?.experience || '')
            : ((teacher as any)?.experience || '')
          ).split('\n').filter((l: string) => l.trim() !== '').map((line: string, i: number) => (
            <p key={i} className={`mb-4 text-lg leading-relaxed text-gray-600 ${line.trim().startsWith('"') ? 'italic' : ''}`}>{line}</p>
          ))}
          <p className="text-xl text-gray-700 leading-relaxed italic mb-8">
            {language === 'en'
              ? 'Drawing on years of practical experience in finance and accounting, I founded Finmaster Academy with the goal of making learning simpler, more systematic, and more effective.'
              : 'Maliyyə və mühasibat sahəsində uzun illərin praktik təcrübəsinə əsaslanaraq, öyrənməyi daha sadə, daha sistemli və daha effektiv etmək məqsədilə Finmaster Academy-ni yaratdım.'}
          </p>
          <Image src="/signature-transparent.png" alt="İmza" width={180} height={90} className="w-40 h-auto mb-3" />
          <p className="text-sm font-bold tracking-[0.15em] text-[#1D1D1F] uppercase">
            {language === 'en' ? 'Toghrul Allahverdiyev' : 'Toğrul Allahverdiyev'}
          </p>
          <p className="text-xs tracking-[0.12em] text-gray-500 uppercase mt-0.5 mb-3">Founder &amp; Director</p>
          <div className="w-6 h-px bg-gray-400" />
        </div>
      </div>
    </section>
  );
}
