import React from 'react';
import './Home.css';

const Home = () => (
  <section className="home">
    <div className="home-hero animate-hero">
      <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="home-hero-logo animate-logo">
        <rect width="96" height="96" rx="24" fill="#4F46E5"/>
        <path d="M32 48c0-8.8 7.2-16 16-16h8" stroke="#fff" strokeWidth="5" strokeLinecap="round"/>
        <path d="M64 48c0 8.8-7.2 16-16 16h-8" stroke="#fff" strokeWidth="5" strokeLinecap="round"/>
        <polyline points="56,32 64,32 64,40" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="40,64 32,64 32,56" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <h1 className="animate-title">ConvertFlix</h1>
      <p className="home-subtitle animate-subtitle">Convert and compress any file type in seconds. Enjoy high-quality results with up to 50% compression, all in a beautiful, easy-to-use interface.</p>
      <div className="home-cta-row animate-cta">
        <a href="/convert" className="home-cta-btn animate-btn">Start Converting</a>
        <a href="/compress/image" className="home-cta-btn secondary animate-btn">Compress Image</a>
      </div>
    </div>
    <div className="home-features">
      <div className="feature-card animate-card">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#6366F1"/><path d="M16 24h16" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
        <h3>Compress</h3>
        <p>Reduce file size for images, videos, audio, and PDFs with advanced algorithms.</p>
      </div>
      <div className="feature-card animate-card" style={{ animationDelay: '0.12s' }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#6366F1"/><path d="M24 16v16" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
        <h3>Convert</h3>
        <p>Convert files between formats quickly and easily, supporting all major types.</p>
      </div>
      <div className="feature-card animate-card" style={{ animationDelay: '0.24s' }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#6366F1"/><path d="M16 32l8-8 8 8" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
        <h3>Quality</h3>
        <p>Get great results with minimum 50% compression and no compromise on quality.</p>
      </div>
    </div>
  </section>
);

export default Home; 