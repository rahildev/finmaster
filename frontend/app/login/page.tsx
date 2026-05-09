'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.username, formData.password);
    } catch (err: any) {
      setError(err?.message || 'Giriş uğursuz oldu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-center relative z-10 -mb-16 mt-8 overflow-hidden">
          <Link href="/" onClick={() => window.scrollTo({ top: 0 })}>
            <Image src="/brand/finmaster-logo.png" alt="FinMaster Academy" width={0} height={0} sizes="100vw" className="h-60 max-w-full w-auto -translate-x-6 cursor-pointer" unoptimized />
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 px-8 pb-8 pt-20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                İstifadəçi adı
              </label>
              <input
                type="text"
                id="username"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="İstifadəçi adınızı daxil edin"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Şifrə
              </label>
              <input
                type="password"
                id="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="Şifrənizi daxil edin"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Giriş edilir...' : 'Daxil ol'}
            </button>

            <p className="font-inter text-center text-xs text-gray-500 mt-4">
              Hesabınız yoxdur?{' '}
              <Link href="/register" className="text-[#0A4D2C] font-semibold hover:underline">
                Qeydiyyatdan keçin
              </Link>
            </p>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6" suppressHydrationWarning>
          © {new Date().getFullYear()} FinMaster Academy. Bütün hüquqlar qorunur.
        </p>
      </div>
    </div>
  );
}
