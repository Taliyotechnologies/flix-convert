const express = require('express');
const router = express.Router();

// Get company information
router.get('/info', (req, res) => {
  const companyInfo = {
    name: 'FlixConvert',
    description: 'Professional file conversion tools for all your needs',
    founded: '2024',
    services: [
      'Image Conversion',
      'Video Conversion',
      'Audio Conversion',
      'Document Conversion'
    ],
    contact: {
      email: 'info@flixconvert.com',
      phone: '+1-555-123-4567',
      address: '123 Tech Street, Digital City, DC 12345'
    }
  };
  
  res.json(companyInfo);
});

// Get company team
router.get('/team', (req, res) => {
  const team = [
    {
      name: 'John Doe',
      position: 'CEO & Founder',
      bio: 'Experienced entrepreneur with 10+ years in tech industry'
    },
    {
      name: 'Jane Smith',
      position: 'CTO',
      bio: 'Expert in file processing and conversion technologies'
    },
    {
      name: 'Mike Johnson',
      position: 'Lead Developer',
      bio: 'Full-stack developer specializing in modern web technologies'
    }
  ];
  
  res.json(team);
});

// Get company services
router.get('/services', (req, res) => {
  const services = [
    {
      id: 'image-conversion',
      name: 'Image Conversion',
      description: 'Convert images between JPG, PNG, GIF, WebP, and more formats',
      features: ['Batch processing', 'Quality preservation', 'Multiple formats']
    },
    {
      id: 'video-conversion',
      name: 'Video Conversion',
      description: 'Convert videos between MP4, AVI, MOV, MKV, and more formats',
      features: ['High quality output', 'Fast processing', 'Multiple resolutions']
    },
    {
      id: 'audio-conversion',
      name: 'Audio Conversion',
      description: 'Convert audio files between MP3, WAV, FLAC, AAC, and more formats',
      features: ['Lossless conversion', 'Metadata preservation', 'Batch processing']
    }
  ];
  
  res.json(services);
});

module.exports = router; 