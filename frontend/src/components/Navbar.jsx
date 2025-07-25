import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../App';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [openDropdown, setOpenDropdown] = useState(null); // 'compress', 'company', or null
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navbarRef = useRef(null);

  // Close dropdowns and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`navbar${theme === 'dark' ? ' dark' : ''}`} ref={navbarRef}>
      <div className="navbar-inner">
        <div className="navbar-logo">
          {/* Modern ConvertFlix Logo: stylized C+F with conversion arrow */}
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="38" height="38" rx="10" fill="var(--color-accent)"/>
            <path d="M13 19c0-3.3 2.7-6 6-6h2" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M25 19c0 3.3-2.7 6-6 6h-2" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
            <polyline points="21,13 25,13 25,17" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="17,25 13,25 13,21" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="logo-text">ConvertFlix</span>
        </div>
        <button className={`hamburger${mobileMenuOpen ? ' open' : ''}`} aria-label="Open navigation menu" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((prev) => !prev)}>
          <span></span><span></span><span></span>
        </button>
        <ul className={`navbar-links${mobileMenuOpen ? ' open' : ''}`}>
          <li>
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          </li>
          <li className="dropdown">
            <span onClick={() => setOpenDropdown(openDropdown === 'compress' ? null : 'compress')} tabIndex={0} role="button" aria-haspopup="true" aria-expanded={openDropdown === 'compress'}>Compress</span>
            <div className={`dropdown-menu-wrapper${openDropdown === 'compress' ? ' open' : ''}`}>{openDropdown === 'compress' && (
              <ul className="dropdown-menu">
                <li><Link to="/compress/image" onClick={() => setMobileMenuOpen(false)}>Image</Link></li>
                <li><Link to="/compress/video" onClick={() => setMobileMenuOpen(false)}>Video</Link></li>
                <li><Link to="/compress/audio" onClick={() => setMobileMenuOpen(false)}>Audio</Link></li>
                <li><Link to="/compress/pdf" onClick={() => setMobileMenuOpen(false)}>PDF</Link></li>
              </ul>
            )}</div>
          </li>
          <li>
            <Link to="/convert" onClick={() => setMobileMenuOpen(false)}>Convert</Link>
          </li>
          <li className="dropdown">
            <span onClick={() => setOpenDropdown(openDropdown === 'company' ? null : 'company')} tabIndex={0} role="button" aria-haspopup="true" aria-expanded={openDropdown === 'company'}>Company</span>
            <div className={`dropdown-menu-wrapper${openDropdown === 'company' ? ' open' : ''}`}>{openDropdown === 'company' && (
              <ul className="dropdown-menu">
                <li><Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link></li>
                <li><Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link></li>
                <li><Link to="/owner" onClick={() => setMobileMenuOpen(false)}>Owner</Link></li>
              </ul>
            )}</div>
          </li>
          <li className="mobile-only"><Link to="/login" className="btn btn-login" onClick={() => setMobileMenuOpen(false)}>Login</Link></li>
          <li className="mobile-only"><Link to="/signup" className="btn btn-signup" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link></li>
          <li className="mobile-only">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
              <span className="theme-toggle-icon">
                {theme === 'dark' ? (
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M21 13.79A9 9 0 1113.21 3a7 7 0 109.79 10.79z" fill="#FBBF24"/></svg>
                ) : (
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="13" r="6" fill="#6366F1"/><path d="M13 2v3M13 21v3M5.22 5.22l2.12 2.12M18.66 18.66l2.12 2.12M2 13h3M21 13h3M5.22 20.78l2.12-2.12M18.66 7.34l2.12-2.12" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/></svg>
                )}
              </span>
            </button>
          </li>
        </ul>
        <div className="navbar-actions desktop-only">
          <Link to="/login" className="btn btn-login">Login</Link>
          <Link to="/signup" className="btn btn-signup">Sign Up</Link>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
            <span className="theme-toggle-icon">
              {theme === 'dark' ? (
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M21 13.79A9 9 0 1113.21 3a7 7 0 109.79 10.79z" fill="#FBBF24"/></svg>
              ) : (
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="13" r="6" fill="#6366F1"/><path d="M13 2v3M13 21v3M5.22 5.22l2.12 2.12M18.66 18.66l2.12 2.12M2 13h3M21 13h3M5.22 20.78l2.12-2.12M18.66 7.34l2.12-2.12" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/></svg>
              )}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 