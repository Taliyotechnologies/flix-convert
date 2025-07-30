import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FiUsers, 
  FiFile, 
  FiDownload, 
  FiTrash2, 
  FiEye, 
  FiEyeOff,
  FiRefreshCw,
  FiTrendingUp,
  FiTrendingDown,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Admin = () => {
  const [stats, setStats] = useState(null);
  const [files, setFiles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, filesRes, usersRes] = await Promise.all([
        axios.get('/api/admin/stats'),
        axios.get('/api/admin/files?page=1&limit=10'),
        axios.get('/api/admin/users?page=1&limit=10')
      ]);

      setStats(statsRes.data);
      setFiles(filesRes.data.files);
      setUsers(usersRes.data.users);
      setTotalPages(filesRes.data.pagination.pages);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFile = async (fileId) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;

    try {
      await axios.delete(`/api/admin/files/${fileId}`);
      setFiles(files.filter(file => file.id !== fileId));
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      await axios.put(`/api/admin/users/${userId}/status`, {
        isActive: !currentStatus
      });
      setUsers(users.map(user => 
        user._id === userId 
          ? { ...user, isActive: !currentStatus }
          : user
      ));
    } catch (error) {
      console.error('Failed to toggle user status:', error);
    }
  };

  const handleChangeUserRole = async (userId, newRole) => {
    try {
      await axios.put(`/api/admin/users/${userId}/role`, {
        role: newRole
      });
      setUsers(users.map(user => 
        user._id === userId 
          ? { ...user, role: newRole }
          : user
      ));
    } catch (error) {
      console.error('Failed to change user role:', error);
    }
  };

  const chartData = stats ? {
    pie: {
      labels: stats.filesByType.map(item => item.type),
      datasets: [{
        data: stats.filesByType.map(item => item.count),
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6'
        ]
      }]
    },
    bar: {
      labels: stats.filesByType.map(item => item.type),
      datasets: [{
        label: 'Original Size',
        data: stats.filesByType.map(item => 
          parseInt(item.totalSize.replace(/[^\d]/g, ''))
        ),
        backgroundColor: '#3B82F6'
      }, {
        label: 'Compressed Size',
        data: stats.filesByType.map(item => 
          parseInt(item.totalCompressedSize.replace(/[^\d]/g, ''))
        ),
        backgroundColor: '#10B981'
      }]
    }
  } : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-secondary flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-primary-color"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-secondary">
      <div className="container py-6 md:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Admin Dashboard</h1>
          <button
            onClick={loadDashboardData}
            className="btn btn-secondary inline-flex items-center w-full sm:w-auto"
          >
            <FiRefreshCw size={16} />
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-xs md:text-sm">Total Files</p>
                <p className="text-xl md:text-2xl font-bold text-text-primary">{stats?.totalFiles || 0}</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-color bg-opacity-10 rounded-lg flex items-center justify-center">
                <FiFile size={20} className="text-primary-color md:w-6 md:h-6" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-xs md:text-sm">Total Users</p>
                <p className="text-xl md:text-2xl font-bold text-text-primary">{stats?.totalUsers || 0}</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-success-color bg-opacity-10 rounded-lg flex items-center justify-center">
                <FiUsers size={20} className="text-success-color md:w-6 md:h-6" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-xs md:text-sm">Recent Files</p>
                <p className="text-xl md:text-2xl font-bold text-text-primary">{stats?.recentFiles || 0}</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-accent-color bg-opacity-10 rounded-lg flex items-center justify-center">
                <FiTrendingUp size={20} className="text-accent-color md:w-6 md:h-6" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-xs md:text-sm">Space Saved</p>
                <p className="text-xl md:text-2xl font-bold text-text-primary">
                  {stats?.totalSpaceSaved?.savedPercent || 0}%
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-warning-color bg-opacity-10 rounded-lg flex items-center justify-center">
                <FiTrendingDown size={20} className="text-warning-color md:w-6 md:h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        {chartData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="card">
              <h3 className="text-base md:text-lg font-semibold text-text-primary mb-4">Files by Type</h3>
              <div className="h-48 md:h-64">
                <Pie data={chartData.pie} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
            <div className="card">
              <h3 className="text-base md:text-lg font-semibold text-text-primary mb-4">File Sizes</h3>
              <div className="h-48 md:h-64">
                <Bar data={chartData.bar} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="card">
          <div className="border-b border-border-color mb-4 md:mb-6">
            <nav className="flex flex-wrap space-x-4 md:space-x-8">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'dashboard'
                    ? 'border-primary-color text-primary-color'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('files')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'files'
                    ? 'border-primary-color text-primary-color'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                Files
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-primary-color text-primary-color'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                Users
              </button>
            </nav>
          </div>

          {/* Files Tab */}
          {activeTab === 'files' && (
            <div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm md:text-base">
                  <thead>
                    <tr className="border-b border-border-color">
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 font-medium text-text-primary">File</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 font-medium text-text-primary hidden sm:table-cell">Type</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 font-medium text-text-primary hidden md:table-cell">Size</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 font-medium text-text-primary">Saved</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 font-medium text-text-primary hidden lg:table-cell">User</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 font-medium text-text-primary hidden md:table-cell">Time Left</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 font-medium text-text-primary">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file) => (
                      <tr key={file.id} className="border-b border-border-color">
                        <td className="py-2 md:py-3 px-2 md:px-4">
                          <div>
                            <p className="font-medium text-text-primary text-xs md:text-sm">{file.originalName}</p>
                            <p className="text-xs text-text-muted hidden sm:block">{file.fileName}</p>
                            <div className="sm:hidden">
                              <span className="px-2 py-1 bg-primary-color bg-opacity-10 text-primary-color rounded text-xs">
                                {file.fileType}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 hidden sm:table-cell">
                          <span className="px-2 py-1 bg-primary-color bg-opacity-10 text-primary-color rounded text-xs">
                            {file.fileType}
                          </span>
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 hidden md:table-cell">
                          <div>
                            <p className="text-xs md:text-sm text-text-secondary">{file.originalSize}</p>
                            <p className="text-xs md:text-sm text-text-secondary">{file.compressedSize}</p>
                          </div>
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4">
                          <span className="text-success-color font-medium text-xs md:text-sm">
                            {file.savedPercent}%
                          </span>
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 hidden lg:table-cell">
                          {file.user ? (
                            <div>
                              <p className="text-xs md:text-sm text-text-primary">{file.user.name}</p>
                              <p className="text-xs text-text-muted">{file.user.email}</p>
                            </div>
                          ) : (
                            <span className="text-text-muted text-xs md:text-sm">Anonymous</span>
                          )}
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 hidden md:table-cell">
                          <span className={`text-xs md:text-sm ${
                            file.isExpired ? 'text-error-color' : 'text-text-secondary'
                          }`}>
                            {file.timeLeft}
                          </span>
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4">
                          <div className="flex items-center gap-1 md:gap-2">
                            <a
                              href={file.downloadUrl}
                              className="p-1 text-primary-color hover:text-primary-hover"
                              title="Download"
                            >
                              <FiDownload size={14} className="md:w-4 md:h-4" />
                            </a>
                            <button
                              onClick={() => handleDeleteFile(file.id)}
                              className="p-1 text-error-color hover:text-error-color"
                              title="Delete"
                            >
                              <FiTrash2 size={14} className="md:w-4 md:h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm md:text-base">
                  <thead>
                    <tr className="border-b border-border-color">
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 font-medium text-text-primary">User</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 font-medium text-text-primary hidden md:table-cell">Email</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 font-medium text-text-primary">Role</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 font-medium text-text-primary hidden sm:table-cell">Files</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 font-medium text-text-primary">Status</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 font-medium text-text-primary">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} className="border-b border-border-color">
                        <td className="py-2 md:py-3 px-2 md:px-4">
                          <div>
                            <p className="font-medium text-text-primary text-xs md:text-sm">{user.name}</p>
                            <p className="text-xs text-text-muted">
                              Joined {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-text-primary md:hidden">{user.email}</p>
                          </div>
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 hidden md:table-cell">
                          <p className="text-xs md:text-sm text-text-primary">{user.email}</p>
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4">
                          <select
                            value={user.role}
                            onChange={(e) => handleChangeUserRole(user._id, e.target.value)}
                            className="text-xs md:text-sm border border-border-color rounded px-1 md:px-2 py-1"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 hidden sm:table-cell">
                          <span className="text-xs md:text-sm text-text-secondary">{user.fileCount || 0}</span>
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            user.isActive
                              ? 'bg-success-color bg-opacity-10 text-success-color'
                              : 'bg-error-color bg-opacity-10 text-error-color'
                          }`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4">
                          <button
                            onClick={() => handleToggleUserStatus(user._id, user.isActive)}
                            className="p-1 text-text-secondary hover:text-text-primary"
                            title={user.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {user.isActive ? <FiEyeOff size={14} className="md:w-4 md:h-4" /> : <FiEye size={14} className="md:w-4 md:h-4" />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin; 