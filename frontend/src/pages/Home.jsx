import React from 'react';
import './Home.css';

const Home = () => (
  <section className="home">
    <div className="home-hero">
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="home-hero-logo">
        <rect width="72" height="72" rx="18" fill="#4F46E5"/>
        <path d="M24 36c0-6.6 5.4-12 12-12h4" stroke="#fff" strokeWidth="4" strokeLinecap="round"/>
        <path d="M48 36c0 6.6-5.4 12-12 12h-4" stroke="#fff" strokeWidth="4" strokeLinecap="round"/>
        <polyline points="42,24 48,24 48,30" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="30,48 24,48 24,42" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <h1>ConvertFlix</h1>
      <p className="home-subtitle">Convert and compress any file type in seconds. Enjoy high-quality results with up to 50% compression, all in a beautiful, easy-to-use interface.</p>
      <div className="home-cta-row">
        <a href="/convert" className="home-cta-btn">Start Converting</a>
        <a href="/compress/image" className="home-cta-btn secondary">Compress Image</a>
      </div>
    </div>
    <div className="home-features">
      <div className="feature-card">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#6366F1"/><path d="M12 18h12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
        <h3>Compress</h3>
        <p>Reduce file size for images, videos, audio, and PDFs with advanced algorithms.</p>
      </div>
      <div className="feature-card">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#6366F1"/><path d="M18 12v12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
        <h3>Convert</h3>
        <p>Convert files between formats quickly and easily, supporting all major types.</p>
      </div>
      <div className="feature-card">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#6366F1"/><path d="M12 26l6-6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
        <h3>Quality</h3>
        <p>Get great results with minimum 50% compression and no compromise on quality.</p>
      </div>
    </div>
  </section>
);

export default Home; 