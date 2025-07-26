import React, { useState } from 'react';
import { useTheme } from '../App';
import './ConvertImage.css';

const ConvertImage = () => {
  const { theme } = useTheme();
  const [selectedFile, setSelectedFile] = useState(null);
  const [outputFormat, setOutputFormat] = useState('PNG');
  const [isConverting, setIsConverting] = useState(false);
  const [result, setResult] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleConvert = async () => {
    if (!selectedFile) return;
    
    setIsConverting(true);
    
    // Simulate conversion process
    setTimeout(() => {
      const originalSize = selectedFile.size;
      const convertedSize = Math.round(originalSize * 0.9); // Simulate size change
      
      setResult({
        originalSize,
        convertedSize,
        originalFormat: selectedFile.type.split('/')[1].toUpperCase(),
        fileName: selectedFile.name.replace(/\.[^/.]+$/, ''), // Remove extension
        format: outputFormat
      });
      setIsConverting(false);
    }, 3000);
  };

  const handleDownload = () => {
    // Simulate download
    alert('Download started!');
  };

  const formatOptions = [
    { value: 'PNG', label: 'PNG Image', icon: '🖼️', desc: 'Lossless compression', color: '#3B82F6' },
    { value: 'JPEG', label: 'JPEG Image', icon: '📷', desc: 'High compression', color: '#10B981' },
    { value: 'WebP', label: 'WebP Image', icon: '🌐', desc: 'Modern web format', color: '#F59E0B' },
    { value: 'GIF', label: 'GIF Animation', icon: '🎬', desc: 'Animated images', color: '#EF4444' },
    { value: 'BMP', label: 'Bitmap Image', icon: '🖼️', desc: 'Uncompressed', color: '#8B5CF6' },
    { value: 'TIFF', label: 'TIFF Image', icon: '📄', desc: 'High quality', color: '#06B6D4' }
  ];

  return (
    <div className={`convert-image-container ${theme}`}>
      {/* Modern Header */}
      <section className="convert-header">
        <div className="header-content">
          <div className="header-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <rect x="12" y="12" width="56" height="56" rx="16" fill="#3B82F6" opacity="0.1"/>
              <rect x="20" y="20" width="40" height="40" rx="8" fill="#3B82F6" opacity="0.2"/>
              <path d="M28 28h24v24H28z" stroke="#3B82F6" strokeWidth="2"/>
              <path d="M32 32h16v16H32z" fill="#3B82F6" opacity="0.3"/>
              <path d="M40 24v16M32 32h16" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="52" cy="28" r="4" fill="#3B82F6"/>
              <path d="M50 26l2 2 2-2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="page-title">Image Converter</h1>
          <p className="page-description">
            Convert your images to different formats with lightning speed and exceptional quality. 
            Support for PNG, JPEG, WebP, GIF, BMP, TIFF, and more formats.
          </p>
        </div>
      </section>

      {/* Upload Section */}
      <section className="upload-section">
        <div className="upload-container">
          <div className="upload-area" onClick={() => document.getElementById('file-input').click()}>
            <div className="upload-icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <rect x="12" y="12" width="56" height="56" rx="16" fill="#3B82F6" opacity="0.1"/>
                <path d="M40 20v32M28 32l12-12 12 12" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Upload Your Image</h3>
            <p>Drag and drop or click to select an image file</p>
            <span className="file-types">Supports: PNG, JPEG, WebP, GIF, BMP, TIFF</span>
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
              <div className="file-preview">
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="preview-image" />
                )}
              </div>
              <div className="file-details">
                <h4>{selectedFile.name}</h4>
                <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                <p>Type: {selectedFile.type.split('/')[1].toUpperCase()}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Format Selection */}
      {selectedFile && (
        <section className="format-section">
          <div className="format-container">
            <h3>Select Output Format</h3>
            <div className="format-grid">
              {formatOptions.map((format) => (
                <div
                  key={format.value}
                  className={`format-option ${outputFormat === format.value ? 'selected' : ''}`}
                  onClick={() => setOutputFormat(format.value)}
                  style={{ '--format-color': format.color }}
                >
                  <div className="format-icon">{format.icon}</div>
                  <div className="format-info">
                    <h4>{format.label}</h4>
                    <p>{format.desc}</p>
                  </div>
                  <div className="format-check">
                    {outputFormat === format.value && (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="8" fill="currentColor"/>
                        <path d="M7 10l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Convert Button */}
      {selectedFile && !result && (
        <section className="convert-section">
          <div className="convert-container">
            <button
              className="convert-btn"
              onClick={handleConvert}
              disabled={isConverting}
            >
              {isConverting ? (
                <>
                  <div className="spinner"></div>
                  Converting...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Convert Image
                </>
              )}
            </button>
          </div>
        </section>
      )}

      {/* Result Section */}
      {result && (
        <section className="result-section">
          <div className="result-container">
            <div className="result-header">
              <h3>Conversion Complete!</h3>
              <p>Your image has been successfully converted to {result.format}</p>
            </div>
            
            <div className="result-cards">
              <div className="result-card original">
                <h4>Original</h4>
                <div className="file-size">{(result.originalSize / 1024 / 1024).toFixed(2)} MB</div>
                <div className="file-format">{result.originalFormat}</div>
              </div>
              
              <div className="result-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12h16M12 4l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              <div className="result-card converted">
                <h4>Converted</h4>
                <div className="file-size">{(result.convertedSize / 1024 / 1024).toFixed(2)} MB</div>
                <div className="file-format">{result.format}</div>
              </div>
            </div>
            
            <div className="result-stats">
              <div className="stat-item">
                <span className="stat-label">Size Reduced</span>
                <span className="stat-number">{(result.originalSize - result.convertedSize) / 1024 / 1024} MB</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Compression</span>
                <span className="stat-number">{Math.round((1 - result.convertedSize / result.originalSize) * 100)}%</span>
              </div>
            </div>
            
            <button className="download-btn" onClick={handleDownload}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2v12M6 10l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download Converted Image
            </button>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h3>Why Choose Our Image Converter?</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h4>Lightning Fast</h4>
              <p>Convert between PNG, JPEG, WebP, GIF, BMP, TIFF and more formats with ease.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h4>High Quality</h4>
              <p>Maintain image quality while converting between different formats and optimizing file size.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h4>Secure & Private</h4>
              <p>Convert images quickly with our optimized conversion engine designed for speed and efficiency.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConvertImage; 