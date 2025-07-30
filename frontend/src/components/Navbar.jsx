import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  FiSun, 
  FiMoon, 
  FiUser, 
  FiLogOut, 
  FiSettings, 
  FiMenu, 
  FiX,
  FiChevronDown,
  FiChevronRight
} from 'react-icons/fi';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  const navItems = [
    { name: 'Home', path: '/' },
    { 
      name: 'Tools', 
      path: '/tools',
      dropdown: [
        { name: 'Compress Image', path: '/tools?type=image&action=compress' },
        { name: 'Convert Video', path: '/tools?type=video&action=convert' },
        { name: 'Compress PDF', path: '/tools?type=pdf&action=compress' },
        { name: 'Convert Audio', path: '/tools?type=audio&action=convert' }
      ]
    },
    { name: 'Company', path: '/company' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  const toggleDropdown = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-bg-card border-b border-border-color sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-color rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="font-bold text-lg md:text-xl text-text-primary">FlixConvert</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                    isActive(item.path)
                      ? 'text-primary-color bg-primary-color bg-opacity-10'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {item.name}
                  {item.dropdown && <FiChevronDown className="text-xs" />}
                </Link>
                
                {/* Desktop Dropdown */}
                {item.dropdown && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-bg-card border border-border-color rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        to={dropdownItem.path}
                        className="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors"
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
            </button>

            {/* Auth Buttons / User Menu */}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors"
                >
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-primary-color rounded-full flex items-center justify-center">
                    <span className="text-white text-xs md:text-sm font-medium">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <FiChevronDown size={14} className="hidden md:block" />
                </button>

                {/* User Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-bg-card border border-border-color rounded-lg shadow-lg z-50">
                    <div className="px-4 py-3 border-b border-border-color">
                      <p className="text-sm font-medium text-text-primary">{user?.name}</p>
                      <p className="text-xs text-text-muted">{user?.email}</p>
                    </div>
                    <div className="py-1">
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <FiSettings size={16} />
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors"
                      >
                        <FiLogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-2 text-sm font-medium bg-primary-color text-white rounded-md hover:bg-primary-hover transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border-color bg-bg-card" ref={menuRef}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium transition-colors ${
                          isActive(item.path)
                            ? 'text-primary-color bg-primary-color bg-opacity-10'
                            : 'text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        {item.name}
                        <FiChevronRight 
                          size={16} 
                          className={`transition-transform ${activeDropdown === item.name ? 'rotate-90' : ''}`}
                        />
                      </button>
                      
                      {/* Mobile Dropdown */}
                      {activeDropdown === item.name && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.path}
                              className="block px-3 py-2 rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive(item.path)
                          ? 'text-primary-color bg-primary-color bg-opacity-10'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {!isAuthenticated && (
                <div className="pt-4 border-t border-border-color space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-base font-medium text-text-secondary hover:text-text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 text-base font-medium bg-primary-color text-white rounded-md hover:bg-primary-hover transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar; 