import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  const navItems = [
    {
      name: 'Resize',
      href: '/resize',
      dropdown: [
        { name: 'Image Resizer', href: '/resize/image' },
        { name: 'Bulk Resize', href: '/resize/bulk' },
        { name: 'Resize by Percentage', href: '/resize/percentage' }
      ]
    },
    {
      name: 'Crop',
      href: '/crop',
      dropdown: [
        { name: 'Image Cropper', href: '/crop/image' },
        { name: 'Crop to Aspect Ratio', href: '/crop/aspect' },
        { name: 'Free Crop', href: '/crop/free' }
      ]
    },
    {
      name: 'Compress',
      href: '/compress',
      dropdown: [
        { name: 'Image Compressor', href: '/compress/image' },
        { name: 'Bulk Compress', href: '/compress/bulk' },
        { name: 'Quality Settings', href: '/compress/quality' }
      ]
    },
    {
      name: 'Convert',
      href: '/convert',
      dropdown: [
        { name: 'Image Converter', href: '/convert/image' },
        { name: 'Video Converter', href: '/convert/video' },
        { name: 'Audio Converter', href: '/convert/audio' }
      ]
    },
    {
      name: 'More',
      href: '/more',
      dropdown: [
        { name: 'Tools', href: '/tools' },
        { name: 'API', href: '/api' },
        { name: 'Documentation', href: '/docs' }
      ]
    },
    {
      name: 'Pricing',
      href: '/pricing',
      dropdown: [
        { name: 'Free Plan', href: '/pricing/free' },
        { name: 'Pro Plan', href: '/pricing/pro' },
        { name: 'Enterprise', href: '/pricing/enterprise' }
      ]
    }
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <div className="w-6 h-6 bg-green-500 rounded-sm relative">
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-sm"></div>
              </div>
            </div>
            <Link 
              to="/" 
              className="text-xl font-bold text-white hover:text-gray-200 transition-colors"
            >
              FlixConvert
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className="flex items-center space-x-1 text-white hover:text-gray-200 transition-colors py-2"
                >
                  <span>{item.name}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                {activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        to={dropdownItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={closeDropdowns}
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              to="/login" 
              className="text-white border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Signup
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-200 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-700 py-4">
            <div className="space-y-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="flex items-center justify-between w-full text-left text-white hover:text-gray-200 py-2"
                  >
                    <span>{item.name}</span>
                    <svg 
                      className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {activeDropdown === item.name && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          className="block text-sm text-gray-300 hover:text-white transition-colors"
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
              ))}
              
              <div className="pt-4 border-t border-gray-700 space-y-2">
                <Link 
                  to="/login" 
                  className="block text-white border border-white px-4 py-2 rounded-lg text-center hover:bg-white hover:text-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Signup
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 