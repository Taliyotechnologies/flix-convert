import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="hero-section" aria-label="Welcome section">
      <h1 className="hero-title">Welcome to FlixConvert</h1>
      <p className="hero-desc">Fast, free, and high-quality file compression and conversion.</p>
      <Link to="/compress" className="hero-cta" aria-label="Start compressing or converting files">
        Get Started
      </Link>
    </section>
  );
}

export default Home; 