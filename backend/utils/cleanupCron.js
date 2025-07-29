const cron = require('node-cron');
const fs = require('fs').promises;
const path = require('path');
const FileLog = require('../models/FileLog');

class CleanupCron {
  static init() {
    // Run cleanup every hour
    cron.schedule('0 * * * *', async () => {
      try {
        console.log('🔄 Running cleanup job...');
        await this.cleanupExpiredFiles();
      } catch (error) {
        console.error('❌ Cleanup job failed:', error.message);
      }
    });
    
    console.log('✅ Cleanup cron job initialized');
  }
  
  static async cleanupExpiredFiles() {
    try {
      // Find files older than 24 hours
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      
      const expiredFiles = await FileLog.find({
        uploadTime: { $lt: twentyFourHoursAgo }
      });
      
      console.log(`📁 Found ${expiredFiles.length} expired files to delete`);
      
      for (const file of expiredFiles) {
        try {
          // Delete physical file
          const filePath = path.join('./uploads', file.fileName);
          await fs.unlink(filePath).catch(err => {
            console.log(`⚠️ File not found: ${file.fileName}`);
          });
          
          // Delete from database
          await FileLog.findByIdAndDelete(file._id);
          
          console.log(`🗑️ Deleted: ${file.originalName}`);
        } catch (error) {
          console.error(`❌ Failed to delete ${file.originalName}:`, error.message);
        }
      }
      
      console.log('✅ Cleanup completed');
    } catch (error) {
      console.error('❌ Cleanup failed:', error.message);
    }
  }
  
  static async manualCleanup() {
    try {
      console.log('🧹 Starting manual cleanup...');
      await this.cleanupExpiredFiles();
      console.log('✅ Manual cleanup completed');
    } catch (error) {
      console.error('❌ Manual cleanup failed:', error.message);
    }
  }
  
  static async getStorageStats() {
    try {
      const totalFiles = await FileLog.countDocuments();
      const fileTypes = await FileLog.aggregate([
        {
          $group: {
            _id: '$fileType',
            count: { $sum: 1 },
            totalSize: { $sum: '$compressedSize' }
          }
        }
      ]);
      
      const totalSize = await FileLog.aggregate([
        {
          $group: {
            _id: null,
            totalOriginalSize: { $sum: '$originalSize' },
            totalCompressedSize: { $sum: '$compressedSize' }
          }
        }
      ]);
      
      return {
        totalFiles,
        fileTypes,
        totalOriginalSize: totalSize[0]?.totalOriginalSize || 0,
        totalCompressedSize: totalSize[0]?.totalCompressedSize || 0
      };
    } catch (error) {
      throw new Error(`Failed to get storage stats: ${error.message}`);
    }
  }
}

module.exports = CleanupCron;