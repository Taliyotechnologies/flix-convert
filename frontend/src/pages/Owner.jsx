import { Link } from 'react-router-dom';
import { Building2, Users, Target, Award, Globe, Phone, Mail, MapPin } from 'lucide-react';
import './Owner.css';

const Owner = () => {
  return (
    <div className="owner-page">
      <div className="container">
        {/* Hero Section */}
        <div className="owner-hero">
          <div className="owner-hero-content">
            <div className="company-badge">
              <Building2 size={24} />
              <span>Taliyo Technologies</span>
            </div>
            <h1 className="owner-title">
              Empowering Digital Innovation
            </h1>
            <p className="owner-subtitle">
              We are a forward-thinking technology company dedicated to creating innovative solutions 
              that simplify digital workflows and enhance user experiences.
            </p>
          </div>
        </div>

        {/* Company Info */}
        <div className="company-info">
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">
                <Target size={32} />
              </div>
              <h3>Our Mission</h3>
              <p>
                To provide cutting-edge digital tools that empower individuals and businesses 
                to work more efficiently and achieve their goals with ease.
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <Users size={32} />
              </div>
              <h3>Our Team</h3>
              <p>
                A passionate team of developers, designers, and innovators committed to 
                delivering exceptional user experiences and reliable solutions.
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <Award size={32} />
              </div>
              <h3>Our Values</h3>
              <p>
                Innovation, quality, user-centric design, and continuous improvement 
                drive everything we do at Taliyo Technologies.
              </p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="services-section">
          <h2 className="section-title">What We Do</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <Globe size={32} />
              </div>
              <h3>Web Development</h3>
              <p>
                Creating modern, responsive web applications that deliver exceptional 
                user experiences across all devices.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Building2 size={32} />
              </div>
              <h3>Digital Tools</h3>
              <p>
                Developing innovative digital tools and utilities that simplify 
                complex tasks and improve productivity.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Users size={32} />
              </div>
              <h3>User Experience</h3>
              <p>
                Focusing on intuitive design and seamless interactions to create 
                products that users love to use.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="contact-section">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">
                <Mail size={24} />
              </div>
              <h3>Email</h3>
              <p>info@taliyotechnologies.com</p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <Phone size={24} />
              </div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <MapPin size={24} />
              </div>
              <h3>Location</h3>
              <p>Tech Hub, Innovation District</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2>Ready to Transform Your Digital Experience?</h2>
          <p>
            Join thousands of users who trust Taliyo Technologies for their digital needs.
          </p>
          <div className="cta-buttons">
            <Link to="/tools" className="btn btn-primary btn-large">
              Explore Our Tools
            </Link>
            <Link to="/contact" className="btn btn-secondary btn-large">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Owner; 