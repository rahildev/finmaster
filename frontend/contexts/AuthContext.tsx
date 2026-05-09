'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'super_admin' | 'admin';
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isSuperAdmin: () => boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchMe();
  }, []);

  const fetchMe = async () => {
    try {
      const res = await fetch(`${API_URL}/api/me`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    const res = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || 'Giriş uğursuz oldu');
    }

    const data = await res.json();
    setUser(data.user);
    router.push('/admin');
  };

  const logout = async () => {
    await fetch(`${API_URL}/api/logout`, {
      method: 'POST',
      credentials: 'include',
    }).catch(() => {});
    setUser(null);
    router.push('/login');
  };

  const isSuperAdmin = () => user?.role === 'super_admin';

  const hasPermission = (permission: string) => {
    if (!user) return false;
    if (user.role === 'super_admin') return true;
    return user.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isSuperAdmin, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
