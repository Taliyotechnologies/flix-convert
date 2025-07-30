import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { 
  Upload, 
  File, 
  Download, 
  X, 
  Image, 
  Video, 
  Music, 
  FileText,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Tools.css';

const Tools = () => {
  const [searchParams] = useSearchParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [format, setFormat] = useState('');
  const [toolType, setToolType] = useState('');

  const toolTypeParam = searchParams.get('type');

  useEffect(() => {
    if (toolTypeParam) {
      setToolType(toolTypeParam);
    }
  }, [toolTypeParam]);

  const tools = [
    {
      id: 'compress-image',
      name: 'Compress Image',
      icon: Image,
      description: 'Reduce image file size while maintaining quality',
      endpoint: '/api/compress/image',
      acceptedTypes: ['image/*'],
      maxSize: 10 * 1024 * 1024 // 10MB
    },
    {
      id: 'compress-video',
      name: 'Compress Video',
      icon: Video,
      description: 'Compress video files with minimal quality loss',
      endpoint: '/api/compress/video',
      acceptedTypes: ['video/*'],
      maxSize: 10 * 1024 * 1024
    },
    {
      id: 'compress-audio',
      name: 'Compress Audio',
      icon: Music,
      description: 'Reduce audio file size efficiently',
      endpoint: '/api/compress/audio',
      acceptedTypes: ['audio/*'],
      maxSize: 10 * 1024 * 1024
    },
    {
      id: 'compress-pdf',
      name: 'Compress PDF',
      icon: FileText,
      description: 'Optimize PDF files for smaller size',
      endpoint: '/api/compress/pdf',
      acceptedTypes: ['application/pdf'],
      maxSize: 10 * 1024 * 1024
    },
    {
      id: 'convert-image',
      name: 'Convert Image',
      icon: Image,
      description: 'Convert images between different formats',
      endpoint: '/api/convert/image',
      acceptedTypes: ['image/*'],
      maxSize: 10 * 1024 * 1024,
      formats: ['jpg', 'png', 'webp', 'gif']
    },
    {
      id: 'convert-video',
      name: 'Convert Video',
      icon: Video,
      description: 'Convert videos to different formats',
      endpoint: '/api/convert/video',
      acceptedTypes: ['video/*'],
      maxSize: 10 * 1024 * 1024,
      formats: ['mp4', 'avi', 'webm']
    },
    {
      id: 'convert-audio',
      name: 'Convert Audio',
      icon: Music,
      description: 'Convert audio files between formats',
      endpoint: '/api/convert/audio',
      acceptedTypes: ['audio/*'],
      maxSize: 10 * 1024 * 1024,
      formats: ['mp3', 'wav', 'aac', 'ogg']
    }
  ];

  const currentTool = tools.find(tool => tool.id === toolType) || tools[0];

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: currentTool.acceptedTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {}),
    maxSize: currentTool.maxSize,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0];
        if (error.code === 'file-too-large') {
          toast.error('File is too large. Maximum size is 10MB.');
        } else if (error.code === 'file-invalid-type') {
          toast.error('Invalid file type. Please select a valid file.');
        } else {
          toast.error('Error uploading file.');
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0]);
        setResult(null);
      }
    }
  });

  const handleProcess = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    if (currentTool.formats && format) {
      formData.append('format', format);
    }

    try {
      const response = await axios.post(
        `http://localhost:5000${currentTool.endpoint}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        setResult(response.data.file);
        toast.success('File processed successfully!');
      }
    } catch (error) {
      const message = error.response?.data?.error || 'Processing failed';
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result?.downloadUrl) {
      const link = document.createElement('a');
      link.href = `http://localhost:5000${result.downloadUrl}`;
      link.download = result.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setResult(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="tools-page">
      <div className="container">
        <div className="tools-header">
          <h1>File Tools</h1>
          <p>Compress and convert your files with our powerful tools</p>
        </div>

        <div className="tools-content">
          {/* Tool Selection */}
          <div className="tool-selection">
            <h3>Select Tool</h3>
            <div className="tools-grid">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  className={`tool-card ${toolType === tool.id ? 'active' : ''}`}
                  onClick={() => setToolType(tool.id)}
                >
                  <tool.icon size={24} />
                  <div>
                    <h4>{tool.name}</h4>
                    <p>{tool.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* File Upload */}
          <div className="upload-section">
            <h3>Upload File</h3>
            <div
              {...getRootProps()}
              className={`upload-area ${isDragActive ? 'drag-active' : ''}`}
            >
              <input {...getInputProps()} />
              <Upload size={48} />
              <p>
                {isDragActive
                  ? 'Drop the file here'
                  : 'Drag & drop a file here, or click to select'}
              </p>
              <span className="upload-hint">
                Max size: 10MB • {currentTool.acceptedTypes.join(', ')}
              </span>
            </div>

            {selectedFile && (
              <div className="file-preview">
                <div className="file-info">
                  <File size={20} />
                  <div>
                    <p className="file-name">{selectedFile.name}</p>
                    <p className="file-size">{formatFileSize(selectedFile.size)}</p>
                  </div>
                </div>
                <button className="clear-btn" onClick={clearFile}>
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Format Selection for Conversion */}
            {currentTool.formats && (
              <div className="format-selection">
                <label htmlFor="format">Output Format:</label>
                <select
                  id="format"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="form-input"
                >
                  <option value="">Select format</option>
                  {currentTool.formats.map((fmt) => (
                    <option key={fmt} value={fmt}>
                      {fmt.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              className="btn btn-primary process-btn"
              onClick={handleProcess}
              disabled={!selectedFile || isProcessing || (currentTool.formats && !format)}
            >
              {isProcessing ? (
                <>
                  <Loader size={20} className="spinner" />
                  Processing...
                </>
              ) : (
                <>
                  {currentTool.id.includes('compress') ? 'Compress' : 'Convert'} File
                </>
              )}
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className="results-section">
              <h3>Results</h3>
              <div className="result-card">
                <div className="result-header">
                  <CheckCircle size={24} className="success-icon" />
                  <h4>File processed successfully!</h4>
                </div>
                
                <div className="result-details">
                  <div className="result-item">
                    <span>File Name:</span>
                    <span>{result.fileName}</span>
                  </div>
                  <div className="result-item">
                    <span>Original Size:</span>
                    <span>{result.originalSize}</span>
                  </div>
                  <div className="result-item">
                    <span>New Size:</span>
                    <span>{result.compressedSize || result.convertedSize}</span>
                  </div>
                  {result.savedPercent && (
                    <div className="result-item">
                      <span>Space Saved:</span>
                      <span className="saved-percent">{result.savedPercent}%</span>
                    </div>
                  )}
                  <div className="result-item">
                    <span>Expires:</span>
                    <span>{new Date(result.expiresAt).toLocaleString()}</span>
                  </div>
                </div>

                <div className="result-actions">
                  <button className="btn btn-primary" onClick={handleDownload}>
                    <Download size={16} />
                    Download
                  </button>
                  <button className="btn btn-secondary" onClick={clearFile}>
                    Process Another File
                  </button>
                </div>

                <div className="result-note">
                  <AlertCircle size={16} />
                  <p>Files are automatically deleted after 24 hours for your privacy.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tools; 