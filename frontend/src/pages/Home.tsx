import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const toolCards = [
    {
      title: 'Compress Image',
      description: 'Reduce image file size while maintaining quality',
      icon: (
        <svg className="tool-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      href: '/tools'
    },
    {
      title: 'Convert PDF',
      description: 'Convert PDFs to various formats easily',
      icon: (
        <svg className="tool-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      href: '/tools'
    },
    {
      title: 'Compress Video',
      description: 'Reduce video file size with minimal quality loss',
      icon: (
        <svg className="tool-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      href: '/tools'
    },
    {
      title: 'Convert Audio',
      description: 'Convert audio files between different formats',
      icon: (
        <svg className="tool-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      href: '/tools'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Compress & Convert Files Instantly – 10MB Free Limit
            </h1>
            <p className="hero-subtitle">
              Professional file conversion tools for all your needs. Convert images, videos, audio, and documents with just a few clicks.
            </p>
            <div className="hero-buttons">
              <Link to="/tools" className="btn btn-primary">
                Try Tool
              </Link>
              <Link to="/company" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="tools-section">
        <div className="container">
          <div className="tools-grid">
            {toolCards.map((tool, index) => (
              <div key={index} className="tool-card">
                <div className="tool-icon-wrapper">
                  {tool.icon}
                </div>
                <h3 className="tool-title">{tool.title}</h3>
                <p className="tool-description">{tool.description}</p>
                <Link to={tool.href} className="btn btn-primary tool-btn">
                  Open Tool
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4 className="footer-title">About</h4>
              <p className="footer-text">
                Professional file conversion tools for all your needs.
              </p>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Contact</h4>
              <p className="footer-text">
                Get in touch with our support team.
              </p>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Privacy Policy</h4>
              <p className="footer-text">
                Learn about our privacy practices.
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">
              © 2024 FlixConvert. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 