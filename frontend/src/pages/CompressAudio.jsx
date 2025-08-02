import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Music, FileDown, Upload, Download, AlertCircle, CheckCircle, Clock, Settings, Volume2 } from 'lucide-react';
import './ToolPage.css';

const CompressAudio = () => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('high');
  const fileInputRef = useRef(null);

  const config = {
    title: 'Compress Audio',
    description: 'Reduce audio file size while maintaining quality',
    icon: <Music size={32} />,
    acceptedTypes: 'audio/*',
    maxSize: 10 * 1024 * 1024, // 10MB
    formats: ['MP3', 'WAV', 'AAC', 'OGG', 'FLAC'],
    qualityOptions: [
      { value: 'high', label: 'High Quality (320kbps)', description: 'Best quality, larger file size' },
      { value: 'medium', label: 'Medium Quality (192kbps)', description: 'Good balance of quality and size' },
      { value: 'low', label: 'Low Quality (128kbps)', description: 'Smaller file size, reduced quality' }
    ]
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleFileSelect = (selectedFile) => {
    if (selectedFile.size > config.maxSize) {
      setShowSignupPrompt(true);
      return;
    }

    setFile(selectedFile);
    setResult(null);
    setShowSignupPrompt(false);
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const processFile = async () => {
    if (!file) return;

    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      const originalSize = file.size;
      const compressionRatios = { high: 0.7, medium: 0.5, low: 0.3 };
      const compressedSize = Math.round(originalSize * compressionRatios[selectedQuality]);
      const savedPercentage = Math.round((1 - compressedSize / originalSize) * 100);
      
      setResult({
        originalSize,
        compressedSize,
        savedPercentage,
        quality: selectedQuality,
        downloadUrl: URL.createObjectURL(file) // In real app, this would be the compressed file
      });
      
      setIsProcessing(false);
    }, 2000);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFilePreview = () => {
    if (!file) return null;

    return (
      <div className="file-preview">
        <div className="file-icon">{config.icon}</div>
        <div className="file-info">
          <div className="file-name">{file.name}</div>
          <div className="file-size">{formatFileSize(file.size)}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Compress Audio - ConvertFlix</title>
        <meta name="description" content="Compress audio files while maintaining quality. Free up to 10MB." />
      </Helmet>

      <div className="tool-page">
        <div className="container">
          {/* Header */}
          <div className="tool-header">
            <div className="tool-icon">{config.icon}</div>
            <h1 className="tool-title">{config.title}</h1>
            <p className="tool-description">{config.description}</p>
            <div className="tool-formats">
              <span className="formats-label">Supported formats:</span>
              <span className="formats-list">{config.formats.join(', ')}</span>
            </div>
          </div>

          {/* Upload Area */}
          <div className="upload-section">
            {showSignupPrompt ? (
              <div className="signup-prompt">
                <div className="prompt-icon">
                  <AlertCircle size={48} />
                </div>
                <h3 className="prompt-title">File Too Large</h3>
                <p className="prompt-description">
                  Your file exceeds the 10MB limit for free users. Sign up to process files up to 100MB.
                </p>
                <div className="prompt-features">
                  <div className="feature">
                    <CheckCircle size={20} />
                    <span>Up to 100MB files</span>
                  </div>
                  <div className="feature">
                    <CheckCircle size={20} />
                    <span>Unlimited processing</span>
                  </div>
                  <div className="feature">
                    <CheckCircle size={20} />
                    <span>Priority processing</span>
                  </div>
                </div>
                <div className="prompt-actions">
                  <Link to="/signup" className="btn btn-primary">
                    Sign Up Free
                  </Link>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setShowSignupPrompt(false)}
                  >
                    Try Smaller File
                  </button>
                </div>
              </div>
            ) : !file ? (
              <div 
                className={`upload-area ${isDragOver ? 'drag-over' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="upload-icon">
                  <Upload size={48} />
                </div>
                <h3 className="upload-title">Drop your audio file here</h3>
                <p className="upload-subtitle">or click to browse</p>
                <p className="upload-limit">Maximum file size: {config.maxSize / (1024 * 1024)}MB</p>
                <p className="upload-note">For larger files, <Link to="/signup" className="signup-link">sign up</Link> to unlock up to 100MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={config.acceptedTypes}
                  onChange={handleFileInput}
                  style={{ display: 'none' }}
                />
              </div>
            ) : (
              <div className="file-section">
                {getFilePreview()}
                
                {/* Quality Selection */}
                <div className="quality-selection">
                  <h3 className="quality-title">Select Compression Quality</h3>
                  <div className="quality-grid">
                    {config.qualityOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`quality-option ${selectedQuality === option.value ? 'selected' : ''}`}
                        onClick={() => setSelectedQuality(option.value)}
                      >
                        <div className="quality-icon">
                          <Volume2 size={20} />
                        </div>
                        <div className="quality-content">
                          <div className="quality-label">{option.label}</div>
                          <div className="quality-description">{option.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="file-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={processFile}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="spinner"></div>
                        Compressing...
                      </>
                    ) : (
                      <>
                        <Settings size={20} />
                        Compress Audio
                      </>
                    )}
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => {
                      setFile(null);
                      setResult(null);
                    }}
                  >
                    Choose Different File
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          {result && (
            <div className="results-section">
              <h2 className="results-title">Compression Complete!</h2>
              <div className="results-grid">
                <div className="result-card">
                  <div className="result-label">Original Size</div>
                  <div className="result-value">{formatFileSize(result.originalSize)}</div>
                </div>
                <div className="result-card">
                  <div className="result-label">Compressed Size</div>
                  <div className="result-value">{formatFileSize(result.compressedSize)}</div>
                </div>
                <div className="result-card">
                  <div className="result-label">Space Saved</div>
                  <div className="result-value saved">{result.savedPercentage}%</div>
                </div>
                <div className="result-card">
                  <div className="result-label">Quality</div>
                  <div className="result-value">{result.quality.charAt(0).toUpperCase() + result.quality.slice(1)}</div>
                </div>
              </div>
              <div className="download-section">
                <a 
                  href={result.downloadUrl} 
                  download={`compressed_${file.name}`}
                  className="btn btn-primary btn-large"
                >
                  <Download size={20} />
                  Download Compressed File
                </a>
                <p className="expiry-note">
                  <Clock size={16} />
                  Auto-deleted in 24 hours
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CompressAudio; 