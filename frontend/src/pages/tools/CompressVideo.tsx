import React, { useState, useRef } from 'react';
import { Upload, Download, Video, X, Settings, Info, Zap } from 'lucide-react';
import './ToolPage.css';

const CompressVideo: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [compressionSettings, setCompressionSettings] = useState({
    quality: 'medium',
    format: 'mp4',
    resolution: '720p',
    bitrate: '2000'
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
    if (file.type.startsWith('video/')) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB for free users');
        return;
      }
      setUploadedFile(file);
      setFileSize({ original: file.size, compressed: 0 });
      setIsProcessed(false);
      setProcessedFile(null);
    } else {
      alert('Please upload a video file (MP4, AVI, MOV, etc.)');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const processVideo = async () => {
    if (!uploadedFile) return;
    
    setIsProcessing(true);
    
    // Simulate video processing
    setTimeout(() => {
      const qualityMultiplier = compressionSettings.quality === 'high' ? 0.8 : 
                               compressionSettings.quality === 'medium' ? 0.6 : 0.4;
      const compressedSize = Math.round(uploadedFile.size * qualityMultiplier);
      setFileSize(prev => ({ ...prev, compressed: compressedSize }));
      setIsProcessing(false);
      setIsProcessed(true);
      
      const processedFile = new File([uploadedFile], 
        `compressed_${uploadedFile.name}`, 
        { type: `video/${compressionSettings.format}` }
      );
      setProcessedFile(processedFile);
    }, 3000);
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
              <Video size={32} />
            </div>
            <div className="tool-info">
              <h1>Compress Video</h1>
              <p>Reduce video file size while maintaining quality. Support for MP4, AVI, MOV, and more.</p>
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
                    <h3>Drop your video here</h3>
                    <p>or click to browse</p>
                    <span className="upload-hint">Supports MP4, AVI, MOV, MKV (Max 10MB)</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleFileInput}
                      style={{ display: 'none' }}
                    />
                  </div>
                ) : (
                  <div className="file-info">
                    <div className="file-details">
                      <Video size={48} />
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
                          <select
                            id="quality"
                            value={compressionSettings.quality}
                            onChange={(e) => setCompressionSettings({
                              ...compressionSettings,
                              quality: e.target.value
                            })}
                          >
                            <option value="high">High Quality</option>
                            <option value="medium">Medium Quality</option>
                            <option value="low">Low Quality</option>
                          </select>
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
                            <option value="mp4">MP4</option>
                            <option value="avi">AVI</option>
                            <option value="mov">MOV</option>
                            <option value="mkv">MKV</option>
                          </select>
                        </div>
                        
                        <div className="setting-group">
                          <label htmlFor="resolution">Resolution</label>
                          <select
                            id="resolution"
                            value={compressionSettings.resolution}
                            onChange={(e) => setCompressionSettings({
                              ...compressionSettings,
                              resolution: e.target.value
                            })}
                          >
                            <option value="1080p">1080p</option>
                            <option value="720p">720p</option>
                            <option value="480p">480p</option>
                          </select>
                        </div>
                        
                        <div className="setting-group">
                          <label htmlFor="bitrate">Bitrate (kbps)</label>
                          <select
                            id="bitrate"
                            value={compressionSettings.bitrate}
                            onChange={(e) => setCompressionSettings({
                              ...compressionSettings,
                              bitrate: e.target.value
                            })}
                          >
                            <option value="5000">5000</option>
                            <option value="3000">3000</option>
                            <option value="2000">2000</option>
                            <option value="1000">1000</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                      {!isProcessed ? (
                        <button
                          className="btn btn-primary btn-large"
                          onClick={processVideo}
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <div className="spinner"></div>
                              Processing...
                            </>
                          ) : (
                            <>
                              <Zap size={20} />
                              Compress Video
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
                            Download Compressed Video
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={resetUpload}
                          >
                            <Upload size={20} />
                            Upload Another Video
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
              <p>Compress videos up to 10MB for free. No registration required.</p>
            </div>
            <div className="info-card">
              <Video size={24} />
              <h4>Multiple Formats</h4>
              <p>Support for MP4, AVI, MOV, MKV, and more video formats.</p>
            </div>
            <div className="info-card">
              <Settings size={24} />
              <h4>Quality Control</h4>
              <p>Adjust quality, resolution, and bitrate settings for optimal compression.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompressVideo; 