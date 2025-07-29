import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/components.css';

const Navbar = () => {
  const { user, logout, toggleTheme, theme } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  
  const toolsDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toolsDropdownRef.current && !toolsDropdownRef.current.contains(event.target)) {
        setIsToolsDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsUserDropdownOpen(false);
  };

  const toolsMenuItems = [
    { name: 'Compress Image', path: '/compress-image' },
    { name: 'Convert Image', path: '/convert-image' },
    { name: 'Compress Video', path: '/compress-video' },
    { name: 'Convert Video', path: '/convert-video' },
    { name: 'Compress Audio', path: '/compress-audio' },
    { name: 'Convert Audio', path: '/convert-audio' },
    { name: 'Convert PDF', path: '/convert-pdf' },
    { name: 'Compress PDF', path: '/compress-pdf' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-text">FlixConvert</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-nav desktop-nav">
          <Link to="/" className="nav-link">Home</Link>
          
          {/* Tools Dropdown */}
          <div className="nav-dropdown" ref={toolsDropdownRef}>
            <button 
              className="nav-dropdown-toggle"
              onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
            >
              Tools
              <svg className="dropdown-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {isToolsDropdownOpen && (
              <div className="dropdown-menu tools-dropdown">
                {toolsMenuItems.map((item) => (
                  <Link 
                    key={item.path} 
                    to={item.path} 
                    className="dropdown-item"
                    onClick={() => setIsToolsDropdownOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/company" className="nav-link">Company</Link>
        </div>

        {/* Right Side Actions */}
        <div className="navbar-actions">
          {/* Theme Toggle */}
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="theme-icon">
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" className="theme-icon">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2"/>
                <path d="M12 20v2"/>
                <path d="m4.93 4.93 1.41 1.41"/>
                <path d="m17.66 17.66 1.41 1.41"/>
                <path d="M2 12h2"/>
                <path d="M20 12h2"/>
                <path d="m6.34 17.66-1.41 1.41"/>
                <path d="m19.07 4.93-1.41 1.41"/>
              </svg>
            )}
          </button>

          {/* User Menu */}
          {user ? (
            <div className="user-dropdown" ref={userDropdownRef}>
              <button 
                className="user-avatar"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                <div className="avatar-circle">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{user.name}</span>
                <svg className="dropdown-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isUserDropdownOpen && (
                <div className="dropdown-menu user-dropdown-menu">
                  <Link 
                    to="/admin" 
                    className="dropdown-item"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="dropdown-item-icon">
                      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                    </svg>
                    Dashboard
                  </Link>
                  <Link 
                    to="/settings" 
                    className="dropdown-item"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="dropdown-item-icon">
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                    </svg>
                    Settings
                  </Link>
                  <button 
                    className="dropdown-item logout-item"
                    onClick={handleLogout}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="dropdown-item-icon">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <polyline points="16,17 21,12 16,7"/>
                      <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-ghost">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="hamburger-icon">
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            <Link 
              to="/" 
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            <div className="mobile-dropdown">
              <button className="mobile-dropdown-toggle">
                Tools
                <svg className="dropdown-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="mobile-dropdown-menu">
                {toolsMenuItems.map((item) => (
                  <Link 
                    key={item.path} 
                    to={item.path} 
                    className="mobile-dropdown-item"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link 
              to="/company" 
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Company
            </Link>

            {!user && (
              <div className="mobile-auth-buttons">
                <Link 
                  to="/login" 
                  className="btn btn-ghost btn-block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="btn btn-primary btn-block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;