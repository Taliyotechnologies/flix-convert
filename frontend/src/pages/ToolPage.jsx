import React, { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import './ToolPage.css'

const ToolPage = () => {
  const { type } = useParams()
  const [file, setFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedFile, setProcessedFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef()

  const toolConfig = {
    'compress-image': {
      name: 'Compress Image',
      description: 'Reduce image file size while maintaining quality',
      icon: '🖼️',
      acceptedTypes: 'image/*',
      maxSize: 10 * 1024 * 1024 // 10MB
    },
    'compress-pdf': {
      name: 'Compress PDF',
      description: 'Reduce PDF file size for easier sharing',
      icon: '📄',
      acceptedTypes: '.pdf',
      maxSize: 10 * 1024 * 1024
    },
    'compress-video': {
      name: 'Compress Video',
      description: 'Reduce video file size with quality control',
      icon: '🎬',
      acceptedTypes: 'video/*',
      maxSize: 10 * 1024 * 1024
    },
    'convert-audio': {
      name: 'Convert Audio',
      description: 'Convert between audio formats',
      icon: '🎵',
      acceptedTypes: 'audio/*',
      maxSize: 10 * 1024 * 1024
    },
    'convert-image': {
      name: 'Convert Image',
      description: 'Convert images between different formats',
      icon: '🔄',
      acceptedTypes: 'image/*',
      maxSize: 10 * 1024 * 1024
    },
    'convert-document': {
      name: 'Convert Document',
      description: 'Convert documents between formats',
      icon: '📝',
      acceptedTypes: '.pdf,.doc,.docx',
      maxSize: 10 * 1024 * 1024
    }
  }

  const config = toolConfig[type] || toolConfig['compress-image']

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFile = (selectedFile) => {
    if (selectedFile.size > config.maxSize) {
      alert('File size exceeds 10MB limit')
      return
    }
    setFile(selectedFile)
    setProcessedFile(null)
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const processFile = async () => {
    if (!file) return

    setIsProcessing(true)
    
    // Simulate processing delay
    setTimeout(() => {
      const originalSize = file.size
      const compressedSize = Math.round(originalSize * 0.7) // Simulate 30% compression
      const savedPercent = Math.round((originalSize - compressedSize) / originalSize * 100)
      
      setProcessedFile({
        name: file.name.replace(/\.[^/.]+$/, '') + '_processed.' + file.name.split('.').pop(),
        size: compressedSize,
        originalSize,
        savedPercent,
        url: URL.createObjectURL(file) // In real app, this would be the processed file
      })
      setIsProcessing(false)
    }, 2000)
  }

  const downloadFile = () => {
    if (processedFile) {
      const link = document.createElement('a')
      link.href = processedFile.url
      link.download = processedFile.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <>
      <Helmet>
        <title>{config.name} - ConvertFlix</title>
        <meta name="description" content={`${config.description}. Free up to 10MB.`} />
      </Helmet>

      <div className="tool-page">
        <div className="container">
          {/* Header */}
          <div className="tool-header">
            <div className="tool-icon">{config.icon}</div>
            <h1 className="tool-title">{config.name}</h1>
            <p className="tool-description">{config.description}</p>
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
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="upload-content">
                  <div className="upload-icon">📁</div>
                  <h3>Drop your file here or click to browse</h3>
                  <p>Maximum file size: 10MB</p>
                  <p className="accepted-types">Accepted: {config.acceptedTypes}</p>
                </div>
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
                  <div className="file-icon">📄</div>
                  <div className="file-details">
                    <h3>{file.name}</h3>
                    <p>{formatFileSize(file.size)}</p>
                  </div>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setFile(null)}
                  >
                    Remove
                  </button>
                </div>
                
                {file.type.startsWith('image/') && (
                  <div className="image-preview">
                    <img src={URL.createObjectURL(file)} alt="Preview" />
                  </div>
                )}

                <button 
                  className="btn btn-primary process-btn"
                  onClick={processFile}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Process File'}
                </button>
              </div>
            )}
          </div>

          {/* Results Section */}
          {processedFile && (
            <div className="results-section">
              <h2>Processing Complete!</h2>
              <div className="results-card card">
                <div className="results-header">
                  <h3>File Results</h3>
                  <div className="compression-stats">
                    <div className="stat">
                      <span className="label">Original Size:</span>
                      <span className="value">{formatFileSize(processedFile.originalSize)}</span>
                    </div>
                    <div className="stat">
                      <span className="label">Compressed Size:</span>
                      <span className="value">{formatFileSize(processedFile.size)}</span>
                    </div>
                    <div className="stat saved">
                      <span className="label">Space Saved:</span>
                      <span className="value">{processedFile.savedPercent}%</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  className="btn btn-primary download-btn"
                  onClick={downloadFile}
                >
                  Download Processed File
                </button>
                
                <div className="expiry-notice">
                  ⏰ Files are automatically deleted after 24 hours
                </div>
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="tool-info">
            <div className="info-card card">
              <h3>How it works</h3>
              <ol>
                <li>Upload your file (max 10MB)</li>
                <li>Our system processes your file securely</li>
                <li>Download your processed file</li>
                <li>Files are automatically deleted after 24 hours</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ToolPage 