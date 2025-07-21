import React, { useRef, useState } from 'react';
import { compressionAPI, fileAPI, formatFileSize, formatCompressionRatio } from '../utils/api';
import './PDFCompress.css';
import { useAuth } from '../context/AuthContext';

const MAX_FREE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

function truncateFileName(name, maxLength = 20) {
  if (name.length <= maxLength) return name;
  const extIndex = name.lastIndexOf('.');
  if (extIndex === -1 || extIndex === 0) return name.slice(0, maxLength - 3) + '...';
  const ext = name.slice(extIndex);
  const base = name.slice(0, maxLength - ext.length - 3);
  return base + '...' + ext;
}

export default function PDFCompress() {
  const { user } = useAuth();
  const [pdfs, setPdfs] = useState([]);
  const [compressed, setCompressed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [largeFiles, setLargeFiles] = useState([]);
  const fileInput = useRef();
  const [showSignupRequired, setShowSignupRequired] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);

  const handleFiles = files => {
    const fileArr = Array.from(files).filter(f => f.type === 'application/pdf');
    if (!user) {
      // Only non-logged-in users are limited
      const largeFilesArr = fileArr.filter(f => f.size > MAX_FREE_SIZE);
      const smallFilesArr = fileArr.filter(f => f.size <= MAX_FREE_SIZE);
      if (largeFilesArr.length > 0) {
        setLargeFiles(largeFilesArr);
        setShowSignupPopup(true);
        return;
      }
      setPdfs(prev => [...prev, ...smallFilesArr]);
    } else {
      // Logged-in users: no limit
      setPdfs(prev => [...prev, ...fileArr]);
    }
    setError(''); // Clear any previous errors
    
    // Clear file input to allow re-selecting same file
    if (fileInput.current) {
      fileInput.current.value = '';
    }
    // Force re-render of file input
    setFileInputKey(prev => prev + 1);
  };

  const handleDrop = e => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = idx => {
    setPdfs(pdfs => pdfs.filter((_, i) => i !== idx));
  };

  const handleSignupPopupClose = () => {
    setShowSignupPopup(false);
    setLargeFiles([]);
  };

  const handleSignupPopupProceed = () => {
    // Add large files to pdfs list
    setPdfs(prev => [...prev, ...largeFiles]);
    setShowSignupPopup(false);
    setLargeFiles([]);
  };

  const handleCompress = async () => {
    setLoading(true);
    setError('');
    setCompressed([]);

    try {
      const compressionResults = [];

      for (const pdf of pdfs) {
        try {
          const result = await compressionAPI.compressPDF(pdf);
          compressionResults.push({
            originalName: pdf.name,
            originalSize: pdf.size,
            compressedSize: result.data.compressedSize,
            compressionRatio: result.data.compressionRatio,
            downloadUrl: result.data.downloadUrl,
            fileId: result.data.fileId,
            originalFile: pdf // Store original file for comparison
          });
        } catch (err) {
          console.error(`Failed to compress ${pdf.name}:`, err);
          compressionResults.push({
            originalName: pdf.name,
            error: err.message
          });
        }
      }

      setCompressed(compressionResults);
    } catch (error) {
      setError('Compression failed. Please try again.');
      console.error('Compression error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (result) => {
    if (result.error) return;
    
    const downloadUrl = fileAPI.downloadFile(result.downloadUrl.split('/').pop());
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = result.originalName.replace(/(\.[^.]+)?$/, '_compressed$1');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="pdfcompress-main">
      <section className="pdfcompress-card">
        <div className="pdfcompress-header">
          <span className="pdfcompress-icon" aria-hidden="true">
            {/* PDF SVG */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="16" rx="3" fill="#6c63ff" fillOpacity="0.13"/>
              <rect x="7" y="8" width="10" height="8" rx="2" fill="#ffb86c" fillOpacity="0.22"/>
              <rect x="9" y="12" width="6" height="2" rx="1" fill="#6c63ff"/>
            </svg>
          </span>
          <h1 className="pdfcompress-title">PDF Compressor</h1>
          <p className="pdfcompress-desc">Compress your PDF files quickly and efficiently. Upload, compress, and download all in one place.</p>
        </div>
        
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        <div
          className="pdfcompress-upload"
          onClick={() => fileInput.current.click()}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
        >
          <input
            type="file"
            accept="application/pdf"
            multiple
            style={{ display: 'none' }}
            ref={fileInput}
            onChange={e => handleFiles(e.target.files)}
            key={fileInputKey}
          />
          <span className="upload-svg" aria-hidden="true">
            {/* Upload SVG */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="16" width="16" height="3" rx="1.5" fill="#6c63ff" fillOpacity="0.13"/>
              <path d="M12 17V5" stroke="#6c63ff" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M8 9l4-4 4 4" stroke="#6c63ff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="upload-text">Drag & drop or <span className="upload-link">browse</span> PDFs</span>
          <div className="file-limit-msg">
            {user ? (
              <span>Limit: <b>Unlimited</b></span>
            ) : (
              <span>Free: Up to 10 MB. <a href="/signin" className="file-limit-link">Sign up for larger files</a>.</span>
            )}
          </div>
        </div>
        
        {pdfs.length > 0 && (
          <div className="pdf-list">
            {pdfs.map((pdf, idx) => (
              <div className="pdf-item" key={idx}>
                <div className="pdf-thumb">
                  <div className="pdf-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="4" width="18" height="16" rx="3" fill="#ff4d4f" fillOpacity="0.1"/>
                      <rect x="7" y="8" width="10" height="8" rx="2" fill="#ff4d4f" fillOpacity="0.2"/>
                      <rect x="9" y="12" width="6" height="2" rx="1" fill="#ff4d4f"/>
                    </svg>
                  </div>
                </div>
                <div className="pdf-info">
                  <span className="pdf-name">{pdf.name}</span>
                  <span className="pdf-size">{formatFileSize(pdf.size)}</span>
                </div>
                <button className="pdf-remove" onClick={e => { e.stopPropagation(); handleRemove(idx); }} title="Remove">
                  {/* X SVG */}
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="5" y1="5" x2="13" y2="13" stroke="#ff4d4f" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="13" y1="5" x2="5" y2="13" stroke="#ff4d4f" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
        
        <button
          className="pdfcompress-btn"
          onClick={handleCompress}
          disabled={pdfs.length === 0 || loading}
        >
          {loading ? 'Compressing...' : 'Compress PDFs'}
        </button>
        
        {compressed.length > 0 && (
          <div className="pdfcompress-results">
            <h2 className="results-title">Compression Results</h2>
            <div className="results-grid">
              {compressed.map((result, idx) => (
                <div key={idx} className="result-card">
                  {result.error ? (
                    <div className="result-error">
                      <span className="error-icon">❌</span>
                      <span className="error-text">{result.originalName} - {result.error}</span>
                    </div>
                  ) : (
                    <>
                      <div className="comparison-container">
                        {/* Original PDF */}
                        <div className="pdf-comparison">
                          <div className="pdf-label">Original</div>
                          <div className="pdf-preview-container">
                            <div className="pdf-preview">
                              <div className="pdf-icon-large">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <rect x="3" y="4" width="18" height="16" rx="3" fill="#ff4d4f" fillOpacity="0.1"/>
                                  <rect x="7" y="8" width="10" height="8" rx="2" fill="#ff4d4f" fillOpacity="0.2"/>
                                  <rect x="9" y="12" width="6" height="2" rx="1" fill="#ff4d4f"/>
                                </svg>
                              </div>
                              <div className="pdf-preview-text">PDF Document</div>
                            </div>
                          </div>
                          <div className="file-info">
                            <div className="file-name">{truncateFileName(result.originalName)}</div>
                            <div className="file-size">{formatFileSize(result.originalSize)}</div>
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="comparison-arrow">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#6c63ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>

                        {/* Compressed PDF */}
                        <div className="pdf-comparison">
                          <div className="pdf-label">Compressed</div>
                          <div className="pdf-preview-container">
                            <div className="pdf-preview compressed">
                              <div className="pdf-icon-large">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <rect x="3" y="4" width="18" height="16" rx="3" fill="#52c41a" fillOpacity="0.1"/>
                                  <rect x="7" y="8" width="10" height="8" rx="2" fill="#52c41a" fillOpacity="0.2"/>
                                  <rect x="9" y="12" width="6" height="2" rx="1" fill="#52c41a"/>
                                </svg>
                              </div>
                              <div className="pdf-preview-text">Compressed PDF</div>
                            </div>
                          </div>
                          <div className="file-info">
                            <div className="file-name">{truncateFileName(result.originalName.replace(/(\.[^.]+)?$/, '_compressed$1'))}</div>
                            <div className="file-size">{formatFileSize(result.compressedSize)}</div>
                          </div>
                        </div>
                      </div>

                      {/* Compression Stats */}
                      <div className="compression-stats-card">
                        <div className="stats-grid">
                          <div className="stat-item">
                            <div className="stat-label">Size Reduction</div>
                            <div className="stat-value">{formatCompressionRatio(result.compressionRatio)}</div>
                          </div>
                          <div className="stat-item">
                            <div className="stat-label">Original Size</div>
                            <div className="stat-value">{formatFileSize(result.originalSize)}</div>
                          </div>
                          <div className="stat-item">
                            <div className="stat-label">Compressed Size</div>
                            <div className="stat-value">{formatFileSize(result.compressedSize)}</div>
                          </div>
                        </div>
                      </div>

                      {/* Download Button */}
                      <div className="download-section">
                        <button 
                          className="download-btn-large"
                          onClick={() => handleDownload(result)}
                          title="Download compressed file"
                        >
                          <span className="download-icon">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 2v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              <path d="M7 8l3 3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              <rect x="3" y="14" width="14" height="2" rx="1" fill="currentColor" fillOpacity="0.2"/>
                            </svg>
                          </span>
                          <span>Download Compressed</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Signup Popup for Large Files */}
      {showSignupPopup && (
        <div className="signup-popup-overlay">
          <div className="signup-popup">
            <div className="popup-header">
              <h3>📁 Large Files Detected</h3>
              <button className="popup-close" onClick={handleSignupPopupClose}>×</button>
            </div>
            <div className="popup-content">
              <p>You're trying to compress files larger than 10MB:</p>
              <ul className="large-files-list">
                {largeFiles.map((file, idx) => (
                  <li key={idx}>
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">{formatFileSize(file.size)}</span>
                  </li>
                ))}
              </ul>
              <p className="popup-message">
                <strong>Sign up for free</strong> to compress files up to 100MB!
              </p>
            </div>
            <div className="popup-actions">
              <button className="btn-outline" onClick={handleSignupPopupClose}>
                Cancel
              </button>
              <a href="/login" className="btn-filled">
                Login
              </a>
              <a href="/signin" className="btn-primary">
                Sign Up Now
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 