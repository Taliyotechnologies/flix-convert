import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  BarChart3, 
  FolderOpen, 
  Users, 
  TrendingUp, 
  Settings, 
  Download, 
  Trash2, 
  Edit, 
  Pause,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    totalFiles: 0,
    totalSizeSaved: 0,
    averageCompressionRatio: 0,
    filesByType: {},
    dailyStats: {}
  });
  const [files, setFiles] = useState([]);
  const [users, setUsers] = useState([]);
  const [systemInfo, setSystemInfo] = useState({});

  // Mock data for demonstration
  useEffect(() => {
    // Simulate API calls
    setStats({
      totalFiles: 1247,
      totalSizeSaved: 856,
      averageCompressionRatio: 45.2,
      filesByType: {
        image: 456,
        video: 234,
        audio: 123,
        pdf: 89,
        document: 245
      },
      dailyStats: {
        '2024-01-15': { count: 23, sizeSaved: 45 },
        '2024-01-14': { count: 18, sizeSaved: 32 },
        '2024-01-13': { count: 31, sizeSaved: 67 }
      }
    });

    setFiles([
      {
        id: 1,
        fileName: 'presentation.pdf',
        type: 'pdf',
        originalSize: 2400000,
        processedSize: 1200000,
        savedPercent: 50,
        uploadedAt: '2024-01-15T14:30:00Z',
        expiresAt: '2024-01-16T14:30:00Z',
        status: 'completed'
      },
      {
        id: 2,
        fileName: 'vacation_photos.jpg',
        type: 'image',
        originalSize: 8500000,
        processedSize: 3200000,
        savedPercent: 62,
        uploadedAt: '2024-01-15T13:45:00Z',
        expiresAt: '2024-01-16T13:45:00Z',
        status: 'completed'
      }
    ]);

    setUsers([
      {
        id: 1,
        email: 'admin@flixconvert.com',
        role: 'admin',
        lastLogin: '2024-01-15T10:30:00Z',
        status: 'active'
      },
      {
        id: 2,
        email: 'user@example.com',
        role: 'user',
        lastLogin: '2024-01-14T15:20:00Z',
        status: 'active'
      }
    ]);

    setSystemInfo({
      nodeVersion: 'v18.17.0',
      platform: 'linux',
      memoryUsage: { used: '256MB', total: '512MB' },
      uptime: '7 days, 3 hours',
      storageStats: { totalFiles: 1247, totalSize: '2.4GB' }
    });
  }, []);

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleDeleteFile = (fileId) => {
    if (confirm('Are you sure you want to delete this file?')) {
      setFiles(prev => prev.filter(file => file.id !== fileId));
    }
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "FileName,Type,OriginalSize,ProcessedSize,SavedPercent,UploadedAt,ExpiresAt\n" +
      files.map(file => 
        `${file.fileName},${file.type},${file.originalSize},${file.processedSize},${file.savedPercent},${file.uploadedAt},${file.expiresAt}`
      ).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "file-logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderDashboard = () => (
    <div className="admin-dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FolderOpen size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalFiles.toLocaleString()}</div>
            <div className="stat-label">Total Files</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <BarChart3 size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{formatBytes(stats.totalSizeSaved * 1024 * 1024)}</div>
            <div className="stat-label">Space Saved</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.averageCompressionRatio}%</div>
            <div className="stat-label">Avg Compression</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{Object.values(stats.dailyStats).reduce((sum, day) => sum + day.count, 0)}</div>
            <div className="stat-label">Today's Files</div>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Files by Type</h3>
          <div className="chart-content">
            {Object.entries(stats.filesByType).map(([type, count]) => (
              <div key={type} className="chart-item">
                <span className="chart-label">{type}</span>
                <div className="chart-bar">
                  <div 
                    className="chart-fill" 
                    style={{ width: `${(count / Math.max(...Object.values(stats.filesByType))) * 100}%` }}
                  ></div>
                </div>
                <span className="chart-value">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3>Daily Activity</h3>
          <div className="chart-content">
            {Object.entries(stats.dailyStats).map(([date, data]) => (
              <div key={date} className="chart-item">
                <span className="chart-label">{new Date(date).toLocaleDateString()}</span>
                <div className="chart-bar">
                  <div 
                    className="chart-fill" 
                    style={{ width: `${(data.count / Math.max(...Object.values(stats.dailyStats).map(d => d.count))) * 100}%` }}
                  ></div>
                </div>
                <span className="chart-value">{data.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderFiles = () => (
    <div className="admin-files">
      <div className="section-header">
        <h2>File Management</h2>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={handleExportCSV}>
            Export CSV
          </button>
          <button className="btn btn-primary">
            Cleanup Expired
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Type</th>
              <th>Original Size</th>
              <th>Processed Size</th>
              <th>Saved</th>
              <th>Status</th>
              <th>Uploaded</th>
              <th>Expires</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map(file => (
              <tr key={file.id}>
                <td className="file-name">{file.fileName}</td>
                <td className="file-type">
                  <span className={`type-badge ${file.type}`}>{file.type}</span>
                </td>
                <td>{formatBytes(file.originalSize)}</td>
                <td>{formatBytes(file.processedSize)}</td>
                <td className="saved-percent">{file.savedPercent}%</td>
                <td>
                  <span className={`status-badge ${file.status}`}>
                    {file.status}
                  </span>
                </td>
                <td>{formatDate(file.uploadedAt)}</td>
                <td>{formatDate(file.expiresAt)}</td>
                <td className="actions">
                  <button className="action-btn" title="Download">
                    <Download size={16} />
                  </button>
                  <button 
                    className="action-btn delete" 
                    title="Delete"
                    onClick={() => handleDeleteFile(file.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="admin-users">
      <div className="section-header">
        <h2>User Management</h2>
        <button className="btn btn-primary">Add User</button>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>{user.role}</span>
                </td>
                <td>
                  <span className={`status-badge ${user.status}`}>
                    {user.status}
                  </span>
                </td>
                <td>{formatDate(user.lastLogin)}</td>
                <td className="actions">
                  <button className="action-btn" title="Edit">
                    <Edit size={16} />
                  </button>
                  <button className="action-btn" title="Suspend">
                    <Pause size={16} />
                  </button>
                  <button className="action-btn delete" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="admin-settings">
      <div className="settings-section">
        <h3>System Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Node Version:</span>
            <span className="info-value">{systemInfo.nodeVersion}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Platform:</span>
            <span className="info-value">{systemInfo.platform}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Uptime:</span>
            <span className="info-value">{systemInfo.uptime}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Memory Usage:</span>
            <span className="info-value">{systemInfo.memoryUsage?.used} / {systemInfo.memoryUsage?.total}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Total Files:</span>
            <span className="info-value">{systemInfo.storageStats?.totalFiles}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Storage Used:</span>
            <span className="info-value">{systemInfo.storageStats?.totalSize}</span>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>Application Settings</h3>
        <div className="settings-form">
          <div className="form-group">
            <label>File Upload Limit</label>
            <input type="number" defaultValue="100" className="form-input" />
            <span className="form-hint">MB</span>
          </div>
          
          <div className="form-group">
            <label>File Retention Period</label>
            <input type="number" defaultValue="24" className="form-input" />
            <span className="form-hint">hours</span>
          </div>
          
          <div className="form-group">
            <label>Max Concurrent Uploads</label>
            <input type="number" defaultValue="5" className="form-input" />
          </div>
          
          <div className="form-group">
            <label>Enable Email Notifications</label>
            <input type="checkbox" defaultChecked className="form-checkbox" />
          </div>
          
          <button className="btn btn-primary">Save Settings</button>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="admin-analytics">
      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Traffic Overview</h3>
          <div className="metric">
            <span className="metric-value">12,847</span>
            <span className="metric-label">Total Visits</span>
          </div>
          <div className="metric">
            <span className="metric-value">8,234</span>
            <span className="metric-label">Unique Users</span>
          </div>
          <div className="metric">
            <span className="metric-value">64.2%</span>
            <span className="metric-label">Conversion Rate</span>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Performance Metrics</h3>
          <div className="metric">
            <span className="metric-value">2.3s</span>
            <span className="metric-label">Avg Load Time</span>
          </div>
          <div className="metric">
            <span className="metric-value">99.8%</span>
            <span className="metric-label">Uptime</span>
          </div>
          <div className="metric">
            <span className="metric-value">1,247</span>
            <span className="metric-label">Files Processed</span>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Storage Usage</h3>
          <div className="storage-bar">
            <div className="storage-fill" style={{ width: '65%' }}></div>
          </div>
          <div className="storage-info">
            <span>2.4 GB / 5 GB used</span>
            <span>65%</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Admin Panel - ConvertFlix</title>
        <meta name="description" content="ConvertFlix admin panel - Manage files, users, and system settings" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="admin-panel">
        <div className="admin-sidebar">
          <div className="sidebar-header">
            <h2>Admin Panel</h2>
          </div>
          
          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <BarChart3 size={20} />
              Dashboard
            </button>
            <button 
              className={`nav-item ${activeTab === 'files' ? 'active' : ''}`}
              onClick={() => setActiveTab('files')}
            >
              <FolderOpen size={20} />
              Files
            </button>
            <button 
              className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <Users size={20} />
              Users
            </button>
            <button 
              className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              <TrendingUp size={20} />
              Analytics
            </button>
            <button 
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={20} />
              Settings
            </button>
          </nav>
        </div>

        <div className="admin-content">
          <div className="content-header">
            <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
            <div className="header-actions">
              <button className="btn btn-secondary">Refresh</button>
              <button className="btn btn-primary">Export</button>
            </div>
          </div>

          <div className="content-body">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'files' && renderFiles()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'settings' && renderSettings()}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel; 