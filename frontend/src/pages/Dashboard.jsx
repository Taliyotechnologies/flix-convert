import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import './Dashboard.css'

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  // Mock data - replace with actual API calls
  const fileLogs = [
    {
      id: 1,
      fileName: 'image1.jpg',
      fileType: 'image',
      originalSize: '2.5MB',
      compressedSize: '1.2MB',
      savedPercent: 52,
      processedAt: '2024-01-15 14:30',
      status: 'completed'
    },
    {
      id: 2,
      fileName: 'document.pdf',
      fileType: 'document',
      originalSize: '5.8MB',
      compressedSize: '3.1MB',
      savedPercent: 47,
      processedAt: '2024-01-15 13:45',
      status: 'completed'
    },
    {
      id: 3,
      fileName: 'video.mp4',
      fileType: 'video',
      originalSize: '8.2MB',
      compressedSize: '4.9MB',
      savedPercent: 40,
      processedAt: '2024-01-15 12:20',
      status: 'completed'
    },
    {
      id: 4,
      fileName: 'audio.wav',
      fileType: 'audio',
      originalSize: '3.1MB',
      compressedSize: '1.8MB',
      savedPercent: 42,
      processedAt: '2024-01-15 11:15',
      status: 'completed'
    }
  ]

  const stats = {
    totalFiles: 1247,
    totalSpaceSaved: '2.3GB',
    averageCompression: 45,
    todayProcessed: 23
  }

  const filteredLogs = fileLogs.filter(log => {
    const matchesSearch = log.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || log.fileType === filterType
    return matchesSearch && matchesFilter
  })

  const getFileTypeIcon = (type) => {
    const icons = {
      image: '🖼️',
      document: '📄',
      video: '🎬',
      audio: '🎵'
    }
    return icons[type] || '📁'
  }

  const getStatusColor = (status) => {
    return status === 'completed' ? 'success' : 'pending'
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - ConvertFlix</title>
        <meta name="description" content="Admin dashboard for ConvertFlix file processing statistics." />
      </Helmet>

      <div className="dashboard">
        <div className="container">
          {/* Header */}
          <div className="dashboard-header">
            <h1>Dashboard</h1>
            <p>Monitor file processing activity and statistics</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <h3>Total Files</h3>
                <p className="stat-value">{stats.totalFiles.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="stat-card card">
              <div className="stat-icon">💾</div>
              <div className="stat-content">
                <h3>Space Saved</h3>
                <p className="stat-value">{stats.totalSpaceSaved}</p>
              </div>
            </div>
            
            <div className="stat-card card">
              <div className="stat-icon">📈</div>
              <div className="stat-content">
                <h3>Avg Compression</h3>
                <p className="stat-value">{stats.averageCompression}%</p>
              </div>
            </div>
            
            <div className="stat-card card">
              <div className="stat-icon">📅</div>
              <div className="stat-content">
                <h3>Today's Files</h3>
                <p className="stat-value">{stats.todayProcessed}</p>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="filters-section">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
                onClick={() => setFilterType('all')}
              >
                All
              </button>
              <button
                className={`filter-btn ${filterType === 'image' ? 'active' : ''}`}
                onClick={() => setFilterType('image')}
              >
                Images
              </button>
              <button
                className={`filter-btn ${filterType === 'document' ? 'active' : ''}`}
                onClick={() => setFilterType('document')}
              >
                Documents
              </button>
              <button
                className={`filter-btn ${filterType === 'video' ? 'active' : ''}`}
                onClick={() => setFilterType('video')}
              >
                Videos
              </button>
              <button
                className={`filter-btn ${filterType === 'audio' ? 'active' : ''}`}
                onClick={() => setFilterType('audio')}
              >
                Audio
              </button>
            </div>
          </div>

          {/* File Logs Table */}
          <div className="logs-section">
            <div className="section-header">
              <h2>Recent File Logs</h2>
              <button className="btn btn-secondary">Export Data</button>
            </div>
            
            <div className="logs-table card">
              <table>
                <thead>
                  <tr>
                    <th>File</th>
                    <th>Type</th>
                    <th>Original Size</th>
                    <th>Compressed Size</th>
                    <th>Saved</th>
                    <th>Processed</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map(log => (
                    <tr key={log.id}>
                      <td className="file-cell">
                        <div className="file-info">
                          <span className="file-icon">{getFileTypeIcon(log.fileType)}</span>
                          <span className="file-name">{log.fileName}</span>
                        </div>
                      </td>
                      <td>
                        <span className="file-type">{log.fileType}</span>
                      </td>
                      <td>{log.originalSize}</td>
                      <td>{log.compressedSize}</td>
                      <td>
                        <span className="saved-percent">{log.savedPercent}%</span>
                      </td>
                      <td>{log.processedAt}</td>
                      <td>
                        <span className={`status ${getStatusColor(log.status)}`}>
                          {log.status}
                        </span>
                      </td>
                      <td>
                        <div className="actions">
                          <button className="action-btn">Download</button>
                          <button className="action-btn delete">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard 