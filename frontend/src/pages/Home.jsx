import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  FiImage, 
  FiVideo, 
  FiMusic, 
  FiFileText, 
  FiZap, 
  FiShield, 
  FiSmartphone, 
  FiAward,
  FiArrowRight,
  FiCheckCircle,
  FiDownload,
  FiUpload,
  FiStar,
  FiUsers,
  FiClock,
  FiActivity,
  FiLock,
  FiGlobe
} from 'react-icons/fi'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>FlixConvert - File Compression & Conversion Tool</title>
        <meta name="description" content="Compress and convert any file type with instant compression and 40% size reduction. Free online file compression tool." />
      </Helmet>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <FiStar className="hero-badge-icon" />
            <span>Trusted by 10M+ Users</span>
          </div>
          <h1>Compress Files Instantly</h1>
          <p>
            Professional file compression tools that reduce your file sizes by up to 80% 
            while maintaining quality. Fast, secure, and completely free.
          </p>
          <div className="hero-actions">
            <Link to="/tools" className="btn btn-primary btn-lg">
              <FiUpload className="btn-icon" />
              Start Compressing
            </Link>
            <Link to="/signup" className="btn btn-outline btn-lg">
              <FiUsers className="btn-icon" />
              Create Account
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <FiZap className="stat-icon" />
              <span>Lightning Fast</span>
            </div>
            <div className="stat-item">
              <FiShield className="stat-icon" />
              <span>100% Secure</span>
            </div>
            <div className="stat-item">
              <FiClock className="stat-icon" />
              <span>24/7 Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose FlixConvert?</h2>
            <p>Advanced compression technology designed for modern needs</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FiZap />
              </div>
              <h3>Lightning Fast</h3>
              <p>Process files in seconds with our optimized compression algorithms</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FiShield />
              </div>
              <h3>Secure & Private</h3>
              <p>Your files are processed locally and automatically deleted after processing</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FiSmartphone />
              </div>
              <h3>Cross Platform</h3>
              <p>Works seamlessly on desktop, tablet, and mobile devices</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FiAward />
              </div>
              <h3>Quality Preserved</h3>
              <p>Maintain visual and audio quality while reducing file size</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="tools-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Compression Tools</h2>
            <p>Specialized tools for every file type</p>
          </div>
          
          <div className="tools-grid">
            <div className="tool-card">
              <div className="tool-icon">
                <FiImage />
              </div>
              <h3>Image Compression</h3>
              <p>Optimize JPEG, PNG, WebP, and more. Reduce file size by up to 70% while maintaining visual quality.</p>
              <div className="tool-features">
                <span className="feature-tag">Batch processing</span>
                <span className="feature-tag">Quality control</span>
                <span className="feature-tag">Format conversion</span>
              </div>
              <Link to="/compress-image" className="btn btn-primary">
                Compress Images
                <FiArrowRight className="btn-icon" />
              </Link>
            </div>

            <div className="tool-card">
              <div className="tool-icon">
                <FiVideo />
              </div>
              <h3>Video Compression</h3>
              <p>Compress MP4, AVI, MOV, and other video formats. Reduce size by up to 80% with advanced codecs.</p>
              <div className="tool-features">
                <span className="feature-tag">Multiple codecs</span>
                <span className="feature-tag">Resolution scaling</span>
                <span className="feature-tag">Bitrate optimization</span>
              </div>
              <Link to="/compress-video" className="btn btn-primary">
                Compress Videos
                <FiArrowRight className="btn-icon" />
              </Link>
            </div>

            <div className="tool-card">
              <div className="tool-icon">
                <FiMusic />
              </div>
              <h3>Audio Compression</h3>
              <p>Optimize MP3, WAV, FLAC, and more. Reduce audio file size without losing quality.</p>
              <div className="tool-features">
                <span className="feature-tag">Multiple formats</span>
                <span className="feature-tag">Bitrate control</span>
                <span className="feature-tag">Quality preservation</span>
              </div>
              <Link to="/compress-audio" className="btn btn-primary">
                Compress Audio
                <FiArrowRight className="btn-icon" />
              </Link>
            </div>

            <div className="tool-card">
              <div className="tool-icon">
                <FiFileText />
              </div>
              <h3>PDF Compression</h3>
              <p>Compress PDF documents while preserving text quality and image resolution.</p>
              <div className="tool-features">
                <span className="feature-tag">Text optimization</span>
                <span className="feature-tag">Image compression</span>
                <span className="feature-tag">Metadata removal</span>
              </div>
              <Link to="/compress-pdf" className="btn btn-primary">
                Compress PDFs
                <FiArrowRight className="btn-icon" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">
                <FiDownload />
              </div>
              <div className="stat-number">10M+</div>
              <div className="stat-label">Files Processed</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <FiZap />
              </div>
              <div className="stat-number">80%</div>
              <div className="stat-label">Average Size Reduction</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <FiFileText />
              </div>
              <div className="stat-number">50+</div>
              <div className="stat-label">Supported Formats</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <FiShield />
              </div>
              <div className="stat-number">24/7</div>
              <div className="stat-label">Service Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Compressing?</h2>
            <p>Join thousands of users who trust FlixConvert for their file compression needs</p>
            <div className="cta-actions">
              <Link to="/tools" className="btn btn-primary btn-lg">
                <FiUpload className="btn-icon" />
                Try It Free
              </Link>
              <Link to="/signup" className="btn btn-outline btn-lg">
                <FiCheckCircle className="btn-icon" />
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home