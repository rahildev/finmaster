import { getLandingPageData } from '@/lib/api';
import Features from '@/components/Features';
import Teacher from '@/components/Teacher';

export const revalidate = 60;

export default async function AboutPage() {
  let data;
  try {
    data = await getLandingPageData();
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Məlumat yüklənə bilmədi.</p>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <Features />
      <Teacher data={data.teacher} contacts={data.contacts} />
    </div>
  );
}
