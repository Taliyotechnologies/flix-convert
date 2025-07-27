import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Download, 
  Settings, 
  FileImage, 
  Zap, 
  Shield, 
  Clock, 
  Users,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';
import './CompressImage.css';

const Compress: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionComplete, setCompressionComplete] = useState(false);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      setSelectedFile(file);
      setCompressionComplete(false);
      setCompressedFile(null);
    }
  };

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
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const simulateCompression = async () => {
    if (!selectedFile) return;
    
    setIsCompressing(true);
    
    // Simulate compression process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create a mock compressed file
    const compressedFile = new File([selectedFile], `compressed_${selectedFile.name}`, {
      type: selectedFile.type,
    });
    
    setCompressedFile(compressedFile);
    setCompressionComplete(true);
    setIsCompressing(false);
  };

  const handleDownload = () => {
    if (compressedFile) {
      const url = URL.createObjectURL(compressedFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = compressedFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const resetProcess = () => {
    setSelectedFile(null);
    setCompressedFile(null);
    setCompressionComplete(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="compress-page">
      {/* Premium Hero Section */}
      <motion.div 
        className="compress-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-content">
          <h1 className="hero-title">
            Professional Image Compression
          </h1>
          <p className="hero-subtitle">
            Optimize your images with our advanced compression technology. 
            Reduce file sizes by up to 80% while maintaining exceptional quality.
          </p>
          
          <div className="hero-features">
            <div className="hero-feature">
              <Zap className="feature-icon" />
              <span>Lightning Fast</span>
            </div>
            <div className="hero-feature">
              <Shield className="feature-icon" />
              <span>Secure Processing</span>
            </div>
            <div className="hero-feature">
              <Clock className="feature-icon" />
              <span>Instant Results</span>
            </div>
            <div className="hero-feature">
              <Users className="feature-icon" />
              <span>Trusted by Millions</span>
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">50M+</span>
              <span className="stat-label">Images Processed</span>
            </div>
            <div className="stat">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
            <div className="stat">
              <span className="stat-number">80%</span>
              <span className="stat-label">Size Reduction</span>
            </div>
          </div>
        </div>

        <div className="floating-element floating-1"></div>
        <div className="floating-element floating-2"></div>
        <div className="floating-element floating-3"></div>
      </motion.div>

      {/* Compression Tool Section */}
      <section className="compression-tool">
        <div className="container">
          <div className="tool-container">
            <div className="upload-area">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />
              
              <div
                className={`upload-zone ${dragActive ? 'drag-active' : ''} ${selectedFile ? 'has-file' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                {!selectedFile ? (
                  <div className="upload-content">
                    <Upload className="upload-icon" />
                    <h3>Drop your image here</h3>
                    <p>or click to browse</p>
                    <span className="upload-hint">Supports JPG, PNG, WEBP, GIF</span>
                  </div>
                ) : (
                  <div className="file-preview">
                    <FileImage className="file-icon" />
                    <div className="file-info">
                      <h4>{selectedFile.name}</h4>
                      <p>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button 
                      className="remove-file"
                      onClick={(e) => {
                        e.stopPropagation();
                        resetProcess();
                      }}
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}
              </div>

              {selectedFile && (
                <div className="compression-options">
                  <h3>Compression Settings</h3>
                  <div className="options-grid">
                    <div className="option">
                      <label>Quality</label>
                      <select defaultValue="85">
                        <option value="90">High (90%)</option>
                        <option value="85">Medium (85%)</option>
                        <option value="75">Low (75%)</option>
                      </select>
                    </div>
                    <div className="option">
                      <label>Format</label>
                      <select defaultValue="webp">
                        <option value="webp">WebP</option>
                        <option value="jpg">JPG</option>
                        <option value="png">PNG</option>
                      </select>
                    </div>
                  </div>
                  
                  <button 
                    className="btn-primary compress-btn"
                    onClick={simulateCompression}
                    disabled={isCompressing}
                  >
                    {isCompressing ? (
                      <>
                        <div className="spinner"></div>
                        Compressing...
                      </>
                    ) : (
                      <>
                        <Settings size={18} />
                        Compress Image
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {compressionComplete && compressedFile && (
              <motion.div 
                className="result-area"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="result-header">
                  <CheckCircle className="success-icon" />
                  <h3>Compression Complete!</h3>
                </div>
                
                <div className="result-stats">
                                     <div className="stat-item">
                     <span className="stat-label">Original Size</span>
                     <span className="stat-value">{((selectedFile?.size || 0) / 1024 / 1024).toFixed(2)} MB</span>
                   </div>
                  <div className="stat-item">
                    <span className="stat-label">Compressed Size</span>
                    <span className="stat-value">{(compressedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Reduction</span>
                    <span className="stat-value success">-{Math.round(((selectedFile?.size || 0) - compressedFile.size) / (selectedFile?.size || 1) * 100)}%</span>
                  </div>
                </div>
                
                <button 
                  className="btn-primary download-btn"
                  onClick={handleDownload}
                >
                  <Download size={18} />
                  Download Compressed Image
                </button>
                
                <button 
                  className="btn-secondary"
                  onClick={resetProcess}
                >
                  Compress Another Image
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Compress; 