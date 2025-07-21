import React, { useState } from 'react';
import { contactAPI } from '../utils/api';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await contactAPI.submitContact(form);
      setSuccess(true);
      setForm({ name: '', email: '', message: '' }); // Clear form
      
    } catch (error) {
      setError(error.message || 'Failed to send message. Please try again.');
      console.error('Contact submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-main">
      <section className="contact-card">
        <div className="contact-header">
          <span className="contact-icon" aria-hidden="true">
            {/* Envelope SVG */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="5" width="20" height="14" rx="3" fill="#6c63ff" fillOpacity="0.13"/>
              <path d="M4 7l8 6 8-6" stroke="#6c63ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-desc">Have a question, feedback, or need support? Fill out the form below and our team will get back to you soon.</p>
        </div>
        
        {error && (
          <div className="error-message" role="alert">
            <span className="error-icon" aria-hidden="true">
              {/* Error SVG */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#fff2f0" stroke="#cf1322" strokeWidth="1.5"/>
                <path d="M12 7v5" stroke="#cf1322" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="12" cy="16" r="1" fill="#cf1322"/>
              </svg>
            </span>
            <span>{error}</span>
          </div>
        )}
        
        {success ? (
          <div className="contact-success" role="status">
            <span className="success-icon" aria-hidden="true">
              {/* Success SVG */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#f6ffed" stroke="#52c41a" strokeWidth="1.5"/>
                <path d="M8 12.5l2.5 2.5 5-5" stroke="#52c41a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span>Thank you for contacting us! Your message has been received. We’ll get back to you as soon as possible.</span>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} autoComplete="off">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                required 
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                required 
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                value={form.message} 
                onChange={handleChange} 
                rows={5} 
                required 
                disabled={loading}
                placeholder="Tell us about your question, feedback, or support request..."
              />
            </div>
            <button 
              type="submit" 
              className="contact-submit"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </section>
    </main>
  );
} 