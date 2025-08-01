import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './Dashboard.css';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Mock data
  const stats = {
    totalFiles: 1247,
    totalSize: '2.4 GB',
    processedToday: 23,
    spaceSaved: '856 MB'
  };

  const fileLogs = [
    {
      id: 1,
      name: 'presentation.pdf',
      type: 'PDF',
      originalSize: '2.4 MB',
      compressedSize: '1.2 MB',
      saved: '50%',
      status: 'completed',
      date: '2024-01-15 14:30'
    },
    {
      id: 2,
      name: 'vacation_photos.jpg',
      type: 'Image',
      originalSize: '8.5 MB',
      compressedSize: '3.2 MB',
      saved: '62%',
      status: 'completed',
      date: '2024-01-15 13:45'
    },
    {
      id: 3,
      name: 'meeting_recording.mp4',
      type: 'Video',
      originalSize: '45.2 MB',
      compressedSize: '28.1 MB',
      saved: '38%',
      status: 'processing',
      date: '2024-01-15 12:20'
    },
    {
      id: 4,
      name: 'document.docx',
      type: 'Document',
      originalSize: '1.8 MB',
      compressedSize: '1.1 MB',
      saved: '39%',
      status: 'completed',
      date: '2024-01-15 11:15'
    },
    {
      id: 5,
      name: 'music_track.mp3',
      type: 'Audio',
      originalSize: '5.6 MB',
      compressedSize: '4.2 MB',
      saved: '25%',
      status: 'failed',
      date: '2024-01-15 10:30'
    }
  ];

  const filteredFiles = fileLogs.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || file.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleSelectFile = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredFiles.map(file => file.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedFiles.length > 0) {
      if (confirm(`Are you sure you want to delete ${selectedFiles.length} file(s)?`)) {
        // In real app, delete files from backend
        alert('Files would be deleted here');
        setSelectedFiles([]);
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'processing':
        return '⏳';
      case 'failed':
        return '❌';
      default:
        return '⏳';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'warning';
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - ConvertFlix</title>
        <meta name="description" content="Manage your file processing history and account settings." />
      </Helmet>

      <div className="dashboard">
        <div className="container">
          {/* Header */}
          <div className="dashboard-header">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Manage your file processing history</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📁</div>
              <div className="stat-content">
                <div className="stat-value">{stats.totalFiles}</div>
                <div className="stat-label">Total Files</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">💾</div>
              <div className="stat-content">
                <div className="stat-value">{stats.totalSize}</div>
                <div className="stat-label">Total Size</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">⚡</div>
              <div className="stat-content">
                <div className="stat-value">{stats.processedToday}</div>
                <div className="stat-label">Processed Today</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <div className="stat-value">{stats.spaceSaved}</div>
                <div className="stat-label">Space Saved</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="dashboard-controls">
            <div className="search-filter">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <span className="search-icon">🔍</span>
              </div>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Types</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
                <option value="audio">Audio</option>
                <option value="pdf">PDFs</option>
                <option value="document">Documents</option>
              </select>
            </div>

            <div className="bulk-actions">
              <button
                onClick={handleSelectAll}
                className="btn btn-secondary"
              >
                {selectedFiles.length === filteredFiles.length ? 'Deselect All' : 'Select All'}
              </button>
              
              {selectedFiles.length > 0 && (
                <button
                  onClick={handleDeleteSelected}
                  className="btn btn-danger"
                >
                  Delete Selected ({selectedFiles.length})
                </button>
              )}
            </div>
          </div>

          {/* File Logs Table */}
          <div className="table-container">
            <table className="file-logs-table">
              <thead>
                <tr>
                  <th className="checkbox-cell">
                    <input
                      type="checkbox"
                      checked={selectedFiles.length === filteredFiles.length && filteredFiles.length > 0}
                      onChange={handleSelectAll}
                      className="table-checkbox"
                    />
                  </th>
                  <th>File Name</th>
                  <th>Type</th>
                  <th>Original Size</th>
                  <th>Compressed Size</th>
                  <th>Saved</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map(file => (
                  <tr key={file.id} className="file-row">
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => handleSelectFile(file.id)}
                        className="table-checkbox"
                      />
                    </td>
                    <td className="file-name">{file.name}</td>
                    <td className="file-type">
                      <span className="type-badge">{file.type}</span>
                    </td>
                    <td className="file-size">{file.originalSize}</td>
                    <td className="file-size">{file.compressedSize}</td>
                    <td className="file-saved">{file.saved}</td>
                    <td className="file-status">
                      <span className={`status-badge ${getStatusColor(file.status)}`}>
                        {getStatusIcon(file.status)} {file.status}
                      </span>
                    </td>
                    <td className="file-date">{file.date}</td>
                    <td className="file-actions">
                      <button className="action-btn download-btn" title="Download">
                        📥
                      </button>
                      <button className="action-btn delete-btn" title="Delete">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredFiles.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">📁</div>
                <h3 className="empty-title">No files found</h3>
                <p className="empty-description">
                  {searchTerm || filterType !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'Start processing files to see them here'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard; 