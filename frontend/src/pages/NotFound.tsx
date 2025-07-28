import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, FileText } from 'lucide-react';
import './NotFound.css';

const NotFound: React.FC = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="not-found-illustration">
            <div className="error-code">404</div>
            <div className="error-icon">
              <Search size={48} />
            </div>
          </div>
          
          <div className="not-found-text">
            <h1>Page Not Found</h1>
            <p>
              Sorry, we couldn't find the page you're looking for. 
              It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary btn-large">
              <Home size={20} />
              Go to Home
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="btn btn-ghost btn-large"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
          </div>

          <div className="not-found-suggestions">
            <h3>Popular Pages</h3>
            <div className="suggestions-grid">
              <Link to="/tools" className="suggestion-card">
                <div className="suggestion-icon">
                  <FileText size={24} />
                </div>
                <div className="suggestion-content">
                  <h4>All Tools</h4>
                  <p>Browse our file conversion tools</p>
                </div>
              </Link>
              
              <Link to="/tools/compress-image" className="suggestion-card">
                <div className="suggestion-icon">
                  <FileText size={24} />
                </div>
                <div className="suggestion-content">
                  <h4>Compress Images</h4>
                  <p>Reduce image file size</p>
                </div>
              </Link>
              
              <Link to="/tools/convert-pdf" className="suggestion-card">
                <div className="suggestion-icon">
                  <FileText size={24} />
                </div>
                <div className="suggestion-content">
                  <h4>Convert PDF</h4>
                  <p>Convert PDF to other formats</p>
                </div>
              </Link>
              
              <Link to="/company" className="suggestion-card">
                <div className="suggestion-icon">
                  <FileText size={24} />
                </div>
                <div className="suggestion-content">
                  <h4>About Us</h4>
                  <p>Learn more about FlixConvert</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 