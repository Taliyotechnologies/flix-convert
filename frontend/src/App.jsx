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
  '--color-bg-glass': 'rgba(0,0,0,0.05)',
  '--color-bg-glass-strong': 'rgba(0,0,0,0.1)',
  '--color-text': '#1e293b',
  '--color-accent': '#000000',
  '--color-accent-2': '#333333',
  '--color-card': '#ffffff',
  '--color-card-border': '#e2e8f0',
  '--color-footer-bg': '#f1f5f9',
  '--color-navbar-bg': '#ffffff',
  '--color-navbar-text': '#1e293b',
  '--color-navbar-shadow': '0 2px 12px rgba(0,0,0,0.1)',
  '--color-navbar-border': '#e2e8f0',
  '--color-btn-bg': 'linear-gradient(90deg, #000000 0%, #333333 100%)',
  '--color-btn-text': '#ffffff',
  '--color-btn-bg-hover': 'linear-gradient(90deg, #333333 0%, #000000 100%)',
  '--color-btn-text-hover': '#ffffff',
};

const darkPalette = {
  '--color-bg': '#000000',
  '--color-bg-glass': 'rgba(30,30,30,0.8)',
  '--color-bg-glass-strong': 'rgba(40,40,40,0.9)',
  '--color-text': '#ffffff',
  '--color-accent': '#ffffff',
  '--color-accent-2': '#cccccc',
  '--color-card': '#111111',
  '--color-card-border': '#333333',
  '--color-footer-bg': '#0a0a0a',
  '--color-navbar-bg': '#000000',
  '--color-navbar-text': '#ffffff',
  '--color-navbar-shadow': '0 2px 16px rgba(0,0,0,0.3)',
  '--color-navbar-border': '#333333',
  '--color-btn-bg': 'linear-gradient(90deg, #ffffff 0%, #cccccc 100%)',
  '--color-btn-text': '#000000',
  '--color-btn-bg-hover': 'linear-gradient(90deg, #cccccc 0%, #ffffff 100%)',
  '--color-btn-text-hover': '#000000',
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