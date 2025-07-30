const File = require('../models/File');
const fs = require('fs-extra');
const path = require('path');

const cleanupExpiredFiles = async () => {
  try {
    console.log('🧹 Starting cleanup of expired files...');
    
    // Find expired files
    const expiredFiles = await File.find({
      expiresAt: { $lt: new Date() }
    });

    if (expiredFiles.length === 0) {
      console.log('✅ No expired files found');
      return;
    }

    console.log(`🗑️ Found ${expiredFiles.length} expired files to delete`);

    for (const file of expiredFiles) {
      try {
        // Delete physical files
        if (fs.existsSync(file.originalPath)) {
          fs.unlinkSync(file.originalPath);
          console.log(`🗑️ Deleted original file: ${file.originalName}`);
        }

        if (fs.existsSync(file.processedPath)) {
          fs.unlinkSync(file.processedPath);
          console.log(`🗑️ Deleted processed file: ${file.fileName}`);
        }

        // Delete from database
        await File.findByIdAndDelete(file._id);
        console.log(`🗑️ Removed file record: ${file.fileName}`);

      } catch (error) {
        console.error(`❌ Error deleting file ${file.fileName}:`, error);
      }
    }

    console.log(`✅ Cleanup completed. Deleted ${expiredFiles.length} expired files`);

  } catch (error) {
    console.error('❌ Cleanup error:', error);
  }
};

const cleanupOrphanedFiles = async () => {
  try {
    console.log('🧹 Starting cleanup of orphaned files...');
    
    const uploadsDir = path.join(__dirname, '../uploads');
    const originalDir = path.join(uploadsDir, 'original');
    const processedDir = path.join(uploadsDir, 'processed');

    // Ensure directories exist
    fs.ensureDirSync(originalDir);
    fs.ensureDirSync(processedDir);

    // Get all files in database
    const dbFiles = await File.find({});
    const dbOriginalPaths = new Set(dbFiles.map(f => f.originalPath));
    const dbProcessedPaths = new Set(dbFiles.map(f => f.processedPath));

    // Check original files
    if (fs.existsSync(originalDir)) {
      const originalFiles = fs.readdirSync(originalDir);
      let orphanedCount = 0;

      for (const file of originalFiles) {
        const filePath = path.join(originalDir, file);
        if (!dbOriginalPaths.has(filePath)) {
          try {
            fs.unlinkSync(filePath);
            console.log(`🗑️ Deleted orphaned original file: ${file}`);
            orphanedCount++;
          } catch (error) {
            console.error(`❌ Error deleting orphaned file ${file}:`, error);
          }
        }
      }

      console.log(`✅ Cleaned up ${orphanedCount} orphaned original files`);
    }

    // Check processed files
    if (fs.existsSync(processedDir)) {
      const processedFiles = fs.readdirSync(processedDir);
      let orphanedCount = 0;

      for (const file of processedFiles) {
        const filePath = path.join(processedDir, file);
        if (!dbProcessedPaths.has(filePath)) {
          try {
            fs.unlinkSync(filePath);
            console.log(`🗑️ Deleted orphaned processed file: ${file}`);
            orphanedCount++;
          } catch (error) {
            console.error(`❌ Error deleting orphaned file ${file}:`, error);
          }
        }
      }

      console.log(`✅ Cleaned up ${orphanedCount} orphaned processed files`);
    }

  } catch (error) {
    console.error('❌ Orphaned files cleanup error:', error);
  }
};

const getStorageStats = async () => {
  try {
    const uploadsDir = path.join(__dirname, '../uploads');
    const originalDir = path.join(uploadsDir, 'original');
    const processedDir = path.join(uploadsDir, 'processed');

    let originalSize = 0;
    let processedSize = 0;
    let originalCount = 0;
    let processedCount = 0;

    // Calculate original files size
    if (fs.existsSync(originalDir)) {
      const originalFiles = fs.readdirSync(originalDir);
      originalCount = originalFiles.length;
      
      for (const file of originalFiles) {
        const filePath = path.join(originalDir, file);
        const stats = fs.statSync(filePath);
        originalSize += stats.size;
      }
    }

    // Calculate processed files size
    if (fs.existsSync(processedDir)) {
      const processedFiles = fs.readdirSync(processedDir);
      processedCount = processedFiles.length;
      
      for (const file of processedFiles) {
        const filePath = path.join(processedDir, file);
        const stats = fs.statSync(filePath);
        processedSize += stats.size;
      }
    }

    return {
      originalSize,
      processedSize,
      originalCount,
      processedCount,
      totalSize: originalSize + processedSize
    };

  } catch (error) {
    console.error('❌ Storage stats error:', error);
    return {
      originalSize: 0,
      processedSize: 0,
      originalCount: 0,
      processedCount: 0,
      totalSize: 0
    };
  }
};

module.exports = {
  cleanupExpiredFiles,
  cleanupOrphanedFiles,
  getStorageStats
}; 