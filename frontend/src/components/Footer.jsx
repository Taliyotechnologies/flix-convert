import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../App';
import './Footer.css';

const footerLinks = {
  services: {
    title: "Services",
    links: [
      { label: "Image Compression", to: "/compress/image" },
      { label: "Video Compression", to: "/compress/video" },
      { label: "Audio Compression", to: "/compress/audio" },
      { label: "PDF Compression", to: "/compress/pdf" },
      { label: "Image Converter", to: "/convert/image" },
      { label: "Video Converter", to: "/convert/video" },
      { label: "Audio Converter", to: "/convert/audio" },
      { label: "PDF Converter", to: "/convert/pdf" }
    ]
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Owner", to: "/owner" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" }
    ]
  },
  support: {
    title: "Support",
    links: [
      { label: "Help Center", to: "/help" },
      { label: "FAQ", to: "/faq" },
      { label: "Contact Support", to: "/contact" },
      { label: "Status", to: "/status" }
    ]
  }
};

const socialLinks = [
  {
    name: "Twitter",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
      </svg>
    ),
    url: "https://twitter.com/taliyotechnologies"
  },
  {
    name: "LinkedIn",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" fill="currentColor"/>
      </svg>
    ),
    url: "https://linkedin.com/company/taliyotechnologies"
  },
  {
    name: "GitHub",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" fill="currentColor"/>
      </svg>
    ),
    url: "https://github.com/Taliyotechnologies"
  },
  {
    name: "Email",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" fill="currentColor"/>
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" fill="currentColor"/>
      </svg>
    ),
    url: "mailto:contact@taliyotechnologies.com"
  }
];

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`footer-glass ${theme}`}>
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="2" y="2" width="28" height="28" rx="8" fill="#3B82F6" stroke="#2CB67D" strokeWidth="2"/>
                <rect x="8" y="8" width="16" height="16" rx="4" fill="#ffffff"/>
                <path d="M12 16h8M16 12v8" stroke="#7F5AF0" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="24" cy="8" r="3" fill="#2CB67D"/>
                <path d="M22 6l2 2 2-2" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>ConvertFlix</span>
            </Link>
            <p className="footer-description">
              Professional file conversion and compression tools. Transform your files with lightning speed and exceptional quality.
            </p>
            <div className="footer-social">
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
            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key} className="footer-section">
                <h3>{section.title}</h3>
                <ul>
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <Link to={link.to}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2024 ConvertFlix. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/cookies">Cookies</Link>
            </div>
          </div>
          <div className="made-by">
            <span>Made with ❤️ by </span>
            <a 
              href="https://taliyotechnologies.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="taliyo-link"
            >
              Taliyo Technologies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 