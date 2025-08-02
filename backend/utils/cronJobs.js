const cron = require('node-cron');
const FileLog = require('../models/FileLog');
const fs = require('fs-extra');
const path = require('path');

// Clean up expired files every hour
const cleanupExpiredFiles = async () => {
  try {
    console.log('Running cleanup job...');
    
    // Find expired files
    const expiredFiles = await FileLog.find({
      expiresAt: { $lte: new Date() }
    });

    console.log(`Found ${expiredFiles.length} expired files`);

    // Delete files from disk and database
    for (const file of expiredFiles) {
      try {
        // Delete from disk
        if (await fs.pathExists(file.filePath)) {
          await fs.remove(file.filePath);
          console.log(`Deleted file from disk: ${file.fileName}`);
        }

        // Delete from database
        await FileLog.findByIdAndDelete(file._id);
        console.log(`Deleted file from database: ${file.fileName}`);
      } catch (error) {
        console.error(`Error deleting file ${file.fileName}:`, error);
      }
    }

    console.log('Cleanup job completed');
  } catch (error) {
    console.error('Cleanup job error:', error);
  }
};

// Clean up orphaned files (files on disk but not in database)
const cleanupOrphanedFiles = async () => {
  try {
    console.log('Running orphaned files cleanup...');
    
    const uploadsDir = path.join(__dirname, '../uploads');
    
    if (!await fs.pathExists(uploadsDir)) {
      return;
    }

    const filesOnDisk = await fs.readdir(uploadsDir);
    const filesInDb = await FileLog.find().select('fileName');

    const dbFileNames = filesInDb.map(file => file.fileName);
    const orphanedFiles = filesOnDisk.filter(file => !dbFileNames.includes(file));

    console.log(`Found ${orphanedFiles.length} orphaned files`);

    // Delete orphaned files
    for (const fileName of orphanedFiles) {
      try {
        const filePath = path.join(uploadsDir, fileName);
        await fs.remove(filePath);
        console.log(`Deleted orphaned file: ${fileName}`);
      } catch (error) {
        console.error(`Error deleting orphaned file ${fileName}:`, error);
      }
    }

    console.log('Orphaned files cleanup completed');
  } catch (error) {
    console.error('Orphaned files cleanup error:', error);
  }
};

// Initialize cron jobs
const initCronJobs = () => {
  // Clean up expired files every hour
  cron.schedule('0 * * * *', cleanupExpiredFiles);
  
  // Clean up orphaned files every 6 hours
  cron.schedule('0 */6 * * *', cleanupOrphanedFiles);
  
  console.log('Cron jobs initialized');
};

module.exports = {
  initCronJobs,
  cleanupExpiredFiles,
  cleanupOrphanedFiles
}; 