const express = require('express');
const FileLog = require('../models/FileLog');
const { manualCleanup } = require('../utils/cleanup');
const fs = require('fs-extra');
const path = require('path');

const router = express.Router();

// Simple admin authentication middleware
const adminAuth = (req, res, next) => {
  const { email, password } = req.headers;
  
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({
      success: false,
      error: 'Unauthorized. Invalid admin credentials.'
    });
  }
};

// Apply admin auth to all routes
router.use(adminAuth);

// Get all files with pagination
router.get('/files', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const { type, operation, status, search } = req.query;
    
    // Build filter object
    const filter = {};
    if (type) filter.type = type;
    if (operation) filter.operation = operation;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { originalName: { $regex: search, $options: 'i' } },
        { fileName: { $regex: search, $options: 'i' } }
      ];
    }
    
    const files = await FileLog.find(filter)
      .sort({ uploadedAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');
    
    const total = await FileLog.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);
    
    res.status(200).json({
      success: true,
      data: {
        files,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });
    
  } catch (error) {
    next(error);
  }
});

// Get file by ID
router.get('/files/:id', async (req, res, next) => {
  try {
    const file = await FileLog.findById(req.params.id);
    
    if (!file) {
      return res.status(404).json({
        success: false,
        error: 'File not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: file
    });
    
  } catch (error) {
    next(error);
  }
});

// Delete file by ID
router.delete('/files/:id', async (req, res, next) => {
  try {
    const file = await FileLog.findById(req.params.id);
    
    if (!file) {
      return res.status(404).json({
        success: false,
        error: 'File not found'
      });
    }
    
    // Delete physical file
    if (await fs.pathExists(file.filePath)) {
      await fs.remove(file.filePath);
    }
    
    // Delete from database
    await FileLog.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'File deleted successfully'
    });
    
  } catch (error) {
    next(error);
  }
});

// Bulk delete files
router.delete('/files', async (req, res, next) => {
  try {
    const { ids } = req.body;
    
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please provide an array of file IDs to delete'
      });
    }
    
    const files = await FileLog.find({ _id: { $in: ids } });
    let deletedCount = 0;
    let errorCount = 0;
    
    for (const file of files) {
      try {
        // Delete physical file
        if (await fs.pathExists(file.filePath)) {
          await fs.remove(file.filePath);
        }
        
        // Delete from database
        await FileLog.findByIdAndDelete(file._id);
        deletedCount++;
        
      } catch (error) {
        errorCount++;
        console.error(`Error deleting file ${file.fileName}:`, error.message);
      }
    }
    
    res.status(200).json({
      success: true,
      message: `Deleted ${deletedCount} files successfully`,
      data: {
        deletedCount,
        errorCount
      }
    });
    
  } catch (error) {
    next(error);
  }
});

// Get system statistics
router.get('/stats', async (req, res, next) => {
  try {
    const stats = await FileLog.getStats();
    
    // Get additional stats
    const totalFiles = await FileLog.countDocuments();
    const recentFiles = await FileLog.countDocuments({
      uploadedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });
    const expiredFiles = await FileLog.countDocuments({
      expiresAt: { $lt: new Date() }
    });
    
    // Get stats by type
    const typeStats = await FileLog.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          totalSize: { $sum: '$originalSize' }
        }
      }
    ]);
    
    // Get stats by operation
    const operationStats = await FileLog.aggregate([
      {
        $group: {
          _id: '$operation',
          count: { $sum: 1 },
          avgSavedPercent: { $avg: '$savedPercent' }
        }
      }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalFiles,
          recentFiles,
          expiredFiles,
          totalOriginalSize: stats.totalOriginalSize || 0,
          totalProcessedSize: stats.totalProcessedSize || 0,
          avgSavedPercent: Math.round(stats.avgSavedPercent || 0)
        },
        byType: typeStats,
        byOperation: operationStats
      }
    });
    
  } catch (error) {
    next(error);
  }
});

// Manual cleanup
router.post('/cleanup', async (req, res, next) => {
  try {
    const result = await manualCleanup();
    
    res.status(200).json({
      success: result.success,
      message: result.success ? 'Cleanup completed successfully' : 'Cleanup failed',
      data: result
    });
    
  } catch (error) {
    next(error);
  }
});

// Get storage usage
router.get('/storage', async (req, res, next) => {
  try {
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    const tempDir = path.join(__dirname, '..', 'temp');
    
    let uploadsSize = 0;
    let tempSize = 0;
    
    if (await fs.pathExists(uploadsDir)) {
      const uploadsFiles = await fs.readdir(uploadsDir);
      for (const file of uploadsFiles) {
        const filePath = path.join(uploadsDir, file);
        const stats = await fs.stat(filePath);
        uploadsSize += stats.size;
      }
    }
    
    if (await fs.pathExists(tempDir)) {
      const tempFiles = await fs.readdir(tempDir);
      for (const file of tempFiles) {
        const filePath = path.join(tempDir, file);
        const stats = await fs.stat(filePath);
        tempSize += stats.size;
      }
    }
    
    res.status(200).json({
      success: true,
      data: {
        uploads: {
          size: uploadsSize,
          sizeFormatted: formatBytes(uploadsSize)
        },
        temp: {
          size: tempSize,
          sizeFormatted: formatBytes(tempSize)
        },
        total: {
          size: uploadsSize + tempSize,
          sizeFormatted: formatBytes(uploadsSize + tempSize)
        }
      }
    });
    
  } catch (error) {
    next(error);
  }
});

// Helper function to format bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

module.exports = router; 