import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FiImage, FiVideo, FiMusic, FiFileText, FiArrowRight } from 'react-icons/fi'

const Tools = () => {
  const tools = [
    {
      icon: <FiImage />,
      title: 'Compress Images',
      description: 'Reduce image file size while maintaining quality. Support for JPG, PNG, GIF, WebP and more.',
      path: '/compress-image',
      color: '#3b82f6',
      features: ['JPG, PNG, GIF, WebP', 'Up to 40% reduction', 'Instant processing', 'Quality preservation']
    },
    {
      icon: <FiVideo />,
      title: 'Compress Videos',
      description: 'Compress video files with advanced algorithms. Support for MP4, AVI, MOV, WebM and more.',
      path: '/compress-video',
      color: '#ef4444',
      features: ['MP4, AVI, MOV, WebM', 'H.264/H.265 codec', 'Fast compression', 'Quality maintained']
    },
    {
      icon: <FiMusic />,
      title: 'Compress Audio',
      description: 'Reduce audio file size without losing quality. Support for MP3, WAV, AAC, FLAC and more.',
      path: '/compress-audio',
      color: '#10b981',
      features: ['MP3, WAV, AAC, FLAC', 'AAC optimization', 'Instant results', 'High quality output']
    },
    {
      icon: <FiFileText />,
      title: 'Compress PDFs',
      description: 'Compress PDF documents while preserving text quality and readability.',
      path: '/compress-pdf',
      color: '#f59e0b',
      features: ['All PDF formats', 'Text preservation', 'Image optimization', 'Fast processing']
    }
  ]

  return (
    <>
      <Helmet>
        <title>All Tools - ConvertFlix</title>
        <meta name="description" content="All file compression tools from ConvertFlix. Compress images, videos, audio files, and PDFs with instant results." />
        <meta property="og:title" content="All Tools - ConvertFlix" />
        <meta property="og:description" content="All file compression tools from ConvertFlix. Compress images, videos, audio files, and PDFs with instant results." />
        <meta property="twitter:title" content="All Tools - ConvertFlix" />
        <meta property="twitter:description" content="All file compression tools from ConvertFlix. Compress images, videos, audio files, and PDFs with instant results." />
      </Helmet>

      <div className="container">
        <div className="page-header">
          <h1>All Compression Tools</h1>
          <p>
            Choose the right tool for your file type and get instant compression results. 
            All tools are free to use and support files up to 10MB.
          </p>
        </div>

        <div className="tools-grid">
          {tools.map((tool, index) => (
            <div key={index} className="tool-card">
              <div className="tool-icon" style={{ background: tool.color }}>
                {tool.icon}
              </div>
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
              
              <div className="tool-features">
                {tool.features.map((feature, featureIndex) => (
                  <span key={featureIndex} className="feature-tag">
                    {feature}
                  </span>
                ))}
              </div>
              
              <Link to={tool.path} className="btn btn-primary">
                Start Compressing
                <FiArrowRight />
              </Link>
            </div>
          ))}
        </div>

        <div className="tools-info">
          <div className="info-section">
            <h2>Why Choose Our Tools?</h2>
            <div className="features-grid">
              <div className="feature-item">
                <h3>🚀 Instant Processing</h3>
                <p>Get compressed files instantly with our optimized algorithms.</p>
              </div>
              <div className="feature-item">
                <h3>🔒 Secure & Private</h3>
                <p>Your files are automatically deleted after 24 hours for your privacy.</p>
              </div>
              <div className="feature-item">
                <h3>📉 40% Size Reduction</h3>
                <p>Achieve up to 40% file size reduction while maintaining quality.</p>
              </div>
              <div className="feature-item">
                <h3>💯 Free Forever</h3>
                <p>All tools are completely free to use with no registration required.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .page-header h1 {
          margin-bottom: 1rem;
        }

        .page-header p {
          color: var(--text-secondary);
          font-size: 1.125rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .tool-features {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: 1.5rem 0;
        }

        .feature-tag {
          background-color: var(--bg-secondary);
          color: var(--text-secondary);
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .tools-info {
          margin-top: 4rem;
        }

        .info-section {
          text-align: center;
        }

        .info-section h2 {
          margin-bottom: 3rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .feature-item {
          text-align: center;
          padding: 2rem;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .feature-item h3 {
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .feature-item p {
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr;
          }

          .tool-features {
            justify-content: center;
          }
        }
      `}</style>
    </>
  )
}

export default Tools