import React from 'react';
import { useTheme } from '../App';
import './About.css';

const About = () => {
  const { theme } = useTheme();

  return (
    <div className={`about-container ${theme}`}>
      <div className="about-content">
        <h1>About ConvertFlix</h1>
        <p>
          ConvertFlix is a professional file conversion and compression platform designed to help users 
          transform their files quickly and efficiently. Our mission is to provide high-quality, 
          reliable tools that make file management simple and accessible.
        </p>
        
        <div className="features-section">
          <h2>Why Choose ConvertFlix?</h2>
          <ul>
            <li>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M8 1l6 3v6c0 3.3-2.7 6-6 6s-6-2.7-6-6V4l6-3z" stroke="currentColor" strokeWidth="2"/>
                <path d="M6 8l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              100% privacy—your files are never stored
            </li>
            <li>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2v16M2 10h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Lightning-fast processing
            </li>
            <li>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M6 6h8v8H6z" fill="currentColor" opacity="0.3"/>
              </svg>
              Supports all major file types
            </li>
            <li>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M10 6v8M6 10h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Free to use, no sign-up required
            </li>
          </ul>
        </div>
        
        <div className="mission-section">
          <h2>Our Mission</h2>
          <p>
            We believe that file conversion and compression should be simple, fast, and secure. 
            Our platform is built with modern technology to ensure the best possible user experience 
            while maintaining the highest standards of quality and security.
          </p>
        </div>
        
        <div className="contact-section">
          <h2>Get in Touch</h2>
          <p>
            Have questions or suggestions? We'd love to hear from you! Contact our support team 
            for assistance or to share your feedback.
          </p>
          <a href="/contact" className="contact-btn">Contact Us</a>
        </div>
      </div>
    </div>
  );
};

export default About;
