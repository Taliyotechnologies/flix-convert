const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['conversion', 'compression'],
    required: true
  },
  fileType: {
    type: String,
    enum: ['image', 'video', 'audio', 'pdf', 'document'],
    required: true
  },
  originalFileName: {
    type: String,
    required: true
  },
  originalFileSize: {
    type: Number,
    required: true
  },
  convertedFileName: {
    type: String,
    required: true
  },
  convertedFileSize: {
    type: Number,
    required: true
  },
  format: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['success', 'failed', 'skipped'],
    default: 'success'
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient queries
historySchema.index({ userId: 1, type: 1, createdAt: -1 });
historySchema.index({ userId: 1, fileType: 1 });

module.exports = mongoose.model('History', historySchema); 