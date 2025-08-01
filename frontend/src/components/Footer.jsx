import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <h3 className="footer-logo">ConvertFlix</h3>
              <p className="footer-tagline">
                Fast, secure, and reliable file processing tools for everyone.
              </p>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/tools">Tools</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Tools</h4>
            <ul className="footer-links">
              <li><Link to="/tool/image-compression">Image Compression</Link></li>
              <li><Link to="/tool/pdf-compression">PDF Compression</Link></li>
              <li><Link to="/tool/video-compression">Video Compression</Link></li>
              <li><Link to="/tool/audio-converter">Audio Converter</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Support</h4>
            <ul className="footer-links">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/contact">Help Center</Link></li>
              <li><Link to="/company">Company</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © 2024 ConvertFlix. All rights reserved.
            </p>
            <div className="footer-made-by">
              <span className="made-by-text">Made with ❤️ by</span>
              <a 
                href="https://taliyotechnologies.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="taliyo-link"
              >
                Taliyo Technologies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 