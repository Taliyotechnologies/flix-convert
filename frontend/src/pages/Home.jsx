import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './Home.css';

const Home = () => {
  const tools = [
    {
      type: 'image',
      title: 'Image Tools',
      description: 'Compress and convert images to different formats',
      icon: '🖼️',
      features: ['JPEG, PNG, WebP support', 'Quality control', 'Batch processing']
    },
    {
      type: 'video',
      title: 'Video Tools',
      description: 'Compress and convert videos to various formats',
      icon: '🎥',
      features: ['MP4, AVI, MOV support', 'Quality settings', 'Fast processing']
    },
    {
      type: 'audio',
      title: 'Audio Tools',
      description: 'Compress and convert audio files',
      icon: '🎵',
      features: ['MP3, WAV, FLAC support', 'Bitrate control', 'High quality']
    },
    {
      type: 'pdf',
      title: 'PDF Tools',
      description: 'Compress and convert PDF documents',
      icon: '📄',
      features: ['PDF compression', 'Format conversion', 'Secure processing']
    }
  ];

  return (
    <>
      <Helmet>
        <title>ConvertFlix - Free File Compression & Conversion Tool</title>
        <meta name="description" content="Free online file compression and conversion tool. Compress images, videos, audio, and PDFs. Convert files to different formats easily." />
      </Helmet>

      <div className="home">
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                Free File Compression & Conversion
              </h1>
              <p className="hero-description">
                Compress and convert your files online for free. Support for images, videos, audio, and PDFs. 
                Fast, secure, and easy to use.
              </p>
              <div className="hero-actions">
                <Link to="/tools" className="btn btn-primary hero-btn">
                  Get Started
                </Link>
                <Link to="/tool/image" className="btn btn-secondary hero-btn">
                  Try Image Tool
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <div className="container">
            <h2 className="section-title">Why Choose ConvertFlix?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Fast Processing</h3>
                <p>Advanced algorithms ensure quick file processing without compromising quality.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Secure & Private</h3>
                <p>Your files are automatically deleted after 24 hours. We never store your data permanently.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💯</div>
                <h3>High Quality</h3>
                <p>Maintain excellent quality while reducing file sizes significantly.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🌐</div>
                <h3>No Registration</h3>
                <p>Use all features without creating an account. Start processing files immediately.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="tools-section">
          <div className="container">
            <h2 className="section-title">Our Tools</h2>
            <div className="tools-grid">
              {tools.map((tool) => (
                <div key={tool.type} className="tool-card">
                  <div className="tool-icon">{tool.icon}</div>
                  <h3 className="tool-title">{tool.title}</h3>
                  <p className="tool-description">{tool.description}</p>
                  <ul className="tool-features">
                    {tool.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  <Link to={`/tool/${tool.type}`} className="btn btn-primary tool-btn">
                    Use {tool.title}
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
              <h2>Ready to Compress Your Files?</h2>
              <p>Join thousands of users who trust ConvertFlix for their file compression needs.</p>
              <Link to="/tools" className="btn btn-primary cta-btn">
                Start Compressing Now
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home; 