import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  // Theme state: 'light' | 'dark'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`app-container ${theme}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="home-main">
        <section className="hero-section">
          <h1 className="hero-title">Welcome to FlixConvert</h1>
          <p className="hero-desc">Fast, free, and high-quality file compression and conversion.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
