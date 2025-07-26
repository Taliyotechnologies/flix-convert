import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../App';
import './Home.css';

const features = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="currentColor" opacity="0.1"/>
        <path d="M16 24h16M24 16v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="36" cy="12" r="4" fill="currentColor"/>
        <path d="M34 10l2 2 2-2" stroke="var(--color-bg)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Lightning Fast",
    description: "Convert and compress files in under 10 seconds with our optimized algorithms",
    color: "#3B82F6"
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="currentColor" opacity="0.1"/>
        <path d="M16 20l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 24l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "High Quality",
    description: "Maintain excellent quality with minimum 50% compression ratio",
    color: "#10B981"
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="currentColor" opacity="0.1"/>
        <path d="M16 16h16v16H16z" stroke="currentColor" strokeWidth="2"/>
        <path d="M20 20h8v8h-8z" fill="currentColor" opacity="0.3"/>
        <path d="M24 12v8M20 16h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Multiple Formats",
    description: "Support for images, videos, audio, and PDF files",
    color: "#F59E0B"
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="currentColor" opacity="0.1"/>
        <path d="M16 20h16M16 28h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20" cy="16" r="2" fill="currentColor"/>
        <circle cx="28" cy="16" r="2" fill="currentColor"/>
      </svg>
    ),
    title: "Secure & Private",
    description: "Your files are processed locally and never stored on our servers",
    color: "#EF4444"
  }
];

const howItWorks = [
  {
    step: "01",
    title: "Upload Your File",
    description: "Drag and drop or click to upload any supported file format",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 8v16M8 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    step: "02", 
    title: "Choose Settings",
    description: "Select compression level or target format for conversion",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M8 16h16M16 8v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    step: "03",
    title: "Process & Download",
    description: "Get your optimized file in seconds, ready to use",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M8 16h16M16 8l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
];

const stats = [
  { number: "10M+", label: "Files Processed", icon: "📁" },
  { number: "50+", label: "Supported Formats", icon: "🔄" },
  { number: "99.9%", label: "Uptime", icon: "⚡" },
  { number: "24/7", label: "Support", icon: "🛡️" }
];

const services = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="currentColor" opacity="0.1"/>
        <path d="M16 16h16v16H16z" stroke="currentColor" strokeWidth="2"/>
        <path d="M20 20h8v8h-8z" fill="currentColor" opacity="0.3"/>
        <path d="M24 12v8M20 16h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Image Compression",
    description: "Compress images while maintaining quality. Reduce file size for web, email, or storage.",
    link: "/compress/image",
    color: "#3B82F6",
    features: ["JPG, PNG, WebP", "Quality Control", "Batch Processing"]
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="currentColor" opacity="0.1"/>
        <path d="M16 20h16M16 28h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20" cy="16" r="2" fill="currentColor"/>
        <circle cx="28" cy="16" r="2" fill="currentColor"/>
      </svg>
    ),
    title: "Video Compression",
    description: "Compress videos with high quality. Perfect for sharing and uploading.",
    link: "/compress/video",
    color: "#10B981",
    features: ["MP4, AVI, MOV", "Quality Preservation", "Fast Processing"]
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="currentColor" opacity="0.1"/>
        <path d="M12 20l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 20l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 28h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Audio Compression",
    description: "Reduce audio file size for easy sharing and storage.",
    link: "/compress/audio",
    color: "#F59E0B",
    features: ["MP3, WAV, FLAC", "Bitrate Control", "High Quality"]
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="currentColor" opacity="0.1"/>
        <path d="M16 16h16v16H16z" stroke="currentColor" strokeWidth="2"/>
        <path d="M20 20h8v8h-8z" fill="currentColor" opacity="0.3"/>
        <path d="M24 12v8M20 16h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "PDF Compression",
    description: "Make PDFs smaller for easy upload and sharing.",
    link: "/compress/pdf",
    color: "#EF4444",
    features: ["PDF Optimization", "Image Compression", "Text Preservation"]
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Web Designer",
    content: "ConvertFlix has saved me hours of work. The image compression is incredible - I get 70% size reduction without losing quality!",
    avatar: "👩‍🎨"
  },
  {
    name: "Mike Chen",
    role: "Content Creator",
    content: "Perfect for my YouTube videos. Fast compression and the quality stays amazing. Highly recommended!",
    avatar: "👨‍💻"
  },
  {
    name: "Emma Davis",
    role: "Marketing Manager",
    content: "We use it daily for our marketing materials. The batch processing feature is a game-changer for our team.",
    avatar: "👩‍💼"
  }
];

const Home = () => {
  const { theme } = useTheme();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`home-container ${theme}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span>🚀 Fastest File Processing Tool</span>
          </div>
          <h1 className="hero-title">
            Convert & Compress Files
            <span className="gradient-text"> Instantly</span>
          </h1>
          <p className="hero-description">
            Professional file conversion and compression tools. Transform images, videos, audio, and PDFs with lightning speed and exceptional quality. Trusted by millions of users worldwide.
          </p>
          <div className="hero-buttons">
            <Link to="/compress" className="btn-primary">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Start Compressing
            </Link>
            <Link to="/convert" className="btn-secondary">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16 4l-4 4-4-4M12 16V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Convert Files
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10M+</span>
              <span className="stat-label">Files Processed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Formats</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card card-1">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="4" width="24" height="24" rx="6" fill="currentColor" opacity="0.1"/>
              <path d="M12 16h8M16 12v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Image</span>
          </div>
          <div className="floating-card card-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="4" width="24" height="24" rx="6" fill="currentColor" opacity="0.1"/>
              <path d="M8 12l8 8 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Video</span>
          </div>
          <div className="floating-card card-3">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="4" width="24" height="24" rx="6" fill="currentColor" opacity="0.1"/>
              <path d="M12 20l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Audio</span>
          </div>
          <div className="hero-glow"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose ConvertFlix?</h2>
          <p>Professional tools designed for speed, quality, and ease of use</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card" style={{'--feature-color': feature.color}}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="feature-glow"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>Professional file compression and conversion tools for all your needs</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <Link key={index} to={service.link} className="service-card" style={{'--service-color': service.color}}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-features">
                {service.features.map((feature, idx) => (
                  <span key={idx} className="service-feature">{feature}</span>
                ))}
              </div>
              <div className="service-arrow">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Simple 3-step process to get your files optimized</p>
        </div>
        <div className="steps-container">
          {howItWorks.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{step.step}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>What Our Users Say</h2>
          <p>Join thousands of satisfied customers worldwide</p>
        </div>
        <div className="testimonials-container">
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`testimonial-card ${index === currentTestimonial ? 'active' : ''}`}
              >
                <div className="testimonial-content">
                  <div className="testimonial-avatar">{testimonial.avatar}</div>
                  <p className="testimonial-text">"{testimonial.content}"</p>
                  <div className="testimonial-author">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Optimize Your Files?</h2>
          <p>Join millions of users who trust ConvertFlix for their file processing needs</p>
          <div className="cta-buttons">
            <Link to="/compress" className="btn-primary">Start Compressing</Link>
            <Link to="/convert" className="btn-secondary">Convert Files</Link>
          </div>
        </div>
        <div className="cta-glow"></div>
      </section>
    </div>
  );
};

export default Home; 