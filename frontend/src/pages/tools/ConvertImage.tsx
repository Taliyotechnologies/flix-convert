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
        return '🖼️';
      case 'png':
        return '🖼️';
      case 'gif':
        return '🎬';
      case 'webp':
        return '🖼️';
      case 'bmp':
        return '🖼️';
      case 'tiff':
      case 'tif':
        return '🖼️';
      default:
        return '📄';
    }
  };

  return (
    <div className="tool-page">
      {/* Hero Section */}
      <section className="tool-hero">
        <div className="container">
          <div className="tool-hero-content">
            <div className="tool-icon-large">🖼️</div>
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
                    <div className="upload-icon">📁</div>
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
                  <div className="result-icon">✅</div>
                </div>
                <div className="result-file">
                  <div className="file-icon">{getFileIcon(conversionResult)}</div>
                  <div className="file-info">
                    <h4 className="file-name">{conversionResult}</h4>
                    <p className="file-size">Ready for download</p>
                  </div>
                </div>
                <div className="result-actions">
                  <button className="btn btn-primary">Download File</button>
                  <button 
                    onClick={() => {
                      setSelectedFile(null);
                      setConversionResult(null);
                    }}
                    className="btn btn-secondary"
                  >
                    Convert Another
                  </button>
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
              Professional-grade image conversion with advanced features
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
              <h3 className="feature-title">Quality Preserved</h3>
              <p className="feature-description">
                Maintain image quality with advanced compression algorithms
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="feature-title">Multiple Formats</h3>
              <p className="feature-description">
                Support for all major image formats including modern WebP
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="feature-title">Secure & Private</h3>
              <p className="feature-description">
                Your images are encrypted and automatically deleted after processing
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
              Start converting your images now - it's completely free and secure!
            </p>
            <div className="cta-buttons">
              <Link to="/tools" className="btn btn-secondary">
                View All Tools
              </Link>
              <Link to="/" className="btn btn-primary">
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