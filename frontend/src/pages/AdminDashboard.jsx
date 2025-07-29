import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FiBarChart3, FiFile, FiDownload, FiTrash2, FiLogOut, FiRefreshCw, FiUsers, FiHardDrive } from 'react-icons/fi'

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedFiles, setSelectedFiles] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin/login')
      return
    }

    fetchDashboardData()
  }, [navigate])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      
      // Fetch dashboard stats
      const statsResponse = await fetch('https://flix-convert.onrender.com/api/admin/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData.data)
      }

      // Fetch files
      const filesResponse = await fetch('https://flix-convert.onrender.com/api/admin/files', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (filesResponse.ok) {
        const filesData = await filesResponse.json()
        setFiles(filesData.data.files)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    navigate('/admin/login')
  }

  const handleFileSelection = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    )
  }

  const handleSelectAll = () => {
    if (selectedFiles.length === files.length) {
      setSelectedFiles([])
    } else {
      setSelectedFiles(files.map(file => file._id))
    }
  }

  const handleDeleteFiles = async () => {
    if (!selectedFiles.length) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('https://flix-convert.onrender.com/api/admin/files', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fileIds: selectedFiles })
      })

      if (response.ok) {
        setSelectedFiles([])
        fetchDashboardData()
      }
    } catch (error) {
      console.error('Error deleting files:', error)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - ConvertFlix</title>
        <meta name="description" content="Admin dashboard for ConvertFlix file compression service." />
      </Helmet>

      <div className="container">
        <div className="dashboard-header">
          <div className="dashboard-title">
            <h1>Admin Dashboard</h1>
            <p>Manage files and monitor compression statistics</p>
          </div>
          <div className="dashboard-actions">
            <button onClick={fetchDashboardData} className="btn btn-secondary">
              <FiRefreshCw />
              Refresh
            </button>
            <button onClick={handleLogout} className="btn btn-danger">
              <FiLogOut />
              Logout
            </button>
          </div>
        </div>

        {stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <FiFile />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.totalFiles}</div>
                <div className="stat-label">Total Files</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <FiUsers />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.recentFiles}</div>
                <div className="stat-label">Recent Files (24h)</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <FiDownload />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.totalDownloads}</div>
                <div className="stat-label">Total Downloads</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <FiHardDrive />
              </div>
              <div className="stat-content">
                <div className="stat-number">{formatFileSize(stats.totalCompressedSize)}</div>
                <div className="stat-label">Storage Used</div>
              </div>
            </div>
          </div>
        )}

        <div className="files-section">
          <div className="files-header">
            <h2>File Management</h2>
            <div className="files-actions">
              {selectedFiles.length > 0 && (
                <button onClick={handleDeleteFiles} className="btn btn-danger">
                  <FiTrash2 />
                  Delete Selected ({selectedFiles.length})
                </button>
              )}
            </div>
          </div>

          <div className="files-table-container">
            <table className="file-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectedFiles.length === files.length && files.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>File Name</th>
                  <th>Type</th>
                  <th>Original Size</th>
                  <th>Compressed Size</th>
                  <th>Compression</th>
                  <th>Uploaded</th>
                  <th>Downloads</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file._id)}
                        onChange={() => handleFileSelection(file._id)}
                      />
                    </td>
                    <td>{file.originalName}</td>
                    <td>
                      <span className={`file-type file-type-${file.fileType}`}>
                        {file.fileType.toUpperCase()}
                      </span>
                    </td>
                    <td>{formatFileSize(file.originalSize)}</td>
                    <td>{formatFileSize(file.compressedSize)}</td>
                    <td>{file.compressionRatio.toFixed(1)}%</td>
                    <td>{formatDate(file.uploadTime)}</td>
                    <td>{file.downloadCount}</td>
                    <td>
                      <div className="file-actions">
                        <a
                          href={`https://flix-convert.onrender.com/api/files/download/${file._id}`}
                          className="btn btn-ghost"
                          download
                        >
                          <FiDownload />
                        </a>
                        <button
                          onClick={() => handleFileSelection(file._id)}
                          className="btn btn-ghost"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .dashboard-title h1 {
          margin-bottom: 0.5rem;
        }

        .dashboard-title p {
          color: var(--text-secondary);
        }

        .dashboard-actions {
          display: flex;
          gap: 1rem;
        }

        .files-section {
          margin-top: 3rem;
        }

        .files-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .files-actions {
          display: flex;
          gap: 1rem;
        }

        .files-table-container {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 0.75rem;
          overflow: hidden;
        }

        .file-type {
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .file-type-image {
          background-color: #dbeafe;
          color: #1d4ed8;
        }

        .file-type-video {
          background-color: #fee2e2;
          color: #dc2626;
        }

        .file-type-audio {
          background-color: #dcfce7;
          color: #059669;
        }

        .file-type-pdf {
          background-color: #fef3c7;
          color: #d97706;
        }

        .file-actions {
          display: flex;
          gap: 0.5rem;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .files-header {
            flex-direction: column;
            gap: 1rem;
          }

          .file-table {
            font-size: 0.875rem;
          }

          .file-table th,
          .file-table td {
            padding: 0.5rem;
          }
        }
      `}</style>
    </>
  )
}

export default AdminDashboard