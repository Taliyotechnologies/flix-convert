const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const cron = require('node-cron')
const fs = require('fs-extra')

// Import routes
const compressionRoutes = require('./routes/compression')
const adminRoutes = require('./routes/admin')

// Import models
const File = require('./models/File')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads')
fs.ensureDirSync(uploadsDir)

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://flixconvert_user:flixconvert123@cluster0.bscos9h.mongodb.net/flixconvert'

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas')
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error)
})

// Routes
app.use('/api/compress', compressionRoutes)
app.use('/api/admin', adminRoutes)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'ConvertFlix API is running',
    timestamp: new Date().toISOString()
  })
})

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Cleanup old files every hour
cron.schedule('0 * * * *', async () => {
  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    
    // Find files older than 24 hours
    const oldFiles = await File.find({
      uploadedAt: { $lt: oneDayAgo }
    })
    
    console.log(`🧹 Cleaning up ${oldFiles.length} old files...`)
    
    for (const file of oldFiles) {
      try {
        // Delete physical file
        const filePath = path.join(uploadsDir, file.compressedFileName)
        if (await fs.pathExists(filePath)) {
          await fs.remove(filePath)
        }
        
        // Delete from database
        await File.findByIdAndDelete(file._id)
        
        console.log(`🗑️ Deleted file: ${file.originalName}`)
      } catch (error) {
        console.error(`❌ Error deleting file ${file.originalName}:`, error)
      }
    }
    
    console.log('✅ Cleanup completed')
  } catch (error) {
    console.error('❌ Cleanup error:', error)
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ConvertFlix API running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`)
})

module.exports = app