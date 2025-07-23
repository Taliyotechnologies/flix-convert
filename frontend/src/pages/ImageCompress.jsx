import React, { useRef, useState } from 'react';
import { compressionAPI, fileAPI, formatFileSize, formatCompressionRatio } from '../utils/api';
import SignupRequiredPopup from '../components/common/SignupRequiredPopup';
import './ImageCompress.css';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const MAX_FREE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

// Helper to truncate long file names but keep extension
function truncateFileName(name, maxLength = 16) {
  if (name.length <= maxLength) return name;
  const extIndex = name.lastIndexOf('.');
  if (extIndex === -1 || extIndex === 0) return name.slice(0, maxLength - 3) + '...';
  const ext = name.slice(extIndex);
  const base = name.slice(0, maxLength - ext.length - 3);
  return base + '...' + ext;
}

export default function ImageCompress() {
  const { user } = useAuth();
  const [images, setImages] = useState([]);
  const [compressed, setCompressed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [largeFiles, setLargeFiles] = useState([]);
  const fileInput = useRef();
  const [showSignupRequired, setShowSignupRequired] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [progress, setProgress] = useState(0); // Progress state
  const [compressing, setCompressing] = useState(false); // New compressing state

  const handleFiles = files => {
    const fileArr = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (!user) {
      // Only non-logged-in users are limited
      const largeFilesArr = fileArr.filter(f => f.size > MAX_FREE_SIZE);
      const smallFilesArr = fileArr.filter(f => f.size <= MAX_FREE_SIZE);
      if (largeFilesArr.length > 0) {
        setLargeFiles(largeFilesArr);
        setShowSignupPopup(true);
        return;
      }
      setImages(prev => [...prev, ...smallFilesArr]);
    } else {
      // Logged-in users: no limit
      setImages(prev => [...prev, ...fileArr]);
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
    setImages(images => images.filter((_, i) => i !== idx));
  };

  const handleSignupPopupClose = () => {
    setShowSignupPopup(false);
    setLargeFiles([]);
  };

  const handleSignupPopupProceed = () => {
    // Add large files to images list
    setImages(prev => [...prev, ...largeFiles]);
    setShowSignupPopup(false);
    setLargeFiles([]);
  };

  const handleCompress = async () => {
    setLoading(true);
    setError('');
    setCompressed([]);
    setProgress(0);
    setCompressing(false);

    try {
      const compressionResults = [];
      for (const image of images) {
        try {
          setCompressing(false);
          // Upload with progress
          const resultPromise = compressionAPI.compressImage(image, (percent) => setProgress(percent));
          // Wait for upload to finish (progress reaches 100)
          await new Promise(resolve => {
            const check = () => {
              if (progress === 100) resolve();
              else setTimeout(check, 50);
            };
            check();
          });
          setCompressing(true); // After upload, before backend responds
          const result = await resultPromise;
          setCompressing(false);
          compressionResults.push({
            originalName: image.name,
            originalSize: image.size,
            compressedSize: result.data.compressedSize,
            compressionRatio: result.data.compressionRatio,
            downloadUrl: result.data.downloadUrl,
            fileId: result.data.fileId,
            originalFile: image
          });
        } catch (err) {
          setCompressing(false);
          console.error(`Failed to compress ${image.name}:`, err);
          compressionResults.push({
            originalName: image.name,
            error: err.message
          });
        }
      }
      setCompressed(compressionResults);
    } catch (error) {
      setCompressing(false);
      setError('Compression failed. Please try again.');
      console.error('Compression error:', error);
    } finally {
      setLoading(false);
      setProgress(0);
      setCompressing(false);
    }
  };

  const handleDownload = async (result) => {
    if (result.error) return;
    // Block download if compressed file is over 10MB and user is not logged in
    if (!user && result.compressedSize > MAX_FREE_SIZE) {
      setShowSignupRequired(true);
      return;
    }
    try {
      let downloadUrl = result.downloadUrl;
      if (!/^https?:\/\//.test(downloadUrl)) {
        downloadUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}${downloadUrl}`;
      }
      const response = await axios.get(downloadUrl, { responseType: 'blob' });
      if (response.status === 401) {
        const data = response.data;
        if (data && data.error && data.error.toLowerCase().includes('sign up required')) {
          setShowSignupRequired(true);
          return;
        }
      }
      // If not 401, proceed to download
      const blob = response.data;
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = result.originalName.replace(/(\.[^.]+)?$/, '_compressed$1');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      setShowSignupRequired(true);
    }
  };

  return (
    <main className="imgcompress-main">
      <SignupRequiredPopup open={showSignupRequired} onClose={() => setShowSignupRequired(false)} />
      <section className="imgcompress-card">
        <div className="imgcompress-header">
          <span className="imgcompress-icon" aria-hidden="true">
            {/* Image SVG */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="5" width="18" height="14" rx="3" fill="#6c63ff" fillOpacity="0.13"/>
              <rect x="7" y="9" width="10" height="6" rx="2" fill="#6c63ff" fillOpacity="0.22"/>
              <circle cx="8.5" cy="10.5" r="1.5" fill="#6c63ff"/>
            </svg>
          </span>
          <h1 className="imgcompress-title">Image Compressor</h1>
          <p className="imgcompress-desc">Compress your images quickly and efficiently without losing quality. Upload, compress, and download all in one place.</p>
        </div>
        
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        <div
          className="imgcompress-upload"
          onClick={() => fileInput.current.click()}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
        >
          <input
            type="file"
            accept="image/*"
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
          <span className="upload-text">Drag & drop or <span className="upload-link">browse</span> images</span>
          <div className="file-limit-msg">
            {user ? (
              <span>Limit: <b>Unlimited</b></span>
            ) : (
              <span>Free: Up to 10 MB. <a href="/signin" className="file-limit-link">Sign up for larger files</a>.</span>
            )}
          </div>
        </div>
        
        {images.length > 0 && (
          <div className="img-list">
            {images.map((img, idx) => (
              <div className="img-item" key={idx}>
                <img src={URL.createObjectURL(img)} alt={img.name} className="img-thumb" />
                <span className="img-name">{truncateFileName(img.name)}</span>
                <span className="img-size">{formatFileSize(img.size)}</span>
                <button className="img-remove" onClick={e => { e.stopPropagation(); handleRemove(idx); }} title="Remove">
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
          className="imgcompress-btn"
          onClick={handleCompress}
          disabled={images.length === 0 || loading}
        >
          {loading ? 'Compressing...' : 'Compress Images'}
        </button>
        {/* Progress Bars Section */}
        <div style={{ margin: '24px 0 8px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          {loading && progress > 0 && progress < 100 && (
            <div className="progress-bar-container" style={{ width: '60%', minWidth: 200, maxWidth: 400 }}>
              <div className="progress-bar" style={{ width: `${progress}%`, background: '#6c63ff' }} />
              <div className="progress-label">{progress}% Uploading...</div>
            </div>
          )}
          {compressing && (
            <div className="progress-bar-container" style={{ width: '60%', minWidth: 200, maxWidth: 400 }}>
              <div className="progress-bar compressing" style={{ width: `100%`, background: '#ffb86c', animation: 'progress-stripes 1s linear infinite' }} />
              <div className="progress-label">Compressing...</div>
            </div>
          )}
        </div>
        
        {compressed.length > 0 && (
          <div className="imgcompress-results">
            <h2 className="results-title">Compression Results</h2>
            <div className="results-grid">
              {compressed.map((result, idx) => (
                <div key={idx} className="result-card">
                  {result.error ? (
                    <div className="result-error">
                      <span className="error-icon">❌</span>
                      <span className="error-text">{truncateFileName(result.originalName)} - {result.error}</span>
                    </div>
                  ) : result.alreadyCompressed ? (
                    <div className="already-compressed-message">
                      <span className="info-icon">ℹ️</span>
                      <span className="info-text">{truncateFileName(result.originalName)} - Your image is already compressed</span>
                    </div>
                  ) : (
                    <>
                      <div className="comparison-container">
                        {/* Original Image */}
                        <div className="image-comparison">
                          <div className="image-label">Original</div>
                          <div className="image-preview">
                            <img 
                              src={URL.createObjectURL(result.originalFile)} 
                              alt="Original" 
                              className="comparison-img"
                            />
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

                        {/* Compressed Image */}
                        <div className="image-comparison">
                          <div className="image-label">Compressed</div>
                          <div className="image-preview">
                            <img 
                              src={result.downloadUrl} 
                              alt="Compressed" 
                              className="comparison-img"
                              onError={(e) => {
                                e.target.src = URL.createObjectURL(result.originalFile);
                                e.target.style.opacity = '0.7';
                              }}
                            />
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
                    <span className="file-name">{truncateFileName(file.name)}</span>
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