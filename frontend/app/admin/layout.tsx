'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

/**
 * Admin Panel Layout
 * Sidebar + Content Area
 */

interface AdminLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: '📊' },
  { name: 'Səhifə Bölmələri', href: '/admin/sections', icon: '⚙️', superAdminOnly: true },
  { name: 'Hero Section', href: '/admin/hero', icon: '🎯' },
  { name: 'Müəllim', href: '/admin/teacher', icon: '👨‍🏫' },
  { name: 'Kurslar', href: '/admin/courses', icon: '📚' },
  { name: 'Videolar', href: '/admin/videos', icon: '🎥' },
  { name: 'FAQ', href: '/admin/faqs', icon: '❓' },
  { name: 'Əlaqə', href: '/admin/contacts', icon: '📞' },
  { name: 'İstifadəçilər', href: '/admin/users', icon: '👥', superAdminOnly: true },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-dark text-white flex-shrink-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">Finmaster</h1>
          <p className="text-primary-light text-sm">Admin Panel</p>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));

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

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Link
            href="/"
            target="_blank"
            className="flex items-center text-sm text-white/80 hover:text-white transition-colors"
          >
            <span className="mr-2">🌐</span>
            Saytı Aç
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-dark">
              Admin Panel
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Admin</span>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
