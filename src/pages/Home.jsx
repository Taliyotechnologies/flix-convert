import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Process files in seconds with our optimized algorithms'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your files are processed locally and never stored'
    },
    {
      icon: '🌐',
      title: 'Cross Platform',
      description: 'Works on any device with a modern web browser'
    },
    {
      icon: '🎯',
      title: 'Quality Preserved',
      description: 'Maintain original quality while reducing file size'
    },
    {
      icon: '📁',
      title: 'Multi-format Support',
      description: 'Support for images, audio, video, and documents'
    },
    {
      icon: '💾',
      title: 'Free Up to 10MB',
      description: 'No registration required for files under 10MB'
    }
  ];

  return (
    <>
      <Helmet>
        <title>ConvertFlix - Free File Compression & Conversion Tool</title>
        <meta name="description" content="ConvertFlix - Free file compression and conversion tool. Compress images, convert audio, and more instantly. Free up to 10MB." />
        <meta name="keywords" content="file compression, file conversion, image compression, audio converter, video converter, free tools" />
      </Helmet>

      <div className="home">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-title">
                Compress & Convert Files Instantly — Free Up to 10MB
              </h1>
              <p className="hero-subtitle">
                Fast, secure & cross-platform compression and conversion tools for all your file needs
              </p>
              <div className="hero-buttons">
                <Link to="/tools" className="btn btn-primary btn-large">
                  Try Tools
                </Link>
                <Link to="/about" className="btn btn-secondary btn-large">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hero-illustration">
              <div className="file-stack">
                <div className="file file-1">📄</div>
                <div className="file file-2">🖼️</div>
                <div className="file file-3">🎵</div>
                <div className="file file-4">🎬</div>
                <div className="compression-arrow">⬇️</div>
                <div className="compressed-file">📦</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <div className="features-container">
            <h2 className="features-title">Why Choose ConvertFlix?</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-container">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-subtitle">
              Join thousands of users who trust ConvertFlix for their file compression and conversion needs
            </p>
            <Link to="/tools" className="btn btn-primary btn-large">
              Start Converting Now
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home; 