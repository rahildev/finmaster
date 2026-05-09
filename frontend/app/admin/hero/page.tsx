'use client';

import { useEffect, useState } from 'react';
import { getHeroSections, createHeroSection, updateHeroSection, deleteHeroSection, purgeAllCaches } from '@/lib/admin-api';
import type { HeroSection } from '@/types/landing';
import { getImageUrl } from '@/lib/api';

export default function HeroAdminPage() {
  const [heroes, setHeroes] = useState<HeroSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    title_en: '',
    subtitle: '',
    subtitle_en: '',
    btn_text: '',
    btn_text_en: '',
    btn_link: '',
    sort_order: 0,
    is_active: true,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [shouldDeleteImage, setShouldDeleteImage] = useState(false);

  useEffect(() => {
    fetchHeroes();
  }, []);

  const fetchHeroes = async () => {
    try {
      const data = await getHeroSections();
      setHeroes(data);
    } catch (error) {
      console.error('Hero sections yüklənmədi:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      title_en: '',
      subtitle: '',
      subtitle_en: '',
      btn_text: '',
      btn_text_en: '',
      btn_link: '',
      sort_order: 0,
      is_active: true,
    });
    setImageFile(null);
    setImagePreview(null);
    setOriginalImageUrl(null);
    setShouldDeleteImage(false);
    setEditingId(null);
    setShowForm(false);
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleEdit = (hero: HeroSection) => {
    const imgUrl = hero.image_url ? getImageUrl(hero.image_url) : null;
    setFormData({
      title: hero.title || '',
      title_en: (hero as any).title_en || '',
      subtitle: hero.subtitle || '',
      subtitle_en: (hero as any).subtitle_en || '',
      btn_text: hero.btn_text || '',
      btn_text_en: (hero as any).btn_text_en || '',
      btn_link: hero.btn_link || '',
      sort_order: hero.sort_order || 0,
      is_active: hero.is_active ?? true,
    });
    setImagePreview(imgUrl);
    setOriginalImageUrl(imgUrl);
    setShouldDeleteImage(false);
    setEditingId(hero.id);
    setFormKey(prev => prev + 1);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setSaving(true);
    setMessage(null);

    try {
      const data: any = {
        title: formData.title,
        title_en: formData.title_en,
        subtitle: formData.subtitle,
        subtitle_en: formData.subtitle_en,
        btn_text: formData.btn_text,
        btn_text_en: formData.btn_text_en,
        btn_link: formData.btn_link,
        sort_order: formData.sort_order,
        is_active: formData.is_active,
      };

      if (editingId) {
        await updateHeroSection(editingId, data);
        setMessage({ type: 'success', text: 'Hero section uğurla yeniləndi!' });
      } else {
        await createHeroSection(data);
        setMessage({ type: 'success', text: 'Hero section uğurla əlavə edildi!' });
      }

      resetForm();
      await fetchHeroes();
      await purgeAllCaches();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Xəta baş verdi!';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteHeroSection(id);
      setMessage({ type: 'success', text: 'Hero section silindi!' });
      setShowDeleteModal(false);
      setDeleteTargetId(null);
      resetForm();
      await fetchHeroes();
      await purgeAllCaches();
    } catch (error) {
      console.error('Xəta:', error);
      setMessage({ type: 'error', text: 'Silinmədi!' });
      setShowDeleteModal(false);
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
        <h1 className="text-3xl font-bold text-gray-dark">Hero Section</h1>
        <button
          onClick={() => {
            setFormKey(prev => prev + 1);
            setShowForm(true);
          }}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          + Yeni Hero
        </button>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      {showForm && (
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? 'Hero Section Redaktə Et' : 'Yeni Hero Section Əlavə Et'}
          </h2>
          <form key={formKey} onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Mühasibatlıqda Uğurun Açarı"
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
                placeholder="The Key to Success in Accounting"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Alt Başlıq (AZ)
              </label>
              <textarea
                rows={2}
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Peşəkar mühasib olmaq üçün lazım olan bütün biliklər"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Alt Başlıq (EN)
              </label>
              <textarea
                rows={2}
                value={formData.subtitle_en}
                onChange={(e) => setFormData({ ...formData, subtitle_en: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="All the knowledge needed to become a professional accountant"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Button Mətni (AZ)
                </label>
                <input
                  type="text"
                  value={formData.btn_text}
                  onChange={(e) => setFormData({ ...formData, btn_text: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Kursları İncələ"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Button Mətni (EN)
                </label>
                <input
                  type="text"
                  value={formData.btn_text_en}
                  onChange={(e) => setFormData({ ...formData, btn_text_en: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Explore Courses"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Button Linki
                </label>
                <input
                  type="text"
                  value={formData.btn_link}
                  onChange={(e) => setFormData({ ...formData, btn_link: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="#courses"
                />
              </div>
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

            <div className="flex justify-between items-center">
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
                  onClick={handleCancel}
                  disabled={saving}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Ləğv Et
                </button>
              </div>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setDeleteTargetId(editingId);
                    setShowDeleteModal(true);
                  }}
                  disabled={saving}
                  className="px-6 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                >
                  Sil
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {!showForm && (
        <div className="grid gap-4">
          {heroes.map((hero) => (
            <div
              key={hero.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex justify-between items-start"
            >
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-dark mb-1">{hero.title}</h3>
                {hero.subtitle && (
                  <p className="text-gray-600 text-sm mb-2">{hero.subtitle}</p>
                )}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  {hero.btn_text && <span>🔘 {hero.btn_text}</span>}
                  <span className={hero.is_active ? 'text-green-600' : 'text-gray-400'}>
                    {hero.is_active ? '✓ Aktiv' : '✗ Deaktiv'}
                  </span>
                  <span>Sıra: {hero.sort_order}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(hero)}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Redaktə
                </button>
              </div>
            </div>
          ))}

          {heroes.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Heç bir hero section yoxdur. Yeni hero section əlavə edin.
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-dark text-center mb-2">
                Hero section silmək istədiyinizə əminsiniz?
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Bu əməliyyat geri qaytarıla bilməz. Bütün məlumatlar silinəcək.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteTargetId(null);
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Ləğv Et
                </button>
                <button
                  onClick={() => {
                    if (deleteTargetId) {
                      handleDelete(deleteTargetId);
                    }
                  }}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
