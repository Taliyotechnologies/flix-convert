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
      description: 'Your files are automatically deleted after 24 hours'
    },
    {
      icon: '🌐',
      title: 'Cross Platform',
      description: 'Works on any device - Windows, Mac, Linux, Mobile'
    },
    {
      icon: '✨',
      title: 'Quality Preserved',
      description: 'Maintain original quality while reducing file size'
    },
    {
      icon: '📁',
      title: 'Multi-format Support',
      description: 'Support for images, videos, PDFs, and audio files'
    },
    {
      icon: '🎁',
      title: 'Free Up to 10MB',
      description: 'No registration required for files under 10MB'
    }
  ];

  return (
    <>
      <Helmet>
        <title>ConvertFlix - Compress & Convert Files Instantly — Free Up to 10MB</title>
        <meta name="description" content="Fast, secure & cross-platform compression and conversion tool. Free up to 10MB. Support for images, videos, PDFs, and audio files." />
        <meta name="keywords" content="file compression, file conversion, image compression, video compression, PDF compression, audio conversion" />
        <meta property="og:title" content="ConvertFlix - Compress & Convert Files Instantly" />
        <meta property="og:description" content="Fast, secure & cross-platform compression and conversion tool. Free up to 10MB." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://convertflix.com" />
        <link rel="canonical" href="https://convertflix.com" />
      </Helmet>

      <div className="home">
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">
                  Compress & Convert Files Instantly — Free Up to 10MB
                </h1>
                <p className="hero-subtitle">
                  Fast, secure & cross-platform compression and conversion tool. 
                  Support for images, videos, PDFs, and audio files.
                </p>
                <div className="hero-buttons">
                  <Link to="/tools" className="btn btn-primary">
                    Try Tools
                  </Link>
                  <Link to="/about" className="btn btn-secondary">
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="hero-illustration">
                <div className="file-illustration">
                  <div className="file-icon">📄</div>
                  <div className="compression-arrow">→</div>
                  <div className="compressed-file">📦</div>
                  <div className="sparkles">✨</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <div className="container">
            <div className="features-header">
              <h2 className="section-title">Why Choose ConvertFlix?</h2>
              <p className="section-subtitle">
                Professional-grade tools with enterprise-level security
              </p>
            </div>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card fade-in">
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
          <div className="container">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Get Started?</h2>
              <p className="cta-subtitle">
                Join thousands of users who trust ConvertFlix for their file processing needs
              </p>
              <Link to="/tools" className="btn btn-primary btn-large">
                Start Converting Now
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home; 