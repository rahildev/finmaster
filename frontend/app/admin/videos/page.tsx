'use client';

import { useEffect, useState, useRef } from 'react';
import { getVideos, createVideo, updateVideo, deleteVideo, getCourses, purgeAllCaches } from '@/lib/admin-api';
import type { Video, Course } from '@/types/landing';
import { toast } from 'sonner';
import ConfirmDialog from '@/components/ConfirmDialog';

export default function VideosAdminPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    title_en: '',
    description: '',
    description_en: '',
    video_url: '',
    video_type: 'video' as 'video' | 'short',
    course_id: '',
    is_active: true,
    sort_order: 0,
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  useEffect(() => {
    fetchVideos();
    getCourses().then(setCourses).catch(() => {});
  }, []);

  const fetchVideos = async () => {
    try {
      const data = await getVideos();
      setVideos(data);
    } catch (error) {
      console.error('Videolar yüklənmədi:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      title_en: '',
      description: '',
      description_en: '',
      video_url: '',
      video_type: 'video',
      course_id: '',
      is_active: true,
      sort_order: 0,
    });
    setThumbnailFile(null);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (video: Video) => {
    setFormData({
      title: video.title || '',
      title_en: (video as any).title_en || '',
      description: video.description || '',
      description_en: (video as any).description_en || '',
      video_url: video.video_url || '',
      video_type: video.video_type || 'video',
      course_id: video.course_id ? String(video.course_id) : '',
      is_active: video.is_active ?? true,
      sort_order: video.sort_order || 0,
    });
    setEditingId(video.id);
    setFormKey(prev => prev + 1);
    setShowForm(true);

    // Forma scroll et
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setSaving(true);

    try {
      // YouTube URL-i embed formatına çevir və növünü müəyyən et
      let videoUrl = formData.video_url;
      let videoType = formData.video_type;

      // YouTube Shorts-u avtomatik tanı
      if (videoUrl.includes('/shorts/')) {
        videoType = 'short';
        const videoId = videoUrl.split('/shorts/')[1]?.split('?')[0];
        if (videoId) {
          videoUrl = `https://www.youtube.com/embed/${videoId}`;
        }
      }
      // youtube.com/watch?v= formatındansa, embed formatına çevir
      else if (videoUrl.includes('youtube.com/watch?v=')) {
        const videoId = new URL(videoUrl).searchParams.get('v');
        if (videoId) {
          videoUrl = `https://www.youtube.com/embed/${videoId}`;
        }
      }
      // youtu.be/ formatındansa, embed formatına çevir
      else if (videoUrl.includes('youtu.be/')) {
        const videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
        if (videoId) {
          videoUrl = `https://www.youtube.com/embed/${videoId}`;
        }
      }

      const data = new FormData();
      data.append('title', formData.title);
      data.append('title_en', formData.title_en);
      data.append('description', formData.description);
      data.append('description_en', formData.description_en);
      data.append('video_url', videoUrl);
      data.append('video_type', videoType);
      if (formData.course_id) data.append('course_id', formData.course_id);
      data.append('is_active', formData.is_active ? '1' : '0');
      data.append('sort_order', formData.sort_order.toString());

      if (thumbnailFile) {
        data.append('thumbnail', thumbnailFile);
      }

      if (editingId) {
        await updateVideo(editingId, data);
        toast.success('Video uğurla yeniləndi!');
      } else {
        await createVideo(data);
        toast.success('Video uğurla yaradıldı!');
      }

      resetForm();
      await fetchVideos();
      await purgeAllCaches();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || 'Xəta baş verdi!');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteVideo(deleteTarget);
      toast.success('Video silindi!');
      await fetchVideos();
    } catch (error) {
      console.error('Xəta:', error);
      toast.error('Silinmədi!');
    } finally {
      setDeleteTarget(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Yüklənir...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-dark">Videolar</h1>
        <button
          onClick={() => {
            setFormKey(prev => prev + 1);
            setShowForm(true);
          }}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          + Yeni Video
        </button>
      </div>

      {showForm && (
        <div ref={formRef} className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? 'Video Redaktə Et' : 'Yeni Video Əlavə Et'}
          </h2>
          <form
            key={formKey}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Başlıq (AZ) *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Mühasibatlığa Giriş"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Başlıq (EN)
              </label>
              <input
                type="text"
                value={formData.title_en}
                onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Introduction to Accounting"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Təsvir (AZ)
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Mühasibatlıq əsasları haqqında geniş məlumat..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Təsvir (EN)
              </label>
              <textarea
                rows={3}
                value={formData.description_en}
                onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Comprehensive information about accounting basics..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                YouTube Video URL *
              </label>
              <input
                type="url"
                required
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://www.youtube.com/watch?v=... və ya https://youtu.be/..."
              />
              <p className="text-xs text-gray-500 mt-1">
                İstənilən YouTube linki qəbul olunur - avtomatik növü tanıyacaq və embed formatına çevriləcək
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kurs
              </label>
              <select
                value={formData.course_id}
                onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">— Kurs seçin —</option>
                {courses.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Video Növü
              </label>
              <select
                value={formData.video_type}
                onChange={(e) => setFormData({ ...formData, video_type: e.target.value as 'video' | 'short' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="video">Long-form content</option>
                <option value="short">YouTube Short</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Shorts URL yapışdırsanız avtomatik tanınır
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Thumbnail Şəkil
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Aktiv</span>
              </label>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Sıra:</label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                  className="w-20 px-2 py-1 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSubmit(e as any);
                }}
                disabled={saving}
                style={{ position: 'relative', zIndex: 10 }}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Yadda saxlanılır...' : 'Yadda Saxla'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                disabled={saving}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Ləğv Et
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex justify-between items-start"
          >
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-dark mb-2">{video.title}</h3>
              {video.description && (
                <p className="text-gray-600 mb-2">{video.description}</p>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className={video.is_active ? 'text-green-600' : 'text-gray-400'}>
                  {video.is_active ? '✓ Aktiv' : '✗ Deaktiv'}
                </span>
                <span>Sıra: {video.sort_order}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(video)}
                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Redaktə
              </button>
              <button
                onClick={() => setDeleteTarget(video.id)}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                Sil
              </button>
            </div>
          </div>
        ))}

        {videos.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Heç bir video yoxdur. Yeni video əlavə edin.
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Video silinsin?"
        message="Bu əməliyyat geri qaytarıla bilməz."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
