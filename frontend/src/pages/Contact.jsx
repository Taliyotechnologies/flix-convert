import React from 'react'
import { Helmet } from 'react-helmet-async'

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - Taliyo Technologies | ConvertFlix</title>
        <meta name="description" content="Get in touch with Taliyo Technologies. We're here to help with any questions about our file compression and conversion tools." />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Have questions or need support? We're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">📧</div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-text-secondary">
                      harshbudhauliya882@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-2xl">🏢</div>
                  <div>
                    <h3 className="font-semibold mb-1">Company</h3>
                    <p className="text-text-secondary">
                      Taliyo Technologies
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-2xl">🌐</div>
                  <div>
                    <h3 className="font-semibold mb-1">Website</h3>
                    <p className="text-text-secondary">
                      taliyotechnologies.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="card">
                  <h3 className="font-semibold mb-2">Is ConvertFlix really free?</h3>
                  <p className="text-text-secondary text-sm">
                    Yes! All our tools are completely free to use. No hidden fees, no registration required.
                  </p>
                </div>

                <div className="card">
                  <h3 className="font-semibold mb-2">How secure are my files?</h3>
                  <p className="text-text-secondary text-sm">
                    Your files are automatically deleted after 24 hours. We don't store or access your data.
                  </p>
                </div>

                <div className="card">
                  <h3 className="font-semibold mb-2">What file formats are supported?</h3>
                  <p className="text-text-secondary text-sm">
                    We support images (JPEG, PNG, WebP, AVIF), videos (MP4, AVI, MOV, WebM), 
                    audio (MP3, AAC, OGG, WAV, FLAC), and PDF files.
                  </p>
                </div>

                <div className="card">
                  <h3 className="font-semibold mb-2">What's the maximum file size?</h3>
                  <p className="text-text-secondary text-sm">
                    You can upload files up to 10MB in size for processing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Start using our free file compression and conversion tools right now. 
              No registration required!
            </p>
            <a href="/" className="btn btn-primary text-lg px-8 py-4">
              Start Using ConvertFlix
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact 