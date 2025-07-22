import React from 'react';
import './About.css';

export default function About() {
  return (
    <main className="about-main">
      <section className="about-hero">
        <div className="about-hero-bg" aria-hidden="true">
          <svg width="480" height="220" viewBox="0 0 480 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="240" cy="110" rx="220" ry="80" fill="#6c63ff" fillOpacity="0.13"/>
            <ellipse cx="320" cy="80" rx="100" ry="40" fill="#ffb86c" fillOpacity="0.10"/>
          </svg>
        </div>
        <div className="about-hero-content">
          <h1 className="about-title">About <span style={{color: 'var(--color-primary)'}}>FlixConvert</span></h1>
          <div className="about-tagline">Premium file compression for everyone—fast, secure, and lossless.</div>
          <p className="about-desc">FlixConvert is your all-in-one file compression platform, designed to make your digital life easier. We help you compress images, videos, audio, PDFs, and more—instantly and securely.</p>
        </div>
      </section>
      <section className="about-mission card">
        <div className="about-mission-icon" aria-hidden="true">
          {/* Target icon */}
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19" cy="19" r="18" fill="#6c63ff" fillOpacity="0.13"/><circle cx="19" cy="19" r="10" fill="#6c63ff" fillOpacity="0.22"/><circle cx="19" cy="19" r="5" fill="#6c63ff"/></svg>
        </div>
        <h2 className="about-section-title">Our Mission</h2>
        <p>To empower individuals and businesses to manage their files efficiently, without compromising on quality or privacy. We believe in making advanced technology accessible, simple, and reliable for everyone.</p>
      </section>
      <section className="about-values card">
        <h2 className="about-section-title">Our Values</h2>
        <ul className="about-values-list grid">
          <li className="about-value-item"><span className="about-icon value-icon value-icon-privacy"><svg width="32" height="32" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V5l7-3z" fill="#6c63ff"/><path d="M10 2v16" stroke="#fff" strokeWidth="1.5"/></svg></span> <span>Privacy-first processing</span></li>
          <li className="about-value-item"><span className="about-icon value-icon value-icon-speed"><svg width="32" height="32" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="10,2 15,10 11,10 14,18 5,10 9,10 6,2" fill="#ffb86c"/></svg></span> <span>Speed & efficiency</span></li>
          <li className="about-value-item"><span className="about-icon value-icon value-icon-quality"><svg width="32" height="32" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="10,2 12,7.5 18,8 13.5,12 15,18 10,14.5 5,18 6.5,12 2,8 8,7.5" fill="#6c63ff"/></svg></span> <span>Quality without compromise</span></li>
          <li className="about-value-item"><span className="about-icon value-icon value-icon-user"><svg width="32" height="32" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 17s-6-4.35-6-8.5A4.5 4.5 0 0110 4a4.5 4.5 0 016 4.5C16 12.65 10 17 10 17z" fill="#ffb86c"/></svg></span> <span>User-centric design</span></li>
        </ul>
      </section>
      <section className="about-features card about-features-accent">
        <div className="about-features-bg" aria-hidden="true">
          <svg width="420" height="120" viewBox="0 0 420 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="210" cy="60" rx="180" ry="40" fill="#6c63ff" fillOpacity="0.10"/>
            <ellipse cx="320" cy="80" rx="60" ry="20" fill="#ffb86c" fillOpacity="0.08"/>
          </svg>
        </div>
        <h2 className="about-section-title">Why Choose Us?</h2>
        <div className="about-features-list fade-in">
          <div className="about-feature">
            <span className="about-icon feature-icon"><svg width="38" height="38" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="5" fill="#6c63ff"/><rect x="7" y="7" width="10" height="10" rx="3" fill="#fff"/></svg></span>
            <div>
              <div className="about-feature-title">All Formats Supported</div>
              <div className="about-feature-desc">Compress images, videos, audio, PDFs, and more in one place.</div>
            </div>
          </div>
          <div className="about-feature">
            <span className="about-icon feature-icon"><svg width="38" height="38" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="5" fill="#6c63ff"/><path d="M7 17l5-10 5 10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            <div>
              <div className="about-feature-title">Fast & Secure</div>
              <div className="about-feature-desc">Quick compression with privacy-first processing. Your files are safe.</div>
            </div>
          </div>
          <div className="about-feature">
            <span className="about-icon feature-icon"><svg width="38" height="38" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="5" fill="#6c63ff"/><path d="M7 12h10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg></span>
            <div>
              <div className="about-feature-title">No Quality Loss</div>
              <div className="about-feature-desc">Smart algorithms keep your files sharp and clear.</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 