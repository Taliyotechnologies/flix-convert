import React from 'react';
import { Helmet } from 'react-helmet-async';
import './Company.css';

const Company = () => {
  return (
    <>
      <Helmet>
        <title>Company - ConvertFlix</title>
        <meta name="description" content="Learn more about ConvertFlix and Taliyo Technologies - our mission to provide fast, secure file compression and conversion tools." />
      </Helmet>

      <div className="company-page">
        <div className="container">
          <div className="company-header">
            <h1 className="company-title">About ConvertFlix</h1>
            <p className="company-subtitle">
              Empowering users with fast, secure, and reliable file processing tools
            </p>
          </div>

          <div className="company-content">
            <div className="company-section">
              <h2>🏢 Our Company</h2>
              <p>
                ConvertFlix is a product of <strong>Taliyo Technologies</strong>, a leading software development company 
                specializing in innovative web applications and digital solutions. Founded with a vision to make 
                technology accessible to everyone, we create tools that simplify complex tasks and enhance productivity.
              </p>
            </div>

            <div className="company-section">
              <h2>🎯 Our Mission</h2>
              <p>
                At ConvertFlix, we believe that file processing should be simple, fast, and secure. 
                Our mission is to provide professional-grade compression and conversion tools that 
                anyone can use, regardless of their technical expertise. We're committed to making 
                high-quality file processing tools accessible to everyone, from students to professionals.
              </p>
            </div>

            <div className="company-section">
              <h2>🛠️ What We Do</h2>
              <p>
                We offer a comprehensive suite of file processing tools including:
              </p>
              <ul className="services-list">
                <li><strong>📸 Image Compression:</strong> Optimize your images without losing quality</li>
                <li><strong>📄 PDF Compression:</strong> Reduce PDF file sizes for easy sharing</li>
                <li><strong>🎥 Video Compression:</strong> Compress videos for faster uploads</li>
                <li><strong>🎵 Audio Conversion:</strong> Convert between audio formats seamlessly</li>
                <li><strong>🖼️ Image Conversion:</strong> Convert images to different formats</li>
                <li><strong>📊 File Format Conversion:</strong> Transform files between various formats</li>
              </ul>
            </div>

            <div className="company-section">
              <h2>💎 Our Values</h2>
              <div className="values-grid">
                <div className="value-item">
                  <span className="value-icon">🔒</span>
                  <h3>Privacy First</h3>
                  <p>Your files are automatically deleted after 24 hours. We never store or access your personal data.</p>
                </div>
                <div className="value-item">
                  <span className="value-icon">🛡️</span>
                  <h3>Security</h3>
                  <p>Enterprise-grade encryption and secure processing ensure your files are protected at all times.</p>
                </div>
                <div className="value-item">
                  <span className="value-icon">🎯</span>
                  <h3>Simplicity</h3>
                  <p>Easy-to-use tools designed for everyone, from beginners to advanced users.</p>
                </div>
                <div className="value-item">
                  <span className="value-icon">⚡</span>
                  <h3>Performance</h3>
                  <p>Fast processing with optimized algorithms for quick and efficient file handling.</p>
                </div>
              </div>
            </div>

            <div className="company-section">
              <h2>🚀 Taliyo Technologies</h2>
              <p>
                <strong>Taliyo Technologies</strong> is a dynamic software development company that specializes in:
              </p>
              <ul className="taliyo-services">
                <li><strong>🌐 Web Development:</strong> Modern, responsive web applications</li>
                <li><strong>📱 Mobile Apps:</strong> Cross-platform mobile solutions</li>
                <li><strong>☁️ Cloud Solutions:</strong> Scalable cloud infrastructure</li>
                <li><strong>🤖 AI & Machine Learning:</strong> Intelligent automation systems</li>
                <li><strong>🔧 Custom Software:</strong> Tailored solutions for businesses</li>
                <li><strong>🎨 UI/UX Design:</strong> Beautiful and intuitive user interfaces</li>
              </ul>
            </div>

            <div className="company-section">
              <h2>👥 Our Team</h2>
              <p>
                Our team consists of experienced developers, designers, and technology enthusiasts 
                who are passionate about creating innovative solutions. We combine technical expertise 
                with creative thinking to deliver products that exceed expectations.
              </p>
            </div>

            <div className="company-section">
              <h2>🌍 Our Impact</h2>
              <p>
                Since our launch, ConvertFlix has helped thousands of users process millions of files. 
                We're proud to serve a global community of creators, professionals, and everyday users 
                who trust us with their file processing needs.
              </p>
            </div>

            <div className="company-section">
              <h2>📞 Contact Us</h2>
              <p>
                Have questions or suggestions? We'd love to hear from you! Reach out to our team at:
              </p>
              <div className="contact-info">
                <p><strong>📧 Email:</strong> <a href="mailto:info@taliyotechnologies.com">info@taliyotechnologies.com</a></p>
                <p><strong>🌐 Website:</strong> <a href="https://taliyotechnologies.com" target="_blank" rel="noopener noreferrer">taliyotechnologies.com</a></p>
                <p><strong>📍 Location:</strong> India</p>
              </div>
            </div>

            <div className="company-section">
              <h2>🔮 Future Vision</h2>
              <p>
                We're constantly working on new features and improvements. Our roadmap includes 
                advanced AI-powered compression, batch processing capabilities, and integration 
                with popular cloud storage services. Stay tuned for exciting updates!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Company; 