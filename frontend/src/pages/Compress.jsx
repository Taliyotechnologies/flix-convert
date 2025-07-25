import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../App';
import './Compress.css';

const compressServices = [
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="8" y="8" width="48" height="48" rx="12" fill="#3B82F6" opacity="0.1"/>
        <path d="M20 20h24v24H20z" stroke="#3B82F6" strokeWidth="2"/>
        <path d="M28 28h8v8h-8z" fill="#3B82F6" opacity="0.3"/>
        <path d="M32 16v16M24 24h16" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Image Compression",
    description: "Compress images while maintaining quality. Reduce file size for web, email, or storage.",
    features: ["JPG, PNG, WebP support", "Quality control", "Batch processing", "Fast compression"],
    link: "/compress/image",
            color: "#3B82F6"
  },
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="8" y="8" width="48" height="48" rx="12" fill="#2CB67D" opacity="0.1"/>
        <path d="M20 24h24M20 32h20" stroke="#2CB67D" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="20" r="2" fill="#2CB67D"/>
        <circle cx="32" cy="20" r="2" fill="#2CB67D"/>
        <circle cx="40" cy="20" r="2" fill="#2CB67D"/>
      </svg>
    ),
    title: "Video Compression",
    description: "Compress videos with high quality. Perfect for sharing and uploading.",
    features: ["MP4, AVI, MOV support", "Quality preservation", "Size optimization", "Fast processing"],
    link: "/compress/video",
    color: "#2CB67D"
  },
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="8" y="8" width="48" height="48" rx="12" fill="#FF6B6B" opacity="0.1"/>
        <path d="M16 24l8-8 8 8" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 24l8-8 8 8" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 32h24" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Audio Compression",
    description: "Reduce audio file size for easy sharing and storage.",
    features: ["MP3, WAV, FLAC support", "Quality control", "Bitrate optimization", "Fast compression"],
    link: "/compress/audio",
    color: "#FF6B6B"
  },
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="8" y="8" width="48" height="48" rx="12" fill="#4ECDC4" opacity="0.1"/>
        <path d="M20 20h24v24H20z" stroke="#4ECDC4" strokeWidth="2"/>
        <path d="M28 28h8v8h-8z" fill="#4ECDC4" opacity="0.3"/>
        <path d="M32 16v16M24 24h16" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "PDF Compression",
    description: "Make PDFs smaller for easy upload and sharing.",
    features: ["PDF optimization", "Image compression", "Text preservation", "Fast processing"],
    link: "/compress/pdf",
    color: "#4ECDC4"
  }
];

const Compress = () => {
  const { theme } = useTheme();

  return (
    <div className={`compress-container ${theme}`}>
      {/* Hero Section */}
      <section className="compress-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            File Compression
            <span className="gradient-text"> Made Simple</span>
          </h1>
          <p className="hero-description">
            Professional compression tools for images, videos, audio, and PDFs. Reduce file sizes while maintaining excellent quality.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">50%</span>
              <span className="stat-label">Average Size Reduction</span>
            </div>
            <div className="stat">
              <span className="stat-number">10s</span>
              <span className="stat-label">Processing Time</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Secure & Private</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="compression-animation">
            <div className="file-before">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <rect x="8" y="8" width="32" height="32" rx="6" fill="#3B82F6" opacity="0.2"/>
        <path d="M16 20h16M16 28h12" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>Original</span>
            </div>
            <div className="compression-arrow">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M8 16h16M16 8l8 8-8 8" stroke="#2CB67D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="file-after">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="8" y="8" width="32" height="32" rx="6" fill="#2CB67D" opacity="0.2"/>
                <path d="M16 20h16M16 28h12" stroke="#2CB67D" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>Compressed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="compress-services">
        <div className="section-header">
          <h2>Choose Your Compression Tool</h2>
          <p>Professional compression for all your file types</p>
        </div>
        <div className="services-grid">
          {compressServices.map((service, index) => (
            <Link key={index} to={service.link} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="service-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="compress-how-it-works">
        <div className="section-header">
          <h2>How Compression Works</h2>
          <p>Simple 3-step process to optimize your files</p>
        </div>
        <div className="steps-container">
          <div className="step">
            <div className="step-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <rect x="8" y="8" width="32" height="32" rx="8" fill="#3B82F6" opacity="0.1"/>
        <path d="M16 24h16M24 16v16" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Upload Your File</h3>
            <p>Drag and drop or click to upload any supported file format</p>
          </div>
          <div className="step">
            <div className="step-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="8" y="8" width="32" height="32" rx="8" fill="#2CB67D" opacity="0.1"/>
                <path d="M16 20l4 4 8-8" stroke="#2CB67D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Choose Settings</h3>
            <p>Select compression level and quality settings</p>
          </div>
          <div className="step">
            <div className="step-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="8" y="8" width="32" height="32" rx="8" fill="#FF6B6B" opacity="0.1"/>
                <path d="M12 20l4-4 4 4" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Download Result</h3>
            <p>Get your optimized file in seconds, ready to use</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="compress-cta">
        <div className="cta-content">
          <h2>Ready to Compress Your Files?</h2>
          <p>Join millions of users who trust ConvertFlix for their compression needs</p>
          <div className="cta-buttons">
            <Link to="/compress/image" className="btn-primary">Start Compressing</Link>
            <Link to="/convert" className="btn-secondary">Convert Files</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Compress; 