import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState({ company: false, compress: false, convert: false });

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleLinkClick = () => setMenuOpen(false);

  const handleDropdown = (name) => {
    setDropdown((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">FlixConvert</div>
      <button className="navbar-hamburger" onClick={handleMenuToggle} aria-label="Menu">
        <span className={menuOpen ? 'bar open' : 'bar'}></span>
        <span className={menuOpen ? 'bar open' : 'bar'}></span>
        <span className={menuOpen ? 'bar open' : 'bar'}></span>
      </button>
      <ul className={`navbar-links${menuOpen ? ' open' : ''}`}>
        <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
        <li className="navbar-dropdown">
          <button type="button" onClick={() => handleDropdown('company')} className="dropdown-btn">Company</button>
          <ul className={`dropdown-menu${dropdown.company ? ' show' : ''}`}>
            <li><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>
          </ul>
        </li>
        <li className="navbar-dropdown">
          <button type="button" onClick={() => handleDropdown('compress')} className="dropdown-btn">Compress</button>
          <ul className={`dropdown-menu${dropdown.compress ? ' show' : ''}`}>
            <li><Link to="/compress/image" onClick={handleLinkClick}>Image</Link></li>
            <li><Link to="/compress/video" onClick={handleLinkClick}>Video</Link></li>
            <li><Link to="/compress/pdf" onClick={handleLinkClick}>PDF</Link></li>
            <li><Link to="/compress/audio" onClick={handleLinkClick}>Audio</Link></li>
          </ul>
        </li>
        <li className="navbar-dropdown">
          <button type="button" onClick={() => handleDropdown('convert')} className="dropdown-btn">Convert</button>
          <ul className={`dropdown-menu${dropdown.convert ? ' show' : ''}`}>
            <li><Link to="/convert/image" onClick={handleLinkClick}>Image</Link></li>
            <li><Link to="/convert/video" onClick={handleLinkClick}>Video</Link></li>
            <li><Link to="/convert/pdf" onClick={handleLinkClick}>PDF</Link></li>
            <li><Link to="/convert/audio" onClick={handleLinkClick}>Audio</Link></li>
          </ul>
        </li>
        <li><Link to="/login" onClick={handleLinkClick}>Login</Link></li>
        <li><Link to="/signup" onClick={handleLinkClick}>Signup</Link></li>
        <li className="navbar-theme-mobile">
          <button className="theme-toggle" onClick={() => { toggleTheme(); setMenuOpen(false); }} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </li>
      </ul>
      <div className="navbar-theme-desktop">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar; 