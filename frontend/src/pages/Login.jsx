import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../utils/api';
import './Login.css';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ emailOrUsername: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const { login: setAuthUser } = useAuth();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(form);
      console.log('Login API response:', response);
      if (!response.token) {
        setError('No token received from server. Please check your credentials or contact support.');
        setLoading(false);
        return;
      }
      // Fetch user and set in context
      try {
        const userRes = await authAPI.getCurrentUser();
        setAuthUser(userRes.user);
      } catch (e) {
        // fallback: do nothing
      }
      setSuccess(true);
      setTimeout(() => {
        navigate(from);
      }, 1500);
    } catch (error) {
      setError('Invalid email or password');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <main className="login-main">
      <section className="login-card">
        <div className="login-header">
          <span className="login-icon" aria-hidden="true">
            {/* Lock SVG */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="10" width="16" height="10" rx="3" fill="#6c63ff" fillOpacity="0.13"/>
              <rect x="8" y="6" width="8" height="6" rx="3" fill="#6c63ff" fillOpacity="0.22"/>
              <rect x="11" y="15" width="2" height="3" rx="1" fill="#6c63ff"/>
            </svg>
          </span>
          <h1 className="login-title">Login</h1>
          <p className="login-desc">Login to your account to continue using FlixConvert.</p>
        </div>
        
        {error && (
          <div className="login-error-simple">
            <span className="error-icon">⚠️</span>
            <span className="error-text">{error}</span>
          </div>
        )}
        
        {success ? (
          <div className="login-success">
            <span className="success-icon">✅</span>
            Login successful! Redirecting...
          </div>
        ) : (
          <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
            <div className="form-group">
              <label htmlFor="emailOrUsername">Email or Username</label>
              <input
                type="text"
                id="emailOrUsername"
                name="emailOrUsername"
                value={form.emailOrUsername}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="Enter your email or username"
              />
            </div>
            <div className="form-group" style={{ position: 'relative' }}>
              <label htmlFor="password">Password</label>
              <input 
                type={showPassword ? 'text' : 'password'}
                id="password" 
                name="password" 
                value={form.password} 
                onChange={handleChange} 
                required 
                disabled={loading}
                style={{ paddingRight: '2.2rem' }}
              />
              <button
                type="button"
                className="eye-toggle-btn"
                tabIndex={-1}
                style={{
                  position: 'absolute',
                  right: '0.7rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  margin: 0,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#6c63ff',
                  opacity: 0.8,
                }}
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  // Improved Modern Eye-off SVG
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="12" rx="8" ry="5.5"/>
                    <circle cx="12" cy="12" r="2.5"/>
                    <line x1="3" y1="3" x2="21" y2="21"/>
                  </svg>
                ) : (
                  // Modern Eye SVG
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="12" rx="8" ry="5.5"/>
                    <circle cx="12" cy="12" r="2.5"/>
                  </svg>
                )}
              </button>
              <div className="forgot-row">
                <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
              </div>
            </div>
            <button 
              type="submit" 
              className="login-submit"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <div className="login-or">or</div>
            <button 
              type="button" 
              className="google-login-btn"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <span className="google-icon" aria-hidden="true">
                {/* Google SVG */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.48a4.68 4.68 0 01-2.03 3.07v2.55h3.28c1.92-1.77 3.03-4.38 3.03-7.41z" fill="#4285F4"/>
                    <path d="M10 20c2.7 0 4.97-.89 6.63-2.41l-3.28-2.55c-.91.61-2.07.97-3.35.97-2.57 0-4.75-1.74-5.53-4.07H1.09v2.56A9.99 9.99 0 0010 20z" fill="#34A853"/>
                    <path d="M4.47 11.94A5.99 5.99 0 014.09 10c0-.67.12-1.32.33-1.94V5.5H1.09A10.01 10.01 0 000 10c0 1.64.39 3.19 1.09 4.5l3.38-2.56z" fill="#FBBC05"/>
                    <path d="M10 4.01c1.47 0 2.78.51 3.81 1.51l2.85-2.85C14.97 1.13 12.7.01 10 .01A9.99 9.99 0 001.09 5.5l3.38 2.56C5.25 5.75 7.43 4.01 10 4.01z" fill="#EA4335"/>
                  </g>
                </svg>
              </span>
              <span className="google-btn-text">Continue with Google</span>
            </button>
          </form>
        )}
        <div className="login-footer">
          <span>Don't have an account?</span> <Link to="/signin" className="login-link" state={{ from }}>Signup</Link>
        </div>
      </section>
    </main>
  );
} 