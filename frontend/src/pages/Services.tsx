import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Image, 
  FileText, 
  Video, 
  Music, 
  Download, 
  Upload, 
  Zap, 
  Shield,
  Play,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Settings,
  Compress
} from 'lucide-react';
import './Services.css';

const Services: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [compressionSettings, setCompressionSettings] = useState({
    quality: 'medium',
    format: 'mp4',
    resolution: '720p'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const services = [
    {
      id: 'image',
      icon: <Image size={32} />,
      title: 'Image Conversion',
      description: 'Convert images between JPG, PNG, WebP, GIF, and more formats. Optimize quality and file size.',
      features: ['JPG to PNG', 'PNG to WebP', 'GIF to MP4', 'BMP to JPG'],
      color: '#667eea',
      supportedFormats: ['JPG', 'PNG', 'WebP', 'GIF', 'BMP', 'TIFF', 'SVG']
    },
    {
      id: 'video',
      icon: <Video size={32} />,
      title: 'Video Compression',
      description: 'Compress videos to any format. Support for MP4, AVI, MOV, MKV, and more.',
      features: ['MP4 to AVI', 'MOV to MP4', 'MKV to MP4', 'WebM to MP4'],
      color: '#764ba2',
      supportedFormats: ['MP4', 'AVI', 'MOV', 'MKV', 'WebM', 'FLV', 'WMV']
    },
    {
      id: 'audio',
      icon: <Music size={32} />,
      title: 'Audio Conversion',
      description: 'Convert audio files between formats. MP3, WAV, FLAC, AAC, and more.',
      features: ['MP3 to WAV', 'WAV to FLAC', 'AAC to MP3', 'OGG to MP3'],
      color: '#f093fb',
      supportedFormats: ['MP3', 'WAV', 'FLAC', 'AAC', 'OGG', 'WMA', 'M4A']
    },
    {
      id: 'document',
      icon: <FileText size={32} />,
      title: 'Document Conversion',
      description: 'Convert PDFs, Word documents, Excel files, and more.',
      features: ['PDF to Word', 'Word to PDF', 'Excel to CSV', 'PPT to PDF'],
      color: '#4facfe',
      supportedFormats: ['PDF', 'DOC', 'DOCX', 'XLS', 'XLSX', 'PPT', 'PPTX']
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

  const handleToolClick = (toolId: string) => {
    setActiveTool(toolId);
    setUploadedFile(null);
    setIsProcessed(false);
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setIsProcessed(false);
  };

  const processFile = () => {
    if (!uploadedFile) return;
    
    setIsProcessing(true);
    // Simulate file processing
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

      {/* Interactive Tools Section */}
      <section className="tools-section section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Try Our Tools</h2>
            <p className="section-subtitle">
              Select a tool below to start converting your files
            </p>
          </motion.div>

          <div className="tools-grid">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className={`tool-card card ${activeTool === service.id ? 'active' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                onClick={() => handleToolClick(service.id)}
              >
                <div className="tool-icon" style={{ color: service.color }}>
                  {service.icon}
                </div>
                <h3 className="tool-title">{service.title}</h3>
                <p className="tool-description">{service.description}</p>
                <div className="supported-formats">
                  <h4>Supported Formats:</h4>
                  <div className="format-tags">
                    {service.supportedFormats.map((format, formatIndex) => (
                      <span key={formatIndex} className="format-tag">{format}</span>
                    ))}
                  </div>
                </div>
                <motion.button
                  className="btn btn-primary tool-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToolClick(service.id);
                  }}
                >
                  Try Now
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Tool Interface */}
      {activeTool && (
        <section className="active-tool-section section">
          <div className="container">
            <motion.div
              className="tool-interface"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="tool-header">
                <button 
                  className="back-btn"
                  onClick={() => setActiveTool(null)}
                >
                  ← Back to Tools
                </button>
                <h2 className="tool-title">
                  {services.find(s => s.id === activeTool)?.title}
                </h2>
              </div>

              <div className="tool-workspace">
                {!uploadedFile ? (
                  <div className="upload-zone">
                    <Upload size={64} />
                    <h3>Drop your file here</h3>
                    <p>or click to browse</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                      style={{ display: 'none' }}
                    />
                    <motion.button
                      className="btn btn-primary"
                      onClick={() => fileInputRef.current?.click()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Choose File
                    </motion.button>
                  </div>
                ) : (
                  <div className="file-workspace">
                    <div className="file-info">
                      <div className="file-details">
                        {activeTool === 'video' && <Video size={48} />}
                        {activeTool === 'image' && <Image size={48} />}
                        {activeTool === 'audio' && <Music size={48} />}
                        {activeTool === 'document' && <FileText size={48} />}
                        <div className="file-text">
                          <h3>{uploadedFile.name}</h3>
                          <p>{(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                        </div>
                      </div>

                      {activeTool === 'video' && (
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
                      )}

                      <div className="action-buttons">
                        {!isProcessed ? (
                          <motion.button
                            className="btn btn-primary"
                            onClick={processFile}
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
                                <Compress size={20} />
                                Process File
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
                              Download Processed File
                            </motion.button>
                            <motion.button
                              className="btn btn-secondary"
                              onClick={resetUpload}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Upload size={20} />
                              Upload Another File
                            </motion.button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}

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