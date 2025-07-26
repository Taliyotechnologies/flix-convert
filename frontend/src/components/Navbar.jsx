import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../App';
import './Navbar.css';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Compress', dropdown: [
    { label: 'Image Compression', to: '/compress/image', icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 6h4v4H6z" fill="currentColor" opacity="0.3"/>
        <path d="M8 4v4M6 6h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )},
    { label: 'Video Compression', to: '/compress/video', icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 6l2 1.5L6 9V6z" fill="currentColor"/>
      </svg>
    )},
    { label: 'Audio Compression', to: '/compress/audio', icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2v12M4 6h8M4 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )},
    { label: 'PDF Compression', to: '/compress/pdf', icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 2h10v12H3V2z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 6h10M5 9h6M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )},
  ]},
  { label: 'Convert', dropdown: [
    { label: 'Image Converter', to: '/convert/image', icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 6l2-2 2 2M6 10l2 2 2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )},
    { label: 'Video Converter', to: '/convert/video', icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 6l2 1.5L6 9V6z" fill="currentColor"/>
        <path d="M8 2v4M6 6h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )},
    { label: 'Audio Converter', to: '/convert/audio', icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 6l2-2 2 2M6 10l2 2 2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )},
    { label: 'PDF Converter', to: '/convert/pdf', icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 2h10v12H3V2z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 2v4M6 6h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )},
  ]},
  { label: 'Company', dropdown: [
    { label: 'About Us', to: '/about', icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 4v4M6 8h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )},
    { label: 'Contact', to: '/contact', icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 4h12v8H2V4z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 4l6 4 6-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )},
    { label: 'Owner', to: '/owner', icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 14c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    )},
  ]},
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
        setMobileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`nav-glass ${theme} ${scrolled ? 'scrolled' : ''}`} ref={navRef}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="2" y="2" width="28" height="28" rx="8" fill="#3B82F6" stroke="#10B981" strokeWidth="2"/>
              <rect x="8" y="8" width="16" height="16" rx="4" fill="#ffffff"/>
              <path d="M12 16h8M16 12v8" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="24" cy="8" r="3" fill="#10B981"/>
              <path d="M22 6l2 2 2-2" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="logo-text">ConvertFlix</span>
        </Link>

        <button 
          className={`nav-hamburger${mobileMenu ? ' open' : ''}`} 
          aria-label="Toggle menu" 
          onClick={() => setMobileMenu((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links${mobileMenu ? ' open' : ''}`}> 
          {navLinks.map((link) => (
            <li key={link.label} className={`nav-item ${isActive(link.to) ? 'active' : ''}`}>
              {link.dropdown ? (
                <div className="nav-dropdown-container">
                  <button 
                    className={`nav-dropdown-trigger ${openDropdown === link.label ? 'open' : ''}`}
                    onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    aria-haspopup="true" 
                    aria-expanded={openDropdown === link.label}
                  >
                    {link.label}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M4 6l3 3 3-3" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  </button>
                  <div className={`nav-dropdown ${openDropdown === link.label ? 'open' : ''}`}>
                    <div className="dropdown-content">
                      {link.dropdown.map((item) => (
                        <Link 
                          key={item.to} 
                          to={item.to} 
                          className={`dropdown-item ${isActive(item.to) ? 'active' : ''}`}
                          onClick={() => { 
                            setMobileMenu(false); 
                            setOpenDropdown(null); 
                          }}
                        >
                          <span className="dropdown-icon">{item.icon}</span>
                          <span className="dropdown-text">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link 
                  to={link.to} 
                  className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
                  onClick={() => setMobileMenu(false)}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
          
          <li className="nav-theme-toggle">
            <button 
              onClick={toggleTheme} 
              className="theme-btn"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" fill="currentColor"/>
                  <path d="M18 10.7A7.5 7.5 0 1110.7 3a5.8 5.8 0 105.3 7.7z" fill="var(--color-bg)"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="6" fill="currentColor"/>
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M10 2v2M10 16v2M3.22 3.22l1.42 1.42M15.36 15.36l1.42 1.42M2 10h2M16 10h2M3.22 16.78l1.42-1.42M15.36 4.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </li>
          
          <li className="nav-auth">
            <Link to="/login" className="nav-login">Login</Link>
            <Link to="/signup" className="nav-signup">Sign Up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 