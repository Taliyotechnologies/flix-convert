import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="footer professional-footer">
      <div className="footer-content container">
        {/* About FlixConvert */}
        <div className="footer-col footer-logo-about">
          <Link to="/" className="footer-logo" tabIndex={0} aria-label="FlixConvert Home">
            <span className="logo-svg premium-glow" aria-label="logo" aria-hidden="true">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="26" height="26" rx="6" fill="#23272f" stroke="#6c63ff" strokeWidth="2.5" />
                <rect x="11" y="11" width="14" height="14" rx="4" fill="#23272f" stroke="#6c63ff" strokeWidth="2.5" />
              </svg>
            </span>
            <span className="logo-text">FlixConvert</span>
          </Link>
          <div className="footer-tagline">Premium file compression for images, videos, audio, and documents. Fast, secure, and easy to use for individuals and businesses.</div>
        </div>
        {/* Navigation */}
        <div className="footer-col">
          <div className="footer-links-heading premium-heading">Navigation</div>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </ul>
        </div>
        {/* Tools */}
        <div className="footer-col">
          <div className="footer-links-heading premium-heading">Tools</div>
          <ul className="footer-links tools">
            <li><Link to="/image-compress">Image Compression</Link></li>
            <li><Link to="/video-compress">Video Compression</Link></li>
            <li><Link to="/audio-compress">Audio Compression</Link></li>
            <li><Link to="/pdf-compress">PDF Compression</Link></li>
            <li><Link to="/other-compress">Other Formats</Link></li>
          </ul>
        </div>
        {/* Contact & Socials - moved up to be in line with other columns */}
        <div className="footer-col">
          <div className="footer-links-heading premium-heading">Contact</div>
          <ul className="footer-links">
            <li><a href="mailto:info@taliyotechnologies.com">info@taliyotechnologies.com</a></li>
            <li><a href="tel:+917042523611">+91 70425 23611</a></li>
          </ul>
          <div className="footer-socials">
            <a href="https://www.linkedin.com/company/107573393" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6C1.13 6 0 4.88 0 3.5C0 2.12 1.13 1 2.5 1C3.87 1 4.98 2.12 4.98 3.5ZM.22 8.99H4.77V24H.22V8.99ZM7.98 8.99H12.36V10.56H12.42C13.02 9.5 14.36 8.39 16.19 8.39C20.13 8.39 20.98 10.92 20.98 14.36V24H16.43V15.36C16.43 13.36 16.39 10.92 13.98 10.92C11.53 10.92 11.19 12.92 11.19 15.22V24H6.64V8.99H7.98Z" fill="#6c63ff"/></svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61558765421664" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer-social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" fill="#6c63ff"/></svg>
            </a>
            <a href="https://www.instagram.com/taliyotechnologies/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="6" stroke="#6c63ff" strokeWidth="2" fill="none" /><circle cx="12" cy="12" r="5" stroke="#6c63ff" strokeWidth="2" fill="none" /><circle cx="17.2" cy="6.8" r="1.2" fill="#6c63ff" /></svg>
            </a>
            <a href="https://x.com/TaliyoTech" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X" className="footer-social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.53 3H21.5L14.5 10.51L22.75 21H16.16L11.22 14.73L5.62 21H1.63L9.03 13.01L1 3H7.76L12.27 8.72L17.53 3ZM16.32 19H18.13L7.78 4.86H5.84L16.32 19Z" fill="#6c63ff"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-divider-premium" />
      <div className="footer-attribution-row">
        <div className="footer-madeby">
          Made by{' '}
          <a href="https://taliyotechnologies.com/" target="_blank" rel="noopener noreferrer" className="taliyo-link">
            Taliyo Technologies
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{marginLeft: 3, verticalAlign: 'middle'}} xmlns="http://www.w3.org/2000/svg">
              <path d="M7 13L13 7M13 7H8M13 7V12" stroke="#6c63ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
        <div className="footer-info">
          &copy; {new Date().getFullYear()} FlixConvert. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 