import React from 'react';
import { Helmet } from 'react-helmet-async';

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - ConvertFlix</title>
        <meta name="description" content="Learn how ConvertFlix protects your privacy and handles your data." />
      </Helmet>

      <div className="privacy-page">
        <div className="container">
          <div className="privacy-header">
            <h1 className="privacy-title">Privacy Policy</h1>
            <p className="privacy-subtitle">
              How we protect your data and privacy
            </p>
          </div>

          <div className="privacy-content">
            <div className="privacy-section">
              <h2>Data Collection</h2>
              <p>
                We collect minimal data necessary to provide our services. Your uploaded files 
                are automatically deleted after 24 hours and are never stored permanently.
              </p>
            </div>

            <div className="privacy-section">
              <h2>File Processing</h2>
              <p>
                Files are processed securely on our servers and are automatically deleted 
                after processing. We do not access or view your file contents.
              </p>
            </div>

            <div className="privacy-section">
              <h2>Cookies</h2>
              <p>
                We use essential cookies to improve your experience. No tracking or 
                advertising cookies are used.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy; 