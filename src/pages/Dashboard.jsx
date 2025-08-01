import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './Dashboard.css';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Mock data - replace with actual API calls
  const mockFiles = [
    {
      id: 1,
      name: 'image1.jpg',
      type: 'image',
      originalSize: '2.5MB',
      compressedSize: '800KB',
      savings: '68%',
      uploadedAt: '2024-01-15 14:30',
      status: 'completed'
    },
    {
      id: 2,
      name: 'document.pdf',
      type: 'pdf',
      originalSize: '5.2MB',
      compressedSize: '2.1MB',
      savings: '60%',
      uploadedAt: '2024-01-15 13:45',
      status: 'completed'
    },
    {
      id: 3,
      name: 'video.mp4',
      type: 'video',
      originalSize: '15.8MB',
      compressedSize: '8.2MB',
      savings: '48%',
      uploadedAt: '2024-01-15 12:20',
      status: 'processing'
    },
    {
      id: 4,
      name: 'audio.wav',
      type: 'audio',
      originalSize: '3.1MB',
      compressedSize: '1.2MB',
      savings: '61%',
      uploadedAt: '2024-01-15 11:15',
      status: 'completed'
    }
  ];

  const stats = {
    totalFiles: mockFiles.length,
    totalSaved: '12.8MB',
    averageSavings: '59%',
    fileTypes: {
      image: 1,
      pdf: 1,
      video: 1,
      audio: 1
    }
  };

  const filteredFiles = mockFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || file.type === filterType;
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

  const handleDelete = () => {
    // In real app, this would delete the selected files
    console.log('Deleting files:', selectedFiles);
    setSelectedFiles([]);
  };

  const handleDownload = (fileId) => {
    // In real app, this would download the file
    console.log('Downloading file:', fileId);
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

  const getTypeIcon = (type) => {
    switch (type) {
      case 'image':
        return '🖼️';
      case 'video':
        return '🎬';
      case 'audio':
        return '🎵';
      case 'pdf':
        return '📄';
      default:
        return '📁';
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - ConvertFlix</title>
        <meta name="description" content="Manage your files and view processing history in your ConvertFlix dashboard." />
      </Helmet>

      <div className="dashboard-page">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Manage your files and view processing history</p>
          </div>

          {/* Stats Section */}
          <div className="stats-section">
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
                <div className="stat-value">{stats.totalSaved}</div>
                <div className="stat-label">Space Saved</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-value">{stats.averageSavings}</div>
                <div className="stat-label">Avg. Savings</div>
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="controls-section">
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
                <>
                  <button
                    onClick={handleDelete}
                    className="btn btn-danger"
                  >
                    Delete Selected ({selectedFiles.length})
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Files Table */}
          <div className="files-section">
            <div className="table-container">
              <table className="files-table">
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
                    <th>File</th>
                    <th>Type</th>
                    <th>Original Size</th>
                    <th>New Size</th>
                    <th>Savings</th>
                    <th>Status</th>
                    <th>Uploaded</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.map((file) => (
                    <tr key={file.id} className="file-row">
                      <td className="checkbox-cell">
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(file.id)}
                          onChange={() => handleSelectFile(file.id)}
                          className="table-checkbox"
                        />
                      </td>
                      <td className="file-name">
                        <span className="file-icon">{getTypeIcon(file.type)}</span>
                        {file.name}
                      </td>
                      <td className="file-type">{file.type}</td>
                      <td className="file-size">{file.originalSize}</td>
                      <td className="file-size">{file.compressedSize}</td>
                      <td className="file-savings">{file.savings}</td>
                      <td className="file-status">
                        <span className={`status-badge status-${file.status}`}>
                          {getStatusIcon(file.status)} {file.status}
                        </span>
                      </td>
                      <td className="file-date">{file.uploadedAt}</td>
                      <td className="file-actions">
                        <button
                          onClick={() => handleDownload(file.id)}
                          className="btn btn-small btn-primary"
                          title="Download"
                        >
                          📥
                        </button>
                        <button
                          onClick={() => handleDelete([file.id])}
                          className="btn btn-small btn-danger"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredFiles.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📁</div>
              <h3>No files found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard; 