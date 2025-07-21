import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminContacts.css';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalContacts, setTotalContacts] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchContacts();
  }, [currentPage, statusFilter, navigate]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const params = new URLSearchParams({
        page: currentPage,
        limit: 20,
        status: statusFilter
      });

      const response = await fetch(`http://localhost:5000/api/admin/contacts?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts);
        setTotalPages(data.pagination.pages);
        setTotalContacts(data.pagination.total);
      } else {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (contactId, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/admin/contacts/${contactId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Update the contact in the list
        setContacts(contacts.map(contact => 
          contact._id === contactId 
            ? { ...contact, status: newStatus }
            : contact
        ));
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
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
        <p>Loading contacts...</p>
      </div>
    );
  }

  return (
    <div className="admin-contacts">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-left">
          <h1>Contact Management</h1>
          <p>Manage all contact form submissions</p>
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
          <button className="admin-nav-button" onClick={() => navigate('/admin/users')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
            </svg>
            Users
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

      {/* Filters and Stats */}
      <div className="admin-contacts-header">
        <div className="admin-contacts-filters">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="admin-status-filter"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div className="admin-contacts-stats">
          <span>Total Contacts: {totalContacts}</span>
          <span>Page {currentPage} of {totalPages}</span>
        </div>
      </div>

      {/* Contacts List */}
      <div className="admin-contacts-list">
        {contacts.map((contact) => (
          <div key={contact._id} className="admin-contact-card">
            <div className="admin-contact-header">
              <div className="admin-contact-info">
                <div className="admin-contact-name">{contact.name}</div>
                <div className="admin-contact-email">{contact.email}</div>
                <div className="admin-contact-date">{formatDate(contact.createdAt)}</div>
              </div>
              <div className="admin-contact-status">
                <select
                  value={contact.status}
                  onChange={(e) => handleStatusUpdate(contact._id, e.target.value)}
                  className={`admin-status-select ${contact.status}`}
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
            <div className="admin-contact-subject">
              <strong>Subject:</strong> {contact.subject}
            </div>
            <div className="admin-contact-message">
              <strong>Message:</strong>
              <p>{contact.message}</p>
            </div>
            {contact.phone && (
              <div className="admin-contact-phone">
                <strong>Phone:</strong> {contact.phone}
              </div>
            )}
          </div>
        ))}
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