import React from 'react';
import './Home.css';

const Home = () => (
  <section className="home">
    <div className="home-hero">
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="16" fill="#4F46E5"/>
        <path d="M20 32h24M32 20v24" stroke="#fff" strokeWidth="4" strokeLinecap="round"/>
      </svg>
      <h1>Fast File Converter & Compressor</h1>
      <p>Convert and compress any file type in seconds. Enjoy high-quality results with up to 50% compression, all in a beautiful, easy-to-use interface.</p>
    </div>
    <div className="home-features">
      <div className="feature-card">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#6366F1"/><path d="M10 16h12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
        <h3>Compress</h3>
        <p>Reduce file size for images, videos, audio, and PDFs with advanced algorithms.</p>
      </div>
      <div className="feature-card">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#6366F1"/><path d="M16 10v12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
        <h3>Convert</h3>
        <p>Convert files between formats quickly and easily, supporting all major types.</p>
      </div>
      <div className="feature-card">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#6366F1"/><path d="M10 22l6-6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
        <h3>Quality</h3>
        <p>Get great results with minimum 50% compression and no compromise on quality.</p>
      </div>
    </div>
  </section>
);

export default Home; 