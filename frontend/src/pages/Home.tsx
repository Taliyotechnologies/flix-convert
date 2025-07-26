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
  Clock, 
  Users, 
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import './Home.css';

const Home: React.FC = () => {
  const features = [
    {
      icon: <FileVideo className="feature-icon" />,
      title: "Video Conversion",
      description: "Convert videos to any format with high quality and fast processing"
    },
    {
      icon: <FileAudio className="feature-icon" />,
      title: "Audio Conversion",
      description: "Transform audio files between different formats seamlessly"
    },
    {
      icon: <FileImage className="feature-icon" />,
      title: "Image Conversion",
      description: "Convert images to various formats while maintaining quality"
    },
    {
      icon: <FileText className="feature-icon" />,
      title: "PDF Conversion",
      description: "Convert PDFs to different formats with precision"
    }
  ];

  const stats = [
    { number: "10M+", label: "Files Converted", icon: <Download /> },
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
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} />
              <span>Next-Gen File Conversion</span>
            </div>
            
            <h1 className="hero-title">
              Transform Your Files with
              <span className="gradient-text"> Lightning Speed</span>
            </h1>
            
            <p className="hero-description">
              Convert videos, audio, images, and PDFs instantly with our advanced AI-powered platform. 
              Professional quality, blazing fast speed, and secure processing.
            </p>
            
            <div className="hero-buttons">
              <Link to="/convert" className="btn-primary">
                <Play size={20} />
                Start Converting
                <ArrowRight size={20} />
              </Link>
              <Link to="/about" className="btn-secondary">
                Learn More
              </Link>
            </div>
            
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose ConvertFlix?</h2>
            <p className="section-subtitle">
              Experience the future of file conversion with our cutting-edge technology
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
                <Zap size={32} />
              </div>
              <h3>Choose Format</h3>
              <p>Select your desired output format from our extensive list of options.</p>
            </div>
            
            <div className="step-card glass-card">
              <div className="step-number">3</div>
              <div className="step-icon">
                <Download size={32} />
              </div>
              <h3>Download Result</h3>
              <p>Get your converted file instantly with professional quality.</p>
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
            <h2>Ready to Transform Your Files?</h2>
            <p>Join millions of users who trust ConvertFlix for their file conversion needs</p>
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