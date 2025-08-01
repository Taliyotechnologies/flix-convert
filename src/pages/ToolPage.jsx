import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './ToolPage.css';

const ToolPage = () => {
  const { type } = useParams();
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const toolConfig = {
    'compress-image': {
      name: 'Compress Image',
      description: 'Reduce image file size while maintaining quality',
      icon: '🖼️',
      acceptedTypes: 'image/*',
      maxSize: 10 * 1024 * 1024, // 10MB
      formats: ['JPG', 'PNG', 'WebP', 'AVIF']
    },
    'compress-pdf': {
      name: 'Compress PDF',
      description: 'Reduce PDF file size for easier sharing',
      icon: '📄',
      acceptedTypes: 'application/pdf',
      maxSize: 10 * 1024 * 1024,
      formats: ['PDF']
    },
    'compress-video': {
      name: 'Compress Video',
      description: 'Reduce video file size without losing quality',
      icon: '🎬',
      acceptedTypes: 'video/*',
      maxSize: 10 * 1024 * 1024,
      formats: ['MP4', 'AVI', 'MOV', 'MKV']
    },
    'convert-audio': {
      name: 'Convert Audio',
      description: 'Convert between audio formats easily',
      icon: '🎵',
      acceptedTypes: 'audio/*',
      maxSize: 10 * 1024 * 1024,
      formats: ['MP3', 'WAV', 'AAC', 'OGG', 'FLAC']
    },
    'convert-video': {
      name: 'Convert Video',
      description: 'Convert videos to different formats',
      icon: '🎥',
      acceptedTypes: 'video/*',
      maxSize: 10 * 1024 * 1024,
      formats: ['MP4', 'AVI', 'MOV', 'MKV', 'WebM']
    },
    'convert-image': {
      name: 'Convert Image',
      description: 'Convert images between different formats',
      icon: '🖼️',
      acceptedTypes: 'image/*',
      maxSize: 10 * 1024 * 1024,
      formats: ['JPG', 'PNG', 'WebP', 'AVIF', 'BMP']
    }
  };

  const config = toolConfig[type] || toolConfig['compress-image'];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true);
    }
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    if (selectedFile.size > config.maxSize) {
      alert(`File size must be less than ${config.maxSize / (1024 * 1024)}MB`);
      return;
    }
    
    setFile(selectedFile);
    setResult(null);
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const processFile = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock result - in real app, this would be actual processing
    const originalSize = file.size;
    const compressedSize = Math.round(originalSize * 0.6); // Mock 40% reduction
    const savings = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
    
    setResult({
      originalSize,
      compressedSize,
      savings,
      downloadUrl: URL.createObjectURL(file) // Mock download URL
    });
    
    setIsProcessing(false);
  };

  const downloadFile = () => {
    if (result?.downloadUrl) {
      const link = document.createElement('a');
      link.href = result.downloadUrl;
      link.download = `processed_${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      <Helmet>
        <title>{config.name} - ConvertFlix</title>
        <meta name="description" content={`${config.description}. Free online tool for ${config.name.toLowerCase()}.`} />
      </Helmet>

      <div className="tool-page">
        <div className="tool-container">
          <div className="tool-header">
            <div className="tool-icon">{config.icon}</div>
            <div className="tool-info">
              <h1 className="tool-title">{config.name}</h1>
              <p className="tool-description">{config.description}</p>
            </div>
          </div>

          <div className="upload-section">
            <div 
              className={`upload-area ${dragActive ? 'drag-active' : ''} ${file ? 'has-file' : ''}`}
              onDragEnter={handleDragIn}
              onDragLeave={handleDragOut}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {!file ? (
                <>
                  <div className="upload-icon">📁</div>
                  <h3 className="upload-title">Drop your file here</h3>
                  <p className="upload-subtitle">
                    or <button onClick={() => fileInputRef.current?.click()} className="upload-link">browse files</button>
                  </p>
                  <p className="upload-info">
                    Max file size: {config.maxSize / (1024 * 1024)}MB • Supported: {config.formats.join(', ')}
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={config.acceptedTypes}
                    onChange={handleFileInput}
                    className="file-input"
                  />
                </>
              ) : (
                <div className="file-preview">
                  <div className="file-info">
                    <div className="file-icon">
                      {file.type.startsWith('image/') ? '🖼️' : 
                       file.type.startsWith('video/') ? '🎬' : 
                       file.type.startsWith('audio/') ? '🎵' : '📄'}
                    </div>
                    <div className="file-details">
                      <h3 className="file-name">{file.name}</h3>
                      <p className="file-size">{formatFileSize(file.size)}</p>
                    </div>
                    <button 
                      onClick={() => setFile(null)} 
                      className="remove-file"
                      aria-label="Remove file"
                    >
                      ✕
                    </button>
                  </div>
                  
                  {file.type.startsWith('image/') && (
                    <div className="image-preview">
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt="Preview" 
                        className="preview-image"
                      />
                    </div>
                  )}
                  
                  <button 
                    onClick={processFile}
                    disabled={isProcessing}
                    className="btn btn-primary btn-process"
                  >
                    {isProcessing ? 'Processing...' : 'Process File'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {result && (
            <div className="result-section">
              <h2 className="result-title">Processing Complete!</h2>
              
              <div className="result-stats">
                <div className="stat-card">
                  <div className="stat-label">Original Size</div>
                  <div className="stat-value">{formatFileSize(result.originalSize)}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">New Size</div>
                  <div className="stat-value">{formatFileSize(result.compressedSize)}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Saved</div>
                  <div className="stat-value savings">{result.savings}%</div>
                </div>
              </div>
              
              <div className="result-actions">
                <button onClick={downloadFile} className="btn btn-primary btn-download">
                  Download File
                </button>
                <button onClick={() => setFile(null)} className="btn btn-secondary">
                  Process Another File
                </button>
              </div>
              
              <div className="expiry-notice">
                ⏰ Files are automatically deleted after 24 hours for your privacy
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ToolPage; 