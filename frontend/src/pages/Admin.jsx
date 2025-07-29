import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import './Admin.css'

function Admin() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFiles: 0,
    totalConversions: 0,
    recentFiles: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdminStats()
  }, [])

  const fetchAdminStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setStats({
          totalUsers: data.data.overview.totalUsers,
          totalFiles: data.data.overview.totalFiles,
          totalConversions: data.data.overview.totalFiles, // Using total files as conversions
          recentFiles: data.data.recentFiles
        })
      }
    } catch (error) {
      console.error('Error fetching admin stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (response.ok) {
        fetchAdminStats()
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const handleDeleteFile = async (fileId) => {
    if (!confirm('Are you sure you want to delete this file?')) return
    
    try {
      const response = await fetch(`/api/admin/files/${fileId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (response.ok) {
        fetchAdminStats()
      }
    } catch (error) {
      console.error('Error deleting file:', error)
    }
  }

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {user?.name || 'Admin'}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <p className="stat-number">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📁</div>
          <div className="stat-content">
            <h3>Total Files</h3>
            <p className="stat-number">{stats.totalFiles}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <h3>Total Conversions</h3>
            <p className="stat-number">{stats.totalConversions}</p>
          </div>
        </div>
      </div>

      <div className="admin-sections">
        <div className="section">
          <h2>Recent Files</h2>
          <div className="files-list">
            {stats.recentFiles.length > 0 ? (
              stats.recentFiles.map((file) => (
                <div key={file._id} className="file-item">
                  <div className="file-info">
                    <span className="file-name">{file.originalName}</span>
                    <span className="file-size">{file.size} bytes</span>
                    <span className="file-type">{file.mimeType}</span>
                  </div>
                  <div className="file-actions">
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteFile(file._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No recent files</p>
            )}
          </div>
        </div>

        <div className="section">
          <h2>System Actions</h2>
          <div className="action-buttons">
            <button className="action-btn primary">
              Export User Data
            </button>
            <button className="action-btn secondary">
              System Backup
            </button>
            <button className="action-btn warning">
              Clear Cache
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin 