import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span>📖 About Us</span>
          </div>
          <h1 className="hero-title">
            About <span className="gradient-text">ConvertFlix</span>
          </h1>
          <p className="hero-description">
            Your trusted platform for file conversion and compression. We make digital file 
            management simple, fast, and secure for everyone.
          </p>
        </div>
        <div className="hero-visual">
          <div className="hero-illustration">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="60" r="50" fill="url(#heroGradient)" opacity="0.1"/>
              <path d="M40 40h40v40H40z" stroke="url(#heroGradient)" strokeWidth="2" fill="none"/>
              <path d="M50 50h20v20H50z" fill="url(#heroGradient)"/>
              <defs>
                <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6"/>
                  <stop offset="100%" stopColor="#10B981"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              ConvertFlix was born from a simple need - to make file conversion and compression 
              accessible to everyone. In today's digital world, we constantly work with various 
              file formats, and the need to convert or compress files arises frequently.
            </p>
            <p>
              Our platform was designed with user experience in mind. We believe that powerful 
              tools should be simple to use, fast, and secure. Whether you're a student, 
              professional, or casual user, ConvertFlix provides the tools you need to manage 
              your digital files effectively.
            </p>
            <p>
              We're committed to continuous improvement and innovation, always looking for ways 
              to enhance our services and provide better solutions for our users.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-card">
              <div className="mission-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                To provide fast, reliable, and user-friendly file conversion and compression 
                services that help people work more efficiently with their digital files.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">🔮</div>
              <h3>Our Vision</h3>
              <p>
                To become the leading platform for digital file management, offering comprehensive 
                solutions that simplify the way people handle their files across all devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Core Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Speed & Efficiency</h3>
              <p>We prioritize fast processing and quick results to save your valuable time.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔒</div>
              <h3>Security & Privacy</h3>
              <p>Your files are processed securely and deleted immediately after conversion.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🎨</div>
              <h3>User Experience</h3>
              <p>We design our tools to be intuitive and easy to use for everyone.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌐</div>
              <h3>Accessibility</h3>
              <p>Our services are available to everyone, regardless of technical expertise.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="technology-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Technology</h2>
            <p>Built with modern, reliable technologies</p>
          </div>
          <div className="tech-content">
            <div className="tech-info">
              <h3>Modern Stack</h3>
              <p>
                ConvertFlix is built using cutting-edge web technologies to ensure fast, 
                reliable, and secure file processing. Our platform leverages the latest 
                advancements in web development to provide the best possible user experience.
              </p>
              <div className="tech-features">
                <div className="tech-feature">
                  <span className="feature-icon">⚡</span>
                  <span>High Performance</span>
                </div>
                <div className="tech-feature">
                  <span className="feature-icon">🔒</span>
                  <span>Secure Processing</span>
                </div>
                <div className="tech-feature">
                  <span className="feature-icon">📱</span>
                  <span>Mobile Optimized</span>
                </div>
                <div className="tech-feature">
                  <span className="feature-icon">🌐</span>
                  <span>Cross-Platform</span>
                </div>
              </div>
            </div>
            <div className="tech-stats">
              <div className="tech-stat">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
              <div className="tech-stat">
                <div className="stat-number">&lt;5s</div>
                <div className="stat-label">Average Processing</div>
              </div>
              <div className="tech-stat">
                <div className="stat-number">256-bit</div>
                <div className="stat-label">Encryption</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>What We Offer</h2>
            <p>Comprehensive file management solutions</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🖼️</div>
              <h3>Image Conversion</h3>
              <p>Convert images between JPG, PNG, WebP, GIF, and more formats with quality preservation.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎥</div>
              <h3>Video Conversion</h3>
              <p>Convert videos to MP4, AVI, MOV, and other popular formats with customizable settings.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎵</div>
              <h3>Audio Conversion</h3>
              <p>Convert audio files between MP3, WAV, FLAC, AAC, and other audio formats.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📄</div>
              <h3>PDF Conversion</h3>
              <p>Convert PDFs to Word, Text, HTML, and other editable formats.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🗜️</div>
              <h3>File Compression</h3>
              <p>Compress images, videos, audio, and PDFs to reduce file size while maintaining quality.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Access all our tools on any device with our responsive, mobile-optimized interface.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2>Get In Touch</h2>
            <p>Have questions or feedback? We'd love to hear from you!</p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div>
                  <h4>Email Support</h4>
                  <a href="mailto:support@convertflix.com">support@convertflix.com</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">💬</div>
                <div>
                  <h4>Feedback</h4>
                  <p>Share your thoughts and suggestions with us</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">🚀</div>
                <div>
                  <h4>Feature Requests</h4>
                  <p>Let us know what features you'd like to see</p>
                </div>
              </div>
            </div>
            <div className="contact-cta">
              <h3>Ready to Get Started?</h3>
              <p>Try our tools today and experience the difference</p>
              <div className="contact-options">
                <a href="/" className="contact-btn primary">Start Converting</a>
                <a href="/contact" className="contact-btn secondary">Contact Support</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
