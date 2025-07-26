import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Have a question, suggestion, or need help? We're here to help!</p>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">📧</div>
                  <div>
                    <h3>Email Support</h3>
                    <a href="mailto:support@convertflix.com">support@convertflix.com</a>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="method-icon">💬</div>
                  <div>
                    <h3>Live Chat</h3>
                    <p>Available during business hours</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="method-icon">📱</div>
                  <div>
                    <h3>Response Time</h3>
                    <p>Usually within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-form-wrapper">
              <form className="contact-form" autoComplete="off">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Enter your full name" 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Enter your email address" 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select id="subject" name="subject" required>
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    placeholder="Tell us how we can help you..." 
                    rows={6} 
                    required 
                  />
                </div>
                
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Find quick answers to common questions</p>
          </div>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How do I convert files?</h3>
              <p>Simply upload your file, select the desired output format, and click convert. Our platform supports most common file formats.</p>
            </div>
            
            <div className="faq-item">
              <h3>Is my data secure?</h3>
              <p>Yes, we take security seriously. All files are processed securely and automatically deleted after conversion.</p>
            </div>
            
            <div className="faq-item">
              <h3>What file formats do you support?</h3>
              <p>We support images (JPG, PNG, WebP, GIF), videos (MP4, AVI, MOV), audio (MP3, WAV, FLAC), and PDFs.</p>
            </div>
            
            <div className="faq-item">
              <h3>Is ConvertFlix free to use?</h3>
              <p>Yes, our basic conversion services are completely free. Premium features are available for advanced users.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 