import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileVideo, FileImage, Settings, Download, X } from 'lucide-react';
import './Convert.css';

interface FileInfo {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'converting' | 'completed' | 'error';
}

const Convert: React.FC = () => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('mp4');
  const [quality, setQuality] = useState('high');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedFormats = {
    video: ['mp4', 'avi', 'mov', 'mkv', 'wmv', 'flv', 'webm'],
    image: ['jpg', 'png', 'gif', 'bmp', 'webp', 'svg']
  };

  const qualityOptions = [
    { value: 'low', label: 'Low Quality', description: 'Smaller file size' },
    { value: 'medium', label: 'Medium Quality', description: 'Balanced size and quality' },
    { value: 'high', label: 'High Quality', description: 'Best quality, larger file' }
  ];

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
    const fileInfos: FileInfo[] = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'uploading'
    }));

    setFiles(prev => [...prev, ...fileInfos]);

    // Simulate upload and conversion process
    fileInfos.forEach(fileInfo => {
      simulateConversion(fileInfo.id);
    });
  };

  const simulateConversion = (fileId: string) => {
    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setFiles(prev => prev.map(file => {
        if (file.id === fileId && file.progress < 100) {
          const newProgress = Math.min(file.progress + Math.random() * 20, 100);
          const newStatus = newProgress === 100 ? 'converting' : 'uploading';
          return { ...file, progress: newProgress, status: newStatus };
        }
        return file;
      }));
    }, 200);

    // Simulate conversion completion
    setTimeout(() => {
      clearInterval(uploadInterval);
      setFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          return { ...file, status: 'completed', progress: 100 };
        }
        return file;
      }));
    }, 3000);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const downloadFile = (fileId: string) => {
    // Simulate download
    console.log(`Downloading file ${fileId}`);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="convert-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="convert-hero"
      >
        <h1>Convert Your Media</h1>
        <p>Transform your videos and images to any format with ease</p>
      </motion.div>

      <div className="convert-content">
        <div className="convert-grid">
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
              <h3>Drop files here or click to upload</h3>
              <p>Support for video and image files</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="video/*,image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </div>

            <div className="supported-formats">
              <h4>Supported Formats</h4>
              <div className="format-lists">
                <div className="format-group">
                  <FileVideo className="format-icon" />
                  <span>Video: {supportedFormats.video.join(', ')}</span>
                </div>
                <div className="format-group">
                  <FileImage className="format-icon" />
                  <span>Image: {supportedFormats.image.join(', ')}</span>
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
                <Settings className="settings-icon" />
                <h3>Conversion Settings</h3>
              </div>

              <div className="setting-group">
                <label htmlFor="format">Output Format</label>
                <select
                  id="format"
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                >
                  {supportedFormats.video.map(format => (
                    <option key={format} value={format}>{format.toUpperCase()}</option>
                  ))}
                  {supportedFormats.image.map(format => (
                    <option key={format} value={format}>{format.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              <div className="setting-group">
                <label>Quality</label>
                <div className="quality-options">
                  {qualityOptions.map(option => (
                    <label key={option.value} className="quality-option">
                      <input
                        type="radio"
                        name="quality"
                        value={option.value}
                        checked={quality === option.value}
                        onChange={(e) => setQuality(e.target.value)}
                      />
                      <div className="quality-content">
                        <span className="quality-label">{option.label}</span>
                        <span className="quality-description">{option.description}</span>
                      </div>
                    </label>
                  ))}
                </div>
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
            <h3>Files ({files.length})</h3>
            <div className="files-list">
              {files.map(file => (
                <div key={file.id} className="file-item">
                  <div className="file-info">
                    <div className="file-name">{file.name}</div>
                    <div className="file-size">{formatFileSize(file.size)}</div>
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

                  <div className="file-actions">
                    {file.status === 'completed' && (
                      <button
                        onClick={() => downloadFile(file.id)}
                        className="download-btn"
                      >
                        <Download />
                      </button>
                    )}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="remove-btn"
                    >
                      <X />
                    </button>
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

export default Convert; 