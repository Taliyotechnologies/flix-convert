const mongoose = require('mongoose');

const fileLogSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true,
    trim: true
  },
  fileName: {
    type: String,
    required: true,
    trim: true
  },
  fileType: {
    type: String,
    required: true,
    enum: ['image', 'video', 'audio', 'pdf']
  },
  originalSize: {
    type: Number,
    required: true
  },
  compressedSize: {
    type: Number,
    required: true
  },
  compressionRatio: {
    type: Number,
    required: true
  },
  uploadTime: {
    type: Date,
    default: Date.now,
    expires: 86400 // Auto-delete after 24 hours
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing'
  },
  error: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Index for faster queries
fileLogSchema.index({ uploadTime: 1 });
fileLogSchema.index({ fileType: 1 });
fileLogSchema.index({ status: 1 });

module.exports = mongoose.model('FileLog', fileLogSchema);