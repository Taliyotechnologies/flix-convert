import React, { useState } from 'react';
import './Company.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission
    console.log('Contact form submitted:', formData);
  };

  const contactInfo = [
    {
      title: 'Email Support',
      description: 'Get help with our tools and services',
      value: 'support@flixconvert.com',
      icon: '📧'
    },
    {
      title: 'Business Inquiries',
      description: 'Partnerships and enterprise solutions',
      value: 'business@flixconvert.com',
      icon: '💼'
    },
    {
      title: 'Technical Support',
      description: 'Technical issues and bug reports',
      value: 'tech@flixconvert.com',
      icon: '🔧'
    }
  ];

  const faqs = [
    {
      question: 'How do I convert my files?',
      answer: 'Simply upload your file, select the desired output format, and click convert. Our tools support most common file formats.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we use enterprise-grade encryption and automatically delete your files after processing. Your privacy is our priority.'
    },
    {
      question: 'What file sizes are supported?',
      answer: 'We support files up to 10MB for free users. Larger files may require a premium account.'
    },
    {
      question: 'How fast is the conversion?',
      answer: 'Most conversions complete within seconds. Processing time depends on file size and format complexity.'
    }
  ];

  return (
    <div className="company-page">
      {/* Hero Section */}
      <section className="company-hero">
        <div className="container">
          <div className="company-hero-content">
            <h1 className="company-hero-title">
              Contact
              <span className="company-hero-accent"> Us</span>
            </h1>
            <p className="company-hero-subtitle">
              Have questions or need help? We're here to assist you with any inquiries 
              about our file conversion tools and services.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2 className="contact-title">Get in Touch</h2>
              <p className="contact-subtitle">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>

              <div className="contact-methods">
                {contactInfo.map((info, index) => (
                  <div key={index} className="contact-method">
                    <div className="contact-icon">{info.icon}</div>
                    <div className="contact-details">
                      <h3 className="contact-method-title">{info.title}</h3>
                      <p className="contact-method-description">{info.description}</p>
                      <a href={`mailto:${info.value}`} className="contact-email">
                        {info.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-form-container">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary contact-btn">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-faq">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Find answers to common questions about our services
            </p>
          </div>

          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Section */}
      <section className="contact-office">
        <div className="container">
          <div className="office-content">
            <h2 className="office-title">Our Office</h2>
            <div className="office-info">
              <div className="office-detail">
                <h3>FlixConvert Headquarters</h3>
                <p>123 Innovation Drive<br />
                Tech Valley, CA 94000<br />
                United States</p>
              </div>
              <div className="office-detail">
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                Saturday: 10:00 AM - 4:00 PM PST<br />
                Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 