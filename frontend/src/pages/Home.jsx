import React from 'react';
import './Home.css';

const features = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="14" fill="#7F5AF0"/><path d="M16 24h16" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
    ),
    title: 'Compress',
    desc: 'Reduce file size for images, videos, audio, and PDFs with advanced algorithms.'
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="14" fill="#2CB67D"/><path d="M24 16v16" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
    ),
    title: 'Convert',
    desc: 'Convert files between formats quickly and easily, supporting all major types.'
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="14" fill="#FBBF24"/><path d="M16 32l8-8 8 8" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
    ),
    title: 'Quality',
    desc: 'Get great results with minimum 50% compression and no compromise on quality.'
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="14" fill="#FF6F91"/><path d="M24 12v24" stroke="#fff" strokeWidth="3" strokeLinecap="round"/><path d="M12 24h24" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
    ),
    title: 'Secure',
    desc: 'Your files are never stored. 100% privacy and security guaranteed.'
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="14" fill="#00C9A7"/><path d="M16 32l8-16 8 16" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
    ),
    title: 'Fast',
    desc: 'Process files in seconds with our optimized engine.'
  },
];

const howSteps = [
  { icon: '1', title: 'Upload', desc: 'Choose your file(s) to compress or convert.' },
  { icon: '2', title: 'Select Tool', desc: 'Pick the format or compression type you need.' },
  { icon: '3', title: 'Process', desc: 'Let ConvertFlix work its magic in seconds.' },
  { icon: '4', title: 'Download', desc: 'Get your optimized or converted file instantly.' },
];

const trustBadges = [
  { icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="#2CB67D"/><path d="M8 14l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>, label: 'Trusted by 10,000+ users' },
  { icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="#7F5AF0"/><path d="M14 8v8l4 2" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>, label: 'Lightning Fast' },
  { icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="#FBBF24"/><path d="M10 14l2 2 6-6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>, label: '100% Secure' },
  { icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="#FF6F91"/><path d="M14 8v8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><circle cx="14" cy="20" r="1.5" fill="#fff"/></svg>, label: 'No sign-up required' },
];

const explore = [
  { label: 'Image Compressor', desc: 'Shrink images for web, email, or storage.', to: '/compress/image', color: '#7F5AF0' },
  { label: 'Video Compressor', desc: 'Compress videos with high quality.', to: '/compress/video', color: '#2CB67D' },
  { label: 'Audio Compressor', desc: 'Reduce audio file size for sharing.', to: '/compress/audio', color: '#FBBF24' },
  { label: 'PDF Compressor', desc: 'Make PDFs smaller for easy upload.', to: '/compress/pdf', color: '#FF6F91' },
  { label: 'Image Converter', desc: 'Convert images between formats.', to: '/convert/image', color: '#00C9A7' },
  { label: 'Video Converter', desc: 'Convert videos between formats.', to: '/convert/video', color: '#7F5AF0' },
  { label: 'Audio Converter', desc: 'Convert audio files easily.', to: '/convert/audio', color: '#2CB67D' },
  { label: 'PDF Converter', desc: 'Convert PDFs to and from other formats.', to: '/convert/pdf', color: '#FBBF24' },
];

const faqs = [
  { q: 'Is ConvertFlix free to use?', a: 'Yes! All tools are free and require no sign-up.' },
  { q: 'Are my files safe?', a: 'Absolutely. Files are processed in-memory and never stored.' },
  { q: 'How fast is the compression/conversion?', a: 'Most files are processed in under 10 seconds.' },
  { q: 'What file types are supported?', a: 'All major image, video, audio, and PDF formats are supported.' },
];

const Home = () => (
  <section className="home">
    <div className="home-hero animate-hero">
      <svg width="110" height="110" viewBox="0 0 110 110" fill="none" className="home-hero-logo animate-logo"><rect width="110" height="110" rx="28" fill="#7F5AF0"/><path d="M36 55c0-10 8-18 18-18h6" stroke="#fff" strokeWidth="6" strokeLinecap="round"/><path d="M74 55c0 10-8 18-18 18h-6" stroke="#fff" strokeWidth="6" strokeLinecap="round"/><polyline points="62,37 74,37 74,49" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/><polyline points="48,73 36,73 36,61" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <h1 className="animate-title">Convert & Compress Any File</h1>
      <p className="home-subtitle animate-subtitle">The fastest, most beautiful way to optimize your images, videos, audio, and PDFs. Free, secure, and no sign-up required.</p>
      <div className="home-cta-row animate-cta">
        <a href="/convert" className="home-cta-btn animate-btn">Start Converting</a>
        <a href="/compress/image" className="home-cta-btn secondary animate-btn">Compress Image</a>
      </div>
    </div>
    <div className="why-choose">
      {trustBadges.map((badge) => (
        <div className="trust-badge" key={badge.label}>
          {badge.icon}
          {badge.label}
        </div>
      ))}
    </div>
    <div className="home-features">
      {features.map((f, i) => (
        <div className="feature-card animate-card" key={f.title} style={{ animationDelay: `${i * 0.12}s` }}>
          {f.icon}
          <h3>{f.title}</h3>
          <p>{f.desc}</p>
        </div>
      ))}
    </div>
    <div className="how-works">
      <h2>How it works</h2>
      <div className="how-steps">
        {howSteps.map((step) => (
          <div className="how-step" key={step.title}>
            <div className="how-step-icon">{step.icon}</div>
            <div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="home-details animate-details">
      <h2>Explore ConvertFlix</h2>
      <p className="details-intro">Discover all the tools and pages ConvertFlix offers. Click a card to learn more or get started instantly.</p>
      <div className="details-grid modern-cards">
        {explore.map((item) => (
          <a href={item.to} className="details-link modern-card" key={item.to} style={{ borderColor: item.color }}>
            <span className="details-label" style={{ color: item.color }}>{item.label}</span>
            <span className="details-desc">{item.desc}</span>
          </a>
        ))}
      </div>
    </div>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq) => (
          <div className="faq-item" key={faq.q}>
            <h4>{faq.q}</h4>
            <p>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="home-cta-row animate-cta" style={{ marginTop: 48, marginBottom: 32 }}>
      <a href="/signup" className="home-cta-btn animate-btn">Create Free Account</a>
      <a href="/about" className="home-cta-btn secondary animate-btn">Learn More</a>
    </div>
  </section>
);

export default Home; 