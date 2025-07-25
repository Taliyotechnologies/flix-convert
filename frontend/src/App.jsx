import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

const lightPalette = {
  '--color-bg': '#f8f9fb',
  '--color-bg-glass': 'rgba(255,255,255,0.18)',
  '--color-bg-glass-strong': 'rgba(255,255,255,0.32)',
  '--color-text': '#232336',
  '--color-accent': '#6366f1',
  '--color-accent-2': '#4F46E5',
  '--color-card': '#fff',
  '--color-card-border': '#ececf6',
  '--color-footer-bg': '#f6f7fa',
  '--color-navbar-bg': '#fff',
  '--color-navbar-text': '#232336',
  '--color-navbar-shadow': '0 2px 12px rgba(79,70,229,0.07)',
  '--color-navbar-border': '#ececf6',
  '--color-btn-bg': 'linear-gradient(90deg, #6366f1 0%, #4F46E5 100%)',
  '--color-btn-text': '#fff',
  '--color-btn-bg-hover': 'linear-gradient(90deg, #4F46E5 0%, #6366f1 100%)',
  '--color-btn-text-hover': '#fff',
};

const darkPalette = {
  '--color-bg': '#18181b',
  '--color-bg-glass': 'rgba(36,37,46,0.38)',
  '--color-bg-glass-strong': 'rgba(36,37,46,0.62)',
  '--color-text': '#f3f4f6',
  '--color-accent': '#6366f1',
  '--color-accent-2': '#a5b4fc',
  '--color-card': '#232336',
  '--color-card-border': '#232336',
  '--color-footer-bg': '#232336',
  '--color-navbar-bg': '#18181b',
  '--color-navbar-text': '#f3f4f6',
  '--color-navbar-shadow': '0 2px 16px rgba(99,102,241,0.10)',
  '--color-navbar-border': '#232336',
  '--color-btn-bg': 'linear-gradient(90deg, #6366f1 0%, #4F46E5 100%)',
  '--color-btn-text': '#fff',
  '--color-btn-bg-hover': 'linear-gradient(90deg, #4F46E5 0%, #6366f1 100%)',
  '--color-btn-text-hover': '#fff',
};

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('convertflix-theme');
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const palette = theme === 'dark' ? darkPalette : lightPalette;
    Object.entries(palette).forEach(([k, v]) => {
      document.documentElement.style.setProperty(k, v);
    });
    document.body.className = theme;
    localStorage.setItem('convertflix-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Add other routes here */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 