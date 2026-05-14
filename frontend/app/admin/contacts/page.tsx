'use client';

import { useEffect, useState } from 'react';
import { getContacts, createContact, updateContact, deleteContact, purgeAllCaches } from '@/lib/admin-api';
import type { Contact } from '@/types/landing';
import { toast } from 'sonner';
import ConfirmDialog from '@/components/ConfirmDialog';

export default function ContactsAdminPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    type: 'phone',
    label: '',
    label_en: '',
    value: '',
    icon: '',
    sort_order: 0,
  });

  useEffect(() => {
    fetchContacts();
  }, []);

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
    setFormData({
      type: 'phone',
      label: '',
      label_en: '',
      value: '',
      icon: '',
      sort_order: 0,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (contact: Contact) => {
    setFormData({
      type: contact.type || 'phone',
      label: contact.label || '',
      label_en: (contact as any).label_en || '',
      value: contact.value || '',
      icon: contact.icon || '',
      sort_order: contact.sort_order || 0,
    });
    setEditingId(contact.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateContact(editingId, formData);
        toast.success('Əlaqə uğurla yeniləndi!');
      } else {
        await createContact(formData);
        toast.success('Əlaqə uğurla yaradıldı!');
      }

      resetForm();
      await fetchContacts();
      await purgeAllCaches();
    } catch (error) {
      console.error('Xəta:', error);
      toast.error('Xəta baş verdi!');
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
      phone: 'Telefon',
      whatsapp: 'WhatsApp',
      email: 'Email',
      address: 'Ünvan',
      instagram: 'Instagram',
      youtube: 'YouTube',
      tiktok: 'TikTok',
      linkedin: 'LinkedIn',
    };
    return labels[type] || type;
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
        <h1 className="text-3xl font-bold text-gray-dark">Əlaqə Məlumatları</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          + Yeni Əlaqə
        </button>
      </div>

      {showForm && (
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? 'Əlaqə Redaktə Et' : 'Yeni Əlaqə Əlavə Et'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Növ *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="phone">Telefon</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Email</option>
                <option value="address">Ünvan</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="tiktok">TikTok</option>
                <option value="linkedin">LinkedIn</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Etiket (AZ) *
              </label>
              <input
                type="text"
                required
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Telefon"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Etiket (EN)
              </label>
              <input
                type="text"
                value={formData.label_en}
                onChange={(e) => setFormData({ ...formData, label_en: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Phone"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Dəyər *
              </label>
              <input
                type="text"
                required
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="+994 XX XXX XX XX"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                İkon (opsional)
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="📞"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sıra
              </label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                {editingId ? 'Yenilə' : 'Yadda Saxla'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Ləğv Et
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex justify-between items-center"
          >
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
        ))}

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
