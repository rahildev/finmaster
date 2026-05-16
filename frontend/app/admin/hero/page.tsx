'use client';

import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getHeroSections, createHeroSection, updateHeroSection, deleteHeroSection, purgeAllCaches } from '@/lib/admin-api';
import type { HeroSection } from '@/types/landing';
import { getImageUrl } from '@/lib/api';
import { heroSchema, type HeroFormData } from '@/lib/validations';
import { toast } from 'sonner';
import ConfirmDialog from '@/components/ConfirmDialog';

function ImageUploadBox({
  id,
  label,
  preview,
  onFile,
  onClear,
  aspect = 'aspect-video',
  placeholder = '🖼',
}: {
  id: string;
  label: string;
  preview: string | null;
  onFile: (file: File, preview: string) => void;
  onClear: () => void;
  aspect?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
        {preview ? (
          <div className={`relative w-full ${aspect} max-w-xs mx-auto mb-3 rounded-lg overflow-hidden`}>
            <img src={preview} alt={label} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className={`w-full ${aspect} max-w-xs mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-3`}>
            <span className="text-4xl text-gray-300">{placeholder}</span>
          </div>
        )}
        <div className="space-y-2">
          <input
            type="file"
            id={id}
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => onFile(file, reader.result as string);
                reader.readAsDataURL(file);
              }
            }}
            className="hidden"
          />
          <label
            htmlFor={id}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {preview ? 'Dəyiş' : 'Şəkil Seç'}
          </label>
          {preview && (
            <button
              type="button"
              onClick={onClear}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              Şəkili Sil
            </button>
          )}
          <p className="text-xs text-gray-400">PNG, JPG, WEBP (max 5MB)</p>
        </div>
      </div>
    </div>
  );
}

