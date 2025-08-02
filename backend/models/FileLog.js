const mongoose = require('mongoose');

const fileLogSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
    trim: true
  },
  originalName: {
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
    required: true,
    min: 0,
    max: 100
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
  isExpired: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for automatic cleanup
fileLogSchema.index({ expiresAt: 1 });
fileLogSchema.index({ isExpired: 1 });

// Method to check if file is expired
fileLogSchema.methods.isFileExpired = function() {
  return Date.now() > this.expiresAt;
};

// Pre-save middleware to update isExpired
fileLogSchema.pre('save', function(next) {
  this.isExpired = this.isFileExpired();
  next();
});

module.exports = mongoose.model('FileLog', fileLogSchema); 