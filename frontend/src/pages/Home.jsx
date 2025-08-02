import { Link } from 'react-router-dom';
import { 
  FileText, 
  Image, 
  Video, 
  Music, 
  Download, 
  Zap, 
  Shield, 
  Clock,
  ArrowRight
} from 'lucide-react';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: Image,
      title: 'Image Compression',
      description: 'Compress JPEG, PNG, WebP images with up to 80% size reduction while maintaining quality.',
      path: '/tool/compress-image'
    },
    {
      icon: Video,
      title: 'Video Compression',
      description: 'Reduce video file sizes significantly with advanced H.264 compression algorithms.',
      path: '/tool/compress-video'
    },
    {
      icon: Music,
      title: 'Audio Compression',
      description: 'Compress audio files to MP3, AAC, and other formats with customizable quality.',
      path: '/tool/compress-audio'
    },
    {
      icon: FileText,
      title: 'PDF Compression',
      description: 'Reduce PDF file sizes by optimizing images and removing redundant data.',
      path: '/tool/compress-pdf'
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process files in seconds with our optimized algorithms'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your files are automatically deleted after 24 hours'
    },
    {
      icon: Download,
      title: 'Free Downloads',
      description: 'No registration required, download processed files instantly'
    },
    {
      icon: Clock,
      title: '24-Hour Access',
      description: 'Files are available for download for 24 hours'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Convert & Compress Files
              <span className="hero-accent"> Instantly</span>
            </h1>
            <p className="hero-description">
              Transform your images, videos, audio, and PDFs with our powerful online tools. 
              Compress files up to 80% smaller while maintaining quality, or convert between formats seamlessly.
            </p>
            <div className="hero-actions">
              <Link to="/tools" className="btn btn-primary">
                Get Started
                <ArrowRight className="btn-icon" />
              </Link>
              <Link to="/tool/compress-image" className="btn btn-secondary">
                Try Image Compression
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="file-cards">
              <div className="file-card image-card">
                <Image className="file-icon" />
                <span>Image</span>
              </div>
              <div className="file-card video-card">
                <Video className="file-icon" />
                <span>Video</span>
              </div>
              <div className="file-card audio-card">
                <Music className="file-icon" />
                <span>Audio</span>
              </div>
              <div className="file-card pdf-card">
                <FileText className="file-icon" />
                <span>PDF</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Powerful File Tools</h2>
            <p>Choose from our comprehensive suite of file processing tools</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} to={feature.path} className="feature-card">
                  <div className="feature-icon">
                    <Icon />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <div className="feature-arrow">
                    <ArrowRight />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose ConvertFlix?</h2>
            <p>Experience the best file processing platform with these benefits</p>
          </div>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="benefit-card">
                  <div className="benefit-icon">
                    <Icon />
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start?</h2>
            <p>Join thousands of users who trust ConvertFlix for their file processing needs</p>
            <div className="cta-actions">
              <Link to="/tools" className="btn btn-primary">
                Explore All Tools
                <ArrowRight className="btn-icon" />
              </Link>
              <Link to="/tool/compress-image" className="btn btn-secondary">
                Try Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 