import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const toolCards = [
    {
      title: 'Compress Image',
      description: 'Reduce image file size while maintaining quality. Support for JPG, PNG, WebP, and more formats.',
      features: ['Up to 80% size reduction', 'Quality preservation', 'Batch processing'],
      icon: (
        <svg className="tool-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      href: '/tools'
    },
    {
      title: 'Convert PDF',
      description: 'Convert PDFs to various formats easily. Transform documents to Word, Excel, or images.',
      features: ['PDF to Word/Excel', 'PDF to Images', 'OCR support'],
      icon: (
        <svg className="tool-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      href: '/tools'
    },
    {
      title: 'Compress Video',
      description: 'Reduce video file size with minimal quality loss. Perfect for sharing and storage.',
      features: ['Multiple formats', 'Quality control', 'Fast processing'],
      icon: (
        <svg className="tool-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      href: '/tools'
    },
    {
      title: 'Convert Audio',
      description: 'Convert audio files between different formats. Support for MP3, WAV, FLAC, and more.',
      features: ['High quality output', 'Multiple formats', 'Batch conversion'],
      icon: (
        <svg className="tool-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      href: '/tools'
    }
  ];

  const features = [
    {
      title: 'Lightning Fast',
      description: 'Process files in seconds with our optimized cloud infrastructure',
      icon: (
        <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Secure & Private',
      description: 'Your files are encrypted and automatically deleted after processing',
      icon: (
        <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Free Forever',
      description: 'No hidden fees or subscriptions. Convert unlimited files for free',
      icon: (
        <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    }
  ];

  const stats = [
    { number: '10M+', label: 'Files Converted' },
    { number: '50+', label: 'Supported Formats' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Transform Your Files with Professional Precision
            </h1>
            <p className="hero-subtitle">
              The ultimate file conversion platform trusted by millions. Convert, compress, and optimize your files with enterprise-grade technology - all for free up to 10MB.
            </p>
            <div className="hero-buttons">
              <Link to="/tools" className="btn btn-primary">
                Start Converting Now
              </Link>
              <Link to="/company" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
            
            {/* Stats */}
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose FlixConvert?</h2>
            <p className="section-subtitle">
              Built with cutting-edge technology to deliver the best file conversion experience
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="tools-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Professional File Tools</h2>
            <p className="section-subtitle">
              Everything you need for file conversion and optimization
            </p>
          </div>
          
          <div className="tools-grid">
            {toolCards.map((tool, index) => (
              <div key={index} className="tool-card">
                <div className="tool-icon-wrapper">
                  {tool.icon}
                </div>
                <h3 className="tool-title">{tool.title}</h3>
                <p className="tool-description">{tool.description}</p>
                <ul className="tool-features">
                  {tool.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="tool-feature">
                      <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to={tool.href} className="btn btn-primary tool-btn">
                  Open Tool
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Files?</h2>
            <p className="cta-subtitle">
              Join millions of users who trust FlixConvert for their file conversion needs. Start converting your files today - it's completely free!
            </p>
            <div className="cta-buttons">
              <Link to="/tools" className="btn btn-primary">
                Get Started Free
              </Link>
              <Link to="/company" className="btn btn-secondary">
                View All Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4 className="footer-title">About FlixConvert</h4>
              <p className="footer-text">
                Professional file conversion tools for all your needs. We help millions of users convert, compress, and optimize their files every day.
              </p>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Contact Us</h4>
              <p className="footer-text">
                Get in touch with our support team for any questions or assistance with your file conversion needs.
              </p>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Privacy & Security</h4>
              <p className="footer-text">
                Your privacy is our priority. Learn about our security practices and how we protect your files.
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">
              © 2024 FlixConvert. All rights reserved. Professional file conversion made simple.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 