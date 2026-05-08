'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface PageContent {
  heading?: string;
  intro?: string;
  about?: string;
  list_heading?: string;
  bullets?: string[];
  outro?: string;
}

interface Program33SectionProps {
  courseId: number;
  contentAz: PageContent | null;
  contentEn: PageContent | null;
}

const defaultAz: PageContent = {
  heading: 'Güclü karyera, doğru sistemlə başlayır.',
  intro: '"33 addımda mühasibat uçotu" ilə peşəkar inkişaf yolunuza bu gün başlaya bilmək imkanınız vardır.',
  about: 'Finmaster Academiyasının akademik və sistemli tədris yanaşması ilə hazırlamış olduğu bu proqram, karyerasında güclü təməl qurmaq və peşəkar səviyyəyə yüksəlmək istəyənlər üçün nəzərdə tutulmuşdur.',
  list_heading: '"33 Addımda Mühasibat uçotu" proqramı müddətində siz :',
  bullets: [
    'Mühasibatın uçotunun əsas strukturunu öyrənəcək ,',
    'Maliyyə hesabatlarını analiz etmə bacarığınızı inkişaf etdirəcək ,',
    'Real tətbiqlər üzərindən praktiki təcrübə qazanacaq ,',
    'Müasir maliyyə sistemlərinə dair peşəkar baxış əldə edəcəksiniz.',
  ],
  outro: '33 (otuz üç) dərs günündən, yəni 66 (altmış altı) saatdan ibarət proqram müddətində tələbələr məxsusi olaraq hazırlanmış dərs materialları və mənimsəmə dərəcəsini yüksəltmək məqsədilə seçilmiş yoxlama suallar ilə (düzgün cavablar daxil olmaqla) təmin olunmaqdadır.',
};

const defaultEn: PageContent = {
  heading: 'A strong career begins with the right system.',
  intro: 'With "Accounting in 33 Steps", you can start your professional development journey today.',
  about: 'This program, developed with the academic and systematic teaching approach of Finmaster Academy, is designed for those who want to build a strong foundation in their career and advance to a professional level.',
  list_heading: 'During the "Accounting in 33 Steps" program, you will:',
  bullets: [
    'Learn the fundamental structure of accounting,',
    'Develop your skills in analyzing financial statements,',
    'Gain practical experience through real-world applications,',
    'Obtain a professional perspective on modern financial systems.',
  ],
  outro: 'Throughout the program consisting of 33 (thirty-three) lesson days, i.e. 66 (sixty-six) hours, students are provided with specially prepared lesson materials and selected review questions (including correct answers) to enhance their level of comprehension.',
};

export default function Program33Section({ courseId, contentAz, contentEn }: Program33SectionProps) {
  const { language } = useLanguage();

  const az = contentAz && Object.keys(contentAz).length > 0 ? contentAz : defaultAz;
  const en = contentEn && Object.keys(contentEn).length > 0 ? contentEn : defaultEn;
  const c = language === 'en' ? en : az;

  return (
    <section className="py-16 bg-[#f6f6f5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Sol — mətn */}
          <div className="space-y-6">
            {c.heading && (
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
                {c.heading}
              </h2>
            )}
            {c.intro && (
              <p className="text-gray-600 leading-relaxed">{c.intro}</p>
            )}
            {c.about && (
              <p className="text-gray-600 leading-relaxed">{c.about}</p>
            )}

            {c.bullets && c.bullets.length > 0 && (
              <div>
                {c.list_heading && (
                  <p className="font-semibold text-gray-800 mb-3">{c.list_heading}</p>
                )}
                <ul className="space-y-2">
                  {c.bullets.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0A4D2C] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {c.outro && (
              <p className="text-gray-600 leading-relaxed">{c.outro}</p>
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
