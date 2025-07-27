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
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 text-xl lg:text-2xl font-bold gradient-text">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg lg:text-xl">F</span>
            </div>
            <span className="hidden sm:block">FlixConvert</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive(item.path)
                      ? 'text-primary-color bg-primary-color/10 shadow-md'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <Link
              to="/login"
              className="btn btn-secondary flex items-center gap-2 px-4 py-2"
            >
              <LogIn size={18} />
              <span className="font-medium">Login</span>
            </Link>
            
            <Link
              to="/signup"
              className="btn btn-primary flex items-center gap-2 px-4 py-2 shadow-lg"
            >
              <User size={18} />
              <span className="font-medium">Sign Up</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border-color bg-glass backdrop-blur-xl animate-fade-in">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive(item.path)
                        ? 'text-primary-color bg-primary-color/10 shadow-md'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
              
              <div className="pt-4 border-t border-border-color">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-text-secondary font-medium">Theme</span>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-all duration-300"
                  >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                  </button>
                </div>
                
                <div className="flex flex-col gap-3 px-4 py-3">
                  <Link
                    to="/login"
                    className="btn btn-secondary flex items-center gap-3 justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn size={20} />
                    <span className="font-medium">Login</span>
                  </Link>
                  
                  <Link
                    to="/signup"
                    className="btn btn-primary flex items-center gap-3 justify-center shadow-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={20} />
                    <span className="font-medium">Sign Up</span>
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