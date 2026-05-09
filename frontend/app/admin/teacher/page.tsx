'use client';

import { useEffect, useState } from 'react';
import { getTeachers, createTeacher, updateTeacher, deleteTeacher, purgeAllCaches } from '@/lib/admin-api';
import type { TeacherInfo } from '@/types/landing';
import { getImageUrl } from '@/lib/api';

export default function TeachersAdminPage() {
  const [teachers, setTeachers] = useState<TeacherInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

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
    setPhotoPreview(photoUrl);
    setOriginalPhotoUrl(photoUrl); // Original şəkli saxla
    setShouldDeletePhoto(false);
    setEditingId(teacher.id);
    setFormKey(prev => prev + 1);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setSaving(true);
    setMessage(null);

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
        // Şəkili silmək üçün boş string göndər
        data.append('delete_photo', '1');
      }

      if (editingId) {
        await updateTeacher(editingId, data);
        setMessage({ type: 'success', text: 'Müəllim uğurla yeniləndi!' });
      } else {
        await createTeacher(data);
        setMessage({ type: 'success', text: 'Müəllim uğurla əlavə edildi!' });
      }

      resetForm();
      await fetchTeachers();
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
      await deleteTeacher(id);
      setMessage({ type: 'success', text: 'Müəllim silindi!' });
      setShowDeleteModal(false);
      setDeleteTargetId(null);
      resetForm();
      await fetchTeachers();
      await purgeAllCaches();
    } catch (error) {
      console.error('Xəta:', error);
      setMessage({ type: 'error', text: 'Silinmədi!' });
      setShowDeleteModal(false);
    }
  };

  const handleClearPhoto = () => {
    setShouldDeletePhoto(true);
    setPhotoFile(null);
    setPhotoPreview(null);
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
        <h1 className="text-3xl font-bold text-gray-dark">Müəllimlər</h1>
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
            {editingId ? 'Müəllimi Redaktə Et' : 'Yeni Müəllim Əlavə Et'}
          </h2>
          <form
            key={formKey}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sol tərəf - Foto */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Müəllimin Şəkli
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

                    <p className="text-xs text-gray-500 text-center">PNG, JPG, WEBP (max 2MB)</p>
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
                    Təcrübə (AZ)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="15+ il mühasibatlıq və audit təcrübəsi..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Təcrübə (EN)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.experience_en}
                    onChange={(e) => setFormData({ ...formData, experience_en: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="15+ years of accounting and audit experience..."
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-fadeIn">
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-dark text-center mb-2">
                Müəllimi silmək istədiyinizə əminsiniz?
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
