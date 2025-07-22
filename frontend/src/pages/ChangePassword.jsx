import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './ChangePassword.css';

export default function ChangePassword() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    name: user?.name || ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Check if user is OAuth (no password) or regular user
  const isOAuthUser = !user?.password;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.newPassword) {
      setMessage({ type: 'error', text: 'New password is required' });
      return false;
    }
    if (formData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'New password must be at least 6 characters long' });
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return false;
    }
    if (!formData.name.trim()) {
      setMessage({ type: 'error', text: 'Name is required' });
      return false;
    }
    
    // Only require current password for non-OAuth users
    if (!isOAuthUser && !formData.currentPassword) {
      setMessage({ type: 'error', text: 'Current password is required' });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const requestBody = {
        newPassword: formData.newPassword,
        name: formData.name
      };

      // Only include current password if user has one (non-OAuth users)
      if (!isOAuthUser && formData.currentPassword) {
        requestBody.currentPassword = formData.currentPassword;
      }

      const response = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: isOAuthUser ? 'Password set and name updated successfully!' : 'Password and name updated successfully!' });
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
        
        // Update user context with new name
        if (updateUser) {
          updateUser({ ...user, name: formData.name });
        }
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update password' });
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="change-password-container">
      <div className="change-password-card">
        <div className="change-password-header">
          <h1>Change Password & Profile</h1>
          <p>
            {isOAuthUser 
              ? 'Set a password for your account and update your name information'
              : 'Update your password and name information'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="change-password-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          {!isOAuthUser && (
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                placeholder="Enter your current password"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="newPassword">
              {isOAuthUser ? 'Set Password' : 'New Password'}
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder={isOAuthUser ? 'Enter your new password' : 'Enter your new password'}
              required
            />
            <small>Password must be at least 6 characters long</small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your new password"
              required
            />
          </div>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading 
              ? 'Updating...' 
              : isOAuthUser 
                ? 'Set Password & Update Name' 
                : 'Update Password & Name'
            }
          </button>
        </form>
      </div>
    </div>
  );
} 