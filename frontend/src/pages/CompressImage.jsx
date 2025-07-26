import React, { useState, useEffect } from 'react';
import { useTheme } from '../App';
import './CompressImage.css';

const CompressImage = () => {
  const { theme } = useTheme();
  const [selectedFile, setSelectedFile] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState(80);
  const [outputFormat, setOutputFormat] = useState('JPG');
  const [isCompressing, setIsCompressing] = useState(false);
  const [result, setResult] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [compressionProgress, setCompressionProgress] = useState(0);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setResult(null);
      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setResult(null);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleCompress = async () => {
    if (!selectedFile) return;
    setIsCompressing(true);
    setCompressionProgress(0);
    setUploadProgress(0);
    
    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    // Simulate compression process with progress
    setTimeout(() => {
      clearInterval(uploadInterval);
      setUploadProgress(100);
      
      const compressionInterval = setInterval(() => {
        setCompressionProgress(prev => {
          if (prev >= 100) {
            clearInterval(compressionInterval);
            const originalSize = selectedFile.size;
            const compressedSize = Math.round(originalSize * (compressionLevel / 100));
            const reduction = Math.round(((originalSize - compressedSize) / originalSize) * 100);
            setResult({
              originalSize,
              compressedSize,
              reduction,
              fileName: selectedFile.name,
              format: outputFormat
            });
            setIsCompressing(false);
            return 100;
          }
          return prev + 5;
        });
      }, 150);
    }, 1000);
  };

  const handleDownload = () => {
    // Simulate download
    alert('Download started!');
  };

  const formatOptions = [
    { name: 'JPG', icon: '🖼️', desc: 'Best for photos' },
    { name: 'PNG', icon: '📷', desc: 'Lossless quality' },
    { name: 'WebP', icon: '🌐', desc: 'Modern format' },
    { name: 'AVIF', icon: '🎨', desc: 'Next-gen format' }
  ];

  // Auto-reset progress when file changes
  useEffect(() => {
    setUploadProgress(0);
    setCompressionProgress(0);
  }, [selectedFile]);

  return (
    <div className={`compress-image-container ${theme}`}>
      {/* Enhanced Header with Animation */}
      <section className="compress-header">
        <div className="header-content">
          <div className="header-badge">
            <span className="badge-icon">🚀</span>
            <span>Professional Image Compression</span>
          </div>
          <h1 className="page-title">
            Transform Your Images
            <span className="title-highlight"> Instantly</span>
          </h1>
          <p className="page-description">
            Advanced AI-powered compression that reduces file sizes by up to 90% while preserving stunning visual quality. 
            Perfect for web, mobile, and professional use.
          </p>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">90%</span>
              <span className="stat-label">Size Reduction</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Formats Supported</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10M+</span>
              <span className="stat-label">Images Processed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Upload Section */}
      <section className="upload-section">
        <div className="upload-container">
          <div 
            className={`upload-area ${dragActive ? 'drag-active' : ''} ${selectedFile ? 'file-selected' : ''}`}
            onClick={() => document.getElementById('file-input').click()}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="upload-content">
              <div className="upload-icon">
                <div className="icon-container">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="36" fill="url(#gradient)" opacity="0.1"/>
                    <path d="M40 20v32M28 28l12-12 12 12" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F59E0B"/>
                        <stop offset="100%" stopColor="#D97706"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="icon-glow"></div>
                </div>
              </div>
              <h3>Drop Your Image Here</h3>
              <p>Or click to browse from your device</p>
              <div className="upload-features">
                <div className="feature-tag">
                  <span className="feature-icon">⚡</span>
                  <span>Lightning Fast</span>
                </div>
                <div className="feature-tag">
                  <span className="feature-icon">🔒</span>
                  <span>100% Secure</span>
                </div>
                <div className="feature-tag">
                  <span className="feature-icon">🎯</span>
                  <span>AI Optimized</span>
                </div>
              </div>
              <div className="supported-formats">
                <span className="format-tag">JPG</span>
                <span className="format-tag">PNG</span>
                <span className="format-tag">WebP</span>
                <span className="format-tag">AVIF</span>
                <span className="format-tag">GIF</span>
                <span className="format-tag">BMP</span>
              </div>
            </div>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </div>
          
          {selectedFile && (
            <div className="file-info">
              <div className="file-details">
                <div className="file-preview">
                  {imagePreview && (
                    <div className="preview-container">
                      <img src={imagePreview} alt="Preview" className="preview-image" />
                      <div className="preview-overlay">
                        <span className="preview-text">Preview</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="file-text">
                  <h4>{selectedFile.name}</h4>
                  <p className="file-size">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  <span className="file-type">{selectedFile.type.split('/')[1].toUpperCase()}</span>
                  <div className="file-meta">
                    <span className="meta-item">Ready to compress</span>
                  </div>
                </div>
                <div className="file-actions">
                  <button className="remove-btn" onClick={() => {
                    setSelectedFile(null);
                    setImagePreview(null);
                  }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Compression Settings */}
      {selectedFile && (
        <section className="compression-settings">
          <div className="settings-container">
            <div className="settings-header">
              <div className="header-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="8" fill="#F59E0B" opacity="0.1"/>
                  <path d="M16 24h16M24 16v16" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h2>Compression Settings</h2>
              <p>Fine-tune your compression for the perfect balance of quality and file size</p>
            </div>
            
            <div className="setting-group">
              <label htmlFor="compression-level">
                <span>Quality Level</span>
                <span className="quality-value">{compressionLevel}%</span>
              </label>
              <div className="slider-container">
                <input
                  id="compression-level"
                  type="range"
                  min="10"
                  max="100"
                  value={compressionLevel}
                  onChange={(e) => setCompressionLevel(parseInt(e.target.value))}
                  className="slider"
                />
                <div className="slider-track">
                  <div className="slider-fill" style={{width: `${compressionLevel}%`}}></div>
                </div>
              </div>
              <div className="quality-labels">
                <span>High Compression</span>
                <span>Balanced</span>
                <span>High Quality</span>
              </div>
            </div>
            
            <div className="format-options">
              <h3>Output Format</h3>
              <div className="format-buttons">
                {formatOptions.map((format) => (
                  <button 
                    key={format.name}
                    className={`format-btn ${outputFormat === format.name ? 'active' : ''}`}
                    onClick={() => setOutputFormat(format.name)}
                  >
                    <span className="format-icon">{format.icon}</span>
                    <div className="format-info">
                      <span className="format-name">{format.name}</span>
                      <span className="format-desc">{format.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="compression-preview">
              <h3>Estimated Results</h3>
              <div className="preview-stats">
                <div className="preview-stat">
                  <div className="stat-icon">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <circle cx="14" cy="14" r="12" fill="#6B7280" opacity="0.1"/>
                      <path d="M14 6v16M6 14h16" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="stat-label">Original Size</span>
                  <span className="stat-value">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <div className="preview-stat">
                  <div className="stat-icon">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <circle cx="14" cy="14" r="12" fill="#F59E0B" opacity="0.1"/>
                      <path d="M12 14l2 2 6-6" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="stat-label">Estimated Size</span>
                  <span className="stat-value">{(selectedFile.size * (compressionLevel / 100) / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <div className="preview-stat">
                  <div className="stat-icon">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <circle cx="14" cy="14" r="12" fill="#10B981" opacity="0.1"/>
                      <path d="M8 14l3 3 9-9" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="stat-label">Size Reduction</span>
                  <span className="stat-value reduction">-{Math.round(((selectedFile.size - (selectedFile.size * (compressionLevel / 100))) / selectedFile.size) * 100)}%</span>
                </div>
              </div>
            </div>
            
            <button 
              className="compress-btn"
              onClick={handleCompress}
              disabled={isCompressing}
            >
              {isCompressing ? (
                <>
                  <div className="progress-ring">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="31.416" strokeDashoffset="31.416">
                        <animate attributeName="stroke-dashoffset" dur="1s" values="0;31.416" repeatCount="indefinite"/>
                      </circle>
                    </svg>
                  </div>
                  <span>Compressing... {compressionProgress}%</span>
                </>
              ) : (
                <>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>Start Compression</span>
                </>
              )}
            </button>
            
            {isCompressing && (
              <div className="compression-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: `${compressionProgress}%`}}></div>
                </div>
                <div className="progress-steps">
                  <div className={`step ${uploadProgress >= 100 ? 'completed' : ''}`}>
                    <span className="step-icon">📤</span>
                    <span className="step-text">Uploading</span>
                  </div>
                  <div className={`step ${compressionProgress > 0 ? 'completed' : ''}`}>
                    <span className="step-icon">⚙️</span>
                    <span className="step-text">Processing</span>
                  </div>
                  <div className={`step ${compressionProgress >= 100 ? 'completed' : ''}`}>
                    <span className="step-icon">✅</span>
                    <span className="step-text">Complete</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
      
      {/* Enhanced Results Section */}
      {result && (
        <section className="results-section">
          <div className="results-container">
            <div className="results-header">
              <div className="success-icon">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="28" fill="#10B981" opacity="0.1"/>
                  <path d="M20 32l8 8 16-16" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2>Compression Complete!</h2>
              <p>Your image has been successfully compressed with optimal quality preservation</p>
            </div>
            
            <div className="results-grid">
              <div className="result-card original">
                <div className="card-header">
                  <div className="card-icon">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <rect x="4" y="4" width="24" height="24" rx="8" fill="#6B7280" opacity="0.1"/>
                      <path d="M12 12h8M12 16h8M12 20h6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3>Original</h3>
                </div>
                <div className="file-size">{(result.originalSize / 1024 / 1024).toFixed(2)} MB</div>
                <div className="file-name">{result.fileName}</div>
                <div className="file-format">Original Format</div>
              </div>
              
              <div className="result-arrow">
                <div className="arrow-container">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M8 20h24M20 8l12 12-12 12" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="arrow-glow"></div>
                </div>
              </div>
              
              <div className="result-card compressed">
                <div className="card-header">
                  <div className="card-icon">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <rect x="4" y="4" width="24" height="24" rx="8" fill="#F59E0B" opacity="0.1"/>
                      <path d="M12 16l4 4 8-8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3>Compressed</h3>
                </div>
                <div className="file-size">{(result.compressedSize / 1024 / 1024).toFixed(2)} MB</div>
                <div className="reduction">-{result.reduction}%</div>
                <div className="file-format">{result.format}</div>
                <div className="savings-badge">
                  <span>Saved {(result.originalSize - result.compressedSize) / 1024 / 1024} MB</span>
                </div>
              </div>
            </div>
            
            <div className="compression-stats">
              <div className="stat">
                <div className="stat-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="14" fill="#F59E0B" opacity="0.1"/>
                    <path d="M16 4v24M4 16h24" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="stat-number">{result.reduction}%</span>
                <span className="stat-label">Size Reduction</span>
              </div>
              <div className="stat">
                <div className="stat-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="14" fill="#10B981" opacity="0.1"/>
                    <path d="M8 16h16M16 8l8 8-8 8" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="stat-number">{(result.originalSize - result.compressedSize) / 1024 / 1024} MB</span>
                <span className="stat-label">Space Saved</span>
              </div>
              <div className="stat">
                <div className="stat-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="14" fill="#3B82F6" opacity="0.1"/>
                    <rect x="8" y="8" width="16" height="16" rx="4" fill="#3B82F6" opacity="0.1"/>
                    <path d="M12 12h8M12 16h8M12 20h6" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="stat-number">{result.format}</span>
                <span className="stat-label">Output Format</span>
              </div>
            </div>
            
            <button className="download-btn" onClick={handleDownload}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2v16M6 12l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download Compressed Image
            </button>
          </div>
        </section>
      )}
      
      {/* Enhanced Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2>Why Choose Our Professional Image Compression?</h2>
            <p>Advanced technology meets user-friendly design for the best image compression experience</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <div className="icon-wrapper">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <rect x="8" y="8" width="40" height="40" rx="12" fill="url(#featureGradient1)" opacity="0.1"/>
                    <path d="M20 28h16M28 20v16" stroke="url(#featureGradient1)" strokeWidth="2.5" strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="featureGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F59E0B"/>
                        <stop offset="100%" stopColor="#D97706"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <h3>Smart Compression</h3>
              <p>Advanced algorithms analyze image content to reduce file size while preserving visual quality and important details.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <div className="icon-wrapper">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <rect x="8" y="8" width="40" height="40" rx="12" fill="url(#featureGradient2)" opacity="0.1"/>
                    <path d="M20 24l6 6 10-10" stroke="url(#featureGradient2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                      <linearGradient id="featureGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10B981"/>
                        <stop offset="100%" stopColor="#059669"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <h3>Quality Assurance</h3>
              <p>Fine-tune compression settings with real-time preview to achieve the perfect balance between file size and image quality.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <div className="icon-wrapper">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <rect x="8" y="8" width="40" height="40" rx="12" fill="url(#featureGradient3)" opacity="0.1"/>
                    <path d="M16 24l6-6 6 6" stroke="url(#featureGradient3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                      <linearGradient id="featureGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6"/>
                        <stop offset="100%" stopColor="#2563EB"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <h3>Lightning Fast</h3>
              <p>Optimized processing engine delivers rapid compression results without compromising on quality or security.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompressImage; 