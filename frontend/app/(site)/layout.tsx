import { getLandingPageData } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  let data;
  try {
    data = await getLandingPageData();
  } catch {
    data = { courses: [], contacts: [], section_visibility: {}, hero: [], teacher: [], videos: [], faqs: [], settings: {} };
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        courses={data.courses}
        contacts={data.contacts}
        sectionVisibility={data.section_visibility || {}}
      />
      <main className="flex-1">{children}</main>
      <Footer contacts={data.contacts} />
    </div>
  );
}
