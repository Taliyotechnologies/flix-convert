import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../utils/api';
import './SignIn.css';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Get token from URL
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await authAPI.resetPassword(token, password);
      setMessage(res.message || 'Password has been reset successfully.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="signin-main">
      <section className="signin-card" style={{ maxWidth: 400 }}>
        <div className="signin-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="signin-icon" aria-hidden="true" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '0.5rem' }}>
            {/* Lock SVG */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="10" width="16" height="10" rx="3" fill="#6c63ff" fillOpacity="0.13"/>
              <rect x="8" y="6" width="8" height="6" rx="3" fill="#6c63ff" fillOpacity="0.22"/>
              <rect x="11" y="15" width="2" height="3" rx="1" fill="#6c63ff"/>
            </svg>
          </span>
          <h1 className="signin-title">Reset Password</h1>
          <p className="signin-desc">Enter your new password below.</p>
        </div>
        {error && <div className="error-message"><span className="error-icon">⚠️</span>{error}</div>}
        {message && <div className="signin-success"><span className="success-icon">✅</span>{message}</div>}
        <form className="signin-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group password-group">
            <label htmlFor="reset-password">New Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="reset-password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
                className="password-input"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="eye-toggle-btn"
                tabIndex={-1}
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  // Eye-off SVG
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="12" rx="8" ry="5.5"/>
                    <circle cx="12" cy="12" r="2.5"/>
                    <line x1="3" y1="3" x2="21" y2="21"/>
                  </svg>
                ) : (
                  // Eye SVG
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="12" rx="8" ry="5.5"/>
                    <circle cx="12" cy="12" r="2.5"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button type="submit" className="signin-submit" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        <div className="signin-footer">
          <button className="signin-link" style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-primary)', cursor: 'pointer' }} onClick={() => navigate('/login')}>
            Back to Login
          </button>
        </div>
      </section>
    </main>
  );
} 