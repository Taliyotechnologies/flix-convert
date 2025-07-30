const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
    trim: true
  },
  originalName: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true,
    enum: ['image', 'video', 'audio', 'pdf', 'document']
  },
  originalSize: {
    type: Number,
    required: true
  },
  compressedSize: {
    type: Number,
    required: true
  },
  savedPercent: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  originalPath: {
    type: String,
    required: true
  },
  processedPath: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true,
    default: function() {
      return new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
    }
  },
  isProcessed: {
    type: Boolean,
    default: false
  },
  processingError: {
    type: String,
    default: null
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Index for auto-cleanup
fileSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Virtual for time left
fileSchema.virtual('timeLeft').get(function() {
  const now = new Date();
  const timeLeft = this.expiresAt - now;
  return Math.max(0, timeLeft);
});

// Method to check if file is expired
fileSchema.methods.isExpired = function() {
  return new Date() > this.expiresAt;
};

// Method to get formatted file size
fileSchema.methods.getFormattedSize = function(size) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};

module.exports = mongoose.model('File', fileSchema); 