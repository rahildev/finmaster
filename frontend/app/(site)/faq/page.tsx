import { getLandingPageData } from '@/lib/api';
import FaqAccordion from '@/components/FaqAccordion';

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
        <div className="mb-10">
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#0A4D2C] uppercase mb-3">FAQ</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Tez-tez verilən suallar</h1>
        </div>
        <FaqAccordion faqs={faqs} />
      </div>
    </section>
  );
}
