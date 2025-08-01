import React from 'react';
import { Helmet } from 'react-helmet-async';

const Company = () => {
  return (
    <>
      <Helmet>
        <title>Company - ConvertFlix</title>
        <meta name="description" content="Learn more about ConvertFlix and our mission to provide fast, secure file compression and conversion tools." />
      </Helmet>

      <div className="company-page">
        <div className="container">
          <div className="company-header">
            <h1 className="company-title">About ConvertFlix</h1>
            <p className="company-subtitle">
              Empowering users with fast, secure, and reliable file processing tools
            </p>
          </div>

          <div className="company-content">
            <div className="company-section">
              <h2>Our Mission</h2>
              <p>
                At ConvertFlix, we believe that file processing should be simple, fast, and secure. 
                Our mission is to provide professional-grade compression and conversion tools that 
                anyone can use, regardless of their technical expertise.
              </p>
            </div>

            <div className="company-section">
              <h2>What We Do</h2>
              <p>
                We offer a comprehensive suite of file processing tools including image compression, 
                PDF compression, video compression, and format conversion for audio, video, and images. 
                All tools are designed with user privacy and security in mind.
              </p>
            </div>

            <div className="company-section">
              <h2>Our Values</h2>
              <ul>
                <li><strong>Privacy First:</strong> Your files are automatically deleted after 24 hours</li>
                <li><strong>Security:</strong> Enterprise-grade encryption and secure processing</li>
                <li><strong>Simplicity:</strong> Easy-to-use tools for everyone</li>
                <li><strong>Performance:</strong> Fast processing with optimized algorithms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Company; 