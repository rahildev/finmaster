'use client';

import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getAvailablePermissions,
  type AdminUser,
  type Permission,
} from '@/lib/admin-api';
import { userUpdateSchema, type UserUpdateFormData } from '@/lib/validations';
import { toast } from 'sonner';
import ConfirmDialog from '@/components/ConfirmDialog';

export default function UsersAdminPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      permissions: [] as string[],
    },
  });

  const selectedPermissions = watch('permissions') || [];

  useEffect(() => {
    fetchData();
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
    reset();
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (user: AdminUser) => {
    reset({
      name: user.name,
      username: user.username || '',
      email: user.email,
      password: '',
      permissions: user.permissions || [],
    });
    setShowForm(false);
    setEditingId(user.id);
  };

  const togglePermission = (permKey: string) => {
    const current = selectedPermissions;
    const updated = current.includes(permKey)
      ? current.filter(p => p !== permKey)
      : [...current, permKey];
    setValue('permissions', updated);
  };

  const onSubmit = async (data: UserUpdateFormData) => {
    if (!editingId && !data.password) {
      toast.error('Yeni istifadəçi üçün şifrə tələb olunur!');
      return;
    }

    setSaving(true);
    try {
      const payload: any = {
        name: data.name,
        username: data.username,
        email: data.email,
        permissions: data.permissions || [],
      };
      if (data.password) payload.password = data.password;

      if (editingId) {
        await updateUser(editingId, payload);
        toast.success('İstifadəçi uğurla yeniləndi!');
      } else {
        await createUser(payload);
        toast.success('İstifadəçi uğurla əlavə edildi!');
      }

      resetForm();
      await fetchData();
    } catch (error: any) {
      const serverErrors = error?.response?.data?.errors;
      const errorMessage = serverErrors
        ? Object.values(serverErrors).flat().join(' | ')
        : error?.response?.data?.message || error?.message || 'Xəta baş verdi!';
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteUser(deleteTarget);
      toast.success('İstifadəçi silindi!');
      resetForm();
      await fetchData();
    } catch (error) {
      console.error('Xəta:', error);
      toast.error('Silinmədi!');
    } finally {
      setDeleteTarget(null);
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Ad *</label>
          <input {...register('name')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Ali Məmmədov" />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">İstifadəçi adı *</label>
          <input {...register('username')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="ali_memmedov" />
          {errors.username && <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
        <input type="email" {...register('email')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="ali@finmaster.az" />
        {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Şifrə {editingId ? '(boş buraxın dəyişdirmək istəmirsinizsə)' : '*'}
        </label>
        <input type="password" {...register('password')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="••••••••" />
        {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">İcazələr</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {permissions.map((perm) => (
            <label
              key={perm.key}
              className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedPermissions.includes(perm.key) ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedPermissions.includes(perm.key)}
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
        <h1 className="text-3xl font-bold text-gray-dark">İstifadəçilər</h1>
        <button
          onClick={() => { reset(); setEditingId(null); setShowForm(true); }}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          + Yeni İstifadəçi
        </button>
      </div>

      {showForm && editingId === null && (
        <div ref={formContainerRef} className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4">Yeni İstifadəçi Əlavə Et</h2>
          {renderForm()}
        </div>
      )}

      <div className="grid gap-4">
        {users.map((user) =>
          editingId === user.id ? (
            <div key={user.id} ref={formContainerRef} className="bg-white rounded-lg shadow-sm border border-primary/40 p-6">
              <h2 className="text-xl font-bold mb-4">İstifadəçini Redaktə Et</h2>
              {renderForm()}
            </div>
          ) : (
            <div key={user.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-dark">{user.name}</h3>
                  <p className="text-sm text-gray-500 font-mono">@{user.username}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <button onClick={() => handleEdit(user)} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  Redaktə
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {permissions.map((perm) => {
                  const hasPermission = user.permissions.includes(perm.key);
                  return (
                    <div key={perm.key} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${hasPermission ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'}`}>
                      <span>{hasPermission ? '✓' : '✗'}</span>
                      <span>{perm.icon}</span>
                      <span className="font-medium">{perm.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        )}
        {users.length === 0 && (
          <div className="text-center py-12 text-gray-500">Heç bir istifadəçi yoxdur. Yeni istifadəçi əlavə edin.</div>
        )}
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="İstifadəçi silinsin?"
        message="Bu əməliyyat geri qaytarıla bilməz."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
