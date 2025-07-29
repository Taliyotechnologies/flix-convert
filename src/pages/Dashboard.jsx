import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';
import { FiFile, FiDownload, FiTrash2, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalFiles: 0,
    totalSize: 0,
    compressedFiles: 0,
    convertedFiles: 0
  });

  useEffect(() => {
    fetchUserFiles();
    fetchUserStats();
  }, []);

  const fetchUserFiles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/compress/user-files', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFiles(response.data.files || []);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/compress/user-stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data.stats || {});
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleDownload = async (fileId, originalName) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/compress/download/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', originalName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleDelete = async (fileId) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/compress/delete/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUserFiles();
      fetchUserStats();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="status-icon completed" />;
      case 'processing':
        return <FiClock className="status-icon processing" />;
      case 'failed':
        return <FiAlertCircle className="status-icon failed" />;
      default:
        return <FiClock className="status-icon processing" />;
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - ConvertFlix</title>
        <meta name="description" content="Manage your files and view your compression history" />
      </Helmet>

      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name || 'User'}!</h1>
          <p>Manage your files and track your compression history</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <FiFile />
            </div>
            <div className="stat-content">
              <h3>{stats.totalFiles}</h3>
              <p>Total Files</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FiDownload />
            </div>
            <div className="stat-content">
              <h3>{formatFileSize(stats.totalSize)}</h3>
              <p>Total Size</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FiCheckCircle />
            </div>
            <div className="stat-content">
              <h3>{stats.compressedFiles}</h3>
              <p>Compressed</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FiFile />
            </div>
            <div className="stat-content">
              <h3>{stats.convertedFiles}</h3>
              <p>Converted</p>
            </div>
          </div>
        </div>

        <div className="files-section">
          <div className="section-header">
            <h2>Recent Files</h2>
            <button onClick={fetchUserFiles} className="refresh-btn">
              Refresh
            </button>
          </div>

          {files.length === 0 ? (
            <div className="empty-state">
              <FiFile className="empty-icon" />
              <h3>No files yet</h3>
              <p>Start by uploading and compressing your first file</p>
              <a href="/tools" className="cta-button">
                Upload Files
              </a>
            </div>
          ) : (
            <div className="files-grid">
              {files.map((file) => (
                <div key={file._id} className="file-card">
                  <div className="file-header">
                    <div className="file-info">
                      <h4>{file.originalName}</h4>
                      <p className="file-type">{file.fileType}</p>
                    </div>
                    {getStatusIcon(file.status)}
                  </div>

                  <div className="file-details">
                    <div className="detail-item">
                      <span>Original Size:</span>
                      <span>{formatFileSize(file.originalSize)}</span>
                    </div>
                    {file.compressedSize && (
                      <div className="detail-item">
                        <span>Compressed Size:</span>
                        <span>{formatFileSize(file.compressedSize)}</span>
                      </div>
                    )}
                    <div className="detail-item">
                      <span>Uploaded:</span>
                      <span>{formatDate(file.createdAt)}</span>
                    </div>
                  </div>

                  <div className="file-actions">
                    {file.status === 'completed' && (
                      <button
                        onClick={() => handleDownload(file._id, file.originalName)}
                        className="action-btn download"
                      >
                        <FiDownload />
                        Download
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(file._id)}
                      className="action-btn delete"
                    >
                      <FiTrash2 />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard; 