import { getLandingPageData } from '@/lib/api';
import type { Faq } from '@/types/landing';
import FaqAccordion from '@/components/FaqAccordion';
import FaqPageHeader from '@/components/FaqPageHeader';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function FaqPage() {
  let faqs: Faq[] = [];
  try {
    const data = await getLandingPageData();
    if (data.section_visibility?.faq === false) return notFound();
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
