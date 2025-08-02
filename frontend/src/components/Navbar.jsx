import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Sun, 
  Moon, 
  ChevronDown, 
  User, 
  LogOut,
  FileText,
  Image,
  Video,
  Music,
  FileImage
} from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('adminToken');

  const tools = [
    { name: 'Compress Image', path: '/tool/compress-image', icon: Image },
    { name: 'Convert Image', path: '/tool/convert-image', icon: FileImage },
    { name: 'Compress Video', path: '/tool/compress-video', icon: Video },
    { name: 'Convert Video', path: '/tool/convert-video', icon: Video },
    { name: 'Compress Audio', path: '/tool/compress-audio', icon: Music },
    { name: 'Convert Audio', path: '/tool/convert-audio', icon: Music },
    { name: 'Compress PDF', path: '/tool/compress-pdf', icon: FileText },
    { name: 'Convert PDF', path: '/tool/convert-pdf', icon: FileText },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FileText className="logo-icon" />
          <span>ConvertFlix</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          
          <div className="dropdown">
            <button 
              className={`nav-link dropdown-toggle ${location.pathname.startsWith('/tool') ? 'active' : ''}`}
              onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
            >
              Tools
              <ChevronDown className="dropdown-icon" />
            </button>
            
            {isToolsDropdownOpen && (
              <div className="dropdown-menu">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      className="dropdown-item"
                      onClick={() => setIsToolsDropdownOpen(false)}
                    >
                      <Icon className="dropdown-item-icon" />
                      {tool.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link to="/tools" className={`nav-link ${location.pathname === '/tools' ? 'active' : ''}`}>
            All Tools
          </Link>
        </div>

        <div className="navbar-actions">
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? <Sun className="theme-icon" /> : <Moon className="theme-icon" />}
          </button>

          {isLoggedIn ? (
            <div className="admin-dropdown">
              <button 
                className="admin-button"
                onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
              >
                <User className="admin-icon" />
                Admin
                <ChevronDown className="dropdown-icon" />
              </button>
              
              {isAdminDropdownOpen && (
                <div className="dropdown-menu admin-dropdown-menu">
                  <Link to="/admin" className="dropdown-item">
                    Dashboard
                  </Link>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <LogOut className="dropdown-item-icon" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-button">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 