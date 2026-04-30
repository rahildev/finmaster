import { getLandingPageData } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Teacher from '@/components/Teacher';
import Courses from '@/components/Courses';
import Videos from '@/components/Videos';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

/**
 * Finmaster Academy - Landing Page
 * Backend API-dən data çəkir və komponentləri render edir
 */

export default async function Home() {
  let data;

  try {
    // Backend API-dən bütün landing page datasını çək
    data = await getLandingPageData();
  } catch (error) {
    console.error('Landing page data yüklənə bilmədi:', error);

    // Əgər backend işləmirsə, xəta mesajı göstər
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-light px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-dark mb-2">
            Xəta baş verdi
          </h1>
          <p className="text-gray-600 mb-4">
            Backend API-yə qoşulmaq mümkün olmadı. Zəhmət olmasa Laravel server-in işlədiyindən əmin olun.
          </p>
          <code className="text-sm bg-gray-200 px-3 py-1 rounded text-gray-700">
            php artisan serve
          </code>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Landing Page Sections */}
      <main>
        <Hero data={data.hero} />
        <Teacher data={data.teacher} />
        <Courses data={data.courses} />
        <Videos data={data.videos} />
        <FAQ data={data.faqs} />
        <Contact data={data.contacts} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
