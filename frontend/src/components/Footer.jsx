import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const icons = {
  home: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect width="20" height="20" rx="5" fill="#6366F1"/><path d="M5 10l5-5 5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/><rect x="7" y="10" width="6" height="5" rx="1" fill="#fff"/></svg>
  ),
  image: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect width="20" height="20" rx="5" fill="#6366F1"/><path d="M5 15l4-6 3 4 3-5 1.5 2.5V15H5z" fill="#fff"/><rect x="5" y="5" width="10" height="10" rx="2" stroke="#fff" strokeWidth="1.2"/></svg>
  ),
  video: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect width="20" height="20" rx="5" fill="#6366F1"/><rect x="5" y="6" width="6" height="8" rx="1.2" stroke="#fff" strokeWidth="1.2"/><path d="M14 8v4l2 1V7l-2 1z" fill="#fff"/></svg>
  ),
  audio: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect width="20" height="20" rx="5" fill="#6366F1"/><rect x="7" y="8" width="2" height="4" rx="1" fill="#fff"/><rect x="11" y="5" width="2" height="8" rx="1" fill="#fff"/></svg>
  ),
  pdf: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect width="20" height="20" rx="5" fill="#6366F1"/><rect x="7" y="5" width="6" height="10" rx="1.2" stroke="#fff" strokeWidth="1.2"/><path d="M9 8h4M9 11h4M9 14h4" stroke="#fff" strokeWidth="1.2"/></svg>
  ),
  convert: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect width="20" height="20" rx="5" fill="#6366F1"/><path d="M6 10c0-2.2 1.8-4 4-4h1.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/><path d="M14 10c0 2.2-1.8 4-4 4H8.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/><polyline points="11,6 14,6 14,9" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="9,14 6,14 6,11" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  about: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect width="20" height="20" rx="5" fill="#6366F1"/><circle cx="10" cy="10" r="3" stroke="#fff" strokeWidth="1.2"/><rect x="9" y="7" width="2" height="5" rx="1" fill="#fff"/><rect x="9" y="13" width="2" height="1.2" rx="0.6" fill="#fff"/></svg>
  ),
  contact: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect width="20" height="20" rx="5" fill="#6366F1"/><rect x="5" y="6" width="10" height="8" rx="1.2" stroke="#fff" strokeWidth="1.2"/><path d="M5 8l5 4 5-4" stroke="#fff" strokeWidth="1.2"/></svg>
  ),
  owner: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect width="20" height="20" rx="5" fill="#6366F1"/><circle cx="10" cy="8" r="2.5" fill="#fff"/><rect x="7" y="12" width="6" height="2.5" rx="1.2" fill="#fff"/></svg>
  ),
  login: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect width="20" height="20" rx="5" fill="#6366F1"/><circle cx="10" cy="8" r="2.5" fill="#fff"/><rect x="8" y="12" width="4" height="1.2" rx="0.6" fill="#fff"/></svg>
  ),
  signup: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect width="20" height="20" rx="5" fill="#6366F1"/><circle cx="10" cy="8" r="2.5" fill="#fff"/><rect x="8" y="12" width="4" height="1.2" rx="0.6" fill="#fff"/><rect x="9" y="14" width="2" height="2" rx="1" fill="#fff"/></svg>
  ),
};

const Footer = () => (
  <footer className="footer">
    <div className="footer-links-row">
      <Link to="/" className="footer-link">{icons.home} Home</Link>
      <Link to="/compress/image" className="footer-link">{icons.image} Image</Link>
      <Link to="/compress/video" className="footer-link">{icons.video} Video</Link>
      <Link to="/compress/audio" className="footer-link">{icons.audio} Audio</Link>
      <Link to="/compress/pdf" className="footer-link">{icons.pdf} PDF</Link>
      <Link to="/convert" className="footer-link">{icons.convert} Convert</Link>
      <Link to="/about" className="footer-link">{icons.about} About</Link>
      <Link to="/contact" className="footer-link">{icons.contact} Contact</Link>
      <Link to="/owner" className="footer-link">{icons.owner} Owner</Link>
      <Link to="/login" className="footer-link">{icons.login} Login</Link>
      <Link to="/signup" className="footer-link">{icons.signup} Sign Up</Link>
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