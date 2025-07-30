import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Shield, 
  Smartphone, 
  Award, 
  FileText,
  ArrowRight,
  Play
} from 'lucide-react';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Compress files in seconds with our optimized algorithms',
      color: '#f59e0b'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Files are auto-deleted after 24 hours for your privacy',
      color: '#10b981'
    },
    {
      icon: Smartphone,
      title: 'Cross Platform',
      description: 'Works seamlessly on desktop, tablet, and mobile devices',
      color: '#3b82f6'
    },
    {
      icon: Award,
      title: 'Quality Preserved',
      description: 'Maintain original quality while reducing file size',
      color: '#8b5cf6'
    },
    {
      icon: FileText,
      title: 'Multi-Format',
      description: 'Support for images, videos, audio, and PDF files',
      color: '#ef4444'
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
                Compress & Convert Any File — 
                <span className="highlight"> Instantly. Free Up to 10MB.</span>
              </h1>
              <p className="hero-subtitle">
                Transform your files with our powerful compression and conversion tools. 
                No registration required, no quality loss, and files are automatically 
                deleted after 24 hours for your privacy.
              </p>
              <div className="hero-buttons">
                <Link to="/tools" className="btn btn-primary btn-large">
                  Try Tools
                  <ArrowRight size={20} />
                </Link>
                <button className="btn btn-outline btn-large">
                  <Play size={20} />
                  Learn More
                </button>
              </div>
            </div>
            <div className="hero-visual">
              <div className="file-processing-animation">
                <div className="file-icon">
                  <FileText size={48} />
                </div>
                <div className="processing-arrow">
                  <ArrowRight size={24} />
                </div>
                <div className="compressed-file-icon">
                  <FileText size={32} />
                  <div className="compression-badge">-60%</div>
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
            <p>Experience the best file compression and conversion platform</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon" style={{ backgroundColor: `${feature.color}20` }}>
                  <feature.icon size={32} style={{ color: feature.color }} />
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
              <div className="stat-number">50TB+</div>
              <div className="stat-label">Storage Saved</div>
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
            <p>Join thousands of users who trust ConvertFlix for their file compression needs</p>
            <div className="cta-buttons">
              <Link to="/tools" className="btn btn-primary btn-large">
                Start Compressing
                <ArrowRight size={20} />
              </Link>
              <Link to="/signup" className="btn btn-outline btn-large">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 