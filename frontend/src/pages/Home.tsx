import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  FileVideo, 
  FileAudio, 
  FileImage, 
  FileText, 
  Download, 
  Upload, 
  Shield, 
  Users, 
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles,
  ArrowDown,
  Clock,
  Globe,
  Award,
  File,
  Settings,
  BarChart3,
  Minus
} from 'lucide-react';
import './Home.css';

const Home: React.FC = () => {
  const fileTypes = [
    {
      icon: <FileImage className="file-type-icon" />,
      name: "Images",
      formats: ["JPG", "PNG", "WEBP", "SVG", "GIF"],
      color: "var(--accent-blue)"
    },
    {
      icon: <FileVideo className="file-type-icon" />,
      name: "Videos", 
      formats: ["MP4", "AVI", "MOV", "MKV", "WEBM"],
      color: "var(--accent-purple)"
    },
    {
      icon: <FileAudio className="file-type-icon" />,
      name: "Audio",
      formats: ["MP3", "WAV", "AAC", "FLAC", "OGG"],
      color: "var(--accent-green)"
    },
    {
      icon: <FileText className="file-type-icon" />,
      name: "Documents",
      formats: ["PDF", "DOC", "DOCX", "TXT", "RTF"],
      color: "var(--accent-orange)"
    }
  ];

  const features = [
    {
      icon: <Minus className="feature-icon" />,
      title: "Smart Compression",
      description: "Reduce file sizes by up to 80% while maintaining quality"
    },
    {
      icon: <Settings className="feature-icon" />,
      title: "Format Conversion",
      description: "Convert between 50+ formats with one-click simplicity"
    },
    {
      icon: <Shield className="feature-icon" />,
      title: "Secure Processing",
      description: "Your files are encrypted and automatically deleted after processing"
    },
    {
      icon: <Zap className="feature-icon" />,
      title: "Lightning Fast",
      description: "Process files in seconds with our optimized cloud infrastructure"
    }
  ];

  const stats = [
    { number: "50M+", label: "Files Processed", icon: <File /> },
    { number: "50+", label: "Supported Formats", icon: <FileVideo /> },
    { number: "99.9%", label: "Uptime", icon: <Shield /> },
    { number: "24/7", label: "Support", icon: <Users /> }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      text: "ConvertFlix has revolutionized my workflow. The quality and speed are incredible!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Video Editor",
      text: "Best conversion tool I've ever used. The interface is intuitive and results are perfect.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Digital Artist",
      text: "Amazing tool for converting my artwork files. Fast and reliable every time.",
      rating: 5
    }
  ];

  return (
    <div className="home">
      <div className="bg-pattern"></div>
      
      {/* Professional Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient-overlay"></div>
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
            <div className="shape shape-5"></div>
          </div>
        </div>
        
        <div className="container">
          <div className="hero-content">
            {/* Professional Badge */}
            <div className="hero-badge">
              <div className="badge-icon">
                <Sparkles size={16} />
              </div>
              <span>Professional File Processing</span>
              <div className="badge-pulse"></div>
            </div>
            
            {/* Main Heading */}
            <h1 className="hero-title">
              Compress & Convert Files
              <span className="gradient-text"> Like a Pro</span>
            </h1>
            
            {/* Subtitle */}
            <p className="hero-description">
              Transform images, videos, audio, and documents with our advanced compression and conversion engine. 
              Reduce file sizes, change formats, and optimize your content with professional-grade tools.
            </p>
            
            {/* File Types Showcase */}
            <div className="file-types-showcase">
              {fileTypes.map((type, index) => (
                <div key={index} className="file-type-card" style={{ '--accent-color': type.color } as React.CSSProperties}>
                  <div className="file-type-icon-wrapper">
                    {type.icon}
                  </div>
                  <div className="file-type-info">
                    <h4>{type.name}</h4>
                    <div className="file-formats">
                      {type.formats.map((format, idx) => (
                        <span key={idx} className="format-tag">{format}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Premium Features */}
            <div className="hero-features">
              <div className="feature-item">
                <CheckCircle size={18} />
                <span>Zero Quality Loss</span>
              </div>
              <div className="feature-item">
                <Clock size={18} />
                <span>Instant Processing</span>
              </div>
              <div className="feature-item">
                <Shield size={18} />
                <span>100% Secure</span>
              </div>
              <div className="feature-item">
                <BarChart3 size={18} />
                <span>Smart Optimization</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="hero-buttons">
              <Link to="/compress" className="btn-primary">
                <div className="btn-content">
                  <Minus size={20} />
                  <span>Compress Files</span>
                  <ArrowRight size={20} />
                </div>
                <div className="btn-glow"></div>
              </Link>
              <Link to="/convert" className="btn-secondary">
                <div className="btn-content">
                  <Settings size={20} />
                  <span>Convert Format</span>
                  <ArrowRight size={20} />
                </div>
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="trust-indicators">
              <div className="trust-item">
                <Globe size={16} />
                <span>Trusted by 1M+ Users</span>
              </div>
              <div className="trust-item">
                <Award size={16} />
                <span>Industry Leading</span>
              </div>
              <div className="trust-item">
                <Shield size={16} />
                <span>GDPR Compliant</span>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-text">Explore features</div>
          <div className="scroll-arrow">
            <ArrowDown size={20} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose ConvertFlix?</h2>
            <p className="section-subtitle">
              Professional-grade tools for all your file processing needs
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card glass-card">
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Get started in just three simple steps
            </p>
          </div>
          
          <div className="steps-container">
            <div className="step-card glass-card">
              <div className="step-number">1</div>
              <div className="step-icon">
                <Upload size={32} />
              </div>
              <h3>Upload Your File</h3>
              <p>Drag and drop your file or click to browse. We support all major formats.</p>
            </div>
            
            <div className="step-card glass-card">
              <div className="step-number">2</div>
              <div className="step-icon">
                <Settings size={32} />
              </div>
              <h3>Choose Settings</h3>
              <p>Select compression level or target format. Our AI suggests optimal settings.</p>
            </div>
            
            <div className="step-card glass-card">
              <div className="step-number">3</div>
              <div className="step-icon">
                <Download size={32} />
              </div>
              <h3>Download Result</h3>
              <p>Get your processed file instantly with professional quality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Users Say</h2>
            <p className="section-subtitle">
              Join thousands of satisfied users worldwide
            </p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card glass-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content glass-card">
            <h2>Ready to Optimize Your Files?</h2>
            <p>Join millions of users who trust ConvertFlix for their file processing needs</p>
            <div className="cta-buttons">
              <Link to="/signup" className="btn-primary">
                <CheckCircle size={20} />
                Get Started Free
              </Link>
              <Link to="/contact" className="btn-secondary">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 