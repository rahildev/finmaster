import { getLandingPageData } from '@/lib/api';
import dynamicImport from 'next/dynamic';
import type { Video } from '@/types/landing';
import CourseSectionHeading from '@/components/CourseSectionHeading';
import { notFound } from 'next/navigation';

const VideoGrid = dynamicImport(
  () => import('@/components/VideoCard').then(m => m.VideoGrid),
  {
    loading: () => (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-xl bg-gray-100 animate-pulse aspect-[9/16]" />
        ))}
      </div>
    ),
  }
);

export const dynamic = 'force-dynamic';

export default async function VideosPage() {
  let videos: Video[] = [];
  let courses: { id: number; name: string; name_en: string | null }[] = [];

  try {
    const data = await getLandingPageData();
    if (data.section_visibility?.videos === false) return notFound();
    videos = data.videos || [];
    courses = data.courses || [];
  } catch {}

  const grouped: { courseId: number; name: string; name_en: string | null; videos: Video[] }[] = [];

  courses.forEach(course => {
    const courseVideos = videos.filter(v => v.course_id === course.id);
    grouped.push({ courseId: course.id, name: course.name, name_en: course.name_en ?? null, videos: courseVideos });
  });

  return (
    <section className="pt-28 pb-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {grouped.length === 0 && (
          <p className="text-center text-gray-400">Hələ video yoxdur.</p>
        )}

        {grouped.map((group, i) => (
          <div key={group.courseId} id={`course-${group.courseId}`} className={i > 0 ? 'mt-20' : 'mt-4'}>
            <CourseSectionHeading name={group.name} nameEn={group.name_en} />
            <VideoGrid videos={group.videos} />
          </div>
        ))}

      </div>
    </section>
  );
}
