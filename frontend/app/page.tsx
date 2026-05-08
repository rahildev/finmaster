import { getLandingPageData } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export const revalidate = 60;

export default async function Home() {
  let data;

  try {
    data = await getLandingPageData();
  } catch (error) {
    console.error('Landing page data yüklənə bilmədi:', error);
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

  return (
    <div className="min-h-screen">
      <Navbar
        sectionVisibility={sectionVisibility}
        courses={data.courses}
        contacts={data.contacts}
      />
      <main>
        {sectionVisibility.hero !== false && (
          <Hero data={data.hero} contacts={data.contacts} />
        )}
      </main>
      <Footer contacts={data.contacts} />
    </div>
  );
}
