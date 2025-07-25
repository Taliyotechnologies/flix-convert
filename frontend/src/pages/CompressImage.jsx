import React, { useState } from 'react';
import { useTheme } from '../App';
import './CompressImage.css';

const CompressImage = () => {
  const { theme } = useTheme();
  const [selectedFile, setSelectedFile] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState(80);
  const [isCompressing, setIsCompressing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setResult(null);
    }
  };

  const handleCompress = async () => {
    if (!selectedFile) return;
    
    setIsCompressing(true);
    
    // Simulate compression process
    setTimeout(() => {
      const originalSize = selectedFile.size;
      const compressedSize = Math.round(originalSize * (compressionLevel / 100));
      const reduction = Math.round(((originalSize - compressedSize) / originalSize) * 100);
      
      setResult({
        originalSize,
        compressedSize,
        reduction,
        fileName: selectedFile.name
      });
      setIsCompressing(false);
    }, 3000);
  };

  const handleDownload = () => {
    // Simulate download
    alert('Download started!');
  };

  return (
    <div className={`compress-image-container ${theme}`}>
      {/* Hero Section */}
      <section className="compress-image-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Image Compression
            <span className="gradient-text"> Tool</span>
          </h1>
          <p className="hero-description">
            Compress your images while maintaining excellent quality. Support for JPG, PNG, WebP, and more formats.
          </p>
          <div className="hero-features">
            <div className="feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Quality Preservation</span>
            </div>
            <div className="feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Fast Processing</span>
            </div>
            <div className="feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Multiple Formats</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="image-preview">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <rect x="20" y="20" width="80" height="80" rx="12" fill="#3B82F6" opacity="0.1"/>
              <path d="M32 40l8 8 12-12 8 8v16H32V40z" fill="#3B82F6"/>
              <circle cx="44" cy="36" r="3" fill="#ffffff"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="upload-section">
        <div className="upload-container">
          <div className="upload-area" onClick={() => document.getElementById('file-input').click()}>
            <div className="upload-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <rect x="8" y="8" width="48" height="48" rx="12" fill="#3B82F6" opacity="0.1"/>
                <path d="M32 16v24M24 24l8-8 8 8" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Upload Your Image</h3>
            <p>Drag and drop or click to select an image file</p>
            <span className="file-types">Supports: JPG, PNG, WebP, GIF</span>
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
                <div className="file-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect x="6" y="6" width="20" height="20" rx="4" fill="#3B82F6" opacity="0.1"/>
                    <path d="M12 14l3 3 5-5" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="file-text">
                  <h4>{selectedFile.name}</h4>
                  <p>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Compression Settings */}
      {selectedFile && (
        <section className="compression-settings">
          <div className="settings-container">
            <h2>Compression Settings</h2>
            <div className="setting-group">
              <label htmlFor="compression-level">Quality Level: {compressionLevel}%</label>
              <input
                id="compression-level"
                type="range"
                min="10"
                max="100"
                value={compressionLevel}
                onChange={(e) => setCompressionLevel(parseInt(e.target.value))}
                className="slider"
              />
              <div className="quality-labels">
                <span>High Compression</span>
                <span>Balanced</span>
                <span>High Quality</span>
              </div>
            </div>
            
            <div className="format-options">
              <h3>Output Format</h3>
              <div className="format-buttons">
                <button className="format-btn active">JPG</button>
                <button className="format-btn">PNG</button>
                <button className="format-btn">WebP</button>
              </div>
            </div>
            
            <button 
              className="compress-btn"
              onClick={handleCompress}
              disabled={isCompressing}
            >
              {isCompressing ? (
                <>
                  <svg className="spinner" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="12.566" strokeDashoffset="12.566">
                      <animate attributeName="stroke-dashoffset" dur="1s" values="0;12.566" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                  Compressing...
                </>
              ) : (
                'Compress Image'
              )}
            </button>
          </div>
        </section>
      )}

      {/* Results Section */}
      {result && (
        <section className="results-section">
          <div className="results-container">
            <h2>Compression Results</h2>
            <div className="results-grid">
              <div className="result-card">
                <h3>Original</h3>
                <div className="file-size">{(result.originalSize / 1024 / 1024).toFixed(2)} MB</div>
                <div className="file-name">{result.fileName}</div>
              </div>
              <div className="result-arrow">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M8 16h16M16 8l8 8-8 8" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="result-card compressed">
                <h3>Compressed</h3>
                <div className="file-size">{(result.compressedSize / 1024 / 1024).toFixed(2)} MB</div>
                <div className="reduction">-{result.reduction}%</div>
              </div>
            </div>
            
            <div className="compression-stats">
              <div className="stat">
                <span className="stat-number">{result.reduction}%</span>
                <span className="stat-label">Size Reduction</span>
              </div>
              <div className="stat">
                <span className="stat-number">{(result.originalSize - result.compressedSize) / 1024 / 1024} MB</span>
                <span className="stat-label">Space Saved</span>
              </div>
            </div>
            
            <button className="download-btn" onClick={handleDownload}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2v12M6 10l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download Compressed Image
            </button>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2>Why Choose Our Image Compression?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="8" fill="#3B82F6" opacity="0.1"/>
                  <path d="M16 24h16M24 16v16" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Smart Compression</h3>
              <p>Uses advanced algorithms to reduce file size while preserving image quality and details.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="8" fill="#10B981" opacity="0.1"/>
                  <path d="M16 20l4 4 8-8" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Quality Control</h3>
              <p>Fine-tune compression settings to balance file size and image quality according to your needs.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="8" fill="#F59E0B" opacity="0.1"/>
                  <path d="M12 20l4-4 4 4" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Fast Processing</h3>
              <p>Process images quickly with our optimized compression engine designed for speed and efficiency.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompressImage; 