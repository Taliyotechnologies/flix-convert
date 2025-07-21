import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalContacts: 0,
    totalConversions: 0,
    totalCompressions: 0,
    totalDownloads: 0,
    todayConversions: 0,
    todayCompressions: 0,
    todayDownloads: 0,
    onlineUsers: 0
  });
  const [fileTypeStats, setFileTypeStats] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const admin = JSON.parse(localStorage.getItem('adminData') || '{}');
    
    if (!token) {
      navigate('/admin/login');
      return;
    }

    setAdminData(admin);
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setFileTypeStats(data.fileTypeStats);
        setRecentActivity(data.recentActivity);
      } else {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-left">
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {adminData?.name}</p>
        </div>
        <div className="admin-header-right">
          <button className="admin-nav-button" onClick={() => navigate('/admin/users')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Users
          </button>
          <button className="admin-nav-button" onClick={() => navigate('/admin/contacts')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Contacts
          </button>
          <button className="admin-nav-button" onClick={() => navigate('/admin/data')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
            Data
          </button>
          <button className="admin-nav-button" onClick={() => navigate('/admin/settings')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4l3 3"/>
            </svg>
            Settings
          </button>
          <button className="admin-logout-button" onClick={handleLogout}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16,17 21,12 16,7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon users">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
            </svg>
          </div>
          <div className="admin-stat-content">
            <h3>{formatNumber(stats.totalUsers)}</h3>
            <p>Total Users</p>
            <span className="admin-stat-subtitle">{stats.onlineUsers} online</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon conversions">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div className="admin-stat-content">
            <h3>{formatNumber(stats.totalConversions)}</h3>
            <p>Total Conversions</p>
            <span className="admin-stat-subtitle">{stats.todayConversions} today</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon compressions">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
            </svg>
          </div>
          <div className="admin-stat-content">
            <h3>{formatNumber(stats.totalCompressions)}</h3>
            <p>Total Compressions</p>
            <span className="admin-stat-subtitle">{stats.todayCompressions} today</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon downloads">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </div>
          <div className="admin-stat-content">
            <h3>{formatNumber(stats.totalDownloads)}</h3>
            <p>Total Downloads</p>
            <span className="admin-stat-subtitle">{stats.todayDownloads} today</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon contacts">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <div className="admin-stat-content">
            <h3>{formatNumber(stats.totalContacts)}</h3>
            <p>Total Contacts</p>
            <span className="admin-stat-subtitle">Messages received</span>
          </div>
        </div>
      </div>

      {/* File Type Stats */}
      <div className="admin-section">
        <h2>File Type Statistics</h2>
        <div className="admin-file-stats">
          {fileTypeStats.map((stat, index) => (
            <div key={index} className="admin-file-stat">
              <div className="admin-file-stat-header">
                <h3>{stat._id.charAt(0).toUpperCase() + stat._id.slice(1)}</h3>
                <span className="admin-file-stat-count">{stat.count}</span>
              </div>
              <div className="admin-file-stat-details">
                <span>Downloads: {stat.downloads}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="admin-section">
        <h2>Recent Activity</h2>
        <div className="admin-activity-list">
          {recentActivity.map((activity, index) => (
            <div key={index} className="admin-activity-item">
              <div className="admin-activity-icon">
                {activity.type === 'conversion' ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  </svg>
                )}
              </div>
              <div className="admin-activity-content">
                <p>
                  <strong>{activity.userId?.name || 'Unknown User'}</strong> 
                  {activity.type === 'conversion' ? ' converted ' : ' compressed '}
                  <strong>{activity.originalFileName}</strong> to {activity.format}
                </p>
                <span className="admin-activity-time">{formatDate(activity.createdAt)}</span>
              </div>
              <div className="admin-activity-status">
                <span className={`admin-status ${activity.status}`}>
                  {activity.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 