import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings,
  ChevronDown,
  FileText,
  Image,
  Video,
  Music,
  File
} from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const location = useLocation();

  const toolsItems = [
    { name: 'Compress Image', icon: Image, path: '/tools?type=compress-image' },
    { name: 'Convert Video', icon: Video, path: '/tools?type=convert-video' },
    { name: 'Compress PDF', icon: FileText, path: '/tools?type=compress-pdf' },
    { name: 'Convert Audio', icon: Music, path: '/tools?type=convert-audio' },
  ];

  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsToolsDropdownOpen(false);
    setIsUserDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenus}>
          <File className="logo-icon" />
          <span>FlixConvert</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-nav desktop-nav">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          
          <div className="nav-dropdown">
            <button 
              className={`nav-link dropdown-toggle ${location.pathname === '/tools' ? 'active' : ''}`}
              onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
            >
              Tools
              <ChevronDown className="dropdown-icon" />
            </button>
            
            {isToolsDropdownOpen && (
              <div className="dropdown-menu">
                {toolsItems.map((item) => (
                  <Link 
                    key={item.name} 
                    to={item.path} 
                    className="dropdown-item"
                    onClick={() => setIsToolsDropdownOpen(false)}
                  >
                    <item.icon className="dropdown-item-icon" />
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <Link to="/company" className={`nav-link ${location.pathname === '/company' ? 'active' : ''}`}>
            Company
          </Link>
        </div>

        {/* Right side items */}
        <div className="navbar-right">
          {/* Theme Toggle */}
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Auth Buttons */}
          {!isAuthenticated ? (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="user-dropdown">
              <button 
                className="user-button"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                <div className="user-avatar">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <span>{user?.initials || user?.name?.charAt(0)?.toUpperCase()}</span>
                  )}
                </div>
                <span className="user-name">{user?.name}</span>
                <ChevronDown className="dropdown-icon" />
              </button>
              
              {isUserDropdownOpen && (
                <div className="dropdown-menu user-dropdown-menu">
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="dropdown-item">
                      <Settings className="dropdown-item-icon" />
                      Admin Dashboard
                    </Link>
                  )}
                  <Link to="/profile" className="dropdown-item">
                    <User className="dropdown-item-icon" />
                    Profile
                  </Link>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <LogOut className="dropdown-item-icon" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-nav">
          <Link to="/" className="mobile-nav-link" onClick={closeMenus}>
            Home
          </Link>
          
          <div className="mobile-nav-section">
            <div className="mobile-nav-header">Tools</div>
            {toolsItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className="mobile-nav-link sub-link"
                onClick={closeMenus}
              >
                <item.icon className="mobile-nav-icon" />
                {item.name}
              </Link>
            ))}
          </div>
          
          <Link to="/company" className="mobile-nav-link" onClick={closeMenus}>
            Company
          </Link>
          
          {!isAuthenticated ? (
            <div className="mobile-auth">
              <Link to="/login" className="btn btn-outline mobile-btn" onClick={closeMenus}>
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary mobile-btn" onClick={closeMenus}>
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="mobile-user">
              <div className="mobile-user-info">
                <div className="user-avatar">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <span>{user?.initials || user?.name?.charAt(0)?.toUpperCase()}</span>
                  )}
                </div>
                <span>{user?.name}</span>
              </div>
              {user?.role === 'admin' && (
                <Link to="/admin" className="mobile-nav-link" onClick={closeMenus}>
                  Admin Dashboard
                </Link>
              )}
              <Link to="/profile" className="mobile-nav-link" onClick={closeMenus}>
                Profile
              </Link>
              <button className="mobile-nav-link logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar; 