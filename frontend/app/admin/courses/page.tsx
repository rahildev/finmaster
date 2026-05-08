'use client';

import { useEffect, useState } from 'react';
import { getCourses, createCourse, updateCourse, deleteCourse } from '@/lib/admin-api';
import type { Course } from '@/types/landing';
import { getImageUrl } from '@/lib/api';

export default function CoursesAdminPage() {
  const [courses, setCourses] = useState<Course[]>([]);
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
    name_en: '',
    description: '',
    description_en: '',
    duration: '',
    duration_en: '',
    price: '',
    sort_order: 0,
    is_active: true,
  });

  const emptyContent = { heading: '', intro: '', about: '', list_heading: '', bullets: ['', '', '', ''], outro: '' };
  const [pageContent, setPageContent] = useState(emptyContent);
  const [pageContentEn, setPageContentEn] = useState(emptyContent);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [shouldDeleteImage, setShouldDeleteImage] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.error('Kurslar yüklənmədi:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      name_en: '',
      description: '',
      description_en: '',
      duration: '',
      duration_en: '',
      price: '',
      sort_order: 0,
      is_active: true,
    });
    setPageContent(emptyContent);
    setPageContentEn(emptyContent);
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

  const handleEdit = (course: Course) => {
    const imgUrl = course.image_url ? getImageUrl(course.image_url) : null;
    setFormData({
      name: course.name || '',
      name_en: (course as any).name_en || '',
      description: course.description || '',
      description_en: (course as any).description_en || '',
      duration: course.duration || '',
      duration_en: (course as any).duration_en || '',
      price: course.price || '',
      sort_order: course.sort_order || 0,
      is_active: course.is_active ?? true,
    });
    const is33 = (course.name || '').includes('33');
    const pc = (course as any).page_content;
    const pce = (course as any).page_content_en;
    const defaultAz = is33 ? {
      heading: 'Güclü karyera, doğru sistemlə başlayır.',
      intro: '"33 addımda mühasibat uçotu" ilə peşəkar inkişaf yolunuza bu gün başlaya bilmək imkanınız vardır.',
      about: 'Finmaster Academiyasının akademik və sistemli tədris yanaşması ilə hazırlamış olduğu bu proqram, karyerasında güclü təməl qurmaq və peşəkar səviyyəyə yüksəlmək istəyənlər üçün nəzərdə tutulmuşdur.',
      list_heading: '"33 Addımda Mühasibat uçotu" proqramı müddətində siz :',
      bullets: [
        'Mühasibatın uçotunun əsas strukturunu öyrənəcək ,',
        'Maliyyə hesabatlarını analiz etmə bacarığınızı inkişaf etdirəcək ,',
        'Real tətbiqlər üzərindən praktiki təcrübə qazanacaq ,',
        'Müasir maliyyə sistemlərinə dair peşəkar baxış əldə edəcəksiniz.',
      ],
      outro: '33 (otuz üç) dərs günündən, yəni 66 (altmış altı) saatdan ibarət proqram müddətində tələbələr məxsusi olaraq hazırlanmış dərs materialları və mənimsəmə dərəcəsini yüksəltmək məqsədilə seçilmiş yoxlama suallar ilə (düzgün cavablar daxil olmaqla) təmin olunmaqdadır.',
    } : emptyContent;
    const defaultEn = is33 ? {
      heading: 'A strong career begins with the right system.',
      intro: 'With "Accounting in 33 Steps", you can start your professional development journey today.',
      about: 'This program, developed with the academic and systematic teaching approach of Finmaster Academy, is designed for those who want to build a strong foundation in their career and advance to a professional level.',
      list_heading: 'During the "Accounting in 33 Steps" program, you will:',
      bullets: [
        'Learn the fundamental structure of accounting,',
        'Develop your skills in analyzing financial statements,',
        'Gain practical experience through real-world applications,',
        'Obtain a professional perspective on modern financial systems.',
      ],
      outro: 'Throughout the program consisting of 33 (thirty-three) lesson days, i.e. 66 (sixty-six) hours, students are provided with specially prepared lesson materials and selected review questions (including correct answers) to enhance their level of comprehension.',
    } : emptyContent;
    setPageContent(pc && Object.keys(pc).length > 0 ? { ...emptyContent, ...pc, bullets: pc.bullets?.length ? pc.bullets : defaultAz.bullets } : defaultAz);
    setPageContentEn(pce && Object.keys(pce).length > 0 ? { ...emptyContent, ...pce, bullets: pce.bullets?.length ? pce.bullets : defaultEn.bullets } : defaultEn);
    setImagePreview(imgUrl);
    setOriginalImageUrl(imgUrl);
    setShouldDeleteImage(false);
    setEditingId(course.id);
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
      data.append('name_en', formData.name_en);
      data.append('description', formData.description);
      data.append('description_en', formData.description_en);
      data.append('duration', formData.duration);
      data.append('duration_en', formData.duration_en);
      data.append('price', formData.price);
      data.append('sort_order', formData.sort_order.toString());
      data.append('is_active', formData.is_active ? '1' : '0');

      if (imageFile) {
        data.append('image', imageFile);
      } else if (shouldDeleteImage) {
        data.append('delete_image', '1');
      }

      if (formData.name.includes('33')) {
        const cleanBullets = (bullets: string[]) => bullets.filter(b => b.trim() !== '');
        const pcAz = { ...pageContent, bullets: cleanBullets(pageContent.bullets) };
        const pcEn = { ...pageContentEn, bullets: cleanBullets(pageContentEn.bullets) };
        data.append('page_content', JSON.stringify(pcAz));
        data.append('page_content_en', JSON.stringify(pcEn));
      }

      if (editingId) {
        await updateCourse(editingId, data);
        setMessage({ type: 'success', text: 'Kurs uğurla yeniləndi!' });
      } else {
        await createCourse(data);
        setMessage({ type: 'success', text: 'Kurs uğurla əlavə edildi!' });
      }

      resetForm();
      await fetchCourses();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Xəta baş verdi!';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCourse(id);
      setMessage({ type: 'success', text: 'Kurs silindi!' });
      setShowDeleteModal(false);
      setDeleteTargetId(null);
      resetForm();
      await fetchCourses();
    } catch (error) {
      console.error('Xəta:', error);
      setMessage({ type: 'error', text: 'Silinmədi!' });
      setShowDeleteModal(false);
    }
  };

  const handleClearImage = () => {
    setShouldDeleteImage(true);
    setImageFile(null);
    setImagePreview(null);
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
        <h1 className="text-3xl font-bold text-gray-dark">Kurslar</h1>
        <button
          onClick={() => {
            setFormKey(prev => prev + 1);
            setShowForm(true);
          }}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          + Yeni Kurs
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
            {editingId ? 'Kursu Redaktə Et' : 'Yeni Kurs Əlavə Et'}
          </h2>
          <form key={formKey} onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sol tərəf - Şəkil */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kurs Şəkli
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {imagePreview ? (
                    <div className="relative w-full aspect-video max-w-md mx-auto mb-4 rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Kurs"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-video max-w-md mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-5xl text-gray-300">📚</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setImageFile(file);
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setImagePreview(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />

                    <label
                      htmlFor="image-upload"
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {imagePreview ? 'Şəkili Dəyiş' : 'Şəkil Seç'}
                    </label>

                    {imagePreview && (
                      <button
                        type="button"
                        onClick={handleClearImage}
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
                    Kurs Adı (AZ) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Mühasibatlıq Əsasları"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kurs Adı (EN) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name_en}
                    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Accounting Basics"
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
                    placeholder="Kurs haqqında qısa məlumat..."
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
                    placeholder="Brief description about the course..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Müddət (AZ)
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="3 ay"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Müddət (EN)
                  </label>
                  <input
                    type="text"
                    value={formData.duration_en}
                    onChange={(e) => setFormData({ ...formData, duration_en: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="3 months"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Qiymət *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="500"
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
              </div>
            </div>

            {/* 33-step page content — only shown for 33-step course */}
            {formData.name.includes('33') && (
              <div className="border-t border-gray-200 pt-6 space-y-6">
                <h3 className="text-lg font-bold text-gray-800">Səhifə Məzmunu (33 Addım)</h3>

                {/* AZ */}
                <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">AZ</p>
                  {(['heading', 'intro', 'about', 'list_heading', 'outro'] as const).map(field => (
                    <div key={field}>
                      <label className="block text-xs font-semibold text-gray-500 mb-1 capitalize">{field.replace('_', ' ')}</label>
                      <textarea rows={2} value={pageContent[field]} onChange={e => setPageContent({ ...pageContent, [field]: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Siyahı (hər sətir ayrıca)</label>
                    {pageContent.bullets.map((b, i) => (
                      <input key={i} type="text" value={b}
                        onChange={e => { const arr = [...pageContent.bullets]; arr[i] = e.target.value; setPageContent({ ...pageContent, bullets: arr }); }}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg mb-1 focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder={`Maddə ${i + 1}`} />
                    ))}
                  </div>
                </div>

                {/* EN */}
                <div className="space-y-3 bg-green-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-green-700 uppercase tracking-wider">EN</p>
                  {(['heading', 'intro', 'about', 'list_heading', 'outro'] as const).map(field => (
                    <div key={field}>
                      <label className="block text-xs font-semibold text-gray-500 mb-1 capitalize">{field.replace('_', ' ')}</label>
                      <textarea rows={2} value={pageContentEn[field]} onChange={e => setPageContentEn({ ...pageContentEn, [field]: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Bullets (each on a line)</label>
                    {pageContentEn.bullets.map((b, i) => (
                      <input key={i} type="text" value={b}
                        onChange={e => { const arr = [...pageContentEn.bullets]; arr[i] = e.target.value; setPageContentEn({ ...pageContentEn, bullets: arr }); }}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg mb-1 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder={`Item ${i + 1}`} />
                    ))}
                  </div>
                </div>
              </div>
            )}

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
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex justify-between items-start"
            >
              <div className="flex gap-4 flex-1">
                {course.image_url && (
                  <div className="w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={getImageUrl(course.image_url) || ''}
                      alt={course.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-dark mb-1">{course.name}</h3>
                  {course.description && (
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{course.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {course.duration && <span>📅 {course.duration}</span>}
                    <span>💰 {course.price} ₼</span>
                    <span className={course.is_active ? 'text-green-600' : 'text-gray-400'}>
                      {course.is_active ? '✓ Aktiv' : '✗ Deaktiv'}
                    </span>
                    <span>Sıra: {course.sort_order}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(course)}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Redaktə
                </button>
              </div>
            </div>
          ))}

          {courses.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Heç bir kurs yoxdur. Yeni kurs əlavə edin.
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
                Kursu silmək istədiyinizə əminsiniz?
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
