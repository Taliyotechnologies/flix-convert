import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FiImage, FiVideo, FiMusic, FiFileText, FiZap, FiShield, FiClock, FiDownload } from 'react-icons/fi'

const Home = () => {
  const tools = [
    {
      icon: <FiImage />,
      title: 'Compress Images',
      description: 'Reduce image file size while maintaining quality. Support for JPG, PNG, GIF, WebP and more.',
      path: '/compress/image',
      color: '#3b82f6'
    },
    {
      icon: <FiVideo />,
      title: 'Compress Videos',
      description: 'Compress video files with advanced algorithms. Support for MP4, AVI, MOV, WebM and more.',
      path: '/compress/video',
      color: '#ef4444'
    },
    {
      icon: <FiMusic />,
      title: 'Compress Audio',
      description: 'Reduce audio file size without losing quality. Support for MP3, WAV, AAC, FLAC and more.',
      path: '/compress/audio',
      color: '#10b981'
    },
    {
      icon: <FiFileText />,
      title: 'Compress PDFs',
      description: 'Compress PDF documents while preserving text quality and readability.',
      path: '/compress/pdf',
      color: '#f59e0b'
    }
  ]

  const features = [
    {
      icon: <FiZap />,
      title: 'Instant Compression',
      description: 'Get compressed files instantly with our optimized algorithms.'
    },
    {
      icon: <FiShield />,
      title: 'Secure & Private',
      description: 'Your files are automatically deleted after 24 hours for your privacy.'
    },
    {
      icon: <FiClock />,
      title: '40% Size Reduction',
      description: 'Achieve up to 40% file size reduction while maintaining quality.'
    },
    {
      icon: <FiDownload />,
      title: 'Free Downloads',
      description: 'Download compressed files immediately after processing.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>ConvertFlix - File Compression & Conversion Tool</title>
        <meta name="description" content="Compress and convert any file type (Image, Video, Audio, PDF) with instant compression and 40% size reduction. Free online file compression tool." />
        <meta property="og:title" content="ConvertFlix - File Compression & Conversion Tool" />
        <meta property="og:description" content="Compress and convert any file type with instant compression and 40% size reduction. Free online file compression tool." />
        <meta property="twitter:title" content="ConvertFlix - File Compression & Conversion Tool" />
        <meta property="twitter:description" content="Compress and convert any file type with instant compression and 40% size reduction. Free online file compression tool." />
      </Helmet>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Compress Files Instantly</h1>
          <p>
            Reduce file sizes by up to 40% with our advanced compression algorithms. 
            Support for images, videos, audio files, and PDFs. Fast, secure, and completely free.
          </p>
          <div className="hero-actions">
            <Link to="/tools" className="btn btn-primary">
              Start Compressing
            </Link>
            <Link to="/compress/image" className="btn btn-secondary">
              Try Image Compression
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="container">
        <div className="section-header">
          <h2>Our Compression Tools</h2>
          <p>Choose the right tool for your file type and get instant compression results.</p>
        </div>
        
        <div className="tools-grid">
          {tools.map((tool, index) => (
            <div key={index} className="tool-card">
              <div className="tool-icon" style={{ background: tool.color }}>
                {tool.icon}
              </div>
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
              <Link to={tool.path} className="btn btn-primary">
                Compress Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container">
        <div className="section-header">
          <h2>Why Choose ConvertFlix?</h2>
          <p>We provide the best compression experience with advanced features.</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Compress Your Files?</h2>
            <p>Join thousands of users who trust ConvertFlix for their file compression needs.</p>
            <Link to="/tools" className="btn btn-primary">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-header h2 {
          margin-bottom: 1rem;
        }

        .section-header p {
          color: var(--text-secondary);
          font-size: 1.125rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .feature-card {
          text-align: center;
          padding: 2rem;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .feature-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 1.5rem;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 2rem;
        }

        .feature-card h3 {
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .feature-card p {
          color: var(--text-secondary);
        }

        .cta-section {
          background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
          padding: 4rem 0;
          margin-top: 4rem;
        }

        .cta-content {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-content h2 {
          margin-bottom: 1rem;
        }

        .cta-content p {
          margin-bottom: 2rem;
          color: var(--text-secondary);
          font-size: 1.125rem;
        }

        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr;
          }

          .cta-content {
            padding: 0 1rem;
          }
        }
      `}</style>
    </>
  )
}

export default Home