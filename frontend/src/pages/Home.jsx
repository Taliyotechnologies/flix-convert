import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  FiZap, 
  FiShield, 
  FiSmartphone, 
  FiCheckCircle, 
  FiFileText,
  FiImage,
  FiVideo,
  FiMusic,
  FiFile
} from 'react-icons/fi'
import './Home.css'

const Home = () => {
  const features = [
    {
      icon: <FiZap />,
      title: 'Lightning Fast',
      description: 'Compress and convert files in seconds with our optimized processing engine.'
    },
    {
      icon: <FiShield />,
      title: 'Secure & Private',
      description: 'Your files are automatically deleted after 24 hours. No data is stored permanently.'
    },
    {
      icon: <FiSmartphone />,
      title: 'Cross Platform',
      description: 'Works seamlessly on all devices - desktop, tablet, and mobile.'
    },
    {
      icon: <FiCheckCircle />,
      title: 'Quality Preserved',
      description: 'Advanced algorithms ensure no quality loss during compression.'
    },
    {
      icon: <FiFileText />,
      title: 'Multi-Format',
      description: 'Support for images, videos, audio, and PDF files with multiple formats.'
    }
  ]

  const supportedFormats = [
    {
      icon: <FiImage />,
      title: 'Images',
      formats: ['JPEG', 'PNG', 'WebP', 'GIF', 'BMP'],
      description: 'Compress and convert between popular image formats'
    },
    {
      icon: <FiVideo />,
      title: 'Videos',
      formats: ['MP4', 'AVI', 'MOV', 'WMV', 'WebM', 'MKV'],
      description: 'Reduce video file sizes while maintaining quality'
    },
    {
      icon: <FiMusic />,
      title: 'Audio',
      formats: ['MP3', 'WAV', 'FLAC', 'AAC', 'OGG', 'M4A'],
      description: 'Convert and compress audio files efficiently'
    },
    {
      icon: <FiFile />,
      title: 'PDFs',
      formats: ['PDF'],
      description: 'Optimize PDF files for smaller sizes'
    }
  ]

  return (
    <>
      <Helmet>
        <title>ConvertFlix - Compress & Convert Any File Instantly</title>
        <meta name="description" content="ConvertFlix allows you to upload and compress/convert image, video, audio, and PDF files up to 10MB for free with instant results and no quality loss." />
        <meta property="og:title" content="ConvertFlix - Compress & Convert Any File Instantly" />
        <meta property="og:description" content="Free online file compression and conversion tools. Compress images, videos, audio, and PDFs up to 10MB with no quality loss." />
      </Helmet>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Compress & Convert Any File — Instantly. Free Up to 10MB.
              </h1>
              <p className="hero-subtitle">
                Transform your files with our powerful compression and conversion tools. 
                No registration required, no quality loss, and files are automatically deleted after 24 hours.
              </p>
              <div className="hero-actions">
                <Link to="/tools" className="btn btn-primary btn-lg">
                  Try Tools
                </Link>
                <Link to="/company" className="btn btn-outline btn-lg">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-illustration">
                <div className="file-stack">
                  <div className="file-item file-image">
                    <FiImage />
                  </div>
                  <div className="file-item file-video">
                    <FiVideo />
                  </div>
                  <div className="file-item file-audio">
                    <FiMusic />
                  </div>
                  <div className="file-item file-pdf">
                    <FiFile />
                  </div>
                </div>
                <div className="processing-animation">
                  <div className="arrow"></div>
                  <div className="compressed-file">
                    <FiCheckCircle />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose ConvertFlix?</h2>
            <p className="section-subtitle">
              Experience the best file compression and conversion tools with unmatched speed and security.
            </p>
          </div>
          
          <div className="grid grid-cols-1 grid-cols-2 grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="feature-card animate-fade-in">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Formats Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Supported File Formats</h2>
            <p className="section-subtitle">
              We support a wide range of file formats for compression and conversion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 grid-cols-2 grid-cols-4">
            {supportedFormats.map((format, index) => (
              <div key={index} className="format-card card animate-fade-in">
                <div className="format-icon">
                  {format.icon}
                </div>
                <h3 className="format-title">{format.title}</h3>
                <p className="format-description">{format.description}</p>
                <div className="format-list">
                  {format.formats.map((fmt, fmtIndex) => (
                    <span key={fmtIndex} className="format-badge">
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-subtitle">
              Join thousands of users who trust ConvertFlix for their file compression and conversion needs.
            </p>
            <div className="cta-actions">
              <Link to="/tools" className="btn btn-primary btn-lg">
                Start Converting Now
              </Link>
              <Link to="/signup" className="btn btn-outline btn-lg">
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