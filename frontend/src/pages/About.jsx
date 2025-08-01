import React from 'react';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - ConvertFlix</title>
        <meta name="description" content="Learn about the team behind ConvertFlix and our commitment to providing the best file processing tools." />
      </Helmet>

      <div className="about-page">
        <div className="container">
          <div className="about-header">
            <h1 className="about-title">About Us</h1>
            <p className="about-subtitle">
              We're passionate about making file processing accessible to everyone
            </p>
          </div>

          <div className="about-content">
            <p>
              ConvertFlix was founded with a simple goal: to make professional-grade file 
              processing tools available to everyone. Whether you're a student, professional, 
              or casual user, our tools are designed to be simple, fast, and secure.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About; 