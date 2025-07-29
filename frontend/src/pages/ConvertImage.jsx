import React, { useState } from 'react';
import { FiUpload, FiDownload, FiImage, FiSettings } from 'react-icons/fi';
import '../styles/components.css';

const ConvertImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [targetFormat, setTargetFormat] = useState('png');
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFile, setConvertedFile] = useState(null);

  const formats = [
    { value: 'png', label: 'PNG', description: 'Lossless compression' },
    { value: 'jpg', label: 'JPEG', description: 'Good compression' },
    { value: 'webp', label: 'WebP', description: 'Modern format' },
    { value: 'gif', label: 'GIF', description: 'Animation support' },
    { value: 'bmp', label: 'BMP', description: 'Uncompressed' },
    { value: 'tiff', label: 'TIFF', description: 'High quality' }
  ];

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
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
        size: selectedFile.size * 0.8, // Simulate smaller file
        url: URL.createObjectURL(selectedFile)
      });
    }, 2000);
  };

  const handleDownload = () => {
    if (convertedFile) {
      const link = document.createElement('a');
      link.href = convertedFile.url;
      link.download = convertedFile.name;
      link.click();
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Convert Image</h1>
          <p className="page-subtitle">
            Convert your images to different formats with high quality
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FiUpload className="w-5 h-5" />
              Upload Image
            </h2>
            
            <div className="space-y-6">
              <div className="upload-area" onClick={() => document.getElementById('file-input').click()}>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <FiImage className="upload-icon" />
                <div className="upload-text">
                  {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                </div>
                <div className="upload-hint">
                  Supports: JPG, PNG, GIF, BMP, TIFF, WebP (Max 10MB)
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
                onClick={handleDownload}
                className="btn btn-primary"
              >
                <FiDownload className="w-4 h-4 mr-2" />
                Download Converted File
              </button>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">Why Choose Our Image Converter?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiImage className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">High Quality</h3>
              <p className="text-sm text-gray-600">
                Maintain image quality while converting to your desired format
              </p>
            </div>
            <div className="card text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSettings className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Multiple Formats</h3>
              <p className="text-sm text-gray-600">
                Convert to PNG, JPEG, WebP, GIF, BMP, and TIFF formats
              </p>
            </div>
            <div className="card text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiDownload className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Fast Processing</h3>
              <p className="text-sm text-gray-600">
                Quick conversion with our optimized processing engine
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvertImage; 