import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Download, 
  Video, 
  Image, 
  Music, 
  FileText, 
  Zap, 
  Shield, 
  Play,
  RotateCcw
} from 'lucide-react';
import './Home.css';

const Home: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [compressionSettings, setCompressionSettings] = useState({
    quality: 'medium',
    format: 'mp4',
    resolution: '720p'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('video/')) {
      setUploadedFile(file);
      setIsProcessed(false);
    } else {
      alert('Please upload a video file');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const processVideo = () => {
    if (!uploadedFile) return;
    
    setIsProcessing(true);
    // Simulate video processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsProcessed(true);
    }, 3000);
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setIsProcessed(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const features = [
    {
      icon: <Zap size={32} />,
      title: 'Lightning Fast',
      description: 'Compress videos in seconds with our optimized engine'
    },
    {
      icon: <Shield size={32} />,
      title: 'Secure & Private',
      description: 'Your files are encrypted and automatically deleted'
    },
    {
      icon: <Download size={32} />,
      title: 'Instant Download',
      description: 'Get your compressed videos immediately'
    },
    {
      icon: <Video size={32} />,
      title: 'Multiple Formats',
      description: 'Support for MP4, AVI, MOV, and more'
    }
  ];

  const conversionTypes = [
    {
      icon: <Image size={32} />,
      title: 'Image Conversion',
      description: 'Convert between JPG, PNG, WebP, and more',
      color: '#667eea'
    },
    {
      icon: <Video size={32} />,
      title: 'Video Compression',
      description: 'Compress videos while maintaining quality',
      color: '#764ba2'
    },
    {
      icon: <Music size={32} />,
      title: 'Audio Conversion',
      description: 'Convert audio files between formats',
      color: '#f093fb'
    },
    {
      icon: <FileText size={32} />,
      title: 'Document Conversion',
      description: 'Convert PDFs, Word docs, and more',
      color: '#4facfe'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <motion.div
              className="hero-text"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="hero-title">
                Convert & Compress Files
                <span className="gradient-text"> Instantly</span>
              </h1>
              <p className="hero-subtitle">
                Professional file conversion and video compression tools. 
                Fast, secure, and free. No registration required.
              </p>
              <div className="hero-buttons">
                <motion.button
                  className="btn btn-primary btn-large"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('video-compressor')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Video size={20} />
                  Try Video Compressor
                </motion.button>
                <motion.button
                  className="btn btn-secondary btn-large"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Tools
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="hero-animation">
                <div className="floating-card">
                  <Video size={48} />
                  <span>Video</span>
                </div>
                <div className="floating-card">
                  <Image size={48} />
                  <span>Image</span>
                </div>
                <div className="floating-card">
                  <Music size={48} />
                  <span>Audio</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Compressor Section */}
      <section id="video-compressor" className="compressor-section section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Video Compressor</h2>
            <p className="section-subtitle">
              Compress your videos while maintaining quality. Reduce file size up to 80%.
            </p>
          </motion.div>

          <div className="compressor-container">
            <motion.div
              className="upload-area"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {!uploadedFile ? (
                <div
                  className={`upload-zone ${dragActive ? 'drag-active' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={64} />
                  <h3>Drop your video here</h3>
                  <p>or click to browse</p>
                  <span className="upload-hint">Supports MP4, AVI, MOV, MKV</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileInput}
                    style={{ display: 'none' }}
                  />
                </div>
              ) : (
                <div className="file-info">
                  <div className="file-details">
                    <Video size={48} />
                    <div className="file-text">
                      <h3>{uploadedFile.name}</h3>
                      <p>{(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  
                  <div className="compression-settings">
                    <h4>Compression Settings</h4>
                    <div className="settings-grid">
                      <div className="setting-group">
                        <label>Quality</label>
                        <select
                          value={compressionSettings.quality}
                          onChange={(e) => setCompressionSettings({
                            ...compressionSettings,
                            quality: e.target.value
                          })}
                        >
                          <option value="high">High Quality</option>
                          <option value="medium">Medium Quality</option>
                          <option value="low">Low Quality</option>
                        </select>
                      </div>
                      
                      <div className="setting-group">
                        <label>Format</label>
                        <select
                          value={compressionSettings.format}
                          onChange={(e) => setCompressionSettings({
                            ...compressionSettings,
                            format: e.target.value
                          })}
                        >
                          <option value="mp4">MP4</option>
                          <option value="avi">AVI</option>
                          <option value="mov">MOV</option>
                        </select>
                      </div>
                      
                      <div className="setting-group">
                        <label>Resolution</label>
                        <select
                          value={compressionSettings.resolution}
                          onChange={(e) => setCompressionSettings({
                            ...compressionSettings,
                            resolution: e.target.value
                          })}
                        >
                          <option value="1080p">1080p</option>
                          <option value="720p">720p</option>
                          <option value="480p">480p</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="action-buttons">
                    {!isProcessed ? (
                      <motion.button
                        className="btn btn-primary"
                        onClick={processVideo}
                        disabled={isProcessing}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isProcessing ? (
                          <>
                            <RotateCcw size={20} className="spinning" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Play size={20} />
                            Compress Video
                          </>
                        )}
                      </motion.button>
                    ) : (
                      <div className="success-actions">
                        <motion.button
                          className="btn btn-primary"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Download size={20} />
                          Download Compressed Video
                        </motion.button>
                        <motion.button
                          className="btn btn-secondary"
                          onClick={resetUpload}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Upload size={20} />
                          Upload Another Video
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
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
            <h2 className="section-title">Why Choose FlixConvert?</h2>
            <p className="section-subtitle">
              Built with cutting-edge technology for the best user experience
            </p>
          </motion.div>

          <div className="grid grid-2">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Types Section */}
      <section className="conversion-types section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">All-in-One Conversion Tools</h2>
            <p className="section-subtitle">
              Convert any file type with our comprehensive suite of tools
            </p>
          </motion.div>

          <div className="grid grid-2">
            {conversionTypes.map((type, index) => (
              <motion.div
                key={index}
                className="conversion-card card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                style={{ '--card-color': type.color } as React.CSSProperties}
              >
                <div className="conversion-icon" style={{ color: type.color }}>
                  {type.icon}
                </div>
                <h3 className="conversion-title">{type.title}</h3>
                <p className="conversion-description">{type.description}</p>
                <motion.button
                  className="btn btn-primary conversion-btn"
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

      {/* CTA Section */}
      <section className="cta-section">
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
              Join millions of users who trust FlixConvert for their file conversion needs.
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

export default Home; 