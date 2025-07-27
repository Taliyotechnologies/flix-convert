import React, { useState, useEffect } from 'react';
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
  Star,
  ArrowRight,
  Sparkles,
  Settings,
  Target,
  Rocket,
  Crown,
  Check,
  X,
  Menu,
  Globe,
  Heart
} from 'lucide-react';
import './Home.css';

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Rocket className="feature-icon" />,
      title: "Lightning Fast",
      description: "Process files in seconds with our optimized cloud infrastructure",
      color: "var(--accent-blue)"
    },
    {
      icon: <Target className="feature-icon" />,
      title: "Smart Compression",
      description: "Reduce file sizes by up to 80% while maintaining quality",
      color: "var(--accent-purple)"
    },
    {
      icon: <Shield className="feature-icon" />,
      title: "Secure Processing",
      description: "Your files are encrypted and automatically deleted after processing",
      color: "var(--accent-green)"
    },
    {
      icon: <Settings className="feature-icon" />,
      title: "Format Conversion",
      description: "Convert between 50+ formats with one-click simplicity",
      color: "var(--accent-orange)"
    }
  ];

  const fileTypes = [
    {
      icon: <FileImage className="file-type-icon" />,
      name: "Images",
      formats: ["JPG", "PNG", "WEBP", "SVG", "GIF"],
      color: "var(--accent-blue)",
      description: "Optimize and convert images"
    },
    {
      icon: <FileVideo className="file-type-icon" />,
      name: "Videos", 
      formats: ["MP4", "AVI", "MOV", "MKV", "WEBM"],
      color: "var(--accent-purple)",
      description: "Compress and convert videos"
    },
    {
      icon: <FileAudio className="file-type-icon" />,
      name: "Audio",
      formats: ["MP3", "WAV", "AAC", "FLAC", "OGG"],
      color: "var(--accent-green)",
      description: "Process audio files"
    },
    {
      icon: <FileText className="file-type-icon" />,
      name: "Documents",
      formats: ["PDF", "DOC", "DOCX", "TXT", "RTF"],
      color: "var(--accent-orange)",
      description: "Convert document formats"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      text: "ConvertFlix has revolutionized my workflow. The quality and speed are incredible!",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Mike Chen",
      role: "Video Editor",
      text: "Best conversion tool I've ever used. The interface is intuitive and results are perfect.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Emma Davis",
      role: "Digital Artist",
      text: "Amazing tool for converting my artwork files. Fast and reliable every time.",
      rating: 5,
      avatar: "ED"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "Up to 10 files per day",
        "Basic compression",
        "Standard formats",
        "Email support"
      ],
      popular: false,
      color: "var(--accent-blue)"
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "per month",
      features: [
        "Unlimited files",
        "Advanced compression",
        "All formats",
        "Priority support",
        "Batch processing",
        "API access"
      ],
      popular: true,
      color: "var(--accent-purple)"
    },
    {
      name: "Enterprise",
      price: "$29.99",
      period: "per month",
      features: [
        "Everything in Pro",
        "Custom integrations",
        "Dedicated support",
        "Advanced analytics",
        "White-label options",
        "SLA guarantee"
      ],
      popular: false,
      color: "var(--accent-green)"
    }
  ];

  return (
    <div className={`home ${isVisible ? 'visible' : ''}`}>
      {/* Animated Background */}
      <div className="animated-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{ animationDelay: `${i * 0.5}s` }}></div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="brand-icon">
              <Sparkles size={24} />
            </div>
            <span className="brand-text">ConvertFlix</span>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
            <Link to="/" className="nav-link active">Home</Link>
            <Link to="/compress" className="nav-link">Compress</Link>
            <Link to="/convert" className="nav-link">Convert</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>

          <div className="nav-actions">
            <Link to="/login" className="btn-text">Login</Link>
            <Link to="/signup" className="btn-primary-small">Get Started</Link>
            <button 
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose ConvertFlix?</h2>
            <p className="section-subtitle">
              Professional-grade tools designed for modern workflows
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`feature-card ${index === activeFeature ? 'active' : ''}`}
                style={{ '--feature-color': feature.color } as React.CSSProperties}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="feature-highlight"></div>
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

      {/* File Types Section */}
      <section className="file-types">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Supported File Types</h2>
            <p className="section-subtitle">
              Process any file format with our comprehensive conversion tools
            </p>
          </div>

          <div className="file-types-grid">
            {fileTypes.map((type, index) => (
              <div 
                key={index} 
                className="file-type-card"
                style={{ '--type-color': type.color } as React.CSSProperties}
              >
                <div className="file-type-header">
                  {type.icon}
                  <h3>{type.name}</h3>
                </div>
                <p className="file-type-description">{type.description}</p>
                <div className="file-formats">
                  {type.formats.map((format, formatIndex) => (
                    <span key={formatIndex} className="format-tag">{format}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Simple three-step process to transform your files
            </p>
          </div>

          <div className="steps-container">
            <div className="step-connector"></div>
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">
                <Upload size={32} />
              </div>
              <h3>Upload Files</h3>
              <p>Drag and drop your files or click to browse. We support all major formats.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">
                <Settings size={32} />
              </div>
              <h3>Choose Settings</h3>
              <p>Select your preferred compression level and output format.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">
                <Download size={32} />
              </div>
              <h3>Download Results</h3>
              <p>Get your processed files instantly with optimized quality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Users Say</h2>
            <p className="section-subtitle">
              Trusted by thousands of professionals worldwide
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">
                    {testimonial.avatar}
                  </div>
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Simple Pricing</h2>
            <p className="section-subtitle">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                style={{ '--plan-color': plan.color } as React.CSSProperties}
              >
                {plan.popular && (
                  <div className="popular-badge">
                    <Crown size={16} />
                    <span>Most Popular</span>
                  </div>
                )}
                <div className="pricing-header">
                  <h3>{plan.name}</h3>
                </div>
                <div className="pricing-amount">
                  <span className="price">{plan.price}</span>
                  <span className="period">/{plan.period}</span>
                </div>
                <ul className="pricing-features">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <Check size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/signup" 
                  className={`pricing-btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Files?</h2>
            <p>
              Join thousands of users who trust ConvertFlix for their file processing needs. 
              Start converting and compressing files today.
            </p>
            <div className="cta-actions">
              <Link to="/compress" className="btn-primary">
                <Zap size={18} />
                <span>Start Processing</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/convert" className="btn-secondary">
                <Settings size={18} />
                <span>Convert Files</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="brand-icon">
                <Sparkles size={24} />
              </div>
              <div className="brand-text">ConvertFlix</div>
              <p>
                Professional file processing tools for modern workflows. 
                Fast, secure, and reliable conversion services.
              </p>
            </div>
            
            <div className="footer-links">
              <div className="footer-section">
                <h4>Product</h4>
                <Link to="/compress">File Compression</Link>
                <Link to="/convert">Format Conversion</Link>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact</Link>
              </div>
              
              <div className="footer-section">
                <h4>Support</h4>
                <Link to="/help">Help Center</Link>
                <Link to="/docs">Documentation</Link>
                <Link to="/api">API Reference</Link>
                <Link to="/status">Service Status</Link>
              </div>
              
              <div className="footer-section">
                <h4>Company</h4>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
                <Link to="/cookies">Cookie Policy</Link>
                <Link to="/security">Security</Link>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-copyright">
              © 2024 ConvertFlix. All rights reserved.
            </div>
            <div className="footer-social">
              <Link to="#"><Globe size={20} /></Link>
              <Link to="#"><Heart size={20} /></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 