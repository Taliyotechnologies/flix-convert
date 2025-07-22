import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminSettings.css';

export default function AdminSettings() {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [profileMsg, setProfileMsg] = useState('');
  const [profileError, setProfileError] = useState('');
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
  const [passwordMsg, setPasswordMsg] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchProfile();
  }, [navigate]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/admin/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setProfile({ name: data.admin.name, email: data.admin.email });
      } else {
        navigate('/admin/login');
      }
    } catch {
      setProfileError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMsg('');
    setProfileError('');
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
      });
      if (response.ok) {
        setProfileMsg('Profile updated successfully!');
      } else {
        const data = await response.json();
        setProfileError(data.error || 'Failed to update profile');
      }
    } catch {
      setProfileError('Failed to update profile');
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMsg('');
    setPasswordError('');
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/admin/change-password', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(passwordData)
      });
      if (response.ok) {
        setPasswordMsg('Password changed successfully!');
        setPasswordData({ currentPassword: '', newPassword: '' });
      } else {
        const data = await response.json();
        setPasswordError(data.error || 'Failed to change password');
      }
    } catch {
      setPasswordError('Failed to change password');
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner"></div>
        <p>Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="admin-settings">
      <header className="admin-header">
        <div className="admin-header-left">
          <h1>Settings</h1>
          <p>Update your profile and password</p>
        </div>
        <div className="admin-header-right">
          <button className="admin-nav-button" onClick={() => navigate('/admin/dashboard')}>Dashboard</button>
          <button className="admin-nav-button" onClick={() => navigate('/admin/users')}>Users</button>
          <button className="admin-nav-button" onClick={() => navigate('/admin/contacts')}>Contacts</button>
          <button className="admin-nav-button" onClick={() => navigate('/admin/data')}>Data</button>
        </div>
      </header>

      <div className="admin-settings-content">
        <form className="admin-settings-form" onSubmit={handleProfileSubmit}>
          <h2>Profile</h2>
          {profileMsg && <div className="admin-success-message">{profileMsg}</div>}
          {profileError && <div className="admin-error-message">{profileError}</div>}
          <div className="admin-form-group">
            <label>Name</label>
            <input type="text" name="name" value={profile.name} onChange={handleProfileChange} required />
          </div>
          <div className="admin-form-group">
            <label>Email</label>
            <input type="email" name="email" value={profile.email} onChange={handleProfileChange} required />
          </div>
          <button className="admin-settings-button" type="submit">Update Profile</button>
        </form>

        <form className="admin-settings-form" onSubmit={handlePasswordSubmit}>
          <h2>Change Password</h2>
          {passwordMsg && <div className="admin-success-message">{passwordMsg}</div>}
          {passwordError && <div className="admin-error-message">{passwordError}</div>}
          <div className="admin-form-group">
            <label>Current Password</label>
            <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} required />
          </div>
          <div className="admin-form-group">
            <label>New Password</label>
            <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} required />
          </div>
          <button className="admin-settings-button" type="submit">Change Password</button>
        </form>
      </div>
    </div>
  );
} 