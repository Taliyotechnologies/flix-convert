import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, User, LogOut, Settings } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const location = useLocation();
  
  // Mock authentication state - replace with real auth
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
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          
          <div className="dropdown">
            <button 
              className={`nav-link dropdown-toggle ${location.pathname.startsWith('/tools') ? 'active' : ''}`}
            >
              Tools
            </button>
            <div className="dropdown-menu">
              <Link to="/tools" className="dropdown-item">All Tools</Link>
              <Link to="/tool/compress-image" className="dropdown-item">Compress Image</Link>
              <Link to="/tool/convert-audio" className="dropdown-item">Convert Audio</Link>
              <Link to="/tool/convert-video" className="dropdown-item">Convert Video</Link>
            </div>
          </div>
          
          <div className="dropdown">
            <button className="nav-link dropdown-toggle">
              Company
            </button>
            <div className="dropdown-menu">
              <Link to="/owner" className="dropdown-item">Owner</Link>
              <Link to="/contact" className="dropdown-item">Contact</Link>
              <Link to="/about" className="dropdown-item">About Us</Link>
              <Link to="/privacy" className="dropdown-item">Privacy Policy</Link>
              <Link to="/terms" className="dropdown-item">Terms of Service</Link>
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
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </div>
          ) : (
            <div className="user-menu dropdown">
              <button className="user-avatar">
                <User size={20} />
              </button>
              <div className="user-dropdown">
                <Link to="/dashboard" className="dropdown-item">
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
      </div>
    </nav>
  );
};

export default Navbar; 