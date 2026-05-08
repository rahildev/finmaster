import { getLandingPageData } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import SystemSteps from '@/components/SystemSteps';

export const revalidate = 60;

export default async function ProgramPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let course;

  try {
    const data = await getLandingPageData();
    course = data.courses.find(c => c.id === Number(id));
  } catch {}

  if (!course) return notFound();

  const is33Step = course.name.includes('33');

  return (
    <div className="bg-background min-h-screen pt-16">

      {is33Step ? (
        <section className="py-16 bg-[#f6f6f5]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Sol — mətn */}
              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
                  Güclü karyera, doğru sistemlə başlayır.
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  <span className="font-semibold text-gray-800">"33 addımda mühasibat uçotu"</span> ilə peşəkar inkişaf yolunuza bu gün başlaya bilmək imkanınız vardır..
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Finmaster Academiyasının akademik və sistemli tədris yanaşması ilə hazırlamış olduğu bu proqram, karyerasında güclü təməl qurmaq və peşəkar səviyyəyə yüksəlmək istəyənlər üçün nəzərdə tutulmuşdur.
                </p>

                <div>
                  <p className="font-semibold text-gray-800 mb-3">"33 Addımda Mühasibat uçotu" proqramı müddətində siz :</p>
                  <ul className="space-y-2">
                    {[
                      'Mühasibatın uçotunun əsas strukturunu öyrənəcək ,',
                      'Maliyyə hesabatlarını analiz etmə bacarığınızı inkişaf etdirəcək ,',
                      'Real tətbiqlər üzərindən praktiki təcrübə qazanacaq ,',
                      'Müasir maliyyə sistemlərinə dair peşəkar baxış əldə edəcəksiniz.',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0A4D2C] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  <span className="font-semibold text-gray-800">33 (otuz üç) dərs günündən</span>, yəni <span className="font-semibold text-gray-800">66 (altmış altı) saatdan</span> ibarət proqram müddətində tələbələr məxsusi olaraq hazırlanmış dərs materialları və mənimsəmə dərəcəsini yüksəltmək məqsədilə seçilmiş yoxlama suallar ilə (düzgün cavablar daxil olmaqla) təmin olunmaqdadır.
                </p>
              </div>

              {/* Sağ — şəkil + düymə */}
              <div className="flex flex-col gap-4 pt-44">
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/programs-33.png"
                    alt="33 Addımda Mühasibat uçotu"
                    width={0}
                    height={0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    unoptimized
                    className="w-full h-auto"
                  />
                </div>
                <div className="flex justify-end">
                  <Link
                    href={`/videos#course-${course.id}`}
                    className="font-inter inline-flex items-center gap-1.5 text-sm border border-[#0A4D2C] text-[#0A4D2C] font-semibold px-4 py-2 rounded-lg hover:bg-[#0A4D2C] hover:text-white transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Videolara keçid
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      ) : (
        <section className="pt-10 pb-20">
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

            <div className="flex justify-end">
              <Link
                href={`/videos#course-${course.id}`}
                className="inline-flex items-center gap-2 border border-[#0A4D2C] text-[#0A4D2C] font-semibold px-6 py-4 rounded-xl hover:bg-[#0A4D2C] hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Videolara keçid
              </Link>
            </div>

          </div>
        </section>
      )}
    </div>
  );
}
