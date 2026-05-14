'use client';

import { useEffect, useState } from 'react';
import { getTeachers, createTeacher, updateTeacher, deleteTeacher, purgeAllCaches } from '@/lib/admin-api';
import type { TeacherInfo } from '@/types/landing';
import { getImageUrl } from '@/lib/api';
import { toast } from 'sonner';
import ConfirmDialog from '@/components/ConfirmDialog';

export default function TeachersAdminPage() {
  const [teachers, setTeachers] = useState<TeacherInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    title_en: '',
    bio: '',
    bio_en: '',
    experience: '',
    experience_en: '',
    achievements: '',
    achievements_en: '',
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [originalPhotoUrl, setOriginalPhotoUrl] = useState<string | null>(null);
  const [shouldDeletePhoto, setShouldDeletePhoto] = useState(false);

  const [photoMobileFile, setPhotoMobileFile] = useState<File | null>(null);
  const [photoMobilePreview, setPhotoMobilePreview] = useState<string | null>(null);
  const [shouldDeletePhotoMobile, setShouldDeletePhotoMobile] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const data = await getTeachers();
      setTeachers(data);
    } catch (error) {
      console.error('Müəllimlər yüklənmədi:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      title_en: '',
      bio: '',
      bio_en: '',
      experience: '',
      experience_en: '',
      achievements: '',
      achievements_en: '',
    });
    setPhotoFile(null);
    setPhotoPreview(null);
    setOriginalPhotoUrl(null);
    setShouldDeletePhoto(false);
    setPhotoMobileFile(null);
    setPhotoMobilePreview(null);
    setShouldDeletePhotoMobile(false);
    setEditingId(null);
    setShowForm(false);
  };

  const handleCancel = () => {
    // Bütün dəyişiklikləri ləğv et və formu bağla
    resetForm();
  };

  const handleEdit = (teacher: TeacherInfo) => {
    const photoUrl = teacher.photo_url ? getImageUrl(teacher.photo_url) : null;
    setFormData({
      name: teacher.name || '',
      title: teacher.title || '',
      title_en: (teacher as any).title_en || '',
      bio: teacher.bio || '',
      bio_en: (teacher as any).bio_en || '',
      experience: teacher.experience || '',
      experience_en: (teacher as any).experience_en || '',
      achievements: teacher.achievements || '',
      achievements_en: (teacher as any).achievements_en || '',
    });
    const photoMobileUrl = (teacher as any).photo_url_mobile ? getImageUrl((teacher as any).photo_url_mobile) : null;
    setPhotoPreview(photoUrl);
    setOriginalPhotoUrl(photoUrl);
    setShouldDeletePhoto(false);
    setPhotoMobilePreview(photoMobileUrl);
    setShouldDeletePhotoMobile(false);
    setPhotoMobileFile(null);
    setEditingId(teacher.id);
    setFormKey(prev => prev + 1);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setSaving(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('title', formData.title);
      data.append('title_en', formData.title_en);
      data.append('bio', formData.bio);
      data.append('bio_en', formData.bio_en);
      data.append('experience', formData.experience);
      data.append('experience_en', formData.experience_en);
      data.append('achievements', formData.achievements);
      data.append('achievements_en', formData.achievements_en);

      if (photoFile) {
        data.append('photo', photoFile);
      } else if (shouldDeletePhoto) {
        data.append('delete_photo', '1');
      }

      if (photoMobileFile) {
        data.append('photo_mobile', photoMobileFile);
      } else if (shouldDeletePhotoMobile) {
        data.append('delete_photo_mobile', '1');
      }

      if (editingId) {
        await updateTeacher(editingId, data);
        toast.success('Müəllim uğurla yeniləndi!');
      } else {
        await createTeacher(data);
        toast.success('Müəllim uğurla əlavə edildi!');
      }

      resetForm();
      await fetchTeachers();
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
      await deleteTeacher(deleteTarget);
      toast.success('Müəllim silindi!');
      resetForm();
      await fetchTeachers();
      await purgeAllCaches();
    } catch (error) {
      console.error('Xəta:', error);
      toast.error('Silinmədi!');
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleClearPhoto = () => {
    setShouldDeletePhoto(true);
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const handleClearPhotoMobile = () => {
    setShouldDeletePhotoMobile(true);
    setPhotoMobileFile(null);
    setPhotoMobilePreview(null);
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
        <h1 className="text-3xl font-bold text-gray-dark">Haqqımızda</h1>
        <button
          onClick={() => {
            setFormKey(prev => prev + 1);
            setShowForm(true);
          }}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          + Yeni Müəllim
        </button>
      </div>

      {showForm && (
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? 'Müəllimi Redaktə Et' : 'Yeni Müəllim Əlavə Et'}
          </h2>
          <form
            key={formKey}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sol tərəf - Fotolar */}
              <div className="space-y-4">
                <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Şəkil — Desktop
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {photoPreview ? (
                    <div className="relative w-full aspect-square max-w-xs mx-auto mb-4 rounded-lg overflow-hidden">
                      <img
                        src={photoPreview}
                        alt="Müəllim"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-square max-w-xs mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-5xl text-gray-300">👨‍🏫</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <input
                      type="file"
                      id="photo-upload"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setPhotoFile(file);
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setPhotoPreview(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />

                    <label
                      htmlFor="photo-upload"
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {photoPreview ? 'Şəkili Dəyiş' : 'Şəkil Seç'}
                    </label>

                    {photoPreview && (
                      <button
                        type="button"
                        onClick={handleClearPhoto}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Şəkili Sil
                      </button>
                    )}

                    <p className="text-xs text-gray-500 text-center">PNG, JPG, WEBP (max 5MB)</p>
                  </div>
                </div>
                </div>

                {/* Mobile photo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Şəkil — Mobile
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {photoMobilePreview ? (
                      <div className="relative w-full aspect-[9/16] max-w-[120px] mx-auto mb-4 rounded-lg overflow-hidden">
                        <img src={photoMobilePreview} alt="Mobile" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-full aspect-[9/16] max-w-[120px] mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-3xl text-gray-300">📱</span>
                      </div>
                    )}
                    <div className="space-y-2">
                      <input
                        type="file"
                        id="photo-mobile-upload"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setPhotoMobileFile(file);
                            setShouldDeletePhotoMobile(false);
                            const reader = new FileReader();
                            reader.onloadend = () => setPhotoMobilePreview(reader.result as string);
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="photo-mobile-upload"
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {photoMobilePreview ? 'Şəkili Dəyiş' : 'Şəkil Seç'}
                      </label>
                      {photoMobilePreview && (
                        <button
                          type="button"
                          onClick={handleClearPhotoMobile}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Şəkili Sil
                        </button>
                      )}
                      <p className="text-xs text-gray-500 text-center">PNG, JPG, WEBP (max 5MB)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sağ tərəf - Məlumatlar */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ad və Soyad *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Nigar Əliyeva"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vəzifə / Titul (AZ)
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Baş Müəllim və Mühasib-Auditor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vəzifə / Titul (EN)
                  </label>
                  <input
                    type="text"
                    value={formData.title_en}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Lead Instructor and Certified Accountant"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Qısa Təsvir (AZ)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Mühasibatlıq sahəsində 15+ illik təcrübə..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Qısa Təsvir (EN)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.bio_en}
                    onChange={(e) => setFormData({ ...formData, bio_en: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="15+ years of experience in accounting..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Qurucu Təsviri (AZ)
                  </label>
                  <textarea
                    rows={6}
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Mənim məqsədim – mühasibat sahəsində bilik və təcrübəni birləşdirərək..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Qurucu Təsviri (EN)
                  </label>
                  <textarea
                    rows={6}
                    value={formData.experience_en}
                    onChange={(e) => setFormData({ ...formData, experience_en: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="My goal is to bring together knowledge and experience in accounting..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nailiyyətlər (AZ)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.achievements}
                    onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="ACCA sertifikatı, 500+ tələbə..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nailiyyətlər (EN)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.achievements_en}
                    onChange={(e) => setFormData({ ...formData, achievements_en: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="ACCA certification, 500+ students..."
                  />
                </div>
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
                  onClick={() => setDeleteTarget(editingId)}
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
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex justify-between items-start"
            >
              <div className="flex gap-4 flex-1">
                {teacher.photo_url && (
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={getImageUrl(teacher.photo_url) || ''}
                      alt={teacher.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-dark mb-1">{teacher.name}</h3>
                  {teacher.title && (
                    <p className="text-sm text-primary mb-2">{teacher.title}</p>
                  )}
                  {teacher.bio && (
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{teacher.bio}</p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {teacher.experience && <span>✓ Təcrübə</span>}
                    {teacher.achievements && <span>✓ Nailiyyətlər</span>}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(teacher)}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Redaktə
                </button>
              </div>
            </div>
          ))}

          {teachers.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Heç bir müəllim yoxdur. Yeni müəllim əlavə edin.
            </div>
          )}
        </div>
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Müəllim silinsin?"
        message="Bu əməliyyat geri qaytarıla bilməz. Bütün məlumatlar silinəcək."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
