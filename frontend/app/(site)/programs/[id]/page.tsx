import { getLandingPageData } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function ProgramPage({ params }: { params: { id: string } }) {
  let course;
  let whatsapp;

  try {
    const data = await getLandingPageData();
    course = data.courses.find(c => c.id === Number(params.id));
    whatsapp = data.contacts.find((c: any) => c.type === 'whatsapp');
  } catch {}

  if (!course) return notFound();

  const whatsappHref = whatsapp
    ? `https://wa.me/${whatsapp.value.replace(/\D/g, '')}`
    : '#footer';

  return (
    <section className="pt-28 pb-20 bg-background min-h-screen">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">

        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-8">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Ana Səhifə
        </Link>

        {course.image_url && (
          <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-8">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || ''}${course.image_url}`}
              alt={course.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        <p className="text-[11px] font-bold tracking-[0.2em] text-[#0A4D2C] uppercase mb-3">Proqram</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{course.name}</h1>

        <div className="flex flex-wrap gap-4 mb-8">
          {course.duration && (
            <div className="bg-gray-100 rounded-lg px-4 py-3">
              <p className="text-xs text-gray-400 mb-0.5">Müddət</p>
              <p className="text-sm font-semibold text-gray-800">{course.duration}</p>
            </div>
          )}
          {parseFloat(course.price) > 0 && (
            <div className="bg-gray-100 rounded-lg px-4 py-3">
              <p className="text-xs text-gray-400 mb-0.5">Qiymət</p>
              <p className="text-sm font-semibold text-[#0A4D2C]">{parseFloat(course.price).toFixed(0)} ₼</p>
            </div>
          )}
        </div>

        {course.description && (
          <p className="text-gray-600 leading-relaxed mb-10">{course.description}</p>
        )}

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#0A4D2C] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#0c5e35] transition-colors"
        >
          WhatsApp ilə müraciət et
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>

      </div>
    </section>
  );
}
