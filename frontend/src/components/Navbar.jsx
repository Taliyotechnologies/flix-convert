import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import './Navbar.css'

const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const location = useLocation()

  // Mock auth state - replace with actual auth context
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          ConvertFlix
        </Link>

        {/* Desktop Navigation */}
        <div className={`navbar-nav ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          
          <div className="nav-dropdown">
            <button 
              className={`nav-link dropdown-toggle ${isActive('/tools') ? 'active' : ''}`}
              onClick={toggleDropdown}
            >
              Tools
            </button>
            <div className={`dropdown-menu ${isDropdownOpen ? 'active' : ''}`}>
              <Link to="/tools" onClick={() => setIsMenuOpen(false)}>All Tools</Link>
              <Link to="/tool/compress-image" onClick={() => setIsMenuOpen(false)}>Compress Image</Link>
              <Link to="/tool/convert-audio" onClick={() => setIsMenuOpen(false)}>Convert Audio</Link>
            </div>
          </div>
          
          <Link 
            to="/company" 
            className={`nav-link ${isActive('/company') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Company
          </Link>
        </div>

        {/* Right side - Theme toggle and Auth */}
        <div className="navbar-right">
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '🌞'}
          </button>

          {isAuthenticated ? (
            <div className="user-menu">
              <button className="user-avatar" onClick={toggleDropdown}>
                👤
              </button>
              <div className={`dropdown-menu ${isDropdownOpen ? 'active' : ''}`}>
                <Link to="/dashboard">Dashboard</Link>
                <button onClick={() => setIsAuthenticated(false)}>Logout</button>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button 
            className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 