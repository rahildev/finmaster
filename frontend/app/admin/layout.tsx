'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface AdminLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: '📊', permission: '' },
  { name: 'Səhifə Bölmələri', href: '/admin/sections', icon: '⚙️', superAdminOnly: true },
  { name: 'Hero Section', href: '/admin/hero', icon: '🎯', permission: 'manage_hero' },
  { name: 'Haqqımızda', href: '/admin/teacher', icon: '👨‍🏫', permission: 'manage_teachers' },
  { name: 'Kurslar', href: '/admin/courses', icon: '📚', permission: 'manage_courses' },
  { name: 'Videolar', href: '/admin/videos', icon: '🎥', permission: 'manage_videos' },
  { name: 'FAQ', href: '/admin/faqs', icon: '❓', permission: 'manage_faqs' },
  { name: 'Əlaqə', href: '/admin/contacts', icon: '📞', permission: 'manage_contacts' },
  { name: 'İstifadəçilər', href: '/admin/users', icon: '👥', superAdminOnly: true },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout, isSuperAdmin, hasPermission } = useAuth();
  const [purging, setPurging] = useState(false);

  const handlePurgeCache = async () => {
    setPurging(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admin/purge-cache`, {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        toast.success('Keş uğurla təmizləndi');
      } else {
        toast.error('Keş təmizlənərkən xəta baş verdi');
      }
    } catch {
      toast.error('Xəta baş verdi');
    } finally {
      setPurging(false);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const visibleMenu = menuItems.filter((item) => {
    if (item.superAdminOnly) return isSuperAdmin();
    if (!item.permission) return true;
    return hasPermission(item.permission);
  });

  const initials = user.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-dark text-white flex-shrink-0 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">Finmaster</h1>
          {user && (
            <p className="text-primary-light text-sm">
              {isSuperAdmin() ? 'Super Admin' : 'Admin'}
            </p>
          )}
        </div>

        <nav className="mt-6 flex-1">
          {visibleMenu.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/admin' && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-6 py-3 text-sm transition-colors ${
                  isActive
                    ? 'bg-primary text-white border-l-4 border-primary-light'
                    : 'text-white/80 hover:bg-primary/50 hover:text-white'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/10">
          <Link
            href="/"
            target="_blank"
            className="flex items-center text-sm text-white/80 hover:text-white transition-colors mb-4"
          >
            <span className="mr-2">🌐</span>
            Saytı Aç
          </Link>
          <button
            onClick={logout}
            className="flex items-center text-sm text-white/80 hover:text-white transition-colors w-full"
          >
            <span className="mr-2">🚪</span>
            Çıxış
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-dark">Admin Panel</h2>
            <div className="flex items-center space-x-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePurgeCache}
                  disabled={purging}
                  className="px-3 py-1.5 text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors disabled:opacity-50"
                >
                  {purging ? 'Təmizlənir...' : '🗑 Keşi Təmizlə'}
                </button>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-dark">{user.name}</p>
              </div>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {initials}
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
