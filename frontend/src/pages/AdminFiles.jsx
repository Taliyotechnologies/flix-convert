import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../hooks/useAuth.jsx'
import { adminAPI, formatFileSize, formatDate } from '../services/api'

const AdminFiles = ({ showToast }) => {
  const { isAdmin } = useAuth()
  const [files, setFiles] = useState([])
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (!isAdmin) {
      showToast('Access denied. Admin privileges required.', 'error')
      return
    }

    fetchFiles()
  }, [isAdmin, currentPage, showToast])

  const fetchFiles = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.files(currentPage, 20)
      setFiles(response.data.data.files)
      setPagination(response.data.data.pagination)
    } catch (error) {
      showToast('Failed to load files', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (fileId) => {
    if (!confirm('Are you sure you want to delete this file?')) return

    try {
      await adminAPI.deleteFile(fileId)
      showToast('File deleted successfully', 'success')
      fetchFiles()
    } catch (error) {
      showToast('Failed to delete file', 'error')
    }
  }

  const handleDownload = async (fileId, fileName) => {
    try {
      const response = await adminAPI.downloadFile(fileId)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      showToast('Failed to download file', 'error')
    }
  }

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
        <title>Admin Files - ConvertFlix</title>
        <meta name="description" content="Admin file management for ConvertFlix." />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">File Management</h1>
            <p className="text-text-secondary">Manage all processed files</p>
          </div>

          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4">File Name</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Operation</th>
                    <th className="text-left py-3 px-4">Original Size</th>
                    <th className="text-left py-3 px-4">Compressed Size</th>
                    <th className="text-left py-3 px-4">Saved</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file) => (
                    <tr key={file._id} className="border-b border-border hover:bg-hover">
                      <td className="py-3 px-4">{file.originalName}</td>
                      <td className="py-3 px-4 capitalize">{file.fileType}</td>
                      <td className="py-3 px-4 capitalize">{file.operation}</td>
                      <td className="py-3 px-4">{formatFileSize(file.originalSize)}</td>
                      <td className="py-3 px-4">{formatFileSize(file.compressedSize)}</td>
                      <td className="py-3 px-4 text-success">
                        {formatFileSize(file.originalSize - file.compressedSize)}
                      </td>
                      <td className="py-3 px-4 text-text-secondary">
                        {formatDate(file.uploadedAt)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDownload(file._id, file.originalName)}
                            className="btn btn-secondary text-sm px-3 py-1"
                          >
                            📥
                          </button>
                          <button
                            onClick={() => handleDelete(file._id)}
                            className="btn btn-error text-sm px-3 py-1"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="btn btn-secondary disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="flex items-center px-4">
                  Page {currentPage} of {pagination.pages}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === pagination.pages}
                  className="btn btn-secondary disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminFiles 