const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    enum: ['image', 'video', 'pdf', 'audio'],
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  originalSize: {
    type: Number,
    required: true
  },
  compressedSize: {
    type: Number,
    default: null
  },
  compressionRatio: {
    type: Number,
    default: null
  },
  quality: {
    type: Number,
    default: null
  },
  status: {
    type: String,
    enum: ['uploaded', 'processing', 'completed', 'failed'],
    default: 'uploaded'
  },
  downloadUrl: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  processedAt: {
    type: Date,
    default: null
  }
});

// Index for better query performance
fileSchema.index({ user: 1, createdAt: -1 });
fileSchema.index({ fileType: 1, status: 1 });

module.exports = mongoose.model('File', fileSchema); 