import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './Tools.css';

const Tools = () => {
  const tools = [
    {
      type: 'image',
      title: 'Image Tools',
      description: 'Compress and convert images to different formats',
      icon: '🖼️',
      features: ['JPEG, PNG, WebP support', 'Quality control', 'Batch processing']
    },
    {
      type: 'video',
      title: 'Video Tools',
      description: 'Compress and convert videos to various formats',
      icon: '🎥',
      features: ['MP4, AVI, MOV support', 'Quality settings', 'Fast processing']
    },
    {
      type: 'audio',
      title: 'Audio Tools',
      description: 'Compress and convert audio files',
      icon: '🎵',
      features: ['MP3, WAV, FLAC support', 'Bitrate control', 'High quality']
    },
    {
      type: 'pdf',
      title: 'PDF Tools',
      description: 'Compress and convert PDF documents',
      icon: '📄',
      features: ['PDF compression', 'Format conversion', 'Secure processing']
    }
  ];

  return (
    <>
      <Helmet>
        <title>All Tools - ConvertFlix</title>
        <meta name="description" content="Browse all file compression and conversion tools available on ConvertFlix." />
      </Helmet>

      <div className="tools-page">
        <div className="container">
          <div className="tools-header">
            <h1>All Tools</h1>
            <p>Choose the right tool for your file compression and conversion needs</p>
          </div>

          <div className="tools-grid">
            {tools.map((tool) => (
              <div key={tool.type} className="tool-card">
                <div className="tool-icon">{tool.icon}</div>
                <h3 className="tool-title">{tool.title}</h3>
                <p className="tool-description">{tool.description}</p>
                <ul className="tool-features">
                  {tool.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <Link to={`/tool/${tool.type}`} className="btn btn-primary tool-btn">
                  Use {tool.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tools; 