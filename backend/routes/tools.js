const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// File upload endpoint
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    res.json({
      message: 'File uploaded successfully',
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size
    });
  } catch (error) {
    res.status(500).json({ error: 'File upload failed' });
  }
});

// File conversion endpoint
router.post('/convert', (req, res) => {
  try {
    const { filename, targetFormat } = req.body;
    
    if (!filename || !targetFormat) {
      return res.status(400).json({ error: 'Filename and target format are required' });
    }
    
    // Here you would implement the actual conversion logic
    
    res.json({
      message: 'File converted successfully',
      convertedFile: `converted-${filename}.${targetFormat}`
    });
  } catch (error) {
    res.status(500).json({ error: 'File conversion failed' });
  }
});

// Get available tools
router.get('/available', (req, res) => {
  const tools = [
    {
      id: 'image-converter',
      name: 'Image Converter',
      description: 'Convert images between different formats',
      supportedFormats: ['jpg', 'png', 'gif', 'webp', 'bmp']
    },
    {
      id: 'video-converter',
      name: 'Video Converter',
      description: 'Convert videos between different formats',
      supportedFormats: ['mp4', 'avi', 'mov', 'mkv', 'wmv']
    },
    {
      id: 'audio-converter',
      name: 'Audio Converter',
      description: 'Convert audio files between different formats',
      supportedFormats: ['mp3', 'wav', 'flac', 'aac', 'ogg']
    }
  ];
  
  res.json(tools);
});

module.exports = router; 