import React from 'react';
import { Link } from 'react-router-dom';
import './Company.css';

const About: React.FC = () => {
  const values = [
    {
      title: 'Innovation',
      description: 'We continuously push the boundaries of file processing technology to deliver cutting-edge solutions.',
      icon: '🚀'
    },
    {
      title: 'Security',
      description: 'Your privacy and data security are our top priorities. We use enterprise-grade encryption.',
      icon: '🔒'
    },
    {
      title: 'Accessibility',
      description: 'We believe file conversion should be accessible to everyone, regardless of technical expertise.',
      icon: '🌍'
    },
    {
      title: 'Quality',
      description: 'We maintain the highest standards of quality in all our tools and services.',
      icon: '⭐'
    }
  ];

  const stats = [
    { number: '10M+', label: 'Files Converted' },
    { number: '50+', label: 'Supported Formats' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

  const team = [
    {
      name: 'Alex Johnson',
      role: 'CEO & Founder',
      bio: 'Passionate about making file conversion accessible to everyone.',
      avatar: '👨‍💼'
    },
    {
      name: 'Sarah Chen',
      role: 'CTO',
      bio: 'Expert in cloud infrastructure and file processing technologies.',
      avatar: '👩‍💻'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Head of Product',
      bio: 'Focused on creating intuitive and powerful user experiences.',
      avatar: '👨‍🎨'
    }
  ];

  return (
    <div className="company-page">
      {/* Hero Section */}
      <section className="company-hero">
        <div className="container">
          <div className="company-hero-content">
            <h1 className="company-hero-title">
              About
              <span className="company-hero-accent"> FlixConvert</span>
            </h1>
            <p className="company-hero-subtitle">
              We're on a mission to make file conversion and compression accessible to everyone. 
              Our professional tools help millions of users transform their files every day.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="company-mission">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2 className="mission-title">Our Mission</h2>
              <p className="mission-description">
                At FlixConvert, we believe that file conversion shouldn't be complicated or expensive. 
                Our mission is to provide professional-grade file processing tools that are accessible 
                to everyone, from individual users to large organizations.
              </p>
              <p className="mission-description">
                We started with a simple idea: make file conversion as easy as possible while maintaining 
                the highest standards of quality and security. Today, we serve millions of users worldwide 
                who trust our platform for their file processing needs.
              </p>
            </div>
            <div className="mission-stats">
              {stats.map((stat, index) => (
                <div key={index} className="mission-stat">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="company-values">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="company-team">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              The passionate people behind FlixConvert
            </p>
          </div>

          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">{member.avatar}</div>
                <h3 className="team-name">{member.name}</h3>
                <div className="team-role">{member.role}</div>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="company-story">
        <div className="container">
          <div className="story-content">
            <h2 className="story-title">Our Story</h2>
            <div className="story-text">
              <p>
                FlixConvert was born from frustration. Our founders were tired of complicated, 
                expensive file conversion tools that required technical expertise to use. 
                They envisioned a platform where anyone could convert their files with just a few clicks.
              </p>
              <p>
                What started as a simple image converter has grown into a comprehensive suite 
                of professional tools supporting images, videos, PDFs, and audio files. 
                Today, we process millions of files every month, helping users worldwide 
                transform their content efficiently and securely.
              </p>
              <p>
                We're committed to continuous innovation, always looking for ways to improve 
                our tools and add new features that our users need. Our goal is to remain 
                the most trusted platform for file conversion and compression.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="company-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-subtitle">
              Join millions of users who trust FlixConvert for their file processing needs. 
              Start converting your files today - it's completely free!
            </p>
            <div className="cta-buttons">
              <Link to="/tools" className="btn btn-primary">
                Try Our Tools
              </Link>
              <Link to="/company/contact" className="btn btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 