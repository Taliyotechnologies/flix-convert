import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { 
  FiSun, 
  FiMoon, 
  FiMenu, 
  FiX, 
  FiUser, 
  FiLogOut, 
  FiSettings,
  FiChevronDown,
  FiGrid
} from 'react-icons/fi'
import './Navbar.css'

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Home' },
    { 
      path: '/tools', 
      label: 'Tools',
      dropdown: [
        { path: '/tools?type=compress', label: 'Compress Image' },
        { path: '/tools?type=compress', label: 'Convert Video' },
        { path: '/tools?type=compress', label: 'Compress PDF' },
        { path: '/tools?type=compress', label: 'Convert Audio' }
      ]
    },
    { path: '/company', label: 'Company' }
  ]

  const handleLogout = () => {
    logout()
    setIsDropdownOpen(false)
  }

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="logo-text">FlixConvert</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-nav desktop-nav">
            {navItems.map((item) => (
              <div key={item.path} className="nav-item">
                {item.dropdown ? (
                  <div className="dropdown">
                    <button 
                      className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      {item.label}
                      <FiChevronDown className="dropdown-icon" />
                    </button>
                    {isDropdownOpen && (
                      <div className="dropdown-menu">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.path}
                            to={dropdownItem.path}
                            className="dropdown-item"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link 
                    to={item.path} 
                    className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div className="navbar-right">
            {/* Theme Toggle */}
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <FiMoon /> : <FiSun />}
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="user-menu">
                <button 
                  className="user-button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="user-avatar">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      <FiUser />
                    )}
                  </div>
                  <span className="user-name">{user?.name}</span>
                  <FiChevronDown className="dropdown-icon" />
                </button>

                {isDropdownOpen && (
                  <div className="user-dropdown">
                    <Link 
                      to="/dashboard" 
                      className="dropdown-item"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FiGrid />
                      Dashboard
                    </Link>
                    {user?.role === 'admin' && (
                      <Link 
                        to="/admin" 
                        className="dropdown-item"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FiSettings />
                        Admin Dashboard
                      </Link>
                    )}
                    <button 
                      className="dropdown-item"
                      onClick={handleLogout}
                    >
                      <FiLogOut />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-ghost">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            {navItems.map((item) => (
              <div key={item.path} className="mobile-nav-item">
                {item.dropdown ? (
                  <div className="mobile-dropdown">
                    <div className="mobile-dropdown-header">
                      {item.label}
                    </div>
                    <div className="mobile-dropdown-items">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.path}
                          to={dropdownItem.path}
                          className="mobile-dropdown-item"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link 
                    to={item.path} 
                    className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            
            {!isAuthenticated && (
              <div className="mobile-auth">
                <Link 
                  to="/login" 
                  className="btn btn-ghost w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="btn btn-primary w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 