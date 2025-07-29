import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  FiGithub, 
  FiTwitter, 
  FiLinkedin, 
  FiMail, 
  FiImage, 
  FiVideo, 
  FiMusic, 
  FiFileText,
  FiHeart,
  FiZap
} from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <Helmet>
        <title>FlixConvert - About Us & Contact</title>
      </Helmet>
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-section">
              <div className="footer-brand">
                <FiZap className="footer-logo" />
                <h4>FlixConvert</h4>
              </div>
              <p>
                Professional file compression and conversion tools. Compress images, videos, 
                audio files, and PDFs with instant results and up to 80% size reduction.
              </p>
              <div className="social-links">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FiGithub />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <FiTwitter />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FiLinkedin />
                </a>
                <a href="mailto:contact@flixconvert.com" aria-label="Email">
                  <FiMail />
                </a>
              </div>
            </div>

            <div className="footer-section">
              <h4>Compression Tools</h4>
              <div className="footer-links">
                <Link to="/compress-image">
                  <FiImage className="link-icon" />
                  Compress Images
                </Link>
                <Link to="/compress-video">
                  <FiVideo className="link-icon" />
                  Compress Videos
                </Link>
                <Link to="/compress-audio">
                  <FiMusic className="link-icon" />
                  Compress Audio
                </Link>
                <Link to="/compress-pdf">
                  <FiFileText className="link-icon" />
                  Compress PDFs
                </Link>
                <Link to="/tools">All Tools</Link>
              </div>
            </div>

            <div className="footer-section">
              <h4>Company</h4>
              <div className="footer-links">
                <Link to="/about">About Us</Link>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/careers">Careers</Link>
              </div>
            </div>

            <div className="footer-section">
              <h4>Support</h4>
              <div className="footer-links">
                <Link to="/help">Help Center</Link>
                <Link to="/faq">FAQ</Link>
                <Link to="/api">API Documentation</Link>
                <a href="mailto:support@flixconvert.com">Email Support</a>
                <Link to="/status">Service Status</Link>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p>
                © {currentYear} FlixConvert. All rights reserved.
              </p>
              <p className="footer-built">
                Built with <FiHeart className="heart-icon" /> by Taliyo Technologies
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer