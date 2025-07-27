import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    {
      name: 'Resize',
      path: '/resize',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Image Resize', path: '/resize/image' },
        { name: 'Batch Resize', path: '/resize/batch' },
        { name: 'Smart Resize', path: '/resize/smart' }
      ]
    },
    {
      name: 'Crop',
      path: '/crop',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Free Crop', path: '/crop/free' },
        { name: 'Aspect Ratio', path: '/crop/aspect' },
        { name: 'Auto Crop', path: '/crop/auto' }
      ]
    },
    {
      name: 'Compress',
      path: '/compress',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Image Compression', path: '/compress/image' },
        { name: 'Quality Settings', path: '/compress/quality' },
        { name: 'Batch Compress', path: '/compress/batch' }
      ]
    },
    {
      name: 'Convert',
      path: '/convert',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Format Converter', path: '/convert/format' },
        { name: 'WebP Converter', path: '/convert/webp' },
        { name: 'HEIC Converter', path: '/convert/heic' }
      ]
    },
    {
      name: 'More',
      path: '/more',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Tools', path: '/tools' },
        { name: 'Company', path: '/company' },
        { name: 'Contact', path: '/contact' }
      ]
    },
    {
      name: 'Pricing',
      path: '/pricing',
      hasDropdown: false
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 border-b border-gray-600">
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              {/* Blue square (bottom-right) */}
              <div className="w-8 h-8 border-2 border-blue-500 rounded-md"></div>
              {/* Green square (top-left) */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-2 border-green-500 rounded-md"></div>
            </div>
            <span className="text-xl lg:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
              ImageResizer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div className="relative">
                    <button
                      onClick={() => handleDropdownToggle(item.name)}
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg text-white hover:text-blue-400 hover:bg-gray-700 transition-all duration-200 font-medium ${
                        isActive(item.path) ? 'text-blue-400 bg-gray-700' : ''
                      }`}
                    >
                      {item.name}
                      <ChevronDown size={16} className={`transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {activeDropdown === item.name && (
                      <div 
                        className="absolute top-full left-0 mt-1 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-600 py-2 z-50"
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            to={dropdownItem.path}
                            className="block px-4 py-2 text-sm text-white hover:text-blue-400 hover:bg-gray-700 transition-colors duration-200"
                            onClick={closeDropdowns}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-4 py-2 rounded-lg text-white hover:text-blue-400 hover:bg-gray-700 transition-all duration-200 font-medium ${
                      isActive(item.path) ? 'text-blue-400 bg-gray-700' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-white hover:text-blue-400 hover:bg-gray-700 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border border-gray-600 text-white hover:text-blue-400 hover:bg-gray-700 transition-all duration-200 font-medium"
            >
              Login
            </Link>
            
            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Signup
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-white hover:text-blue-400 hover:bg-gray-700 transition-all duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-600 bg-gray-800 animate-fade-in">
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => handleDropdownToggle(item.name)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left text-white hover:text-blue-400 hover:bg-gray-700 transition-all duration-200 font-medium ${
                          isActive(item.path) ? 'text-blue-400 bg-gray-700' : ''
                        }`}
                      >
                        {item.name}
                        <ChevronDown size={16} className={`transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {activeDropdown === item.name && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.path}
                              className="block px-4 py-2 text-sm text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setActiveDropdown(null);
                              }}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`block px-4 py-3 rounded-lg text-white hover:text-blue-400 hover:bg-gray-700 transition-all duration-200 font-medium ${
                        isActive(item.path) ? 'text-blue-400 bg-gray-700' : ''
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-gray-600">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-white font-medium">Theme</span>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg text-white hover:text-blue-400 hover:bg-gray-700 transition-all duration-200"
                  >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                  </button>
                </div>
                
                <div className="flex flex-col gap-3 px-4 py-3">
                  <Link
                    to="/login"
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 text-white hover:text-blue-400 hover:bg-gray-700 transition-all duration-200 font-medium text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  
                  <Link
                    to="/signup"
                    className="w-full px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Signup
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