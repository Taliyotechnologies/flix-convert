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
    required: true,
    default: function() {
      return new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
    }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Allow anonymous uploads
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  }
}, {
  timestamps: true
});

// Index for automatic cleanup
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

// Method to get formatted time left
fileSchema.methods.getTimeLeftFormatted = function() {
  const timeLeft = this.timeLeft;
  if (timeLeft <= 0) return 'Expired';
  
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

module.exports = mongoose.model('File', fileSchema); 