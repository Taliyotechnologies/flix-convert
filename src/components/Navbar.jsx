import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const location = useLocation();
  
  // Mock authentication state - replace with actual auth logic
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          ConvertFlix
        </Link>

        {/* Center Navigation */}
        <div className="navbar-center">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          
          <div className="dropdown">
            <button 
              className={`nav-link dropdown-toggle ${location.pathname.startsWith('/tools') ? 'active' : ''}`}
              onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
            >
              Tools
            </button>
            {isToolsDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/tools" className="dropdown-item">All Tools</Link>
                <Link to="/tool/compress-image" className="dropdown-item">Compress Image</Link>
                <Link to="/tool/convert-audio" className="dropdown-item">Convert Audio</Link>
                <Link to="/tool/convert-video" className="dropdown-item">Convert Video</Link>
              </div>
            )}
          </div>
          
          <Link to="/company" className="nav-link">
            Company
          </Link>
        </div>

        {/* Right Side */}
        <div className="navbar-right">
          {/* Theme Toggle */}
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? '🌞' : '🌙'}
          </button>

          {/* Auth Section */}
          {!isAuthenticated ? (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="profile-dropdown">
              <button 
                className="profile-avatar"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                👤
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
                  <button onClick={handleLogout} className="dropdown-item">Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 