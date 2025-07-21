import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminUsers.css';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchUsers();
  }, [currentPage, search, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const params = new URLSearchParams({
        page: currentPage,
        limit: 20,
        search: search
      });

      const response = await fetch(`http://localhost:5000/api/admin/users?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
        setTotalPages(data.pagination.pages);
        setTotalUsers(data.pagination.total);
      } else {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
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

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="admin-users">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-left">
          <h1>User Management</h1>
          <p>Manage all registered users</p>
        </div>
        <div className="admin-header-right">
          <button className="admin-nav-button" onClick={() => navigate('/admin/dashboard')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="9" rx="2"/>
              <rect x="14" y="3" width="7" height="5" rx="2"/>
              <rect x="14" y="12" width="7" height="9" rx="2"/>
              <rect x="3" y="16" width="7" height="5" rx="2"/>
            </svg>
            Dashboard
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
            </svg>
            Data
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

      {/* Search and Stats */}
      <div className="admin-users-header">
        <div className="admin-search-container">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={search}
            onChange={handleSearch}
            className="admin-search-input"
          />
          <svg className="admin-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        </div>
        <div className="admin-users-stats">
          <span>Total Users: {totalUsers}</span>
          <span>Page {currentPage} of {totalPages}</span>
        </div>
      </div>

      {/* Users Table */}
      <div className="admin-users-table-container">
        <table className="admin-users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Registration Date</th>
              <th>Last Login</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="admin-user-info">
                    <div className="admin-user-avatar">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="8" r="5"/>
                        <ellipse cx="12" cy="18" rx="7" ry="4"/>
                      </svg>
                    </div>
                    <div>
                      <div className="admin-user-name">{user.name || 'Unknown'}</div>
                      <div className="admin-user-id">ID: {user._id.slice(-8)}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="admin-user-email">{user.email}</div>
                </td>
                <td>
                  <div className="admin-user-date">{formatDate(user.createdAt)}</div>
                </td>
                <td>
                  <div className="admin-user-date">
                    {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                  </div>
                </td>
                <td>
                  <span className={`admin-user-status ${user.isActive ? 'active' : 'inactive'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="admin-pagination">
          <button
            className="admin-pagination-button"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <div className="admin-pagination-pages">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  className={`admin-pagination-page ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            })}
          </div>
          
          <button
            className="admin-pagination-button"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
} 