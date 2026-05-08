import { getLandingPageData } from '@/lib/api';
import type { Video } from '@/types/landing';
import { VideoGrid } from '@/components/VideoCard';

export const revalidate = 60;

export default async function VideosPage() {
  let videos: Video[] = [];
  let courses: { id: number; name: string }[] = [];

  try {
    const data = await getLandingPageData();
    videos = data.videos || [];
    courses = data.courses || [];
  } catch {}

  const grouped: { courseId: number | null; courseName: string; videos: Video[] }[] = [];

  courses.forEach(course => {
    const courseVideos = videos.filter(v => v.course_id === course.id);
    grouped.push({ courseId: course.id, courseName: course.name, videos: courseVideos });
  });

  return (
    <section className="pt-28 pb-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {grouped.length === 0 && (
          <p className="text-center text-gray-400">Hələ video yoxdur.</p>
        )}

        {grouped.map((group, i) => (
          <div key={group.courseId ?? 'other'} id={group.courseId ? `course-${group.courseId}` : 'other'} className={i > 0 ? 'mt-20' : 'mt-4'}>
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{group.courseName}</h2>
              <div className="mt-2 mx-auto w-10 h-px bg-[#0A4D2C]" />
            </div>

            <VideoGrid videos={group.videos} />
          </div>
        ))}

      </div>
    </section>
  );
}
