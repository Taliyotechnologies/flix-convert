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
      {/* Simple Header */}
      <section className="compress-header">
        <div className="header-content">
          <h1 className="page-title">
            Audio Compressor
          </h1>
          <p className="page-description">
            Compress your audio files while maintaining quality. Support for MP3, AAC, OGG, WAV, FLAC, and more formats.
          </p>
        </div>
      </section>

      {/* Upload Section */}
      <section className="upload-section">
        <div className="upload-container">
          <div className="upload-area" onClick={() => document.getElementById('file-input').click()}>
            <div className="upload-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <rect x="8" y="8" width="48" height="48" rx="12" fill="#F59E0B" opacity="0.1"/>
                <path d="M32 16v24M24 24l8-8 8 8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Upload Your Audio</h3>
            <p>Drag and drop or click to select an audio file</p>
            <span className="file-types">Supports: MP3, AAC, OGG, WAV, FLAC, M4A</span>
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
                      preload="metadata"
                    />
                  )}
                </div>
                <div className="file-text">
                  <h4>{selectedFile.name}</h4>
                  <p>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  <span className="file-type">{selectedFile.type.split('/')[1].toUpperCase()}</span>
                </div>
                <div className="file-actions">
                  <button className="remove-btn" onClick={() => {
                    setSelectedFile(null);
                    setAudioPreview(null);
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
                  <span className="stat-label">Original Size</span>
                  <span className="stat-value">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <div className="preview-stat">
                  <span className="stat-label">Estimated Size</span>
                  <span className="stat-value">{(selectedFile.size * (compressionLevel / 100) / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <div className="preview-stat">
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
                  Compress Audio
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
            <h2>Compression Results</h2>
            <div className="results-grid">
              <div className="result-card">
                <h3>Original</h3>
                <div className="file-size">{(result.originalSize / 1024 / 1024).toFixed(2)} MB</div>
                <div className="file-name">{result.fileName}</div>
                <div className="file-format">Original Format</div>
              </div>
              <div className="result-arrow">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M8 16h16M16 8l8 8-8 8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="result-card compressed">
                <h3>Compressed</h3>
                <div className="file-size">{(result.compressedSize / 1024 / 1024).toFixed(2)} MB</div>
                <div className="reduction">-{result.reduction}%</div>
                <div className="file-format">{result.format}</div>
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
              <div className="stat">
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
          <h2>Why Choose Our Audio Compression?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="8" fill="#14b8a6" opacity="0.1"/>
                  <path d="M16 24h16M24 16v16" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Advanced Codecs</h3>
              <p>Uses modern audio codecs like MP3, AAC, and OGG for optimal compression and quality preservation.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="8" fill="#10b981" opacity="0.1"/>
                  <path d="M16 20l4 4 8-8" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Quality Control</h3>
              <p>Fine-tune compression settings to balance file size and audio quality according to your needs.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="8" fill="#0d9488" opacity="0.1"/>
                  <path d="M12 20l4-4 4 4" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Fast Processing</h3>
              <p>Process audio files quickly with our optimized compression engine designed for speed and efficiency.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompressAudio; 