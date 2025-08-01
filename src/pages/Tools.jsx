import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Tools.css';

const Tools = () => {
  const tools = [
    {
      category: 'Compress',
      items: [
        {
          id: 'compress-image',
          name: 'Compress Image',
          description: 'Reduce image file size while maintaining quality',
          icon: '🖼️',
          formats: ['JPG', 'PNG', 'WebP', 'AVIF'],
          maxSize: '10MB'
        },
        {
          id: 'compress-pdf',
          name: 'Compress PDF',
          description: 'Reduce PDF file size for easier sharing',
          icon: '📄',
          formats: ['PDF'],
          maxSize: '10MB'
        },
        {
          id: 'compress-video',
          name: 'Compress Video',
          description: 'Reduce video file size without losing quality',
          icon: '🎬',
          formats: ['MP4', 'AVI', 'MOV', 'MKV'],
          maxSize: '10MB'
        }
      ]
    },
    {
      category: 'Convert',
      items: [
        {
          id: 'convert-audio',
          name: 'Convert Audio',
          description: 'Convert between audio formats easily',
          icon: '🎵',
          formats: ['MP3', 'WAV', 'AAC', 'OGG', 'FLAC'],
          maxSize: '10MB'
        },
        {
          id: 'convert-video',
          name: 'Convert Video',
          description: 'Convert videos to different formats',
          icon: '🎥',
          formats: ['MP4', 'AVI', 'MOV', 'MKV', 'WebM'],
          maxSize: '10MB'
        },
        {
          id: 'convert-image',
          name: 'Convert Image',
          description: 'Convert images between different formats',
          icon: '🖼️',
          formats: ['JPG', 'PNG', 'WebP', 'AVIF', 'BMP'],
          maxSize: '10MB'
        }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>All Tools - ConvertFlix</title>
        <meta name="description" content="Browse all file compression and conversion tools available on ConvertFlix. Compress images, convert audio, and more." />
      </Helmet>

      <div className="tools-page">
        <div className="tools-container">
          <div className="tools-header">
            <h1 className="tools-title">All Tools</h1>
            <p className="tools-subtitle">
              Choose from our collection of file compression and conversion tools
            </p>
          </div>

          {tools.map((category) => (
            <div key={category.category} className="tools-category">
              <h2 className="category-title">{category.category}</h2>
              <div className="tools-grid">
                {category.items.map((tool) => (
                  <Link 
                    key={tool.id} 
                    to={`/tool/${tool.id}`} 
                    className="tool-card"
                  >
                    <div className="tool-icon">{tool.icon}</div>
                    <div className="tool-content">
                      <h3 className="tool-name">{tool.name}</h3>
                      <p className="tool-description">{tool.description}</p>
                      <div className="tool-meta">
                        <div className="tool-formats">
                          <span className="formats-label">Formats:</span>
                          <span className="formats-list">
                            {tool.formats.join(', ')}
                          </span>
                        </div>
                        <div className="tool-size">
                          <span className="size-label">Max Size:</span>
                          <span className="size-value">{tool.maxSize}</span>
                        </div>
                      </div>
                    </div>
                    <div className="tool-arrow">→</div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="tools-info">
            <div className="info-card">
              <h3>💡 How it works</h3>
              <p>Upload your file, choose your settings, and download the processed file instantly. All files are automatically deleted after 24 hours for your privacy.</p>
            </div>
            <div className="info-card">
              <h3>🔒 Privacy First</h3>
              <p>Your files are processed locally in your browser. We never store or access your files on our servers.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tools; 