import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../hooks/useAuth.jsx'
import { adminAPI, formatFileSize } from '../services/api'

const AdminDashboard = ({ showToast }) => {
  const { user, isAdmin } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAdmin) {
      showToast('Access denied. Admin privileges required.', 'error')
      return
    }

    const fetchStats = async () => {
      try {
        const response = await adminAPI.dashboard()
        setStats(response.data.data)
      } catch (error) {
        showToast('Failed to load dashboard data', 'error')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [isAdmin, showToast])

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-text-secondary">Admin privileges required.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading"></div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - ConvertFlix</title>
        <meta name="description" content="Admin dashboard for ConvertFlix file processing statistics." />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-text-secondary">Welcome back, {user?.email}</p>
          </div>

          {stats && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="card text-center">
                  <div className="text-3xl mb-2">📁</div>
                  <h3 className="text-2xl font-bold text-primary">{stats.totalFiles}</h3>
                  <p className="text-text-secondary">Total Files (24h)</p>
                </div>

                <div className="card text-center">
                  <div className="text-3xl mb-2">👥</div>
                  <h3 className="text-2xl font-bold text-primary">{stats.totalUsers}</h3>
                  <p className="text-text-secondary">Total Users</p>
                </div>

                <div className="card text-center">
                  <div className="text-3xl mb-2">💾</div>
                  <h3 className="text-2xl font-bold text-success">{formatFileSize(stats.totalSaved)}</h3>
                  <p className="text-text-secondary">Storage Saved</p>
                </div>

                <div className="card text-center">
                  <div className="text-3xl mb-2">📊</div>
                  <h3 className="text-2xl font-bold text-success">{stats.percentSaved}%</h3>
                  <p className="text-text-secondary">Average Reduction</p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="card">
                  <h3 className="text-xl font-semibold mb-4">Files by Type</h3>
                  <div className="space-y-3">
                    {Object.entries(stats.filesByType).map(([type, count]) => (
                      <div key={type} className="flex justify-between items-center">
                        <span className="capitalize">{type}</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-xl font-semibold mb-4">Files by Operation</h3>
                  <div className="space-y-3">
                    {Object.entries(stats.filesByOperation).map(([operation, count]) => (
                      <div key={operation} className="flex justify-between items-center">
                        <span className="capitalize">{operation}</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Files */}
              <div className="card">
                <h3 className="text-xl font-semibold mb-4">Recent Files</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2">File Name</th>
                        <th className="text-left py-2">Type</th>
                        <th className="text-left py-2">Operation</th>
                        <th className="text-left py-2">Size Saved</th>
                        <th className="text-left py-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentFiles.map((file) => (
                        <tr key={file._id} className="border-b border-border">
                          <td className="py-2">{file.originalName}</td>
                          <td className="py-2 capitalize">{file.fileType}</td>
                          <td className="py-2 capitalize">{file.operation}</td>
                          <td className="py-2 text-success">
                            {formatFileSize(file.originalSize - file.compressedSize)}
                          </td>
                          <td className="py-2 text-text-secondary">
                            {new Date(file.uploadedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default AdminDashboard 