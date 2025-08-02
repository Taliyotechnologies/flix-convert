import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, AlertTriangle, Clock, FileText, Users, Globe, Scale, CheckCircle } from 'lucide-react';
import './Terms.css';

const Terms = () => {
  const termsSections = [
    {
      icon: <Shield size={32} />,
      title: 'Acceptable Use Policy',
      content: [
        'Use our services only for legitimate file processing needs',
        'Do not upload files that violate copyright or intellectual property rights',
        'Prohibited: malware, illegal content, or files that could harm our systems',
        'Respect other users and do not abuse our services',
        'Commercial use is permitted with appropriate licensing'
      ]
    },
    {
      icon: <Clock size={32} />,
      title: 'Service Limitations',
      content: [
        'Free users: Maximum file size of 10MB per upload',
        'Premium users: Maximum file size of 100MB per upload',
        'Processing times vary based on file size and server load',
        'Files are automatically deleted after 24 hours',
        'Service availability may be subject to maintenance windows'
      ]
    },
    {
      icon: <Users size={32} />,
      title: 'User Responsibilities',
      content: [
        'You are responsible for the content you upload',
        'Ensure you have rights to process uploaded files',
        'Maintain the security of your account credentials',
        'Report any security issues or abuse immediately',
        'Comply with all applicable laws and regulations'
      ]
    },
    {
      icon: <Globe size={32} />,
      title: 'Intellectual Property',
      content: [
        'ConvertFlix retains rights to our software and services',
        'You retain ownership of your uploaded content',
        'We do not claim ownership of your processed files',
        'Our trademarks and branding are protected',
        'Open source components are used under their respective licenses'
      ]
    },
    {
      icon: <Scale size={32} />,
      title: 'Limitation of Liability',
      content: [
        'Services provided "as is" without warranties',
        'We are not liable for data loss or corruption',
        'Maximum liability limited to amount paid for services',
        'No liability for indirect or consequential damages',
        'Force majeure events may affect service availability'
      ]
    },
    {
      icon: <AlertTriangle size={32} />,
      title: 'Termination',
      content: [
        'We may terminate accounts for policy violations',
        'Users may cancel accounts at any time',
        'Data deletion occurs within 30 days of termination',
        'Refunds processed according to our refund policy',
        'Surviving terms remain in effect after termination'
      ]
    }
  ];

  const serviceTiers = [
    { tier: 'Free', features: ['10MB max file size', 'Basic processing', '24-hour retention', 'Community support'] },
    { tier: 'Premium', features: ['100MB max file size', 'Priority processing', 'Extended retention', 'Priority support'] },
    { tier: 'Enterprise', features: ['Custom file sizes', 'Dedicated processing', 'Custom retention', '24/7 support'] }
  ];

  return (
    <>
      <Helmet>
        <title>Terms of Service - ConvertFlix</title>
        <meta name="description" content="Read our terms of service and usage guidelines for ConvertFlix." />
      </Helmet>

      <div className="terms-page">
        <div className="container">
          {/* Header */}
          <div className="terms-header">
            <h1 className="terms-title">Terms of Service</h1>
            <p className="terms-subtitle">
              Please read these terms carefully before using our services
            </p>
            <div className="terms-meta">
              <span>Last updated: January 15, 2024</span>
              <span>Effective date: January 1, 2024</span>
            </div>
          </div>

          {/* Introduction */}
          <section className="terms-intro">
            <h2 className="section-title">Agreement to Terms</h2>
            <p className="intro-text">
              By accessing and using ConvertFlix services, you agree to be bound by these Terms of Service. 
              These terms govern your use of our file processing tools and constitute a legally binding 
              agreement between you and ConvertFlix. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          {/* Terms Sections */}
          <section className="terms-sections">
            {termsSections.map((section, index) => (
              <div key={index} className="terms-section-card">
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

          {/* Service Tiers */}
          <section className="service-tiers">
            <h2 className="section-title">Service Tiers</h2>
            <div className="tiers-grid">
              {serviceTiers.map((tier, index) => (
                <div key={index} className="tier-card">
                  <h3 className="tier-name">{tier.tier}</h3>
                  <ul className="tier-features">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        <CheckCircle size={16} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Information */}
          <section className="terms-contact">
            <h2 className="section-title">Questions About Terms?</h2>
            <div className="contact-info">
              <p>
                If you have any questions about these Terms of Service, please contact our legal team:
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <strong>Email:</strong> legal@convertflix.com
                </div>
                <div className="contact-item">
                  <strong>Response Time:</strong> Within 72 hours
                </div>
                <div className="contact-item">
                  <strong>Legal Department:</strong> Available for business inquiries
                </div>
              </div>
            </div>
          </section>

          {/* Updates */}
          <section className="terms-updates">
            <h2 className="section-title">Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. We will notify users 
              of any material changes by posting the updated terms on this page and updating the 
              "Last updated" date. Continued use of our services after changes constitutes acceptance 
              of the new terms.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Terms; 