import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiShield, 
  FiZap, 
  FiUsers, 
  FiHeart,
  FiMail,
  FiGithub,
  FiTwitter
} from 'react-icons/fi';

const Company = () => {
  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-color to-primary-hover text-white">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            About ConvertFlix
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to make file compression and conversion accessible to everyone. 
            Our platform combines cutting-edge technology with user-friendly design to deliver 
            the best file processing experience.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-bg-primary">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                At ConvertFlix, we believe that powerful tools should be accessible to everyone. 
                Whether you're a professional designer, a student working on a project, or just 
                someone who needs to compress a few files, our platform is designed for you.
              </p>
              <p className="text-lg text-text-secondary leading-relaxed">
                We prioritize privacy, security, and ease of use. Your files are automatically 
                deleted after 24 hours, and we never store your data permanently. Our advanced 
                algorithms ensure maximum compression while preserving quality.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="card text-center">
                <div className="w-16 h-16 bg-primary-color bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiZap size={32} className="text-primary-color" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">Fast Processing</h3>
                <p className="text-text-secondary">Lightning-fast compression and conversion</p>
              </div>
              <div className="card text-center">
                <div className="w-16 h-16 bg-success-color bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiShield size={32} className="text-success-color" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">Secure & Private</h3>
                <p className="text-text-secondary">Your data is automatically deleted</p>
              </div>
              <div className="card text-center">
                <div className="w-16 h-16 bg-accent-color bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiUsers size={32} className="text-accent-color" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">User-Friendly</h3>
                <p className="text-text-secondary">Simple interface for everyone</p>
              </div>
              <div className="card text-center">
                <div className="w-16 h-16 bg-warning-color bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiHeart size={32} className="text-warning-color" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">Quality Preserved</h3>
                <p className="text-text-secondary">No quality loss guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-bg-secondary">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Our comprehensive suite of tools covers all your file processing needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center">
              <h3 className="text-xl font-semibold text-text-primary mb-3">Image Compression</h3>
              <p className="text-text-secondary">
                Compress JPEG, PNG, GIF, WebP, AVIF, and TIFF files with advanced algorithms
              </p>
            </div>
            <div className="card text-center">
              <h3 className="text-xl font-semibold text-text-primary mb-3">Video Conversion</h3>
              <p className="text-text-secondary">
                Convert between MP4, AVI, MOV, WebM formats with quality preservation
              </p>
            </div>
            <div className="card text-center">
              <h3 className="text-xl font-semibold text-text-primary mb-3">Audio Processing</h3>
              <p className="text-text-secondary">
                Compress and convert audio files between MP3, WAV, AAC, and OGG formats
              </p>
            </div>
            <div className="card text-center">
              <h3 className="text-xl font-semibold text-text-primary mb-3">PDF Compression</h3>
              <p className="text-text-secondary">
                Reduce PDF file sizes while maintaining document quality and readability
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-20 bg-bg-primary">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
              Privacy & Security
            </h2>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              Your privacy is our top priority. We've built ConvertFlix with security in mind from the ground up.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-success-color bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiShield size={32} className="text-success-color" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">Auto-Delete</h3>
                <p className="text-text-secondary">
                  All files are automatically deleted after 24 hours for your privacy
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-color bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiZap size={32} className="text-primary-color" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">No Registration</h3>
                <p className="text-text-secondary">
                  Use our tools without creating an account - no personal data required
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-color bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiUsers size={32} className="text-accent-color" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">Secure Processing</h3>
                <p className="text-text-secondary">
                  Files are processed securely and never shared with third parties
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Have questions, suggestions, or feedback? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-color bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMail size={32} className="text-primary-color" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Email</h3>
              <p className="text-text-secondary mb-4">support@flixconvert.com</p>
              <p className="text-sm text-text-muted">
                Get help with technical issues or general inquiries
              </p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-accent-color bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiGithub size={32} className="text-accent-color" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">GitHub</h3>
              <p className="text-text-secondary mb-4">github.com/flixconvert</p>
              <p className="text-sm text-text-muted">
                Open source contributions and issue reporting
              </p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-color bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTwitter size={32} className="text-primary-color" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Twitter</h3>
              <p className="text-text-secondary mb-4">@flixconvert</p>
              <p className="text-sm text-text-muted">
                Follow us for updates and announcements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Section */}
      <section className="py-20 bg-bg-primary">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-8 text-center">
              Legal Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-xl font-semibold text-text-primary mb-4">Terms of Service</h3>
                <div className="space-y-3 text-text-secondary">
                  <p>By using ConvertFlix, you agree to:</p>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Use our service responsibly and legally</li>
                    <li>Not upload malicious or copyrighted content</li>
                    <li>Accept that files are automatically deleted after 24 hours</li>
                    <li>Understand that we provide the service "as is"</li>
                    <li>Accept our right to modify or discontinue the service</li>
                  </ul>
                </div>
              </div>
              
              <div className="card">
                <h3 className="text-xl font-semibold text-text-primary mb-4">Privacy Policy</h3>
                <div className="space-y-3 text-text-secondary">
                  <p>We are committed to protecting your privacy:</p>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>We don't collect personal information unless you register</li>
                    <li>Files are automatically deleted after 24 hours</li>
                    <li>We don't share your data with third parties</li>
                    <li>We use industry-standard security measures</li>
                    <li>We may use cookies for essential functionality</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-color to-primary-hover text-white">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust ConvertFlix for their file compression and conversion needs.
          </p>
          <Link
            to="/tools"
            className="btn btn-lg bg-white text-primary-color hover:bg-gray-100 inline-flex items-center"
          >
            Start Converting Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Company; 