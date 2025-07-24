import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ theme, toggleTheme }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">FlixConvert</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/compress">Compress</Link></li>
        <li><Link to="/convert">Convert</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </nav>
  );
}

export default Navbar; 