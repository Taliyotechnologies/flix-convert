import React, { useState } from 'react';
import { 
  Image, 
  Video, 
  FileText, 
  Music, 
  Upload, 
  Download,
  Settings,
  File,
  RotateCcw,
  Play,
  Sparkles,
  Zap,

} from 'lucide-react';

const Tools: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const tools = [
    {
      id: 'image-compress',
      name: 'Image Compression',
      description: 'Compress images while maintaining quality',
      icon: Image,
      color: 'from-pink-500 to-rose-500',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
      formats: ['JPG', 'PNG', 'WebP', 'GIF', 'BMP'],
      features: ['Quality control', 'Batch processing', 'Size optimization'],
      stats: { speed: 'Fast', quality: 'High', size: 'Up to 80% reduction' }
    },
    {
      id: 'image-convert',
      name: 'Image Converter',
      description: 'Convert images between different formats',
      icon: Image,
      color: 'from-blue-500 to-cyan-500',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      formats: ['JPG', 'PNG', 'WebP', 'GIF', 'BMP', 'TIFF'],
      features: ['Format conversion', 'Quality settings', 'Metadata preservation'],
      stats: { speed: 'Fast', quality: 'High', size: 'Original size' }
    },
    {
      id: 'video-convert',
      name: 'Video Converter',
      description: 'Convert videos between different formats',
      icon: Video,
      color: 'from-purple-500 to-pink-500',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
      formats: ['MP4', 'AVI', 'MOV', 'MKV', 'WMV', 'FLV'],
      features: ['Codec selection', 'Quality control', 'Batch processing'],
      stats: { speed: 'Medium', quality: 'High', size: 'Original size' }
    },
    {
      id: 'video-compress',
      name: 'Video Compression',
      description: 'Compress videos to reduce file size',
      icon: Video,
      color: 'from-green-500 to-emerald-500',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      formats: ['MP4', 'AVI', 'MOV', 'MKV'],
      features: ['Size reduction', 'Quality preservation', 'Format options'],
      stats: { speed: 'Medium', quality: 'High', size: 'Up to 70% reduction' }
    },
    {
      id: 'pdf-compress',
      name: 'PDF Compression',
      description: 'Compress PDF files to reduce size',
      icon: FileText,
      color: 'from-red-500 to-pink-500',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
      formats: ['PDF'],
      features: ['Size optimization', 'Quality control', 'Batch processing'],
      stats: { speed: 'Fast', quality: 'High', size: 'Up to 60% reduction' }
    },
    {
      id: 'pdf-convert',
      name: 'PDF Converter',
      description: 'Convert PDFs to other formats',
      icon: FileText,
      color: 'from-orange-500 to-red-500',
      gradient: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
      formats: ['PDF to DOCX', 'PDF to TXT', 'PDF to HTML'],
      features: ['Text extraction', 'Format conversion', 'Quality preservation'],
      stats: { speed: 'Medium', quality: 'High', size: 'Original size' }
    },
    {
      id: 'audio-convert',
      name: 'Audio Converter',
      description: 'Convert audio between different formats',
      icon: Music,
      color: 'from-indigo-500 to-purple-500',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      formats: ['MP3', 'WAV', 'FLAC', 'AAC', 'OGG', 'M4A'],
      features: ['Format conversion', 'Quality settings', 'Batch processing'],
      stats: { speed: 'Fast', quality: 'High', size: 'Original size' }
    },
    {
      id: 'audio-compress',
      name: 'Audio Compression',
      description: 'Compress audio files to reduce size',
      icon: Music,
      color: 'from-teal-500 to-cyan-500',
      gradient: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
      formats: ['MP3', 'WAV', 'FLAC', 'AAC'],
      features: ['Size reduction', 'Quality control', 'Format options'],
      stats: { speed: 'Fast', quality: 'High', size: 'Up to 50% reduction' }
    }
  ];

  const ToolCard: React.FC<{ tool: typeof tools[0] }> = ({ tool }) => {
    const Icon = tool.icon;
    return (
      <div 
        className={`card cursor-pointer transition-all duration-500 hover:shadow-xl hover:scale-105 group ${
          selectedTool === tool.id ? 'ring-2 ring-primary-color shadow-xl' : ''
        } animate-fade-in`}
        onClick={() => setSelectedTool(tool.id)}
      >
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
          style={{ background: tool.gradient }}
        >
          <Icon size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-3">{tool.name}</h3>
        <p className="text-text-secondary mb-4 leading-relaxed">{tool.description}</p>
        
        <div className="mb-4">
          <h4 className="font-semibold mb-3 text-text-primary flex items-center gap-2">
            <Sparkles size={16} />
            Supported Formats:
          </h4>
          <div className="flex flex-wrap gap-2">
            {tool.formats.map((format, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-bg-tertiary text-text-secondary text-sm rounded-lg font-medium"
              >
                {format}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold mb-3 text-text-primary flex items-center gap-2">
            <Zap size={16} />
            Features:
          </h4>
          <ul className="space-y-2">
            {tool.features.map((feature, index) => (
              <li key={index} className="text-sm text-text-secondary flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary-color rounded-full"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center p-2 bg-bg-tertiary rounded-lg">
            <div className="font-semibold text-primary-color">{tool.stats.speed}</div>
            <div className="text-text-secondary">Speed</div>
          </div>
          <div className="text-center p-2 bg-bg-tertiary rounded-lg">
            <div className="font-semibold text-success-color">{tool.stats.quality}</div>
            <div className="text-text-secondary">Quality</div>
          </div>
          <div className="text-center p-2 bg-bg-tertiary rounded-lg">
            <div className="font-semibold text-accent-color">{tool.stats.size}</div>
            <div className="text-text-secondary">Size</div>
          </div>
        </div>
      </div>
    );
  };

  const ToolInterface: React.FC = () => {
    const selectedToolData = tools.find(tool => tool.id === selectedTool);
    
    if (!selectedToolData) {
      return (
        <div className="text-center py-20 animate-fade-in">
          <div className="w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <File size={48} className="text-white" />
          </div>
          <h3 className="text-2xl font-semibold mb-3 gradient-text">Select a Tool</h3>
          <p className="text-text-secondary text-lg">Choose a tool from the left to get started</p>
        </div>
      );
    }

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4 mb-8">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: selectedToolData.gradient }}
          >
            <selectedToolData.icon size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold gradient-text">{selectedToolData.name}</h2>
            <p className="text-text-secondary text-lg">{selectedToolData.description}</p>
          </div>
        </div>

        <div className="card border-2 border-dashed border-border-color hover:border-primary-color transition-colors duration-300">
          <div className="p-8 text-center">
            <Upload size={64} className="mx-auto mb-6 text-text-muted animate-float" />
            <h3 className="text-2xl font-semibold mb-3">Upload Your Files</h3>
            <p className="text-text-secondary mb-8 text-lg leading-relaxed">
              Drag and drop your files here or click to browse. We support multiple file formats.
            </p>
            <button className="btn btn-primary text-lg px-8 py-4 shadow-xl">
              <Upload size={20} />
              Choose Files
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-3">
              <Settings size={24} />
              Settings
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">Quality</label>
                <select className="input">
                  <option>High Quality</option>
                  <option>Medium Quality</option>
                  <option>Low Quality</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-3">Format</label>
                <select className="input">
                  {selectedToolData.formats.map((format, index) => (
                    <option key={index}>{format}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-3">Compression Level</label>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  defaultValue="7"
                  className="w-full h-2 bg-bg-tertiary rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-3">
              <Download size={24} />
              Output
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">Output Format</label>
                <select className="input">
                  {selectedToolData.formats.map((format, index) => (
                    <option key={index}>{format}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-3">File Name</label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Enter file name"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-bg-tertiary rounded-lg">
                  <div className="text-lg font-bold text-primary-color">Fast</div>
                  <div className="text-xs text-text-secondary">Processing</div>
                </div>
                <div className="p-3 bg-bg-tertiary rounded-lg">
                  <div className="text-lg font-bold text-success-color">Secure</div>
                  <div className="text-xs text-text-secondary">Encryption</div>
                </div>
                <div className="p-3 bg-bg-tertiary rounded-lg">
                  <div className="text-lg font-bold text-accent-color">Free</div>
                  <div className="text-xs text-text-secondary">No Cost</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="btn btn-primary flex items-center gap-3 text-lg px-8 py-4 shadow-xl">
            <Play size={24} />
            Process Files
          </button>
          <button className="btn btn-secondary flex items-center gap-3 text-lg px-8 py-4">
            <RotateCcw size={24} />
            Reset
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-bg-secondary py-8 lg:py-12">
      <div className="container">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">File Tools</h1>
          <p className="text-xl text-text-secondary leading-relaxed">
            Convert and compress your files with professional quality
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Tools List */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-8 gradient-text">Available Tools</h2>
            <div className="space-y-4">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>

          {/* Tool Interface */}
          <div className="lg:col-span-2">
            <ToolInterface />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools; 