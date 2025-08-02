import { Link } from 'react-router-dom';
import { 
  Image, 
  Video, 
  Music, 
  FileText, 
  ArrowRight,
  Minimize,
  FileImage
} from 'lucide-react';
import './Tools.css';

const Tools = () => {
  const tools = [
    {
      category: 'Image Tools',
      items: [
        {
          name: 'Compress Image',
          description: 'Reduce image file size while maintaining quality',
          icon: Minimize,
          path: '/tool/compress-image',
          color: '#10b981'
        },
        {
          name: 'Convert Image',
          description: 'Convert between JPEG, PNG, WebP, and GIF formats',
          icon: FileImage,
          path: '/tool/convert-image',
          color: '#3b82f6'
        }
      ]
    },
    {
      category: 'Video Tools',
      items: [
        {
          name: 'Compress Video',
          description: 'Reduce video file size with H.264 compression',
          icon: Minimize,
          path: '/tool/compress-video',
          color: '#8b5cf6'
        },
        {
          name: 'Convert Video',
          description: 'Convert between MP4, AVI, MOV, and WebM formats',
          icon: Video,
          path: '/tool/convert-video',
          color: '#f59e0b'
        }
      ]
    },
    {
      category: 'Audio Tools',
      items: [
        {
          name: 'Compress Audio',
          description: 'Reduce audio file size with optimized compression',
          icon: Minimize,
          path: '/tool/compress-audio',
          color: '#ef4444'
        },
        {
          name: 'Convert Audio',
          description: 'Convert between MP3, WAV, OGG, and M4A formats',
          icon: Music,
          path: '/tool/convert-audio',
          color: '#06b6d4'
        }
      ]
    },
    {
      category: 'PDF Tools',
      items: [
        {
          name: 'Compress PDF',
          description: 'Reduce PDF file size by optimizing content',
          icon: Minimize,
          path: '/tool/compress-pdf',
          color: '#84cc16'
        },
        {
          name: 'Convert PDF',
          description: 'Convert PDF pages to image formats',
          icon: FileText,
          path: '/tool/convert-pdf',
          color: '#f97316'
        }
      ]
    }
  ];

  return (
    <div className="tools">
      <div className="container">
        <div className="tools-header">
          <h1>All Tools</h1>
          <p>Choose from our comprehensive suite of file processing tools</p>
        </div>

        <div className="tools-grid">
          {tools.map((category, categoryIndex) => (
            <div key={categoryIndex} className="tool-category">
              <h2 className="category-title">{category.category}</h2>
              <div className="category-tools">
                {category.items.map((tool, toolIndex) => {
                  const Icon = tool.icon;
                  return (
                    <Link key={toolIndex} to={tool.path} className="tool-card">
                      <div className="tool-icon" style={{ backgroundColor: tool.color }}>
                        <Icon />
                      </div>
                      <div className="tool-content">
                        <h3>{tool.name}</h3>
                        <p>{tool.description}</p>
                      </div>
                      <ArrowRight className="tool-arrow" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="tools-cta">
          <h2>Need Help?</h2>
          <p>Our tools are designed to be simple and intuitive. Just upload your file and let us handle the rest!</p>
          <Link to="/tool/compress-image" className="btn btn-primary">
            Try Image Compression
            <ArrowRight className="btn-icon" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tools; 