'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

const LINES_AZ = [
  'Mühasibat və maliyyə sahəsində peşəkar inkişafı hədəfləyənlər üçün yaradılmış premium təhsil platforması.',
  '',
  'Finmaster Akademiyası, nəzəri bilik ilə real iş təcrübəsini bir araya gətirərək tələbələrə sistemli, müasir və praktik yönümlü öyrənmə mühiti təqdim etməkdədir :',
  '— Müasir və premium təhsil sistemi ;',
  '— Praktiki mühasibat təlimləri ;',
  '— Real iş proseslərinə əsaslanan yanaşma ;',
  '— Peşəkar inkişaf yönümlü proqramlar ;',
  '— Sertifikatlaşdırma imkanları .',
];

const LAST_AZ = 'Düzgün təhsil yalnız bilik vermir, eyni zamanda insanın gələcəyini formalaşdırır. Finmaster Akademiyası da məhz bu məqsədlə yaradılmışdır.';

const LINES_EN = [
  'A premium education platform created for those aiming for professional growth in accounting and finance.',
  '',
  'Finmaster Academy brings together theoretical knowledge and real-world work experience, providing students with a systematic, modern and practice-oriented learning environment :',
  '— Modern and premium education system ;',
  '— Practical accounting training ;',
  '— Approach based on real work processes ;',
  '— Career-oriented development programs ;',
  '— Certification opportunities .',
];

const LAST_EN = "Quality education does not only provide knowledge — it shapes a person's future. Finmaster Academy was created for exactly this purpose.";

export default function AboutSection() {
  const { language } = useLanguage();
  const lines = language === 'en' ? LINES_EN : LINES_AZ;
  const last  = language === 'en' ? LAST_EN  : LAST_AZ;

  return (
    <section className="py-16 bg-[#f6f6f5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="overflow-hidden">

          {/* Desktop şəkil — sola float */}
          <div className="hidden lg:block float-left mr-10 mb-6 -mt-2 w-[46%] rounded-2xl overflow-hidden">
            <Image
              src="/akademiya-desktop.png"
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
              src="/akademiya-mobile.png"
              alt="Finmaster Akademiyası"
              width={941}
              height={1672}
              className="w-full h-auto"
              unoptimized
            />
          </div>

          {/* Mətn — şəkilin sağından axır */}
          <div className="text-gray-600 leading-relaxed text-xl">
            {lines.map((line, i) => {
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

          {/* Son cümlə — tam genişlikdə */}
          <p className="mt-1 text-gray-600 leading-relaxed text-xl" style={{ textIndent: '2em' }}>
            {last}
          </p>

        </div>
      </div>
    </section>
  );
}
