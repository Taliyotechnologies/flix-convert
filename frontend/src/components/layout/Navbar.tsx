import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Home, Wrench, Building, Phone, User, LogIn, Sparkles, Zap } from 'lucide-react';
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      isScrolled 
        ? 'bg-glass/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl' 
        : 'bg-transparent'
    }`}>
      {/* Animated background particles */}
      <div className="particles">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="container">
        <div className="flex items-center justify-between h-24 lg:h-28">
          {/* Stunning Logo */}
          <Link to="/" className="flex items-center gap-4 text-xl lg:text-2xl font-bold group relative">
            <div className="relative">
              <div className="w-16 h-16 lg:w-18 lg:h-18 bg-gradient-neon rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 neon-glow">
                <Zap size={32} className="text-white animate-pulse" />
              </div>
              <div className="absolute -inset-2 bg-gradient-neon rounded-3xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
            </div>
            <span className="hidden sm:block gradient-text-aurora font-black text-2xl lg:text-3xl">FlixConvert</span>
          </Link>

          {/* Stunning Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-8 py-4 rounded-3xl transition-all duration-500 relative overflow-hidden group ${
                    isActive(item.path)
                      ? 'text-white bg-gradient-neon shadow-2xl neon-glow'
                      : 'text-text-secondary hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  <Icon size={22} className="relative z-10" />
                  <span className="font-bold text-lg relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Stunning Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-4 rounded-3xl text-text-secondary hover:text-white hover:bg-white/10 transition-all duration-500 relative overflow-hidden group neon-glow"
              aria-label="Toggle theme"
            >
              <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative z-10">
                {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
              </div>
            </button>
            
            <Link
              to="/login"
              className="btn btn-secondary flex items-center gap-3 px-8 py-4 rounded-3xl relative overflow-hidden group neon-glow"
            >
              <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <LogIn size={22} className="relative z-10" />
              <span className="font-bold text-lg relative z-10">Login</span>
            </Link>
            
            <Link
              to="/signup"
              className="btn btn-primary flex items-center gap-3 px-8 py-4 rounded-3xl shadow-2xl relative overflow-hidden group neon-glow"
            >
              <div className="absolute inset-0 bg-gradient-cyber opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <User size={22} className="relative z-10" />
              <span className="font-bold text-lg relative z-10">Sign Up</span>
            </Link>
          </div>

          {/* Stunning Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-4 rounded-3xl text-text-secondary hover:text-white hover:bg-white/10 transition-all duration-500 relative overflow-hidden group neon-glow"
            aria-label="Toggle menu"
          >
            <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="relative z-10">
              {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </div>
          </button>
        </div>

        {/* Stunning Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-glass/95 backdrop-blur-2xl animate-fade-in">
            <div className="px-6 pt-8 pb-12 space-y-4">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-6 px-8 py-6 rounded-3xl transition-all duration-500 relative overflow-hidden group animate-fade-in ${
                      isActive(item.path)
                        ? 'text-white bg-gradient-neon shadow-2xl neon-glow'
                        : 'text-text-secondary hover:text-white hover:bg-white/10'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <Icon size={26} className="relative z-10" />
                    <span className="font-bold text-xl relative z-10">{item.name}</span>
                  </Link>
                );
              })}
              
              <div className="pt-8 border-t border-white/10">
                <div className="flex items-center justify-between px-8 py-6">
                  <span className="text-text-secondary font-bold text-xl">Theme</span>
                  <button
                    onClick={toggleTheme}
                    className="p-4 rounded-2xl text-text-secondary hover:text-white hover:bg-white/10 transition-all duration-500 relative overflow-hidden group neon-glow"
                  >
                    <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      {theme === 'light' ? <Moon size={26} /> : <Sun size={26} />}
                    </div>
                  </button>
                </div>
                
                <div className="flex flex-col gap-6 px-8 py-6">
                  <Link
                    to="/login"
                    className="btn btn-secondary flex items-center gap-6 justify-center rounded-3xl py-6 relative overflow-hidden group neon-glow"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <LogIn size={26} className="relative z-10" />
                    <span className="font-bold text-xl relative z-10">Login</span>
                  </Link>
                  
                  <Link
                    to="/signup"
                    className="btn btn-primary flex items-center gap-6 justify-center rounded-3xl py-6 shadow-2xl relative overflow-hidden group neon-glow"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="absolute inset-0 bg-gradient-cyber opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <User size={26} className="relative z-10" />
                    <span className="font-bold text-xl relative z-10">Sign Up</span>
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