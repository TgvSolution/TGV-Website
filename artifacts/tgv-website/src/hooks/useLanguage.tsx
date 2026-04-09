import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from '../i18n/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('fr');

  useEffect(() => {
    const saved = localStorage.getItem('tgv-lang') as Language;
    if (saved && (saved === 'fr' || saved === 'en')) {
      setLangState(saved);
    } else {
      const isEnglish = navigator.language.toLowerCase().startsWith('en');
      setLangState(isEnglish ? 'en' : 'fr');
    }
  }, []);

  const setLang = (newLang: Language) => {
    localStorage.setItem('tgv-lang', newLang);
    setLangState(newLang);
  };

  const t = (path: string): string => {
    const keys = path.split('.');
    let current: any = translations[lang];
    
    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation missing for key: ${path} in lang: ${lang}`);
        return path;
      }
      current = current[key];
    }
    
    return current;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}