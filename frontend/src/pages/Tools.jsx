import { Link } from 'react-router-dom';
import { Image, Music, Video, FileText, Download, Settings, Shield } from 'lucide-react';
import './Tools.css';

const Tools = () => {
  const tools = {
    compress: [
      {
        id: 'compress-image',
        name: 'Compress Image',
        description: 'Reduce image file size while maintaining quality',
        icon: <Image size={32} />,
        formats: ['JPG', 'PNG', 'WebP', 'GIF'],
        maxSize: '10MB'
      },
      {
        id: 'compress-video',
        name: 'Compress Video',
        description: 'Reduce video file size with quality preservation',
        icon: <Video size={32} />,
        formats: ['MP4', 'AVI', 'MOV', 'MKV'],
        maxSize: '10MB'
      },
      {
        id: 'compress-pdf',
        name: 'Compress PDF',
        description: 'Reduce PDF file size for easier sharing',
        icon: <FileText size={32} />,
        formats: ['PDF'],
        maxSize: '10MB'
      }
    ],
    convert: [
      {
        id: 'convert-audio',
        name: 'Convert Audio',
        description: 'Convert between audio formats',
        icon: <Music size={32} />,
        formats: ['MP3', 'WAV', 'AAC', 'OGG', 'FLAC'],
        maxSize: '10MB'
      },
      {
        id: 'convert-video',
        name: 'Convert Video',
        description: 'Convert video to different formats',
        icon: <Video size={32} />,
        formats: ['MP4', 'AVI', 'MOV', 'MKV', 'WebM'],
        maxSize: '10MB'
      },
      {
        id: 'convert-image',
        name: 'Convert Image',
        description: 'Convert images between formats',
        icon: <Image size={32} />,
        formats: ['JPG', 'PNG', 'WebP', 'GIF', 'BMP'],
        maxSize: '10MB'
      }
    ]
  };

  return (
    <div className="tools-page">
      <div className="container">
        {/* Header */}
        <div className="tools-header">
          <h1>All Tools</h1>
          <p>Professional file compression and conversion tools</p>
        </div>

        {/* Compress Section */}
        <section className="tools-section">
          <h2>Compress Files</h2>
          <p>Reduce file sizes while maintaining quality</p>
          <div className="tools-grid">
            {tools.compress.map((tool) => (
              <Link key={tool.id} to={`/tool/${tool.id}`} className="tool-card card">
                <div className="tool-icon">
                  {tool.icon}
                </div>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <div className="tool-details">
                  <div className="tool-formats">
                    <strong>Formats:</strong> {tool.formats.join(', ')}
                  </div>
                  <div className="tool-size">
                    <strong>Max Size:</strong> {tool.maxSize}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Convert Section */}
        <section className="tools-section">
          <h2>Convert Files</h2>
          <p>Convert files between different formats</p>
          <div className="tools-grid">
            {tools.convert.map((tool) => (
              <Link key={tool.id} to={`/tool/${tool.id}`} className="tool-card card">
                <div className="tool-icon">
                  {tool.icon}
                </div>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <div className="tool-details">
                  <div className="tool-formats">
                    <strong>Formats:</strong> {tool.formats.join(', ')}
                  </div>
                  <div className="tool-size">
                    <strong>Max Size:</strong> {tool.maxSize}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="tools-features">
          <div className="features-grid">
            <div className="feature-item">
              <Download size={24} />
              <h3>Free Up to 10MB</h3>
              <p>Process files up to 10MB completely free</p>
            </div>
            <div className="feature-item">
              <Settings size={24} />
              <h3>Advanced Options</h3>
              <p>Customize compression and conversion settings</p>
            </div>
            <div className="feature-item">
              <Shield size={24} />
              <h3>Secure Processing</h3>
              <p>Files are encrypted and auto-deleted after 24 hours</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tools; 