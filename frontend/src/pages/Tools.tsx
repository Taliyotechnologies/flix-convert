import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Image, Video, Music, FileText, FileImage, FileDown, Zap } from 'lucide-react';
import './Tools.css';

const Tools: React.FC = () => {
  const toolCategories = [
    {
      id: 'image',
      title: 'Image Tools',
      description: 'Compress and convert image files',
      icon: <Image size={24} />,
      color: '#FF6B6B',
      tools: [
        {
          id: 'compress-image',
          title: 'Compress Image',
          description: 'Reduce image file size while maintaining quality',
          icon: <Zap size={20} />,
          path: '/tools/compress-image',
          features: ['JPG, PNG, WebP support', 'Quality control', 'Batch processing']
        },
        {
          id: 'convert-image',
          title: 'Convert Image',
          description: 'Convert between different image formats',
          icon: <FileImage size={20} />,
          path: '/tools/convert-image',
          features: ['Multiple formats', 'High quality', 'Fast conversion']
        }
      ]
    },
    {
      id: 'video',
      title: 'Video Tools',
      description: 'Compress and convert video files',
      icon: <Video size={24} />,
      color: '#45B7D1',
      tools: [
        {
          id: 'compress-video',
          title: 'Compress Video',
          description: 'Reduce video file size with high quality',
          icon: <Zap size={20} />,
          path: '/tools/compress-video',
          features: ['MP4, AVI, MOV support', 'Quality settings', 'Fast processing']
        },
        {
          id: 'convert-video',
          title: 'Convert Video',
          description: 'Convert between different video formats',
          icon: <Video size={20} />,
          path: '/tools/convert-video',
          features: ['Multiple formats', 'Custom settings', 'Batch conversion']
        }
      ]
    },
    {
      id: 'audio',
      title: 'Audio Tools',
      description: 'Compress and convert audio files',
      icon: <Music size={24} />,
      color: '#FFEAA7',
      tools: [
        {
          id: 'compress-audio',
          title: 'Compress Audio',
          description: 'Reduce audio file size without quality loss',
          icon: <Zap size={20} />,
          path: '/tools/compress-audio',
          features: ['MP3, WAV, FLAC support', 'Quality control', 'Fast compression']
        },
        {
          id: 'convert-audio',
          title: 'Convert Audio',
          description: 'Convert between different audio formats',
          icon: <Music size={20} />,
          path: '/tools/convert-audio',
          features: ['Multiple formats', 'High quality', 'Batch processing']
        }
      ]
    },
    {
      id: 'document',
      title: 'Document Tools',
      description: 'Convert document files',
      icon: <FileText size={24} />,
      color: '#FF8A80',
      tools: [
        {
          id: 'convert-pdf',
          title: 'Convert PDF',
          description: 'Convert PDF to Word, Excel, or images',
          icon: <FileDown size={20} />,
          path: '/tools/convert-pdf',
          features: ['Word, Excel, Images', 'High accuracy', 'Fast conversion']
        }
      ]
    }
  ];

  return (
    <div className="tools-page">
      {/* Hero Section */}
      <section className="tools-hero">
        <div className="container">
          <div className="tools-hero-content">
            <h1>File Processing Tools</h1>
            <p>
              Professional tools to compress and convert your files. 
              Free up to 10MB, no registration required.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Categories */}
      <section className="tools-categories">
        <div className="container">
          {toolCategories.map((category) => (
            <div key={category.id} className="tool-category">
              <div className="category-header">
                <div className="category-icon" style={{ backgroundColor: category.color }}>
                  {category.icon}
                </div>
                <div className="category-info">
                  <h2>{category.title}</h2>
                  <p>{category.description}</p>
                </div>
              </div>
              
              <div className="category-tools">
                {category.tools.map((tool) => (
                  <Link key={tool.id} to={tool.path} className="tool-item">
                    <div className="tool-header">
                      <div className="tool-icon">
                        {tool.icon}
                      </div>
                      <div className="tool-info">
                        <h3>{tool.title}</h3>
                        <p>{tool.description}</p>
                      </div>
                      <ArrowRight size={20} className="tool-arrow" />
                    </div>
                    
                    <div className="tool-features">
                      {tool.features.map((feature, index) => (
                        <span key={index} className="tool-feature">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="tools-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Need Help Getting Started?</h2>
            <p>Check out our guides and tutorials to make the most of our tools</p>
            <div className="cta-actions">
              <Link to="/company" className="btn btn-primary btn-large">
                Learn More
                <ArrowRight size={20} />
              </Link>
              <Link to="/" className="btn btn-ghost btn-large">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tools; 