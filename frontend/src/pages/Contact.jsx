import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, MessageSquare, Phone, Clock, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: <Mail size={24} />,
      title: 'Email Support',
      description: 'Get help with technical issues and general inquiries',
      contact: 'support@convertflix.com',
      response: 'Within 24 hours'
    },
    {
      icon: <MessageSquare size={24} />,
      title: 'Live Chat',
      description: 'Real-time assistance for urgent matters',
      contact: 'Available 24/7',
      response: 'Instant response'
    },
    {
      icon: <Phone size={24} />,
      title: 'Business Inquiries',
      description: 'Partnership opportunities and enterprise solutions',
      contact: 'business@convertflix.com',
      response: 'Within 48 hours'
    }
  ];

  const faqs = [
    {
      question: 'How long does file processing take?',
      answer: 'Most files are processed within 30 seconds to 2 minutes, depending on file size and type.'
    },
    {
      question: 'What file formats do you support?',
      answer: 'We support images (JPG, PNG, WebP, GIF), videos (MP4, AVI, MOV, MKV), PDFs, and audio files (MP3, WAV, AAC, OGG, FLAC).'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes! All files are automatically deleted after 24 hours and we never access your content. We use bank-level encryption.'
    },
    {
      question: 'What is the maximum file size?',
      answer: 'Free users can upload files up to 10MB. Premium users can upload larger files up to 100MB.'
    },
    {
      question: 'Do you offer API access?',
      answer: 'Yes, we offer API access for developers and businesses. Contact our business team for pricing and documentation.'
    },
    {
      question: 'Can I use ConvertFlix for commercial purposes?',
      answer: 'Absolutely! Our tools are perfect for businesses, agencies, and commercial use. We offer special pricing for high-volume users.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - ConvertFlix</title>
        <meta name="description" content="Get in touch with the ConvertFlix team for support, feedback, or business inquiries." />
      </Helmet>

      <div className="contact-page">
        <div className="container">
          {/* Header */}
          <div className="contact-header">
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-subtitle">
              We're here to help and would love to hear from you
            </p>
          </div>

          {/* Contact Methods */}
          <section className="contact-methods">
            <h2 className="section-title">Get in Touch</h2>
            <div className="methods-grid">
              {contactMethods.map((method, index) => (
                <div key={index} className="method-card">
                  <div className="method-icon">{method.icon}</div>
                  <h3 className="method-title">{method.title}</h3>
                  <p className="method-description">{method.description}</p>
                  <div className="method-contact">
                    <strong>{method.contact}</strong>
                  </div>
                  <div className="method-response">
                    <Clock size={16} />
                    <span>{method.response}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Form */}
          <section className="contact-form-section">
            <h2 className="section-title">Send us a Message</h2>
            <div className="form-container">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="form-textarea"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              {submitStatus === 'success' && (
                <div className="success-message">
                  <CheckCircle size={24} />
                  <span>Message sent successfully! We'll get back to you soon.</span>
                </div>
              )}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="faq-section">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="faq-grid">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <h3 className="faq-question">{faq.question}</h3>
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Office Info */}
          <section className="office-section">
            <h2 className="section-title">Our Office</h2>
            <div className="office-info">
              <div className="office-card">
                <div className="office-icon">
                  <MapPin size={24} />
                </div>
                <div className="office-details">
                  <h3>Headquarters</h3>
                  <p>123 Tech Street<br />Digital City, DC 12345<br />United States</p>
                </div>
              </div>
              
              <div className="office-card">
                <div className="office-icon">
                  <Clock size={24} />
                </div>
                <div className="office-details">
                  <h3>Business Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: Closed</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Contact; 