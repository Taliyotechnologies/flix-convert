const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const cron = require('node-cron');
const fs = require('fs-extra');

// Import routes
const compressionRoutes = require('./routes/compression');
const conversionRoutes = require('./routes/conversion');
const adminRoutes = require('./routes/admin');

// Import models
const FileLog = require('./models/FileLog');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://flixconvert_user:flixconvert123@cluster0.bscos9h.mongodb.net/flixconvert?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Routes
app.use('/api/compress', compressionRoutes);
app.use('/api/convert', conversionRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'ConvertFlix API is running',
    timestamp: new Date().toISOString()
  });
});

// Auto-delete expired files (runs every hour)
cron.schedule('0 * * * *', async () => {
  try {
    const expiredFiles = await FileLog.find({
      expiresAt: { $lt: new Date() }
    });

    for (const file of expiredFiles) {
      try {
        // Delete file from filesystem
        const filePath = path.join(__dirname, file.filePath);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        
        // Delete from database
        await FileLog.findByIdAndDelete(file._id);
        
        console.log(`🗑️ Deleted expired file: ${file.fileName}`);
      } catch (error) {
        console.error(`Error deleting file ${file.fileName}:`, error);
      }
    }
    
    console.log(`🧹 Cleaned up ${expiredFiles.length} expired files`);
  } catch (error) {
    console.error('Error in cleanup cron job:', error);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 ConvertFlix Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
}); 