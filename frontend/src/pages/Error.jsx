import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Shield, Settings, AlertTriangle } from 'lucide-react';
import './Error.css';

const Error = () => {
  const error = useRouteError();
  
  // Determine error type and message
  const getErrorInfo = () => {
    if (error?.status === 404) {
      return {
        code: '404',
        title: 'Page Not Found',
        message: 'The page you are looking for doesn\'t exist.',
        icon: <Search size={48} />
      };
    } else if (error?.status === 403) {
      return {
        code: '403',
        title: 'Access Forbidden',
        message: 'You don\'t have permission to access this page.',
        icon: <Shield size={48} />
      };
    } else if (error?.status === 500) {
      return {
        code: '500',
        title: 'Server Error',
        message: 'Something went wrong on our end. Please try again later.',
        icon: <Settings size={48} />
      };
    } else {
      return {
        code: 'Error',
        title: 'Something Went Wrong',
        message: 'An unexpected error occurred. Please try again.',
        icon: <AlertTriangle size={48} />
      };
    }
  };

  const errorInfo = getErrorInfo();

  return (
    <>
      <Helmet>
        <title>{errorInfo.title} - ConvertFlix</title>
        <meta name="description" content={errorInfo.message} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="error-page">
        <div className="error-container">
          <div className="error-content">
            <div className="error-icon">
              {errorInfo.icon}
            </div>
            
            <h1 className="error-code">{errorInfo.code}</h1>
            <h2 className="error-title">{errorInfo.title}</h2>
            <p className="error-message">{errorInfo.message}</p>
            
            <div className="error-actions">
              <Link to="/" className="btn btn-primary">
                Go Home
              </Link>
              <button 
                onClick={() => window.history.back()} 
                className="btn btn-secondary"
              >
                Go Back
              </button>
            </div>
            
            <div className="error-help">
              <h3>Need Help?</h3>
              <p>If you continue to experience issues, please contact our support team.</p>
              <Link to="/contact" className="help-link">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error; 