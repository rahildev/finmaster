import { getLandingPageData } from '@/lib/api';
import AboutSection from '@/components/AboutSection';
import type { TeacherInfo } from '@/types/landing';

export const metadata = {
  title: 'Haqqımızda | FinMaster Academy',
};

export const revalidate = 60;

export default async function AboutPage() {
  let teacher: TeacherInfo | null = null;
  try {
    const data = await getLandingPageData();
    teacher = data.teacher?.[0] ?? null;
  } catch {}

  return (
    <div className="pt-16">
      <AboutSection teacher={teacher} />
    </div>
  );
}
