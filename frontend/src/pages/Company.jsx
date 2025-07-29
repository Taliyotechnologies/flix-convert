import { Helmet } from 'react-helmet-async';
import { FiUsers, FiTarget, FiAward, FiHeart } from 'react-icons/fi';
import './Company.css';

const Company = () => {
  return (
    <>
      <Helmet>
        <title>About Us - ConvertFlix</title>
        <meta name="description" content="Learn about ConvertFlix, our mission to provide free file compression and conversion tools, and our commitment to user privacy and security." />
      </Helmet>

      <div className="company">
        <div className="hero-section">
          <div className="container">
            <h1>About ConvertFlix</h1>
            <p className="hero-subtitle">
              Empowering users with free, secure, and efficient file compression tools
            </p>
          </div>
        </div>

        <div className="container">
          <div className="mission-section">
            <div className="section-header">
              <FiTarget className="section-icon" />
              <h2>Our Mission</h2>
            </div>
            <p>
              At ConvertFlix, we believe that file compression and conversion should be accessible to everyone. 
              Our mission is to provide high-quality, free tools that help users optimize their digital files 
              without compromising on quality or security.
            </p>
            <p>
              Whether you're a student, professional, or casual user, our platform offers the tools you need 
              to compress images, videos, audio files, and PDFs with ease. We're committed to maintaining 
              the highest standards of privacy and security while delivering exceptional user experiences.
            </p>
          </div>

          <div className="values-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">
                  <FiHeart />
                </div>
                <h3>User-First</h3>
                <p>
                  Every feature we build is designed with our users in mind. We prioritize simplicity, 
                  efficiency, and accessibility in everything we do.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon">
                  <FiAward />
                </div>
                <h3>Quality</h3>
                <p>
                  We maintain the highest standards of quality in our compression algorithms, ensuring 
                  that your files retain their integrity while achieving optimal file sizes.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon">
                  <FiUsers />
                </div>
                <h3>Community</h3>
                <p>
                  We believe in building a community of users who can rely on our tools for their 
                  file management needs, with continuous feedback and improvement.
                </p>
              </div>
            </div>
          </div>

          <div className="features-section">
            <h2>Why Choose ConvertFlix?</h2>
            <div className="features-grid">
              <div className="feature-item">
                <h3>🆓 Completely Free</h3>
                <p>All our tools are free to use with no hidden costs or premium tiers.</p>
              </div>

              <div className="feature-item">
                <h3>🔒 Privacy Focused</h3>
                <p>Your files are processed securely and automatically deleted after 24 hours.</p>
              </div>

              <div className="feature-item">
                <h3>⚡ Fast Processing</h3>
                <p>Advanced algorithms ensure quick compression without quality loss.</p>
              </div>

              <div className="feature-item">
                <h3>📱 User Friendly</h3>
                <p>Intuitive interface designed for users of all technical levels.</p>
              </div>

              <div className="feature-item">
                <h3>🔄 Multiple Formats</h3>
                <p>Support for images, videos, audio files, and PDFs in various formats.</p>
              </div>

              <div className="feature-item">
                <h3>🌐 No Registration</h3>
                <p>Start using our tools immediately without creating an account.</p>
              </div>
            </div>
          </div>

          <div className="stats-section">
            <h2>Our Impact</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">10MB+</div>
                <div className="stat-label">Files Processed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50%+</div>
                <div className="stat-label">Average Compression</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Service Availability</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Free Service</div>
              </div>
            </div>
          </div>

          <div className="contact-section">
            <h2>Get in Touch</h2>
            <p>
              Have questions, suggestions, or feedback? We'd love to hear from you! 
              Our team is committed to continuously improving our platform based on user needs.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <strong>Email:</strong> support@convertflix.com
              </div>
              <div className="contact-item">
                <strong>Response Time:</strong> Within 24 hours
              </div>
              <div className="contact-item">
                <strong>Support:</strong> Available for all users
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Company; 