import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image, Download, X, FileDown, Zap, Shield, Clock, Users } from 'lucide-react';
import './CompressImage.css';

interface CompressFile {
  id: string;
  name: string;
  size: number;
  compressedSize?: number;
  type: string;
  progress: number;
  status: 'uploading' | 'compressing' | 'completed' | 'error';
  preview?: string;
}

const Compress: React.FC = () => {
  const [files, setFiles] = useState<CompressFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState(80);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [maxHeight, setMaxHeight] = useState(1080);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles: File[]) => {
    const imageFiles = newFiles.filter(file => file.type.startsWith('image/'));
    
    const fileInfos: CompressFile[] = imageFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'uploading',
      preview: URL.createObjectURL(file)
    }));

    setFiles(prev => [...prev, ...fileInfos]);

    // Simulate upload and compression process
    fileInfos.forEach(fileInfo => {
      simulateCompression(fileInfo.id);
    });
  };

  const simulateCompression = (fileId: string) => {
    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setFiles(prev => prev.map(file => {
        if (file.id === fileId && file.progress < 100) {
          const newProgress = Math.min(file.progress + Math.random() * 15, 100);
          let newStatus = file.status;
          
          if (newProgress >= 100) {
            newStatus = 'compressing';
          }
          
          return { ...file, progress: newProgress, status: newStatus };
        }
        return file;
      }));
    }, 300);

    // Simulate compression completion
    setTimeout(() => {
      clearInterval(uploadInterval);
      setFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          const compressionRatio = (100 - compressionLevel) / 100;
          const compressedSize = Math.round(file.size * compressionRatio);
          return { 
            ...file, 
            status: 'completed', 
            progress: 100,
            compressedSize
          };
        }
        return file;
      }));
    }, 4000);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(file => file.id !== fileId);
    });
  };

  const downloadFile = (fileId: string) => {
    // Simulate download
    console.log(`Downloading compressed file ${fileId}`);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCompressionRatio = (originalSize: number, compressedSize?: number) => {
    if (!compressedSize) return 0;
    return Math.round(((originalSize - compressedSize) / originalSize) * 100);
  };

  return (
    <div className="compress-container">
      <div className="compress-hero">
        <h1>Professional Image Compression</h1>
        <p>Optimize your images with advanced compression algorithms while maintaining exceptional quality. Perfect for web, mobile, and print applications.</p>
        
        <div className="hero-features">
          <div className="hero-feature">
            <Zap />
            <span>Lightning Fast</span>
          </div>
          <div className="hero-feature">
            <Shield />
            <span>Secure Processing</span>
          </div>
          <div className="hero-feature">
            <Clock />
            <span>Batch Processing</span>
          </div>
          <div className="hero-feature">
            <Users />
            <span>Free to Use</span>
          </div>
        </div>
        
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-number">10M+</div>
            <div className="hero-stat-label">Images Processed</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">95%</div>
            <div className="hero-stat-label">Size Reduction</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">50+</div>
            <div className="hero-stat-label">File Formats</div>
          </div>
        </div>
      </div>

      <div className="compress-content">
        <div className="compress-grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="upload-section"
          >
            <div
              className={`upload-area ${isDragOver ? 'drag-over' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="upload-icon" />
              <h3>Drop images here or click to upload</h3>
              <p>Support for JPG, PNG, GIF, WebP formats</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </div>

            <div className="supported-formats">
              <h4>Supported Formats</h4>
              <div className="format-lists">
                <div className="format-group">
                  <Image className="format-icon" />
                  <span>JPG, PNG, GIF, WebP, BMP, TIFF</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="settings-section"
          >
            <div className="settings-card">
              <div className="settings-header">
                <FileDown className="settings-icon" />
                <h3>Compression Settings</h3>
              </div>

              <div className="setting-group">
                <label htmlFor="compression">Quality Level: {compressionLevel}%</label>
                <input
                  type="range"
                  id="compression"
                  min="10"
                  max="100"
                  value={compressionLevel}
                  onChange={(e) => setCompressionLevel(Number(e.target.value))}
                  className="compression-slider"
                />
                <div className="compression-labels">
                  <span>High Compression</span>
                  <span>Low Compression</span>
                </div>
              </div>

              <div className="setting-group">
                <label className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    checked={maintainAspectRatio}
                    onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  Maintain aspect ratio
                </label>
              </div>

              <div className="setting-group">
                <label htmlFor="maxWidth">Max Width (px)</label>
                <input
                  type="number"
                  id="maxWidth"
                  value={maxWidth}
                  onChange={(e) => setMaxWidth(Number(e.target.value))}
                  min="100"
                  max="4000"
                  className="dimension-input"
                />
              </div>

              <div className="setting-group">
                <label htmlFor="maxHeight">Max Height (px)</label>
                <input
                  type="number"
                  id="maxHeight"
                  value={maxHeight}
                  onChange={(e) => setMaxHeight(Number(e.target.value))}
                  min="100"
                  max="4000"
                  className="dimension-input"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="files-section"
          >
            <h3>Images ({files.length})</h3>
            <div className="files-grid">
              {files.map(file => (
                <div key={file.id} className="file-card">
                  <div className="file-preview">
                    {file.preview && (
                      <img src={file.preview} alt={file.name} />
                    )}
                    <div className="file-overlay">
                      <div className="file-actions">
                        {file.status === 'completed' && (
                          <button
                            onClick={() => downloadFile(file.id)}
                            className="download-btn"
                            title="Download compressed image"
                          >
                            <Download />
                          </button>
                        )}
                        <button
                          onClick={() => removeFile(file.id)}
                          className="remove-btn"
                          title="Remove image"
                        >
                          <X />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="file-info">
                    <div className="file-name">{file.name}</div>
                    <div className="file-sizes">
                      <span className="original-size">
                        Original: {formatFileSize(file.size)}
                      </span>
                      {file.compressedSize && (
                        <span className="compressed-size">
                          Compressed: {formatFileSize(file.compressedSize)}
                        </span>
                      )}
                    </div>
                    {file.compressedSize && (
                      <div className="compression-ratio">
                        Saved: {getCompressionRatio(file.size, file.compressedSize)}%
                      </div>
                    )}
                  </div>

                  <div className="file-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                    <span className="progress-text">{Math.round(file.progress)}%</span>
                  </div>

                  <div className="file-status">
                    <span className={`status-badge ${file.status}`}>
                      {file.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Compress; 