import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import './SignIn.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await authAPI.forgotPassword(email);
      setMessage(res.message || 'If an account exists, a reset link has been sent to your email.');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="forgot-password-main">
      <section className="forgot-password-card">
        <div className="forgot-password-header">
          <div className="forgot-password-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="10" width="16" height="10" rx="3" fill="#6c63ff" fillOpacity="0.13"/>
              <rect x="8" y="6" width="8" height="6" rx="3" fill="#6c63ff" fillOpacity="0.22"/>
              <rect x="11" y="15" width="2" height="3" rx="1" fill="#6c63ff"/>
            </svg>
          </div>
          <h1 className="forgot-password-title">Forgot Password</h1>
          <p className="forgot-password-desc">Enter your email to receive a password reset link.</p>
        </div>
        
        {error && <div className="error-message"><span className="error-icon">⚠️</span>{error}</div>}
        
        {message && (
          <div className="forgot-success-card">
            <div className="success-icon-container">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#10b981" fillOpacity="0.1"/>
                <path d="M9 12l2 2 4-4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="success-title">Check Your Email</h3>
            <p className="success-message">{message}</p>
            <div className="email-display">
              <span className="email-label">Sent to:</span>
              <span className="email-value">{email}</span>
            </div>
            <div className="next-steps">
              <h4>What's Next?</h4>
              <ul className="steps-list">
                <li>Check your email inbox (and spam folder)</li>
                <li>Click the reset link in the email</li>
                <li>Create a new password</li>
                <li>Login with your new password</li>
              </ul>
            </div>
            <div className="success-actions">
              <button 
                className="btn-outline" 
                onClick={() => setMessage('')}
                style={{ marginRight: '0.5rem' }}
              >
                Send Another
              </button>
              <button 
                className="btn-filled" 
                onClick={() => navigate('/login')}
              >
                Back to Login
              </button>
            </div>
          </div>
        )}
        
        <form className="forgot-password-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label htmlFor="forgot-email">Email</label>
            <input
              type="email"
              id="forgot-email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
              placeholder="Enter your email address"
            />
          </div>
          <button type="submit" className="forgot-password-submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        
        <div className="forgot-password-footer">
          <button className="forgot-password-link" onClick={() => navigate('/login')}>
            Back to Login
          </button>
        </div>
      </section>
    </main>
  );
} 