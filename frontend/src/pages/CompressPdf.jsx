import React, { useState } from 'react';
import { useTheme } from '../App';
import './CompressPdf.css';

const CompressPdf = () => {
  const { theme } = useTheme();
  const [selectedFile, setSelectedFile] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState(80);
  const [outputFormat, setOutputFormat] = useState('PDF');
  const [isCompressing, setIsCompressing] = useState(false);
  const [result, setResult] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setResult(null);
      
      // Create PDF preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPdfPreview(e.target.result);
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

  const formatOptions = ['PDF', 'Optimized PDF', 'Compressed PDF'];

  return (
    <div className={`compress-pdf-container ${theme}`}>
      {/* Professional Header */}
      <section className="compress-header" style={{marginTop: '40px'}}>
        <div className="header-content">
          <h1 className="page-title">
            Professional PDF Compression
          </h1>
          <p className="page-description">
            Compress your PDF files while maintaining exceptional quality. Reduce file size without losing text clarity or image quality with advanced compression algorithms.
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
                <path d="M16 12h8v8h-8z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 18h20M14 24h16M14 30h12" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Upload Your PDF</h3>
            <p>Drag and drop or click to select a PDF file</p>
            <div className="supported-formats">
              <span className="format-tag">PDF</span>
              <span className="format-tag">Optimized</span>
              <span className="format-tag">Compressed</span>
            </div>
            <input
              id="file-input"
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </div>
          
          {selectedFile && (
            <div className="file-info">
              <div className="file-details">
                <div className="file-preview">
                  {pdfPreview && (
                    <div className="pdf-preview">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <rect x="6" y="6" width="36" height="36" rx="4" fill="#F59E0B" opacity="0.1"/>
                        <path d="M14 18h20M14 24h16M14 30h12" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M16 12h8v8h-8z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>PDF Document</span>
                    </div>
                  )}
                </div>
                <div className="file-text">
                  <h4>{selectedFile.name}</h4>
                  <p className="file-size">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  <span className="file-type">PDF</span>
                </div>
                <div className="file-actions">
                  <button className="remove-btn" onClick={() => {
                    setSelectedFile(null);
                    setPdfPreview(null);
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
              <p>Fine-tune your PDF compression for optimal quality and file size</p>
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
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="stat-label">Estimated Size</span>
                  <span className="stat-value">{(selectedFile.size * (compressionLevel / 100) / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <div className="preview-stat">
                  <div className="stat-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2v20M2 12h20" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
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
              <p>Your PDF has been successfully compressed</p>
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
                  <path d="M8 20h24M20 8l12 12-12 12" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="result-card compressed">
                <div className="card-header">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect x="4" y="4" width="24" height="24" rx="8" fill="#F59E0B" opacity="0.1"/>
                    <path d="M12 16l4 4 8-8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                    <path d="M16 4v24M4 16h24" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="stat-number">{result.reduction}%</span>
                <span className="stat-label">Size Reduction</span>
              </div>
              <div className="stat">
                <div className="stat-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M8 16h16M16 8l8 8-8 8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
              Download Compressed PDF
            </button>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2>Why Choose Our Professional PDF Compression?</h2>
            <p>Advanced PDF compression technology for the best quality and file size optimization</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <rect x="8" y="8" width="40" height="40" rx="12" fill="#F59E0B" opacity="0.1"/>
                  <path d="M20 28h16M28 20v16" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M16 12h8v8h-8z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Smart Compression</h3>
              <p>Uses advanced algorithms to reduce PDF size while preserving text quality and image clarity with professional-grade compression technology.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <rect x="8" y="8" width="40" height="40" rx="12" fill="#F59E0B" opacity="0.1"/>
                  <path d="M20 24l6 6 10-10" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 12h8v8h-8z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Quality Control</h3>
              <p>Fine-tune compression settings to balance file size and document quality according to your specific requirements and use cases.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <rect x="8" y="8" width="40" height="40" rx="12" fill="#D97706" opacity="0.1"/>
                  <path d="M16 24l6-6 6 6" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 12h8v8h-8z" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Fast Processing</h3>
              <p>Process PDF files quickly with our optimized compression engine designed for speed, efficiency, and professional results.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompressPdf; 