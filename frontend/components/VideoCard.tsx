'use client';

import { useState } from 'react';
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

interface VideoCardProps {
  video: Video;
  isActive: boolean;
  onPlay: () => void;
}

export function VideoCard({ video, isActive, onPlay }: VideoCardProps) {
  const id = getYoutubeId(video.video_url);
  const thumb = getThumbnail(video);

  return (
    <div className="rounded-xl overflow-hidden border border-gray-100 hover:border-[#0A4D2C]/30 hover:shadow-md transition-all">
      <div className="relative aspect-[9/16] bg-gray-100 overflow-hidden">
        {isActive && id ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
            className="absolute inset-0 w-full h-full border-0"
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <>
            {thumb ? (
              <img
                src={thumb}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
            <button
              onClick={onPlay}
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
              aria-label={`Play ${video.title}`}
            >
              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-[#0A4D2C] ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </>
        )}
      </div>
      <div className="px-4 py-3">
        <p className="text-sm font-medium text-gray-800 line-clamp-2">{video.title}</p>
      </div>
    </div>
  );
}

export function VideoGrid({ videos }: { videos: Video[] }) {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {videos.map(video => (
        <VideoCard
          key={video.id}
          video={video}
          isActive={activeId === video.id}
          onPlay={() => setActiveId(video.id)}
        />
      ))}
    </div>
  );
}
