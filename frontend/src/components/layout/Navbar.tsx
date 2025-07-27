import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Home, Wrench, Building, Phone, User, LogIn } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Tools', path: '/tools', icon: Wrench },
    { name: 'Company', path: '/company', icon: Building },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-glass border-b border-border-color sticky top-0 z-50 backdrop-blur-xl">
      <div className="container">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 text-xl lg:text-2xl font-bold gradient-text">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl lg:text-2xl">F</span>
            </div>
            <span className="hidden sm:block">FlixConvert</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 ${
                    isActive(item.path)
                      ? 'text-primary-color bg-primary-color/10 shadow-md'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium text-lg">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-4 rounded-2xl text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
            </button>
            
            <Link
              to="/login"
              className="btn btn-secondary flex items-center gap-3 px-6 py-3 rounded-2xl"
            >
              <LogIn size={20} />
              <span className="font-medium text-lg">Login</span>
            </Link>
            
            <Link
              to="/signup"
              className="btn btn-primary flex items-center gap-3 px-6 py-3 rounded-2xl shadow-lg"
            >
              <User size={20} />
              <span className="font-medium text-lg">Sign Up</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-4 rounded-2xl text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border-color bg-glass backdrop-blur-xl animate-fade-in">
            <div className="px-6 pt-6 pb-8 space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${
                      isActive(item.path)
                        ? 'text-primary-color bg-primary-color/10 shadow-md'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon size={22} />
                    <span className="font-medium text-lg">{item.name}</span>
                  </Link>
                );
              })}
              
              <div className="pt-6 border-t border-border-color">
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-text-secondary font-medium text-lg">Theme</span>
                  <button
                    onClick={toggleTheme}
                    className="p-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-all duration-300"
                  >
                    {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
                  </button>
                </div>
                
                <div className="flex flex-col gap-4 px-6 py-4">
                  <Link
                    to="/login"
                    className="btn btn-secondary flex items-center gap-4 justify-center rounded-2xl py-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn size={22} />
                    <span className="font-medium text-lg">Login</span>
                  </Link>
                  
                  <Link
                    to="/signup"
                    className="btn btn-primary flex items-center gap-4 justify-center rounded-2xl py-4 shadow-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={22} />
                    <span className="font-medium text-lg">Sign Up</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 