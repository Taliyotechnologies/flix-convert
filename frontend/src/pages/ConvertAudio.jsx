import React, { useState } from 'react';
import { FiUpload, FiDownload, FiMusic, FiSettings } from 'react-icons/fi';
import '../styles/components.css';

const ConvertAudio = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [targetFormat, setTargetFormat] = useState('mp3');
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFile, setConvertedFile] = useState(null);

  const formats = [
    { value: 'mp3', label: 'MP3', description: 'Most compatible' },
    { value: 'wav', label: 'WAV', description: 'Uncompressed' },
    { value: 'aac', label: 'AAC', description: 'High quality' },
    { value: 'ogg', label: 'OGG', description: 'Open source' },
    { value: 'flac', label: 'FLAC', description: 'Lossless' },
    { value: 'm4a', label: 'M4A', description: 'Apple format' }
  ];

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setSelectedFile(file);
      setConvertedFile(null);
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) return;
    
    setIsConverting(true);
    
    // Simulate conversion process
    setTimeout(() => {
      setIsConverting(false);
      setConvertedFile({
        name: selectedFile.name.replace(/\.[^/.]+$/, `.${targetFormat}`),
        size: selectedFile.size * 0.7,
        url: URL.createObjectURL(selectedFile)
      });
    }, 2000);
  };

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Convert Audio</h1>
          <p className="page-subtitle">
            Convert your audio files to different formats with high quality
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FiUpload className="w-5 h-5" />
              Upload Audio
            </h2>
            
            <div className="space-y-6">
              <div className="upload-area" onClick={() => document.getElementById('audio-input').click()}>
                <input
                  id="audio-input"
                  type="file"
                  accept="audio/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <FiMusic className="upload-icon" />
                <div className="upload-text">
                  {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                </div>
                <div className="upload-hint">
                  Supports: MP3, WAV, AAC, OGG, FLAC, M4A (Max 50MB)
                </div>
              </div>

              {selectedFile && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">Selected File</h3>
                  <div className="text-sm text-gray-600">
                    <p>Name: {selectedFile.name}</p>
                    <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    <p>Type: {selectedFile.type}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Conversion Settings */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FiSettings className="w-5 h-5" />
              Conversion Settings
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">Target Format</label>
                <div className="grid grid-cols-2 gap-3">
                  {formats.map((format) => (
                    <button
                      key={format.value}
                      onClick={() => setTargetFormat(format.value)}
                      className={`p-3 border rounded-lg text-left transition-all ${
                        targetFormat === format.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium">{format.label}</div>
                      <div className="text-sm text-gray-600">{format.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleConvert}
                disabled={!selectedFile || isConverting}
                className="btn btn-primary w-full"
              >
                {isConverting ? (
                  <>
                    <div className="spinner"></div>
                    Converting...
                  </>
                ) : (
                  <>
                    <FiSettings className="w-4 h-4" />
                    Convert to {targetFormat.toUpperCase()}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {convertedFile && (
          <div className="card mt-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FiDownload className="w-5 h-5" />
              Conversion Complete
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Original File</h3>
                <div className="text-sm text-gray-600">
                  <p>Name: {selectedFile.name}</p>
                  <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium mb-2">Converted File</h3>
                <div className="text-sm text-gray-600">
                  <p>Name: {convertedFile.name}</p>
                  <p>Size: {(convertedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  <p>Format: {targetFormat.toUpperCase()}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = convertedFile.url;
                  link.download = convertedFile.name;
                  link.click();
                }}
                className="btn btn-primary"
              >
                <FiDownload className="w-4 h-4 mr-2" />
                Download Converted File
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConvertAudio; 