export default function HeroAdminPage() {
  const [heroes, setHeroes] = useState<HeroSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [shouldDeleteImage, setShouldDeleteImage] = useState(false);
  const [imageMobileFile, setImageMobileFile] = useState<File | null>(null);
  const [imageMobilePreview, setImageMobilePreview] = useState<string | null>(null);
  const [shouldDeleteImageMobile, setShouldDeleteImageMobile] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      title: '',
      title_en: '',
      subtitle: '',
      subtitle_en: '',
      btn_text: '',
      btn_text_en: '',
      btn_link: '',
      sort_order: 0,
      is_active: true,
    },
  });

  useEffect(() => {
    fetchHeroes();
  }, []);

  useEffect(() => {
    const isOpen = showForm || editingId !== null;
    if (!isOpen) return;

    const handler = (e: MouseEvent) => {
      if (deleteTarget !== null) return;
      if (formContainerRef.current && !formContainerRef.current.contains(e.target as Node)) {
        reset();
        setImageFile(null); setImagePreview(null); setShouldDeleteImage(false);
        setImageMobileFile(null); setImageMobilePreview(null); setShouldDeleteImageMobile(false);
        setEditingId(null);
        setShowForm(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showForm, editingId, deleteTarget, reset]);

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

  const clearFileStates = () => {
    setImageFile(null); setImagePreview(null); setShouldDeleteImage(false);
    setImageMobileFile(null); setImageMobilePreview(null); setShouldDeleteImageMobile(false);
  };

  const resetForm = () => {
    reset();
    clearFileStates();
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (hero: HeroSection) => {
    reset({
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
    setImagePreview(hero.image_url ? getImageUrl(hero.image_url) : null);
    setShouldDeleteImage(false);
    setImageMobilePreview(hero.image_url_mobile ? getImageUrl(hero.image_url_mobile) : null);
    setShouldDeleteImageMobile(false);
    setImageFile(null);
    setImageMobileFile(null);
    setFormKey(prev => prev + 1);
    setShowForm(false);
    setEditingId(hero.id);
  };

  const onSubmit = async (data: HeroFormData) => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title || 'hero');
      formData.append('title_en', data.title_en || 'hero');
      formData.append('subtitle', data.subtitle || '');
      formData.append('subtitle_en', data.subtitle_en || '');
      formData.append('btn_text', data.btn_text || '');
      formData.append('btn_text_en', data.btn_text_en || '');
      formData.append('btn_link', data.btn_link || '');
      formData.append('sort_order', data.sort_order.toString());
      formData.append('is_active', data.is_active ? '1' : '0');

      if (imageFile) { formData.append('image', imageFile); }
      else if (shouldDeleteImage) { formData.append('delete_image', '1'); }
      if (imageMobileFile) { formData.append('image_mobile', imageMobileFile); }
      else if (shouldDeleteImageMobile) { formData.append('delete_image_mobile', '1'); }

      if (editingId) {
        await updateHeroSection(editingId, formData);
        toast.success('Hero section uğurla yeniləndi!');
      } else {
        await createHeroSection(formData);
        toast.success('Hero section uğurla əlavə edildi!');
      }

      resetForm();
      await fetchHeroes();
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
      await deleteHeroSection(deleteTarget);
      toast.success('Hero section silindi!');
      resetForm();
      await fetchHeroes();
      await purgeAllCaches();
    } catch {
      toast.error('Silinmədi!');
    } finally {
      setDeleteTarget(null);
    }
  };

  const renderForm = (isNew = false) => (
    <form key={formKey} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ImageUploadBox
          id={`hero-image-desktop-${isNew ? 'new' : editingId}`}
          label="Şəkil — Desktop"
          preview={imagePreview}
          onFile={(file, prev) => { setImageFile(file); setImagePreview(prev); setShouldDeleteImage(false); }}
          onClear={() => { setShouldDeleteImage(true); setImageFile(null); setImagePreview(null); }}
          aspect="aspect-video"
        />
        <ImageUploadBox
          id={`hero-image-mobile-${isNew ? 'new' : editingId}`}
          label="Şəkil — Mobile"
          preview={imageMobilePreview}
          onFile={(file, prev) => { setImageMobileFile(file); setImageMobilePreview(prev); setShouldDeleteImageMobile(false); }}
          onClear={() => { setShouldDeleteImageMobile(true); setImageMobileFile(null); setImageMobilePreview(null); }}
          aspect="aspect-[9/16]"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Başlıq (AZ) *</label>
        <input {...register('title')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="FinMaster Academy" />
        {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Başlıq (EN)</label>
        <input {...register('title_en')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="FinMaster Academy" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Təsvir (AZ)</label>
        <textarea {...register('subtitle')} rows={8} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Mühasibat və maliyyə sahəsində..." />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Təsvir (EN)</label>
        <textarea {...register('subtitle_en')} rows={8} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="A premium education platform..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Button Mətni (AZ)</label>
          <input {...register('btn_text')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Kursları İncələ" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Button Mətni (EN)</label>
          <input {...register('btn_text_en')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Explore Courses" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Button Linki</label>
          <input {...register('btn_link')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="#courses" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('is_active')} className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded" />
          <span className="text-sm font-medium text-gray-700">Aktiv</span>
        </label>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Sıra:</label>
          <input type="number" {...register('sort_order', { valueAsNumber: true })} className="w-20 px-2 py-1 border border-gray-300 rounded" />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button type="submit" disabled={saving} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {saving ? 'Yadda saxlanılır...' : editingId ? 'Yenilə' : 'Yadda Saxla'}
          </button>
          <button type="button" onClick={resetForm} disabled={saving} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">
            Ləğv Et
          </button>
        </div>
        {editingId && (
          <button type="button" onClick={() => setDeleteTarget(editingId)} disabled={saving} className="px-6 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50">
            Sil
          </button>
        )}
      </div>
    </form>
  );

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
          onClick={() => { clearFileStates(); reset(); setFormKey(prev => prev + 1); setEditingId(null); setShowForm(true); }}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          + Yeni Hero
        </button>
      </div>

      {showForm && editingId === null && (
        <div ref={formContainerRef} className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4">Yeni Hero Section Əlavə Et</h2>
          {renderForm(true)}
        </div>
      )}

      <div className="grid gap-4">
        {heroes.map((hero) =>
          editingId === hero.id ? (
            <div key={hero.id} ref={formContainerRef} className="bg-white rounded-lg shadow-sm border border-primary/40 p-6">
              <h2 className="text-xl font-bold mb-4">Hero Section Redaktə Et</h2>
              {renderForm()}
            </div>
          ) : (
            <div key={hero.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex justify-between items-start">
              <div className="flex gap-4 flex-1">
                {hero.image_url && (
                  <div className="w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={getImageUrl(hero.image_url) || ''} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-dark mb-1">{hero.title}</h3>
                  {hero.subtitle && <p className="text-gray-600 text-sm mb-2">{hero.subtitle}</p>}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {hero.btn_text && <span>🔘 {hero.btn_text}</span>}
                    {hero.image_url_mobile && <span>📱 Mobile şəkil var</span>}
                    <span className={hero.is_active ? 'text-green-600' : 'text-gray-400'}>
                      {hero.is_active ? '✓ Aktiv' : '✗ Deaktiv'}
                    </span>
                    <span>Sıra: {hero.sort_order}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleEdit(hero)}
                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex-shrink-0"
              >
                Redaktə
              </button>
            </div>
          )
        )}
        {heroes.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Heç bir hero section yoxdur. Yeni hero section əlavə edin.
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Hero section silinsin?"
        message="Bu əməliyyat geri qaytarıla bilməz."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
