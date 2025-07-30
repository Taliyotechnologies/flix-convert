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
  type: {
    type: String,
    required: true,
    enum: ['compress', 'convert'],
    trim: true
  },
  operation: {
    type: String,
    required: true,
    enum: ['image', 'video', 'audio', 'pdf'],
    trim: true
  },
  format: {
    type: String,
    required: true,
    trim: true
  },
  originalSize: {
    type: Number,
    required: true,
    min: 0
  },
  processedSize: {
    type: Number,
    required: true,
    min: 0
  },
  savedPercent: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  filePath: {
    type: String,
    required: true,
    trim: true
  },
  downloadUrl: {
    type: String,
    required: true,
    trim: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing'
  },
  error: {
    type: String,
    trim: true
  },
  processingTime: {
    type: Number, // in milliseconds
    min: 0
  }
}, {
  timestamps: true
});

// Index for efficient queries
fileLogSchema.index({ uploadedAt: -1 });
fileLogSchema.index({ expiresAt: 1 });
fileLogSchema.index({ type: 1, operation: 1 });
fileLogSchema.index({ status: 1 });

// Virtual for file age
fileLogSchema.virtual('age').get(function() {
  return Date.now() - this.uploadedAt.getTime();
});

// Virtual for isExpired
fileLogSchema.virtual('isExpired').get(function() {
  return Date.now() > this.expiresAt.getTime();
});

// Method to calculate saved percentage
fileLogSchema.methods.calculateSavedPercent = function() {
  if (this.originalSize === 0) return 0;
  return Math.round(((this.originalSize - this.processedSize) / this.originalSize) * 100);
};

// Static method to get expired files
fileLogSchema.statics.getExpiredFiles = function() {
  return this.find({
    expiresAt: { $lt: new Date() }
  });
};

// Static method to get stats
fileLogSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalFiles: { $sum: 1 },
        totalOriginalSize: { $sum: '$originalSize' },
        totalProcessedSize: { $sum: '$processedSize' },
        avgSavedPercent: { $avg: '$savedPercent' }
      }
    }
  ]);
  
  return stats[0] || {
    totalFiles: 0,
    totalOriginalSize: 0,
    totalProcessedSize: 0,
    avgSavedPercent: 0
  };
};

module.exports = mongoose.model('FileLog', fileLogSchema); 