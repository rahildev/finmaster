'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import type { Video } from '@/types/landing';

function getYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([^&?\s/]+)/);
  return match ? match[1] : null;
}

function getThumbnail(video: Video): string | null {
  if (video.thumbnail_url) return video.thumbnail_url;
  const id = getYoutubeId(video.video_url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

// ─── Grid card ────────────────────────────────────────────────────────────────

function VideoGridCard({ video, onOpen }: { video: Video; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);
  const id = getYoutubeId(video.video_url);
  const thumb = getThumbnail(video);

  return (
    <div
      className="rounded-xl overflow-hidden border border-gray-100 hover:border-[#0A4D2C]/30 hover:shadow-md transition-all cursor-pointer"
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[9/16] bg-gray-100 overflow-hidden">
        {/* Muted silent preview on hover */}
        {hovered && id && (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=${id}`}
            className="absolute inset-0 w-full h-full border-0 pointer-events-none"
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          />
        )}

        {/* Thumbnail (always mounted, hidden when hovered) */}
        <div className={`absolute inset-0 transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`}>
          {thumb ? (
            <img src={thumb} alt={video.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
        </div>

        {/* Play icon (only when not hovered) */}
        {!hovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/15">
            <div className="w-12 h-12 rounded-full bg-white/85 flex items-center justify-center shadow">
              <svg className="w-5 h-5 text-[#0A4D2C] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className="px-4 py-3">
        <p className="text-sm font-medium text-gray-800 line-clamp-2">{video.title}</p>
      </div>
    </div>
  );
}

// ─── Full-page Shorts viewer ──────────────────────────────────────────────────

function ShortsViewer({
  videos,
  initialIndex,
  onClose,
}: {
  videos: Video[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const scrolling = useRef(false);

  const goNext = useCallback(() => setIndex(i => Math.min(i + 1, videos.length - 1)), [videos.length]);
  const goPrev = useCallback(() => setIndex(i => Math.max(i - 1, 0)), []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Keyboard nav
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev, onClose]);

  // Scroll / wheel nav (debounced so one gesture = one video)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (scrolling.current) return;
      scrolling.current = true;
      if (e.deltaY > 30) goNext();
      else if (e.deltaY < -30) goPrev();
      setTimeout(() => { scrolling.current = false; }, 600);
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [goNext, goPrev]);

  // Touch swipe nav
  const touchStartY = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (diff > 50) goNext();
    else if (diff < -50) goPrev();
  };

  const video = videos[index];
  const id = getYoutubeId(video.video_url);

  return (
    <div
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest">
        {index + 1} / {videos.length}
      </div>

      {/* Video */}
      <div className="relative w-full max-w-[360px] mx-auto" style={{ height: 'calc(100dvh - 100px)' }}>
        {id && (
          <iframe
            key={`${id}-${index}`}
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
            className="absolute inset-0 w-full h-full border-0 rounded-2xl"
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* Title */}
      <p className="mt-3 text-white/80 text-sm text-center max-w-xs px-4 line-clamp-1">{video.title}</p>

      {/* Up / Down arrows */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        <button
          onClick={goPrev}
          disabled={index === 0}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 flex items-center justify-center text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <button
          onClick={goNext}
          disabled={index === videos.length - 1}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 flex items-center justify-center text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Scroll hint */}
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/30 text-[11px]">
        scroll · ↑↓ · swipe
      </p>
    </div>
  );
}

// ─── Exported grid ────────────────────────────────────────────────────────────

export function VideoGrid({ videos }: { videos: Video[] }) {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {videos.map((video, i) => (
          <VideoGridCard key={video.id} video={video} onOpen={() => setViewerIndex(i)} />
        ))}
      </div>

      {viewerIndex !== null && (
        <ShortsViewer
          videos={videos}
          initialIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </>
  );
}
