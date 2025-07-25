import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../App';
import './Home.css';

const features = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="currentColor" opacity="0.1"/>
        <path d="M16 24h16M24 16v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="36" cy="12" r="4" fill="currentColor"/>
        <path d="M34 10l2 2 2-2" stroke="var(--color-bg)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Lightning Fast",
    description: "Convert and compress files in under 10 seconds with our optimized algorithms"
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="currentColor" opacity="0.1"/>
        <path d="M16 20l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 24l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "High Quality",
    description: "Maintain excellent quality with minimum 50% compression ratio"
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="currentColor" opacity="0.1"/>
        <path d="M16 16h16v16H16z" stroke="currentColor" strokeWidth="2"/>
        <path d="M20 20h8v8h-8z" fill="currentColor" opacity="0.3"/>
        <path d="M24 12v8M20 16h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Multiple Formats",
    description: "Support for images, videos, audio, and PDF files"
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="currentColor" opacity="0.1"/>
        <path d="M16 20h16M16 28h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20" cy="16" r="2" fill="currentColor"/>
        <circle cx="28" cy="16" r="2" fill="currentColor"/>
      </svg>
    ),
    title: "Secure & Private",
    description: "Your files are processed locally and never stored on our servers"
  }
];

const howItWorks = [
  {
    step: "01",
    title: "Upload Your File",
    description: "Drag and drop or click to upload any supported file format"
  },
  {
    step: "02", 
    title: "Choose Settings",
    description: "Select compression level or target format for conversion"
  },
  {
    step: "03",
    title: "Process & Download",
    description: "Get your optimized file in seconds, ready to use"
  }
];

const stats = [
  { number: "10M+", label: "Files Processed" },
  { number: "50+", label: "Supported Formats" },
  { number: "99.9%", label: "Uptime" },
  { number: "24/7", label: "Support" }
];

const services = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="currentColor" opacity="0.1"/>
        <path d="M16 16h16v16H16z" stroke="currentColor" strokeWidth="2"/>
        <path d="M20 20h8v8h-8z" fill="currentColor" opacity="0.3"/>
        <path d="M24 12v8M20 16h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Image Compression",
    description: "Compress images while maintaining quality. Reduce file size for web, email, or storage.",
    link: "/compress/image"
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="currentColor" opacity="0.1"/>
        <path d="M16 20h16M16 28h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20" cy="16" r="2" fill="currentColor"/>
        <circle cx="28" cy="16" r="2" fill="currentColor"/>
      </svg>
    ),
    title: "Video Compression",
    description: "Compress videos with high quality. Perfect for sharing and uploading.",
    link: "/compress/video"
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="currentColor" opacity="0.1"/>
        <path d="M12 20l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 20l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 28h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Audio Compression",
    description: "Reduce audio file size for easy sharing and storage.",
    link: "/compress/audio"
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="currentColor" opacity="0.1"/>
        <path d="M16 16h16v16H16z" stroke="currentColor" strokeWidth="2"/>
        <path d="M20 20h8v8h-8z" fill="currentColor" opacity="0.3"/>
        <path d="M24 12v8M20 16h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "PDF Compression",
    description: "Make PDFs smaller for easy upload and sharing.",
    link: "/compress/pdf"
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="currentColor" opacity="0.1"/>
        <path d="M16 24h16M24 16v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="36" cy="12" r="4" fill="currentColor"/>
        <path d="M34 10l2 2 2-2" stroke="var(--color-bg)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Image Converter",
    description: "Convert images between formats: JPG, PNG, WebP, GIF, and more.",
    link: "/convert/image"
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="currentColor" opacity="0.1"/>
        <path d="M16 20h16M16 28h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20" cy="16" r="2" fill="currentColor"/>
        <circle cx="28" cy="16" r="2" fill="currentColor"/>
      </svg>
    ),
    title: "Video Converter",
    description: "Convert videos between formats: MP4, AVI, MOV, MKV, and more.",
    link: "/convert/video"
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="currentColor" opacity="0.1"/>
        <path d="M12 20l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 20l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 28h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Audio Converter",
    description: "Convert audio files between formats: MP3, WAV, FLAC, AAC, and more.",
    link: "/convert/audio"
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="currentColor" opacity="0.1"/>
        <path d="M16 16h16v16H16z" stroke="currentColor" strokeWidth="2"/>
        <path d="M20 20h8v8h-8z" fill="currentColor" opacity="0.3"/>
        <path d="M24 12v8M20 16h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "PDF Converter",
    description: "Convert PDFs to and from various formats.",
    link: "/convert/pdf"
  }
];

const Home = () => {
  const { theme } = useTheme();

  return (
    <div className={`home-container ${theme}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Convert & Compress Files
            <span className="gradient-text"> Instantly</span>
          </h1>
          <p className="hero-description">
            Professional file conversion and compression tools. Transform images, videos, audio, and PDFs with lightning speed and exceptional quality.
          </p>
          <div className="hero-buttons">
            <Link to="/compress" className="btn-primary">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Start Compressing
            </Link>
            <Link to="/convert" className="btn-secondary">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16 4l-4 4-4-4M12 16V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Convert Files
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card card-1">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <rect x="4" y="4" width="24" height="24" rx="6" fill="#3B82F6" opacity="0.1"/>
        <path d="M12 16h8M16 12v8" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Image</span>
          </div>
          <div className="floating-card card-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="4" width="24" height="24" rx="6" fill="#2CB67D" opacity="0.1"/>
              <path d="M8 12l8 8 8-8" stroke="#2CB67D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Video</span>
          </div>
          <div className="floating-card card-3">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="4" width="24" height="24" rx="6" fill="#FF6B6B" opacity="0.1"/>
              <path d="M12 20l4-4 4 4" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Audio</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose ConvertFlix?</h2>
          <p>Professional tools designed for speed, quality, and ease of use</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>Professional file compression and conversion tools for all your needs</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <Link key={index} to={service.link} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-arrow">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Simple 3-step process to get your files optimized</p>
        </div>
        <div className="steps-container">
          {howItWorks.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{step.step}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Optimize Your Files?</h2>
          <p>Join millions of users who trust ConvertFlix for their file processing needs</p>
          <div className="cta-buttons">
            <Link to="/compress" className="btn-primary">Start Compressing</Link>
            <Link to="/convert" className="btn-secondary">Convert Files</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 