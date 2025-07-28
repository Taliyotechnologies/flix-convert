import React, { useState, useRef } from 'react';
import { Upload, Download, Image, X, Settings, Info } from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';
import './ToolPage.css';

const CompressImage: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [compressionSettings, setCompressionSettings] = useState({
    quality: 80,
    format: 'jpeg',
    maxWidth: 1920,
    maxHeight: 1080
  });
  const [processedFile, setProcessedFile] = useState<File | null>(null);
  const [fileSize, setFileSize] = useState({ original: 0, compressed: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB for free users');
        return;
      }
      setUploadedFile(file);
      setFileSize({ original: file.size, compressed: 0 });
      setIsProcessed(false);
      setProcessedFile(null);
    } else {
      alert('Please upload an image file (JPG, PNG, WebP, etc.)');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const processImage = async () => {
    if (!uploadedFile) return;
    
    setIsProcessing(true);
    
    // Simulate image processing
    setTimeout(() => {
      const compressedSize = Math.round(uploadedFile.size * (compressionSettings.quality / 100));
      setFileSize(prev => ({ ...prev, compressed: compressedSize }));
      setIsProcessing(false);
      setIsProcessed(true);
      
      // Create a mock processed file
      const processedFile = new File([uploadedFile], 
        `compressed_${uploadedFile.name}`, 
        { type: `image/${compressionSettings.format}` }
      );
      setProcessedFile(processedFile);
    }, 2000);
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setIsProcessed(false);
    setProcessedFile(null);
    setFileSize({ original: 0, compressed: 0 });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadFile = () => {
    if (!processedFile) return;
    
    const url = URL.createObjectURL(processedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = processedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCompressionRatio = () => {
    if (fileSize.original === 0) return 0;
    return Math.round(((fileSize.original - fileSize.compressed) / fileSize.original) * 100);
  };

  return (
    <div className="tool-page">
      {/* Header */}
      <div className="tool-header">
        <div className="container">
          <div className="tool-header-content">
            <div className="tool-icon">
              <Image size={32} />
            </div>
            <div className="tool-info">
              <h1>Compress Image</h1>
              <p>Reduce image file size while maintaining quality. Support for JPG, PNG, WebP, and more.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="tool-content">
        <div className="container">
          <div className="tool-layout">
            {/* Upload Section */}
            <div className="upload-section">
              <div className="upload-area">
                {!uploadedFile ? (
                  <div
                    className={`file-upload ${dragActive ? 'dragover' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={48} />
                    <h3>Drop your image here</h3>
                    <p>or click to browse</p>
                    <span className="upload-hint">Supports JPG, PNG, WebP, GIF (Max 10MB)</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileInput}
                      style={{ display: 'none' }}
                    />
                  </div>
                ) : (
                  <div className="file-info">
                    <div className="file-details">
                      <Image size={48} />
                      <div className="file-text">
                        <h3>{uploadedFile.name}</h3>
                        <p>{formatFileSize(uploadedFile.size)}</p>
                      </div>
                      <button 
                        className="remove-file"
                        onClick={resetUpload}
                        aria-label="Remove file"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    {/* Compression Settings */}
                    <div className="compression-settings">
                      <div className="settings-header">
                        <Settings size={20} />
                        <h4>Compression Settings</h4>
                      </div>
                      
                      <div className="settings-grid">
                        <div className="setting-group">
                          <label htmlFor="quality">Quality</label>
                          <div className="quality-slider">
                            <input
                              id="quality"
                              type="range"
                              min="10"
                              max="100"
                              value={compressionSettings.quality}
                              onChange={(e) => setCompressionSettings({
                                ...compressionSettings,
                                quality: parseInt(e.target.value)
                              })}
                            />
                            <span>{compressionSettings.quality}%</span>
                          </div>
                        </div>
                        
                        <div className="setting-group">
                          <label htmlFor="format">Output Format</label>
                          <select
                            id="format"
                            value={compressionSettings.format}
                            onChange={(e) => setCompressionSettings({
                              ...compressionSettings,
                              format: e.target.value
                            })}
                          >
                            <option value="jpeg">JPEG</option>
                            <option value="png">PNG</option>
                            <option value="webp">WebP</option>
                          </select>
                        </div>
                        
                        <div className="setting-group">
                          <label htmlFor="maxWidth">Max Width</label>
                          <input
                            id="maxWidth"
                            type="number"
                            value={compressionSettings.maxWidth}
                            onChange={(e) => setCompressionSettings({
                              ...compressionSettings,
                              maxWidth: parseInt(e.target.value)
                            })}
                            min="100"
                            max="4000"
                          />
                        </div>
                        
                        <div className="setting-group">
                          <label htmlFor="maxHeight">Max Height</label>
                          <input
                            id="maxHeight"
                            type="number"
                            value={compressionSettings.maxHeight}
                            onChange={(e) => setCompressionSettings({
                              ...compressionSettings,
                              maxHeight: parseInt(e.target.value)
                            })}
                            min="100"
                            max="4000"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                      {!isProcessed ? (
                        <button
                          className="btn btn-primary btn-large"
                          onClick={processImage}
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <LoadingSpinner size="small" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Image size={20} />
                              Compress Image
                            </>
                          )}
                        </button>
                      ) : (
                        <div className="success-actions">
                          <button
                            className="btn btn-primary btn-large"
                            onClick={downloadFile}
                          >
                            <Download size={20} />
                            Download Compressed Image
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={resetUpload}
                          >
                            <Upload size={20} />
                            Upload Another Image
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Results Section */}
            {isProcessed && (
              <div className="results-section">
                <div className="results-card">
                  <h3>Compression Results</h3>
                  
                  <div className="results-stats">
                    <div className="stat-item">
                      <span className="stat-label">Original Size</span>
                      <span className="stat-value">{formatFileSize(fileSize.original)}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Compressed Size</span>
                      <span className="stat-value">{formatFileSize(fileSize.compressed)}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Compression Ratio</span>
                      <span className="stat-value success">{getCompressionRatio()}%</span>
                    </div>
                  </div>
                  
                  <div className="compression-bar">
                    <div 
                      className="compression-fill"
                      style={{ width: `${100 - getCompressionRatio()}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="tool-info-section">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <Info size={24} />
              <h4>Free Tier</h4>
              <p>Process images up to 10MB for free. No registration required.</p>
            </div>
            <div className="info-card">
              <Image size={24} />
              <h4>Multiple Formats</h4>
              <p>Support for JPG, PNG, WebP, GIF, and more image formats.</p>
            </div>
            <div className="info-card">
              <Settings size={24} />
              <h4>Quality Control</h4>
              <p>Adjust quality settings to balance file size and image quality.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompressImage; 