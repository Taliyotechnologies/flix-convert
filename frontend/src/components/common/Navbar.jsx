import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/home', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];
const TOOL_LINKS = [
  { to: '/image-compress', label: 'Image Compress' },
  { to: '/video-compress', label: 'Video Compress' },
  { to: '/audio-compress', label: 'Audio Compress' },
  { to: '/pdf-compress', label: 'PDF Compress' },
  { to: '/file-converter', label: 'File Converter' },
];

function Navbar({ theme, toggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolOpen, setToolOpen] = useState(false);
  const [mobileToolOpen, setMobileToolOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 900);
  React.useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  console.log('Navbar user:', user);

  const closeMenus = () => {
    setMobileOpen(false);
    setToolOpen(false);
    setMobileToolOpen(false);
    setProfileOpen(false);
  };

  return (
    <nav className={`navbar professional-navbar ${theme}`}>
      <div className="navbar-content container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenus}>
          <span className="logo-svg" aria-label="logo">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="5" width="22" height="22" rx="5" fill="#23272f" stroke="#6c63ff" strokeWidth="2" />
              <rect x="10" y="10" width="12" height="12" rx="3" fill="#23272f" stroke="#6c63ff" strokeWidth="2" />
            </svg>
          </span>
          <span className="logo-text">FlixConvert</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="nav-links">
          {NAV_LINKS.map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                onClick={closeMenus}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li className="nav-tools">
            <span className="tools-btn" onClick={() => setToolOpen(v => !v)}>
              Tools
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 2, verticalAlign: 'middle' }} xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6l4 4 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {toolOpen && (
              <div className="tools-dropdown" onMouseLeave={() => setToolOpen(false)}>
                {TOOL_LINKS.map(tool => (
                  <NavLink key={tool.to} to={tool.to} onClick={closeMenus}>{tool.label}</NavLink>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* Actions */}
        <div className="nav-actions">
          {user ? (
            <div className="profile-menu-wrapper">
              <button className="profile-avatar minimal" onClick={() => setProfileOpen(v => !v)} aria-label="Profile" style={{display: 'flex', alignItems: 'center', gap: 4}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6"/></svg>
                <svg className="profile-arrow" style={{transform: profileOpen ? 'rotate(180deg)' : 'none'}} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              {profileOpen && (
                <div className="profile-dropdown minimal">
                  {isDesktop && (
                    <button className="profile-dropdown-item" onClick={() => {navigate('/dashboard'); closeMenus();}}>
                      Dashboard
                    </button>
                  )}
                  <button className="profile-dropdown-item" onClick={() => { logout(); closeMenus(); }}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/login" onClick={closeMenus} className="btn-outline">Login</NavLink>
              <NavLink to="/signin" onClick={closeMenus} className="btn-filled">Signup</NavLink>
            </>
          )}
          {/* Theme toggle button removed from Navbar */}
        </div>

        {/* Hamburger for mobile */}
        <button className="menu-icon" onClick={() => setMobileOpen(v => !v)} aria-label="Open menu" tabIndex={0}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="5" width="26" height="3" rx="1.5" fill="#fff"/>
            <rect y="11.5" width="26" height="3" rx="1.5" fill="#fff"/>
            <rect y="18" width="26" height="3" rx="1.5" fill="#fff"/>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-header">
            <Link to="/" className="navbar-logo" onClick={closeMenus} tabIndex={0}>
              <span className="logo-svg" aria-label="logo">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="5" width="22" height="22" rx="5" fill="#23272f" stroke="#6c63ff" strokeWidth="2" />
                  <rect x="10" y="10" width="12" height="12" rx="3" fill="#23272f" stroke="#6c63ff" strokeWidth="2" />
                </svg>
              </span>
              <span className="logo-text">FlixConvert</span>
            </Link>
            <button className="close-mobile-menu outside" onClick={closeMenus} aria-label="Close menu" tabIndex={0}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="7" y1="7" x2="21" y2="21" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="21" y1="7" x2="7" y2="21" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <ul className="mobile-nav-links" style={{marginTop: 12, marginBottom: 12}}>
            {NAV_LINKS.map(link => (
              <li key={link.to}><NavLink to={link.to} onClick={closeMenus}>{link.label}</NavLink></li>
            ))}
            <li className="mobile-tools">
              <span className="tools-btn" onClick={() => setMobileToolOpen(v => !v)} style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                Tools
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 6, verticalAlign: 'middle', transform: mobileToolOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6l4 4 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {mobileToolOpen && (
                <div className="tools-dropdown mobile" style={{marginTop: 8, marginBottom: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.10)'}}>
                  {TOOL_LINKS.map(tool => (
                    <NavLink key={tool.to} to={tool.to} onClick={closeMenus} style={{paddingLeft: 18}}>{tool.label}</NavLink>
                  ))}
                </div>
              )}
            </li>
          </ul>
          <div className="mobile-actions-row" style={{marginTop: 18}}>
            {user ? (
              <div className="profile-menu-wrapper">
                <button className="profile-avatar minimal" onClick={() => setProfileOpen(v => !v)} aria-label="Profile" style={{display: 'flex', alignItems: 'center', gap: 4}}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6"/></svg>
                  <svg width="16" height="16" style={{marginLeft: 2, transition: 'transform 0.2s', transform: profileOpen ? 'rotate(180deg)' : 'none'}} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6l4 4 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                {profileOpen && (
                  <div className="profile-dropdown minimal">
                    {isDesktop && (
                      <button className="profile-dropdown-item" onClick={() => {navigate('/dashboard'); closeMenus();}}>
                        Dashboard
                      </button>
                    )}
                    <button className="profile-dropdown-item" onClick={() => { logout(); closeMenus(); }}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink to="/login" onClick={closeMenus} className="btn-outline small">Login</NavLink>
                <NavLink to="/signin" onClick={closeMenus} className="btn-filled small">Signup</NavLink>
              </>
            )}
            <button className="theme-toggle-emoji small" onClick={toggleTheme} aria-label="Toggle theme" tabIndex={0}>
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export { Navbar }; 