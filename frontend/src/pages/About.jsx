import React from 'react';
import './Home.css';

const About = () => (
  <section className="home">
    <div className="home-hero animate-hero">
      <h1 className="animate-title">About ConvertFlix</h1>
      <p className="home-subtitle animate-subtitle">ConvertFlix is your all-in-one platform for fast, high-quality file conversion and compression. We believe in making file management effortless, beautiful, and accessible to everyone.</p>
    </div>
    <div className="home-details animate-details" style={{marginTop: '2.5rem'}}>
      <h2>Our Mission</h2>
      <p className="details-description">To empower users with the fastest, most reliable, and visually stunning file conversion and compression tools on the web. We focus on privacy, quality, and a seamless user experience—no matter what device you use.</p>
      <h2 style={{marginTop: '2.5rem'}}>Why Choose Us?</h2>
      <ul className="about-list">
        <li>⚡ Super fast conversions and compression</li>
        <li>🔒 100% privacy—your files are never stored</li>
        <li>🎨 Modern, beautiful, and easy-to-use interface</li>
        <li>🖼️ Supports all major file types</li>
        <li>💡 Free to use, no sign-up required</li>
      </ul>
      <h2 style={{marginTop: '2.5rem'}}>Meet the Creator</h2>
      <div className="about-owner-card">
        <div className="about-owner-avatar">
          <svg width="56" height="56" fill="none" viewBox="0 0 56 56"><circle cx="28" cy="20" r="12" fill="var(--color-accent)"/><rect x="12" y="36" width="32" height="12" rx="6" fill="var(--color-accent)"/></svg>
        </div>
        <div>
          <h3 style={{margin: 0, color: 'var(--color-accent)'}}>Taliyo Technologies</h3>
          <p style={{margin: 0, color: 'var(--color-text)'}}>Building next-gen web tools for everyone.</p>
        </div>
      </div>
    </div>
  </section>
);

export default About;
