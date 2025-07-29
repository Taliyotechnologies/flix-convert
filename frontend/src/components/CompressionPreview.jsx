import React from 'react'
import './CompressionPreview.css'

const CompressionPreview = ({ file }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileTypeIcon = (type) => {
    if (type.startsWith('image/')) return '🖼️'
    if (type.startsWith('video/')) return '🎥'
    if (type.startsWith('audio/')) return '🎵'
    if (type === 'application/pdf') return '📄'
    return '📁'
  }

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const compressionPercentage = Math.round((1 - file.compressedSize / file.originalSize) * 100)

  return (
    <div className="compression-preview">
      <div className="preview-header">
        <div className="file-info">
          <span className="file-icon">{getFileTypeIcon(file.type)}</span>
          <div className="file-details">
            <h4 className="file-name">{file.name}</h4>
            <span className="file-type">{file.type}</span>
          </div>
        </div>
        <span className="upload-time">{formatDate(file.uploadedAt)}</span>
      </div>

      <div className="compression-stats">
        <div className="stat-item">
          <span className="stat-label">Original Size</span>
          <span className="stat-value">{formatFileSize(file.originalSize)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Compressed Size</span>
          <span className="stat-value">{formatFileSize(file.compressedSize)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Reduction</span>
          <span className="stat-value reduction">{compressionPercentage}%</span>
        </div>
      </div>

      <div className="compression-bar">
        <div className="bar-container">
          <div 
            className="bar-fill" 
            style={{ width: `${compressionPercentage}%` }}
          ></div>
        </div>
        <span className="bar-label">Size reduced by {compressionPercentage}%</span>
      </div>

      <div className="preview-actions">
        <button className="btn btn-secondary">
          Download Compressed
        </button>
        <button className="btn btn-ghost">
          View Details
        </button>
      </div>
    </div>
  )
}

export default CompressionPreview