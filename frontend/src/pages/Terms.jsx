import React from 'react';
import { Helmet } from 'react-helmet-async';

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - ConvertFlix</title>
        <meta name="description" content="Read our terms of service and usage guidelines for ConvertFlix." />
      </Helmet>

      <div className="terms-page">
        <div className="container">
          <div className="terms-header">
            <h1 className="terms-title">Terms of Service</h1>
            <p className="terms-subtitle">
              Our terms and conditions of use
            </p>
          </div>

          <div className="terms-content">
            <div className="terms-section">
              <h2>Acceptable Use</h2>
              <p>
                You may use our services for legitimate file processing needs. 
                Do not upload files that violate copyright, contain malware, or are illegal.
              </p>
            </div>

            <div className="terms-section">
              <h2>Service Limitations</h2>
              <p>
                Files must be under 10MB for free users. Processing times may vary 
                depending on file size and server load.
              </p>
            </div>

            <div className="terms-section">
              <h2>Disclaimer</h2>
              <p>
                We provide our services "as is" without warranties. We are not responsible 
                for any data loss or damage resulting from the use of our services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms; 