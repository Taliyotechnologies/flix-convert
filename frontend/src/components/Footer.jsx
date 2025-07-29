import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <Helmet>
        <title>ConvertFlix - About Us & Contact</title>
      </Helmet>
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-section">
              <h4>🎬 ConvertFlix</h4>
              <p>
                The ultimate file compression and conversion tool. Compress images, videos, 
                audio files, and PDFs with instant results and 40% size reduction.
              </p>
              <div className="social-links">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FiGithub size={20} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <FiTwitter size={20} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FiLinkedin size={20} />
                </a>
                <a href="mailto:contact@flixconvert.com" aria-label="Email">
                  <FiMail size={20} />
                </a>
              </div>
            </div>

            <div className="footer-section">
              <h4>Tools</h4>
              <Link to="/compress/image">Compress Images</Link>
              <Link to="/compress/video">Compress Videos</Link>
              <Link to="/compress/audio">Compress Audio</Link>
              <Link to="/compress/pdf">Compress PDFs</Link>
              <Link to="/tools">All Tools</Link>
            </div>

            <div className="footer-section">
              <h4>Company</h4>
              <Link to="/about">About Us</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/contact">Contact</Link>
            </div>

            <div className="footer-section">
              <h4>Support</h4>
              <Link to="/help">Help Center</Link>
              <Link to="/faq">FAQ</Link>
              <Link to="/api">API Documentation</Link>
              <a href="mailto:support@flixconvert.com">Email Support</a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              © {currentYear} ConvertFlix. All rights reserved. 
              Built with ❤️ by Taliyo Technologies.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--bg-tertiary);
          color: var(--text-secondary);
          transition: all 0.2s ease;
        }

        .social-links a:hover {
          background-color: var(--accent-primary);
          color: white;
          transform: translateY(-2px);
        }
      `}</style>
    </>
  )
}

export default Footer