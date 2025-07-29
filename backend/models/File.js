const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: [true, 'File name is required'],
    trim: true
  },
  originalName: {
    type: String,
    required: [true, 'Original file name is required']
  },
  fileType: {
    type: String,
    required: [true, 'File type is required'],
    enum: ['image', 'video', 'audio', 'pdf', 'document']
  },
  originalFormat: {
    type: String,
    required: [true, 'Original format is required']
  },
  convertedFormat: {
    type: String,
    default: null
  },
  originalSize: {
    type: Number,
    required: [true, 'Original file size is required']
  },
  compressedSize: {
    type: Number,
    default: null
  },
  savedPercent: {
    type: Number,
    default: null,
    min: 0,
    max: 100
  },
  operation: {
    type: String,
    required: [true, 'Operation type is required'],
    enum: ['compress', 'convert']
  },
  filePath: {
    type: String,
    required: [true, 'File path is required']
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  ipAddress: {
    type: String,
    required: [true, 'IP address is required']
  },
  userAgent: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing'
  },
  errorMessage: {
    type: String,
    default: null
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: [true, 'Expiration date is required']
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better query performance
fileSchema.index({ uploadedAt: -1 });
fileSchema.index({ expiresAt: 1 });
fileSchema.index({ uploadedBy: 1 });
fileSchema.index({ fileType: 1 });
fileSchema.index({ status: 1 });

// Virtual for time left before deletion
fileSchema.virtual('timeLeft').get(function() {
  const now = new Date();
  const timeLeft = this.expiresAt - now;
  return Math.max(0, timeLeft);
});

// Virtual for formatted file sizes
fileSchema.virtual('originalSizeFormatted').get(function() {
  return this.formatFileSize(this.originalSize);
});

fileSchema.virtual('compressedSizeFormatted').get(function() {
  return this.compressedSize ? this.formatFileSize(this.compressedSize) : null;
});

// Method to format file size
fileSchema.methods.formatFileSize = function(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Method to check if file is expired
fileSchema.methods.isExpired = function() {
  return new Date() > this.expiresAt;
};

// Method to get download URL
fileSchema.methods.getDownloadUrl = function() {
  return `/uploads/${this.filePath}`;
};

// Ensure virtual fields are serialized
fileSchema.set('toJSON', { virtuals: true });
fileSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('File', fileSchema); 