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
  { label: 'Convert', dropdown: [
    { label: 'Image', to: '/convert/image' },
    { label: 'Video', to: '/convert/video' },
    { label: 'Audio', to: '/convert/audio' },
    { label: 'PDF', to: '/convert/pdf' },
  ]},
  { label: 'Company', dropdown: [
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Owner', to: '/owner' },
  ]},
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
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="2" y="2" width="28" height="28" rx="8" fill="#7F5AF0" stroke="#2CB67D" strokeWidth="2"/>
            <rect x="8" y="8" width="16" height="16" rx="4" fill="#ffffff"/>
            <path d="M12 16h8M16 12v8" stroke="#7F5AF0" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="24" cy="8" r="3" fill="#2CB67D"/>
            <path d="M22 6l2 2 2-2" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>ConvertFlix</span>
        </Link>
        <button className={`nav-hamburger${mobileMenu ? ' open' : ''}`} aria-label="Open menu" onClick={() => setMobileMenu((v) => !v)}>
          <span></span><span></span><span></span>
        </button>
        <ul className={`nav-links${mobileMenu ? ' open' : ''}`}> 
          {navLinks.map((link) => (
            <li key={link.label} className={link.className || ''}>
              {link.dropdown ? (
                <>
                  <span className="nav-dropdown-trigger" onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)} tabIndex={0} role="button" aria-haspopup="true" aria-expanded={openDropdown === link.label}>{link.label} <svg width="14" height="14" viewBox="0 0 14 14"><path d="M4 6l3 3 3-3" stroke="currentColor" strokeWidth="2" fill="none"/></svg></span>
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
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="9" fill="#232336"/><path d="M18 11.7A7.5 7.5 0 1111.7 4a5.8 5.8 0 106.3 7.7z" fill="#FBBF24"/></svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="7" fill="#7F5AF0"/><circle cx="11" cy="11" r="9" stroke="#7F5AF0" strokeWidth="2"/><path d="M11 2v2M11 18v2M4.22 4.22l1.42 1.42M16.36 16.36l1.42 1.42M2 11h2M18 11h2M4.22 17.78l1.42-1.42M16.36 5.64l1.42-1.42" stroke="#7F5AF0" strokeWidth="1.5" strokeLinecap="round"/></svg>
              )}
            </button>
          </li>
          <li className="nav-auth nav-auth-login"><Link to="/login">Login</Link></li>
          <li className="nav-auth nav-auth-signup"><Link to="/signup">Signup</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 