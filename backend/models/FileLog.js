const mongoose = require('mongoose');

const fileLogSchema = new mongoose.Schema({
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
  processedSize: {
    type: Number,
    required: true
  },
  savedPercent: {
    type: Number,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  originalFormat: {
    type: String,
    required: true
  },
  processedFormat: {
    type: String,
    required: true
  },
  operation: {
    type: String,
    required: true,
    enum: ['compress', 'convert']
  }
}, {
  timestamps: true
});

// Index for faster queries
fileLogSchema.index({ expiresAt: 1 });
fileLogSchema.index({ fileType: 1 });
fileLogSchema.index({ operation: 1 });

module.exports = mongoose.model('FileLog', fileLogSchema); 