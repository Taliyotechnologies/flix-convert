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
    { value: 'PNG', label: 'PNG', desc: 'Portable Network Graphics' },
    { value: 'JPEG', label: 'JPEG', desc: 'Joint Photographic Experts Group' },
    { value: 'WebP', label: 'WebP', desc: 'Web Picture format' },
    { value: 'GIF', label: 'GIF', desc: 'Graphics Interchange Format' },
    { value: 'BMP', label: 'BMP', desc: 'Bitmap Picture' },
    { value: 'TIFF', label: 'TIFF', desc: 'Tagged Image File Format' }
  ];

  return (
    <div className={`convert-image-container ${theme}`}>
      {/* Professional Header */}
      <section className="convert-header" style={{marginTop: '40px'}}>
        <div className="header-content">
          <h1 className="page-title">
            Image Converter
          </h1>
          <p className="page-description">
            Convert your images to different formats. Support for PNG, JPEG, WebP, GIF, BMP, TIFF, and more formats.
          </p>
        </div>
      </section>

      {/* Upload Section */}
      <section className="upload-section">
        <div className="upload-container">
          <div className="upload-area" onClick={() => document.getElementById('file-input').click()}>
            <div className="upload-icon">
              <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                <rect x="8" y="8" width="56" height="56" rx="16" fill="#F59E0B" opacity="0.1"/>
                <path d="M36 16v32M28 24l8-8 8 8" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Upload Your Image</h3>
            <p>Drag and drop or click to select an image for conversion</p>
            <div className="supported-formats">
              <span className="format-tag">PNG</span>
              <span className="format-tag">JPEG</span>
              <span className="format-tag">WebP</span>
              <span className="format-tag">GIF</span>
              <span className="format-tag">BMP</span>
              <span className="format-tag">TIFF</span>
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

      {/* Conversion Settings */}
      {selectedFile && (
        <section className="conversion-settings">
          <div className="settings-container">
            <div className="settings-header">
              <h2>Conversion Settings</h2>
              <p>Choose your desired output format for the best results</p>
            </div>
            <div className="format-options">
              <h3>Output Format</h3>
              <div className="format-buttons">
                {formatOptions.map((format) => (
                  <button
                    key={format.value}
                    className={`format-btn ${outputFormat === format.value ? 'active' : ''}`}
                    onClick={() => setOutputFormat(format.value)}
                  >
                    <span className="format-label">{format.label}</span>
                    <span className="format-desc">{format.desc}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="conversion-preview">
              <h3>Conversion Preview</h3>
              <div className="preview-stats">
                <div className="preview-stat">
                  <span className="stat-label">Original Format</span>
                  <span className="stat-value">{selectedFile.type.split('/')[1].toUpperCase()}</span>
                </div>
                <div className="preview-stat">
                  <span className="stat-label">Target Format</span>
                  <span className="stat-value">{outputFormat}</span>
                </div>
                <div className="preview-stat">
                  <span className="stat-label">File Size</span>
                  <span className="stat-value">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              </div>
            </div>
            <button
              className="convert-btn"
              onClick={handleConvert}
              disabled={isConverting}
            >
              {isConverting ? (
                <>
                  <svg className="spinner" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="31.416" strokeDashoffset="31.416">
                      <animate attributeName="stroke-dashoffset" dur="1s" values="0;31.416" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                  Converting...
                </>
              ) : (
                <>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Convert Image
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
              <h2>Conversion Results</h2>
            </div>
            <div className="results-grid">
              <div className="result-card">
                <h3>Original</h3>
                <div className="file-size">{(result.originalSize / 1024 / 1024).toFixed(2)} MB</div>
                <div className="file-name">{result.fileName}</div>
                <div className="file-format">{result.originalFormat}</div>
              </div>
              <div className="result-arrow">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M8 16h16M16 8l8 8-8 8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="result-card converted">
                <h3>Converted</h3>
                <div className="file-size">{(result.convertedSize / 1024 / 1024).toFixed(2)} MB</div>
                <div className="file-name">{result.fileName}</div>
                <div className="file-format">{result.format}</div>
              </div>
            </div>
            <div className="conversion-stats">
              <div className="stat">
                <span className="stat-number">{result.originalFormat}</span>
                <span className="stat-label">Original Format</span>
              </div>
              <div className="stat">
                <span className="stat-number">{result.format}</span>
                <span className="stat-label">New Format</span>
              </div>
              <div className="stat">
                <span className="stat-number">{(result.originalSize - result.convertedSize) / 1024 / 1024} MB</span>
                <span className="stat-label">Size Difference</span>
              </div>
            </div>
            <button className="download-btn" onClick={handleDownload}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2v16M6 12l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download Converted Image
            </button>
          </div>
        </section>
      )}
      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2>Why Choose Our Image Conversion?</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <rect x="8" y="8" width="40" height="40" rx="12" fill="#F59E0B" opacity="0.1"/>
                  <path d="M20 28h16M28 20v16" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Multiple Formats</h3>
              <p>Convert between PNG, JPEG, WebP, GIF, BMP, TIFF and more formats with ease.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <rect x="8" y="8" width="40" height="40" rx="12" fill="#F59E0B" opacity="0.1"/>
                  <path d="M20 24l6 6 10-10" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Quality Preservation</h3>
              <p>Maintain image quality while converting between different formats and optimizing file size.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <rect x="8" y="8" width="40" height="40" rx="12" fill="#D97706" opacity="0.1"/>
                  <path d="M16 24l6-6 6 6" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Fast Processing</h3>
              <p>Convert images quickly with our optimized conversion engine designed for speed and efficiency.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConvertImage; 