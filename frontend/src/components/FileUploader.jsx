import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload, FiFile, FiCheck, FiX } from 'react-icons/fi'

const FileUploader = ({ onFileUpload, fileType, maxSize = 10 * 1024 * 1024 }) => {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState('idle') // idle, uploading, success, error
  const [uploadedFile, setUploadedFile] = useState(null)
  const [error, setError] = useState('')

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0]
      if (rejection.errors[0].code === 'file-too-large') {
        setError('File size too large. Maximum size is 10MB.')
      } else if (rejection.errors[0].code === 'file-invalid-type') {
        setError('Invalid file type. Please upload a valid file.')
      } else {
        setError('File upload failed. Please try again.')
      }
      setUploadStatus('error')
      return
    }

    if (acceptedFiles.length === 0) return

    const file = acceptedFiles[0]
    setError('')
    setUploadStatus('uploading')
    setUploadProgress(0)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Call the upload function
      const result = await onFileUpload(file)
      
      clearInterval(progressInterval)
      setUploadProgress(100)
      setUploadStatus('success')
      setUploadedFile(result)
      
      // Reset after 3 seconds
      setTimeout(() => {
        setUploadStatus('idle')
        setUploadProgress(0)
        setUploadedFile(null)
      }, 3000)

    } catch (error) {
      clearInterval(progressInterval)
      setUploadStatus('error')
      setError(error.message || 'Upload failed. Please try again.')
    }
  }, [onFileUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: getAcceptTypes(fileType),
    maxSize,
    multiple: false
  })

  const getAcceptTypes = (type) => {
    switch (type) {
      case 'image':
        return {
          'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.tiff']
        }
      case 'video':
        return {
          'video/*': ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv', '.m4v']
        }
      case 'audio':
        return {
          'audio/*': ['.mp3', '.wav', '.aac', '.flac', '.ogg', '.wma', '.m4a']
        }
      case 'pdf':
        return {
          'application/pdf': ['.pdf']
        }
      default:
        return {}
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileTypeLabel = () => {
    switch (fileType) {
      case 'image': return 'Image'
      case 'video': return 'Video'
      case 'audio': return 'Audio'
      case 'pdf': return 'PDF'
      default: return 'File'
    }
  }

  return (
    <div className="file-uploader">
      {uploadStatus === 'idle' && (
        <div
          {...getRootProps()}
          className={`upload-area ${isDragActive ? 'drag-active' : ''}`}
          style={{
            border: '2px dashed var(--border-color)',
            borderRadius: '1rem',
            padding: '3rem 2rem',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            backgroundColor: 'var(--bg-secondary)',
            ':hover': {
              borderColor: 'var(--accent-primary)',
              backgroundColor: 'var(--bg-tertiary)',
              transform: 'translateY(-2px)',
              boxShadow: 'var(--shadow-md)'
            }
          }}
        >
          <input {...getInputProps()} />
          <div className="upload-icon">
            <FiUpload />
          </div>
          <div className="upload-text">
            {isDragActive ? 'Drop your file here' : `Click to upload or drag and drop your ${getFileTypeLabel().toLowerCase()}`}
          </div>
          <div className="upload-hint">
            Maximum file size: {formatFileSize(maxSize)}
          </div>
        </div>
      )}

      {uploadStatus === 'uploading' && (
        <div className="upload-progress">
          <div className="progress-header">
            <FiFile size={24} />
            <span>Uploading...</span>
          </div>
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <div className="progress-text">{uploadProgress}%</div>
        </div>
      )}

      {uploadStatus === 'success' && uploadedFile && (
        <div className="upload-success">
          <div className="success-icon">
            <FiCheck />
          </div>
          <h3>Upload Successful!</h3>
          <div className="results-grid">
            <div className="result-item">
              <div className="result-label">Original Size</div>
              <div className="result-value">{formatFileSize(uploadedFile.originalSize)}</div>
            </div>
            <div className="result-item">
              <div className="result-label">Compressed Size</div>
              <div className="result-value">{formatFileSize(uploadedFile.compressedSize)}</div>
            </div>
            <div className="result-item">
              <div className="result-label">Compression</div>
              <div className="result-value">{uploadedFile.compressionRatio.toFixed(1)}%</div>
            </div>
          </div>
          <div className="success-actions">
            <a 
              href={uploadedFile.downloadUrl} 
              className="btn btn-primary"
              download
            >
              Download Compressed File
            </a>
          </div>
        </div>
      )}

      {uploadStatus === 'error' && (
        <div className="upload-error">
          <div className="error-icon">
            <FiX />
          </div>
          <h3>Upload Failed</h3>
          <p className="error-message">{error}</p>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setUploadStatus('idle')
              setError('')
            }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}

export default FileUploader