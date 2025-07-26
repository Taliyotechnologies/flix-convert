import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <div className="contact-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="contact-hero"
      >
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </motion.div>

      <div className="contact-content">
        <div className="contact-grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="contact-info"
          >
            <h2>Contact Information</h2>
            <div className="info-items">
              <div className="info-item">
                <Mail className="info-icon" />
                <div>
                  <h3>Email</h3>
                  <p>support@flixconvert.com</p>
                </div>
              </div>
              <div className="info-item">
                <Phone className="info-icon" />
                <div>
                  <h3>Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="info-item">
                <MapPin className="info-icon" />
                <div>
                  <h3>Address</h3>
                  <p>123 Tech Street, Digital City, DC 12345</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="#" className="social-icon">Twitter</a>
                <a href="#" className="social-icon">LinkedIn</a>
                <a href="#" className="social-icon">GitHub</a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="contact-form-container"
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="contact-form">
                <h2>Send us a Message</h2>
                
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <>
                      <Send className="btn-icon" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="success-message"
              >
                <CheckCircle className="success-icon" />
                <h2>Message Sent!</h2>
                <p>Thank you for contacting us. We'll get back to you soon!</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="new-message-btn"
                >
                  Send Another Message
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 