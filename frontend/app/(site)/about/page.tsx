import { getLandingPageData } from '@/lib/api';
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
      <Teacher data={data.teacher} contacts={data.contacts} />
    </div>
  );
}
