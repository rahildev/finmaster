import { getLandingPageData } from '@/lib/api';
import type { Video } from '@/types/landing';

export const revalidate = 60;

function getYoutubeThumbnail(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

function VideoCard({ video }: { video: Video }) {
  const thumb = video.thumbnail_url || getYoutubeThumbnail(video.video_url);

  return (
    <a
      href={video.video_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl overflow-hidden border border-gray-100 hover:border-[#0A4D2C]/30 hover:shadow-md transition-all"
    >
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        {thumb ? (
          <img src={thumb} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#0A4D2C] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="px-4 py-3">
        <p className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-[#0A4D2C] transition-colors">
          {video.title}
        </p>
      </div>
    </a>
  );
}

export default async function VideosPage() {
  let videos: Video[] = [];
  let courses: { id: number; name: string }[] = [];

  try {
    const data = await getLandingPageData();
    videos = data.videos || [];
    courses = data.courses || [];
  } catch {}

  // Group videos by course_id
  const grouped: { courseId: number | null; courseName: string; videos: Video[] }[] = [];

  courses.forEach(course => {
    const courseVideos = videos.filter(v => v.course_id === course.id);
    if (courseVideos.length > 0) {
      grouped.push({ courseId: course.id, courseName: course.name, videos: courseVideos });
    }
  });

  // Videos without a course
  const uncategorized = videos.filter(v => !v.course_id);
  if (uncategorized.length > 0) {
    grouped.push({ courseId: null, courseName: 'Digər videolar', videos: uncategorized });
  }

  return (
    <section className="pt-28 pb-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="mb-12 text-center">
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#0A4D2C] uppercase mb-3">Videolar</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Video Dərslər</h1>
        </div>

        {grouped.length === 0 && (
          <p className="text-center text-gray-400">Hələ video yoxdur.</p>
        )}

        {grouped.map((group, i) => (
          <div key={group.courseId ?? 'other'} className={i > 0 ? 'mt-16' : ''}>
            {/* Section header */}
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{group.courseName}</h2>
              <div className="mt-2 mx-auto w-10 h-px bg-[#0A4D2C]" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {group.videos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
