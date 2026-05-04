'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCourses, getVideos, getFaqs, getContacts } from '@/lib/admin-api';

/**
 * Admin Dashboard
 * Statistika və sürətli keçidlər
 */

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    courses: 0,
    videos: 0,
    faqs: 0,
    contacts: 0,
  });

  const [loading, setLoading] = useState(true);
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    // Get user permissions from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user: User = JSON.parse(userStr);
      setUserPermissions(user.permissions || []);
      setIsSuperAdmin(user.role === 'super_admin');
    }
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [courses, videos, faqs, contacts] = await Promise.all([
          getCourses(),
          getVideos(),
          getFaqs(),
          getContacts(),
        ]);

        setStats({
          courses: courses.length,
          videos: videos.length,
          faqs: faqs.length,
          contacts: contacts.length,
        });
      } catch (error) {
        console.error('Stats yüklənmədi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const hasPermission = (permission: string) => {
    return isSuperAdmin || userPermissions.includes(permission);
  };

  const allCards = [
    { title: 'Kurslar', count: stats.courses, icon: '📚', href: '/admin/courses', color: 'bg-blue-500', permission: 'manage_courses' },
    { title: 'Videolar', count: stats.videos, icon: '🎥', href: '/admin/videos', color: 'bg-purple-500', permission: 'manage_videos' },
    { title: 'FAQ', count: stats.faqs, icon: '❓', href: '/admin/faqs', color: 'bg-green-500', permission: 'manage_faqs' },
    { title: 'Əlaqə', count: stats.contacts, icon: '📞', href: '/admin/contacts', color: 'bg-orange-500', permission: 'manage_contacts' },
  ];

  const allQuickActions = [
    { title: 'Hero Section Redaktə Et', href: '/admin/hero', icon: '🎯', permission: 'manage_hero' },
    { title: 'Müəllim Məlumatı', href: '/admin/teacher', icon: '👨‍🏫', permission: 'manage_teacher' },
    { title: 'Yeni Kurs Əlavə Et', href: '/admin/courses', icon: '➕', permission: 'manage_courses' },
    { title: 'Yeni Video Əlavə Et', href: '/admin/videos', icon: '➕', permission: 'manage_videos' },
  ];

  // Filter based on permissions
  const cards = allCards.filter(card => hasPermission(card.permission));
  const quickActions = allQuickActions.filter(action => hasPermission(action.permission));

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
      <h1 className="text-3xl font-bold text-gray-dark mb-8">Dashboard</h1>

      {cards.length === 0 && quickActions.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-semibold text-gray-dark mb-2">İcazə yoxdur</h2>
          <p className="text-gray-600">
            Hal-hazırda heç bir bölməyə giriş icazəniz yoxdur. Super admin ilə əlaqə saxlayın.
          </p>
        </div>
      ) : (
        <>
          {/* Statistika Kartları */}
          {cards.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {cards.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center text-2xl`}>
                      {card.icon}
                    </div>
                    <span className="text-3xl font-bold text-gray-dark">{card.count}</span>
                  </div>
                  <h3 className="text-gray-600 font-medium">{card.title}</h3>
                </Link>
              ))}
            </div>
          )}

          {/* Sürətli Əməliyyatlar */}
          {quickActions.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-dark mb-4">Sürətli Əməliyyatlar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action) => (
                  <Link
                    key={action.title}
                    href={action.href}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-gray-50 transition-all"
                  >
                    <span className="text-2xl mr-3">{action.icon}</span>
                    <span className="font-medium text-gray-dark">{action.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
