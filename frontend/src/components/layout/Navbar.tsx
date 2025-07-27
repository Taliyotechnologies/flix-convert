import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Home, Wrench, Building, Phone, User, LogIn, Sparkles } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Tools', path: '/tools', icon: Wrench },
    { name: 'Company', path: '/company', icon: Building },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-glass/95 backdrop-blur-xl border-b border-border-color shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center gap-4 text-xl lg:text-2xl font-bold group">
            <div className="relative">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-modern rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                <Sparkles size={24} className="text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-modern rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
            <span className="hidden sm:block gradient-text font-bold">FlixConvert</span>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 relative overflow-hidden group ${
                    isActive(item.path)
                      ? 'text-primary-color bg-primary-color/10 shadow-md'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-modern opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <Icon size={20} className="relative z-10" />
                  <span className="font-medium text-lg relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Enhanced Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-4 rounded-2xl text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-all duration-300 relative overflow-hidden group"
              aria-label="Toggle theme"
            >
              <div className="absolute inset-0 bg-gradient-modern opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative z-10">
                {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
              </div>
            </button>
            
            <Link
              to="/login"
              className="btn btn-secondary flex items-center gap-3 px-6 py-3 rounded-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-modern opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <LogIn size={20} className="relative z-10" />
              <span className="font-medium text-lg relative z-10">Login</span>
            </Link>
            
            <Link
              to="/signup"
              className="btn btn-primary flex items-center gap-3 px-6 py-3 rounded-2xl shadow-lg relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-modern opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <User size={20} className="relative z-10" />
              <span className="font-medium text-lg relative z-10">Sign Up</span>
            </Link>
          </div>

          {/* Enhanced Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-4 rounded-2xl text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-all duration-300 relative overflow-hidden group"
            aria-label="Toggle menu"
          >
            <div className="absolute inset-0 bg-gradient-modern opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative z-10">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </div>
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border-color bg-glass/95 backdrop-blur-xl animate-fade-in">
            <div className="px-6 pt-6 pb-8 space-y-3">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden group animate-fade-in ${
                      isActive(item.path)
                        ? 'text-primary-color bg-primary-color/10 shadow-md'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="absolute inset-0 bg-gradient-modern opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <Icon size={22} className="relative z-10" />
                    <span className="font-medium text-lg relative z-10">{item.name}</span>
                  </Link>
                );
              })}
              
              <div className="pt-6 border-t border-border-color">
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-text-secondary font-medium text-lg">Theme</span>
                  <button
                    onClick={toggleTheme}
                    className="p-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-modern opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
                    </div>
                  </button>
                </div>
                
                <div className="flex flex-col gap-4 px-6 py-4">
                  <Link
                    to="/login"
                    className="btn btn-secondary flex items-center gap-4 justify-center rounded-2xl py-4 relative overflow-hidden group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="absolute inset-0 bg-gradient-modern opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <LogIn size={22} className="relative z-10" />
                    <span className="font-medium text-lg relative z-10">Login</span>
                  </Link>
                  
                  <Link
                    to="/signup"
                    className="btn btn-primary flex items-center gap-4 justify-center rounded-2xl py-4 shadow-lg relative overflow-hidden group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="absolute inset-0 bg-gradient-modern opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <User size={22} className="relative z-10" />
                    <span className="font-medium text-lg relative z-10">Sign Up</span>
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