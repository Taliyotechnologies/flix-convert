import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span>© {new Date().getFullYear()} FlixConvert. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer; 