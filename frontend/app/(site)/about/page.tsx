import { getLandingPageData } from '@/lib/api';
import AboutSection from '@/components/AboutSection';
import type { TeacherInfo } from '@/types/landing';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Haqqımızda | FinMaster Academy',
};

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  let teacher: TeacherInfo | null = null;
  try {
    const data = await getLandingPageData();
    if (data.section_visibility?.teacher === false) return notFound();
    teacher = data.teacher?.[0] ?? null;
  } catch {}

  return (
    <div className="pt-16">
      <AboutSection teacher={teacher} />
    </div>
  );
}
