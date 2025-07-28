import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      content: 'support@flixconvert.com',
      link: 'mailto:support@flixconvert.com'
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Address',
      content: '123 Tech Street, Silicon Valley, CA 94000',
      link: '#'
    },
    {
      icon: <Clock size={24} />,
      title: 'Support Hours',
      content: '24/7 - We\'re always here to help',
      link: '#'
    }
  ];

  return (
    <div className="contact">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <motion.div
            className="contact-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="contact-title">Get in Touch</h1>
            <p className="contact-subtitle">
              Have questions or need help? We're here to assist you with all your file conversion needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content section">
        <div className="container">
          <div className="grid grid-2">
            {/* Contact Form */}
            <motion.div
              className="contact-form-container"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="contact-form-card card">
                <h2 className="form-title">Send us a Message</h2>
                <p className="form-subtitle">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                {isSubmitted ? (
                  <motion.div
                    className="success-message"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle size={48} />
                    <h3>Message Sent!</h3>
                    <p>Thank you for contacting us. We'll get back to you soon.</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
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
                      ></textarea>
                    </div>

                    <motion.button
                      type="submit"
                      className="btn btn-primary submit-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Send size={20} />
                      Send Message
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="contact-info-container"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="contact-info">
                <h2 className="info-title">Contact Information</h2>
                <p className="info-subtitle">
                  Get in touch with us through any of these channels.
                </p>

                <div className="contact-info-grid">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.link}
                      className="contact-info-item"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="info-icon">
                        {info.icon}
                      </div>
                      <div className="info-content">
                        <h3 className="info-item-title">{info.title}</h3>
                        <p className="info-item-content">{info.content}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                <div className="contact-faq">
                  <h3 className="faq-title">Frequently Asked Questions</h3>
                  <div className="faq-item">
                    <h4>How long does file conversion take?</h4>
                    <p>Most files are converted within 30 seconds to 2 minutes, depending on file size and format.</p>
                  </div>
                  <div className="faq-item">
                    <h4>Is my data secure?</h4>
                    <p>Yes! All files are encrypted and automatically deleted after processing. We never store your files permanently.</p>
                  </div>
                  <div className="faq-item">
                    <h4>What file formats do you support?</h4>
                    <p>We support 50+ formats including images, videos, audio, and documents. Check our services page for the complete list.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 