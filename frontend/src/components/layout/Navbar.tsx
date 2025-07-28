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
    { 
      name: 'Image', 
      href: '/convert/image', 
      icon: (
        <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      name: 'Video', 
      href: '/convert/video', 
      icon: (
        <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      name: 'PDF', 
      href: '/convert/pdf', 
      icon: (
        <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      name: 'Audio', 
      href: '/convert/audio', 
      icon: (
        <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      )
    }
  ];

  const compressItems = [
    { 
      name: 'Image', 
      href: '/compress/image', 
      icon: (
        <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      name: 'Video', 
      href: '/compress/video', 
      icon: (
        <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      name: 'PDF', 
      href: '/compress/pdf', 
      icon: (
        <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      name: 'Audio', 
      href: '/compress/audio', 
      icon: (
        <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      )
    }
  ];

  const companyItems = [
    { 
      name: 'About Us', 
      href: '/company/about', 
      icon: (
        <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    { 
      name: 'Contact', 
      href: '/company/contact', 
      icon: (
        <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      name: 'Owners', 
      href: '/company/owners', 
      icon: (
        <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    }
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