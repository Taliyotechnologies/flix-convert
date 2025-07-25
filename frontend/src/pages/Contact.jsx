import React from 'react';
import './Home.css';

const Contact = () => (
  <section className="home">
    <div className="home-hero animate-hero">
      <h1 className="animate-title">Contact Us</h1>
      <p className="home-subtitle animate-subtitle">Have a question, suggestion, or need help? Reach out to the ConvertFlix team—we’re here to help!</p>
    </div>
    <div className="home-details animate-details" style={{marginTop: '2.5rem', maxWidth: 600}}>
      <form className="contact-form" autoComplete="off">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your Name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="you@email.com" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" placeholder="How can we help you?" rows={5} required />
        </div>
        <button type="submit" className="home-cta-btn" style={{marginTop: 16}}>Send Message</button>
      </form>
      <div style={{marginTop: 32, textAlign: 'center', color: 'var(--color-accent)'}}>
        <svg width="32" height="32" fill="none" viewBox="0 0 32 32" style={{marginBottom: 8}}><rect width="32" height="32" rx="8" fill="var(--color-accent)"/><rect x="8" y="10" width="16" height="12" rx="3" stroke="#fff" strokeWidth="2"/><path d="M8 12l8 6 8-6" stroke="#fff" strokeWidth="2"/></svg>
        <div>Email: <a href="mailto:support@convertflix.com" style={{color: 'var(--color-accent)', textDecoration: 'underline'}}>support@convertflix.com</a></div>
      </div>
    </div>
  </section>
);

export default Contact; 