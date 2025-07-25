import React from 'react';
import './Home.css';

const Owner = () => (
  <section className="home">
    <div className="home-hero animate-hero">
      <h1 className="animate-title">Meet the Creator</h1>
      <p className="home-subtitle animate-subtitle">ConvertFlix is built and maintained by Taliyo Technologies, dedicated to building next-gen web tools for everyone.</p>
    </div>
    <div className="home-details animate-details" style={{marginTop: '2.5rem', maxWidth: 600}}>
      <div className="about-owner-card" style={{display: 'flex', alignItems: 'center', gap: 24}}>
        <div className="about-owner-avatar">
          <svg width="64" height="64" fill="none" viewBox="0 0 64 64"><circle cx="32" cy="24" r="14" fill="#7F5AF0"/><rect x="14" y="40" width="36" height="14" rx="7" fill="#2CB67D"/></svg>
        </div>
        <div>
          <h3 style={{margin: 0, color: '#7F5AF0', fontWeight: 800}}>Taliyo Technologies</h3>
          <p style={{margin: 0, color: 'var(--home-text-light)', fontWeight: 500}}>Building next-gen web tools for everyone.<br/>Contact: <a href="mailto:support@convertflix.com" style={{color: '#2CB67D', textDecoration: 'underline'}}>support@convertflix.com</a></p>
        </div>
      </div>
      <div style={{marginTop: 32, textAlign: 'center', color: '#2CB67D'}}>
        <svg width="32" height="32" fill="none" viewBox="0 0 32 32" style={{marginBottom: 8}}><rect width="32" height="32" rx="8" fill="#2CB67D"/><circle cx="16" cy="12" r="6" fill="#fff"/><rect x="10" y="20" width="12" height="6" rx="3" fill="#fff"/></svg>
        <div>Website: <a href="https://taliyo.com" target="_blank" rel="noopener noreferrer" style={{color: '#2CB67D', textDecoration: 'underline'}}>taliyo.com</a></div>
      </div>
    </div>
  </section>
);

export default Owner; 