import React from 'react';
import './SignupRequiredPopup.css';

export default function SignupRequiredPopup({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="signup-popup-overlay">
      <div className="signup-popup">
        <div className="popup-header">
          <h3>Sign Up Required</h3>
          <button className="popup-close" onClick={onClose}>×</button>
        </div>
        <div className="popup-content">
          <p>To download files larger than 10MB, you need to sign up for a free account.</p>
        </div>
        <div className="popup-actions">
          <button className="btn-outline" onClick={onClose}>Cancel</button>
          <a href="/signin" className="btn-primary">Sign Up Now</a>
        </div>
      </div>
    </div>
  );
} 