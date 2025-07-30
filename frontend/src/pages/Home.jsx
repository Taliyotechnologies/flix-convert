import { Link } from 'react-router-dom';
import { Zap, Shield, Globe, Award, FileText, Download } from 'lucide-react';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <Zap size={32} />,
      title: 'Lightning Fast',
      description: 'Process files in seconds with our optimized algorithms'
    },
    {
      icon: <Shield size={32} />,
      title: 'Secure & Private',
      description: 'Your files are encrypted and automatically deleted'
    },
    {
      icon: <Globe size={32} />,
      title: 'Cross Platform',
      description: 'Works on any device, browser, or operating system'
    },
    {
      icon: <Award size={32} />,
      title: 'Quality Preserved',
      description: 'Maintain original quality while reducing file size'
    },
    {
      icon: <FileText size={32} />,
      title: 'Multi-format Support',
      description: 'Support for images, videos, audio, and documents'
    },
    {
      icon: <Download size={32} />,
      title: 'Instant Download',
      description: 'Get your processed files immediately after conversion'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Compress & Convert Files Instantly — Free Up to 10MB
              </h1>
              <p className="hero-subtitle">
                Fast, secure & cross-platform compression and conversion tools. 
                Reduce file sizes without losing quality, convert between formats, 
                and optimize your digital content.
              </p>
              <div className="hero-buttons">
                <Link to="/tools" className="btn btn-primary btn-large">
                  Try Tools
                </Link>
                <Link to="/learn-more" className="btn btn-secondary btn-large">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hero-illustration">
              <div className="file-stack">
                <div className="file file-1">
                  <div className="file-icon">📄</div>
                  <div className="file-label">Original</div>
                </div>
                <div className="file file-2">
                  <div className="file-icon">⚡</div>
                  <div className="file-label">Processing</div>
                </div>
                <div className="file file-3">
                  <div className="file-icon">📦</div>
                  <div className="file-label">Compressed</div>
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
            <h2>Why Choose ConvertFlix?</h2>
            <p>Professional-grade tools with enterprise-level security</p>
          </div>
          <div className="grid grid-3">
            {features.map((feature, index) => (
              <div key={index} className="feature-card card fade-in">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">1M+</div>
              <div className="stat-label">Files Processed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">File Formats</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of users who trust ConvertFlix for their file processing needs</p>
            <Link to="/tools" className="btn btn-primary btn-large">
              Start Converting Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 