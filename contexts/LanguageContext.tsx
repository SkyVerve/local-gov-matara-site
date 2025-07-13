
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { en, si, ta } from '../translations';

const translationData = { en, si, ta };

type Language = 'en' | 'si' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: typeof en; // Use 'en' as the shape for all translation objects
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const contextValue = {
    language,
    setLanguage,
    translations: translationData[language],
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};