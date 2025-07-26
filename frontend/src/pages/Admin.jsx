import React, { useState } from 'react';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  // Mock data - in real app this would come from API
  const analyticsData = {
    totalVisits: 15420,
    todayVisits: 342,
    threeDayVisits: 1247,
    weekVisits: 2891,
    monthVisits: 12450,
    yearVisits: 15420,
    totalUsers: 2847,
    activeUsers: 1247,
    totalConversions: 45678,
    todayConversions: 1234,
    revenue: 12450.50
  };

  const serviceUsage = [
    { name: 'Image Conversion', usage: 45, total: 100, color: '#3B82F6' },
    { name: 'Video Conversion', usage: 32, total: 100, color: '#10B981' },
    { name: 'Audio Conversion', usage: 28, total: 100, color: '#F59E0B' },
    { name: 'PDF Conversion', usage: 15, total: 100, color: '#EF4444' },
    { name: 'File Compression', usage: 38, total: 100, color: '#8B5CF6' }
  ];

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', lastLogin: '2 hours ago', conversions: 45 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', lastLogin: '4 hours ago', conversions: 23 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'inactive', lastLogin: '2 days ago', conversions: 12 },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', status: 'active', lastLogin: '1 hour ago', conversions: 67 },
    { id: 5, name: 'David Brown', email: 'david@example.com', status: 'active', lastLogin: '6 hours ago', conversions: 34 }
  ];

  const recentConversions = [
    { id: 1, user: 'John Doe', service: 'Image Conversion', from: 'JPG', to: 'PNG', size: '2.4 MB', time: '2 min ago' },
    { id: 2, user: 'Jane Smith', service: 'Video Conversion', from: 'MP4', to: 'AVI', size: '15.7 MB', time: '5 min ago' },
    { id: 3, user: 'Mike Johnson', service: 'Audio Conversion', from: 'MP3', to: 'WAV', size: '8.2 MB', time: '12 min ago' },
    { id: 4, user: 'Sarah Wilson', service: 'PDF Conversion', from: 'PDF', to: 'DOCX', size: '3.1 MB', time: '18 min ago' },
    { id: 5, user: 'David Brown', service: 'File Compression', from: 'JPG', to: 'JPG', size: '1.8 MB', time: '25 min ago' }
  ];

  const getVisitData = () => {
    switch(selectedPeriod) {
      case 'today': return analyticsData.todayVisits;
      case '3days': return analyticsData.threeDayVisits;
      case 'week': return analyticsData.weekVisits;
      case 'month': return analyticsData.monthVisits;
      case 'year': return analyticsData.yearVisits;
      default: return analyticsData.todayVisits;
    }
  };

  const getPeriodLabel = () => {
    switch(selectedPeriod) {
      case 'today': return 'Today';
      case '3days': return 'Last 3 Days';
      case 'week': return 'Last Week';
      case 'month': return 'Last Month';
      case 'year': return 'Last Year';
      default: return 'Today';
    }
  };

  return (
    <div className="admin-container">
      {/* Admin Header */}
      <div className="admin-header">
        <div className="container">
          <div className="header-content">
            <div className="header-left">
              <h1>Admin Dashboard</h1>
              <p>Manage ConvertFlix platform and monitor performance</p>
            </div>
            <div className="header-right">
              <div className="admin-profile">
                <div className="profile-avatar">👨‍💼</div>
                <div className="profile-info">
                  <span className="profile-name">Admin User</span>
                  <span className="profile-role">Super Admin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-nav">
        <div className="container">
          <div className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Dashboard
            </button>
            <button 
              className={`nav-tab ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              📈 Analytics
            </button>
            <button 
              className={`nav-tab ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              👥 Users
            </button>
            <button 
              className={`nav-tab ${activeTab === 'conversions' ? 'active' : ''}`}
              onClick={() => setActiveTab('conversions')}
            >
              🔄 Conversions
            </button>
            <button 
              className={`nav-tab ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              ⚙️ Services
            </button>
            <button 
              className={`nav-tab ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              ⚙️ Settings
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        <div className="container">
          {activeTab === 'dashboard' && (
            <div className="dashboard-content">
              {/* Quick Stats */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-info">
                    <h3>Total Users</h3>
                    <p className="stat-number">{analyticsData.totalUsers.toLocaleString()}</p>
                    <span className="stat-change positive">+12% from last month</span>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">🔄</div>
                  <div className="stat-info">
                    <h3>Total Conversions</h3>
                    <p className="stat-number">{analyticsData.totalConversions.toLocaleString()}</p>
                    <span className="stat-change positive">+8% from last month</span>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">💰</div>
                  <div className="stat-info">
                    <h3>Revenue</h3>
                    <p className="stat-number">${analyticsData.revenue.toLocaleString()}</p>
                    <span className="stat-change positive">+15% from last month</span>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">📊</div>
                  <div className="stat-info">
                    <h3>Active Users</h3>
                    <p className="stat-number">{analyticsData.activeUsers.toLocaleString()}</p>
                    <span className="stat-change positive">+5% from last month</span>
                  </div>
                </div>
              </div>

              {/* Visit Analytics */}
              <div className="analytics-section">
                <div className="section-header">
                  <h2>Visit Analytics</h2>
                  <div className="period-selector">
                    <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
                      <option value="today">Today</option>
                      <option value="3days">Last 3 Days</option>
                      <option value="week">Last Week</option>
                      <option value="month">Last Month</option>
                      <option value="year">Last Year</option>
                    </select>
                  </div>
                </div>
                
                <div className="visit-stats">
                  <div className="visit-card">
                    <h3>{getPeriodLabel()} Visits</h3>
                    <p className="visit-number">{getVisitData().toLocaleString()}</p>
                  </div>
                  
                  <div className="visit-card">
                    <h3>Total Visits</h3>
                    <p className="visit-number">{analyticsData.totalVisits.toLocaleString()}</p>
                  </div>
                  
                  <div className="visit-card">
                    <h3>Today's Conversions</h3>
                    <p className="visit-number">{analyticsData.todayConversions.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Service Usage */}
              <div className="services-section">
                <h2>Service Usage</h2>
                <div className="services-grid">
                  {serviceUsage.map((service, index) => (
                    <div key={index} className="service-card">
                      <div className="service-header">
                        <h3>{service.name}</h3>
                        <span className="usage-percentage">{service.usage}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ 
                            width: `${service.usage}%`, 
                            backgroundColor: service.color 
                          }}
                        ></div>
                      </div>
                      <p className="service-stats">{service.usage} of {service.total} conversions</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="recent-activity">
                <div className="activity-section">
                  <h2>Recent Users</h2>
                  <div className="activity-list">
                    {recentUsers.slice(0, 5).map(user => (
                      <div key={user.id} className="activity-item">
                        <div className="activity-avatar">👤</div>
                        <div className="activity-info">
                          <h4>{user.name}</h4>
                          <p>{user.email}</p>
                          <span className={`status ${user.status}`}>{user.status}</span>
                        </div>
                        <div className="activity-meta">
                          <span className="last-login">{user.lastLogin}</span>
                          <span className="conversions">{user.conversions} conversions</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="activity-section">
                  <h2>Recent Conversions</h2>
                  <div className="activity-list">
                    {recentConversions.slice(0, 5).map(conversion => (
                      <div key={conversion.id} className="activity-item">
                        <div className="activity-icon">🔄</div>
                        <div className="activity-info">
                          <h4>{conversion.user}</h4>
                          <p>{conversion.service}</p>
                          <span className="conversion-details">{conversion.from} → {conversion.to}</span>
                        </div>
                        <div className="activity-meta">
                          <span className="file-size">{conversion.size}</span>
                          <span className="time">{conversion.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="analytics-content">
              <h2>Detailed Analytics</h2>
              <div className="analytics-grid">
                <div className="chart-card">
                  <h3>Traffic Overview</h3>
                  <div className="chart-placeholder">
                    <p>📈 Traffic Chart will be displayed here</p>
                  </div>
                </div>
                
                <div className="chart-card">
                  <h3>Conversion Trends</h3>
                  <div className="chart-placeholder">
                    <p>📊 Conversion Chart will be displayed here</p>
                  </div>
                </div>
                
                <div className="chart-card">
                  <h3>User Demographics</h3>
                  <div className="chart-placeholder">
                    <p>👥 Demographics Chart will be displayed here</p>
                  </div>
                </div>
                
                <div className="chart-card">
                  <h3>Revenue Analysis</h3>
                  <div className="chart-placeholder">
                    <p>💰 Revenue Chart will be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="users-content">
              <div className="content-header">
                <h2>User Management</h2>
                <button className="add-user-btn">+ Add User</button>
              </div>
              
              <div className="users-table">
                <div className="table-header">
                  <div className="table-cell">User</div>
                  <div className="table-cell">Email</div>
                  <div className="table-cell">Status</div>
                  <div className="table-cell">Last Login</div>
                  <div className="table-cell">Conversions</div>
                  <div className="table-cell">Actions</div>
                </div>
                
                {recentUsers.map(user => (
                  <div key={user.id} className="table-row">
                    <div className="table-cell">
                      <div className="user-info">
                        <div className="user-avatar">👤</div>
                        <span>{user.name}</span>
                      </div>
                    </div>
                    <div className="table-cell">{user.email}</div>
                    <div className="table-cell">
                      <span className={`status-badge ${user.status}`}>{user.status}</span>
                    </div>
                    <div className="table-cell">{user.lastLogin}</div>
                    <div className="table-cell">{user.conversions}</div>
                    <div className="table-cell">
                      <div className="action-buttons">
                        <button className="action-btn edit">Edit</button>
                        <button className="action-btn delete">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'conversions' && (
            <div className="conversions-content">
              <div className="content-header">
                <h2>Conversion History</h2>
                <div className="filters">
                  <select className="filter-select">
                    <option>All Services</option>
                    <option>Image Conversion</option>
                    <option>Video Conversion</option>
                    <option>Audio Conversion</option>
                    <option>PDF Conversion</option>
                  </select>
                  <select className="filter-select">
                    <option>All Time</option>
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                  </select>
                </div>
              </div>
              
              <div className="conversions-table">
                <div className="table-header">
                  <div className="table-cell">User</div>
                  <div className="table-cell">Service</div>
                  <div className="table-cell">From</div>
                  <div className="table-cell">To</div>
                  <div className="table-cell">Size</div>
                  <div className="table-cell">Time</div>
                  <div className="table-cell">Status</div>
                </div>
                
                {recentConversions.map(conversion => (
                  <div key={conversion.id} className="table-row">
                    <div className="table-cell">{conversion.user}</div>
                    <div className="table-cell">{conversion.service}</div>
                    <div className="table-cell">{conversion.from}</div>
                    <div className="table-cell">{conversion.to}</div>
                    <div className="table-cell">{conversion.size}</div>
                    <div className="table-cell">{conversion.time}</div>
                    <div className="table-cell">
                      <span className="status-badge completed">Completed</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="services-content">
              <h2>Service Management</h2>
              <div className="services-overview">
                {serviceUsage.map((service, index) => (
                  <div key={index} className="service-overview-card">
                    <div className="service-header">
                      <h3>{service.name}</h3>
                      <div className="service-status active">Active</div>
                    </div>
                    <div className="service-stats">
                      <div className="stat">
                        <span className="stat-label">Usage</span>
                        <span className="stat-value">{service.usage}%</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Total</span>
                        <span className="stat-value">{service.total}</span>
                      </div>
                    </div>
                    <div className="service-actions">
                      <button className="service-btn edit">Edit</button>
                      <button className="service-btn toggle">Toggle</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-content">
              <h2>Admin Settings</h2>
              <div className="settings-grid">
                <div className="setting-card">
                  <h3>General Settings</h3>
                  <div className="setting-item">
                    <label>Site Name</label>
                    <input type="text" defaultValue="ConvertFlix" />
                  </div>
                  <div className="setting-item">
                    <label>Admin Email</label>
                    <input type="email" defaultValue="admin@convertflix.com" />
                  </div>
                  <div className="setting-item">
                    <label>Timezone</label>
                    <select defaultValue="UTC">
                      <option>UTC</option>
                      <option>EST</option>
                      <option>PST</option>
                    </select>
                  </div>
                </div>
                
                <div className="setting-card">
                  <h3>Security Settings</h3>
                  <div className="setting-item">
                    <label>Two-Factor Authentication</label>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="setting-item">
                    <label>Session Timeout (minutes)</label>
                    <input type="number" defaultValue="30" />
                  </div>
                  <div className="setting-item">
                    <label>Max Login Attempts</label>
                    <input type="number" defaultValue="5" />
                  </div>
                </div>
                
                <div className="setting-card">
                  <h3>Notification Settings</h3>
                  <div className="setting-item">
                    <label>Email Notifications</label>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="setting-item">
                    <label>System Alerts</label>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="setting-item">
                    <label>Weekly Reports</label>
                    <input type="checkbox" />
                  </div>
                </div>
              </div>
              
              <div className="settings-actions">
                <button className="save-btn">Save Settings</button>
                <button className="reset-btn">Reset to Default</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin; 