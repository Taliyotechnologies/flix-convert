import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FiHome, FiArrowLeft, FiSearch } from 'react-icons/fi'

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found - ConvertFlix</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to ConvertFlix home page." />
      </Helmet>

      <div className="container">
        <div className="not-found-container">
          <div className="not-found-content">
            <div className="not-found-icon">
              <FiSearch />
            </div>
            
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>
              Oops! The page you're looking for doesn't exist. 
              It might have been moved, deleted, or you entered the wrong URL.
            </p>
            
            <div className="not-found-actions">
              <Link to="/" className="btn btn-primary">
                <FiHome />
                Go to Home
              </Link>
              <button onClick={() => window.history.back()} className="btn btn-secondary">
                <FiArrowLeft />
                Go Back
              </button>
            </div>

            <div className="not-found-suggestions">
              <h3>Try these pages instead:</h3>
              <div className="suggestions-grid">
                <Link to="/compress/image" className="suggestion-card">
                  <h4>Compress Images</h4>
                  <p>Reduce image file sizes</p>
                </Link>
                <Link to="/compress/video" className="suggestion-card">
                  <h4>Compress Videos</h4>
                  <p>Compress video files</p>
                </Link>
                <Link to="/compress/audio" className="suggestion-card">
                  <h4>Compress Audio</h4>
                  <p>Reduce audio file sizes</p>
                </Link>
                <Link to="/compress/pdf" className="suggestion-card">
                  <h4>Compress PDFs</h4>
                  <p>Compress PDF documents</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .not-found-container {
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 0;
        }

        .not-found-content {
          text-align: center;
          max-width: 600px;
        }

        .not-found-icon {
          width: 120px;
          height: 120px;
          margin: 0 auto 2rem;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 3rem;
        }

        .not-found-content h1 {
          font-size: 6rem;
          font-weight: 700;
          color: var(--accent-primary);
          margin-bottom: 1rem;
          line-height: 1;
        }

        .not-found-content h2 {
          margin-bottom: 1rem;
        }

        .not-found-content p {
          color: var(--text-secondary);
          font-size: 1.125rem;
          margin-bottom: 2rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .not-found-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .not-found-suggestions {
          margin-top: 3rem;
        }

        .not-found-suggestions h3 {
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .suggestions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .suggestion-card {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 0.75rem;
          padding: 1.5rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .suggestion-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--accent-primary);
        }

        .suggestion-card h4 {
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .suggestion-card p {
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin: 0;
        }

        @media (max-width: 768px) {
          .not-found-content h1 {
            font-size: 4rem;
          }

          .not-found-icon {
            width: 80px;
            height: 80px;
            font-size: 2rem;
          }

          .not-found-actions {
            flex-direction: column;
            align-items: center;
          }

          .suggestions-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .not-found-content h1 {
            font-size: 3rem;
          }

          .not-found-content p {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  )
}

export default NotFound