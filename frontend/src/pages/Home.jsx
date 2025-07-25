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
    <div className="home-details animate-details">
      <h2>Explore ConvertFlix</h2>
      <div className="details-grid">
        <a href="/compress/image" className="details-link">
          <span className="details-icon">🖼️</span>
          <span>Image Compress</span>
        </a>
        <a href="/compress/video" className="details-link">
          <span className="details-icon">🎬</span>
          <span>Video Compress</span>
        </a>
        <a href="/compress/audio" className="details-link">
          <span className="details-icon">🎵</span>
          <span>Audio Compress</span>
        </a>
        <a href="/compress/pdf" className="details-link">
          <span className="details-icon">📄</span>
          <span>PDF Compress</span>
        </a>
        <a href="/convert" className="details-link">
          <span className="details-icon">🔄</span>
          <span>File Convert</span>
        </a>
        <a href="/about" className="details-link">
          <span className="details-icon">ℹ️</span>
          <span>About</span>
        </a>
        <a href="/contact" className="details-link">
          <span className="details-icon">📞</span>
          <span>Contact</span>
        </a>
        <a href="/owner" className="details-link">
          <span className="details-icon">👤</span>
          <span>Owner</span>
        </a>
        <a href="/login" className="details-link">
          <span className="details-icon">🔑</span>
          <span>Login</span>
        </a>
        <a href="/signup" className="details-link">
          <span className="details-icon">📝</span>
          <span>Sign Up</span>
        </a>
      </div>
      <p className="details-description">ConvertFlix is your all-in-one platform for fast, high-quality file conversion and compression. Whether you need to shrink images, videos, audio, or PDFs, or convert files between formats, our tools are designed for speed, quality, and ease of use. Explore our pages to get started!</p>
    </div>
  </section>
);

export default Home; 