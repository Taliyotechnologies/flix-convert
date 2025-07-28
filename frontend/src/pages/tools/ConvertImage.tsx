import React, { useState, useRef } from 'react';
import { Upload, Download, Image, X, Settings, Info, FileImage } from 'lucide-react';
import './ToolPage.css';

const ConvertImage: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [conversionSettings, setConversionSettings] = useState({
    format: 'jpeg',
    quality: 90,
    preserveMetadata: true
  });
  const [processedFile, setProcessedFile] = useState<File | null>(null);
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
    
    // Simulate image conversion
    setTimeout(() => {
      setIsProcessing(false);
      setIsProcessed(true);
      
      // Create a mock converted file
      const convertedFile = new File([uploadedFile], 
        `converted_${uploadedFile.name.replace(/\.[^/.]+$/, '')}.${conversionSettings.format}`, 
        { type: `image/${conversionSettings.format}` }
      );
      setProcessedFile(convertedFile);
    }, 2000);
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setIsProcessed(false);
    setProcessedFile(null);
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

  return (
    <div className="tool-page">
      {/* Header */}
      <div className="tool-header">
        <div className="container">
          <div className="tool-header-content">
            <div className="tool-icon">
              <FileImage size={32} />
            </div>
            <div className="tool-info">
              <h1>Convert Image</h1>
              <p>Convert images between different formats. Support for JPG, PNG, WebP, GIF, and more.</p>
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
                    
                    {/* Conversion Settings */}
                    <div className="compression-settings">
                      <div className="settings-header">
                        <Settings size={20} />
                        <h4>Conversion Settings</h4>
                      </div>
                      
                      <div className="settings-grid">
                        <div className="setting-group">
                          <label htmlFor="format">Output Format</label>
                          <select
                            id="format"
                            value={conversionSettings.format}
                            onChange={(e) => setConversionSettings({
                              ...conversionSettings,
                              format: e.target.value
                            })}
                          >
                            <option value="jpeg">JPEG</option>
                            <option value="png">PNG</option>
                            <option value="webp">WebP</option>
                            <option value="gif">GIF</option>
                            <option value="bmp">BMP</option>
                            <option value="tiff">TIFF</option>
                          </select>
                        </div>
                        
                        <div className="setting-group">
                          <label htmlFor="quality">Quality</label>
                          <div className="quality-slider">
                            <input
                              id="quality"
                              type="range"
                              min="10"
                              max="100"
                              value={conversionSettings.quality}
                              onChange={(e) => setConversionSettings({
                                ...conversionSettings,
                                quality: parseInt(e.target.value)
                              })}
                            />
                            <span>{conversionSettings.quality}%</span>
                          </div>
                        </div>
                        
                        <div className="setting-group">
                          <label htmlFor="metadata">
                            <input
                              id="metadata"
                              type="checkbox"
                              checked={conversionSettings.preserveMetadata}
                              onChange={(e) => setConversionSettings({
                                ...conversionSettings,
                                preserveMetadata: e.target.checked
                              })}
                            />
                            Preserve Metadata
                          </label>
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
                              <div className="spinner"></div>
                              Converting...
                            </>
                          ) : (
                            <>
                              <FileImage size={20} />
                              Convert Image
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
                            Download Converted Image
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
                  <h3>Conversion Complete</h3>
                  
                  <div className="results-stats">
                    <div className="stat-item">
                      <span className="stat-label">Original Format</span>
                      <span className="stat-value">{uploadedFile?.name.split('.').pop()?.toUpperCase()}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">New Format</span>
                      <span className="stat-value success">{conversionSettings.format.toUpperCase()}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">File Size</span>
                      <span className="stat-value">{formatFileSize(processedFile?.size || 0)}</span>
                    </div>
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
              <p>Convert images up to 10MB for free. No registration required.</p>
            </div>
            <div className="info-card">
              <FileImage size={24} />
              <h4>Multiple Formats</h4>
              <p>Convert between JPG, PNG, WebP, GIF, BMP, TIFF and more formats.</p>
            </div>
            <div className="info-card">
              <Settings size={24} />
              <h4>Quality Control</h4>
              <p>Adjust quality settings and preserve metadata during conversion.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvertImage; 