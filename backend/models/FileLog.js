const mongoose = require('mongoose');

const fileLogSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true,
    enum: ['image', 'video', 'audio', 'pdf']
  },
  operation: {
    type: String,
    required: true,
    enum: ['compress', 'convert']
  },
  originalSize: {
    type: Number,
    required: true
  },
  compressedSize: {
    type: Number,
    required: true
  },
  originalFormat: {
    type: String,
    required: true
  },
  convertedFormat: {
    type: String
  },
  filePath: {
    type: String,
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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  }
});

// Index for faster queries
fileLogSchema.index({ expiresAt: 1 });
fileLogSchema.index({ uploadedAt: -1 });
fileLogSchema.index({ fileType: 1 });

module.exports = mongoose.model('FileLog', fileLogSchema); 