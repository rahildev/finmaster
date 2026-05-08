import { getLandingPageData } from '@/lib/api';
import FaqAccordion from '@/components/FaqAccordion';
import FaqPageHeader from '@/components/FaqPageHeader';

export const revalidate = 60;

export default async function FaqPage() {
  let faqs = [];
  try {
    const data = await getLandingPageData();
    faqs = data.faqs || [];
  } catch {}

  return (
    <section className="pt-28 pb-20 bg-background min-h-screen">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <FaqPageHeader />
        <FaqAccordion faqs={faqs} />
      </div>
    </section>
  );
}
