import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In real app, handle login success/error
      alert('Login functionality would be implemented here');
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Login - ConvertFlix</title>
        <meta name="description" content="Login to your ConvertFlix account to access premium features and file history." />
      </Helmet>

      <div className="auth-page">
        <div className="container">
          <div className="auth-container">
            <div className="auth-card">
              <div className="auth-header">
                <div className="auth-icon">
                  <span className="icon">🔐</span>
                </div>
                <h1 className="auth-title">Welcome Back</h1>
                <p className="auth-subtitle">Sign in to your ConvertFlix account</p>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <span className="label-icon">📧</span>
                    Email Address
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="Enter your email address"
                      autoComplete="email"
                    />
                    <span className="input-icon">📧</span>
                  </div>
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    <span className="label-icon">🔒</span>
                    Password
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`form-input ${errors.password ? 'error' : ''}`}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                    <span className="input-icon">🔒</span>
                  </div>
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="checkbox-input"
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-text">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="forgot-link">
                    <span className="forgot-icon">❓</span>
                    Forgot password?
                  </Link>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-auth"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="spinner"></div>
                      <span className="loading-text">Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">🚀</span>
                      Sign In
                    </>
                  )}
                </button>
              </form>

              <div className="auth-divider">
                <span className="divider-line"></span>
                <span className="divider-text">or continue with</span>
                <span className="divider-line"></span>
              </div>

              <div className="social-auth">
                <button className="btn btn-social google">
                  <span className="social-icon">🔍</span>
                  <span className="social-text">Continue with Google</span>
                </button>
                <button className="btn btn-social github">
                  <span className="social-icon">🐙</span>
                  <span className="social-text">Continue with GitHub</span>
                </button>
              </div>

              <div className="auth-footer">
                <p className="auth-footer-text">
                  Don't have an account?{' '}
                  <Link to="/signup" className="auth-link">
                    <span className="link-icon">✨</span>
                    Sign up now
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login; 