import React from 'react';
import { Link } from 'react-router-dom';
import './Tools.css';

const Tools: React.FC = () => {
  const convertTools = [
    {
      title: 'Convert Image',
      description: 'Convert images between JPG, PNG, WebP, GIF, and more formats',
      icon: (
        <svg className="tool-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      features: ['JPG to PNG', 'PNG to WebP', 'GIF to MP4', 'BMP to JPG'],
      href: '/convert/image',
      color: 'blue'
    },
    {
      title: 'Convert Video',
      description: 'Convert videos between MP4, AVI, MOV, MKV, and more formats',
      icon: (
        <svg className="tool-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      features: ['MP4 to AVI', 'MOV to MP4', 'MKV to MP4', 'WebM to MP4'],
      href: '/convert/video',
      color: 'purple'
    },
    {
      title: 'Convert PDF',
      description: 'Convert PDFs to Word, Excel, PowerPoint, and image formats',
      icon: (
        <svg className="tool-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      features: ['PDF to Word', 'PDF to Excel', 'PDF to Images', 'PDF to HTML'],
      href: '/convert/pdf',
      color: 'red'
    },
    {
      title: 'Convert Audio',
      description: 'Convert audio files between MP3, WAV, FLAC, AAC, and more',
      icon: (
        <svg className="tool-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      features: ['MP3 to WAV', 'WAV to MP3', 'FLAC to MP3', 'AAC to MP3'],
      href: '/convert/audio',
      color: 'green'
    }
  ];

  const compressTools = [
    {
      title: 'Compress Image',
      description: 'Reduce image file size while maintaining quality',
      icon: (
        <svg className="tool-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      features: ['Up to 80% reduction', 'Quality preservation', 'Batch processing'],
      href: '/compress/image',
      color: 'blue'
    },
    {
      title: 'Compress Video',
      description: 'Reduce video file size with minimal quality loss',
      icon: (
        <svg className="tool-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      features: ['Multiple formats', 'Quality control', 'Fast processing'],
      href: '/compress/video',
      color: 'purple'
    },
    {
      title: 'Compress PDF',
      description: 'Reduce PDF file size for easier sharing and storage',
      icon: (
        <svg className="tool-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      features: ['Smart compression', 'Text optimization', 'Image compression'],
      href: '/compress/pdf',
      color: 'red'
    },
    {
      title: 'Compress Audio',
      description: 'Reduce audio file size while maintaining quality',
      icon: (
        <svg className="tool-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      features: ['Multiple formats', 'Quality settings', 'Batch processing'],
      href: '/compress/audio',
      color: 'green'
    }
  ];

  const categories = [
    {
      title: 'Convert Files',
      description: 'Transform your files between different formats',
      tools: convertTools,
      icon: (
        <svg className="category-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      title: 'Compress Files',
      description: 'Reduce file sizes for easier sharing and storage',
      tools: compressTools,
      icon: (
        <svg className="category-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      )
    }
  ];

  return (
    <div className="tools-page">
      {/* Hero Section */}
      <section className="tools-hero">
        <div className="container">
          <div className="tools-hero-content">
            <h1 className="tools-hero-title">
              Professional File
              <span className="tools-hero-accent"> Tools</span>
            </h1>
            <p className="tools-hero-subtitle">
              Convert and compress files with our comprehensive suite of professional tools. 
              Support for images, videos, PDFs, and audio files.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Categories */}
      <section className="tools-categories">
        <div className="container">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="tools-category">
              <div className="category-header">
                <div className="category-icon">{category.icon}</div>
                <div className="category-content">
                  <h2 className="category-title">{category.title}</h2>
                  <p className="category-description">{category.description}</p>
                </div>
              </div>

              <div className="tools-grid">
                {category.tools.map((tool, toolIndex) => (
                  <div key={toolIndex} className={`tool-card tool-card-${tool.color}`}>
                    <div className="tool-header">
                      <div className="tool-icon">{tool.icon}</div>
                      <h3 className="tool-title">{tool.title}</h3>
                    </div>
                    
                    <p className="tool-description">{tool.description}</p>
                    
                    <ul className="tool-features">
                      {tool.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="tool-feature">
                          <svg className="feature-check" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="tools-features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Our Tools?</h2>
            <p className="section-subtitle">
              Professional-grade file processing with enterprise-level security and performance
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-description">
                Process files in seconds with our optimized cloud infrastructure
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="feature-title">Secure & Private</h3>
              <p className="feature-description">
                Your files are encrypted and automatically deleted after processing
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="feature-title">Free Forever</h3>
              <p className="feature-description">
                No hidden fees or subscriptions. Convert unlimited files for free
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="feature-title">Batch Processing</h3>
              <p className="feature-description">
                Convert multiple files at once to save time and effort
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="feature-title">Quality Control</h3>
              <p className="feature-description">
                Maintain file quality with advanced compression algorithms
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="feature-title">Mobile Friendly</h3>
              <p className="feature-description">
                Use our tools on any device with responsive design
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="tools-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-subtitle">
              Choose any tool above to start converting and compressing your files. 
              No registration required - start using our tools instantly!
            </p>
            <div className="cta-buttons">
              <Link to="/" className="btn btn-primary">
                Back to Home
              </Link>
              <Link to="/company/about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tools; 