import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer" role="contentinfo" aria-label="Site Footer">
      <div className="footer-content">
        <span>© {new Date().getFullYear()} FlixConvert. All rights reserved.</span>
        <span className="footer-madeby">
          Made by{' '}
          <a href="https://taliyotechnologies.com" target="_blank" rel="noopener noreferrer">
            Taliyo Technologies
          </a>
        </span>
        <nav className="footer-social" aria-label="Social media links">
          <a href="https://twitter.com/taliyo" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <span className="visually-hidden">Twitter</span>Twitter
          </a>
          <a href="https://facebook.com/taliyo" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <span className="visually-hidden">Facebook</span>Facebook
          </a>
          <a href="https://instagram.com/taliyo" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <span className="visually-hidden">Instagram</span>Instagram
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer; 