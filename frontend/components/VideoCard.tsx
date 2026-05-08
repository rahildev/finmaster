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

function getEmbedUrl(video: Video): string | null {
  const id = getYoutubeId(video.video_url);
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : null;
}

export default function VideoCard({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  const thumb = getThumbnail(video);
  const embedUrl = getEmbedUrl(video);

  return (
    <div className="group rounded-xl overflow-hidden border border-gray-100 hover:border-[#0A4D2C]/30 hover:shadow-md transition-all">
      <div className="relative aspect-[9/16] bg-gray-100 overflow-hidden">
        {playing && embedUrl ? (
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {thumb ? (
              <img
                src={thumb}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            )}
            <button
              onClick={() => setPlaying(true)}
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
        <p className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-[#0A4D2C] transition-colors">
          {video.title}
        </p>
      </div>
    </div>
  );
}
