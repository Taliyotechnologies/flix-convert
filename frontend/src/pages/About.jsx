import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Target, Shield, Zap, Globe, Heart, Award, TrendingUp, Code, Server, Lock, Clock } from 'lucide-react';
import './About.css';

const About = () => {
  const stats = [
    { number: '50K+', label: 'Files Processed', icon: <Server size={24} /> },
    { number: '99.9%', label: 'Uptime', icon: <TrendingUp size={24} /> },
    { number: '24/7', label: 'Support', icon: <Clock size={24} /> },
    { number: '100%', label: 'Secure', icon: <Lock size={24} /> }
  ];

  const values = [
    {
      icon: <Users size={32} />,
      title: 'User-First Approach',
      description: 'We believe technology should be accessible to everyone. Our tools are designed with simplicity and ease of use in mind.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Privacy & Security',
      description: 'Your data security is our top priority. All files are automatically deleted after 24 hours and we never access your content.'
    },
    {
      icon: <Zap size={32} />,
      title: 'Performance',
      description: 'Built with cutting-edge technology to provide lightning-fast processing while maintaining the highest quality standards.'
    },
    {
      icon: <Globe size={32} />,
      title: 'Global Accessibility',
      description: 'Available worldwide, supporting multiple languages and accessible on any device or platform.'
    }
  ];

  const team = [
    {
      name: 'Development Team',
      role: 'Core Engineering',
      description: 'Expert developers focused on creating robust, scalable solutions for file processing.'
    },
    {
      name: 'Security Team',
      role: 'Data Protection',
      description: 'Dedicated to ensuring your files and data remain secure and private at all times.'
    },
    {
      name: 'Support Team',
      role: 'User Assistance',
      description: 'Available 24/7 to help you with any questions or technical support needs.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - ConvertFlix</title>
        <meta name="description" content="Learn about the team behind ConvertFlix and our commitment to providing the best file processing tools." />
      </Helmet>

      <div className="about-page">
        <div className="container">
          {/* Header */}
          <div className="about-header">
            <h1 className="about-title">About ConvertFlix</h1>
            <p className="about-subtitle">
              Empowering users worldwide with professional-grade file processing tools
            </p>
          </div>

          {/* Mission Section */}
          <section className="mission-section">
            <div className="mission-content">
              <h2 className="section-title">Our Mission</h2>
              <p className="mission-text">
                ConvertFlix was founded with a simple yet powerful mission: to democratize professional-grade 
                file processing tools. We believe that high-quality file compression and conversion should be 
                accessible to everyone, regardless of their technical expertise or budget.
              </p>
              <p className="mission-text">
                Whether you're a student working on a project, a professional managing business documents, 
                or a creative individual handling multimedia files, our tools are designed to be simple, 
                fast, and secure. We've eliminated the complexity while maintaining the quality that 
                professionals demand.
              </p>
            </div>
          </section>

          {/* Stats Section */}
          <section className="stats-section">
            <h2 className="section-title">Our Impact</h2>
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Values Section */}
          <section className="values-section">
            <h2 className="section-title">Our Values</h2>
            <div className="values-grid">
              {values.map((value, index) => (
                <div key={index} className="value-card">
                  <div className="value-icon">{value.icon}</div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section className="team-section">
            <h2 className="section-title">Our Team</h2>
            <div className="team-grid">
              {team.map((member, index) => (
                <div key={index} className="team-card">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-description">{member.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Technology Section */}
          <section className="technology-section">
            <h2 className="section-title">Our Technology</h2>
            <div className="tech-content">
              <div className="tech-item">
                <div className="tech-icon">
                  <Code size={32} />
                </div>
                <div className="tech-info">
                  <h3>Advanced Algorithms</h3>
                  <p>State-of-the-art compression and conversion algorithms that maintain quality while reducing file sizes.</p>
                </div>
              </div>
              <div className="tech-item">
                <div className="tech-icon">
                  <Server size={32} />
                </div>
                <div className="tech-info">
                  <h3>Cloud Infrastructure</h3>
                  <p>Scalable cloud infrastructure ensuring fast processing times and high availability worldwide.</p>
                </div>
              </div>
              <div className="tech-item">
                <div className="tech-icon">
                  <Shield size={32} />
                </div>
                <div className="tech-info">
                  <h3>Enterprise Security</h3>
                  <p>Bank-level security protocols protecting your files with automatic deletion and encryption.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="about-cta">
            <h2 className="cta-title">Ready to Experience the Difference?</h2>
            <p className="cta-subtitle">
              Join thousands of users who trust ConvertFlix for their file processing needs
            </p>
            <div className="cta-buttons">
              <a href="/tools" className="btn btn-primary">Try Our Tools</a>
              <a href="/contact" className="btn btn-secondary">Get in Touch</a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About; 