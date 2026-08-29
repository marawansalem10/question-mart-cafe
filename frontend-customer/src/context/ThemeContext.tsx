/**
 * Question Mart & Cafe - Theme Context
 * Manages theme state (language, direction)
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface ThemeContextType {
  language: 'en' | 'ar';
  direction: 'ltr' | 'rtl';
  setLanguage: (lang: 'en' | 'ar') => void;
  toggleLanguage: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<'en' | 'ar'>('en');
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('app_language') as 'en' | 'ar';
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguageState(savedLanguage);
      setDirection(savedLanguage === 'ar' ? 'rtl' : 'ltr');
    }
  }, []);

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
    localStorage.setItem('app_language', language);
  }, [language, direction]);

  // Set language function
  const setLanguage = useCallback((lang: 'en' | 'ar') => {
    setLanguageState(lang);
    setDirection(lang === 'ar' ? 'rtl' : 'ltr');
  }, []);

  // Toggle language function
  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'en' ? 'ar' : 'en'));
    setDirection((prev) => (prev === 'ltr' ? 'rtl' : 'ltr'));
  }, []);

  const value: ThemeContextType = {
    language,
    direction,
    setLanguage,
    toggleLanguage,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Custom hook to use theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
