import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [convertDropdown, setConvertDropdown] = useState(false);
  const [compressDropdown, setCompressDropdown] = useState(false);
  const [companyDropdown, setCompanyDropdown] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const convertItems = [
    { name: 'Image', href: '/convert/image', icon: '🖼️' },
    { name: 'Video', href: '/convert/video', icon: '🎥' },
    { name: 'PDF', href: '/convert/pdf', icon: '📄' },
    { name: 'Audio', href: '/convert/audio', icon: '🎵' }
  ];

  const compressItems = [
    { name: 'Image', href: '/compress/image', icon: '🖼️' },
    { name: 'Video', href: '/compress/video', icon: '🎥' },
    { name: 'PDF', href: '/compress/pdf', icon: '📄' },
    { name: 'Audio', href: '/compress/audio', icon: '🎵' }
  ];

  const companyItems = [
    { name: 'About Us', href: '/company/about', icon: '🏢' },
    { name: 'Contact', href: '/company/contact', icon: '📞' },
    { name: 'Owners', href: '/company/owners', icon: '👥' }
  ];

  const navItems = [
    { name: 'Home', href: '/' },
    { 
      name: 'Convert', 
      href: '#',
      hasDropdown: true,
      dropdownItems: convertItems,
      dropdownState: convertDropdown,
      setDropdownState: setConvertDropdown
    },
    { 
      name: 'Compress', 
      href: '#',
      hasDropdown: true,
      dropdownItems: compressItems,
      dropdownState: compressDropdown,
      setDropdownState: setCompressDropdown
    },
    { 
      name: 'Company', 
      href: '#',
      hasDropdown: true,
      dropdownItems: companyItems,
      dropdownState: companyDropdown,
      setDropdownState: setCompanyDropdown
    }
  ];

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-logo">
            <Link to="/" className="logo">
              FlixConvert
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-nav desktop-nav">
            {navItems.map((item, index) => (
              <div key={index} className="nav-item">
                {item.hasDropdown ? (
                  <div className="dropdown-container">
                    <button
                      className="nav-link dropdown-toggle"
                      onClick={() => item.setDropdownState(!item.dropdownState)}
                      onMouseEnter={() => item.setDropdownState(true)}
                    >
                      {item.name}
                      <svg className="dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {item.dropdownState && (
                      <div 
                        className="dropdown-menu"
                        onMouseLeave={() => item.setDropdownState(false)}
                      >
                        {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                          <Link
                            key={dropdownIndex}
                            to={dropdownItem.href}
                            className="dropdown-item"
                            onClick={() => item.setDropdownState(false)}
                          >
                            <span className="dropdown-icon">{dropdownItem.icon}</span>
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={item.href} className="nav-link">
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="navbar-actions">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="theme-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="theme-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {/* Auth Buttons */}
            <div className="auth-buttons">
              <Link to="/signup" className="btn btn-secondary">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="mobile-menu-btn"
              aria-label="Toggle menu"
            >
              <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-nav">
              {navItems.map((item, index) => (
                <div key={index} className="mobile-nav-item">
                  {item.hasDropdown ? (
                    <div className="mobile-dropdown">
                      <button
                        className="mobile-nav-link mobile-dropdown-toggle"
                        onClick={() => item.setDropdownState(!item.dropdownState)}
                      >
                        {item.name}
                        <svg className="mobile-dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {item.dropdownState && (
                        <div className="mobile-dropdown-menu">
                          {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                            <Link
                              key={dropdownIndex}
                              to={dropdownItem.href}
                              className="mobile-dropdown-item"
                              onClick={() => {
                                item.setDropdownState(false);
                                setIsMenuOpen(false);
                              }}
                            >
                              <span className="mobile-dropdown-icon">{dropdownItem.icon}</span>
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className="mobile-nav-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mobile-auth">
              <Link 
                to="/signup" 
                className="btn btn-secondary mobile-btn"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
              <Link 
                to="/login" 
                className="btn btn-primary mobile-btn"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 