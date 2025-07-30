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
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  useEffect(() => {
    // Update body class and localStorage
    document.body.className = theme;
    localStorage.setItem('theme', theme);
    
    // Update CSS custom properties
    const root = document.documentElement;
    if (theme === 'dark') {
      root.style.setProperty('--bg-primary', '#121212');
      root.style.setProperty('--bg-secondary', '#1e1e1e');
      root.style.setProperty('--bg-tertiary', '#2d2d2d');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#b3b3b3');
      root.style.setProperty('--text-muted', '#808080');
      root.style.setProperty('--border-color', '#404040');
      root.style.setProperty('--accent-color', '#3b82f6');
      root.style.setProperty('--accent-hover', '#2563eb');
      root.style.setProperty('--success-color', '#10b981');
      root.style.setProperty('--error-color', '#ef4444');
      root.style.setProperty('--warning-color', '#f59e0b');
      root.style.setProperty('--toast-bg', '#1e1e1e');
      root.style.setProperty('--toast-color', '#ffffff');
      root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.3)');
    } else {
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f8fafc');
      root.style.setProperty('--bg-tertiary', '#f1f5f9');
      root.style.setProperty('--text-primary', '#1e293b');
      root.style.setProperty('--text-secondary', '#64748b');
      root.style.setProperty('--text-muted', '#94a3b8');
      root.style.setProperty('--border-color', '#e2e8f0');
      root.style.setProperty('--accent-color', '#3b82f6');
      root.style.setProperty('--accent-hover', '#2563eb');
      root.style.setProperty('--success-color', '#10b981');
      root.style.setProperty('--error-color', '#ef4444');
      root.style.setProperty('--warning-color', '#f59e0b');
      root.style.setProperty('--toast-bg', '#ffffff');
      root.style.setProperty('--toast-color', '#1e293b');
      root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.1)');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 