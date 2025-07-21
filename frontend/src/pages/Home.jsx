// Main Home page for FlixConvert
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const TOOL_LINKS = [
  { to: '/image-compress', label: 'Image' },
  { to: '/video-compress', label: 'Video' },
  { to: '/audio-compress', label: 'Audio' },
  { to: '/pdf-compress', label: 'PDF' },
  { to: '/other-compress', label: 'Other' },
];

export default function Home() {
  return (
    <main className="home-main">
      <section className="home-hero instant-hero">
        <div className="hero-content">
          <h1 className="hero-title">Compress Any File Instantly</h1>
          <p className="hero-desc">Drag & drop your file below or choose a tool to get started.</p>
          <div className="upload-area" tabIndex={0} aria-label="Upload or drag and drop file">
            <div className="upload-svg">
              {/* SVG: file with compress arrows */}
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="8" width="40" height="44" rx="7" fill="#23243a" stroke="#6c63ff" strokeWidth="2.5" />
                <rect x="18" y="16" width="24" height="28" rx="4" fill="#23243a" stroke="#6c63ff" strokeWidth="2" />
                <path d="M30 24v12" stroke="#6c63ff" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M26 32l4 4 4-4" stroke="#6c63ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="upload-text">Drag & drop file here<br/>or</div>
            <button className="upload-btn" type="button">Choose File</button>
          </div>
          <div className="tool-quicklinks">
            {TOOL_LINKS.map(tool => (
              <Link key={tool.to} to={tool.to} className="tool-link-btn">{tool.label}</Link>
            ))}
          </div>
        </div>
      </section>
      {/* Decorative SVG wave divider removed for flat look */}
      <section className="home-features">
        <h2 className="features-title">Why FlixConvert?</h2>
        <div className="features-list">
          <div className="feature-card"><div className="feature-icon"><svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="30" height="30" rx="8" fill="#23243a" stroke="#6c63ff" strokeWidth="2.5" /><path d="M12 19h14M19 12v14" stroke="#6c63ff" strokeWidth="2.5" strokeLinecap="round" /></svg></div><div className="feature-title">All Formats</div><div className="feature-desc">Compress images, videos, audio, PDFs, and more in one place.</div></div>
          <div className="feature-card"><div className="feature-icon"><svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="30" height="30" rx="8" fill="#23243a" stroke="#6c63ff" strokeWidth="2.5" /><path d="M12 26l7-14 7 14" stroke="#6c63ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div><div className="feature-title">Fast & Secure</div><div className="feature-desc">Quick compression with privacy-first processing. Your files are safe.</div></div>
          <div className="feature-card"><div className="feature-icon"><svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="30" height="30" rx="8" fill="#23243a" stroke="#6c63ff" strokeWidth="2.5" /><path d="M12 19h14" stroke="#6c63ff" strokeWidth="2.5" strokeLinecap="round" /></svg></div><div className="feature-title">No Quality Loss</div><div className="feature-desc">Smart algorithms keep your files sharp and clear.</div></div>
        </div>
      </section>
      <section className="home-how">
        <h2 className="how-title">How It Works</h2>
        <div className="how-steps">
          <div className="how-step"><div className="how-icon"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="24" height="24" rx="6" fill="#23243a" stroke="#6c63ff" strokeWidth="2" /><path d="M10 16h12" stroke="#6c63ff" strokeWidth="2" strokeLinecap="round" /></svg></div><div className="how-label">1. Upload File</div><div className="how-desc">Choose your file type and upload from your device.</div></div>
          <div className="how-step"><div className="how-icon"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="24" height="24" rx="6" fill="#23243a" stroke="#6c63ff" strokeWidth="2" /><path d="M16 10v12" stroke="#6c63ff" strokeWidth="2" strokeLinecap="round" /></svg></div><div className="how-label">2. Compress</div><div className="how-desc">Let FlixConvert do the magic—fast, secure, and reliable.</div></div>
          <div className="how-step"><div className="how-icon"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="24" height="24" rx="6" fill="#23243a" stroke="#6c63ff" strokeWidth="2" /><path d="M10 22l6-6 6 6" stroke="#6c63ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div><div className="how-label">3. Download</div><div className="how-desc">Get your compressed file instantly—no sign-up required.</div></div>
        </div>
      </section>
    </main>
  );
}
