import axios from 'axios';
import type { LandingPageData } from '@/types/landing';

/**
 * API Service - Backend ilə əlaqə
 * Base URL: http://localhost:8000
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

/**
 * Landing page datasını çəkir
 * GET /api/landing
 */
export async function getLandingPageData(): Promise<LandingPageData> {
  const res = await fetch(`${API_BASE_URL}/api/landing`, {
    next: { revalidate: 60, tags: ['landing'] },
    headers: { 'Accept': 'application/json' },
  });
  if (!res.ok) throw new Error('Landing page datası yüklənə bilmədi');
  return res.json();
}

/**
 * İmage URL-i düzgün formata gətirir
 * Backend-dən gələn path-ları frontend üçün hazırlayır
 */
export function getImageUrl(path: string | null): string | null {
  if (!path) return null;

  // Əgər tam URL-dirsə, birbaşa qaytar
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // /storage/ ilə başlayırsa, backend URL-i əlavə et
  if (path.startsWith('/storage/')) {
    return `${API_BASE_URL}${path}`;
  }

  return path;
}

export default apiClient;
