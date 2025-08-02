import React, { useCallback, useState } from 'react';
import './FileUpload.css';

const FileUpload = ({ file, onFileSelect, acceptedTypes }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const getAcceptedMimeTypes = (type) => {
    const mimeTypes = {
      image: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/bmp', 'image/tiff'],
      video: ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv', 'video/webm', 'video/mkv'],
      audio: ['audio/mp3', 'audio/wav', 'audio/flac', 'audio/aac', 'audio/ogg', 'audio/m4a'],
      pdf: ['application/pdf']
    };
    return mimeTypes[type] || mimeTypes.image;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file) => {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const acceptedTypes = getAcceptedMimeTypes(acceptedTypes);

    if (file.size > maxSize) {
      throw new Error('File size must be less than 100MB');
    }

    if (!acceptedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Please select a valid file.');
    }

    return true;
  };

  const handleFileSelect = useCallback((selectedFile) => {
    try {
      validateFile(selectedFile);
      onFileSelect(selectedFile);
    } catch (error) {
      alert(error.message);
    }
  }, [onFileSelect, acceptedTypes]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback((e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  }, [handleFileSelect]);

  return (
    <div className="file-upload">
      <div
        className={`upload-area ${isDragOver ? 'drag-over' : ''} ${file ? 'has-file' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {!file ? (
          <>
            <div className="upload-icon">📁</div>
            <h3>Drag & Drop your file here</h3>
            <p>or</p>
            <label className="btn btn-primary">
              Choose File
              <input
                type="file"
                accept={getAcceptedMimeTypes(acceptedTypes).join(',')}
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />
            </label>
            <p className="upload-info">
              Maximum file size: 100MB<br />
              Supported formats: {getAcceptedMimeTypes(acceptedTypes).map(type => type.split('/')[1]).join(', ')}
            </p>
          </>
        ) : (
          <div className="file-info">
            <div className="file-icon">📄</div>
            <div className="file-details">
              <h3>{file.name}</h3>
              <p>Size: {formatFileSize(file.size)}</p>
              <p>Type: {file.type}</p>
            </div>
            <button
              className="btn btn-secondary remove-btn"
              onClick={() => onFileSelect(null)}
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload; 