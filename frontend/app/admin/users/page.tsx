'use client';

import { useEffect, useState } from 'react';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getAvailablePermissions,
  type AdminUser,
  type Permission,
} from '@/lib/admin-api';

export default function UsersAdminPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
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
    email: '',
    password: '',
    selectedPermissions: [] as string[],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersData, permsData] = await Promise.all([
        getUsers(),
        getAvailablePermissions(),
      ]);
      setUsers(usersData);
      setPermissions(permsData);
    } catch (error) {
      console.error('Xəta:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      selectedPermissions: [],
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (user: AdminUser) => {
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      selectedPermissions: user.permissions || [],
    });
    setEditingId(user.id);
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
        name: formData.name,
        email: formData.email,
        permissions: formData.selectedPermissions,
      };

      if (formData.password) {
        data.password = formData.password;
      }

      if (editingId) {
        await updateUser(editingId, data);
        setMessage({ type: 'success', text: 'İstifadəçi uğurla yeniləndi!' });
      } else {
        if (!formData.password) {
          setMessage({ type: 'error', text: 'Şifrə tələb olunur!' });
          setSaving(false);
          return;
        }
        await createUser(data);
        setMessage({ type: 'success', text: 'İstifadəçi uğurla əlavə edildi!' });
      }

      resetForm();
      await fetchData();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Xəta baş verdi!';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setMessage({ type: 'success', text: 'İstifadəçi silindi!' });
      setShowDeleteModal(false);
      setDeleteTargetId(null);
      resetForm();
      await fetchData();
    } catch (error) {
      console.error('Xəta:', error);
      setMessage({ type: 'error', text: 'Silinmədi!' });
      setShowDeleteModal(false);
    }
  };

  const togglePermission = (permKey: string) => {
    setFormData(prev => ({
      ...prev,
      selectedPermissions: prev.selectedPermissions.includes(permKey)
        ? prev.selectedPermissions.filter(p => p !== permKey)
        : [...prev.selectedPermissions, permKey],
    }));
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
        <h1 className="text-3xl font-bold text-gray-dark">İstifadəçilər</h1>
        <button
          onClick={() => {
            setFormKey(prev => prev + 1);
            setShowForm(true);
          }}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          + Yeni İstifadəçi
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
            {editingId ? 'İstifadəçini Redaktə Et' : 'Yeni İstifadəçi Əlavə Et'}
          </h2>
          <form key={formKey} onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ad *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ali Məmmədov"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="ali@finmaster.az"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Şifrə {editingId ? '(boş buraxın dəyişdirmək istəmirsinizsə)' : '*'}
              </label>
              <input
                type="password"
                required={!editingId}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                İcazələr
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {permissions.map((perm) => (
                  <label
                    key={perm.key}
                    className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.selectedPermissions.includes(perm.key)
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.selectedPermissions.includes(perm.key)}
                      onChange={() => togglePermission(perm.key)}
                      className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span className="text-2xl">{perm.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{perm.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
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
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-dark">📧 {user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <button
                  onClick={() => handleEdit(user)}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Redaktə
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {permissions.map((perm) => {
                  const hasPermission = user.permissions.includes(perm.key);
                  return (
                    <div
                      key={perm.key}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
                        hasPermission
                          ? 'bg-green-50 text-green-700'
                          : 'bg-gray-50 text-gray-400'
                      }`}
                    >
                      <span>{hasPermission ? '✓' : '✗'}</span>
                      <span>{perm.icon}</span>
                      <span className="font-medium">{perm.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {users.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Heç bir istifadəçi yoxdur. Yeni istifadəçi əlavə edin.
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
                İstifadəçini silmək istədiyinizə əminsiniz?
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Bu əməliyyat geri qaytarıla bilməz.
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
