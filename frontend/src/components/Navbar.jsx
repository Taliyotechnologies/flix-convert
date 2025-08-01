import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, User, LogOut, Settings, Menu, X, ChevronDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);
  const [isMobileCompanyOpen, setIsMobileCompanyOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileToolsOpen(false);
    setIsMobileCompanyOpen(false);
  };

  const toggleMobileTools = () => {
    setIsMobileToolsOpen(!isMobileToolsOpen);
  };

  const toggleMobileCompany = () => {
    setIsMobileCompanyOpen(!isMobileCompanyOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          ConvertFlix
        </Link>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="navbar-center">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMobileMenu}>
            Home
          </Link>
          
          <div className="dropdown">
            <button 
              className={`nav-link dropdown-toggle ${location.pathname.startsWith('/tools') ? 'active' : ''}`}
            >
              Tools
            </button>
            <div className="dropdown-menu">
              <Link to="/tools" className="dropdown-item" onClick={closeMobileMenu}>All Tools</Link>
              <Link to="/tool/compress-image" className="dropdown-item" onClick={closeMobileMenu}>Compress Image</Link>
              <Link to="/tool/convert-audio" className="dropdown-item" onClick={closeMobileMenu}>Convert Audio</Link>
              <Link to="/tool/convert-video" className="dropdown-item" onClick={closeMobileMenu}>Convert Video</Link>
            </div>
          </div>
          
          <div className="dropdown">
            <button className="nav-link dropdown-toggle">
              Company
            </button>
            <div className="dropdown-menu">
              <Link to="/owner" className="dropdown-item" onClick={closeMobileMenu}>Owner</Link>
              <Link to="/contact" className="dropdown-item" onClick={closeMobileMenu}>Contact</Link>
              <Link to="/about" className="dropdown-item" onClick={closeMobileMenu}>About Us</Link>
              <Link to="/privacy" className="dropdown-item" onClick={closeMobileMenu}>Privacy Policy</Link>
              <Link to="/terms" className="dropdown-item" onClick={closeMobileMenu}>Terms of Service</Link>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="navbar-right">
          {/* Theme Toggle */}
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Auth Section */}
          {!isAuthenticated ? (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary" onClick={closeMobileMenu}>Login</Link>
              <Link to="/signup" className="btn btn-primary" onClick={closeMobileMenu}>Sign Up</Link>
            </div>
          ) : (
            <div className="user-menu dropdown">
              <button className="user-avatar">
                <User size={20} />
              </button>
              <div className="user-dropdown">
                <Link to="/dashboard" className="dropdown-item" onClick={closeMobileMenu}>
                  <Settings size={16} />
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="dropdown-item">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>
              Home
            </Link>
            
            <div className={`mobile-dropdown ${isMobileToolsOpen ? 'active' : ''}`}>
              <button className="mobile-dropdown-toggle" onClick={toggleMobileTools}>
                Tools
                <ChevronDown size={16} />
              </button>
              <div className="mobile-dropdown-menu">
                <Link to="/tools" className="mobile-dropdown-item" onClick={closeMobileMenu}>All Tools</Link>
                <Link to="/tool/compress-image" className="mobile-dropdown-item" onClick={closeMobileMenu}>Compress Image</Link>
                <Link to="/tool/convert-audio" className="mobile-dropdown-item" onClick={closeMobileMenu}>Convert Audio</Link>
                <Link to="/tool/convert-video" className="mobile-dropdown-item" onClick={closeMobileMenu}>Convert Video</Link>
              </div>
            </div>
            
            <div className={`mobile-dropdown ${isMobileCompanyOpen ? 'active' : ''}`}>
              <button className="mobile-dropdown-toggle" onClick={toggleMobileCompany}>
                Company
                <ChevronDown size={16} />
              </button>
              <div className="mobile-dropdown-menu">
                <Link to="/owner" className="mobile-dropdown-item" onClick={closeMobileMenu}>Owner</Link>
                <Link to="/contact" className="mobile-dropdown-item" onClick={closeMobileMenu}>Contact</Link>
                <Link to="/about" className="mobile-dropdown-item" onClick={closeMobileMenu}>About Us</Link>
                <Link to="/privacy" className="mobile-dropdown-item" onClick={closeMobileMenu}>Privacy Policy</Link>
                <Link to="/terms" className="mobile-dropdown-item" onClick={closeMobileMenu}>Terms of Service</Link>
              </div>
            </div>

            {!isAuthenticated ? (
              <div className="mobile-auth-buttons">
                <Link to="/login" className="btn btn-secondary" onClick={closeMobileMenu}>Login</Link>
                <Link to="/signup" className="btn btn-primary" onClick={closeMobileMenu}>Sign Up</Link>
              </div>
            ) : (
              <div className="mobile-user-menu">
                <Link to="/dashboard" className="mobile-nav-link" onClick={closeMobileMenu}>
                  <Settings size={16} />
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="mobile-nav-link">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 