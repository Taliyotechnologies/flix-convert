import React, { useState } from 'react'
import FileUpload from '../components/FileUpload'
import CompressionPreview from '../components/CompressionPreview'
import Stats from '../components/Stats'
import './Home.css'

const Home = () => {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [isCompressing, setIsCompressing] = useState(false)

  const handleFileUpload = async (files) => {
    setIsCompressing(true)
    
    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        
        const response = await fetch(`/api/compress/${file.type.split('/')[0]}`, {
          method: 'POST',
          body: formData,
        })
        
        if (!response.ok) {
          throw new Error('Compression failed')
        }
        
        const result = await response.json()
        return {
          id: result.fileId,
          originalFile: file,
          compressedFile: result.compressedFile,
          originalSize: file.size,
          compressedSize: result.compressedSize,
          compressionRatio: result.compressionRatio,
          type: file.type,
          name: file.name,
          uploadedAt: new Date(),
        }
      })
      
      const results = await Promise.all(uploadPromises)
      setUploadedFiles(prev => [...prev, ...results])
    } catch (error) {
      console.error('Upload failed:', error)
      alert('File upload failed. Please try again.')
    } finally {
      setIsCompressing(false)
    }
  }

  return (
    <div className="home">
      <div className="container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Compress & Convert Files
              <span className="gradient-text"> Instantly</span>
            </h1>
            <p className="hero-subtitle">
              Reduce file sizes by up to 40% while maintaining quality. 
              Support for images, videos, audio, and PDF files.
            </p>
            <div className="hero-features">
              <div className="feature">
                <span className="feature-icon">⚡</span>
                <span>Instant Compression</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🔒</span>
                <span>Secure & Private</span>
              </div>
              <div className="feature">
                <span className="feature-icon">📱</span>
                <span>Mobile Friendly</span>
              </div>
            </div>
          </div>
        </section>

        {/* File Upload Section */}
        <section className="upload-section">
          <FileUpload 
            onFileUpload={handleFileUpload}
            isCompressing={isCompressing}
          />
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <Stats />
        </section>

        {/* Compression Preview Section */}
        {uploadedFiles.length > 0 && (
          <section className="preview-section">
            <h2 className="section-title">Recent Compressions</h2>
            <div className="preview-grid">
              {uploadedFiles.map((file) => (
                <CompressionPreview 
                  key={file.id}
                  file={file}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default Home