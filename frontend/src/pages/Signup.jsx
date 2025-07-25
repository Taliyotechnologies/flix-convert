import React from 'react';
import './Home.css';

const Signup = () => (
  <section className="home">
    <div className="home-hero animate-hero">
      <h1 className="animate-title">Create Your Account</h1>
      <p className="home-subtitle animate-subtitle">Sign up to unlock advanced features and manage your conversions.</p>
    </div>
    <div className="home-details animate-details" style={{marginTop: '2.5rem', maxWidth: 400}}>
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
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Password" required />
        </div>
        <button type="submit" className="home-cta-btn" style={{marginTop: 16}}>Sign Up</button>
      </form>
              <div style={{marginTop: 24, textAlign: 'center', color: '#3B82F6'}}>
                  <svg width="32" height="32" fill="none" viewBox="0 0 32 32" style={{marginBottom: 8}}><rect width="32" height="32" rx="8" fill="#3B82F6"/><path d="M16 10a4 4 0 100 8 4 4 0 000-8z" fill="#fff"/><rect x="10" y="20" width="12" height="4" rx="2" fill="#fff"/></svg>
        <div>Already have an account? <a href="/login" style={{color: '#2CB67D', textDecoration: 'underline'}}>Login</a></div>
      </div>
    </div>
  </section>
);

export default Signup; 