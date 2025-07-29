import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'

const Navbar = ({ theme, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/tools', label: 'Tools' },
    { path: '/compress/image', label: 'Compress Image' },
    { path: '/compress/video', label: 'Compress Video' },
    { path: '/compress/audio', label: 'Compress Audio' },
    { path: '/compress/pdf', label: 'Compress PDF' }
  ]

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <Helmet>
        <title>ConvertFlix - File Compression & Conversion Tool</title>
      </Helmet>
      
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            🎬 ConvertFlix
          </Link>

          <ul className="navbar-nav">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="navbar-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <ul className="mobile-nav">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      <style jsx>{`
        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: var(--bg-primary);
          border-top: 1px solid var(--border-color);
          box-shadow: var(--shadow-lg);
          z-index: 999;
        }

        .mobile-nav {
          list-style: none;
          padding: 1rem;
        }

        .mobile-nav-link {
          display: block;
          padding: 1rem;
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: var(--accent-primary);
          background-color: var(--bg-secondary);
        }

        @media (min-width: 769px) {
          .mobile-menu {
            display: none;
          }
        }
      `}</style>
    </>
  )
}

export default Navbar