const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const File = require('../models/File');
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// Apply authentication and admin middleware to all routes
router.use(protect);
router.use(admin);

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard statistics
// @access  Private (Admin only)
router.get('/dashboard', async (req, res) => {
  try {
    // Get total files
    const totalFiles = await File.countDocuments({ isDeleted: false });
    
    // Get files by type
    const filesByType = await File.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: '$fileType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get files by operation
    const filesByOperation = await File.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: '$operation', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get recent files (last 10)
    const recentFiles = await File.find({ isDeleted: false })
      .sort({ uploadedAt: -1 })
      .limit(10)
      .populate('uploadedBy', 'name email');

    // Get total users
    const totalUsers = await User.countDocuments({ role: 'user' });

    // Get total storage used
    const storageStats = await File.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: null,
          totalOriginalSize: { $sum: '$originalSize' },
          totalCompressedSize: { $sum: '$compressedSize' }
        }
      }
    ]);

    // Get files expiring soon (next 6 hours)
    const expiringSoon = await File.find({
      isDeleted: false,
      expiresAt: { $lte: new Date(Date.now() + 6 * 60 * 60 * 1000) }
    }).countDocuments();

    // Calculate average compression percentage
    const compressionStats = await File.aggregate([
      { $match: { isDeleted: false, savedPercent: { $exists: true } } },
      {
        $group: {
          _id: null,
          avgCompression: { $avg: '$savedPercent' },
          totalSaved: { $sum: { $subtract: ['$originalSize', '$compressedSize'] } }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        overview: {
          totalFiles,
          totalUsers,
          expiringSoon,
          avgCompression: compressionStats[0]?.avgCompression || 0,
          totalSaved: compressionStats[0]?.totalSaved || 0
        },
        filesByType,
        filesByOperation,
        recentFiles,
        storage: storageStats[0] || { totalOriginalSize: 0, totalCompressedSize: 0 }
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      error: 'Failed to load dashboard',
      message: 'Something went wrong while loading dashboard data'
    });
  }
});

// @route   GET /api/admin/files
// @desc    Get all files with pagination and filters
// @access  Private (Admin only)
router.get('/files', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      fileType,
      operation,
      status,
      search,
      sortBy = 'uploadedAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = { isDeleted: false };
    
    if (fileType) filter.fileType = fileType;
    if (operation) filter.operation = operation;
    if (status) filter.status = status;
    
    if (search) {
      filter.$or = [
        { fileName: { $regex: search, $options: 'i' } },
        { originalName: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get files with pagination
    const files = await File.find(filter)
      .populate('uploadedBy', 'name email')
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalFiles = await File.countDocuments(filter);
    const totalPages = Math.ceil(totalFiles / parseInt(limit));

    res.json({
      success: true,
      data: {
        files,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalFiles,
          hasNext: parseInt(page) < totalPages,
          hasPrev: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({
      error: 'Failed to get files',
      message: 'Something went wrong while fetching files'
    });
  }
});

// @route   GET /api/admin/files/:id
// @desc    Get specific file details
// @access  Private (Admin only)
router.get('/files/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id)
      .populate('uploadedBy', 'name email');

    if (!file) {
      return res.status(404).json({
        error: 'File not found',
        message: 'The requested file does not exist'
      });
    }

    res.json({
      success: true,
      data: {
        file
      }
    });
  } catch (error) {
    console.error('Get file error:', error);
    res.status(500).json({
      error: 'Failed to get file',
      message: 'Something went wrong while fetching file details'
    });
  }
});

// @route   DELETE /api/admin/files/:id
// @desc    Delete a file (admin only)
// @access  Private (Admin only)
router.delete('/files/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        error: 'File not found',
        message: 'The requested file does not exist'
      });
    }

    // Delete physical file
    try {
      const filePath = path.join(process.env.UPLOAD_PATH || './uploads', file.filePath);
      await fs.unlink(filePath);
    } catch (unlinkError) {
      console.error('Error deleting physical file:', unlinkError);
      // Continue with database deletion even if physical file doesn't exist
    }

    // Mark as deleted in database
    file.isDeleted = true;
    await file.save();

    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({
      error: 'Failed to delete file',
      message: 'Something went wrong while deleting the file'
    });
  }
});

