import { Link } from 'react-router-dom';
import { Users, Target, Award, Globe, Heart, Shield, Zap, Building2 } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <div className="about-hero">
          <div className="about-hero-content">
            <h1>About Taliyo Technologies</h1>
            <p>
              We are a passionate team of innovators dedicated to creating digital solutions 
              that make life easier and more efficient for everyone.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mission-section">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                At Taliyo Technologies, we believe that technology should simplify, not complicate. 
                Our mission is to create intuitive digital tools that empower individuals and businesses 
                to achieve more with less effort.
              </p>
              <p>
                We focus on user experience, performance, and reliability in everything we build. 
                From file compression tools to advanced web applications, we're committed to delivering 
                solutions that just work.
              </p>
            </div>
            <div className="mission-visual">
              <div className="mission-icon">
                <Target size={48} />
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <Heart size={32} />
              </div>
              <h3>User-First</h3>
              <p>
                Every decision we make starts with our users. We prioritize their needs, 
                feedback, and experience above all else.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <Zap size={32} />
              </div>
              <h3>Innovation</h3>
              <p>
                We constantly explore new technologies and approaches to deliver 
                cutting-edge solutions that solve real problems.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <Shield size={32} />
              </div>
              <h3>Quality</h3>
              <p>
                We maintain the highest standards of quality in our code, design, 
                and user experience. Excellence is non-negotiable.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <Users size={32} />
              </div>
              <h3>Collaboration</h3>
              <p>
                We believe in the power of teamwork and diverse perspectives. 
                Great ideas come from working together.
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="story-section">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Taliyo Technologies was founded with a simple vision: to create digital tools 
                that make complex tasks simple and accessible to everyone. What started as a 
                small team of developers has grown into a company that serves thousands of users worldwide.
              </p>
              <p>
                We began by building file compression tools that were both powerful and easy to use. 
                The positive response from our users encouraged us to expand our offerings, creating 
                a comprehensive suite of digital utilities.
              </p>
              <p>
                Today, we continue to innovate and expand our services, always keeping our users' 
                needs at the center of everything we do. Our commitment to quality, security, and 
                user experience remains unchanged.
              </p>
            </div>
            <div className="story-visual">
              <div className="story-icon">
                <Building2 size={48} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">1M+</div>
              <div className="stat-label">Happy Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">File Formats</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <h2>Our Team</h2>
          <p className="team-intro">
            Meet the passionate individuals behind Taliyo Technologies. We're a diverse team 
            of developers, designers, and innovators committed to excellence.
          </p>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">
                <Users size={32} />
              </div>
              <h3>Development Team</h3>
              <p>
                Our skilled developers work tirelessly to create robust, scalable, 
                and user-friendly applications that meet the highest standards.
              </p>
            </div>

            <div className="team-card">
              <div className="team-avatar">
                <Award size={32} />
              </div>
              <h3>Design Team</h3>
              <p>
                Our designers focus on creating intuitive and beautiful user interfaces 
                that make complex tasks feel simple and enjoyable.
              </p>
            </div>

            <div className="team-card">
              <div className="team-avatar">
                <Globe size={32} />
              </div>
              <h3>Support Team</h3>
              <p>
                Our dedicated support team ensures that every user gets the help they need, 
                when they need it, with a smile.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="about-cta">
          <h2>Ready to Experience the Difference?</h2>
          <p>
            Join thousands of users who trust Taliyo Technologies for their digital needs.
          </p>
          <div className="cta-buttons">
            <Link to="/tools" className="btn btn-primary btn-large">
              Try Our Tools
            </Link>
            <Link to="/contact" className="btn btn-secondary btn-large">
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 