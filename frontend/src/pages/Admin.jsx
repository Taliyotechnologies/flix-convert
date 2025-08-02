import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Download, 
  Trash2, 
  Search, 
  Filter,
  FileText,
  Image,
  Video,
  Music,
  BarChart3,
  Clock,
  AlertCircle
} from 'lucide-react';
import './Admin.css';

const Admin = () => {
  const [files, setFiles] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchFiles();
    fetchStats();
  }, [currentPage, searchTerm, fileTypeFilter]);

  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        search: searchTerm,
        fileType: fileTypeFilter
      });

      const response = await fetch(`http://localhost:5000/api/admin/files?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/login');
          return;
        }
        throw new Error('Failed to fetch files');
      }

      const data = await response.json();
      setFiles(data.data.files);
      setTotalPages(data.data.pagination.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const downloadFile = async (fileId, fileName) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/admin/files/${fileId}/download`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      setError('Failed to download file');
    }
  };

  const deleteFile = async (fileId) => {
    if (!window.confirm('Are you sure you want to delete this file?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/admin/files/${fileId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchFiles();
        fetchStats();
      } else {
        throw new Error('Failed to delete file');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTimeRemaining = (timeRemaining) => {
    if (timeRemaining.total <= 0) return 'Expired';
    return `${timeRemaining.hours}h ${timeRemaining.minutes}m`;
  };

  const getFileTypeIcon = (fileType) => {
    switch (fileType) {
      case 'image': return Image;
      case 'video': return Video;
      case 'audio': return Music;
      case 'pdf': return FileText;
      default: return FileText;
    }
  };

  const getFileTypeColor = (fileType) => {
    switch (fileType) {
      case 'image': return '#10b981';
      case 'video': return '#8b5cf6';
      case 'audio': return '#ef4444';
      case 'pdf': return '#84cc16';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading admin dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage all processed files and view statistics</p>
        </div>

        {error && (
          <div className="error-message">
            <AlertCircle className="error-icon" />
            <p>{error}</p>
          </div>
        )}

        {stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <BarChart3 />
              </div>
              <div className="stat-content">
                <h3>Total Files</h3>
                <p className="stat-value">{stats.totalFiles}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Image />
              </div>
              <div className="stat-content">
                <h3>Images</h3>
                <p className="stat-value">{stats.byType.image}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Video />
              </div>
              <div className="stat-content">
                <h3>Videos</h3>
                <p className="stat-value">{stats.byType.video}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Music />
              </div>
              <div className="stat-content">
                <h3>Audio</h3>
                <p className="stat-value">{stats.byType.audio}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FileText />
              </div>
              <div className="stat-content">
                <h3>PDFs</h3>
                <p className="stat-value">{stats.byType.pdf}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <BarChart3 />
              </div>
              <div className="stat-content">
                <h3>Avg. Saved</h3>
                <p className="stat-value">{stats.storage.averageSavedPercent}%</p>
              </div>
            </div>
          </div>
        )}

        <div className="files-section">
          <div className="files-header">
            <h2>Processed Files</h2>
            <div className="filters">
              <div className="search-box">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input"
                />
              </div>
              <div className="filter-box">
                <Filter className="filter-icon" />
                <select
                  value={fileTypeFilter}
                  onChange={(e) => setFileTypeFilter(e.target.value)}
                  className="input"
                >
                  <option value="">All Types</option>
                  <option value="image">Images</option>
                  <option value="video">Videos</option>
                  <option value="audio">Audio</option>
                  <option value="pdf">PDFs</option>
                </select>
              </div>
            </div>
          </div>

          <div className="files-table">
            <table>
              <thead>
                <tr>
                  <th>File</th>
                  <th>Type</th>
                  <th>Original Size</th>
                  <th>Processed Size</th>
                  <th>Saved</th>
                  <th>Time Left</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => {
                  const FileTypeIcon = getFileTypeIcon(file.fileType);
                  const fileTypeColor = getFileTypeColor(file.fileType);
                  
                  return (
                    <tr key={file._id}>
                      <td>
                        <div className="file-info">
                          <div className="file-icon" style={{ backgroundColor: fileTypeColor }}>
                            <FileTypeIcon />
                          </div>
                          <div className="file-details">
                            <p className="file-name">{file.fileName}</p>
                            <p className="file-original">{file.originalName}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="file-type">{file.fileType}</span>
                      </td>
                      <td>{formatFileSize(file.originalSize)}</td>
                      <td>{formatFileSize(file.processedSize)}</td>
                      <td>
                        <span className="saved-percent">{file.savedPercent}%</span>
                      </td>
                      <td>
                        <div className="time-remaining">
                          <Clock className="clock-icon" />
                          <span>{formatTimeRemaining(file.timeRemaining)}</span>
                        </div>
                      </td>
                      <td>
                        <div className="actions">
                          <button
                            className="btn btn-secondary action-btn"
                            onClick={() => downloadFile(file._id, file.fileName)}
                            title="Download"
                          >
                            <Download />
                          </button>
                          <button
                            className="btn btn-error action-btn"
                            onClick={() => deleteFile(file._id)}
                            title="Delete"
                          >
                            <Trash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {files.length === 0 && !loading && (
              <div className="no-files">
                <FileText className="no-files-icon" />
                <p>No files found</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="btn btn-secondary"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-secondary"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin; 