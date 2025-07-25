import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-hero">
          <h1>About ConvertFlix</h1>
          <p className="tagline">Simplifying Digital Transformation</p>
        </div>

        <div className="about-content">
          <div className="about-card">
            <h2>Our Mission</h2>
            <p>At ConvertFlix, we're dedicated to making file conversion and compression as seamless as possible. Our mission is to provide fast, secure, and high-quality conversion tools that just work.</p>
          </div>

          <div className="about-card">
            <h2>Why Choose Us?</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <h3>Lightning Fast</h3>
                <p>Process files in seconds with our optimized conversion engine</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔒</div>
                <h3>Secure</h3>
                <p>Your files are processed securely and never stored permanently</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🎨</div>
                <h3>High Quality</h3>
                <p>Maintain the highest quality with our advanced algorithms</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🌐</div>
                <h3>Accessible</h3>
                <p>Use our tools from any device, anywhere in the world</p>
              </div>
            </div>
          </div>

          <div className="about-card team-section">
            <h2>Our Team</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-avatar">👨‍💻</div>
                <h3>John Doe</h3>
                <p>Founder & CEO</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">👩‍💻</div>
                <h3>Jane Smith</h3>
                <p>Lead Developer</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">🎨</div>
                <h3>Alex Johnson</h3>
                <p>UI/UX Designer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
