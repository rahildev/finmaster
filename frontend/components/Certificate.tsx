'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

const AZ = {
  title: 'Sertifikasiya',
  p1: 'Finmaster Akademiyası tərəfindən təqdim olunan sertifikatlar, iştirakçıların proqramı hansı dərəcə ilə tamamladığını göstərən və təsdiq edən müddətli rəsmi təhsil sənədidir.',
  p2: 'Hər bir sertifikat xüsusi identifikasiya kodu və QR kod ilə qeydiyyata alınır. Həm mobil cihaz vasitəsilə QR kod skanı, həm də İD doğrulama sistemi vasitəsilə saytda yoxlanıla bilir. Bu yanaşma sertifikatın etibarlılığını və peşəkar dəyərini qorumağa xidmət edir.',
  p3: 'Finmaster Akademiyasının sertifikatı, tələbələrin karyera inkişafında, peşəkar imic formalaşdırmasında və iş mühitində fərqlənməsində önəmli üstünlük yaradır.',
};

const EN = {
  title: 'Certification',
  p1: 'Certificates issued by Finmaster Academy are official educational documents that indicate and confirm the level at which participants have completed the program.',
  p2: 'Each certificate is registered with a unique identification code and QR code. It can be verified on the website via QR code scan from a mobile device or through the ID verification system. This approach serves to protect the validity and professional value of the certificate.',
  p3: "Finmaster Academy's certificate creates a significant advantage for students in career development, building a professional image, and standing out in the workplace.",
};

export default function Certificate() {
  const { language } = useLanguage();
  const t = language === 'en' ? EN : AZ;

  return (
    <section className="py-16 bg-[#f6f6f5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="overflow-hidden">

          {/* Desktop şəkil — sağa float */}
          <div className="hidden lg:block float-right ml-10 mb-6 -mt-2 w-[54%] rounded-2xl overflow-hidden">
            <Image
              src="/cert-desktop-t.png"
              alt="Sertifikasiya"
              width={1200}
              height={800}
              className="w-full h-auto"
              unoptimized
            />
          </div>

          {/* Mobile şəkil — tam genişlik, mətnin üstündə */}
          <div className="lg:hidden mb-6 rounded-2xl overflow-hidden">
            <Image
              src="/cert-mobile-t.png"
              alt="Sertifikasiya"
              width={600}
              height={900}
              className="w-full h-auto"
              unoptimized
            />
          </div>

          {/* Mətn */}
          <div className="text-gray-600 leading-relaxed text-xl space-y-5 mt-10">
            <p>{t.p1}</p>
            <p>{t.p2}</p>
            <p>{t.p3}</p>
          </div>

          <div className="clear-both" />

        </div>
      </div>
    </section>
  );
}
