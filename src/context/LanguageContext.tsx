import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LANGUAGES, TRANSLATIONS } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS['ru'];
  availableLanguages: typeof LANGUAGES;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'convertpulse_language_pref';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as Language;
      if (saved && (saved === 'ru' || saved === 'en' || saved === 'kz' || saved === 'es')) {
        return saved;
      }
      // Browser language detection
      const browserLang = navigator.language?.toLowerCase() || '';
      if (browserLang.startsWith('ru') || browserLang.startsWith('be') || browserLang.startsWith('uk')) return 'ru';
      if (browserLang.startsWith('kk') || browserLang.startsWith('kz')) return 'kz';
      if (browserLang.startsWith('es')) return 'es';
    }
    return 'ru'; // Default to Russian as requested in conversation
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: TRANSLATIONS[language] || TRANSLATIONS.ru,
    availableLanguages: LANGUAGES,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
