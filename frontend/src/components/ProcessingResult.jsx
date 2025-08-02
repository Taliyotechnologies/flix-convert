import React from 'react';

const ProcessingResult = ({ result, fileName, fileType }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = result.downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="processing-result">
      <h3>Processing Complete!</h3>
      
      <div className="result-stats">
        <div className="stat-item">
          <span className="stat-label">Original Size:</span>
          <span className="stat-value">{formatFileSize(result.originalSize)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Processed Size:</span>
          <span className="stat-value">{formatFileSize(result.processedSize)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Space Saved:</span>
          <span className="stat-value success">{result.savedPercent}%</span>
        </div>
      </div>

      <div className="download-section">
        <button className="btn btn-primary download-btn" onClick={handleDownload}>
          Download Processed File
        </button>
        <p className="download-note">
          ⚠️ Files are automatically deleted after 24 hours
        </p>
      </div>
    </div>
  );
};

export default ProcessingResult; 