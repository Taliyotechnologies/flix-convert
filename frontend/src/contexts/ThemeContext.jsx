import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [isSystem, setIsSystem] = useState(false);

  // Detect system theme preference
  const getSystemTheme = () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('flixconvert-theme');
    const savedSystem = localStorage.getItem('flixconvert-system-theme');
    
    if (savedSystem === 'true') {
      setIsSystem(true);
      setTheme(getSystemTheme());
    } else if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // First load - detect system preference
      const systemTheme = getSystemTheme();
      setTheme(systemTheme);
      setIsSystem(true);
      localStorage.setItem('flixconvert-system-theme', 'true');
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (!isSystem) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isSystem]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setIsSystem(false);
    localStorage.setItem('flixconvert-theme', newTheme);
    localStorage.setItem('flixconvert-system-theme', 'false');
  };

  const setSystemTheme = () => {
    setIsSystem(true);
    setTheme(getSystemTheme());
    localStorage.setItem('flixconvert-system-theme', 'true');
    localStorage.removeItem('flixconvert-theme');
  };

  const setManualTheme = (newTheme) => {
    setTheme(newTheme);
    setIsSystem(false);
    localStorage.setItem('flixconvert-theme', newTheme);
    localStorage.setItem('flixconvert-system-theme', 'false');
  };

  const value = {
    theme,
    isSystem,
    toggleTheme,
    setSystemTheme,
    setManualTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 