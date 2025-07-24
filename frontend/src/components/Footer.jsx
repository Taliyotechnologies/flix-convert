import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span>© {new Date().getFullYear()} FlixConvert. All rights reserved.</span>
        <span className="footer-madeby">Made by <a href="https://taliyotechnologies.com" target="_blank" rel="noopener noreferrer">Taliyo Technologies</a></span>
        <div className="footer-social">
          {/* Social media links */}
          <a href="https://twitter.com/taliyo" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://facebook.com/taliyo" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://instagram.com/taliyo" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 