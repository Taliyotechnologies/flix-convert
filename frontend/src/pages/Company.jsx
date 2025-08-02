import React from 'react'
import { Helmet } from 'react-helmet-async'
import './Company.css'

const Company = () => {
  const team = [
    {
      name: 'Alex Johnson',
      role: 'CEO & Founder',
      bio: 'Passionate about making file processing accessible to everyone.',
      avatar: '👨‍💼'
    },
    {
      name: 'Sarah Chen',
      role: 'CTO',
      bio: 'Expert in cloud infrastructure and scalable systems.',
      avatar: '👩‍💻'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Lead Developer',
      bio: 'Full-stack developer focused on user experience.',
      avatar: '👨‍💻'
    },
    {
      name: 'Emily Davis',
      role: 'Product Manager',
      bio: 'Dedicated to creating intuitive user experiences.',
      avatar: '👩‍💼'
    }
  ]

  const values = [
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'Your files are encrypted and automatically deleted after 24 hours.'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Process files in seconds with our optimized algorithms.'
    },
    {
      icon: '🌍',
      title: 'Accessible',
      description: 'Free tools available to everyone, no registration required.'
    },
    {
      icon: '🛡️',
      title: 'Secure',
      description: 'Enterprise-grade security for all your file processing needs.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>About Us - ConvertFlix</title>
        <meta name="description" content="Learn about ConvertFlix, our mission, team, and commitment to providing free file processing tools." />
      </Helmet>

      <div className="company-page">
        <div className="container">
          {/* Hero Section */}
          <div className="company-hero">
            <h1>About ConvertFlix</h1>
            <p className="hero-subtitle">
              Making file compression and conversion accessible to everyone
            </p>
          </div>

          {/* Mission Section */}
          <section className="mission-section">
            <div className="section-content">
              <h2>Our Mission</h2>
              <p>
                At ConvertFlix, we believe that powerful file processing tools should be 
                accessible to everyone. Whether you're a student, professional, or hobbyist, 
                our free tools help you compress and convert files without the hassle of 
                complex software or expensive subscriptions.
              </p>
              <p>
                Founded in 2024, we've helped millions of users save time and storage space 
                with our intuitive, web-based file processing platform. Our commitment to 
                privacy, security, and user experience drives everything we do.
              </p>
            </div>
          </section>

          {/* Values Section */}
          <section className="values-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              {values.map((value, index) => (
                <div key={index} className="value-card card">
                  <div className="value-icon">{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section className="team-section">
            <h2>Meet Our Team</h2>
            <div className="team-grid">
              {team.map((member, index) => (
                <div key={index} className="team-card card">
                  <div className="member-avatar">{member.avatar}</div>
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-bio">{member.bio}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section className="stats-section">
            <div className="stats-content">
              <h2>Our Impact</h2>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">2M+</div>
                  <div className="stat-label">Files Processed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">500K+</div>
                  <div className="stat-label">Happy Users</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50TB+</div>
                  <div className="stat-label">Storage Saved</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">99.9%</div>
                  <div className="stat-label">Uptime</div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="contact-section">
            <div className="contact-content">
              <h2>Get in Touch</h2>
              <p>
                Have questions, suggestions, or feedback? We'd love to hear from you!
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <span>hello@convertflix.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">🌐</span>
                  <span>www.convertflix.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Company 