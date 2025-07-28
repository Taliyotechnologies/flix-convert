import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Image, Video, Music, FileImage, Download, Zap, Shield, Clock } from 'lucide-react';
import './Home.css';

const Home: React.FC = () => {
  const tools = [
    {
      id: 'compress-image',
      title: 'Compress Image',
      description: 'Reduce image file size while maintaining quality',
      icon: <Image size={24} />,
      color: '#FF6B6B',
      path: '/tools/compress-image'
    },
    {
      id: 'convert-image',
      title: 'Convert Image',
      description: 'Convert between JPG, PNG, WebP, and more',
      icon: <FileImage size={24} />,
      color: '#4ECDC4',
      path: '/tools/convert-image'
    },
    {
      id: 'compress-video',
      title: 'Compress Video',
      description: 'Reduce video file size with high quality',
      icon: <Video size={24} />,
      color: '#45B7D1',
      path: '/tools/compress-video'
    },
    {
      id: 'convert-video',
      title: 'Convert Video',
      description: 'Convert between MP4, AVI, MOV, and more',
      icon: <Video size={24} />,
      color: '#96CEB4',
      path: '/tools/convert-video'
    },
    {
      id: 'compress-audio',
      title: 'Compress Audio',
      description: 'Reduce audio file size without quality loss',
      icon: <Music size={24} />,
      color: '#FFEAA7',
      path: '/tools/compress-audio'
    },
    {
      id: 'convert-audio',
      title: 'Convert Audio',
      description: 'Convert between MP3, WAV, FLAC, and more',
      icon: <Music size={24} />,
      color: '#DDA0DD',
      path: '/tools/convert-audio'
    },
    {
      id: 'convert-pdf',
      title: 'Convert PDF',
      description: 'Convert PDF to Word, Excel, or images',
      icon: <FileText size={24} />,
      color: '#FF8A80',
      path: '/tools/convert-pdf'
    }
  ];

  const features = [
    {
      icon: <Zap size={24} />,
      title: 'Lightning Fast',
      description: 'Process files in seconds with our optimized algorithms'
    },
    {
      icon: <Shield size={24} />,
      title: 'Secure & Private',
      description: 'Your files are processed locally and never stored'
    },
    {
      icon: <Clock size={24} />,
      title: 'Always Available',
      description: '24/7 service with no registration required'
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
                Compress & Convert Files
                <span className="hero-highlight"> Instantly</span>
              </h1>
              <p className="hero-subtitle">
                Free online file utility platform. Compress images, videos, audio, and convert between formats. 
                Up to 10MB free, no registration required.
              </p>
              <div className="hero-actions">
                <Link to="/tools" className="btn btn-primary btn-large">
                  Try Tools
                  <ArrowRight size={20} />
                </Link>
                <Link to="/company" className="btn btn-ghost btn-large">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-illustration">
                <div className="file-stack">
                  <div className="file-card" style={{ transform: 'rotate(-5deg) translateY(-10px)' }}>
                    <Image size={32} />
                    <span>Image</span>
                  </div>
                  <div className="file-card" style={{ transform: 'rotate(2deg) translateY(-5px)' }}>
                    <Video size={32} />
                    <span>Video</span>
                  </div>
                  <div className="file-card" style={{ transform: 'rotate(-3deg) translateY(0px)' }}>
                    <Music size={32} />
                    <span>Audio</span>
                  </div>
                </div>
                <div className="conversion-arrow">
                  <ArrowRight size={24} />
                </div>
                <div className="compressed-files">
                  <div className="compressed-file">
                    <Download size={20} />
                    <span>Compressed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Overview Section */}
      <section className="tools-section">
        <div className="container">
          <div className="section-header">
            <h2>Powerful File Tools</h2>
            <p>Everything you need to compress and convert your files</p>
          </div>
          <div className="tools-grid">
            {tools.map((tool) => (
              <Link key={tool.id} to={tool.path} className="tool-card">
                <div className="tool-icon" style={{ backgroundColor: tool.color }}>
                  {tool.icon}
                </div>
                <div className="tool-content">
                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                </div>
                <ArrowRight size={20} className="tool-arrow" />
              </Link>
            ))}
          </div>
          <div className="tools-cta">
            <Link to="/tools" className="btn btn-primary btn-large">
              View All Tools
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose FlixConvert?</h2>
            <p>Built for speed, security, and simplicity</p>
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of users who trust FlixConvert for their file processing needs</p>
            <div className="cta-actions">
              <Link to="/tools" className="btn btn-primary btn-large">
                Start Converting
                <ArrowRight size={20} />
              </Link>
              <Link to="/company" className="btn btn-ghost btn-large">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 