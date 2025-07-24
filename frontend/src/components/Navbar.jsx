import React from 'react';
import './Navbar.css';

function Navbar({ theme, toggleTheme }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">FlixConvert</div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
      </ul>
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </nav>
  );
}

export default Navbar; 