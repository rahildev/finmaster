'use client';

import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ReactNode, useEffect } from 'react';

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function LanguageTransition({ children }: { children: ReactNode }) {
  const { isTransitioning } = useLanguage();

  return (
    <div
      className="transition-opacity duration-200 ease-in-out"
      style={{ opacity: isTransitioning ? 0.7 : 1 }}
    >
      {children}
    </div>
  );
}

export function Providers({ children, initialLanguage = 'az' }: { children: ReactNode; initialLanguage?: 'az' | 'en' }) {
  return (
    <AuthProvider>
      <LanguageProvider initialLanguage={initialLanguage}>
        <ScrollToTop />
        <LanguageTransition>
          {children}
        </LanguageTransition>
      </LanguageProvider>
    </AuthProvider>
  );
}
