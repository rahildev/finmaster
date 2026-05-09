import { getLandingPageData } from '@/lib/api';
import dynamic from 'next/dynamic';

const Features = dynamic(() => import('@/components/Features'), {
  loading: () => <div className="py-20 bg-background animate-pulse" />,
});

const Teacher = dynamic(() => import('@/components/Teacher'), {
  loading: () => <div className="min-h-[400px] bg-gray-100 animate-pulse" />,
});

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
