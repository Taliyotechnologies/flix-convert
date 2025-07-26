import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, User, LogIn } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/convert', label: 'Convert' },
    { path: '/compress', label: 'Compress' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <Zap className="brand-icon" />
          <span className="brand-text">ConvertFlix</span>
        </Link>

        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          <Link to="/login" className="btn-login">
            <LogIn size={18} />
            <span>Login</span>
          </Link>
          <Link to="/signup" className="btn-signup">
            <User size={18} />
            <span>Sign Up</span>
          </Link>
        </div>

        <button
          className={`navbar-toggle ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 