// @route   POST /api/admin/files/cleanup
// @desc    Clean up expired files
// @access  Private (Admin only)
router.post('/files/cleanup', async (req, res) => {
  try {
    // Find expired files
    const expiredFiles = await File.find({
      isDeleted: false,
      expiresAt: { $lte: new Date() }
    });

    let deletedCount = 0;
    let errorCount = 0;

    // Delete each expired file
    for (const file of expiredFiles) {
      try {
        // Delete physical file
        const filePath = path.join(process.env.UPLOAD_PATH || './uploads', file.filePath);
        await fs.unlink(filePath);
        
        // Mark as deleted in database
        file.isDeleted = true;
        await file.save();
        
        deletedCount++;
      } catch (error) {
        console.error(`Error deleting file ${file.fileName}:`, error);
        errorCount++;
      }
    }

    res.json({
      success: true,
      message: `Cleanup completed. ${deletedCount} files deleted, ${errorCount} errors.`,
      data: {
        deletedCount,
        errorCount,
        totalExpired: expiredFiles.length
      }
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    res.status(500).json({
      error: 'Cleanup failed',
      message: 'Something went wrong during cleanup'
    });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private (Admin only)
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;

    // Build filter object
    const filter = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get users with pagination
    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalUsers = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / parseInt(limit));

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalUsers,
          hasNext: parseInt(page) < totalPages,
          hasPrev: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      error: 'Failed to get users',
      message: 'Something went wrong while fetching users'
    });
  }
});

// @route   PUT /api/admin/users/:id/status
// @desc    Toggle user active status
// @access  Private (Admin only)
router.put('/users/:id/status', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'The requested user does not exist'
      });
    }

    // Toggle active status
    user.isActive = !user.isActive;
    await user.save();

    res.json({
      success: true,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isActive: user.isActive
        }
      }
    });
  } catch (error) {
    console.error('Toggle user status error:', error);
    res.status(500).json({
      error: 'Failed to update user status',
      message: 'Something went wrong while updating user status'
    });
  }
});

// @route   GET /api/admin/analytics
// @desc    Get analytics data
// @access  Private (Admin only)
router.get('/analytics', async (req, res) => {
  try {
    const { period = '7d' } = req.query;
    
    // Calculate date range
    const now = new Date();
    let startDate;
    
    switch (period) {
      case '24h':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // Get files uploaded in period
    const filesInPeriod = await File.countDocuments({
      isDeleted: false,
      uploadedAt: { $gte: startDate }
    });

    // Get files by day in period
    const filesByDay = await File.aggregate([
      {
        $match: {
          isDeleted: false,
          uploadedAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$uploadedAt' }
          },
          count: { $sum: 1 },
          totalSize: { $sum: '$originalSize' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Get compression statistics
    const compressionStats = await File.aggregate([
      {
        $match: {
          isDeleted: false,
          uploadedAt: { $gte: startDate },
          savedPercent: { $exists: true }
        }
      },
      {
        $group: {
          _id: null,
          avgCompression: { $avg: '$savedPercent' },
          totalSaved: { $sum: { $subtract: ['$originalSize', '$compressedSize'] } },
          totalOriginal: { $sum: '$originalSize' },
          totalCompressed: { $sum: '$compressedSize' }
        }
      }
    ]);

    // Get top file types
    const topFileTypes = await File.aggregate([
      {
        $match: {
          isDeleted: false,
          uploadedAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$fileType',
          count: { $sum: 1 },
          totalSize: { $sum: '$originalSize' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      success: true,
      data: {
        period,
        overview: {
          filesInPeriod,
          avgCompression: compressionStats[0]?.avgCompression || 0,
          totalSaved: compressionStats[0]?.totalSaved || 0,
          totalOriginal: compressionStats[0]?.totalOriginal || 0,
          totalCompressed: compressionStats[0]?.totalCompressed || 0
        },
        filesByDay,
        topFileTypes
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      error: 'Failed to load analytics',
      message: 'Something went wrong while loading analytics data'
    });
  }
});

module.exports = router; 