const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true,
    trim: true
  },
  originalSize: {
    type: Number,
    required: true
  },
  compressedSize: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  compressedFileName: {
    type: String,
    required: true
  },
  compressionRatio: {
    type: Number,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // Auto-delete after 24 hours (in seconds)
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
})

// Index for faster queries
fileSchema.index({ uploadedAt: -1 })
fileSchema.index({ type: 1 })
fileSchema.index({ status: 1 })

// Virtual for formatted file size
fileSchema.virtual('formattedOriginalSize').get(function() {
  return this.formatFileSize(this.originalSize)
})

fileSchema.virtual('formattedCompressedSize').get(function() {
  return this.formatFileSize(this.compressedSize)
})

// Instance method to format file size
fileSchema.methods.formatFileSize = function(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Static method to get stats
fileSchema.statics.getStats = async function() {
  const now = new Date()
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  
  const [
    totalFiles,
    todayFiles,
    totalSizeSaved,
    successCount,
    totalCount
  ] = await Promise.all([
    this.countDocuments(),
    this.countDocuments({ uploadedAt: { $gte: oneDayAgo } }),
    this.aggregate([
      { $group: { _id: null, total: { $sum: { $subtract: ['$originalSize', '$compressedSize'] } } } }
    ]),
    this.countDocuments({ status: 'completed' }),
    this.countDocuments()
  ])
  
  const successRate = totalCount > 0 ? Math.round((successCount / totalCount) * 100) : 0
  const sizeSaved = totalSizeSaved.length > 0 ? totalSizeSaved[0].total : 0
  
  return {
    totalFiles,
    todayFiles,
    successRate,
    totalSizeSaved: sizeSaved
  }
}

module.exports = mongoose.model('File', fileSchema)