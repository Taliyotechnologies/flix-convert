const express = require('express');
const FileLog = require('../models/FileLog');

const router = express.Router();

// Get public statistics
router.get('/', async (req, res, next) => {
  try {
    const stats = await FileLog.getStats();
    
    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentActivity = await FileLog.countDocuments({
      uploadedAt: { $gte: sevenDaysAgo }
    });
    
    // Get today's activity
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayActivity = await FileLog.countDocuments({
      uploadedAt: { $gte: today }
    });
    
    // Get format distribution
    const formatStats = await FileLog.aggregate([
      {
        $group: {
          _id: '$format',
          count: { $sum: 1 },
          avgSavedPercent: { $avg: '$savedPercent' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
    
    // Get operation distribution
    const operationStats = await FileLog.aggregate([
      {
        $group: {
          _id: '$operation',
          count: { $sum: 1 },
          avgSavedPercent: { $avg: '$savedPercent' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
    
    // Get hourly activity for today
    const hourlyActivity = await FileLog.aggregate([
      {
        $match: {
          uploadedAt: { $gte: today }
        }
      },
      {
        $group: {
          _id: { $hour: '$uploadedAt' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalFiles: stats.totalFiles || 0,
          totalOriginalSize: stats.totalOriginalSize || 0,
          totalProcessedSize: stats.totalProcessedSize || 0,
          avgSavedPercent: Math.round(stats.avgSavedPercent || 0),
          recentActivity,
          todayActivity
        },
        byFormat: formatStats,
        byOperation: operationStats,
        hourlyActivity
      }
    });
    
  } catch (error) {
    next(error);
  }
});

// Get recent files (public)
router.get('/recent', async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const recentFiles = await FileLog.find({
      status: 'completed'
    })
    .sort({ uploadedAt: -1 })
    .limit(limit)
    .select('originalName fileName type operation format savedPercent uploadedAt');
    
    res.status(200).json({
      success: true,
      data: recentFiles
    });
    
  } catch (error) {
    next(error);
  }
});

// Get top performing operations
router.get('/top-operations', async (req, res, next) => {
  try {
    const topOperations = await FileLog.aggregate([
      {
        $group: {
          _id: {
            type: '$type',
            operation: '$operation'
          },
          count: { $sum: 1 },
          avgSavedPercent: { $avg: '$savedPercent' },
          totalOriginalSize: { $sum: '$originalSize' },
          totalProcessedSize: { $sum: '$processedSize' }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ]);
    
    res.status(200).json({
      success: true,
      data: topOperations
    });
    
  } catch (error) {
    next(error);
  }
});

// Get compression efficiency stats
router.get('/efficiency', async (req, res, next) => {
  try {
    const efficiencyStats = await FileLog.aggregate([
      {
        $group: {
          _id: null,
          avgSavedPercent: { $avg: '$savedPercent' },
          maxSavedPercent: { $max: '$savedPercent' },
          minSavedPercent: { $min: '$savedPercent' },
          totalFiles: { $sum: 1 },
          totalOriginalSize: { $sum: '$originalSize' },
          totalProcessedSize: { $sum: '$processedSize' }
        }
      }
    ]);
    
    const stats = efficiencyStats[0] || {};
    const totalSaved = (stats.totalOriginalSize || 0) - (stats.totalProcessedSize || 0);
    
    res.status(200).json({
      success: true,
      data: {
        avgSavedPercent: Math.round(stats.avgSavedPercent || 0),
        maxSavedPercent: stats.maxSavedPercent || 0,
        minSavedPercent: stats.minSavedPercent || 0,
        totalFiles: stats.totalFiles || 0,
        totalOriginalSize: stats.totalOriginalSize || 0,
        totalProcessedSize: stats.totalProcessedSize || 0,
        totalSaved,
        totalSavedFormatted: formatBytes(totalSaved)
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