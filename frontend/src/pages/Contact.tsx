import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  MessageCircle,
  Users,
  Zap,
  Shield
} from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Contact form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'support@flixconvert.com',
      description: 'Get in touch with our support team',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Call us during business hours',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    },
    {
      icon: MapPin,
      title: 'Address',
      value: '123 Tech Street, Silicon Valley, CA 94025',
      description: 'Visit our headquarters',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      value: 'Mon - Fri: 9:00 AM - 6:00 PM PST',
      description: 'We\'re here to help you',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
    }
  ];

  const features = [
    { icon: MessageCircle, text: '24/7 Support', color: 'text-primary-color' },
    { icon: Users, text: 'Expert Team', color: 'text-success-color' },
    { icon: Zap, text: 'Fast Response', color: 'text-accent-color' },
    { icon: Shield, text: 'Secure Communication', color: 'text-warning-color' }
  ];

  return (
    <div className="min-h-screen bg-bg-secondary py-12 lg:py-20">
      <div className="container">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Get in Touch</h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Have questions about our services? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <div className="card animate-slide-in">
            <h2 className="text-2xl font-bold mb-8 gradient-text">Send us a Message</h2>
            
            {isSubmitted ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-20 h-20 bg-gradient-success rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Message Sent!</h3>
                <p className="text-text-secondary mb-8 text-lg leading-relaxed">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn btn-primary text-lg px-8 py-4 shadow-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-3">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="input"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-3">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="input"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-3">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    className="input"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-3">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="input resize-none"
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full flex items-center justify-center gap-3 text-lg py-4 shadow-xl"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold mb-6 gradient-text">Contact Information</h2>
              <p className="text-text-secondary mb-8 text-lg leading-relaxed">
                We're here to help and answer any questions you might have. 
                We look forward to hearing from you.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                      style={{ background: info.gradient }}
                    >
                      <Icon size={28} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-2">{info.title}</h3>
                      <p className="text-primary-color font-medium mb-2 text-lg">{info.value}</p>
                      <p className="text-text-secondary">{info.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Icon size={20} className="text-white" />
                    </div>
                    <p className={`text-sm font-medium ${feature.color}`}>{feature.text}</p>
                  </div>
                );
              })}
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-6 gradient-text">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="card hover:shadow-lg transition-all duration-300">
                  <h4 className="font-semibold mb-3 text-lg">What file formats do you support?</h4>
                  <p className="text-text-secondary leading-relaxed">
                    We support over 50 file formats including images (JPG, PNG, WebP), 
                    videos (MP4, AVI, MOV), documents (PDF, DOCX), and audio files (MP3, WAV, FLAC).
                  </p>
                </div>
                
                <div className="card hover:shadow-lg transition-all duration-300">
                  <h4 className="font-semibold mb-3 text-lg">Is my data secure?</h4>
                  <p className="text-text-secondary leading-relaxed">
                    Yes, we use end-to-end encryption and automatically delete your files 
                    after processing. Your privacy and security are our top priorities.
                  </p>
                </div>
                
                <div className="card hover:shadow-lg transition-all duration-300">
                  <h4 className="font-semibold mb-3 text-lg">How long does processing take?</h4>
                  <p className="text-text-secondary leading-relaxed">
                    Most files are processed within 1-2 minutes. Larger files may take 
                    up to 5 minutes depending on the file size and format.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 