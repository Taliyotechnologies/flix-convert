import React from 'react';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - ConvertFlix</title>
        <meta name="description" content="Get in touch with the ConvertFlix team for support, feedback, or business inquiries." />
      </Helmet>

      <div className="contact-page">
        <div className="container">
          <div className="contact-header">
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-subtitle">
              We'd love to hear from you
            </p>
          </div>

          <div className="contact-content">
            <p>
              Have questions, feedback, or need support? We're here to help! 
              Reach out to us and we'll get back to you as soon as possible.
            </p>
            
            <div className="contact-info">
              <p><strong>Email:</strong> support@convertflix.com</p>
              <p><strong>Response Time:</strong> Within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact; 