import React from 'react';
import './Owner.css';

const Owner = () => {
  return (
    <div className="owner-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>About Taliyo Technologies</h1>
          <p>The innovative software development company behind ConvertFlix</p>
        </div>
      </div>

      {/* Company Overview */}
      <section className="company-overview">
        <div className="container">
          <div className="section-header">
            <h2>About Taliyo Technologies</h2>
            <p>Leading the digital transformation with innovative web solutions</p>
          </div>
          <div className="overview-content">
            <div className="overview-text">
              <h3>Who We Are</h3>
              <p>
                Taliyo Technologies is a dynamic software development company founded with a vision 
                to create user-friendly applications that solve real-world problems. We specialize 
                in web development, mobile applications, and cloud-based services that help 
                businesses and individuals achieve their digital goals.
              </p>
              <p>
                Our team of experienced developers, designers, and digital strategists work 
                together to deliver cutting-edge solutions that drive growth and innovation. 
                We believe in the power of technology to transform businesses and improve lives.
              </p>
            </div>
            <div className="overview-features">
              <div className="feature-item">
                <div className="feature-icon">🚀</div>
                <h4>Innovation First</h4>
                <p>Pioneering new technologies and approaches</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">💎</div>
                <h4>Quality Focus</h4>
                <p>Delivering excellence in every project</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🤝</div>
                <h4>Client Partnership</h4>
                <p>Building long-term relationships</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Services</h2>
            <p>Comprehensive digital solutions for modern businesses</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🌐</div>
              <h3>Web Development</h3>
              <p>Custom websites, web applications, and e-commerce solutions built with modern technologies.</p>
              <ul>
                <li>React & Next.js Applications</li>
                <li>E-commerce Platforms</li>
                <li>Progressive Web Apps</li>
                <li>API Development</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">📱</div>
              <h3>Mobile Development</h3>
              <p>Native and cross-platform mobile applications for iOS and Android platforms.</p>
              <ul>
                <li>React Native Apps</li>
                <li>Flutter Development</li>
                <li>Native iOS/Android</li>
                <li>App Maintenance</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">☁️</div>
              <h3>Cloud Solutions</h3>
              <p>Scalable cloud infrastructure and DevOps services for optimal performance.</p>
              <ul>
                <li>AWS & Azure Setup</li>
                <li>CI/CD Pipelines</li>
                <li>Server Management</li>
                <li>Security Implementation</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3>UI/UX Design</h3>
              <p>User-centered design solutions that enhance user experience and engagement.</p>
              <ul>
                <li>User Interface Design</li>
                <li>User Experience Research</li>
                <li>Prototyping</li>
                <li>Design Systems</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Achievements</h2>
            <p>Milestones that define our journey of excellence</p>
          </div>
          <div className="achievements-grid">
            <div className="achievement-card">
              <div className="achievement-number">100+</div>
              <div className="achievement-label">Projects Delivered</div>
              <div className="achievement-desc">Successfully completed projects across various industries</div>
            </div>
            <div className="achievement-card">
              <div className="achievement-number">50+</div>
              <div className="achievement-label">Happy Clients</div>
              <div className="achievement-desc">Long-term partnerships with satisfied customers</div>
            </div>
            <div className="achievement-card">
              <div className="achievement-number">5+</div>
              <div className="achievement-label">Years Experience</div>
              <div className="achievement-desc">Deep expertise in modern technologies</div>
            </div>
            <div className="achievement-card">
              <div className="achievement-number">24/7</div>
              <div className="achievement-label">Support Available</div>
              <div className="achievement-desc">Round-the-clock technical support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Team</h2>
            <p>Meet the talented professionals behind our success</p>
          </div>
          <div className="team-content">
            <div className="team-intro">
              <h3>Expert Team</h3>
              <p>
                Our team consists of experienced developers, designers, and digital strategists 
                who are passionate about creating innovative solutions. Each team member brings 
                unique expertise and creativity to every project.
              </p>
            </div>
            <div className="team-roles">
              <div className="role-item">
                <div className="role-icon">👨‍💻</div>
                <h4>Full-Stack Developers</h4>
                <p>Expert in modern web technologies and frameworks</p>
              </div>
              <div className="role-item">
                <div className="role-icon">🎨</div>
                <h4>UI/UX Designers</h4>
                <p>Creating beautiful and functional user experiences</p>
              </div>
              <div className="role-item">
                <div className="role-icon">📱</div>
                <h4>Mobile Developers</h4>
                <p>Building native and cross-platform mobile apps</p>
              </div>
              <div className="role-item">
                <div className="role-icon">🔧</div>
                <h4>DevOps Engineers</h4>
                <p>Managing infrastructure and deployment pipelines</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ConvertFlix Project */}
      <section className="project-section">
        <div className="container">
          <div className="section-header">
            <h2>ConvertFlix Project</h2>
            <p>Our flagship file conversion platform</p>
          </div>
          <div className="project-content">
            <div className="project-info">
              <h3>About ConvertFlix</h3>
              <p>
                ConvertFlix is one of our most successful projects - a comprehensive file 
                conversion platform that helps users convert and compress various file formats 
                including images, videos, audio, and PDFs. Built with modern web technologies, 
                it provides a seamless user experience with powerful conversion capabilities.
              </p>
              <div className="project-features">
                <div className="project-feature">
                  <span className="feature-icon">⚡</span>
                  <span>Fast & Efficient</span>
                </div>
                <div className="project-feature">
                  <span className="feature-icon">🔒</span>
                  <span>Secure Processing</span>
                </div>
                <div className="project-feature">
                  <span className="feature-icon">📱</span>
                  <span>Mobile Optimized</span>
                </div>
                <div className="project-feature">
                  <span className="feature-icon">🌐</span>
                  <span>Multiple Formats</span>
                </div>
              </div>
            </div>
            <div className="project-stats">
              <div className="project-stat">
                <div className="stat-number">10M+</div>
                <div className="stat-label">Files Processed</div>
              </div>
              <div className="project-stat">
                <div className="stat-number">50+</div>
                <div className="stat-label">Supported Formats</div>
              </div>
              <div className="project-stat">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2>Get In Touch</h2>
            <p>Ready to start your next project? Let's talk!</p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">🌐</div>
                <div>
                  <h4>Website</h4>
                  <a href="https://taliyotechnologies.com" target="_blank" rel="noopener noreferrer">
                    taliyotechnologies.com
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:support@convertflix.com">support@convertflix.com</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">💼</div>
                <div>
                  <h4>Services</h4>
                  <p>Web Development, Mobile Apps, Cloud Solutions</p>
                </div>
              </div>
            </div>
            <div className="contact-cta">
              <h3>Start Your Project</h3>
              <p>Let's discuss how we can help bring your ideas to life</p>
              <div className="cta-buttons">
                <a href="mailto:support@convertflix.com" className="btn-primary">
                  Contact Us
                </a>
                <a href="https://taliyotechnologies.com" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Owner; 