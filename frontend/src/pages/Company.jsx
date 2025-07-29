import React from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiUsers, FiAward, FiHeart } from 'react-icons/fi';
import '../styles/components.css';

const Company = () => {
  return (
    <div className="page-container">
      <div className="container">
        {/* Hero Section */}
        <div className="page-header">
          <h1 className="page-title">About FlixConvert</h1>
          <p className="page-subtitle">
            Empowering creators with powerful, easy-to-use media conversion tools
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-8">
          <div className="card">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                At FlixConvert, we believe that content creation should be accessible to everyone. 
                Our mission is to provide professional-grade media conversion tools that are both 
                powerful and easy to use, helping creators bring their vision to life.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community First</h3>
              <p className="text-gray-600">
                We prioritize our users' needs and build tools that serve the creative community.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-gray-600">
                We maintain the highest standards in our tools and user experience.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHeart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Passion</h3>
              <p className="text-gray-600">
                We're passionate about helping creators achieve their goals.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-1">John Doe</h3>
              <p className="text-blue-600 mb-2">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                Passionate about making media tools accessible to everyone.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-1">Jane Smith</h3>
              <p className="text-blue-600 mb-2">Lead Developer</p>
              <p className="text-gray-600 text-sm">
                Expert in building scalable and user-friendly applications.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-1">Mike Johnson</h3>
              <p className="text-blue-600 mb-2">UX Designer</p>
              <p className="text-gray-600 text-sm">
                Creating beautiful and intuitive user experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-6">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FiMail className="w-5 h-5 text-blue-600" />
                  <span>hello@flixconvert.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiPhone className="w-5 h-5 text-blue-600" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiMapPin className="w-5 h-5 text-blue-600" />
                  <span>123 Innovation Drive, Tech City, TC 12345</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiClock className="w-5 h-5 text-blue-600" />
                  <span>Mon-Fri: 9AM-6PM EST</span>
                </div>
              </div>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Send us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input 
                    type="text" 
                    className="form-input w-full"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    className="form-input w-full"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea 
                    className="form-input w-full h-32"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Files Converted</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Company; 