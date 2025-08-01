const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Mock compression endpoint for demo
app.post('/api/compress/image', (req, res) => {
  res.json({
    success: true,
    originalSize: 1024000,
    compressedSize: 512000,
    savedPercent: 50.0,
    downloadUrl: '/uploads/compressed-demo.jpg'
  });
});

// Mock conversion endpoint for demo
app.post('/api/convert/image', (req, res) => {
  res.json({
    success: true,
    originalSize: 1024000,
    convertedSize: 512000,
    savedPercent: 50.0,
    downloadUrl: '/uploads/converted-demo.jpg',
    convertedFormat: 'jpeg'
  });
});

// Admin dashboard endpoint
app.get('/api/admin/dashboard', (req, res) => {
  res.json({
    success: true,
    data: {
      totalFiles: 0,
      totalSizeSaved: 0,
      averageCompressionRatio: 0,
      filesByType: {},
      dailyStats: {},
      currentStorage: { totalFiles: 0, totalSize: 0 },
      lastUpdated: new Date().toISOString()
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app; 