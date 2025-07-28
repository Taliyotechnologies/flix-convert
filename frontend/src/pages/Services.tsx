import React from 'react';
import { motion } from 'framer-motion';
import { Image, FileText, Video, Music, Download, Upload, Zap, Shield } from 'lucide-react';
import './Services.css';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Image size={32} />,
      title: 'Image Conversion',
      description: 'Convert images between JPG, PNG, WebP, GIF, and more formats. Optimize quality and file size.',
      features: ['JPG to PNG', 'PNG to WebP', 'GIF to MP4', 'BMP to JPG'],
      color: '#667eea'
    },
    {
      icon: <Video size={32} />,
      title: 'Video Conversion',
      description: 'Convert videos to any format. Support for MP4, AVI, MOV, MKV, and more.',
      features: ['MP4 to AVI', 'MOV to MP4', 'MKV to MP4', 'WebM to MP4'],
      color: '#764ba2'
    },
    {
      icon: <Music size={32} />,
      title: 'Audio Conversion',
      description: 'Convert audio files between formats. MP3, WAV, FLAC, AAC, and more.',
      features: ['MP3 to WAV', 'WAV to FLAC', 'AAC to MP3', 'OGG to MP3'],
      color: '#f093fb'
    },
    {
      icon: <FileText size={32} />,
      title: 'Document Conversion',
      description: 'Convert PDFs, Word documents, Excel files, and more.',
      features: ['PDF to Word', 'Word to PDF', 'Excel to CSV', 'PPT to PDF'],
      color: '#4facfe'
    }
  ];

  const features = [
    {
      icon: <Zap size={32} />,
      title: 'Lightning Fast',
      description: 'Convert files in seconds with our optimized processing engine.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Secure & Private',
      description: 'Your files are encrypted and automatically deleted after processing.'
    },
    {
      icon: <Upload size={32} />,
      title: 'Easy Upload',
      description: 'Drag and drop or click to upload. No registration required.'
    },
    {
      icon: <Download size={32} />,
      title: 'Instant Download',
      description: 'Get your converted files immediately after processing.'
    }
  ];

  return (
    <div className="services">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <motion.div
            className="services-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="services-title">Our Services</h1>
            <p className="services-subtitle">
              Professional file conversion tools for all your needs. Convert, compress, and optimize 
              your files with our cutting-edge technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Conversion Tools</h2>
            <p className="section-subtitle">
              Everything you need to transform your files
            </p>
          </motion.div>

          <div className="grid grid-2">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-card card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                style={{ '--service-color': service.color } as React.CSSProperties}
              >
                <div className="service-icon" style={{ color: service.color }}>
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="service-feature">
                      <span className="feature-dot"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  className="btn btn-primary service-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try Now
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Why Choose Our Services?</h2>
            <p className="section-subtitle">
              Built with cutting-edge technology for the best user experience
            </p>
          </motion.div>

          <div className="grid grid-2">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-item"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-subtitle">
              Start converting your files today. It's free, fast, and secure.
            </p>
            <motion.button
              className="btn btn-primary btn-large"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Converting Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services; 