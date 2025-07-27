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
  Play
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
      formats: ['JPG', 'PNG', 'WebP', 'GIF', 'BMP'],
      features: ['Quality control', 'Batch processing', 'Size optimization']
    },
    {
      id: 'image-convert',
      name: 'Image Converter',
      description: 'Convert images between different formats',
      icon: Image,
      color: 'from-blue-500 to-cyan-500',
      formats: ['JPG', 'PNG', 'WebP', 'GIF', 'BMP', 'TIFF'],
      features: ['Format conversion', 'Quality settings', 'Metadata preservation']
    },
    {
      id: 'video-convert',
      name: 'Video Converter',
      description: 'Convert videos between different formats',
      icon: Video,
      color: 'from-purple-500 to-pink-500',
      formats: ['MP4', 'AVI', 'MOV', 'MKV', 'WMV', 'FLV'],
      features: ['Codec selection', 'Quality control', 'Batch processing']
    },
    {
      id: 'video-compress',
      name: 'Video Compression',
      description: 'Compress videos to reduce file size',
      icon: Video,
      color: 'from-green-500 to-emerald-500',
      formats: ['MP4', 'AVI', 'MOV', 'MKV'],
      features: ['Size reduction', 'Quality preservation', 'Format options']
    },
    {
      id: 'pdf-compress',
      name: 'PDF Compression',
      description: 'Compress PDF files to reduce size',
      icon: FileText,
      color: 'from-red-500 to-pink-500',
      formats: ['PDF'],
      features: ['Size optimization', 'Quality control', 'Batch processing']
    },
    {
      id: 'pdf-convert',
      name: 'PDF Converter',
      description: 'Convert PDFs to other formats',
      icon: FileText,
      color: 'from-orange-500 to-red-500',
      formats: ['PDF to DOCX', 'PDF to TXT', 'PDF to HTML'],
      features: ['Text extraction', 'Format conversion', 'Quality preservation']
    },
    {
      id: 'audio-convert',
      name: 'Audio Converter',
      description: 'Convert audio between different formats',
      icon: Music,
      color: 'from-indigo-500 to-purple-500',
      formats: ['MP3', 'WAV', 'FLAC', 'AAC', 'OGG', 'M4A'],
      features: ['Format conversion', 'Quality settings', 'Batch processing']
    },
    {
      id: 'audio-compress',
      name: 'Audio Compression',
      description: 'Compress audio files to reduce size',
      icon: Music,
      color: 'from-teal-500 to-cyan-500',
      formats: ['MP3', 'WAV', 'FLAC', 'AAC'],
      features: ['Size reduction', 'Quality control', 'Format options']
    }
  ];

  const ToolCard: React.FC<{ tool: typeof tools[0] }> = ({ tool }) => {
    const Icon = tool.icon;
    return (
      <div 
        className={`card cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
          selectedTool === tool.id ? 'ring-2 ring-primary-color' : ''
        }`}
        onClick={() => setSelectedTool(tool.id)}
      >
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center mb-6`}>
          <Icon size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-3">{tool.name}</h3>
        <p className="text-text-secondary mb-4">{tool.description}</p>
        
        <div className="mb-4">
          <h4 className="font-semibold mb-2 text-text-primary">Supported Formats:</h4>
          <div className="flex flex-wrap gap-2">
            {tool.formats.map((format, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-bg-tertiary text-text-secondary text-sm rounded"
              >
                {format}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-text-primary">Features:</h4>
          <ul className="space-y-1">
            {tool.features.map((feature, index) => (
              <li key={index} className="text-sm text-text-secondary flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary-color rounded-full"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const ToolInterface: React.FC = () => {
    const selectedToolData = tools.find(tool => tool.id === selectedTool);
    
    if (!selectedToolData) {
      return (
        <div className="text-center py-20">
          <File size={64} className="mx-auto mb-4 text-text-muted" />
          <h3 className="text-xl font-semibold mb-2">Select a Tool</h3>
          <p className="text-text-secondary">Choose a tool from the left to get started</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${selectedToolData.color} flex items-center justify-center`}>
            <selectedToolData.icon size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{selectedToolData.name}</h2>
            <p className="text-text-secondary">{selectedToolData.description}</p>
          </div>
        </div>

        <div className="card">
          <div className="border-2 border-dashed border-border-color rounded-lg p-8 text-center">
            <Upload size={48} className="mx-auto mb-4 text-text-muted" />
            <h3 className="text-xl font-semibold mb-2">Upload Your Files</h3>
            <p className="text-text-secondary mb-6">
              Drag and drop your files here or click to browse
            </p>
            <button className="btn btn-primary">
              Choose Files
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Settings size={20} />
              Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Quality</label>
                <select className="input">
                  <option>High Quality</option>
                  <option>Medium Quality</option>
                  <option>Low Quality</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Format</label>
                <select className="input">
                  {selectedToolData.formats.map((format, index) => (
                    <option key={index}>{format}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Download size={20} />
              Output
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Output Format</label>
                <select className="input">
                  {selectedToolData.formats.map((format, index) => (
                    <option key={index}>{format}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">File Name</label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Enter file name"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="btn btn-primary flex items-center gap-2">
            <Play size={20} />
            Process Files
          </button>
          <button className="btn btn-secondary flex items-center gap-2">
            <RotateCcw size={20} />
            Reset
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-bg-secondary py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">File Tools</h1>
          <p className="text-xl text-text-secondary">
            Convert and compress your files with professional quality
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tools List */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-6">Available Tools</h2>
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