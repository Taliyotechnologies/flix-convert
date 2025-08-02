import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Image, FileText, Video, Music, Film, Image as ImageIcon, Shield, Zap, Target, ArrowRight, FileDown, Upload, Download, Settings, Clock, CheckCircle } from 'lucide-react';
import './Tools.css';

const Tools = () => {
  const tools = [
    {
      category: 'Compress',
      items: [
        {
          name: 'Compress Image',
          description: 'Reduce image file size while maintaining quality',
          icon: <Image size={32} />,
          path: '/tool/compress-image',
          formats: ['JPG', 'PNG', 'WebP', 'GIF'],
          maxSize: '10MB'
        },
        {
          name: 'Compress PDF',
          description: 'Reduce PDF file size for easier sharing',
          icon: <FileText size={32} />,
          path: '/tool/compress-pdf',
          formats: ['PDF'],
          maxSize: '10MB'
        },
        {
          name: 'Compress Video',
          description: 'Reduce video file size without losing quality',
          icon: <Video size={32} />,
          path: '/tool/compress-video',
          formats: ['MP4', 'AVI', 'MOV', 'MKV'],
          maxSize: '10MB'
        }
      ]
    },
    {
      category: 'Convert',
      items: [
        {
          name: 'Convert Audio',
          description: 'Convert between different audio formats',
          icon: <Music size={32} />,
          path: '/tool/convert-audio',
          formats: ['MP3', 'WAV', 'AAC', 'OGG', 'FLAC'],
          maxSize: '10MB'
        },
        {
          name: 'Convert Video',
          description: 'Convert videos to different formats',
          icon: <Film size={32} />,
          path: '/tool/convert-video',
          formats: ['MP4', 'AVI', 'MOV', 'MKV', 'WebM'],
          maxSize: '10MB'
        },
        {
          name: 'Convert Image',
          description: 'Convert images between different formats',
          icon: <ImageIcon size={32} />,
          path: '/tool/convert-image',
          formats: ['JPG', 'PNG', 'WebP', 'GIF', 'BMP'],
          maxSize: '10MB'
        }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Tools - ConvertFlix | File Compression & Conversion Tools</title>
        <meta name="description" content="Professional file compression and conversion tools. Compress images, PDFs, videos. Convert audio, video, and image formats. Free up to 10MB." />
        <meta name="keywords" content="file compression tools, file conversion tools, image compression, PDF compression, video compression, audio conversion" />
      </Helmet>

      <div className="tools-page">
        <div className="container">
          {/* Header */}
          <div className="tools-header">
            <h1 className="tools-title">File Processing Tools</h1>
            <p className="tools-subtitle">
              Professional-grade compression and conversion tools. All tools are free up to 10MB.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="tools-sections">
            {tools.map((category, categoryIndex) => (
              <div key={categoryIndex} className="tools-category">
                <h2 className="category-title">{category.category}</h2>
                <div className="tools-grid">
                  {category.items.map((tool, toolIndex) => (
                    <Link key={toolIndex} to={tool.path} className="tool-card">
                      <div className="tool-icon">{tool.icon}</div>
                      <div className="tool-content">
                        <h3 className="tool-name">{tool.name}</h3>
                        <p className="tool-description">{tool.description}</p>
                        <div className="tool-meta">
                          <div className="tool-formats">
                            <span className="meta-label">Formats:</span>
                            <span className="formats-list">{tool.formats.join(', ')}</span>
                          </div>
                          <div className="tool-size">
                            <span className="meta-label">Max Size:</span>
                            <span className="size-value">{tool.maxSize}</span>
                          </div>
                        </div>
                      </div>
                      <div className="tool-arrow">
                        <ArrowRight size={20} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Info Cards */}
          <div className="info-section">
            <div className="info-grid">
              <div className="info-card">
                <div className="info-icon">
                  <Shield size={32} />
                </div>
                <h3 className="info-title">Privacy First</h3>
                <p className="info-description">
                  Your files are automatically deleted after 24 hours. We never store or access your content.
                </p>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <Zap size={32} />
                </div>
                <h3 className="info-title">Lightning Fast</h3>
                <p className="info-description">
                  Process files in seconds with our optimized algorithms and cloud infrastructure.
                </p>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <Target size={32} />
                </div>
                <h3 className="info-title">Quality Preserved</h3>
                <p className="info-description">
                  Maintain original quality while reducing file size with intelligent compression.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="how-it-works">
            <h2 className="section-title">How It Works</h2>
            <div className="steps-grid">
              <div className="step">
                <div className="step-icon">
                  <Upload size={32} />
                </div>
                <h3 className="step-title">Upload File</h3>
                <p className="step-description">
                  Drag and drop your file or click to browse. Support for files up to 10MB.
                </p>
              </div>
              
              <div className="step">
                <div className="step-icon">
                  <Settings size={32} />
                </div>
                <h3 className="step-title">Process</h3>
                <p className="step-description">
                  Our servers process your file using advanced algorithms for optimal results.
                </p>
              </div>
              
              <div className="step">
                <div className="step-icon">
                  <Download size={32} />
                </div>
                <h3 className="step-title">Download</h3>
                <p className="step-description">
                  Download your processed file instantly. Link expires in 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Signup CTA */}
          <div className="signup-cta">
            <div className="cta-content">
              <div className="cta-icon">
                <CheckCircle size={48} />
              </div>
              <h2 className="cta-title">Need to process larger files?</h2>
              <p className="cta-description">
                Sign up for free to unlock unlimited file processing and larger file sizes up to 100MB.
              </p>
              <div className="cta-features">
                <div className="feature">
                  <CheckCircle size={20} />
                  <span>Up to 100MB files</span>
                </div>
                <div className="feature">
                  <CheckCircle size={20} />
                  <span>Unlimited processing</span>
                </div>
                <div className="feature">
                  <CheckCircle size={20} />
                  <span>Priority processing</span>
                </div>
              </div>
              <Link to="/signup" className="btn btn-primary btn-large">
                Sign Up Free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tools; 