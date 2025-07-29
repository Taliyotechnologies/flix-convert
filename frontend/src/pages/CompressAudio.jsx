import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import FileUploader from '../components/FileUploader'
import { FiMusic, FiInfo, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'

const CompressAudio = () => {
  const [compressionResult, setCompressionResult] = useState(null)

  const handleFileUpload = async (file) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('https://flix-convert.onrender.com/api/files/compress', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Upload failed')
      }

      const result = await response.json()
      setCompressionResult(result.data)
      return result.data
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    }
  }

  return (
    <>
      <Helmet>
        <title>Compress Audio - ConvertFlix</title>
        <meta name="description" content="Compress audio files online with instant results. Reduce MP3, WAV, AAC, FLAC file sizes by up to 40% while maintaining quality." />
        <meta property="og:title" content="Compress Audio - ConvertFlix" />
        <meta property="og:description" content="Compress audio files online with instant results. Reduce MP3, WAV, AAC, FLAC file sizes by up to 40% while maintaining quality." />
        <meta property="twitter:title" content="Compress Audio - ConvertFlix" />
        <meta property="twitter:description" content="Compress audio files online with instant results. Reduce MP3, WAV, AAC, FLAC file sizes by up to 40% while maintaining quality." />
      </Helmet>

      <div className="container">
        <div className="page-header">
          <div className="page-icon">
            <FiMusic />
          </div>
          <h1>Compress Audio</h1>
          <p>
            Reduce audio file sizes by up to 40% while maintaining quality. 
            Support for MP3, WAV, AAC, FLAC, OGG, WMA, and M4A formats.
          </p>
        </div>

        <div className="upload-section">
          <FileUploader 
            onFileUpload={handleFileUpload}
            fileType="audio"
            maxSize={10 * 1024 * 1024} // 10MB
          />
        </div>

        {compressionResult && (
          <div className="results-section">
            <h3>Compression Results</h3>
            <div className="results-grid">
              <div className="result-item">
                <div className="result-label">Original Size</div>
                <div className="result-value">
                  {(compressionResult.originalSize / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
              <div className="result-item">
                <div className="result-label">Compressed Size</div>
                <div className="result-value">
                  {(compressionResult.compressedSize / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
              <div className="result-item">
                <div className="result-label">Size Reduction</div>
                <div className="result-value">
                  {compressionResult.compressionRatio.toFixed(1)}%
                </div>
              </div>
            </div>
            
            <div className="download-section">
              <a 
                href={`https://flix-convert.onrender.com${compressionResult.downloadUrl}`}
                className="btn btn-primary"
                download
              >
                <FiCheckCircle />
                Download Compressed Audio
              </a>
            </div>
          </div>
        )}

        <div className="info-section">
          <div className="info-card">
            <div className="info-header">
              <FiInfo />
              <h3>How Audio Compression Works</h3>
            </div>
            <div className="info-content">
              <ul>
                <li>Advanced AAC codec optimization for maximum compression</li>
                <li>Support for multiple formats: MP3, WAV, AAC, FLAC, OGG, WMA, M4A</li>
                <li>Maximum file size: 10MB (free tier)</li>
                <li>Files are automatically deleted after 24 hours</li>
                <li>No registration required - completely free to use</li>
              </ul>
            </div>
          </div>

          <div className="info-card">
            <div className="info-header">
              <FiAlertCircle />
              <h3>Tips for Best Results</h3>
            </div>
            <div className="info-content">
              <ul>
                <li>Use high-quality original audio for better compression</li>
                <li>AAC format provides excellent compression for most use cases</li>
                <li>MP3 is ideal for compatibility and web sharing</li>
                <li>Longer audio files typically achieve better compression ratios</li>
                <li>Audio with complex frequencies compress more effectively</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .page-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 2.5rem;
        }

        .page-header h1 {
          margin-bottom: 1rem;
        }

        .page-header p {
          color: var(--text-secondary);
          font-size: 1.125rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .upload-section {
          margin-bottom: 3rem;
        }

        .download-section {
          text-align: center;
          margin-top: 2rem;
        }

        .info-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 4rem;
        }

        .info-card {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          padding: 2rem;
        }

        .info-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          color: var(--accent-primary);
        }

        .info-header h3 {
          margin: 0;
          color: var(--text-primary);
        }

        .info-content ul {
          list-style: none;
          padding: 0;
        }

        .info-content li {
          padding: 0.5rem 0;
          color: var(--text-secondary);
          position: relative;
          padding-left: 1.5rem;
        }

        .info-content li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--success);
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .info-section {
            grid-template-columns: 1fr;
          }

          .page-icon {
            width: 60px;
            height: 60px;
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  )
}

export default CompressAudio