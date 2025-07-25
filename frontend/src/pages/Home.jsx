import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../App';
import './Home.css';

const features = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="#7F5AF0" opacity="0.1"/>
        <path d="M16 24h16M24 16v16" stroke="#7F5AF0" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="36" cy="12" r="4" fill="#2CB67D"/>
        <path d="M34 10l2 2 2-2" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Lightning Fast",
    description: "Convert and compress files in under 10 seconds with our optimized algorithms"
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="#2CB67D" opacity="0.1"/>
        <path d="M16 20l4 4 8-8" stroke="#2CB67D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 24l4 4 8-8" stroke="#2CB67D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "High Quality",
    description: "Maintain excellent quality with minimum 50% compression ratio"
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="#FF6B6B" opacity="0.1"/>
        <path d="M16 16h16v16H16z" stroke="#FF6B6B" strokeWidth="2"/>
        <path d="M20 20h8v8h-8z" fill="#FF6B6B" opacity="0.3"/>
        <path d="M24 12v8M20 16h8" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Multiple Formats",
    description: "Support for images, videos, audio, and PDF files"
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="#4ECDC4" opacity="0.1"/>
        <path d="M16 20h16M16 28h12" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20" cy="16" r="2" fill="#4ECDC4"/>
        <circle cx="28" cy="16" r="2" fill="#4ECDC4"/>
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
              <rect x="4" y="4" width="24" height="24" rx="6" fill="#7F5AF0" opacity="0.1"/>
              <path d="M12 16h8M16 12v8" stroke="#7F5AF0" strokeWidth="2" strokeLinecap="round"/>
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