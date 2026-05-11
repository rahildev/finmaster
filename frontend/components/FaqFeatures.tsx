'use client';

import { useLanguage } from '@/contexts/LanguageContext';

/* ── İkonlar şəkildəki dizaynla tam eynidir ── */

// 1. Məzun papağı — PRAKTİK TƏHSİL
const IconGraduationCap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-11 h-11">
    <path d="M12 2L2 8l10 6 10-6-10-6z" />
    <path d="M2 8v6" />
    <path d="M6 11.5v5.5a6 6 0 0012 0v-5.5" />
  </svg>
);

// 2. Sertifikat + medal — ETİBARLI SERTİFİKAT
const IconCertificate = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-11 h-11">
    {/* Sənəd çərçivəsi */}
    <rect x="3" y="2" width="18" height="16" rx="2" />
    {/* Mətn xətləri */}
    <line x1="7" y1="7" x2="17" y2="7" />
    <line x1="7" y1="10" x2="17" y2="10" />
    <line x1="7" y1="13" x2="12" y2="13" />
    {/* Aşağıda medal/möhür */}
    <circle cx="12" cy="21" r="2.5" />
    <line x1="10.5" y1="23" x2="9.5" y2="25" />
    <line x1="13.5" y1="23" x2="14.5" y2="25" />
    <line x1="12" y1="18" x2="12" y2="18.5" />
  </svg>
);

// 3. Şəxs silüeti — MENTOR DƏSTƏYİ
const IconPerson = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-11 h-11">
    <circle cx="12" cy="7" r="4" />
    <path d="M4 21c0-4.418 3.582-8 8-8s8 3.582 8 8" />
  </svg>
);

// 4. Bar chart + yuxarı ox — KARYERA İNKİŞAFI
const IconCareerChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-11 h-11">
    {/* 3 bar */}
    <rect x="3" y="14" width="4" height="7" rx="1" />
    <rect x="10" y="9" width="4" height="12" rx="1" />
    <rect x="17" y="5" width="4" height="16" rx="1" />
    {/* Yuxarı gedən ox */}
    <path d="M5 8c2-3 5-4 8-4" />
    <path d="M13 3l3 1-1 3" />
  </svg>
);

const features = [
  {
    Icon: IconGraduationCap,
    az: { title: 'PRAKTİK TƏHSİL',      desc: 'Real sənədlər və nümunələrlə praktik yönümlü tədris.' },
    en: { title: 'PRACTICAL EDUCATION',  desc: 'Practical education with real documents and examples.' },
  },
  {
    Icon: IconCertificate,
    az: { title: 'ETİBARLI SERTİFİKAT', desc: 'ID ilə doğrulanabilan rəsmi Finmaster Academy sertifikatı.' },
    en: { title: 'TRUSTED CERTIFICATE',  desc: 'Official Finmaster Academy certificate verifiable by ID.' },
  },
  {
    Icon: IconPerson,
    az: { title: 'MENTOR DƏSTƏYİ',      desc: 'Təlim müddətində peşəkar mentor dəstəyi və yönləndirmə.' },
    en: { title: 'MENTOR SUPPORT',       desc: 'Professional mentor support and guidance during training.' },
  },
  {
    Icon: IconCareerChart,
    az: { title: 'KARYERA İNKİŞAFI',    desc: 'Biliklərinizi gücləndirin, karyeranızı bir addım irəli aparın.' },
    en: { title: 'CAREER DEVELOPMENT',   desc: 'Strengthen your knowledge, take your career one step forward.' },
  },
];

export default function FaqFeatures() {
  const { language } = useLanguage();

  return (
    <div className="mt-16 border-t border-gray-200 pt-10">
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-200">
        {features.map(({ Icon, az, en }, i) => {
          const t = language === 'en' ? en : az;
          return (
            <div key={i} className="flex flex-col items-center text-center px-4 py-2 gap-3">
              <span className="text-[#0A4D2C]">
                <Icon />
              </span>
              <p className="text-[10px] font-bold tracking-[0.18em] text-[#1D1D1F] uppercase leading-tight">
                {t.title}
              </p>
              <p className="text-[11px] text-gray-500 leading-relaxed">{t.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
