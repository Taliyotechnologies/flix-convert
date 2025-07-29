const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');
const File = require('../models/File');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/convertflix');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Clean up expired files
const cleanupExpiredFiles = async () => {
  try {
    console.log('🔄 Starting cleanup of expired files...');
    
    // Find expired files
    const expiredFiles = await File.find({
      isDeleted: false,
      expiresAt: { $lte: new Date() }
    });

    console.log(`📁 Found ${expiredFiles.length} expired files`);

    if (expiredFiles.length === 0) {
      console.log('✅ No expired files to clean up');
      return;
    }

    let deletedCount = 0;
    let errorCount = 0;

    // Process each expired file
    for (const file of expiredFiles) {
      try {
        // Delete physical file
        const filePath = path.join(process.env.UPLOAD_PATH || './uploads', file.filePath);
        
        try {
          await fs.access(filePath);
          await fs.unlink(filePath);
          console.log(`🗑️  Deleted physical file: ${file.fileName}`);
        } catch (unlinkError) {
          console.log(`⚠️  Physical file not found: ${file.fileName}`);
          // Continue with database cleanup even if physical file doesn't exist
        }
        
        // Mark as deleted in database
        file.isDeleted = true;
        await file.save();
        
        deletedCount++;
        console.log(`✅ Cleaned up: ${file.fileName}`);
      } catch (error) {
        console.error(`❌ Error cleaning up ${file.fileName}:`, error.message);
        errorCount++;
      }
    }

    console.log(`\n📊 Cleanup Summary:`);
    console.log(`✅ Successfully deleted: ${deletedCount} files`);
    console.log(`❌ Errors: ${errorCount} files`);
    console.log(`📁 Total expired files: ${expiredFiles.length}`);

  } catch (error) {
    console.error('❌ Cleanup error:', error);
  }
};

// Clean up old temporary files
const cleanupTempFiles = async () => {
  try {
    console.log('🔄 Cleaning up temporary files...');
    
    const tempPath = process.env.TEMP_PATH || './temp';
    
    try {
      const tempFiles = await fs.readdir(tempPath);
      
      if (tempFiles.length === 0) {
        console.log('✅ No temporary files to clean up');
        return;
      }

      let deletedCount = 0;
      
      for (const file of tempFiles) {
        try {
          const filePath = path.join(tempPath, file);
          const stats = await fs.stat(filePath);
          
          // Delete files older than 1 hour
          const oneHourAgo = Date.now() - (60 * 60 * 1000);
          
          if (stats.mtime.getTime() < oneHourAgo) {
            await fs.unlink(filePath);
            deletedCount++;
            console.log(`🗑️  Deleted temp file: ${file}`);
          }
        } catch (error) {
          console.error(`❌ Error deleting temp file ${file}:`, error.message);
        }
      }
      
      console.log(`✅ Cleaned up ${deletedCount} temporary files`);
      
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('📁 Temp directory does not exist, creating...');
        await fs.mkdir(tempPath, { recursive: true });
      } else {
        throw error;
      }
    }

  } catch (error) {
    console.error('❌ Temp cleanup error:', error);
  }
};

// Get storage statistics
const getStorageStats = async () => {
  try {
    console.log('📊 Getting storage statistics...');
    
    const stats = await File.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: null,
          totalFiles: { $sum: 1 },
          totalOriginalSize: { $sum: '$originalSize' },
          totalCompressedSize: { $sum: '$compressedSize' },
          avgCompression: { $avg: '$savedPercent' }
        }
      }
    ]);

    if (stats.length > 0) {
      const stat = stats[0];
      const totalSaved = stat.totalOriginalSize - stat.totalCompressedSize;
      
      console.log(`📁 Total files: ${stat.totalFiles}`);
      console.log(`💾 Original size: ${formatBytes(stat.totalOriginalSize)}`);
      console.log(`🗜️  Compressed size: ${formatBytes(stat.totalCompressedSize)}`);
      console.log(`💡 Space saved: ${formatBytes(totalSaved)}`);
      console.log(`📈 Average compression: ${stat.avgCompression?.toFixed(1) || 0}%`);
    } else {
      console.log('📁 No files found');
    }

  } catch (error) {
    console.error('❌ Error getting storage stats:', error);
  }
};

// Helper function to format bytes
const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Main cleanup function
const runCleanup = async () => {
  try {
    await connectDB();
    
    console.log('🚀 Starting ConvertFlix cleanup process...\n');
    
    // Get storage stats before cleanup
    await getStorageStats();
    console.log('');
    
    // Clean up expired files
    await cleanupExpiredFiles();
    console.log('');
    
    // Clean up temp files
    await cleanupTempFiles();
    console.log('');
    
    // Get storage stats after cleanup
    await getStorageStats();
    console.log('');
    
    console.log('✅ Cleanup process completed successfully');
    
  } catch (error) {
    console.error('❌ Cleanup process failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
};

// Run cleanup if this file is executed directly
if (require.main === module) {
  runCleanup();
}

module.exports = {
  cleanupExpiredFiles,
  cleanupTempFiles,
  getStorageStats,
  runCleanup
}; 