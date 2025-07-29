import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>FlixConvert - File Compression & Conversion Tool</title>
        <meta name="description" content="Compress and convert any file type with instant compression and 40% size reduction. Free online file compression tool." />
      </Helmet>

      <div className="page-container">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">Welcome to FlixConvert</h1>
            <p className="page-subtitle">
              Compress and convert your files instantly with our advanced tools
            </p>
          </div>

          <div className="card-grid">
            <div className="card">
              <h3>Image Compression</h3>
              <p>Reduce image file size while maintaining quality</p>
              <Link to="/compress-image" className="btn btn-primary">
                Compress Images
              </Link>
            </div>

            <div className="card">
              <h3>Video Compression</h3>
              <p>Compress video files with advanced algorithms</p>
              <Link to="/compress-video" className="btn btn-primary">
                Compress Videos
              </Link>
            </div>

            <div className="card">
              <h3>Audio Compression</h3>
              <p>Reduce audio file size without losing quality</p>
              <Link to="/compress-audio" className="btn btn-primary">
                Compress Audio
              </Link>
            </div>

            <div className="card">
              <h3>PDF Compression</h3>
              <p>Compress PDF documents while preserving quality</p>
              <Link to="/compress-pdf" className="btn btn-primary">
                Compress PDFs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home