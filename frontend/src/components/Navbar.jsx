import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../App';
import './Navbar.css';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Compress', dropdown: [
    { label: 'Image', to: '/compress/image' },
    { label: 'Video', to: '/compress/video' },
    { label: 'Audio', to: '/compress/audio' },
    { label: 'PDF', to: '/compress/pdf' },
  ]},
  { label: 'Convert', to: '/convert' },
  { label: 'Company', dropdown: [
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Owner', to: '/owner' },
  ]},
  { label: 'Login', to: '/login', className: 'btn-login' },
  { label: 'Sign Up', to: '/signup', className: 'btn-signup' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navRef = useRef(null);

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

  return (
    <nav className={`nav-glass ${theme}`} ref={navRef}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="12" fill="url(#g1)"/><defs><linearGradient id="g1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stopColor="#7F5AF0"/><stop offset="1" stopColor="#2CB67D"/></linearGradient></defs><path d="M13 20c0-4 3-7 7-7h3" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><path d="M27 20c0 4-3 7-7 7h-3" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><polyline points="22,13 27,13 27,18" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><polyline points="18,27 13,27 13,22" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>ConvertFlix</span>
        </Link>
        <button className={`nav-hamburger${mobileMenu ? ' open' : ''}`} aria-label="Open menu" onClick={() => setMobileMenu((v) => !v)}>
          <span></span><span></span><span></span>
        </button>
        <ul className={`nav-links${mobileMenu ? ' open' : ''}`}> 
          {navLinks.map((link, i) => (
            <li key={link.label} className={link.className || ''}>
              {link.dropdown ? (
                <>
                  <span className="nav-dropdown-trigger" onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)} tabIndex={0} role="button" aria-haspopup="true" aria-expanded={openDropdown === link.label}>{link.label} <svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/></svg></span>
                  <div className={`nav-dropdown${openDropdown === link.label ? ' open' : ''}`}>{openDropdown === link.label && (
                    <ul>
                      {link.dropdown.map((item) => (
                        <li key={item.to}><Link to={item.to} onClick={() => { setMobileMenu(false); setOpenDropdown(null); }}>{item.label}</Link></li>
                      ))}
                    </ul>
                  )}</div>
                </>
              ) : (
                <Link to={link.to} onClick={() => setMobileMenu(false)}>{link.label}</Link>
              )}
            </li>
          ))}
          <li className="nav-theme-toggle">
            <button onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? (
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="13" r="10" fill="#22223B"/><path d="M21 13.79A9 9 0 1113.21 3a7 7 0 109.79 10.79z" fill="#FBBF24"/></svg>
              ) : (
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="13" r="10" fill="#fff"/><circle cx="13" cy="13" r="6" fill="#7F5AF0"/><path d="M13 2v3M13 21v3M5.22 5.22l2.12 2.12M18.66 18.66l2.12 2.12M2 13h3M21 13h3M5.22 20.78l2.12-2.12M18.66 7.34l2.12-2.12" stroke="#7F5AF0" strokeWidth="2" strokeLinecap="round"/></svg>
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 