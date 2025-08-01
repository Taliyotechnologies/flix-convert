import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './ToolPage.css';

const ToolPage = () => {
  const { type } = useParams();
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const toolConfig = {
    'compress-image': {
      title: 'Compress Image',
      description: 'Reduce image file size while maintaining quality',
      icon: '🖼️',
      acceptedTypes: 'image/*',
      maxSize: 10 * 1024 * 1024, // 10MB
      formats: ['JPG', 'PNG', 'WebP', 'GIF']
    },
    'compress-pdf': {
      title: 'Compress PDF',
      description: 'Reduce PDF file size for easier sharing',
      icon: '📄',
      acceptedTypes: '.pdf',
      maxSize: 10 * 1024 * 1024,
      formats: ['PDF']
    },
    'compress-video': {
      title: 'Compress Video',
      description: 'Reduce video file size without losing quality',
      icon: '🎥',
      acceptedTypes: 'video/*',
      maxSize: 10 * 1024 * 1024,
      formats: ['MP4', 'AVI', 'MOV', 'MKV']
    },
    'convert-audio': {
      title: 'Convert Audio',
      description: 'Convert between different audio formats',
      icon: '🎵',
      acceptedTypes: 'audio/*',
      maxSize: 10 * 1024 * 1024,
      formats: ['MP3', 'WAV', 'AAC', 'OGG', 'FLAC']
    },
    'convert-video': {
      title: 'Convert Video',
      description: 'Convert videos to different formats',
      icon: '🎬',
      acceptedTypes: 'video/*',
      maxSize: 10 * 1024 * 1024,
      formats: ['MP4', 'AVI', 'MOV', 'MKV', 'WebM']
    },
    'convert-image': {
      title: 'Convert Image',
      description: 'Convert images between different formats',
      icon: '🖼️',
      acceptedTypes: 'image/*',
      maxSize: 10 * 1024 * 1024,
      formats: ['JPG', 'PNG', 'WebP', 'GIF', 'BMP']
    }
  };

  const config = toolConfig[type] || toolConfig['compress-image'];

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
      alert(`File size must be less than ${config.maxSize / (1024 * 1024)}MB`);
      return;
    }

    setFile(selectedFile);
    setResult(null);
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
      const compressedSize = Math.round(originalSize * 0.6); // Simulate 40% compression
      const savedPercentage = Math.round((1 - compressedSize / originalSize) * 100);
      
      setResult({
        originalSize,
        compressedSize,
        savedPercentage,
        downloadUrl: URL.createObjectURL(file) // In real app, this would be the processed file
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

    if (file.type.startsWith('image/')) {
      return (
        <div className="file-preview">
          <img 
            src={URL.createObjectURL(file)} 
            alt="File preview" 
            className="preview-image"
          />
        </div>
      );
    }

    if (file.type.startsWith('video/')) {
      return (
        <div className="file-preview">
          <video 
            src={URL.createObjectURL(file)} 
            controls 
            className="preview-video"
          />
        </div>
      );
    }

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
        <title>{config.title} - ConvertFlix</title>
        <meta name="description" content={config.description} />
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
            {!file ? (
              <div 
                className={`upload-area ${isDragOver ? 'drag-over' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="upload-icon">📁</div>
                <h3 className="upload-title">Drop your file here</h3>
                <p className="upload-subtitle">or click to browse</p>
                <p className="upload-limit">Maximum file size: {config.maxSize / (1024 * 1024)}MB</p>
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
                <div className="file-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={processFile}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="spinner"></div>
                        Processing...
                      </>
                    ) : (
                      `Process ${config.title.toLowerCase()}`
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
              <h2 className="results-title">Processing Complete!</h2>
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
              </div>
              <div className="download-section">
                <a 
                  href={result.downloadUrl} 
                  download={`processed_${file.name}`}
                  className="btn btn-primary btn-large"
                >
                  Download Processed File
                </a>
                <p className="expiry-note">
                  ⏰ Auto-deleted in 24 hours
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ToolPage; 