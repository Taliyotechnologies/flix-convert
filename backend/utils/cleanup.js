const fs = require('fs-extra');
const path = require('path');
const FileLog = require('../models/FileLog');

const cleanupFiles = async () => {
  try {
    console.log('🧹 Starting file cleanup...');
    
    // Get expired files from database
    const expiredFiles = await FileLog.getExpiredFiles();
    
    let deletedCount = 0;
    let errorCount = 0;
    
    for (const file of expiredFiles) {
      try {
        // Check if file exists
        if (await fs.pathExists(file.filePath)) {
          await fs.remove(file.filePath);
          deletedCount++;
          console.log(`🗑️ Deleted expired file: ${file.fileName}`);
        }
        
        // Remove from database
        await FileLog.findByIdAndDelete(file._id);
        
      } catch (error) {
        errorCount++;
        console.error(`❌ Error deleting file ${file.fileName}:`, error.message);
      }
    }
    
    // Clean up temp directory
    const tempDir = path.join(__dirname, '..', 'temp');
    if (await fs.pathExists(tempDir)) {
      const tempFiles = await fs.readdir(tempDir);
      for (const tempFile of tempFiles) {
        const tempFilePath = path.join(tempDir, tempFile);
        const stats = await fs.stat(tempFilePath);
        const fileAge = Date.now() - stats.mtime.getTime();
        
        // Remove temp files older than 1 hour
        if (fileAge > 60 * 60 * 1000) {
          await fs.remove(tempFilePath);
          console.log(`🗑️ Deleted temp file: ${tempFile}`);
        }
      }
    }
    
    console.log(`✅ Cleanup completed: ${deletedCount} files deleted, ${errorCount} errors`);
    
  } catch (error) {
    console.error('❌ Cleanup error:', error);
  }
};

// Manual cleanup function for admin use
const manualCleanup = async () => {
  try {
    console.log('🧹 Starting manual cleanup...');
    
    // Get all files older than 24 hours
    const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const oldFiles = await FileLog.find({
      uploadedAt: { $lt: cutoffTime }
    });
    
    let deletedCount = 0;
    
    for (const file of oldFiles) {
      try {
        if (await fs.pathExists(file.filePath)) {
          await fs.remove(file.filePath);
        }
        await FileLog.findByIdAndDelete(file._id);
        deletedCount++;
      } catch (error) {
        console.error(`❌ Error in manual cleanup for ${file.fileName}:`, error.message);
      }
    }
    
    console.log(`✅ Manual cleanup completed: ${deletedCount} files deleted`);
    return { success: true, deletedCount };
    
  } catch (error) {
    console.error('❌ Manual cleanup error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { cleanupFiles, manualCleanup }; 