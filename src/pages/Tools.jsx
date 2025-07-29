import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import toast from 'react-hot-toast'
import { 
  FiUpload, 
  FiFile, 
  FiDownload, 
  FiX,
  FiImage,
  FiVideo,
  FiMusic,
  FiFileText,
  FiSettings,
  FiCheckCircle,
  FiAlertCircle
} from 'react-icons/fi'
import './Tools.css'

const Tools = () => {
  const [searchParams] = useSearchParams()
  const [selectedFile, setSelectedFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const [operation, setOperation] = useState('compress')
  const [fileType, setFileType] = useState('image')
  const [quality, setQuality] = useState(80)
  const [format, setFormat] = useState('')

  // Get initial type from URL params
  useEffect(() => {
    const type = searchParams.get('type')
    if (type) {
      setFileType(type)
    }
  }, [searchParams])

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      setSelectedFile(file)
      setResult(null)
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => setFilePreview(e.target.result)
        reader.readAsDataURL(file)
      } else {
        setFilePreview(null)
      }
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp'],
      'video/*': ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv'],
      'audio/*': ['.mp3', '.wav', '.flac', '.aac', '.ogg', '.m4a'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  })

  const handleProcess = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first')
      return
    }

    setIsProcessing(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      // Add quality/format parameters
      if (operation === 'compress') {
        formData.append('quality', quality)
      } else {
        formData.append('format', format)
        formData.append('quality', quality)
      }

      const endpoint = operation === 'compress' 
        ? `/api/compress/${fileType}`
        : `/api/convert/${fileType}`

      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      setResult(response.data.data)
      toast.success(`${operation === 'compress' ? 'Compression' : 'Conversion'} completed successfully!`)
    } catch (error) {
      const message = error.response?.data?.message || 'Processing failed'
      toast.error(message)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (result?.downloadUrl) {
      const link = document.createElement('a')
      link.href = result.downloadUrl
      link.download = result.file.fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const clearFile = () => {
    setSelectedFile(null)
    setFilePreview(null)
    setResult(null)
  }

  const getFileTypeIcon = (type) => {
    switch (type) {
      case 'image': return <FiImage />
      case 'video': return <FiVideo />
      case 'audio': return <FiMusic />
      case 'pdf': return <FiFileText />
      default: return <FiFile />
    }
  }

  const getSupportedFormats = () => {
    switch (fileType) {
      case 'image':
        return ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp']
      case 'video':
        return ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv']
      case 'audio':
        return ['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a']
      case 'pdf':
        return ['pdf']
      default:
        return []
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
        <title>Tools - ConvertFlix</title>
        <meta name="description" content="Compress and convert your files with our powerful online tools. Support for images, videos, audio, and PDF files." />
      </Helmet>

      <div className="tools-page">
        <div className="container">
          {/* Header */}
          <div className="tools-header">
            <h1 className="tools-title">File Compression & Conversion Tools</h1>
            <p className="tools-subtitle">
              Upload your files and compress or convert them instantly. Free up to 10MB.
            </p>
          </div>

          <div className="tools-content">
            {/* File Type Selection */}
            <div className="file-type-selector">
              <h3>Select File Type</h3>
              <div className="file-type-grid">
                {['image', 'video', 'audio', 'pdf'].map((type) => (
                  <button
                    key={type}
                    className={`file-type-btn ${fileType === type ? 'active' : ''}`}
                    onClick={() => setFileType(type)}
                  >
                    <div className="file-type-icon">
                      {getFileTypeIcon(type)}
                    </div>
                    <span className="file-type-label">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Operation Selection */}
            <div className="operation-selector">
              <h3>Select Operation</h3>
              <div className="operation-buttons">
                <button
                  className={`operation-btn ${operation === 'compress' ? 'active' : ''}`}
                  onClick={() => setOperation('compress')}
                >
                  <FiSettings />
                  Compress
                </button>
                <button
                  className={`operation-btn ${operation === 'convert' ? 'active' : ''}`}
                  onClick={() => setOperation('convert')}
                >
                  <FiFile />
                  Convert
                </button>
              </div>
            </div>

            {/* Settings */}
            <div className="settings-panel">
              <h3>Settings</h3>
              <div className="settings-grid">
                <div className="setting-group">
                  <label className="setting-label">Quality</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    className="quality-slider"
                  />
                  <span className="quality-value">{quality}%</span>
                </div>

                {operation === 'convert' && (
                  <div className="setting-group">
                    <label className="setting-label">Output Format</label>
                    <select
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      className="format-select"
                    >
                      <option value="">Select format</option>
                      {getSupportedFormats().map((fmt) => (
                        <option key={fmt} value={fmt}>
                          {fmt.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* File Upload */}
            <div className="upload-section">
              <h3>Upload File</h3>
              <div
                {...getRootProps()}
                className={`upload-area ${isDragActive ? 'drag-active' : ''} ${selectedFile ? 'has-file' : ''}`}
              >
                <input {...getInputProps()} />
                {selectedFile ? (
                  <div className="file-info">
                    <div className="file-preview">
                      {filePreview ? (
                        <img src={filePreview} alt="Preview" className="file-preview-img" />
                      ) : (
                        <div className="file-icon">
                          {getFileTypeIcon(fileType)}
                        </div>
                      )}
                    </div>
                    <div className="file-details">
                      <h4 className="file-name">{selectedFile.name}</h4>
                      <p className="file-size">{formatFileSize(selectedFile.size)}</p>
                    </div>
                    <button className="remove-file-btn" onClick={clearFile}>
                      <FiX />
                    </button>
                  </div>
                ) : (
                  <div className="upload-content">
                    <FiUpload className="upload-icon" />
                    <h4>Drag & drop your file here</h4>
                    <p>or click to browse</p>
                    <p className="upload-hint">
                      Maximum file size: 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Process Button */}
            <div className="process-section">
              <button
                className={`process-btn btn btn-primary btn-lg ${!selectedFile || isProcessing ? 'disabled' : ''}`}
                onClick={handleProcess}
                disabled={!selectedFile || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="spinner"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    {operation === 'compress' ? <FiSettings /> : <FiFile />}
                    {operation === 'compress' ? 'Compress' : 'Convert'} File
                  </>
                )}
              </button>
            </div>

            {/* Results */}
            {result && (
              <div className="results-section">
                <h3>Results</h3>
                <div className="result-card card">
                  <div className="result-header">
                    <div className="result-icon">
                      <FiCheckCircle />
                    </div>
                    <div className="result-info">
                      <h4 className="result-title">Processing Complete!</h4>
                      <p className="result-subtitle">
                        Your file has been {operation === 'compress' ? 'compressed' : 'converted'} successfully.
                      </p>
                    </div>
                  </div>

                  <div className="result-details">
                    <div className="detail-row">
                      <span className="detail-label">Original Size:</span>
                      <span className="detail-value">{result.compressionInfo?.originalSize || result.conversionInfo?.originalSize}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">
                        {operation === 'compress' ? 'Compressed Size:' : 'Converted Size:'}
                      </span>
                      <span className="detail-value">
                        {result.compressionInfo?.compressedSize || result.conversionInfo?.convertedSize}
                      </span>
                    </div>
                    {operation === 'compress' && result.compressionInfo?.savedPercent && (
                      <div className="detail-row">
                        <span className="detail-label">Space Saved:</span>
                        <span className="detail-value saved-percent">
                          {result.compressionInfo.savedPercent}
                        </span>
                      </div>
                    )}
                    {operation === 'convert' && result.conversionInfo && (
                      <div className="detail-row">
                        <span className="detail-label">Format:</span>
                        <span className="detail-value">
                          {result.conversionInfo.originalFormat} → {result.conversionInfo.convertedFormat}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="result-actions">
                    <button className="btn btn-primary" onClick={handleDownload}>
                      <FiDownload />
                      Download File
                    </button>
                    <div className="result-note">
                      <FiAlertCircle />
                      <span>File will be automatically deleted in 24 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Tools 