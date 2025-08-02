import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import './Home.css'

const Home = () => {
  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Process files in seconds with our optimized algorithms'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your files are encrypted and automatically deleted'
    },
    {
      icon: '🌐',
      title: 'Cross Platform',
      description: 'Works on any device with a modern web browser'
    },
    {
      icon: '🎯',
      title: 'Quality Preserved',
      description: 'Maintain original quality while reducing file size'
    },
    {
      icon: '📁',
      title: 'Multi-format Support',
      description: 'Support for images, audio, video, and documents'
    },
    {
      icon: '💾',
      title: 'Free Up to 10MB',
      description: 'No registration required for files under 10MB'
    }
  ]

  return (
    <>
      <Helmet>
        <title>ConvertFlix - Free File Compression & Conversion Tool</title>
        <meta name="description" content="Compress and convert files instantly with ConvertFlix. Free up to 10MB. Fast, secure, and cross-platform file compression and conversion tools." />
      </Helmet>

      <div className="home">
        {/* Hero Section */}
        <section className="hero">
          <div className="container hero-container">
            <div className="hero-content">
              <h1 className="hero-title">
                Compress & Convert Files Instantly
                <span className="hero-subtitle">— Free Up to 10MB</span>
              </h1>
              <p className="hero-description">
                Fast, secure & cross-platform compression and conversion tools. 
                Process your files in seconds with our optimized algorithms.
              </p>
              <div className="hero-buttons">
                <Link to="/tools" className="btn btn-primary">
                  Try Tools
                </Link>
                <Link to="/company" className="btn btn-secondary">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hero-illustration">
              <div className="file-stack">
                <div className="file file-1">📄</div>
                <div className="file file-2">🖼️</div>
                <div className="file file-3">🎵</div>
                <div className="file file-4">🎬</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <div className="container">
            <h2 className="section-title">Why Choose ConvertFlix?</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Get Started?</h2>
              <p>Join thousands of users who trust ConvertFlix for their file processing needs.</p>
              <Link to="/tools" className="btn btn-primary">
                Explore Tools
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home 