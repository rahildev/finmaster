'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { az } from '@/locales/az';
import { en } from '@/locales/en';

type Language = 'az' | 'en';
type Translations = typeof az;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isTransitioning: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children, initialLanguage = 'az' }: { children: ReactNode; initialLanguage?: Language }) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const setLanguage = (lang: Language) => {
    if (lang === language) return; // Don't transition if same language

    setIsTransitioning(true);

    // Wait for fade-out animation
    setTimeout(() => {
      setLanguageState(lang);
      localStorage.setItem('language', lang);
      document.cookie = `language=${lang};path=/;max-age=31536000`;

      // Wait a bit then fade back in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  const translations: Record<Language, Translations> = {
    az,
    en,
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        isTransitioning,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
