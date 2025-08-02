import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Lock, Eye, Trash2, Cookie, Server, Users, Globe, Calendar } from 'lucide-react';
import './Privacy.css';

const Privacy = () => {
  const privacySections = [
    {
      icon: <Shield size={32} />,
      title: 'Data Protection',
      content: [
        'All uploaded files are encrypted using bank-level security protocols',
        'Files are automatically deleted after 24 hours',
        'We never access, view, or store your file contents permanently',
        'Your data is processed in secure, isolated environments'
      ]
    },
    {
      icon: <Lock size={32} />,
      title: 'Privacy Commitment',
      content: [
        'We do not sell, rent, or share your personal information',
        'No third-party tracking or advertising cookies',
        'Minimal data collection - only what\'s necessary for service delivery',
        'GDPR compliant data handling practices'
      ]
    },
    {
      icon: <Server size={32} />,
      title: 'File Processing',
      content: [
        'Files are processed securely on our cloud infrastructure',
        'Automatic deletion after processing completion',
        'No human access to your uploaded content',
        'Secure transmission using HTTPS encryption'
      ]
    },
    {
      icon: <Cookie size={32} />,
      title: 'Cookie Policy',
      content: [
        'Essential cookies only for service functionality',
        'No tracking or advertising cookies',
        'Session cookies for user experience improvement',
        'Clear cookie consent and control options'
      ]
    },
    {
      icon: <Users size={32} />,
      title: 'User Rights',
      content: [
        'Right to access your personal data',
        'Right to request data deletion',
        'Right to data portability',
        'Right to withdraw consent at any time'
      ]
    },
    {
      icon: <Globe size={32} />,
      title: 'International Compliance',
      content: [
        'GDPR compliance for EU users',
        'CCPA compliance for California residents',
        'International data transfer safeguards',
        'Local privacy law adherence worldwide'
      ]
    }
  ];

  const dataRetention = [
    { type: 'Uploaded Files', retention: '24 hours', icon: <Trash2 size={20} /> },
    { type: 'Processing Logs', retention: '30 days', icon: <Calendar size={20} /> },
    { type: 'User Accounts', retention: 'Until deletion', icon: <Users size={20} /> },
    { type: 'Analytics Data', retention: '1 year', icon: <Eye size={20} /> }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy - ConvertFlix</title>
        <meta name="description" content="Learn how ConvertFlix protects your privacy and handles your data." />
      </Helmet>

      <div className="privacy-page">
        <div className="container">
          {/* Header */}
          <div className="privacy-header">
            <h1 className="privacy-title">Privacy Policy</h1>
            <p className="privacy-subtitle">
              Your privacy is our top priority. Learn how we protect your data and maintain your trust.
            </p>
            <div className="privacy-meta">
              <span>Last updated: January 15, 2024</span>
              <span>Version: 2.1</span>
            </div>
          </div>

          {/* Introduction */}
          <section className="privacy-intro">
            <h2 className="section-title">Our Commitment to Privacy</h2>
            <p className="intro-text">
              At ConvertFlix, we believe that privacy is a fundamental human right. We are committed to 
              protecting your personal information and ensuring that your data remains secure and private. 
              This Privacy Policy explains how we collect, use, and protect your information when you use 
              our file processing services.
            </p>
          </section>

          {/* Privacy Sections */}
          <section className="privacy-sections">
            {privacySections.map((section, index) => (
              <div key={index} className="privacy-section-card">
                <div className="section-icon">{section.icon}</div>
                <h3 className="section-card-title">{section.title}</h3>
                <ul className="section-content">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Data Retention */}
          <section className="data-retention">
            <h2 className="section-title">Data Retention Policy</h2>
            <div className="retention-grid">
              {dataRetention.map((item, index) => (
                <div key={index} className="retention-item">
                  <div className="retention-icon">{item.icon}</div>
                  <div className="retention-info">
                    <h4>{item.type}</h4>
                    <p>{item.retention}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Information */}
          <section className="privacy-contact">
            <h2 className="section-title">Questions About Privacy?</h2>
            <div className="contact-info">
              <p>
                If you have any questions about this Privacy Policy or our data practices, 
                please contact our Privacy Team:
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <strong>Email:</strong> privacy@convertflix.com
                </div>
                <div className="contact-item">
                  <strong>Response Time:</strong> Within 48 hours
                </div>
                <div className="contact-item">
                  <strong>Data Protection Officer:</strong> Available for EU users
                </div>
              </div>
            </div>
          </section>

          {/* Updates */}
          <section className="policy-updates">
            <h2 className="section-title">Policy Updates</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices 
              or for other operational, legal, or regulatory reasons. We will notify you of any material 
              changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Privacy; 