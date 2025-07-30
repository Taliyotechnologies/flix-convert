import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Building2 } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="container">
        {/* Header */}
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>
            Have questions or need support? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Info */}
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">
                  <Mail size={24} />
                </div>
                <div className="info-content">
                  <h3>Email</h3>
                  <p>info@taliyotechnologies.com</p>
                  <p>support@taliyotechnologies.com</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <Phone size={24} />
                </div>
                <div className="info-content">
                  <h3>Phone</h3>
                  <p>+1 (555) 123-4567</p>
                  <p>Mon-Fri: 9AM-6PM EST</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <MapPin size={24} />
                </div>
                <div className="info-content">
                  <h3>Location</h3>
                  <p>Tech Hub, Innovation District</p>
                  <p>Digital City, DC 12345</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <Building2 size={24} />
                </div>
                <div className="info-content">
                  <h3>Company</h3>
                  <p>Taliyo Technologies</p>
                  <p>Empowering Digital Innovation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit}>
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
                  rows="6"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-large">
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How do I use your tools?</h3>
              <p>
                Simply navigate to the Tools section, select the tool you need, 
                upload your file, and follow the instructions. Our tools are designed 
                to be user-friendly and intuitive.
              </p>
            </div>

            <div className="faq-item">
              <h3>What file formats do you support?</h3>
              <p>
                We support a wide range of file formats including images (JPG, PNG, 
                GIF, WebP), audio files (MP3, WAV, AAC), and video files (MP4, AVI, MOV).
              </p>
            </div>

            <div className="faq-item">
              <h3>Is my data secure?</h3>
              <p>
                Yes, we take data security seriously. All files are processed securely 
                and automatically deleted after processing. We never store your personal data.
              </p>
            </div>

            <div className="faq-item">
              <h3>Do you offer custom solutions?</h3>
              <p>
                Yes, we provide custom development services for businesses. Contact us 
                to discuss your specific requirements and get a quote.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 