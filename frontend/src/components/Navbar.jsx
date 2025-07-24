import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [compressOpen, setCompressOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <nav className={`navbar${darkMode ? ' dark' : ''}`}> 
      <div className="navbar-logo">
        {/* Square SVG Logo */}
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="8" fill="#4F46E5"/>
          <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="18" fontFamily="Arial" dy=".3em">W</text>
        </svg>
        <span className="logo-text">Wana</span>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li className="dropdown" onMouseEnter={() => setCompressOpen(true)} onMouseLeave={() => setCompressOpen(false)}>
          <span>Compress</span>
          {compressOpen && (
            <ul className="dropdown-menu">
              <li><Link to="/compress/image">Image</Link></li>
              <li><Link to="/compress/video">Video</Link></li>
              <li><Link to="/compress/audio">Audio</Link></li>
              <li><Link to="/compress/pdf">PDF</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/convert">Convert</Link></li>
        <li className="dropdown" onMouseEnter={() => setCompanyOpen(true)} onMouseLeave={() => setCompanyOpen(false)}>
          <span>Company</span>
          {companyOpen && (
            <ul className="dropdown-menu">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/owner">Owner</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li>
          <button className="theme-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
            {/* SVG for dark/light mode */}
            {darkMode ? (
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="#FBBF24"/></svg>
            ) : (
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#4F46E5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"/></svg>
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar; 