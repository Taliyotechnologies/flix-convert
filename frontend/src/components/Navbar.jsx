import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="logo-text">ConvertFlix</span>
          </Link>

          {/* Desktop Navigation */}
          <div className={`navbar-nav ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Home
            </Link>
            
            <div className="nav-dropdown">
              <button 
                className={`nav-link dropdown-toggle ${isActive('/tools') ? 'active' : ''}`}
                onClick={toggleDropdown}
              >
                Tools
                <span className="dropdown-arrow">▼</span>
              </button>
              <div className={`dropdown-menu ${isDropdownOpen ? 'active' : ''}`}>
                <Link to="/tool/image" className="dropdown-item">Image Tools</Link>
                <Link to="/tool/video" className="dropdown-item">Video Tools</Link>
                <Link to="/tool/audio" className="dropdown-item">Audio Tools</Link>
                <Link to="/tool/pdf" className="dropdown-item">PDF Tools</Link>
              </div>
            </div>
            
            <Link to="/tools" className={`nav-link ${isActive('/tools') ? 'active' : ''}`}>
              All Tools
            </Link>
          </div>

          {/* Right side - Theme toggle and Login */}
          <div className="navbar-actions">
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            
            <Link to="/login" className="btn btn-secondary login-btn">
              Login
            </Link>

            {/* Mobile menu button */}
            <button 
              className="mobile-menu-btn"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/tools" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
            All Tools
          </Link>
          <Link to="/tool/image" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
            Image Tools
          </Link>
          <Link to="/tool/video" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
            Video Tools
          </Link>
          <Link to="/tool/audio" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
            Audio Tools
          </Link>
          <Link to="/tool/pdf" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
            PDF Tools
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 