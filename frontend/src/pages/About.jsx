import React from 'react'
import { Helmet } from 'react-helmet-async'

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Taliyo Technologies | ConvertFlix</title>
        <meta name="description" content="Learn about Taliyo Technologies and our mission to provide free, high-quality file compression and conversion tools." />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About Taliyo Technologies
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              We're dedicated to providing free, high-quality tools that help people work more efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-text-secondary mb-4">
                At Taliyo Technologies, we believe that powerful tools should be accessible to everyone. 
                That's why we've created ConvertFlix - a comprehensive file compression and conversion 
                platform that's completely free to use.
              </p>
              <p className="text-text-secondary">
                Our mission is to help individuals and businesses optimize their digital workflows 
                by providing fast, secure, and reliable file processing tools.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Why Choose Us</h2>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  Completely free to use
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  No registration required
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  Fast and secure processing
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  Support for multiple formats
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  Automatic file cleanup
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-8">Our Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card text-center">
                <div className="text-3xl mb-3">🖼️</div>
                <h3 className="font-semibold mb-2">Image Compression</h3>
                <p className="text-text-secondary text-sm">
                  Reduce image file size while maintaining quality
                </p>
              </div>
              
              <div className="card text-center">
                <div className="text-3xl mb-3">🎥</div>
                <h3 className="font-semibold mb-2">Video Compression</h3>
                <p className="text-text-secondary text-sm">
                  Shrink video files without losing quality
                </p>
              </div>
              
              <div className="card text-center">
                <div className="text-3xl mb-3">🎵</div>
                <h3 className="font-semibold mb-2">Audio Compression</h3>
                <p className="text-text-secondary text-sm">
                  Reduce audio file size efficiently
                </p>
              </div>
              
              <div className="card text-center">
                <div className="text-3xl mb-3">📄</div>
                <h3 className="font-semibold mb-2">PDF Compression</h3>
                <p className="text-text-secondary text-sm">
                  Make PDF files smaller and faster
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Get Started Today</h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Ready to optimize your files? Start using our free tools right now. 
              No registration required, no hidden fees, just powerful file processing tools.
            </p>
            <a href="/" className="btn btn-primary text-lg px-8 py-4">
              Start Compressing Files
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default About 