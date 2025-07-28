import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ToolPage.css';

const ConvertImage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [targetFormat, setTargetFormat] = useState('png');
  const [isConverting, setIsConverting] = useState(false);
  const [conversionResult, setConversionResult] = useState<string | null>(null);

  const supportedFormats = [
    { value: 'png', label: 'PNG', description: 'Lossless compression, supports transparency' },
    { value: 'jpg', label: 'JPG', description: 'Good compression, widely supported' },
    { value: 'webp', label: 'WebP', description: 'Modern format, excellent compression' },
    { value: 'gif', label: 'GIF', description: 'Supports animation and transparency' },
    { value: 'bmp', label: 'BMP', description: 'Uncompressed, high quality' },
    { value: 'tiff', label: 'TIFF', description: 'Professional format, lossless' }
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    
    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }
    
    setSelectedFile(file);
    setConversionResult(null);
  };

  const handleConvert = async () => {
    if (!selectedFile) return;
    
    setIsConverting(true);
    
    // Simulate conversion process
    setTimeout(() => {
      setIsConverting(false);
      setConversionResult(`converted_image.${targetFormat}`);
    }, 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        return (
          <svg className="file-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'png':
        return (
          <svg className="file-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'gif':
        return (
          <svg className="file-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'webp':
        return (
          <svg className="file-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'bmp':
        return (
          <svg className="file-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'tiff':
      case 'tif':
        return (
          <svg className="file-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="file-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  return (
    <div className="tool-page">
      {/* Hero Section */}
      <section className="tool-hero">
        <div className="container">
          <div className="tool-hero-content">
            <div className="tool-icon-large">
              <svg className="tool-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="tool-hero-title">Convert Image</h1>
            <p className="tool-hero-subtitle">
              Convert your images between different formats with high quality and fast processing. 
              Support for JPG, PNG, WebP, GIF, BMP, and TIFF formats.
            </p>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="tool-upload">
        <div className="container">
          <div className="upload-container">
            <div className="upload-area">
              <div
                className={`upload-zone ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {selectedFile ? (
                  <div className="file-preview">
                    <div className="file-icon">{getFileIcon(selectedFile.name)}</div>
                    <div className="file-info">
                      <h3 className="file-name">{selectedFile.name}</h3>
                      <p className="file-size">{formatFileSize(selectedFile.size)}</p>
                    </div>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="remove-file-btn"
                    >
                      Remove File
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <div className="upload-icon">
                      <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <h3>Drag & Drop your image here</h3>
                    <p>or click to browse files</p>
                    <input
                      type="file"
                      onChange={handleFileInput}
                      accept="image/*"
                      className="file-input"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="upload-btn">
                      Choose File
                    </label>
                  </div>
                )}
              </div>
            </div>

            {selectedFile && (
              <div className="conversion-options">
                <h3 className="options-title">Select Output Format</h3>
                <div className="format-grid">
                  {supportedFormats.map((format) => (
                    <button
                      key={format.value}
                      onClick={() => setTargetFormat(format.value)}
                      className={`format-option ${targetFormat === format.value ? 'selected' : ''}`}
                    >
                      <div className="format-header">
                        <span className="format-label">{format.label}</span>
                        <span className="format-value">.{format.value}</span>
                      </div>
                      <p className="format-description">{format.description}</p>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleConvert}
                  disabled={isConverting}
                  className="btn btn-primary convert-btn"
                >
                  {isConverting ? (
                    <div className="loading-state">
                      <div className="loading-spinner"></div>
                      <span>Converting...</span>
                    </div>
                  ) : (
                    `Convert to ${targetFormat.toUpperCase()}`
                  )}
                </button>
              </div>
            )}

            {conversionResult && (
              <div className="conversion-result">
                <div className="result-header">
                  <h3>Conversion Complete!</h3>
                  <div className="result-icon">
                    <svg className="result-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="result-file">
                  <div className="file-icon">{getFileIcon(conversionResult)}</div>
                  <div className="file-info">
                    <h3 className="file-name">{conversionResult}</h3>
                    <p className="file-size">Ready for download</p>
                  </div>
                </div>
                <div className="result-actions">
                  <button className="btn btn-primary">Download File</button>
                  <button className="btn btn-secondary">Convert Another</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="tool-features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Our Image Converter?</h2>
            <p className="section-subtitle">
              Professional-grade image processing with advanced features
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-description">
                Convert images in seconds with our optimized processing engine
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="feature-title">Secure & Private</h3>
              <p className="feature-description">
                Your images are encrypted and automatically deleted after processing
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="feature-title">High Quality</h3>
              <p className="feature-description">
                Maintain image quality with advanced compression algorithms
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="feature-title">Mobile Friendly</h3>
              <p className="feature-description">
                Convert images on any device with our responsive design
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="feature-title">Batch Processing</h3>
              <p className="feature-description">
                Convert multiple images at once to save time and effort
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="feature-title">Free Forever</h3>
              <p className="feature-description">
                No hidden fees or subscriptions. Convert unlimited images for free
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="tool-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Convert Your Images?</h2>
            <p className="cta-subtitle">
              Start converting your images today with our professional tools. 
              No registration required - it's completely free!
            </p>
            <div className="cta-buttons">
              <Link to="/tools" className="btn btn-primary">
                View All Tools
              </Link>
              <Link to="/" className="btn btn-secondary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConvertImage; 