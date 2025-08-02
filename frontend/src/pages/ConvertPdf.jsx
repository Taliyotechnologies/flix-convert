import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FileText, FileDown, Upload, Download, AlertCircle, CheckCircle, Clock, Settings } from 'lucide-react';
import './ToolPage.css';

const ConvertPdf = () => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('docx');
  const fileInputRef = useRef(null);

  const config = {
    title: 'Convert PDF',
    description: 'Convert PDF files to Word, Excel, PowerPoint, and image formats',
    icon: <FileText size={32} />,
    acceptedTypes: '.pdf',
    maxSize: 10 * 1024 * 1024, // 10MB
    formats: ['PDF'],
    outputFormats: [
      { value: 'docx', label: 'Word Document (.docx)', icon: <FileText size={20} /> },
      { value: 'xlsx', label: 'Excel Spreadsheet (.xlsx)', icon: <FileText size={20} /> },
      { value: 'pptx', label: 'PowerPoint (.pptx)', icon: <FileText size={20} /> },
      { value: 'jpg', label: 'Image (.jpg)', icon: <FileText size={20} /> },
      { value: 'png', label: 'Image (.png)', icon: <FileText size={20} /> }
    ]
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleFileSelect = (selectedFile) => {
    if (selectedFile.size > config.maxSize) {
      setShowSignupPrompt(true);
      return;
    }

    setFile(selectedFile);
    setResult(null);
    setShowSignupPrompt(false);
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const processFile = async () => {
    if (!file) return;

    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      const originalSize = file.size;
      const convertedSize = Math.round(originalSize * 0.8); // Simulate conversion
      
      setResult({
        originalSize,
        convertedSize,
        downloadUrl: URL.createObjectURL(file), // In real app, this would be the converted file
        format: selectedFormat
      });
      
      setIsProcessing(false);
    }, 2000);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFilePreview = () => {
    if (!file) return null;

    return (
      <div className="file-preview">
        <div className="file-icon">{config.icon}</div>
        <div className="file-info">
          <div className="file-name">{file.name}</div>
          <div className="file-size">{formatFileSize(file.size)}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Convert PDF - ConvertFlix</title>
        <meta name="description" content="Convert PDF files to Word, Excel, PowerPoint, and image formats. Free up to 10MB." />
      </Helmet>

      <div className="tool-page">
        <div className="container">
          {/* Header */}
          <div className="tool-header">
            <div className="tool-icon">{config.icon}</div>
            <h1 className="tool-title">{config.title}</h1>
            <p className="tool-description">{config.description}</p>
            <div className="tool-formats">
              <span className="formats-label">Supported formats:</span>
              <span className="formats-list">{config.formats.join(', ')}</span>
            </div>
          </div>

          {/* Upload Area */}
          <div className="upload-section">
            {showSignupPrompt ? (
              <div className="signup-prompt">
                <div className="prompt-icon">
                  <AlertCircle size={48} />
                </div>
                <h3 className="prompt-title">File Too Large</h3>
                <p className="prompt-description">
                  Your file exceeds the 10MB limit for free users. Sign up to process files up to 100MB.
                </p>
                <div className="prompt-features">
                  <div className="feature">
                    <CheckCircle size={20} />
                    <span>Up to 100MB files</span>
                  </div>
                  <div className="feature">
                    <CheckCircle size={20} />
                    <span>Unlimited processing</span>
                  </div>
                  <div className="feature">
                    <CheckCircle size={20} />
                    <span>Priority processing</span>
                  </div>
                </div>
                <div className="prompt-actions">
                  <Link to="/signup" className="btn btn-primary">
                    Sign Up Free
                  </Link>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setShowSignupPrompt(false)}
                  >
                    Try Smaller File
                  </button>
                </div>
              </div>
            ) : !file ? (
              <div 
                className={`upload-area ${isDragOver ? 'drag-over' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="upload-icon">
                  <Upload size={48} />
                </div>
                <h3 className="upload-title">Drop your PDF here</h3>
                <p className="upload-subtitle">or click to browse</p>
                <p className="upload-limit">Maximum file size: {config.maxSize / (1024 * 1024)}MB</p>
                <p className="upload-note">For larger files, <Link to="/signup" className="signup-link">sign up</Link> to unlock up to 100MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={config.acceptedTypes}
                  onChange={handleFileInput}
                  style={{ display: 'none' }}
                />
              </div>
            ) : (
              <div className="file-section">
                {getFilePreview()}
                
                {/* Format Selection */}
                <div className="format-selection">
                  <h3 className="format-title">Select Output Format</h3>
                  <div className="format-grid">
                    {config.outputFormats.map((format) => (
                      <button
                        key={format.value}
                        className={`format-option ${selectedFormat === format.value ? 'selected' : ''}`}
                        onClick={() => setSelectedFormat(format.value)}
                      >
                        <div className="format-icon">{format.icon}</div>
                        <div className="format-label">{format.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="file-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={processFile}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="spinner"></div>
                        Converting...
                      </>
                    ) : (
                      <>
                        <Settings size={20} />
                        Convert to {selectedFormat.toUpperCase()}
                      </>
                    )}
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => {
                      setFile(null);
                      setResult(null);
                    }}
                  >
                    Choose Different File
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          {result && (
            <div className="results-section">
              <h2 className="results-title">Conversion Complete!</h2>
              <div className="results-grid">
                <div className="result-card">
                  <div className="result-label">Original Size</div>
                  <div className="result-value">{formatFileSize(result.originalSize)}</div>
                </div>
                <div className="result-card">
                  <div className="result-label">Converted Size</div>
                  <div className="result-value">{formatFileSize(result.convertedSize)}</div>
                </div>
                <div className="result-card">
                  <div className="result-label">Format</div>
                  <div className="result-value">{result.format.toUpperCase()}</div>
                </div>
              </div>
              <div className="download-section">
                <a 
                  href={result.downloadUrl} 
                  download={`converted_${file.name.replace('.pdf', '')}.${result.format}`}
                  className="btn btn-primary btn-large"
                >
                  <Download size={20} />
                  Download Converted File
                </a>
                <p className="expiry-note">
                  <Clock size={16} />
                  Auto-deleted in 24 hours
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ConvertPdf; 