import { getLandingPageData } from '@/lib/api';
import Hero from '@/components/Hero';

export const revalidate = 60;

export default async function Home() {
  let data;
  try {
    data = await getLandingPageData();
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="text-center max-w-md">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Xəta baş verdi</h1>
          <p className="text-gray-500 text-sm">Backend API-yə qoşulmaq mümkün olmadı.</p>
        </div>
      </div>
    );
  }

  const sectionVisibility = data.section_visibility || {};

  return sectionVisibility.hero !== false
    ? <Hero data={data.hero} contacts={data.contacts} />
    : null;
}
