import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const Home = ({ showToast }) => {
  const tools = [
    {
      title: 'Compress Image',
      description: 'Reduce image file size while maintaining quality',
      icon: '🖼️',
      path: '/compress/image',
      category: 'compression',
      formats: ['JPEG', 'PNG', 'WebP', 'AVIF']
    },
    {
      title: 'Compress Video',
      description: 'Shrink video files without losing quality',
      icon: '🎥',
      path: '/compress/video',
      category: 'compression',
      formats: ['MP4', 'AVI', 'MOV', 'WebM']
    },
    {
      title: 'Compress Audio',
      description: 'Reduce audio file size efficiently',
      icon: '🎵',
      path: '/compress/audio',
      category: 'compression',
      formats: ['MP3', 'AAC', 'OGG', 'WAV']
    },
    {
      title: 'Compress PDF',
      description: 'Make PDF files smaller and faster',
      icon: '📄',
      path: '/compress/pdf',
      category: 'compression',
      formats: ['PDF']
    },
    {
      title: 'Convert Image',
      description: 'Convert images between different formats',
      icon: '🔄',
      path: '/convert/image',
      category: 'conversion',
      formats: ['JPEG', 'PNG', 'WebP', 'AVIF']
    },
    {
      title: 'Convert Video',
      description: 'Convert videos to different formats',
      icon: '🎬',
      path: '/convert/video',
      category: 'conversion',
      formats: ['MP4', 'AVI', 'MOV', 'WebM']
    },
    {
      title: 'Convert Audio',
      description: 'Convert audio files between formats',
      icon: '🎧',
      path: '/convert/audio',
      category: 'conversion',
      formats: ['MP3', 'AAC', 'OGG', 'WAV', 'FLAC']
    },
    {
      title: 'Convert PDF',
      description: 'Process and optimize PDF files',
      icon: '📋',
      path: '/convert/pdf',
      category: 'conversion',
      formats: ['PDF']
    }
  ]

  return (
    <>
      <Helmet>
        <title>ConvertFlix - Free File Compression & Conversion Tool | Taliyo Technologies</title>
        <meta name="description" content="Free online file compression and conversion tool. Compress images, videos, audio, and PDF files with up to 40% size reduction. Fast, secure, and easy to use." />
        <meta name="keywords" content="file compression, file conversion, image compression, video compression, audio compression, PDF compression, free tools, Taliyo Technologies" />
        
        {/* Open Graph */}
        <meta property="og:title" content="ConvertFlix - Free File Compression & Conversion Tool" />
        <meta property="og:description" content="Free online file compression and conversion tool. Compress images, videos, audio, and PDF files with up to 40% size reduction." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flixconvert.taliyotechnologies.com/" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ConvertFlix - Free File Compression & Conversion Tool" />
        <meta name="twitter:description" content="Free online file compression and conversion tool. Compress images, videos, audio, and PDF files with up to 40% size reduction." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-20">
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Free File Compression & Conversion
              </h1>
              <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                Compress and convert your files with up to 40% size reduction. 
                Fast, secure, and completely free. No registration required.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/compress/image" 
                  className="btn btn-primary text-lg px-8 py-4"
                >
                  🖼️ Compress Image
                </Link>
                <Link 
                  to="/compress/video" 
                  className="btn btn-secondary text-lg px-8 py-4"
                >
                  🎥 Compress Video
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose ConvertFlix?
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Professional-grade file processing tools available for free
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-text-secondary">
                  Process files in seconds with our optimized algorithms
                </p>
              </div>
              
              <div className="card text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold mb-2">100% Secure</h3>
                <p className="text-text-secondary">
                  Your files are automatically deleted after 24 hours
                </p>
              </div>
              
              <div className="card text-center">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-xl font-semibold mb-2">High Quality</h3>
                <p className="text-text-secondary">
                  Maintain quality while reducing file size by up to 40%
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-20 bg-surface">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                All-in-One File Tools
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Everything you need to compress and convert your files
              </p>
            </div>

            {/* Compression Tools */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-center">
                Compression Tools
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tools.filter(tool => tool.category === 'compression').map((tool, index) => (
                  <Link 
                    key={index} 
                    to={tool.path}
                    className="card hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="text-3xl mb-4">{tool.icon}</div>
                    <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {tool.title}
                    </h4>
                    <p className="text-text-secondary text-sm mb-3">
                      {tool.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {tool.formats.map((format, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                        >
                          {format}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Conversion Tools */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-center">
                Conversion Tools
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tools.filter(tool => tool.category === 'conversion').map((tool, index) => (
                  <Link 
                    key={index} 
                    to={tool.path}
                    className="card hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="text-3xl mb-4">{tool.icon}</div>
                    <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {tool.title}
                    </h4>
                    <p className="text-text-secondary text-sm mb-3">
                      {tool.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {tool.formats.map((format, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                        >
                          {format}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-hover text-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Optimize Your Files?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Start compressing and converting your files right now. 
                No registration required, completely free.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/compress/image" 
                  className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4"
                >
                  Get Started
                </Link>
                <Link 
                  to="/about" 
                  className="btn border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home 