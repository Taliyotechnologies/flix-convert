import React, { useState } from 'react';
import { useTheme } from '../App';
import './ConvertPdf.css';

const ConvertPdf = () => {
  const { theme } = useTheme();
  const [selectedFile, setSelectedFile] = useState(null);
  const [outputFormat, setOutputFormat] = useState('DOCX');
  const [isConverting, setIsConverting] = useState(false);
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

  const handleConvert = async () => {
    if (!selectedFile) return;
    
    setIsConverting(true);
    
    // Simulate conversion process
    setTimeout(() => {
      const originalSize = selectedFile.size;
      const convertedSize = Math.round(originalSize * 0.85); // Simulate size change
      
      setResult({
        originalSize,
        convertedSize,
        originalFormat: 'PDF',
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
    { value: 'DOCX', label: 'Word Document', icon: '📄', desc: 'Microsoft Word format' },
    { value: 'TXT', label: 'Text File', icon: '📝', desc: 'Plain text format' },
    { value: 'HTML', label: 'Web Page', icon: '🌐', desc: 'Web format' },
    { value: 'RTF', label: 'Rich Text', icon: '📋', desc: 'Rich text format' },
    { value: 'EPUB', label: 'E-Book', icon: '📚', desc: 'E-book format' },
    { value: 'MOBI', label: 'Kindle', icon: '📖', desc: 'Kindle format' }
  ];

  return (
    <div className={`convert-pdf-container ${theme}`}>
      {/* Header Section */}
      <section className="convert-header">
        <div className="header-content">
          <div className="header-icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <rect x="8" y="8" width="48" height="48" rx="12" fill="#EF4444" opacity="0.1"/>
              <rect x="16" y="12" width="24" height="32" rx="4" stroke="#EF4444" strokeWidth="2"/>
              <path d="M20 20h16M20 24h16M20 28h12" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="page-title">PDF Converter</h1>
          <p className="page-description">
            Convert your PDF files to different formats. Support for Word, Text, HTML, RTF, EPUB, MOBI and more formats.
          </p>
        </div>
      </section>

      {/* Upload Section */}
      <section className="upload-section">
        <div className="upload-container">
          <div className="upload-area" onClick={() => document.getElementById('file-input').click()}>
            <div className="upload-icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <rect x="12" y="12" width="56" height="56" rx="16" fill="#EF4444" opacity="0.1"/>
                <path d="M40 20v32M28 32l12-12 12 12" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Upload Your PDF</h3>
            <p>Drag and drop or click to select a PDF file</p>
            <span className="file-types">Supports: PDF files only</span>
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
                  <div className="pdf-preview">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <rect x="8" y="8" width="32" height="32" rx="6" fill="#EF4444" opacity="0.1"/>
                      <rect x="12" y="12" width="16" height="20" rx="2" stroke="#EF4444" strokeWidth="2"/>
                      <path d="M16 18h8M16 22h8M16 26h6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>PDF Preview</span>
                  </div>
                </div>
                <div className="file-text">
                  <h4>{selectedFile.name}</h4>
                  <p>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  <span className="file-type">PDF</span>
                </div>
                <div className="file-actions">
                  <button className="remove-btn" onClick={() => {
                    setSelectedFile(null);
                    setPdfPreview(null);
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
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
            <h2>Conversion Settings</h2>
            
            <div className="format-options">
              <h3>Output Format</h3>
              <div className="format-grid">
                {formatOptions.map((format) => (
                  <div 
                    key={format.value}
                    className={`format-card ${outputFormat === format.value ? 'active' : ''}`}
                    onClick={() => setOutputFormat(format.value)}
                  >
                    <span className="format-icon">{format.icon}</span>
                    <span className="format-label">{format.label}</span>
                    <span className="format-desc">{format.desc || format.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="conversion-preview">
              <h3>Conversion Preview</h3>
              <div className="preview-stats">
                <div className="preview-stat">
                  <span className="stat-label">Original Format</span>
                  <span className="stat-value">PDF</span>
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
                  <svg className="spinner" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="12.566" strokeDashoffset="12.566">
                      <animate attributeName="stroke-dashoffset" dur="1s" values="0;12.566" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                  Converting...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Convert PDF
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
            <h2>Conversion Results</h2>
            <div className="results-grid">
              <div className="result-card">
                <h3>Original</h3>
                <div className="file-size">{(result.originalSize / 1024 / 1024).toFixed(2)} MB</div>
                <div className="file-name">{result.fileName}</div>
                <div className="file-format">{result.originalFormat}</div>
              </div>
              <div className="result-arrow">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M8 16h16M16 8l8 8-8 8" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2v12M6 10l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download Converted File
            </button>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2>Why Choose Our PDF Conversion?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="8" fill="#3B82F6" opacity="0.1"/>
                  <path d="M16 24h16M24 16v16" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Multiple Formats</h3>
              <p>Convert PDFs to Word, Text, HTML, RTF, EPUB, MOBI and more formats with ease.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="8" fill="#10B981" opacity="0.1"/>
                  <path d="M16 20l4 4 8-8" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Text Preservation</h3>
              <p>Maintain text formatting and layout while converting between different document formats.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="8" fill="#F59E0B" opacity="0.1"/>
                  <path d="M12 20l4-4 4 4" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Fast Processing</h3>
              <p>Convert PDFs quickly with our optimized conversion engine designed for speed and accuracy.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConvertPdf; 