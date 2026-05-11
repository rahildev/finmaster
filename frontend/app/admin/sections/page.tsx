'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface SectionSetting {
  id: number;
  section_key: string;
  section_name: string;
  is_visible: boolean;
  sort_order: number;
}

export default function SectionsPage() {
  const [sections, setSections] = useState<SectionSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/admin/sections`, {
        withCredentials: true,
      });
      setSections(response.data);
    } catch (err: any) {
      console.error('Error fetching sections:', err);
      setError('Section məlumatları yüklənə bilmədi');
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (id: number) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/admin/sections/${id}/toggle`,
        {},
        {
          withCredentials: true,
        }
      );

      // Update local state
      setSections((prev) =>
        prev.map((section) =>
          section.id === id
            ? { ...section, is_visible: response.data.section.is_visible }
            : section
        )
      );
    } catch (err: any) {
      console.error('Error toggling visibility:', err);
      setError('Görünürlük dəyişdirilə bilmədi');
    }
  };

  const getSectionIcon = (key: string) => {
    const icons: Record<string, string> = {
      hero: '🎯',
      teacher: '👨‍🏫',
      courses: '📚',
      videos: '🎥',
      faq: '❓',
      contact: '📞',
      certification: '🎓',
    };
    return icons[key] || '📄';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Yüklənir...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-dark mb-2">
          Səhifə Bölmələri
        </h1>
        <p className="text-gray-600">
          Main page-də hansı section-ların görünəcəyini idarə edin
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {sections.map((section) => (
            <div
              key={section.id}
              className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{getSectionIcon(section.section_key)}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-dark">
                    {section.section_name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Section Key: {section.section_key}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    section.is_visible
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {section.is_visible ? 'Görünür' : 'Gizli'}
                </span>

                <button
                  onClick={() => toggleVisibility(section.id)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    section.is_visible ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      section.is_visible ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex gap-2">
          <svg
            className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-sm text-blue-700">
            <p className="font-semibold mb-1">Qeyd:</p>
            <p>
              Gizli edilən section-lar main page-də görünməyəcək. Admin paneldə
              hələ də redaktə edə biləcəksiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
