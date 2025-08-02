import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import './Tools.css'

const Tools = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const tools = [
    {
      id: 'compress-image',
      name: 'Compress Image',
      description: 'Reduce image file size while maintaining quality',
      category: 'compress',
      icon: '🖼️',
      formats: ['JPG', 'PNG', 'WebP'],
      maxSize: '10MB'
    },
    {
      id: 'compress-pdf',
      name: 'Compress PDF',
      description: 'Reduce PDF file size for easier sharing',
      category: 'compress',
      icon: '📄',
      formats: ['PDF'],
      maxSize: '10MB'
    },
    {
      id: 'compress-video',
      name: 'Compress Video',
      description: 'Reduce video file size with quality control',
      category: 'compress',
      icon: '🎬',
      formats: ['MP4', 'AVI', 'MOV'],
      maxSize: '10MB'
    },
    {
      id: 'convert-audio',
      name: 'Convert Audio',
      description: 'Convert between audio formats',
      category: 'convert',
      icon: '🎵',
      formats: ['MP3', 'WAV', 'AAC', 'OGG'],
      maxSize: '10MB'
    },
    {
      id: 'convert-image',
      name: 'Convert Image',
      description: 'Convert images between different formats',
      category: 'convert',
      icon: '🔄',
      formats: ['JPG', 'PNG', 'WebP', 'GIF'],
      maxSize: '10MB'
    },
    {
      id: 'convert-document',
      name: 'Convert Document',
      description: 'Convert documents between formats',
      category: 'convert',
      icon: '📝',
      formats: ['PDF', 'DOC', 'DOCX'],
      maxSize: '10MB'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Tools' },
    { id: 'compress', name: 'Compress' },
    { id: 'convert', name: 'Convert' }
  ]

  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory)

  return (
    <>
      <Helmet>
        <title>Tools - ConvertFlix</title>
        <meta name="description" content="Explore our collection of file compression and conversion tools. Free up to 10MB." />
      </Helmet>

      <div className="tools-page">
        <div className="container">
          {/* Header */}
          <div className="tools-header">
            <h1 className="page-title">Our Tools</h1>
            <p className="page-description">
              Choose from our collection of powerful file processing tools. 
              All tools are free for files up to 10MB.
            </p>
          </div>

          {/* Category Filter */}
          <div className="category-filter">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="tools-grid">
            {filteredTools.map(tool => (
              <Link 
                key={tool.id} 
                to={`/tool/${tool.id}`}
                className="tool-card card"
              >
                <div className="tool-icon">{tool.icon}</div>
                <h3 className="tool-name">{tool.name}</h3>
                <p className="tool-description">{tool.description}</p>
                <div className="tool-details">
                  <div className="tool-formats">
                    <span className="label">Formats:</span>
                    <span className="formats">{tool.formats.join(', ')}</span>
                  </div>
                  <div className="tool-size">
                    <span className="label">Max Size:</span>
                    <span className="size">{tool.maxSize}</span>
                  </div>
                </div>
                <div className="tool-arrow">→</div>
              </Link>
            ))}
          </div>

          {/* Info Section */}
          <div className="tools-info">
            <div className="info-card card">
              <h3>How It Works</h3>
              <ol>
                <li>Select a tool from our collection</li>
                <li>Upload your file (up to 10MB)</li>
                <li>Process and download your result</li>
                <li>Files are automatically deleted after 24 hours</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tools 