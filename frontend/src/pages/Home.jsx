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
  FiUpload
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
            <FiZap className="hero-badge-icon" />
            <span>Fast & Secure Compression</span>
          </div>
          <h1>Transform Your Files with FlixConvert</h1>
          <p>
            Professional-grade compression tools that reduce file sizes by up to 80% while maintaining quality. 
            Fast, secure, and completely free.
          </p>
          <div className="hero-actions">
            <Link to="/tools" className="btn btn-primary btn-lg">
              <FiUpload className="btn-icon" />
              Start Compressing
            </Link>
            <Link to="/signup" className="btn btn-secondary btn-lg">
              <FiCheckCircle className="btn-icon" />
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose FlixConvert?</h2>
            <p>Advanced compression algorithms designed for the modern web</p>
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
              <ul className="tool-features">
                <li>Batch processing</li>
                <li>Quality control</li>
                <li>Format conversion</li>
              </ul>
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
              <ul className="tool-features">
                <li>Multiple codecs</li>
                <li>Resolution scaling</li>
                <li>Bitrate optimization</li>
              </ul>
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
              <ul className="tool-features">
                <li>Multiple formats</li>
                <li>Bitrate control</li>
                <li>Quality preservation</li>
              </ul>
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
              <ul className="tool-features">
                <li>Text optimization</li>
                <li>Image compression</li>
                <li>Metadata removal</li>
              </ul>
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
              <Link to="/signup" className="btn btn-ghost btn-lg">
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