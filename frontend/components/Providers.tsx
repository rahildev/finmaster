'use client';

import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ReactNode, useEffect } from 'react';

function ScrollToTop() {
  useEffect(() => {
    // Səhifə yüklənəndə həmişə yuxarıdan başlasın
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

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <LanguageTransition>
        {children}
      </LanguageTransition>
    </LanguageProvider>
  );
}
