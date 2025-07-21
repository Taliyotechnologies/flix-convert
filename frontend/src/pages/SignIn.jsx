import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../utils/api';
import './SignIn.css';
import { useAuth } from '../context/AuthContext';

const benefits = [
  {
    icon: (
      // Infinity SVG
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 11c-1.5-2-4.5-2-6 0s.5 5 3 5 4.5-3 7-8c2.5 5 5 8 7 8s4.5-3 3-5-4.5-2-6 0" stroke="#6c63ff" strokeWidth="1.5" fill="none"/></svg>
    ),
    text: 'Unlimited file compression',
  },
  {
    icon: (
      // Toolbox SVG
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="8" width="16" height="9" rx="2" fill="#6c63ff" fillOpacity="0.13"/><rect x="7" y="4" width="8" height="4" rx="1.5" fill="#6c63ff" fillOpacity="0.22"/><rect x="9" y="13" width="4" height="2" rx="1" fill="#6c63ff"/></svg>
    ),
    text: 'Access all tools',
  },
  {
    icon: (
      // Lightning SVG
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="10,2 15,10 11,10 14,18 5,10 9,10 6,2" fill="#ffb86c"/></svg>
    ),
    text: 'Faster processing',
  },
  {
    icon: (
      // Headset SVG
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 14v-2a7 7 0 0114 0v2" stroke="#6c63ff" strokeWidth="1.5" fill="none"/><rect x="2" y="14" width="4" height="5" rx="2" fill="#6c63ff" fillOpacity="0.13"/><rect x="16" y="14" width="4" height="5" rx="2" fill="#6c63ff" fillOpacity="0.13"/></svg>
    ),
    text: 'Priority support',
  },
];

export default function SignIn() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
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
      const response = await authAPI.signup(form);
      console.log('Signup API response:', response);
      if (!response.token) {
        setError('No token received from server. Please check your details or contact support.');
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
      // Redirect to home page after successful signup
      setTimeout(() => {
        navigate(from);
      }, 1500);
    } catch (error) {
      setError(error.message || 'Signup failed. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <main className="signin-main">
      <section className="signin-flex">
        <div className="signup-benefits">
          <h2 className="benefits-title">Why Sign Up?</h2>
          <ul className="benefits-list">
            {benefits.map((b, i) => (
              <li className="benefit-item" key={i}>
                <span className="benefit-icon">{b.icon}</span>
                <span>{b.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <section className="signin-card">
          <div className="signin-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="signin-icon" aria-hidden="true" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '0.5rem' }}>
              {/* User SVG */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="5" fill="#6c63ff" fillOpacity="0.13"/>
                <ellipse cx="12" cy="18" rx="7" ry="4" fill="#6c63ff" fillOpacity="0.22"/>
              </svg>
            </span>
            <h1 className="signin-title">Signup</h1>
            <p className="signin-desc">Create your account to get started with FlixConvert.</p>
          </div>
          
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}
          
          {success ? (
            <div className="signin-success">
              <span className="success-icon">✅</span>
              Signup successful! Redirecting...
            </div>
          ) : (
            <form className="signin-form" onSubmit={handleSubmit} autoComplete="off">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  required 
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  required 
                  disabled={loading}
                />
              </div>
              <div className="form-group password-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
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
                </div>
              </div>
              <button 
                type="submit" 
                className="signin-submit"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Signup'}
              </button>
              <div className="signin-or">or</div>
              <button 
                type="button" 
                className="google-signin-btn"
                onClick={handleGoogleSignup}
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
          <div className="signin-footer">
            <span>Already have an account?</span> <Link to="/login" className="signin-link" state={{ from }}>Login</Link>
          </div>
        </section>
      </section>
    </main>
  );
} 