import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import './Admin.css'

const Admin = () => {
  const navigate = useNavigate()
  const [files, setFiles] = useState([])
  const [stats, setStats] = useState({
    totalFiles: 0,
    todayFiles: 0,
    successRate: 0,
    totalSizeSaved: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin/login')
      return
    }

    fetchAdminData()
  }, [navigate])

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/admin/files', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.status === 401) {
        localStorage.removeItem('adminToken')
        navigate('/admin/login')
        return
      }

      if (response.ok) {
        const data = await response.json()
        setFiles(data.files)
        setStats(data.stats)
      } else {
        setError('Failed to fetch admin data')
      }
    } catch (error) {
      setError('Network error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async (fileId) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/admin/download/${fileId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `compressed-file-${fileId}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const handleDelete = async (fileId) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/admin/delete/${fileId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setFiles(files.filter(file => file._id !== fileId))
      }
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  const getFileTypeIcon = (type) => {
    if (type.startsWith('image/')) return '🖼️'
    if (type.startsWith('video/')) return '🎥'
    if (type.startsWith('audio/')) return '🎵'
    if (type === 'application/pdf') return '📄'
    return '📁'
  }

  // Chart data
  const fileTypeData = [
    { name: 'Images', value: files.filter(f => f.type.startsWith('image/')).length, color: '#8884d8' },
    { name: 'Videos', value: files.filter(f => f.type.startsWith('video/')).length, color: '#82ca9d' },
    { name: 'Audio', value: files.filter(f => f.type.startsWith('audio/')).length, color: '#ffc658' },
    { name: 'PDFs', value: files.filter(f => f.type === 'application/pdf').length, color: '#ff7300' }
  ]

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading admin dashboard...</p>
      </div>
    )
  }

  return (
    <div className="admin">
      <div className="container">
        {/* Header */}
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>{stats.totalFiles}</h3>
              <p>Total Files</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <h3>{stats.todayFiles}</h3>
              <p>Today's Files</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>{stats.successRate}%</h3>
              <p>Success Rate</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💾</div>
            <div className="stat-content">
              <h3>{formatFileSize(stats.totalSizeSaved)}</h3>
              <p>Storage Saved</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="charts-section">
          <div className="chart-container">
            <h3>Files by Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fileTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {fileTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Files Table */}
        <div className="files-section">
          <h3>Recent Files</h3>
          <div className="files-table">
            <table>
              <thead>
                <tr>
                  <th>File</th>
                  <th>Type</th>
                  <th>Original Size</th>
                  <th>Compressed Size</th>
                  <th>Reduction</th>
                  <th>Uploaded</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => {
                  const compressionRatio = Math.round((1 - file.compressedSize / file.originalSize) * 100)
                  return (
                    <tr key={file._id}>
                      <td>
                        <div className="file-info">
                          <span className="file-icon">{getFileTypeIcon(file.type)}</span>
                          <span className="file-name">{file.originalName}</span>
                        </div>
                      </td>
                      <td>{file.type}</td>
                      <td>{formatFileSize(file.originalSize)}</td>
                      <td>{formatFileSize(file.compressedSize)}</td>
                      <td>
                        <span className="compression-ratio">{compressionRatio}%</span>
                      </td>
                      <td>{formatDate(file.uploadedAt)}</td>
                      <td>
                        <div className="actions">
                          <button
                            onClick={() => handleDownload(file._id)}
                            className="btn btn-secondary btn-sm"
                          >
                            Download
                          </button>
                          <button
                            onClick={() => handleDelete(file._id)}
                            className="btn btn-ghost btn-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin