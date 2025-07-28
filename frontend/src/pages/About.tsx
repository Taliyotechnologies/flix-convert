import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Heart } from 'lucide-react';
import './About.css';

const About: React.FC = () => {
  const stats = [
    { number: '10M+', label: 'Files Converted', icon: <Users size={24} /> },
    { number: '50+', label: 'Supported Formats', icon: <Target size={24} /> },
    { number: '99.9%', label: 'Uptime', icon: <Award size={24} /> },
    { number: '24/7', label: 'Support', icon: <Heart size={24} /> }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      bio: 'Passionate about making technology accessible to everyone.',
      avatar: '👩‍💼'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      bio: 'Expert in scalable cloud infrastructure and file processing.',
      avatar: '👨‍💻'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      bio: 'Creating beautiful and intuitive user experiences.',
      avatar: '👩‍🎨'
    },
    {
      name: 'David Kim',
      role: 'Lead Developer',
      bio: 'Building robust and efficient conversion algorithms.',
      avatar: '👨‍🔬'
    }
  ];

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div
            className="about-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="about-title">About FlixConvert</h1>
            <p className="about-subtitle">
              We're on a mission to make file conversion simple, fast, and accessible to everyone. 
              Our platform helps millions of users transform their files every day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="grid grid-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section section">
        <div className="container">
          <div className="grid grid-2">
            <motion.div
              className="story-content"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">Our Story</h2>
              <p className="story-text">
                FlixConvert was born from a simple frustration: file conversion tools were either too complex, 
                too slow, or too expensive. We believed that everyone should have access to professional-grade 
                file conversion tools without the complexity or cost.
              </p>
              <p className="story-text">
                Founded in 2020, we've grown from a small team of developers to a global platform serving 
                millions of users. Our commitment to simplicity, speed, and security has never wavered.
              </p>
              <p className="story-text">
                Today, FlixConvert is trusted by individuals, businesses, and organizations worldwide to handle 
                their file conversion needs quickly and securely.
              </p>
            </motion.div>
            <motion.div
              className="story-image"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="story-visual">
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h3>2020</h3>
                      <p>FlixConvert founded</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h3>2021</h3>
                      <p>1M files converted</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h3>2022</h3>
                      <p>10M files converted</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h3>2024</h3>
                      <p>50+ formats supported</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              The passionate people behind FlixConvert
            </p>
          </motion.div>

          <div className="grid grid-2">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="team-card card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="team-avatar">{member.avatar}</div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-3">
            <motion.div
              className="value-card card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3>Simplicity</h3>
              <p>We believe the best tools are the ones you don't have to think about. Simple, intuitive, and powerful.</p>
            </motion.div>
            <motion.div
              className="value-card card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3>Security</h3>
              <p>Your files and privacy are our top priority. We use enterprise-grade encryption and automatic deletion.</p>
            </motion.div>
            <motion.div
              className="value-card card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3>Speed</h3>
              <p>Time is precious. Our optimized infrastructure ensures your files are processed in seconds, not minutes.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 