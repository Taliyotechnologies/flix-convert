import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  '--color-bg': '#f8f9fb',
  '--color-bg-glass': 'rgba(255,255,255,0.18)',
  '--color-bg-glass-strong': 'rgba(255,255,255,0.32)',
  '--color-text': '#232336',
  '--color-accent': '#3B82F6',
  '--color-accent-2': '#1D4ED8',
  '--color-card': '#fff',
  '--color-card-border': '#ececf6',
  '--color-footer-bg': '#f6f7fa',
  '--color-navbar-bg': '#fff',
  '--color-navbar-text': '#232336',
  '--color-navbar-shadow': '0 2px 12px rgba(59,130,246,0.07)',
  '--color-navbar-border': '#ececf6',
  '--color-btn-bg': 'linear-gradient(90deg, #3B82F6 0%, #1D4ED8 100%)',
  '--color-btn-text': '#fff',
  '--color-btn-bg-hover': 'linear-gradient(90deg, #1D4ED8 0%, #3B82F6 100%)',
  '--color-btn-text-hover': '#fff',
};

const darkPalette = {
  '--color-bg': '#0F172A',
  '--color-bg-glass': 'rgba(30,41,59,0.38)',
  '--color-bg-glass-strong': 'rgba(30,41,59,0.62)',
  '--color-text': '#f1f5f9',
  '--color-accent': '#3B82F6',
  '--color-accent-2': '#60A5FA',
  '--color-card': '#1E293B',
  '--color-card-border': '#334155',
  '--color-footer-bg': '#1E293B',
  '--color-navbar-bg': '#0F172A',
  '--color-navbar-text': '#f1f5f9',
  '--color-navbar-shadow': '0 2px 16px rgba(59,130,246,0.10)',
  '--color-navbar-border': '#334155',
  '--color-btn-bg': 'linear-gradient(90deg, #3B82F6 0%, #1D4ED8 100%)',
  '--color-btn-text': '#fff',
  '--color-btn-bg-hover': 'linear-gradient(90deg, #1D4ED8 0%, #3B82F6 100%)',
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
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 