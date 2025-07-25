import React from 'react';
import './Home.css';

const compressOptions = [
  {
    href: '/compress/image',
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><rect width="36" height="36" rx="10" fill="var(--color-accent)"/><path d="M10 26l7-10 5 7 3-5 1 2v6H10z" fill="#fff"/><rect x="10" y="10" width="16" height="16" rx="4" stroke="#fff" strokeWidth="2"/></svg>
    ),
    label: 'Image',
    desc: 'Compress images for web, email, or storage.'
  },
  {
    href: '/compress/video',
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><rect width="36" height="36" rx="10" fill="var(--color-accent)"/><rect x="10" y="14" width="10" height="12" rx="2" stroke="#fff" strokeWidth="2"/><path d="M26 17v8l4 2V15l-4 2z" fill="#fff"/></svg>
    ),
    label: 'Video',
    desc: 'Compress videos with high quality.'
  },
  {
    href: '/compress/audio',
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><rect width="36" height="36" rx="10" fill="var(--color-accent)"/><rect x="14" y="16" width="4" height="8" rx="2" fill="#fff"/><rect x="22" y="12" width="4" height="12" rx="2" fill="#fff"/></svg>
    ),
    label: 'Audio',
    desc: 'Compress audio files for sharing or archiving.'
  },
  {
    href: '/compress/pdf',
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><rect width="36" height="36" rx="10" fill="var(--color-accent)"/><rect x="14" y="10" width="12" height="16" rx="2" stroke="#fff" strokeWidth="2"/><path d="M18 14h8M18 18h8M18 22h8" stroke="#fff" strokeWidth="2"/></svg>
    ),
    label: 'PDF',
    desc: 'Compress PDF files for easy upload.'
  }
];

const Compress = () => (
  <section className="home">
    <div className="home-hero animate-hero">
      <h1 className="animate-title">Compress Files</h1>
      <p className="home-subtitle animate-subtitle">Reduce file size for images, videos, audio, and PDFs with advanced algorithms. Fast, secure, and high quality.</p>
    </div>
    <div className="modern-cards" style={{marginTop: '2.5rem'}}>
      {compressOptions.map((item) => (
        <a href={item.href} className="details-link modern-card" key={item.href}>
          <span className="details-icon">{item.icon}</span>
          <span className="details-label">{item.label}</span>
          <span className="details-desc">{item.desc}</span>
        </a>
      ))}
    </div>
  </section>
);

export default Compress; 