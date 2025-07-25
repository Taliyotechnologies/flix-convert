import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Compress', to: '/compress' },
  { label: 'Convert', to: '/convert' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Owner', to: '/owner' },
  { label: 'Login', to: '/login' },
  { label: 'Sign Up', to: '/signup' },
];

const Footer = () => (
  <footer className="footer-glass">
    <div className="footer-main">
      <div className="footer-brand">
        <Link to="/" className="footer-logo">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="12" fill="url(#g1)"/><defs><linearGradient id="g1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stopColor="#7F5AF0"/><stop offset="1" stopColor="#2CB67D"/></linearGradient></defs><path d="M13 20c0-4 3-7 7-7h3" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><path d="M27 20c0 4-3 7-7 7h-3" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><polyline points="22,13 27,13 27,18" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><polyline points="18,27 13,27 13,22" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>ConvertFlix</span>
        </Link>
        <div className="footer-madeby">
          <a href="https://taliyo.com" target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect width="20" height="20" rx="4" fill="#7F5AF0"/><text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="Arial" dy=".3em">TT</text></svg>
            Made by Taliyo Technologies
          </a>
        </div>
      </div>
      <div className="footer-links">
        {links.map((l) => (
          <Link to={l.to} className="footer-link" key={l.to}>{l.label}</Link>
        ))}
      </div>
      <div className="footer-social">
        <a href="https://github.com/Taliyotechnologies/flix-convert" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><circle cx="14" cy="14" r="14" fill="#232336"/><path d="M18.5 21v-2.2c0-.6-.2-1-.6-1.3 2-.2 4-1 4-4.3 0-.9-.3-1.6-.8-2.2.1-.2.3-1-.1-2.1 0 0-.7-.2-2.3.8-.7-.2-1.5-.3-2.3-.3s-1.6.1-2.3.3c-1.6-1-2.3-.8-2.3-.8-.4 1.1-.2 1.9-.1 2.1-.5.6-.8 1.3-.8 2.2 0 3.3 2 4.1 4 4.3-.2.2-.4.5-.5 1v2.2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </a>
        <a href="mailto:support@convertflix.com" aria-label="Email">
          <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><circle cx="14" cy="14" r="14" fill="#2CB67D"/><rect x="7" y="10" width="14" height="8" rx="2" stroke="#fff" strokeWidth="2"/><path d="M7 12l7 5 7-5" stroke="#fff" strokeWidth="2"/></svg>
        </a>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© {new Date().getFullYear()} ConvertFlix. All rights reserved.</span>
    </div>
  </footer>
);

export default Footer; 