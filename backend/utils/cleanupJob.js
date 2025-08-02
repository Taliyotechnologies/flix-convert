const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const FileLog = require('../models/FileLog');

// Function to delete expired files
const cleanupExpiredFiles = async () => {
  try {
    console.log('Starting cleanup job...');
    
    // Find all expired files
    const expiredFiles = await FileLog.find({
      expiresAt: { $lt: new Date() },
      isExpired: false
    });

    console.log(`Found ${expiredFiles.length} expired files to clean up`);

    for (const file of expiredFiles) {
      try {
        // Delete physical file
        const filePath = path.join(__dirname, '..', file.filePath);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`Deleted file: ${file.fileName}`);
        }

        // Mark as expired in database
        file.isExpired = true;
        await file.save();
        
      } catch (error) {
        console.error(`Error deleting file ${file.fileName}:`, error);
      }
    }

    console.log('Cleanup job completed');
  } catch (error) {
    console.error('Error in cleanup job:', error);
  }
};

// Schedule cleanup job to run every hour
const startCleanupJob = () => {
  console.log('Starting cleanup scheduler...');
  
  // Run cleanup every hour
  cron.schedule('0 * * * *', cleanupExpiredFiles, {
    scheduled: true,
    timezone: "UTC"
  });

  // Also run cleanup on startup
  cleanupExpiredFiles();
};

module.exports = { startCleanupJob, cleanupExpiredFiles }; 