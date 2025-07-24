import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-links">
      <Link to="/">Home</Link>
      <Link to="/compress/image">Image Compress</Link>
      <Link to="/compress/video">Video Compress</Link>
      <Link to="/compress/audio">Audio Compress</Link>
      <Link to="/compress/pdf">PDF Compress</Link>
      <Link to="/convert">Convert</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/owner">Owner</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
    <div className="footer-bottom">
      <div className="footer-madeby">
        <a href="https://taliyo.com" target="_blank" rel="noopener noreferrer">
          {/* SVG for Taliyo Technologies */}
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