import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';
import { Navigate } from 'react-router-dom';
import ChangePassword from './ChangePassword';
import axios from 'axios';

export default function Dashboard({ setTheme, themeMode }) {
  const { user, loading } = useAuth();
  const [accountOpen, setAccountOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [historyData, setHistoryData] = useState({
    conversion: {
      image: { count: 0, successCount: 0, failedCount: 0 },
      video: { count: 0, successCount: 0, failedCount: 0 },
      pdf: { count: 0, successCount: 0, failedCount: 0 },
      audio: { count: 0, successCount: 0, failedCount: 0 }
    },
    compression: {
      image: { count: 0, successCount: 0, failedCount: 0 },
      video: { count: 0, successCount: 0, failedCount: 0 },
      pdf: { count: 0, successCount: 0, failedCount: 0 },
      audio: { count: 0, successCount: 0, failedCount: 0 }
    }
  });
  const [historyLoading, setHistoryLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch history data
  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      try {
        setHistoryLoading(true);
        const token = localStorage.getItem('authToken');
        const url = 'http://localhost:5000/api/history/summary';
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = response.data;
        setHistoryData(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setHistoryLoading(false);
      }
    };
    fetchHistory();
  }, [user]);

  // Redirect to login if not logged in
  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { replace: true });
    }
  }, [user, loading, navigate]);

  // Sidebar close on overlay click or ESC
  React.useEffect(() => {
    if (!sidebarOpen) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [sidebarOpen]);

  // Redirect to home if on mobile/tablet
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 900);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  if (isMobile) return <Navigate to="/" replace />;

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (!user) return null;

  return (
    <div className="dashboard-root">
      {/* Hamburger for mobile */}
      <button
        className="dashboard-hamburger"
        aria-label="Open sidebar menu"
        aria-controls="dashboard-sidebar"
        aria-expanded={sidebarOpen}
        onClick={() => setSidebarOpen(true)}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6c63ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && <div className="dashboard-sidebar-overlay" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar" tabIndex={0}></div>}
      <aside
        id="dashboard-sidebar"
        className={"dashboard-sidebar" + (sidebarOpen ? " open" : "")}
        aria-hidden={!sidebarOpen && window.innerWidth <= 900}
      >
        {/* Close button for mobile sidebar */}
        <button className="dashboard-sidebar-close" aria-label="Close sidebar" onClick={() => setSidebarOpen(false)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6c63ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div className="sidebar-logo">ImageResizer</div>
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6c63ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><ellipse cx="12" cy="18" rx="7" ry="4"/></svg>
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-status">Registered</div>
            <div
              className="sidebar-user-email"
              title={user?.email || 'user@email.com'}
            >
              {user?.email || 'user@email.com'}
            </div>
          </div>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={({isActive}) => 'sidebar-link' + (isActive && location.pathname === '/dashboard' ? ' active' : '')} end>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="2"/><rect x="14" y="3" width="7" height="5" rx="2"/><rect x="14" y="12" width="7" height="9" rx="2"/><rect x="3" y="16" width="7" height="5" rx="2"/></svg>
            <span>Dashboard</span>
          </NavLink>
          <button className={"sidebar-link" + (accountOpen ? ' active' : '')} onClick={() => setAccountOpen(v => !v)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6"/></svg>
            <span>Account</span>
            <svg width="16" height="16" className="sidebar-arrow" style={{marginLeft: 'auto', transform: accountOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s'}} viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          {accountOpen && (
            <div className="sidebar-sublinks">
              <NavLink to="/dashboard/account/profile" className={({isActive}) => 'sidebar-sublink' + (isActive ? ' active' : '')}>Profile</NavLink>
              <NavLink to="/dashboard/account/password" className={({isActive}) => 'sidebar-sublink' + (isActive ? ' active' : '')}>Change Password</NavLink>
            </div>
          )}
        </nav>
        <div className="sidebar-settings-label">Settings</div>
        <nav className="sidebar-settings">
          <button className={"sidebar-link" + (themeOpen ? ' active' : '')} onClick={() => setThemeOpen(v => !v)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            <span>Theme</span>
            <svg width="16" height="16" className="sidebar-arrow" style={{marginLeft: 'auto', transform: themeOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s'}} viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          {themeOpen && (
            <div className="sidebar-sublinks theme-sublinks">
              <button className={"sidebar-sublink" + (themeMode === 'light' ? ' active' : '')} onClick={() => setTheme('light')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f7b500" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                Light
              </button>
              <button className={"sidebar-sublink" + (themeMode === 'dark' ? ' active' : '')} onClick={() => setTheme('dark')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6c63ff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
                Dark
              </button>
              <button className={"sidebar-sublink" + (themeMode === 'system' ? ' active' : '')} onClick={() => setTheme('system')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#23243a" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                System
              </button>
            </div>
          )}
          <button className="sidebar-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg>
            <span>Language</span>
          </button>
        </nav>
      </aside>
      <main className="dashboard-main">
        <Routes>
          <Route path="/" element={
            <>
              <div className="dashboard-card history-card">
                <div className="subs-title">
                  History (File Converter)
                  {historyLoading && <span className="loading-indicator">Loading...</span>}
                </div>
                <table className="subs-table">
                  <thead>
                    <tr>
                      <th>File Type</th>
                      <th>Total</th>
                      <th>Success</th>
                      <th>Downloads</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Image</td>
                      <td>{historyData.conversion.image.count}</td>
                      <td>{historyData.conversion.image.successCount}</td>
                      <td>{historyData.conversion.image.downloadCount || 0}</td>
                    </tr>
                    <tr>
                      <td>Video</td>
                      <td>{historyData.conversion.video.count}</td>
                      <td>{historyData.conversion.video.successCount}</td>
                      <td>{historyData.conversion.video.downloadCount || 0}</td>
                    </tr>
                    <tr>
                      <td>PDF</td>
                      <td>{historyData.conversion.pdf.count}</td>
                      <td>{historyData.conversion.pdf.successCount}</td>
                      <td>{historyData.conversion.pdf.downloadCount || 0}</td>
                    </tr>
                    <tr>
                      <td>Audio</td>
                      <td>{historyData.conversion.audio.count}</td>
                      <td>{historyData.conversion.audio.successCount}</td>
                      <td>{historyData.conversion.audio.downloadCount || 0}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="dashboard-card subs-card">
                <div className="subs-title">
                  History (File Compressor)
                  {historyLoading && <span className="loading-indicator">Loading...</span>}
                </div>
                <table className="subs-table">
                  <thead>
                    <tr>
                      <th>File Type</th>
                      <th>Total</th>
                      <th>Success</th>
                      <th>Downloads</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Image</td>
                      <td>{historyData.compression.image.count}</td>
                      <td>{historyData.compression.image.successCount}</td>
                      <td>{historyData.compression.image.downloadCount || 0}</td>
                    </tr>
                    <tr>
                      <td>Video</td>
                      <td>{historyData.compression.video.count}</td>
                      <td>{historyData.compression.video.successCount}</td>
                      <td>{historyData.compression.video.downloadCount || 0}</td>
                    </tr>
                    <tr>
                      <td>PDF</td>
                      <td>{historyData.compression.pdf.count}</td>
                      <td>{historyData.compression.pdf.successCount}</td>
                      <td>{historyData.compression.pdf.downloadCount || 0}</td>
                    </tr>
                    <tr>
                      <td>Audio</td>
                      <td>{historyData.compression.audio.count}</td>
                      <td>{historyData.compression.audio.successCount}</td>
                      <td>{historyData.compression.audio.downloadCount || 0}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          } />
          <Route path="/account/password" element={<ChangePassword />} />
        </Routes>
      </main>
    </div>
  );
} 