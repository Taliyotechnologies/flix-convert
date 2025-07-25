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
  '--color-bg': '#ffffff',
  '--color-bg-glass': 'rgba(0,0,0,0.05)',
  '--color-bg-glass-strong': 'rgba(0,0,0,0.1)',
  '--color-text': '#000000',
  '--color-accent': '#1a5f3c',
  '--color-accent-2': '#0f4c2e',
  '--color-card': '#f8f9fa',
  '--color-card-border': '#e9ecef',
  '--color-footer-bg': '#f8f9fa',
  '--color-navbar-bg': '#ffffff',
  '--color-navbar-text': '#000000',
  '--color-navbar-shadow': '0 2px 12px rgba(0,0,0,0.1)',
  '--color-navbar-border': '#e9ecef',
  '--color-btn-bg': 'linear-gradient(90deg, #1a5f3c 0%, #0f4c2e 100%)',
  '--color-btn-text': '#ffffff',
  '--color-btn-bg-hover': 'linear-gradient(90deg, #0f4c2e 0%, #1a5f3c 100%)',
  '--color-btn-text-hover': '#ffffff',
};

const darkPalette = {
  '--color-bg': '#000000',
  '--color-bg-glass': 'rgba(26,95,60,0.1)',
  '--color-bg-glass-strong': 'rgba(26,95,60,0.2)',
  '--color-text': '#ffffff',
  '--color-accent': '#1a5f3c',
  '--color-accent-2': '#2d7a4f',
  '--color-card': '#111111',
  '--color-card-border': '#333333',
  '--color-footer-bg': '#0a0a0a',
  '--color-navbar-bg': '#000000',
  '--color-navbar-text': '#ffffff',
  '--color-navbar-shadow': '0 2px 16px rgba(26,95,60,0.2)',
  '--color-navbar-border': '#333333',
  '--color-btn-bg': 'linear-gradient(90deg, #1a5f3c 0%, #2d7a4f 100%)',
  '--color-btn-text': '#ffffff',
  '--color-btn-bg-hover': 'linear-gradient(90deg, #2d7a4f 0%, #1a5f3c 100%)',
  '--color-btn-text-hover': '#ffffff',
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