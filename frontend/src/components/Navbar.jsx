import React, { useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ThemeContext } from '../App'
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { user, logout } = useAuth()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false)
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-surface border-b border-border sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <span className="text-2xl">🎬</span>
            ConvertFlix
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-primary bg-primary/10' 
                  : 'text-text-secondary hover:text-text hover:bg-hover'
              }`}
            >
              Home
            </Link>

            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                  location.pathname.startsWith('/compress') || location.pathname.startsWith('/convert')
                    ? 'text-primary bg-primary/10' 
                    : 'text-text-secondary hover:text-text hover:bg-hover'
                }`}
              >
                Tools
                <span className="text-xs">▼</span>
              </button>
              
              {isToolsDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-surface border border-border rounded-lg shadow-lg py-2 z-50">
                  <div className="px-3 py-2 text-xs font-semibold text-text-secondary uppercase tracking-wide">
                    Compression
                  </div>
                  <Link 
                    to="/compress/image" 
                    className="block px-3 py-2 text-sm hover:bg-hover transition-colors"
                    onClick={() => setIsToolsDropdownOpen(false)}
                  >
                    🖼️ Compress Image
                  </Link>
                  <Link 
                    to="/compress/video" 
                    className="block px-3 py-2 text-sm hover:bg-hover transition-colors"
                    onClick={() => setIsToolsDropdownOpen(false)}
                  >
                    🎥 Compress Video
                  </Link>
                  <Link 
                    to="/compress/audio" 
                    className="block px-3 py-2 text-sm hover:bg-hover transition-colors"
                    onClick={() => setIsToolsDropdownOpen(false)}
                  >
                    🎵 Compress Audio
                  </Link>
                  <Link 
                    to="/compress/pdf" 
                    className="block px-3 py-2 text-sm hover:bg-hover transition-colors"
                    onClick={() => setIsToolsDropdownOpen(false)}
                  >
                    📄 Compress PDF
                  </Link>
                  
                  <div className="border-t border-border my-2"></div>
                  
                  <div className="px-3 py-2 text-xs font-semibold text-text-secondary uppercase tracking-wide">
                    Conversion
                  </div>
                  <Link 
                    to="/convert/image" 
                    className="block px-3 py-2 text-sm hover:bg-hover transition-colors"
                    onClick={() => setIsToolsDropdownOpen(false)}
                  >
                    🖼️ Convert Image
                  </Link>
                  <Link 
                    to="/convert/video" 
                    className="block px-3 py-2 text-sm hover:bg-hover transition-colors"
                    onClick={() => setIsToolsDropdownOpen(false)}
                  >
                    🎥 Convert Video
                  </Link>
                  <Link 
                    to="/convert/audio" 
                    className="block px-3 py-2 text-sm hover:bg-hover transition-colors"
                    onClick={() => setIsToolsDropdownOpen(false)}
                  >
                    🎵 Convert Audio
                  </Link>
                  <Link 
                    to="/convert/pdf" 
                    className="block px-3 py-2 text-sm hover:bg-hover transition-colors"
                    onClick={() => setIsToolsDropdownOpen(false)}
                  >
                    📄 Convert PDF
                  </Link>
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
                className="px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:text-text hover:bg-hover transition-colors flex items-center gap-1"
              >
                Company
                <span className="text-xs">▼</span>
              </button>
              
              {isCompanyDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-surface border border-border rounded-lg shadow-lg py-2 z-50">
                  <Link 
                    to="/about" 
                    className="block px-3 py-2 text-sm hover:bg-hover transition-colors"
                    onClick={() => setIsCompanyDropdownOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link 
                    to="/contact" 
                    className="block px-3 py-2 text-sm hover:bg-hover transition-colors"
                    onClick={() => setIsCompanyDropdownOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-text-secondary hover:text-text hover:bg-hover transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:text-text hover:bg-hover transition-colors"
                >
                  <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {user.email.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden sm:block">{user.email}</span>
                  <span className="text-xs">▼</span>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-surface border border-border rounded-lg shadow-lg py-2 z-50">
                    {user.role === 'admin' && (
                      <>
                        <Link 
                          to="/admin" 
                          className="block px-3 py-2 text-sm hover:bg-hover transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          🏠 Dashboard
                        </Link>
                        <Link 
                          to="/admin/files" 
                          className="block px-3 py-2 text-sm hover:bg-hover transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          📁 Files
                        </Link>
                        <Link 
                          to="/admin/create-user" 
                          className="block px-3 py-2 text-sm hover:bg-hover transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          👤 Create User
                        </Link>
                        <div className="border-t border-border my-2"></div>
                      </>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-sm hover:bg-hover transition-colors text-error"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  to="/login" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:text-text hover:bg-hover transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-3 py-2 rounded-md text-sm font-medium bg-primary text-white hover:bg-primary-hover transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-text-secondary hover:text-text hover:bg-hover transition-colors"
              aria-label="Toggle menu"
            >
              <span className="text-xl">☰</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="flex flex-col gap-2">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-primary bg-primary/10' 
                    : 'text-text-secondary hover:text-text hover:bg-hover'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              <div className="px-3 py-2 text-xs font-semibold text-text-secondary uppercase tracking-wide">
                Compression Tools
              </div>
              <Link 
                to="/compress/image" 
                className="block px-3 py-2 text-sm hover:bg-hover transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                🖼️ Compress Image
              </Link>
              <Link 
                to="/compress/video" 
                className="block px-3 py-2 text-sm hover:bg-hover transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                🎥 Compress Video
              </Link>
              <Link 
                to="/compress/audio" 
                className="block px-3 py-2 text-sm hover:bg-hover transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                🎵 Compress Audio
              </Link>
              <Link 
                to="/compress/pdf" 
                className="block px-3 py-2 text-sm hover:bg-hover transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                📄 Compress PDF
              </Link>
              
              <div className="px-3 py-2 text-xs font-semibold text-text-secondary uppercase tracking-wide">
                Conversion Tools
              </div>
              <Link 
                to="/convert/image" 
                className="block px-3 py-2 text-sm hover:bg-hover transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                🖼️ Convert Image
              </Link>
              <Link 
                to="/convert/video" 
                className="block px-3 py-2 text-sm hover:bg-hover transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                🎥 Convert Video
              </Link>
              <Link 
                to="/convert/audio" 
                className="block px-3 py-2 text-sm hover:bg-hover transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                🎵 Convert Audio
              </Link>
              <Link 
                to="/convert/pdf" 
                className="block px-3 py-2 text-sm hover:bg-hover transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                📄 Convert PDF
              </Link>
              
              <div className="border-t border-border my-2"></div>
              
              <Link 
                to="/about" 
                className="block px-3 py-2 text-sm hover:bg-hover transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="block px-3 py-2 text-sm hover:bg-hover transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {(isToolsDropdownOpen || isCompanyDropdownOpen || isMenuOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsToolsDropdownOpen(false)
            setIsCompanyDropdownOpen(false)
            setIsMenuOpen(false)
          }}
        />
      )}
    </nav>
  )
}

export default Navbar 