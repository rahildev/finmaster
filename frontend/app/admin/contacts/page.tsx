'use client';

import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getContacts, createContact, updateContact, deleteContact, purgeAllCaches } from '@/lib/admin-api';
import type { Contact } from '@/types/landing';
import { contactSchema, type ContactFormData } from '@/lib/validations';
import { toast } from 'sonner';
import ConfirmDialog from '@/components/ConfirmDialog';

export default function ContactsAdminPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { type: 'phone', label: '', label_en: '', value: '', icon: '', sort_order: 0 },
  });

  useEffect(() => {
    fetchContacts();
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

  const fetchContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error('Əlaqələr yüklənmədi:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    reset();
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (contact: Contact) => {
    reset({
      type: (contact.type as any) || 'phone',
      label: contact.label || '',
      label_en: (contact as any).label_en || '',
      value: contact.value || '',
      icon: contact.icon || '',
      sort_order: contact.sort_order || 0,
    });
    setShowForm(false);
    setEditingId(contact.id);
  };

  const onSubmit = async (data: ContactFormData) => {
    setSaving(true);
    try {
      if (editingId) {
        await updateContact(editingId, data);
        toast.success('Əlaqə uğurla yeniləndi!');
      } else {
        await createContact(data);
        toast.success('Əlaqə uğurla yaradıldı!');
      }
      resetForm();
      await fetchContacts();
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
      await deleteContact(deleteTarget);
      toast.success('Əlaqə silindi!');
      await fetchContacts();
    } catch (error) {
      console.error('Xəta:', error);
      toast.error('Silinmədi!');
    } finally {
      setDeleteTarget(null);
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      phone: 'Telefon', whatsapp: 'WhatsApp', email: 'Email',
      address: 'Ünvan', instagram: 'Instagram', youtube: 'YouTube',
      tiktok: 'TikTok', facebook: 'Facebook', linkedin: 'LinkedIn',
    };
    return labels[type] || type;
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Növ *</label>
        <select
          {...register('type')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="phone">Telefon</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="email">Email</option>
          <option value="address">Ünvan</option>
          <option value="instagram">Instagram</option>
          <option value="youtube">YouTube</option>
          <option value="tiktok">TikTok</option>
          <option value="facebook">Facebook</option>
          <option value="linkedin">LinkedIn</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Etiket (AZ) *</label>
        <input
          {...register('label')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Telefon"
        />
        {errors.label && <p className="text-sm text-red-600 mt-1">{errors.label.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Etiket (EN)</label>
        <input
          {...register('label_en')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Phone"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Dəyər *</label>
        <input
          {...register('value')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="+994 XX XXX XX XX"
        />
        {errors.value && <p className="text-sm text-red-600 mt-1">{errors.value.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">İkon (opsional)</label>
        <input
          {...register('icon')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="📞"
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
        <h1 className="text-3xl font-bold text-gray-dark">Əlaqə Məlumatları</h1>
        <button
          onClick={() => { reset(); setEditingId(null); setShowForm(true); }}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          + Yeni Əlaqə
        </button>
      </div>

      {showForm && editingId === null && (
        <div ref={formContainerRef} className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4">Yeni Əlaqə Əlavə Et</h2>
          {renderForm()}
        </div>
      )}

      <div className="grid gap-4">
        {contacts.map((contact) =>
          editingId === contact.id ? (
            <div key={contact.id} ref={formContainerRef} className="bg-white rounded-lg shadow-sm border border-primary/40 p-6">
              <h2 className="text-xl font-bold mb-4">Əlaqə Redaktə Et</h2>
              {renderForm()}
            </div>
          ) : (
            <div key={contact.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex justify-between items-center">
              <div className="flex items-center gap-4">
                {contact.icon && <span className="text-3xl">{contact.icon}</span>}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-primary uppercase px-2 py-1 bg-primary-light/20 rounded">
                      {getTypeLabel(contact.type)}
                    </span>
                    <span className="text-sm font-semibold text-gray-700">{contact.label}</span>
                  </div>
                  <p className="text-lg font-medium text-gray-dark">{contact.value}</p>
                  <div className="text-sm text-gray-500 mt-1">Sıra: {contact.sort_order}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(contact)}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Redaktə
                </button>
                <button
                  onClick={() => setDeleteTarget(contact.id)}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  Sil
                </button>
              </div>
            </div>
          )
        )}

        {contacts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Heç bir əlaqə məlumatı yoxdur. Yeni əlaqə əlavə edin.
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Əlaqə silinsin?"
        message="Bu əməliyyat geri qaytarıla bilməz."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
