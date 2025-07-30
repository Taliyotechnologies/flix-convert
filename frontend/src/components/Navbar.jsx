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
  FiChevronRight,
  FiZap
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
    <nav className="bg-bg-card border-b border-border-color sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-color to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <FiZap className="text-white text-lg" />
            </div>
            <span className="font-bold text-xl text-text-primary group-hover:text-primary-color transition-colors">
              FlixConvert
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.path}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isActive(item.path)
                      ? 'text-primary-color bg-primary-light shadow-md'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                  }`}
                >
                  {item.name}
                  {item.dropdown && <FiChevronDown className="text-xs transition-transform group-hover:rotate-180" />}
                </Link>
                
                {/* Desktop Dropdown */}
                {item.dropdown && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-bg-card border border-border-color rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 backdrop-blur-md">
                    <div className="p-2">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.path}
                          className="block px-4 py-3 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-xl transition-all duration-200"
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-all duration-300 group"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <FiMoon size={20} className="group-hover:scale-110 transition-transform" />
              ) : (
                <FiSun size={20} className="group-hover:scale-110 transition-transform" />
              )}
            </button>

            {/* Auth Buttons / User Menu */}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-all duration-300 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-color to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <span className="text-white text-sm font-semibold">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <FiChevronDown size={16} className="hidden md:block transition-transform group-hover:rotate-180" />
                </button>

                {/* User Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-bg-card border border-border-color rounded-2xl shadow-xl z-50 backdrop-blur-md">
                    <div className="p-4 border-b border-border-color">
                      <p className="text-sm font-semibold text-text-primary">{user?.name}</p>
                      <p className="text-xs text-text-muted">{user?.email}</p>
                    </div>
                    <div className="p-2">
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-xl transition-all duration-200"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <FiSettings size={16} />
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-xl transition-all duration-200"
                      >
                        <FiLogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 text-sm font-semibold bg-gradient-to-r from-primary-color to-purple-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <FiX size={20} className="transition-transform rotate-90" />
              ) : (
                <FiMenu size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border-color bg-bg-card backdrop-blur-md" ref={menuRef}>
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                          isActive(item.path)
                            ? 'text-primary-color bg-primary-light'
                            : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                        }`}
                      >
                        {item.name}
                        <FiChevronRight 
                          size={16} 
                          className={`transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-90' : ''}`}
                        />
                      </button>
                      
                      {/* Mobile Dropdown */}
                      {activeDropdown === item.name && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.path}
                              className="block px-4 py-3 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-xl transition-all duration-200"
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
                      className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                        isActive(item.path)
                          ? 'text-primary-color bg-primary-light'
                          : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {!isAuthenticated && (
                <div className="pt-4 border-t border-border-color space-y-3">
                  <Link
                    to="/login"
                    className="block px-4 py-3 text-base font-semibold text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-xl transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-3 text-base font-semibold bg-gradient-to-r from-primary-color to-purple-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
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