import React from 'react'
import { Helmet } from 'react-helmet-async'
import FileUpload from '../components/FileUpload'
import { compressAPI } from '../services/api'

const CompressImage = ({ showToast }) => {
  const supportedFormats = ['jpg', 'jpeg', 'png', 'webp', 'avif']

  const handleProcess = async (formData) => {
    return await compressAPI.image(formData)
  }

  return (
    <>
      <Helmet>
        <title>Compress Image - Free Online Image Compression Tool | ConvertFlix</title>
        <meta name="description" content="Free online image compression tool. Reduce image file size while maintaining quality. Support JPEG, PNG, WebP, and AVIF formats." />
        <meta name="keywords" content="image compression, compress image, reduce image size, JPEG compression, PNG compression, WebP compression, free image tool" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Compress Image - Free Online Image Compression Tool" />
        <meta property="og:description" content="Free online image compression tool. Reduce image file size while maintaining quality." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flixconvert.taliyotechnologies.com/compress/image" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Compress Image - Free Online Image Compression Tool" />
        <meta name="twitter:description" content="Free online image compression tool. Reduce image file size while maintaining quality." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Image Compression Tool",
          "description": "Free online image compression tool",
          "url": "https://flixconvert.taliyotechnologies.com/compress/image",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }
        `}
        </script>
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🖼️ Compress Image
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Reduce image file size while maintaining quality. 
              Support for JPEG, PNG, WebP, and AVIF formats.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="card text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold mb-2">Fast Processing</h3>
              <p className="text-text-secondary text-sm">
                Compress images in seconds with our optimized algorithms
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl mb-3">💎</div>
              <h3 className="font-semibold mb-2">High Quality</h3>
              <p className="text-text-secondary text-sm">
                Maintain visual quality while reducing file size
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-semibold mb-2">Secure</h3>
              <p className="text-text-secondary text-sm">
                Files are automatically deleted after 24 hours
              </p>
            </div>
          </div>

          {/* File Upload */}
          <FileUpload
            fileType="image"
            operation="Image Compression"
            supportedFormats={supportedFormats}
            onProcess={handleProcess}
            showToast={showToast}
          />

          {/* How it works */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">
              How Image Compression Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">📤</div>
                <h3 className="font-semibold mb-2">1. Upload Image</h3>
                <p className="text-text-secondary text-sm">
                  Drag and drop or click to upload your image file
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">⚙️</div>
                <h3 className="font-semibold mb-2">2. Process</h3>
                <p className="text-text-secondary text-sm">
                  Our algorithm optimizes the image for smaller size
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">📥</div>
                <h3 className="font-semibold mb-2">3. Download</h3>
                <p className="text-text-secondary text-sm">
                  Download your compressed image instantly
                </p>
              </div>
            </div>
          </div>

          {/* Supported Formats */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">
              Supported Image Formats
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {supportedFormats.map((format) => (
                <div key={format} className="card text-center">
                  <div className="text-2xl mb-2">📄</div>
                  <h3 className="font-semibold">{format.toUpperCase()}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CompressImage 