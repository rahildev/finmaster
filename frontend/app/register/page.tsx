'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUsernameError('');
    setSuccess(false);

    // Şifrə yoxlaması
    if (formData.password !== formData.confirmPassword) {
      setError('Şifrələr uyğun gəlmir');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Şifrə ən azı 6 simvoldan ibarət olmalıdır');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/register`,
        {
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );

      setSuccess(true);

      // 3 saniyə sonra login səhifəsinə yönləndir
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err: any) {
      const errors = err?.response?.data?.errors;
      if (errors?.username) {
        setUsernameError('Bu istifadəçi adı artıq mövcuddur');
      } else if (errors) {
        const msgs = Object.entries(errors)
          .filter(([key]) => key !== 'username')
          .flatMap(([, v]) => v as string[]);
        setError(msgs.join(', ') || 'Qeydiyyat uğursuz oldu');
      } else {
        setError(err?.response?.data?.message || 'Qeydiyyat uğursuz oldu');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-dark mb-2">Qeydiyyat Uğurlu!</h2>
            <p className="text-gray-600 mb-4">
              Hesabınız yaradıldı. Super admin sizə icazələr verəndən sonra daxil ola biləcəksiniz.
            </p>
            <p className="text-sm text-gray-500">
              3 saniyə sonra giriş səhifəsinə yönləndiriləcəksiniz...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center relative z-10 -mb-16 mt-8">
          <Link href="/" onClick={() => window.scrollTo({ top: 0 })}>
            <img src="/brand/finmaster-logo.png" alt="FinMaster Academy" className="h-60 w-auto -translate-x-6 cursor-pointer" />
          </Link>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 px-8 pb-8 pt-20">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Ad və Soyad
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="Ali Məmmədov"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                İstifadəçi adı
              </label>
              <input
                type="text"
                id="username"
                required
                value={formData.username}
                onChange={(e) => { setUsernameError(''); setFormData({ ...formData, username: e.target.value }); }}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
                  usernameError
                    ? 'border-red-500 focus:ring-red-300 text-red-700'
                    : 'border-gray-300 focus:ring-primary'
                }`}
                placeholder="Istifadeci Adi"
                disabled={loading}
              />
              {usernameError && (
                <p className="mt-1.5 text-xs text-red-600">{usernameError}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="ali@example.com"
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
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Şifrəni Təsdiqlə
              </label>
              <input
                type="password"
                id="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Qeydiyyat aparılır...' : 'Qeydiyyatdan keç'}
            </button>

            <p className="font-inter text-center text-sm text-gray-500 mt-4">
              Artıq hesabınız var?{' '}
              <Link href="/login" className="text-[#0A4D2C] font-semibold hover:underline">
                Daxil ol
              </Link>
            </p>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          <Link href="/" className="hover:text-primary">
            ← Ana səhifəyə qayıt
          </Link>
        </p>
      </div>
    </div>
  );
}
