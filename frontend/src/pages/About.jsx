import React from 'react';
import { useTheme } from '../App';
import './About.css';

const About = () => {
  const { theme } = useTheme();

  return (
    <div className={`about-container ${theme}`}>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1 className="hero-title">About ConvertFlix</h1>
          <p className="hero-subtitle">
            Empowering users worldwide with professional file conversion and compression solutions
          </p>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              ConvertFlix was developed by <strong>Taliyo Technologies</strong>, a leading software development 
              company specializing in innovative web solutions and digital tools. Founded with a vision to 
              create user-friendly applications that solve real-world problems, Taliyo Technologies has been 
              at the forefront of digital innovation.
            </p>
            <p>
              The idea for ConvertFlix emerged from the common challenges users face when working with 
              different file formats. Whether it's converting PDFs to Word documents, compressing 
              large images for web use, or transforming video files for different platforms, we 
              wanted to create a solution that was both powerful and user-friendly.
            </p>
            <p>
              Today, ConvertFlix stands as a comprehensive platform that handles all major file types 
              with advanced processing capabilities, ensuring quality preservation while delivering 
              lightning-fast results. This project represents Taliyo Technologies' commitment to 
              creating tools that make digital workflows more efficient and accessible.
            </p>
          </div>
        </div>
      </section>

      {/* About Taliyo Technologies Section */}
      <section className="company-section">
        <div className="container">
          <h2>About Taliyo Technologies</h2>
          <div className="company-content">
            <div className="company-info">
              <h3>Who We Are</h3>
              <p>
                Taliyo Technologies is a dynamic software development company dedicated to creating 
                innovative digital solutions that enhance productivity and user experience. We specialize 
                in web development, mobile applications, and cloud-based services that help businesses 
                and individuals achieve their digital goals.
              </p>
              <p>
                Our team of experienced developers, designers, and technology experts work together 
                to deliver cutting-edge solutions that are not only functional but also intuitive and 
                user-friendly. We believe in the power of technology to transform how people work and 
                interact with digital content.
              </p>
            </div>
            <div className="company-stats">
              <div className="company-stat">
                <span className="stat-number">5+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="company-stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="company-stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mission-card">
              <div className="card-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="20" stroke="#3B82F6" strokeWidth="2"/>
                  <path d="M24 12v24M12 24h24" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Our Mission</h3>
              <p>
                To democratize file conversion and compression technology, making professional-grade 
                tools accessible to everyone. We believe that quality file management should be 
                simple, fast, and secure.
              </p>
            </div>
            <div className="vision-card">
              <div className="card-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4l6 6-6 6M24 44l-6-6 6-6" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="24" cy="24" r="8" stroke="#10B981" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Our Vision</h3>
              <p>
                To become the world's leading platform for file transformation, setting industry 
                standards for speed, quality, and user experience while maintaining the highest 
                levels of security and privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect x="8" y="8" width="24" height="24" rx="4" stroke="#EF4444" strokeWidth="2"/>
                  <path d="M16 20l4 4 8-8" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Quality First</h3>
              <p>We never compromise on the quality of our conversions and compressions, ensuring your files maintain their integrity.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="16" stroke="#F59E0B" strokeWidth="2"/>
                  <path d="M20 8v24M8 20h24" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Speed & Efficiency</h3>
              <p>Our optimized processing engine ensures your files are converted and compressed in seconds, not minutes.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect x="8" y="8" width="24" height="24" rx="4" stroke="#8B5CF6" strokeWidth="2"/>
                  <path d="M16 16h8v8h-8z" fill="#8B5CF6" opacity="0.2"/>
                </svg>
              </div>
              <h3>Privacy & Security</h3>
              <p>Your files are processed locally and never stored on our servers. Your privacy is our top priority.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="16" stroke="#06B6D4" strokeWidth="2"/>
                  <path d="M20 12v16M12 20h16" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Accessibility</h3>
              <p>We believe technology should be accessible to everyone, which is why our platform is free and requires no registration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="technology-section">
        <div className="container">
          <h2>Our Technology</h2>
          <div className="tech-content">
            <div className="tech-info">
              <h3>Advanced Processing Engine</h3>
              <p>
                ConvertFlix utilizes cutting-edge algorithms and machine learning techniques to 
                deliver superior file conversion and compression results. Our technology stack 
                includes:
              </p>
              <ul className="tech-list">
                <li>Advanced compression algorithms for optimal file size reduction</li>
                <li>AI-powered quality preservation during conversions</li>
                <li>Real-time processing with cloud-based infrastructure</li>
                <li>Multi-format support with continuous updates</li>
                <li>Secure processing with end-to-end encryption</li>
              </ul>
            </div>
            <div className="tech-stats">
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Supported Formats</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Uptime</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">2M+</span>
                <span className="stat-label">Files Processed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">&lt;30s</span>
                <span className="stat-label">Average Processing Time</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Choose ConvertFlix?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 16l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>100% Privacy</h3>
              <p>Your files are processed locally and never stored on our servers. Complete privacy guaranteed.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 8v16M8 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Lightning Fast</h3>
              <p>Advanced processing engine ensures your files are converted and compressed in seconds.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="6" y="6" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M10 10h12v12H10z" fill="currentColor" opacity="0.3"/>
                </svg>
              </div>
              <h3>All Major Formats</h3>
              <p>Support for PDF, images, videos, audio, and documents. We handle all your conversion needs.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 10v12M10 16h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Free & No Sign-up</h3>
              <p>Use our platform completely free. No registration, no hidden fees, no limitations.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 12h8v8h-8z" fill="currentColor" opacity="0.2"/>
                </svg>
              </div>
              <h3>Quality Preservation</h3>
              <p>Advanced algorithms ensure your files maintain their quality during conversion and compression.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 8l4 4-4 4M16 24l-4-4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Cross-Platform</h3>
              <p>Works seamlessly on desktop, tablet, and mobile devices. Access from anywhere, anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Our Team</h2>
          <p className="team-intro">
            ConvertFlix is powered by the talented team at Taliyo Technologies, passionate about 
            creating the best file conversion experience for our users.
          </p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="40" cy="32" r="12" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 64c0-13.3 10.7-24 24-24s24 10.7 24 24" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Development Team</h3>
              <p>Expert engineers and developers working on cutting-edge file processing technology.</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="40" cy="32" r="12" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 64c0-13.3 10.7-24 24-24s24 10.7 24 24" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Design Team</h3>
              <p>Creative designers focused on creating intuitive and beautiful user experiences.</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="40" cy="32" r="12" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 64c0-13.3 10.7-24 24-24s24 10.7 24 24" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Support Team</h3>
              <p>Dedicated support specialists ready to help you with any questions or issues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <h2>Get in Touch</h2>
          <p>
            Have questions, suggestions, or need support? We'd love to hear from you! 
            Our team at Taliyo Technologies is here to help and always welcomes feedback to improve our platform.
          </p>
          <div className="contact-options">
            <a href="/contact" className="contact-btn primary">Contact Support</a>
            <a href="/contact" className="contact-btn secondary">Send Feedback</a>
            <a href="https://taliyotechnologies.com/" target="_blank" rel="noopener noreferrer" className="contact-btn secondary">Visit Taliyo Technologies</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
