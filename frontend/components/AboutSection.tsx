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

const FOUNDER_FALLBACK_AZ =
`Finmaster Akademiyasının təsisçisindən, bu təhsil platformasını, mühasibat uçotu və maliyyə sistemlərindəki təcrübəmi daha sistemli, başa düşülən və peşəkar təlim strukturuna çevirmək məqsədi ilə yaratdım.

Çoxillik mühasibat təcrübəm boyunca, hesab edirdim ki, mühasibat uçotunu yalnız nəzəri biliklərlə deyil, eyni zamanda nizam-intizamlı yanaşma, düzgün sistem və praktik tətbiqlər vasitəsilə daha uzunmüddətli və yadda qalan tərzdə öyrənmək və öyrətmək olar.

Bu anlayışa uyğun olaraq qurmuş olduğum Finmaster Akademiyası, tələbələrinə müasir iş dünyasının gözləntilərinə cavab verən sadə, lakin güclü öyrənmə təcrübəsi təqdim etməyi qarşısına məqsəd qoymuşdur.

Proqramlar və məzmunlar təkcə bilik vermək üçün deyil, həm də tələbələrin analitik təfəkkürünü, maliyyə şərhini və peşəkar inkişaf bacarıqlarını gücləndirmək üçün nəzərdə tutulmaqdadır.

"Uğur təsadüfi deyildir — Düzgün qurulmuş disiplinli sistemin və fədakar xarakterin nəticəsidir."

— Toğrul Allahverdiyev | Təsisçi, Finmaster Akademiyası`;

function parseFounderContent(raw: string) {
  const lines = raw.split('\n').map(cleanLine).filter(Boolean);
  const QUOTE_CODES = new Set([0x0022, 0x0027, 0x201C, 0x201D, 0x2018, 0x2019]);
  const quote = lines.find(l => l.length > 0 && QUOTE_CODES.has(l.charCodeAt(0))) ?? null;
  const signature = lines.find(l => l.startsWith('—') && l.includes('|')) ?? null;
  const mainParas = lines.filter(l => l !== quote && l !== signature);
  return { mainParas, quote, signature };
}

interface Props {
  teacher?: TeacherInfo | null;
}

export default function AboutSection({ teacher }: Props) {
  const { language } = useLanguage();

  const founderRaw = language === 'en'
    ? ((teacher as any)?.experience_en || teacher?.experience || FOUNDER_FALLBACK_AZ)
    : (teacher?.experience || FOUNDER_FALLBACK_AZ);
  const { mainParas, quote, signature } = parseFounderContent(founderRaw);

  const raw = language === 'en'
    ? ((teacher as any)?.bio_en || teacher?.bio || FALLBACK_EN)
    : (teacher?.bio || FALLBACK_AZ);

  const { mainLines, lastParagraph } = parseContent(raw);

  const desktopSrc = (teacher?.photo_url ? getImageUrl(teacher.photo_url) : null) ?? '/akademiya-desktop.png';
  const mobileSrc = ((teacher as any)?.photo_url_mobile ? getImageUrl((teacher as any).photo_url_mobile) : null) ?? '/akademiya-mobile.png';

  return (
    <section className="py-16 bg-[#f6f6f5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="lg:overflow-hidden">

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

          {/* Başlıq — sağ tərəf mətninin üstündə, mərkəzdə */}
          <p className="text-center text-[15px] font-bold tracking-[0.2em] text-[#0A4D2C] uppercase mb-5">
            {language === 'en' ? '— About FinMaster Academy —' : '— FinMaster Akademiyası haqqında —'}
          </p>

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

            {lastParagraph && (
              <p className="mt-1" style={{ textIndent: '2em' }}>{lastParagraph}</p>
            )}
          </div>

          <div className="clear-both" />

        </div>
      </div>

      {/* İkinci bölmə — mətn sol, şəkil sağ */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-10 pb-10">
        <div className="overflow-hidden">

          {/* Desktop: şəkil sağa float */}
          <div className="hidden lg:block float-right ml-10 mb-6 -mt-2 w-[46%] rounded-2xl overflow-hidden bg-[#f6f6f5]">
            <Image
              src="/qurucu-desktop-t.webp"
              alt="Qurucu"
              width={700}
              height={560}
              className="w-full h-auto"
              unoptimized
            />
          </div>

          {/* Mobile: şəkil üstdə */}
          <div className="lg:hidden mb-6 rounded-2xl overflow-hidden bg-[#f6f6f5]">
            <Image
              src="/qurucu-mobile-t.webp"
              alt="Qurucu"
              width={480}
              height={640}
              className="w-full h-auto"
              unoptimized
            />
          </div>

          {/* Sol: mətn */}
          <p className="text-center text-[15px] font-bold tracking-[0.2em] text-[#0A4D2C] uppercase mb-5">
            {language === 'en' ? '— About the Founder of FinMaster Academy —' : '— FinMaster Akademiyasının Təsisçisi —'}
          </p>
          <div className="text-gray-600 leading-relaxed text-xl">
            {mainParas.slice(0, -1).map((para, i) => (
              <p key={i} className={i < mainParas.length - 2 ? 'mb-4' : ''} style={{ textIndent: '2em' }}>
                {para}
              </p>
            ))}
          </div>

          <div className="clear-both" />

          {/* Şəkilin altına uzanan hissə */}
          {mainParas.length > 0 && (
            <div className="text-gray-600 leading-relaxed text-xl mt-4">
              <p style={{ textIndent: '2em' }}>{mainParas[mainParas.length - 1]}</p>
            </div>
          )}

          {(quote || signature) && (
            <div className="mt-2 text-gray-600 leading-relaxed">
              {quote && (
                <p className="italic text-[#0A4D2C] mb-1 text-xl" style={{ textIndent: '2em' }}>
                  {quote}
                </p>
              )}
              {signature && (
                <p className="text-xl font-semibold text-gray-500 tracking-wide mt-4">
                  {signature}
                </p>
              )}
              <Image
                src="/signature-transparent.png"
                alt="İmza"
                width={220}
                height={110}
                className="w-44 h-auto mt-2 ml-28"
              />
            </div>
          )}
        </div>
      </div>

    </section>
  );
}
