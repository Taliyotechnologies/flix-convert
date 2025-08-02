import React, { useState, useRef } from 'react'
import { formatFileSize } from '../services/api'

const FileUpload = ({ 
  onFileSelect, 
  onProcess, 
  fileType, 
  operation, 
  supportedFormats = [],
  maxSize = 10 * 1024 * 1024, // 10MB
  showToast 
}) => {
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return

    // Check file size
    if (selectedFile.size > maxSize) {
      showToast(`File size must be less than ${formatFileSize(maxSize)}`, 'error')
      return
    }

    // Check file type
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase()
    if (supportedFormats.length > 0 && !supportedFormats.includes(fileExtension)) {
      showToast(`Unsupported file format. Supported formats: ${supportedFormats.join(', ')}`, 'error')
      return
    }

    setFile(selectedFile)
    setResult(null)
    onFileSelect?.(selectedFile)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFileSelect(droppedFile)
    }
  }

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0]
    handleFileSelect(selectedFile)
  }

  const handleProcess = async () => {
    if (!file) return

    setIsProcessing(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await onProcess(formData)
      setResult(response.data)
      showToast(`${operation} completed successfully!`, 'success')
    } catch (error) {
      console.error('Processing error:', error)
      showToast(error.response?.data?.message || `${operation} failed`, 'error')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!result) return

    const link = document.createElement('a')
    link.href = `https://flix-convert.onrender.com/api/admin/files/${result.fileId}/download`
    link.download = result.fileName
    link.click()
  }

  const resetForm = () => {
    setFile(null)
    setResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* File Upload Area */}
      <div className="mb-8">
        <div
          className={`file-upload-area ${isDragging ? 'dragover' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-xl font-semibold mb-2">
            {file ? 'File Selected' : 'Drop your file here'}
          </h3>
          <p className="text-text-secondary mb-4">
            {file 
              ? `${file.name} (${formatFileSize(file.size)})`
              : `or click to browse. Max size: ${formatFileSize(maxSize)}`
            }
          </p>
          {supportedFormats.length > 0 && (
            <p className="text-sm text-text-secondary">
              Supported formats: {supportedFormats.join(', ')}
            </p>
          )}
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileInputChange}
            accept={supportedFormats.map(format => `.${format}`).join(',')}
            className="hidden"
          />
        </div>
      </div>

      {/* Process Button */}
      {file && !result && (
        <div className="text-center mb-8">
          <button
            onClick={handleProcess}
            disabled={isProcessing}
            className="btn btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <span className="loading"></span>
                Processing...
              </>
            ) : (
              `Process ${file.name}`
            )}
          </button>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="card">
          <h3 className="text-xl font-semibold mb-4 text-center">
            ✅ {operation} Completed Successfully!
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Original File</h4>
              <p className="text-text-secondary">{result.originalName}</p>
              <p className="text-lg font-semibold text-primary">
                {formatFileSize(result.originalSize)}
              </p>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold mb-2">Processed File</h4>
              <p className="text-text-secondary">{result.fileName}</p>
              <p className="text-lg font-semibold text-success">
                {formatFileSize(result.compressedSize)}
              </p>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="inline-block bg-success/10 text-success px-4 py-2 rounded-lg">
              <span className="font-semibold">{result.percentSaved}%</span> size reduction
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-hover rounded-lg">
              <h5 className="font-semibold mb-1">Original Format</h5>
              <p className="text-text-secondary">{result.originalFormat.toUpperCase()}</p>
            </div>
            
            <div className="text-center p-4 bg-hover rounded-lg">
              <h5 className="font-semibold mb-1">New Format</h5>
              <p className="text-text-secondary">{result.convertedFormat.toUpperCase()}</p>
            </div>
          </div>

          <div className="text-center mb-4">
            <p className="text-sm text-text-secondary">
              ⏰ This file will be automatically deleted after 24 hours
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleDownload}
              className="btn btn-success"
            >
              📥 Download File
            </button>
            <button
              onClick={resetForm}
              className="btn btn-secondary"
            >
              🔄 Process Another File
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUpload 