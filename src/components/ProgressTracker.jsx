import { useState, useEffect } from 'react';
import { FiCheckCircle, FiAlertCircle, FiClock, FiX } from 'react-icons/fi';
import './ProgressTracker.css';

const ProgressTracker = ({ 
  isVisible, 
  onClose, 
  currentOperation, 
  progress, 
  status, 
  message 
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="status-icon completed" />;
      case 'failed':
        return <FiAlertCircle className="status-icon failed" />;
      case 'processing':
        return <FiClock className="status-icon processing" />;
      default:
        return <FiClock className="status-icon processing" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return '#10b981';
      case 'failed':
        return '#ef4444';
      case 'processing':
        return '#f59e0b';
      default:
        return '#f59e0b';
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`progress-tracker ${isClosing ? 'closing' : ''}`}>
      <div className="progress-header">
        <div className="progress-title">
          {getStatusIcon()}
          <span>{currentOperation}</span>
        </div>
        <button className="close-btn" onClick={handleClose}>
          <FiX />
        </button>
      </div>

      <div className="progress-content">
        {status === 'processing' && (
          <div className="progress-bar-container">
            <div 
              className="progress-bar" 
              style={{ 
                width: `${progress}%`,
                backgroundColor: getStatusColor()
              }}
            />
            <span className="progress-text">{Math.round(progress)}%</span>
          </div>
        )}

        <div className="progress-message">
          {message}
        </div>

        {status === 'completed' && (
          <div className="completion-message">
            <FiCheckCircle className="success-icon" />
            <span>Operation completed successfully!</span>
          </div>
        )}

        {status === 'failed' && (
          <div className="error-message">
            <FiAlertCircle className="error-icon" />
            <span>Operation failed. Please try again.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker; 