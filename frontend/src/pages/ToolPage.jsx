import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Upload, Download, File, Image, Music, Video, FileText, X, Settings, CheckCircle, AlertCircle, Info, Zap, Shield, Clock } from 'lucide-react';
import './ToolPage.css';

const ToolPage = () => {
  const { type } = useParams();
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [quality, setQuality] = useState('high');
  const [format, setFormat] = useState('auto');
  const [showSettings, setShowSettings] = useState(false);
  const fileInputRef = useRef(null);

  const toolConfig = {
    'compress-image': {
      title: 'Compress Image',
      description: 'Reduce image file size while maintaining quality',
      icon: <Image size={48} />,
      acceptedTypes: 'image/*',
      maxSize: 10 * 1024 * 1024, // 10MB
      formats: ['JPG', 'PNG', 'WebP', 'GIF'],
      features: ['Quality Preservation', 'Fast Processing', 'Multiple Formats']
    },
    'compress-video': {
      title: 'Compress Video',
      description: 'Reduce video file size with quality preservation',
      icon: <Video size={48} />,
      acceptedTypes: 'video/*',
      maxSize: 10 * 1024 * 1024,
      formats: ['MP4', 'AVI', 'MOV', 'MKV'],
      features: ['Quality Preservation', 'Fast Processing', 'Multiple Formats']
    },
    'compress-pdf': {
      title: 'Compress PDF',
      description: 'Reduce PDF file size for easier sharing',
      icon: <FileText size={48} />,
      acceptedTypes: '.pdf',
      maxSize: 10 * 1024 * 1024,
      formats: ['PDF'],
      features: ['Text Preservation', 'Fast Processing', 'Secure']
    },
    'convert-audio': {
      title: 'Convert Audio',
      description: 'Convert between audio formats',
      icon: <Music size={48} />,
      acceptedTypes: 'audio/*',
      maxSize: 10 * 1024 * 1024,
      formats: ['MP3', 'WAV', 'AAC', 'OGG', 'FLAC'],
      features: ['High Quality', 'Fast Conversion', 'Multiple Formats']
    },
    'convert-video': {
      title: 'Convert Video',
      description: 'Convert video to different formats',
      icon: <Video size={48} />,
      acceptedTypes: 'video/*',
      maxSize: 10 * 1024 * 1024,
      formats: ['MP4', 'AVI', 'MOV', 'MKV', 'WebM'],
      features: ['High Quality', 'Fast Conversion', 'Multiple Formats']
    },
    'convert-image': {
      title: 'Convert Image',
      description: 'Convert images between formats',
      icon: <Image size={48} />,
      acceptedTypes: 'image/*',
      maxSize: 10 * 1024 * 1024,
      formats: ['JPG', 'PNG', 'WebP', 'GIF', 'BMP'],
      features: ['Quality Preservation', 'Fast Conversion', 'Multiple Formats']
    }
  };

  const config = toolConfig[type] || toolConfig['compress-image'];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
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
    setProcessedFile(null);
    setProgress(0);
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const processFile = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate processing with progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate processing completion
    setTimeout(() => {
      const originalSize = file.size;
      const compressionRatio = quality === 'low' ? 0.5 : quality === 'medium' ? 0.7 : 0.8;
      const compressedSize = Math.round(originalSize * compressionRatio);
      
      setProcessedFile({
        name: file.name.replace(/\.[^/.]+$/, '') + '_processed.' + file.name.split('.').pop(),
        size: compressedSize,
        originalSize: originalSize,
        compressionRatio: ((originalSize - compressedSize) / originalSize * 100).toFixed(1)
      });
      setIsProcessing(false);
      setProgress(100);
    }, 2000);
  };

  const downloadFile = () => {
    if (!processedFile) return;
    
    // Create a dummy download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file); // In real app, this would be the processed file
    link.download = processedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const removeFile = () => {
    setFile(null);
    setProcessedFile(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
    <div className="tool-page">
      {/* Header */}
      <div className="tool-header">
          <div className="tool-icon">
            {config.icon}
          </div>
          <div className="tool-info">
            <h1>{config.title}</h1>
            <p>{config.description}</p>
            <div className="tool-features">
              {config.features.map((feature, index) => (
                <span key={index} className="feature-tag">
                  <CheckCircle size={16} />
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* File Upload Area */}
        <div className="upload-section">
          {!file ? (
            <div
              className={`upload-area ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="upload-icon">
                <Upload size={48} />
              </div>
              <h3>Drop your file here or click to browse</h3>
              <p>Maximum file size: {config.maxSize / (1024 * 1024)}MB</p>
              <p>Supported formats: {config.formats.join(', ')}</p>
              <button 
                className="btn btn-primary"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept={config.acceptedTypes}
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />
            </div>
          ) : (
            <div className="file-preview">
              <div className="file-info">
                <div className="file-icon">
                  <File size={32} />
                </div>
                <div className="file-details">
                  <h3>{file.name}</h3>
                  <p>{formatFileSize(file.size)}</p>
                </div>
                <button className="remove-file" onClick={removeFile}>
                  <X size={20} />
                </button>
              </div>
              
              {!processedFile && (
                <div className="process-section">
                  <button 
                    className="btn btn-primary btn-large"
                    onClick={processFile}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="spinner"></div>
                        Processing... {progress}%
                      </>
                    ) : (
                      <>
                        <Zap size={20} />
                        Process File
                      </>
                    )}
                  </button>
                  
                  {isProcessing && (
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        {processedFile && (
          <div className="results-section">
            <div className="results-header">
              <h2>Results</h2>
              <div className="success-badge">
                <CheckCircle size={20} />
                Processing Complete
              </div>
            </div>
            
            <div className="results-grid">
              <div className="result-card">
                <div className="result-icon">
                  <File size={24} />
                </div>
                <h3>Original Size</h3>
                <div className="result-value">{formatFileSize(processedFile.originalSize)}</div>
              </div>
              <div className="result-card">
                <div className="result-icon">
                  <Zap size={24} />
                </div>
                <h3>Processed Size</h3>
                <div className="result-value">{formatFileSize(processedFile.size)}</div>
              </div>
              <div className="result-card">
                <div className="result-icon">
                  <Shield size={24} />
                </div>
                <h3>Space Saved</h3>
                <div className="result-value">{processedFile.compressionRatio}%</div>
              </div>
            </div>
            
            <div className="download-section">
              <button className="btn btn-primary btn-large" onClick={downloadFile}>
                <Download size={20} />
                Download File
              </button>
            </div>
            
            <div className="info-cards">
              <div className="info-card">
                <Clock size={20} />
                <div>
                  <h4>Auto Delete</h4>
                  <p>Files are automatically deleted after 24 hours for security</p>
                </div>
              </div>
              <div className="info-card">
                <Shield size={20} />
                <div>
                  <h4>Secure Processing</h4>
                  <p>Your files are encrypted and never stored permanently</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings */}
        <div className="settings-section">
          <div className="settings-header">
            <h2>Advanced Settings</h2>
            <button 
              className="settings-toggle"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings size={20} />
              {showSettings ? 'Hide' : 'Show'} Settings
            </button>
          </div>
          
          {showSettings && (
            <div className="settings-content">
              <div className="settings-grid">
                <div className="setting-item">
                  <label>Quality</label>
                  <select value={quality} onChange={(e) => setQuality(e.target.value)}>
                    <option value="low">Low (Smaller file)</option>
                    <option value="medium">Medium (Balanced)</option>
                    <option value="high">High (Better quality)</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Format</label>
                  <select value={format} onChange={(e) => setFormat(e.target.value)}>
                    <option value="auto">Auto (Best)</option>
                    {config.formats.map(format => (
                      <option key={format} value={format.toLowerCase()}>{format}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
    </div>
  );
};

export default ToolPage; 