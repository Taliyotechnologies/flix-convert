import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-links-row">
      <Link to="/" className="footer-link"><span role="img" aria-label="Home">🏠</span> Home</Link>
      <Link to="/compress/image" className="footer-link"><span role="img" aria-label="Image">🖼️</span> Image</Link>
      <Link to="/compress/video" className="footer-link"><span role="img" aria-label="Video">🎬</span> Video</Link>
      <Link to="/compress/audio" className="footer-link"><span role="img" aria-label="Audio">🎵</span> Audio</Link>
      <Link to="/compress/pdf" className="footer-link"><span role="img" aria-label="PDF">📄</span> PDF</Link>
      <Link to="/convert" className="footer-link"><span role="img" aria-label="Convert">🔄</span> Convert</Link>
      <Link to="/about" className="footer-link"><span role="img" aria-label="About">ℹ️</span> About</Link>
      <Link to="/contact" className="footer-link"><span role="img" aria-label="Contact">📞</span> Contact</Link>
      <Link to="/owner" className="footer-link"><span role="img" aria-label="Owner">👤</span> Owner</Link>
      <Link to="/login" className="footer-link"><span role="img" aria-label="Login">🔑</span> Login</Link>
      <Link to="/signup" className="footer-link"><span role="img" aria-label="Sign Up">📝</span> Sign Up</Link>
    </div>
    <div className="footer-bottom-row">
      <div className="footer-madeby">
        <a href="https://taliyo.com" target="_blank" rel="noopener noreferrer">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: 6}}>
            <rect width="20" height="20" rx="4" fill="#4F46E5"/>
            <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="Arial" dy=".3em">TT</text>
          </svg>
          Made by Taliyo Technologies
        </a>
      </div>
    </div>
  </footer>
);

export default Footer; 