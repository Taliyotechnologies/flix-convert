import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();

  // Mock authentication state (replace with real auth)
  const isAuthenticated = true; // Changed to true to show admin features
  const user = { name: 'Admin User', email: 'admin@flixconvert.com', role: 'admin' };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsToolsDropdownOpen(false);
    setIsCompanyDropdownOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const toolsItems = [
    { name: 'Compress Image', path: '/tool/compress-image' },
    { name: 'Compress PDF', path: '/tool/compress-pdf' },
    { name: 'Compress Video', path: '/tool/compress-video' },
    { name: 'Convert Audio', path: '/tool/convert-audio' },
    { name: 'Convert Video', path: '/tool/convert-video' },
    { name: 'Convert Image', path: '/tool/convert-image' }
  ];

  const companyItems = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          ConvertFlix
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-nav desktop-nav">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          
          <div className="dropdown">
            <button 
              className={`nav-link dropdown-toggle ${isToolsDropdownOpen ? 'active' : ''}`}
              onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
            >
              Tools
            </button>
            {isToolsDropdownOpen && (
              <div className="dropdown-menu">
                {toolsItems.map((item) => (
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

          <div className="dropdown">
            <button 
              className={`nav-link dropdown-toggle ${isCompanyDropdownOpen ? 'active' : ''}`}
              onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
            >
              Company
            </button>
            {isCompanyDropdownOpen && (
              <div className="dropdown-menu">
                {companyItems.map((item) => (
                  <Link 
                    key={item.path} 
                    to={item.path} 
                    className="dropdown-item"
                    onClick={() => setIsCompanyDropdownOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side - Theme toggle and Auth */}
        <div className="navbar-right">
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isAuthenticated ? (
            <div className="profile-dropdown">
              <button 
                className="profile-button"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <div className="profile-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </button>
              {isProfileDropdownOpen && (
                <div className="dropdown-menu profile-menu">
                  <div className="profile-info">
                    <div className="profile-name">{user.name}</div>
                    <div className="profile-email">{user.email}</div>
                  </div>
                  <Link to="/dashboard" className="dropdown-item">
                    Dashboard
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="dropdown-item">
                      Admin Panel
                    </Link>
                  )}
                  <button className="dropdown-item logout-btn">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button 
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-nav">
          <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>
            Home
          </Link>
          
          <div className="mobile-dropdown">
            <button className="mobile-dropdown-toggle">
              Tools
            </button>
            <div className="mobile-dropdown-menu">
              {toolsItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className="mobile-dropdown-item"
                  onClick={closeMobileMenu}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mobile-dropdown">
            <button className="mobile-dropdown-toggle">
              Company
            </button>
            <div className="mobile-dropdown-menu">
              {companyItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className="mobile-dropdown-item"
                  onClick={closeMobileMenu}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {!isAuthenticated && (
            <div className="mobile-auth">
              <Link to="/login" className="btn btn-secondary full-width" onClick={closeMobileMenu}>
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary full-width" onClick={closeMobileMenu}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar; 