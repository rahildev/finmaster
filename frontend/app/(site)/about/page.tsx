import { getLandingPageData } from '@/lib/api';
import AboutSection from '@/components/AboutSection';

export const metadata = {
  title: 'Haqqımızda | FinMaster Academy',
};

export const revalidate = 60;

export default async function AboutPage() {
  let settings = {};
  try {
    const data = await getLandingPageData();
    settings = data.settings ?? {};
  } catch {}

  return (
    <div className="pt-16">
      <AboutSection settings={settings} />
    </div>
  );
}
