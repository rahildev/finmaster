'use client';

import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getFaqs, createFaq, updateFaq, deleteFaq, purgeAllCaches } from '@/lib/admin-api';
import type { Faq } from '@/types/landing';
import { faqSchema, type FaqFormData } from '@/lib/validations';
import { toast } from 'sonner';
import ConfirmDialog from '@/components/ConfirmDialog';

export default function FaqsAdminPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(faqSchema),
    defaultValues: { question: '', question_en: '', answer: '', answer_en: '', sort_order: 0 },
  });

  useEffect(() => {
    fetchFaqs();
  }, []);

  useEffect(() => {
    const isOpen = showForm || editingId !== null;
    if (!isOpen) return;

    const handler = (e: MouseEvent) => {
      if (deleteTarget !== null) return;
      if (formContainerRef.current && !formContainerRef.current.contains(e.target as Node)) {
        reset();
        setEditingId(null);
        setShowForm(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showForm, editingId, deleteTarget, reset]);

  const fetchFaqs = async () => {
    try {
      const data = await getFaqs();
      setFaqs(data);
    } catch (error) {
      console.error('FAQs yüklənmədi:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    reset();
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (faq: Faq) => {
    reset({
      question: faq.question || '',
      question_en: (faq as any).question_en || '',
      answer: faq.answer || '',
      answer_en: (faq as any).answer_en || '',
      sort_order: faq.sort_order || 0,
    });
    setShowForm(false);
    setEditingId(faq.id);
  };

  const onSubmit = async (data: FaqFormData) => {
    setSaving(true);
    try {
      if (editingId) {
        await updateFaq(editingId, data);
        toast.success('FAQ uğurla yeniləndi!');
      } else {
        await createFaq(data);
        toast.success('FAQ uğurla yaradıldı!');
      }
      resetForm();
      await fetchFaqs();
      await purgeAllCaches();
    } catch (error) {
      console.error('Xəta:', error);
      toast.error('Xəta baş verdi!');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteFaq(deleteTarget);
      toast.success('FAQ silindi!');
      await fetchFaqs();
      await purgeAllCaches();
    } catch (error) {
      console.error('Xəta:', error);
      toast.error('Silinmədi!');
    } finally {
      setDeleteTarget(null);
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Sual (AZ) *</label>
        <input
          {...register('question')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Kurslar nə qədər çəkir?"
        />
        {errors.question && <p className="text-sm text-red-600 mt-1">{errors.question.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Sual (EN)</label>
        <input
          {...register('question_en')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="How long do the courses last?"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Cavab (AZ) *</label>
        <textarea
          {...register('answer')}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Kurslarımız 2-3 ay arası davam edir..."
        />
        {errors.answer && <p className="text-sm text-red-600 mt-1">{errors.answer.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Cavab (EN)</label>
        <textarea
          {...register('answer_en')}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Our courses last between 2-3 months..."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Sıra</label>
        <input
          type="number"
          {...register('sort_order', { valueAsNumber: true })}
          className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Yadda saxlanılır...' : editingId ? 'Yenilə' : 'Yadda Saxla'}
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
        <h1 className="text-3xl font-bold text-gray-dark">Tez-Tez Verilən Suallar</h1>
        <button
          onClick={() => { reset(); setEditingId(null); setShowForm(true); }}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          + Yeni FAQ
        </button>
      </div>

      {showForm && editingId === null && (
        <div ref={formContainerRef} className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4">Yeni FAQ Əlavə Et</h2>
          {renderForm()}
        </div>
      )}

      <div className="grid gap-4">
        {faqs.map((faq) =>
          editingId === faq.id ? (
            <div key={faq.id} ref={formContainerRef} className="bg-white rounded-lg shadow-sm border border-primary/40 p-6">
              <h2 className="text-xl font-bold mb-4">FAQ Redaktə Et</h2>
              {renderForm()}
            </div>
          ) : (
            <div key={faq.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-gray-dark flex-1">{faq.question}</h3>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(faq)}
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    Redaktə
                  </button>
                  <button
                    onClick={() => setDeleteTarget(faq.id)}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Sil
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-2">{faq.answer}</p>
              <div className="text-sm text-gray-500">Sıra: {faq.sort_order}</div>
            </div>
          )
        )}

        {faqs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Heç bir FAQ yoxdur. Yeni FAQ əlavə edin.
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="FAQ silinsin?"
        message="Bu əməliyyat geri qaytarıla bilməz."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
