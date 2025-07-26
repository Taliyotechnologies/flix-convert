import React, { useState } from 'react';
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
        fileName: selectedFile.name,
        format: outputFormat
      });
      setIsCompressing(false);
    }, 3000);
  };

  const handleDownload = () => {
    // Simulate download
    alert('Download started!');
  };

  const formatOptions = ['JPG', 'PNG', 'WebP', 'AVIF'];

  return (
    <div className={`compress-image-container ${theme}`}>
      {/* Professional Header */}
      <section className="compress-header">
        <div className="header-content">
          <div className="header-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <rect x="8" y="8" width="64" height="64" rx="16" fill="#10B981" opacity="0.1"/>
              <path d="M24 24h32v32H24z" stroke="#10B981" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="32" cy="32" r="4" fill="#10B981"/>
              <path d="M24 48l8-8 4 4 8-8 8 8" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="page-title">
            Professional Image Compression
          </h1>
          <p className="page-description">
            Optimize your images with advanced compression algorithms. Reduce file sizes while maintaining visual quality across JPG, PNG, WebP, AVIF, and more formats.
          </p>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">Quality Retention</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">70%</span>
              <span className="stat-label">Size Reduction</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10+</span>
              <span className="stat-label">Image Formats</span>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="upload-section">
        <div className="upload-container">
          <div className="upload-area" onClick={() => document.getElementById('file-input').click()}>
            <div className="upload-icon">
              <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                <rect x="8" y="8" width="56" height="56" rx="16" fill="#10B981" opacity="0.1"/>
                <path d="M36 16v32M28 24l8-8 8 8" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Upload Your Image</h3>
            <p>Drag and drop or click to select an image for compression</p>
            <div className="supported-formats">
              <span className="format-tag">JPG</span>
              <span className="format-tag">PNG</span>
              <span className="format-tag">WebP</span>
              <span className="format-tag">AVIF</span>
              <span className="format-tag">GIF</span>
              <span className="format-tag">BMP</span>
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
                    <img src={imagePreview} alt="Preview" className="preview-image" />
                  )}
                </div>
                <div className="file-text">
                  <h4>{selectedFile.name}</h4>
                  <p className="file-size">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  <span className="file-type">{selectedFile.type.split('/')[1].toUpperCase()}</span>
                </div>
                <div className="file-actions">
                  <button className="remove-btn" onClick={() => {
                    setSelectedFile(null);
                    setImagePreview(null);
                  }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M13.5 4.5L4.5 13.5M4.5 4.5l9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
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
            <div className="settings-header">
              <h2>Compression Settings</h2>
              <p>Configure your image compression preferences for optimal results</p>
            </div>
            
            <div className="setting-group">
              <label htmlFor="compression-level">
                <span>Quality Level</span>
                <span className="quality-value">{compressionLevel}%</span>
              </label>
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
                {formatOptions.map((format) => (
                  <button 
                    key={format}
                    className={`format-btn ${outputFormat === format ? 'active' : ''}`}
                    onClick={() => setOutputFormat(format)}
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>

            <div className="compression-preview">
              <h3>Estimated Results</h3>
              <div className="preview-stats">
                <div className="preview-stat">
                  <div className="stat-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2v20M2 12h20" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="stat-label">Original Size</span>
                  <span className="stat-value">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <div className="preview-stat">
                  <div className="stat-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="stat-label">Estimated Size</span>
                  <span className="stat-value">{(selectedFile.size * (compressionLevel / 100) / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <div className="preview-stat">
                  <div className="stat-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2v20M2 12h20" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
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
                  <svg className="spinner" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="31.416" strokeDashoffset="31.416">
                      <animate attributeName="stroke-dashoffset" dur="1s" values="0;31.416" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                  Compressing...
                </>
              ) : (
                <>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Start Compression
                </>
              )}
            </button>
          </div>
        </section>
      )}

      {/* Results Section */}
      {result && (
        <section className="results-section">
          <div className="results-container">
            <div className="results-header">
              <h2>Compression Complete</h2>
              <p>Your image has been successfully compressed</p>
            </div>
            <div className="results-grid">
              <div className="result-card">
                <div className="card-header">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect x="4" y="4" width="24" height="24" rx="8" fill="#6B7280" opacity="0.1"/>
                    <path d="M12 12h8M12 16h8M12 20h6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <h3>Original</h3>
                </div>
                <div className="file-size">{(result.originalSize / 1024 / 1024).toFixed(2)} MB</div>
                <div className="file-name">{result.fileName}</div>
                <div className="file-format">Original Format</div>
              </div>
              <div className="result-arrow">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M8 20h24M20 8l12 12-12 12" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="result-card compressed">
                <div className="card-header">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect x="4" y="4" width="24" height="24" rx="8" fill="#10B981" opacity="0.1"/>
                    <path d="M12 16l4 4 8-8" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3>Compressed</h3>
                </div>
                <div className="file-size">{(result.compressedSize / 1024 / 1024).toFixed(2)} MB</div>
                <div className="reduction">-{result.reduction}%</div>
                <div className="file-format">{result.format}</div>
              </div>
            </div>
            
            <div className="compression-stats">
              <div className="stat">
                <div className="stat-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 4v24M4 16h24" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="stat-number">{result.reduction}%</span>
                <span className="stat-label">Size Reduction</span>
              </div>
              <div className="stat">
                <div className="stat-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M8 16h16M16 8l8 8-8 8" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="stat-number">{(result.originalSize - result.compressedSize) / 1024 / 1024} MB</span>
                <span className="stat-label">Space Saved</span>
              </div>
              <div className="stat">
                <div className="stat-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect x="4" y="4" width="24" height="24" rx="4" fill="#3B82F6" opacity="0.1"/>
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

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2>Why Choose Our Professional Image Compression?</h2>
            <p>Advanced technology meets user-friendly design for the best image compression experience</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <rect x="8" y="8" width="40" height="40" rx="12" fill="#10B981" opacity="0.1"/>
                  <path d="M20 28h16M28 20v16" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Smart Compression</h3>
              <p>Advanced algorithms analyze image content to reduce file size while preserving visual quality and important details.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <rect x="8" y="8" width="40" height="40" rx="12" fill="#10B981" opacity="0.1"/>
                  <path d="M20 24l6 6 10-10" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Quality Assurance</h3>
              <p>Fine-tune compression settings with real-time preview to achieve the perfect balance between file size and image quality.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <rect x="8" y="8" width="40" height="40" rx="12" fill="#0d9488" opacity="0.1"/>
                  <path d="M16 24l6-6 6 6" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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