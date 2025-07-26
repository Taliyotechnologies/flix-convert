import React, { useState } from 'react';
import { useTheme } from '../App';
import './CompressAudio.css';

const CompressAudio = () => {
  const { theme } = useTheme();
  const [selectedFile, setSelectedFile] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState(80);
  const [outputFormat, setOutputFormat] = useState('MP3');
  const [isCompressing, setIsCompressing] = useState(false);
  const [result, setResult] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setSelectedFile(file);
      setResult(null);
      
      // Create audio preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAudioPreview(e.target.result);
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

  const formatOptions = ['MP3', 'AAC', 'OGG', 'WAV', 'FLAC'];

  return (
    <div className={`compress-audio-container ${theme}`}>
      {/* Professional Header */}
      <section className="compress-header">
        <div className="header-content">
          <div className="header-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="8" y="8" width="32" height="32" rx="8" fill="#8B5CF6" opacity="0.1"/>
              <circle cx="24" cy="24" r="12" fill="#8B5CF6" opacity="0.2"/>
              <path d="M20 16v16M28 12v24M16 20h16M16 28h16" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="24" cy="24" r="4" fill="#8B5CF6"/>
              <path d="M24 20v8M20 24h8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="page-title">
            Professional Audio Compression
          </h1>
          <p className="page-description">
            Compress your audio files while maintaining exceptional quality. Support for MP3, AAC, OGG, WAV, FLAC, and more formats with advanced compression algorithms.
          </p>
          <div className="header-stats">
            <div className="stat-item">
              <div className="stat-number">99.8%</div>
              <div className="stat-label">Quality Retention</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">85%</div>
              <div className="stat-label">Size Reduction</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Audio Formats</div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="upload-section">
        <div className="upload-container">
          <div className="upload-area" onClick={() => document.getElementById('file-input').click()}>
            <div className="upload-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <rect x="8" y="8" width="48" height="48" rx="12" fill="#8B5CF6" opacity="0.1"/>
                <path d="M32 16v24M24 24l8-8 8 8" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="32" cy="32" r="4" fill="#8B5CF6"/>
                <path d="M28 28l8 8M36 28l-8 8" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Upload Your Audio</h3>
            <p>Drag and drop or click to select an audio file</p>
            <div className="supported-formats">
              <span className="format-tag">MP3</span>
              <span className="format-tag">AAC</span>
              <span className="format-tag">OGG</span>
              <span className="format-tag">WAV</span>
              <span className="format-tag">FLAC</span>
              <span className="format-tag">M4A</span>
            </div>
            <input
              id="file-input"
              type="file"
              accept="audio/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </div>
          
          {selectedFile && (
            <div className="file-info">
              <div className="file-details">
                <div className="file-preview">
                  {audioPreview && (
                    <audio 
                      src={audioPreview} 
                      controls 
                      className="preview-audio"
                      muted
                    />
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
                    setAudioPreview(null);
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

      {/* Compression Settings */}
      {selectedFile && (
        <section className="compression-settings">
          <div className="settings-container">
            <div className="settings-header">
              <h2>Compression Settings</h2>
              <p>Fine-tune your audio compression for optimal quality and file size</p>
            </div>
            
            <div className="setting-group">
              <label htmlFor="compression-level">
                Quality Level: <span className="quality-value">{compressionLevel}%</span>
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
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2v16M6 6h8M6 10h8M6 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="stat-label">Original Size</span>
                  <span className="stat-value">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <div className="preview-stat">
                  <div className="stat-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2v16M6 6h8M6 10h8M6 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="stat-label">Estimated Size</span>
                  <span className="stat-value">{(selectedFile.size * (compressionLevel / 100) / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <div className="preview-stat">
                  <div className="stat-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2v16M6 6h8M6 10h8M6 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
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
                  <svg className="spinner" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="12.566" strokeDashoffset="12.566">
                      <animate attributeName="stroke-dashoffset" dur="1s" values="0;12.566" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                  Compressing...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
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
              <h2>Compression Results</h2>
              <p>Your audio has been successfully compressed with optimal quality</p>
            </div>
            <div className="results-grid">
              <div className="result-card">
                <div className="card-header">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3>Original</h3>
                </div>
                <div className="file-size">{(result.originalSize / 1024 / 1024).toFixed(2)} MB</div>
                <div className="file-name">{result.fileName}</div>
                <div className="file-format">Original Format</div>
              </div>
              <div className="result-arrow">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M8 16h16M16 8l8 8-8 8" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="result-card compressed">
                <div className="card-header">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2v16M6 6h8M6 10h8M6 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="stat-number">{result.reduction}%</span>
                <span className="stat-label">Size Reduction</span>
              </div>
              <div className="stat">
                <div className="stat-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2v16M6 6h8M6 10h8M6 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="stat-number">{(result.originalSize - result.compressedSize) / 1024 / 1024} MB</span>
                <span className="stat-label">Space Saved</span>
              </div>
              <div className="stat">
                <div className="stat-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2v16M6 6h8M6 10h8M6 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="stat-number">{result.format}</span>
                <span className="stat-label">Output Format</span>
              </div>
            </div>
            
            <button className="download-btn" onClick={handleDownload}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2v12M6 10l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download Compressed Audio
            </button>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2>Why Choose Our Professional Audio Compression?</h2>
            <p>Advanced audio compression technology for the best quality and file size optimization</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="8" fill="#8B5CF6" opacity="0.1"/>
                  <path d="M16 24h16M24 16v16" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="24" cy="24" r="2" fill="#8B5CF6"/>
                </svg>
              </div>
              <h3>Advanced Codecs</h3>
              <p>Uses modern audio codecs like MP3, AAC, and OGG for optimal compression and quality preservation with professional-grade algorithms.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="8" fill="#7C3AED" opacity="0.1"/>
                  <path d="M16 20l4 4 8-8" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="24" cy="24" r="2" fill="#7C3AED"/>
                </svg>
              </div>
              <h3>Quality Control</h3>
              <p>Fine-tune compression settings to balance file size and audio quality according to your specific requirements and use cases.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="8" fill="#6D28D9" opacity="0.1"/>
                  <path d="M12 20l4-4 4 4" stroke="#6D28D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="24" cy="24" r="2" fill="#6D28D9"/>
                </svg>
              </div>
              <h3>Fast Processing</h3>
              <p>Process audio files quickly with our optimized compression engine designed for speed, efficiency, and professional results.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompressAudio; 