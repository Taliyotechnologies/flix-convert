import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Upload, 
  Download, 
  FileText, 
  Image, 
  Video, 
  Music, 
  X,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import './ToolPage.css';

const ToolPage = () => {
  const { type } = useParams();
  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [format, setFormat] = useState('');
  const fileInputRef = useRef(null);

  const toolConfig = {
    'compress-image': {
      title: 'Compress Image',
      description: 'Reduce image file size while maintaining quality',
      icon: Image,
      color: '#10b981',
      formats: [],
      endpoint: '/api/compress/image'
    },
    'convert-image': {
      title: 'Convert Image',
      description: 'Convert between JPEG, PNG, WebP, and GIF formats',
      icon: Image,
      color: '#3b82f6',
      formats: ['jpeg', 'png', 'webp', 'gif'],
      endpoint: '/api/convert/image'
    },
    'compress-video': {
      title: 'Compress Video',
      description: 'Reduce video file size with H.264 compression',
      icon: Video,
      color: '#8b5cf6',
      formats: [],
      endpoint: '/api/compress/video'
    },
    'convert-video': {
      title: 'Convert Video',
      description: 'Convert between MP4, AVI, MOV, and WebM formats',
      icon: Video,
      color: '#f59e0b',
      formats: ['mp4', 'avi', 'mov', 'webm'],
      endpoint: '/api/convert/video'
    },
    'compress-audio': {
      title: 'Compress Audio',
      description: 'Reduce audio file size with optimized compression',
      icon: Music,
      color: '#ef4444',
      formats: [],
      endpoint: '/api/compress/audio'
    },
    'convert-audio': {
      title: 'Convert Audio',
      description: 'Convert between MP3, WAV, OGG, and M4A formats',
      icon: Music,
      color: '#06b6d4',
      formats: ['mp3', 'wav', 'ogg', 'm4a'],
      endpoint: '/api/convert/audio'
    },
    'compress-pdf': {
      title: 'Compress PDF',
      description: 'Reduce PDF file size by optimizing content',
      icon: FileText,
      color: '#84cc16',
      formats: [],
      endpoint: '/api/compress/pdf'
    },
    'convert-pdf': {
      title: 'Convert PDF',
      description: 'Convert PDF pages to image formats',
      icon: FileText,
      color: '#f97316',
      formats: ['jpeg', 'png', 'webp'],
      endpoint: '/api/convert/pdf'
    }
  };

  const config = toolConfig[type];
  const Icon = config?.icon;

  useEffect(() => {
    if (config?.formats.length > 0) {
      setFormat(config.formats[0]);
    }
  }, [config]);

  const handleFileSelect = (selectedFile) => {
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }
    setFile(selectedFile);
    setError(null);
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

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const processFile = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);
    
    if (format) {
      formData.append('format', format);
    }

    try {
      const response = await fetch(`http://localhost:5000${config.endpoint}`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Processing failed');
      }

      setResult(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = () => {
    if (result?.downloadUrl) {
      const link = document.createElement('a');
      link.href = `http://localhost:5000${result.downloadUrl}`;
      link.download = result.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!config) {
    return (
      <div className="tool-page">
        <div className="container">
          <div className="error-message">
            <AlertCircle className="error-icon" />
            <h2>Tool Not Found</h2>
            <p>The requested tool does not exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tool-page">
      <div className="container">
        <div className="tool-header">
          <div className="tool-icon" style={{ backgroundColor: config.color }}>
            <Icon />
          </div>
          <div className="tool-info">
            <h1>{config.title}</h1>
            <p>{config.description}</p>
          </div>
        </div>

        <div className="tool-content">
          <div className="upload-section">
            <div
              className={`upload-area ${isDragOver ? 'drag-over' : ''} ${file ? 'has-file' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileInput}
                accept="image/*,video/*,audio/*,.pdf"
                style={{ display: 'none' }}
              />
              
              {!file ? (
                <div className="upload-prompt">
                  <Upload className="upload-icon" />
                  <h3>Drop your file here</h3>
                  <p>or click to browse</p>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Choose File
                  </button>
                </div>
              ) : (
                <div className="file-info">
                  <div className="file-details">
                    <h3>{file.name}</h3>
                    <p>{formatFileSize(file.size)}</p>
                  </div>
                  <button 
                    className="remove-file"
                    onClick={() => setFile(null)}
                  >
                    <X />
                  </button>
                </div>
              )}
            </div>

            {config.formats.length > 0 && (
              <div className="format-selector">
                <label htmlFor="format">Output Format:</label>
                <select
                  id="format"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="input"
                >
                  {config.formats.map(fmt => (
                    <option key={fmt} value={fmt}>{fmt.toUpperCase()}</option>
                  ))}
                </select>
              </div>
            )}

            {file && (
              <button 
                className="btn btn-primary process-btn"
                onClick={processFile}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="spinner"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload />
                    Process File
                  </>
                )}
              </button>
            )}
          </div>

          {error && (
            <div className="error-message">
              <AlertCircle className="error-icon" />
              <p>{error}</p>
            </div>
          )}

          {result && (
            <div className="result-section">
              <div className="result-card">
                <div className="result-header">
                  <CheckCircle className="success-icon" />
                  <h3>Processing Complete!</h3>
                </div>
                
                <div className="result-details">
                  <div className="result-item">
                    <span>Original Size:</span>
                    <span>{formatFileSize(result.originalSize)}</span>
                  </div>
                  <div className="result-item">
                    <span>Processed Size:</span>
                    <span>{formatFileSize(result.processedSize)}</span>
                  </div>
                  <div className="result-item">
                    <span>Space Saved:</span>
                    <span className="saved-percent">{result.savedPercent}%</span>
                  </div>
                </div>

                <div className="result-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={downloadFile}
                  >
                    <Download />
                    Download File
                  </button>
                </div>

                <div className="expiry-notice">
                  <Clock className="clock-icon" />
                  <p>File will be automatically deleted in 24 hours</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolPage; 