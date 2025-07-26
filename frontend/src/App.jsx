import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './theme.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Compress from './pages/Compress';
import CompressImage from './pages/CompressImage';
import CompressVideo from './pages/CompressVideo';
import Convert from './pages/Convert';
import About from './pages/About';
import Contact from './pages/Contact';
import Owner from './pages/Owner';
import Login from './pages/Login';
import Signup from './pages/Signup';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

const lightPalette = {
  '--color-bg': '#ffffff',
  '--color-bg-glass': 'rgba(59, 130, 246, 0.05)',
  '--color-bg-glass-strong': 'rgba(59, 130, 246, 0.1)',
  '--color-text': '#1e293b',
  '--color-text-secondary': '#64748b',
  '--color-accent': '#3B82F6',
  '--color-accent-2': '#2563EB',
  '--color-accent-3': '#1D4ED8',
  '--color-card': '#f8fafc',
  '--color-card-border': '#e2e8f0',
  '--color-footer-bg': '#f1f5f9',
  '--color-navbar-bg': 'rgba(255, 255, 255, 0.95)',
  '--color-navbar-text': '#1e293b',
  '--color-navbar-shadow': '0 4px 20px rgba(0, 0, 0, 0.1)',
  '--color-navbar-border': '#e2e8f0',
  '--color-btn-bg': '#3B82F6',
  '--color-btn-text': '#ffffff',
  '--color-btn-bg-hover': '#2563EB',
  '--color-btn-text-hover': '#ffffff',
  '--color-success': '#10B981',
  '--color-warning': '#F59E0B',
  '--color-error': '#EF4444',
  '--color-info': '#3B82F6',
};

const darkPalette = {
  '--color-bg': '#0f172a',
  '--color-bg-glass': 'rgba(59, 130, 246, 0.1)',
  '--color-bg-glass-strong': 'rgba(59, 130, 246, 0.2)',
  '--color-text': '#f1f5f9',
  '--color-text-secondary': '#94a3b8',
  '--color-accent': '#3B82F6',
  '--color-accent-2': '#60A5FA',
  '--color-accent-3': '#93C5FD',
  '--color-card': '#1e293b',
  '--color-card-border': '#334155',
  '--color-footer-bg': '#0f172a',
  '--color-navbar-bg': 'rgba(15, 23, 42, 0.95)',
  '--color-navbar-text': '#f1f5f9',
  '--color-navbar-shadow': '0 4px 20px rgba(0, 0, 0, 0.3)',
  '--color-navbar-border': '#334155',
  '--color-btn-bg': '#3B82F6',
  '--color-btn-text': '#ffffff',
  '--color-btn-bg-hover': '#60A5FA',
  '--color-btn-text-hover': '#ffffff',
  '--color-success': '#10B981',
  '--color-warning': '#F59E0B',
  '--color-error': '#EF4444',
  '--color-info': '#3B82F6',
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

function AppContent() {
  const location = useLocation();
  const isCompressPage = location.pathname.startsWith('/compress');
  
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compress" element={<Compress />} />
          <Route path="/compress/image" element={<CompressImage />} />
          <Route path="/compress/video" element={<CompressVideo />} />
          <Route path="/convert" element={<Convert />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/owner" element={<Owner />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      {!isCompressPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App; 