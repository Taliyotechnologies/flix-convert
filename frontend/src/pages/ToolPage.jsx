import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Upload, Download, File, Image, Music, Video, FileText, X, Settings } from 'lucide-react';
import './ToolPage.css';

const ToolPage = () => {
  const { type } = useParams();
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const toolConfig = {
    'compress-image': {
      title: 'Compress Image',
      description: 'Reduce image file size while maintaining quality',
      icon: <Image size={48} />,
      acceptedTypes: 'image/*',
      maxSize: 10 * 1024 * 1024, // 10MB
      formats: ['JPG', 'PNG', 'WebP', 'GIF']
    },
    'compress-video': {
      title: 'Compress Video',
      description: 'Reduce video file size with quality preservation',
      icon: <Video size={48} />,
      acceptedTypes: 'video/*',
      maxSize: 10 * 1024 * 1024,
      formats: ['MP4', 'AVI', 'MOV', 'MKV']
    },
    'compress-pdf': {
      title: 'Compress PDF',
      description: 'Reduce PDF file size for easier sharing',
      icon: <FileText size={48} />,
      acceptedTypes: '.pdf',
      maxSize: 10 * 1024 * 1024,
      formats: ['PDF']
    },
    'convert-audio': {
      title: 'Convert Audio',
      description: 'Convert between audio formats',
      icon: <Music size={48} />,
      acceptedTypes: 'audio/*',
      maxSize: 10 * 1024 * 1024,
      formats: ['MP3', 'WAV', 'AAC', 'OGG', 'FLAC']
    },
    'convert-video': {
      title: 'Convert Video',
      description: 'Convert video to different formats',
      icon: <Video size={48} />,
      acceptedTypes: 'video/*',
      maxSize: 10 * 1024 * 1024,
      formats: ['MP4', 'AVI', 'MOV', 'MKV', 'WebM']
    },
    'convert-image': {
      title: 'Convert Image',
      description: 'Convert images between formats',
      icon: <Image size={48} />,
      acceptedTypes: 'image/*',
      maxSize: 10 * 1024 * 1024,
      formats: ['JPG', 'PNG', 'WebP', 'GIF', 'BMP']
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
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const processFile = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      const originalSize = file.size;
      const compressedSize = Math.round(originalSize * 0.7); // Simulate 30% compression
      
      setProcessedFile({
        name: file.name.replace(/\.[^/.]+$/, '') + '_compressed.' + file.name.split('.').pop(),
        size: compressedSize,
        originalSize: originalSize,
        compressionRatio: ((originalSize - compressedSize) / originalSize * 100).toFixed(1)
      });
      setIsProcessing(false);
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
      <div className="container">
        {/* Header */}
        <div className="tool-header">
          <div className="tool-icon">
            {config.icon}
          </div>
          <div className="tool-info">
            <h1>{config.title}</h1>
            <p>{config.description}</p>
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
              <Upload size={48} />
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
                <File size={32} />
                <div className="file-details">
                  <h3>{file.name}</h3>
                  <p>{formatFileSize(file.size)}</p>
                </div>
                <button className="remove-file" onClick={removeFile}>
                  <X size={20} />
                </button>
              </div>
              
              {!processedFile && (
                <button 
                  className="btn btn-primary btn-large"
                  onClick={processFile}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Process File'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        {processedFile && (
          <div className="results-section">
            <h2>Results</h2>
            <div className="results-grid">
              <div className="result-card">
                <h3>Original Size</h3>
                <div className="result-value">{formatFileSize(processedFile.originalSize)}</div>
              </div>
              <div className="result-card">
                <h3>Compressed Size</h3>
                <div className="result-value">{formatFileSize(processedFile.size)}</div>
              </div>
              <div className="result-card">
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
            
            <div className="expiry-notice">
              <p>⚠️ Files are automatically deleted after 24 hours for security</p>
            </div>
          </div>
        )}

        {/* Settings */}
        <div className="settings-section">
          <h2>Advanced Settings</h2>
          <div className="settings-grid">
            <div className="setting-item">
              <label>Quality</label>
              <select defaultValue="high">
                <option value="low">Low (Smaller file)</option>
                <option value="medium">Medium (Balanced)</option>
                <option value="high">High (Better quality)</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Format</label>
              <select defaultValue="auto">
                <option value="auto">Auto (Best)</option>
                {config.formats.map(format => (
                  <option key={format} value={format.toLowerCase()}>{format}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPage; 