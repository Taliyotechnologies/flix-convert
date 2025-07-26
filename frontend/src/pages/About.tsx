import React from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, Shield, Clock } from 'lucide-react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="about-hero"
      >
        <h1>About FlixConvert</h1>
        <p>Your trusted platform for seamless video and image conversion</p>
      </motion.div>

      <div className="about-content">
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="about-section"
        >
          <h2>Our Mission</h2>
          <p>
            At FlixConvert, we believe that media conversion should be simple, fast, and accessible to everyone. 
            Whether you're a content creator, developer, or just someone who needs to convert files, our platform 
            provides the tools you need with an intuitive interface.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="features-section"
        >
          <h2>Why Choose FlixConvert?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <Zap className="feature-icon" />
              <h3>Lightning Fast</h3>
              <p>Convert your files in seconds with our optimized processing engine</p>
            </div>
            <div className="feature-card">
              <Shield className="feature-icon" />
              <h3>Secure & Private</h3>
              <p>Your files are processed securely and deleted automatically after conversion</p>
            </div>
            <div className="feature-card">
              <Users className="feature-icon" />
              <h3>User Friendly</h3>
              <p>Intuitive interface designed for users of all technical levels</p>
            </div>
            <div className="feature-card">
              <Clock className="feature-icon" />
              <h3>24/7 Available</h3>
              <p>Access our services anytime, anywhere with no downtime</p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="stats-section"
        >
          <h2>Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>10K+</h3>
              <p>Files Converted</p>
            </div>
            <div className="stat-card">
              <h3>5K+</h3>
              <p>Happy Users</p>
            </div>
            <div className="stat-card">
              <h3>99.9%</h3>
              <p>Uptime</p>
            </div>
            <div className="stat-card">
              <h3>24/7</h3>
              <p>Support</p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="team-section"
        >
          <h2>Our Team</h2>
          <p>
            We're a passionate team of developers and designers dedicated to creating the best 
            media conversion experience. Our expertise in video processing, image optimization, 
            and user experience design ensures that FlixConvert delivers exceptional results.
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default About; 