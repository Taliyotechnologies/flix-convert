import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, FileText, Image, Video, Music } from 'lucide-react';
import './NotFound.css';

const NotFound: React.FC = () => {
  const popularTools = [
    {
      name: 'Compress Image',
      icon: <Image size={20} />,
      path: '/tools/compress-image',
      description: 'Reduce image file size'
    },
    {
      name: 'Convert PDF',
      icon: <FileText size={20} />,
      path: '/tools/convert-pdf',
      description: 'Convert PDF to other formats'
    },
    {
      name: 'Compress Video',
      icon: <Video size={20} />,
      path: '/tools/compress-video',
      description: 'Reduce video file size'
    },
    {
      name: 'Convert Audio',
      icon: <Music size={20} />,
      path: '/tools/convert-audio',
      description: 'Convert audio formats'
    }
  ];

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="not-found-header">
            <div className="error-code">404</div>
            <h1>Page Not Found</h1>
            <p>
              Sorry, the page you're looking for doesn't exist. It might have been moved, 
              deleted, or you entered the wrong URL.
            </p>
          </div>

          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary btn-large">
              <Home size={20} />
              Go Home
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="btn btn-ghost btn-large"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
          </div>

          <div className="search-section">
            <div className="search-header">
              <Search size={20} />
              <h3>Looking for something specific?</h3>
            </div>
            <p>Try our popular tools or browse all available options</p>
            
            <div className="popular-tools">
              {popularTools.map((tool, index) => (
                <Link key={index} to={tool.path} className="tool-link">
                  <div className="tool-icon">
                    {tool.icon}
                  </div>
                  <div className="tool-info">
                    <h4>{tool.name}</h4>
                    <p>{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="browse-all">
              <Link to="/tools" className="btn btn-ghost">
                Browse All Tools
              </Link>
            </div>
          </div>

          <div className="help-section">
            <h3>Need Help?</h3>
            <div className="help-links">
              <Link to="/company" className="help-link">
                Contact Support
              </Link>
              <Link to="/company" className="help-link">
                About Us
              </Link>
              <Link to="/company" className="help-link">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 