import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import './FileUpload.css'

const FileUpload = ({ onFileUpload, isCompressing }) => {
  const [dragActive, setDragActive] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles)
    }
  }, [onFileUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
      'video/*': ['.mp4', '.avi', '.mov', '.wmv', '.flv'],
      'audio/*': ['.mp3', '.wav', '.flac', '.aac', '.ogg'],
      'application/pdf': ['.pdf']
    },
    multiple: true,
    maxSize: 100 * 1024 * 1024, // 100MB
  })

  const getFileTypeIcon = (type) => {
    if (type.startsWith('image/')) return '🖼️'
    if (type.startsWith('video/')) return '🎥'
    if (type.startsWith('audio/')) return '🎵'
    if (type === 'application/pdf') return '📄'
    return '📁'
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="file-upload-container">
      <div className="upload-card">
        <div
          {...getRootProps()}
          className={`upload-area ${isDragActive ? 'drag-active' : ''} ${isCompressing ? 'compressing' : ''}`}
        >
          <input {...getInputProps()} />
          
          {isCompressing ? (
            <div className="upload-content compressing">
              <div className="loading-spinner"></div>
              <h3>Compressing Files...</h3>
              <p>Please wait while we process your files</p>
            </div>
          ) : (
            <div className="upload-content">
              <div className="upload-icon">📁</div>
              <h3>Drop files here or click to upload</h3>
              <p>Support for images, videos, audio, and PDF files (max 100MB each)</p>
              
              <div className="supported-formats">
                <div className="format-group">
                  <span className="format-icon">🖼️</span>
                  <span>Images: JPG, PNG, GIF, WebP</span>
                </div>
                <div className="format-group">
                  <span className="format-icon">🎥</span>
                  <span>Videos: MP4, AVI, MOV, WMV</span>
                </div>
                <div className="format-group">
                  <span className="format-icon">🎵</span>
                  <span>Audio: MP3, WAV, FLAC, AAC</span>
                </div>
                <div className="format-group">
                  <span className="format-icon">📄</span>
                  <span>Documents: PDF</span>
                </div>
              </div>
              
              <button className="btn btn-primary upload-btn">
                Choose Files
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FileUpload