import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { 
  FiUpload, 
  FiDownload, 
  FiFile, 
  FiImage, 
  FiVideo, 
  FiMusic, 
  FiFileText,
  FiCheckCircle,
  FiAlertCircle,
  FiX
} from 'react-icons/fi';

const Tools = () => {
  const [searchParams] = useSearchParams();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('');
  const [formats, setFormats] = useState({});

  // Get initial type and action from URL params
  const initialType = searchParams.get('type') || 'image';
  const initialAction = searchParams.get('action') || 'compress';
  const [fileType, setFileType] = useState(initialType);
  const [action, setAction] = useState(initialAction);

  // Load supported formats
  useEffect(() => {
    const loadFormats = async () => {
      try {
        const response = await axios.get('/api/files/formats');
        setFormats(response.data);
      } catch (error) {
        console.error('Failed to load formats:', error);
      }
    };
    loadFormats();
  }, []);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      
      // Check file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      setFile(selectedFile);
      setError(null);
      setResult(null);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.tiff'],
      'video/*': ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm'],
      'audio/*': ['.mp3', '.wav', '.aac', '.ogg', '.flac'],
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  const getFileIcon = (type) => {
    switch (type) {
      case 'image': return <FiImage size={24} />;
      case 'video': return <FiVideo size={24} />;
      case 'audio': return <FiMusic size={24} />;
      case 'pdf': return <FiFileText size={24} />;
      default: return <FiFile size={24} />;
    }
  };

  const getActionText = () => {
    return action === 'compress' ? 'Compress' : 'Convert';
  };

  const getEndpoint = () => {
    return `/api/files/${action}/${fileType}`;
  };

  const handleProcess = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    
    if (action === 'convert' && selectedFormat) {
      formData.append('targetFormat', selectedFormat);
    }

    try {
      const response = await axios.post(getEndpoint(), formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setResult(response.data.file);
    } catch (error) {
      setError(error.response?.data?.error || 'Processing failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = () => {
    if (result?.downloadUrl) {
      const link = document.createElement('a');
      link.href = result.downloadUrl;
      link.download = result.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const resetForm = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setSelectedFormat('');
  };

  return (
    <div className="min-h-screen bg-bg-secondary py-8 md:py-12">
      <div className="container max-w-4xl">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4">
            {getActionText()} {fileType.charAt(0).toUpperCase() + fileType.slice(1)} Files
          </h1>
          <p className="text-base md:text-lg text-text-secondary px-4">
            Upload your {fileType} file and we'll {action} it for you. Files are automatically deleted after 24 hours.
          </p>
        </div>

        {/* File Type and Action Selection */}
        <div className="card mb-6 md:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                File Type
              </label>
              <select
                value={fileType}
                onChange={(e) => {
                  setFileType(e.target.value);
                  setSelectedFormat('');
                  resetForm();
                }}
                className="w-full"
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
                <option value="pdf">PDF</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Action
              </label>
              <select
                value={action}
                onChange={(e) => {
                  setAction(e.target.value);
                  setSelectedFormat('');
                  resetForm();
                }}
                className="w-full"
              >
                <option value="compress">Compress</option>
                <option value="convert">Convert</option>
              </select>
            </div>
          </div>

          {/* Format Selection for Conversion */}
          {action === 'convert' && formats[fileType]?.convert && (
            <div className="mt-4 md:mt-6">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Convert to Format
              </label>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="w-full"
              >
                <option value="">Select format...</option>
                {formats[fileType].convert.map((format) => (
                  <option key={format} value={format}>
                    {format.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* File Upload */}
        <div className="card mb-6 md:mb-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 md:p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-primary-color bg-primary-color bg-opacity-10'
                : 'border-border-color hover:border-primary-color'
            }`}
          >
            <input {...getInputProps()} />
            <div className="space-y-3 md:space-y-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-color bg-opacity-10 rounded-full flex items-center justify-center mx-auto">
                {getFileIcon(fileType)}
              </div>
              {isDragActive ? (
                <p className="text-base md:text-lg text-primary-color">Drop the file here...</p>
              ) : (
                <div>
                  <p className="text-base md:text-lg text-text-primary mb-2">
                    Drag & drop your {fileType} file here, or click to browse
                  </p>
                  <p className="text-sm text-text-muted">
                    Maximum file size: 10MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* File Preview */}
          {file && (
            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-bg-secondary rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-primary-color bg-opacity-10 rounded flex items-center justify-center">
                    {getFileIcon(fileType)}
                  </div>
                  <div>
                    <p className="font-medium text-text-primary text-sm md:text-base">{file.name}</p>
                    <p className="text-xs md:text-sm text-text-muted">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetForm}
                  className="p-1 md:p-2 text-text-muted hover:text-text-primary transition-colors"
                >
                  <FiX size={16} className="md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Process Button */}
        {file && (
          <div className="text-center mb-6 md:mb-8">
            <button
              onClick={handleProcess}
              disabled={uploading || (action === 'convert' && !selectedFormat)}
              className="btn btn-lg btn-primary w-full sm:w-auto"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                `${getActionText()} ${fileType.charAt(0).toUpperCase() + fileType.slice(1)}`
              )}
            </button>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="card mb-6 md:mb-8 border-error-color bg-error-color bg-opacity-10">
            <div className="flex items-center gap-3">
              <FiAlertCircle size={18} className="text-error-color md:w-5 md:h-5" />
              <p className="text-error-color text-sm md:text-base">{error}</p>
            </div>
          </div>
        )}

        {/* Result Display */}
        {result && (
          <div className="card">
            <div className="text-center mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-success-color bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle size={24} className="text-success-color md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-text-primary mb-2">
                {getActionText()} Successfully!
              </h3>
              <p className="text-sm md:text-base text-text-secondary">
                Your file has been processed and is ready for download.
              </p>
            </div>

            <div className="bg-bg-secondary rounded-lg p-4 md:p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <h4 className="font-medium text-text-primary mb-3 text-sm md:text-base">Original File</h4>
                  <div className="space-y-2">
                    <p className="text-xs md:text-sm text-text-secondary">
                      <span className="font-medium">Name:</span> {result.originalName}
                    </p>
                    <p className="text-xs md:text-sm text-text-secondary">
                      <span className="font-medium">Size:</span> {result.originalSize}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-text-primary mb-3 text-sm md:text-base">Processed File</h4>
                  <div className="space-y-2">
                    <p className="text-xs md:text-sm text-text-secondary">
                      <span className="font-medium">Name:</span> {result.fileName}
                    </p>
                    <p className="text-xs md:text-sm text-text-secondary">
                      <span className="font-medium">Size:</span> {result.compressedSize}
                    </p>
                    <p className="text-xs md:text-sm text-text-secondary">
                      <span className="font-medium">Saved:</span> {result.savedPercent}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleDownload}
                className="btn btn-lg btn-primary inline-flex items-center w-full sm:w-auto"
              >
                <FiDownload size={18} />
                Download File
              </button>
            </div>

            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-warning-color bg-opacity-10 rounded-lg">
              <div className="flex items-center gap-2">
                <FiAlertCircle size={14} className="text-warning-color md:w-4 md:h-4" />
                <p className="text-xs md:text-sm text-warning-color">
                  This file will be automatically deleted in 24 hours for your privacy.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tools; 