import React, { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import FileUpload from '../components/FileUpload';
import FormatSelector from '../components/FormatSelector';
import QualitySelector from '../components/QualitySelector';
import ProcessingResult from '../components/ProcessingResult';
import './ToolPage.css';

const ToolPage = () => {
  const { type } = useParams();
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState('');
  const [quality, setQuality] = useState(80);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const toolConfig = {
    image: {
      title: 'Image Compression & Conversion',
      description: 'Compress and convert images to different formats',
      icon: '🖼️',
      supportedFormats: ['jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff'],
      defaultFormat: 'jpeg',
      operation: 'compress'
    },
    video: {
      title: 'Video Compression & Conversion',
      description: 'Compress and convert videos to various formats',
      icon: '🎥',
      supportedFormats: ['mp4', 'avi', 'mov', 'webm', 'mkv'],
      defaultFormat: 'mp4',
      operation: 'compress'
    },
    audio: {
      title: 'Audio Compression & Conversion',
      description: 'Compress and convert audio files',
      icon: '🎵',
      supportedFormats: ['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a'],
      defaultFormat: 'mp3',
      operation: 'compress'
    },
    pdf: {
      title: 'PDF Compression & Conversion',
      description: 'Compress and convert PDF documents',
      icon: '📄',
      supportedFormats: ['pdf'],
      defaultFormat: 'pdf',
      operation: 'compress'
    }
  };

  const config = toolConfig[type] || toolConfig.image;

  const handleFileSelect = useCallback((selectedFile) => {
    setFile(selectedFile);
    setError(null);
    setResult(null);
  }, []);

  const handleFormatChange = (newFormat) => {
    setFormat(newFormat);
  };

  const handleQualityChange = (newQuality) => {
    setQuality(newQuality);
  };

  const handleProcess = async () => {
    if (!file) {
      setError('Please select a file to process');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      if (format) {
        formData.append('format', format);
      }
      if (quality) {
        formData.append('quality', quality);
      }

      const endpoint = format ? 'convert' : 'compress';
      const response = await fetch(`/api/${endpoint}/${type}`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Processing failed');
      }

      setResult(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setFormat('');
    setQuality(80);
    setResult(null);
    setError(null);
  };

  return (
    <>
      <Helmet>
        <title>{config.title} - ConvertFlix</title>
        <meta name="description" content={config.description} />
      </Helmet>

      <div className="tool-page">
        <div className="container">
          <div className="tool-header">
            <div className="tool-icon">{config.icon}</div>
            <h1>{config.title}</h1>
            <p>{config.description}</p>
          </div>

          <div className="tool-content">
            <div className="upload-section">
              <FileUpload
                file={file}
                onFileSelect={handleFileSelect}
                acceptedTypes={type}
              />
            </div>

            {file && (
              <div className="options-section">
                <div className="options-grid">
                  <FormatSelector
                    type={type}
                    format={format}
                    onFormatChange={handleFormatChange}
                    supportedFormats={config.supportedFormats}
                  />
                  
                  {type === 'image' && (
                    <QualitySelector
                      quality={quality}
                      onQualityChange={handleQualityChange}
                    />
                  )}
                </div>

                <div className="action-buttons">
                  <button
                    className="btn btn-primary process-btn"
                    onClick={handleProcess}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Process File'}
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleReset}
                    disabled={isProcessing}
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="error">
                <strong>Error:</strong> {error}
              </div>
            )}

            {result && (
              <ProcessingResult
                result={result}
                fileName={file?.name}
                fileType={type}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolPage; 