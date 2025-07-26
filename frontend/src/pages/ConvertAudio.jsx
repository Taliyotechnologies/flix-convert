import React, { useState } from 'react';
import { useTheme } from '../App';
import './ConvertAudio.css';

const ConvertAudio = () => {
  const { theme } = useTheme();
  const [selectedFile, setSelectedFile] = useState(null);
  const [outputFormat, setOutputFormat] = useState('MP3');
  const [isConverting, setIsConverting] = useState(false);
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

  const handleConvert = async () => {
    if (!selectedFile) return;
    
    setIsConverting(true);
    
    // Simulate conversion process
    setTimeout(() => {
      const originalSize = selectedFile.size;
      const convertedSize = Math.round(originalSize * 0.92); // Simulate size change
      
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
    { value: 'MP3', label: 'MP3 Audio', icon: '🎵', desc: 'Most popular' },
    { value: 'AAC', label: 'AAC Audio', icon: '🎧', desc: 'High quality' },
    { value: 'OGG', label: 'OGG Audio', icon: '🎶', desc: 'Open source' },
    { value: 'WAV', label: 'WAV Audio', icon: '🎼', desc: 'Uncompressed' },
    { value: 'FLAC', label: 'FLAC Audio', icon: '🎹', desc: 'Lossless' },
    { value: 'M4A', label: 'M4A Audio', icon: '🍎', desc: 'Apple format' }
  ];

  return (
    <div className={`convert-audio-container ${theme}`}>
      {/* Simple Header */}
      <section className="convert-header">
        <div className="header-content">
          <h1 className="page-title">
            Audio Converter
          </h1>
          <p className="page-description">
            Convert your audio files to different formats. Support for MP3, AAC, OGG, WAV, FLAC, M4A, and more formats.
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

      {/* Conversion Settings */}
      {selectedFile && (
        <section className="conversion-settings">
          <div className="settings-container">
            <h2>Conversion Settings</h2>
            
            <div className="format-options">
              <h3>Output Format</h3>
              <div className="format-grid">
                {formatOptions.map((format) => (
                  <button 
                    key={format.value}
                    className={`format-card ${outputFormat === format.value ? 'active' : ''}`}
                    onClick={() => setOutputFormat(format.value)}
                  >
                    <span className="format-icon">{format.icon}</span>
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
                  Convert Audio
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
                  <path d="M8 16h16M16 8l8 8-8 8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="result-card">
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
              Download Converted Audio
            </button>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2>Why Choose Our Audio Conversion?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="8" fill="#3B82F6" opacity="0.1"/>
                  <path d="M16 24h16M24 16v16" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Multiple Formats</h3>
              <p>Convert between MP3, AAC, OGG, WAV, FLAC, M4A and more formats with ease.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="8" fill="#F59E0B" opacity="0.1"/>
                  <path d="M16 20l4 4 8-8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Quality Preservation</h3>
              <p>Maintain audio quality while converting between different formats and optimizing file size.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="8" fill="#10B981" opacity="0.1"/>
                  <path d="M12 20l4-4 4 4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Fast Processing</h3>
              <p>Convert audio files quickly with our optimized conversion engine designed for speed and efficiency.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConvertAudio; 