'use client';

import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  name: string;
  nameEn: string | null;
}

export default function CourseSectionHeading({ name, nameEn }: Props) {
  const { language } = useLanguage();
  const title = language === 'en' && nameEn ? nameEn : name;

  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
      <div className="mt-2 mx-auto w-10 h-px bg-[#0A4D2C]" />
    </div>
  );
}
