import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    tools: [
      { name: 'Compress Image', path: '/tools/compress-image' },
      { name: 'Convert Image', path: '/tools/convert-image' },
      { name: 'Compress Video', path: '/tools/compress-video' },
      { name: 'Convert Video', path: '/tools/convert-video' },
      { name: 'Compress Audio', path: '/tools/compress-audio' },
      { name: 'Convert Audio', path: '/tools/convert-audio' },
      { name: 'Convert PDF', path: '/tools/convert-pdf' }
    ],
    company: [
      { name: 'About Us', path: '/company' },
      { name: 'Contact', path: '/company' },
      { name: 'Careers', path: '/company' },
      { name: 'Blog', path: '/company' }
    ],
    support: [
      { name: 'Help Center', path: '/company' },
      { name: 'Privacy Policy', path: '/company' },
      { name: 'Terms of Service', path: '/company' },
      { name: 'Cookie Policy', path: '/company' }
    ]
  };

  const socialLinks = [
    { name: 'GitHub', icon: <Github size={20} />, url: 'https://github.com' },
    { name: 'Twitter', icon: <Twitter size={20} />, url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, url: 'https://linkedin.com' },
    { name: 'Email', icon: <Mail size={20} />, url: 'mailto:contact@flixconvert.com' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Main Footer Section */}
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="logo-text">FlixConvert</span>
              </div>
              <p className="footer-description">
                Free online file utility platform. Compress and convert images, videos, 
                audio, and PDFs instantly. Up to 10MB free, no registration required.
              </p>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-links">
              <div className="footer-section">
                <h3>Tools</h3>
                <ul>
                  {footerLinks.tools.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-section">
                <h3>Company</h3>
                <ul>
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-section">
                <h3>Support</h3>
                <ul>
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="copyright">
                © {currentYear} FlixConvert. Made with <Heart size={14} /> for the community.
              </p>
              <div className="footer-bottom-links">
                <Link to="/privacy">Privacy</Link>
                <Link to="/terms">Terms</Link>
                <Link to="/cookies">Cookies</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 