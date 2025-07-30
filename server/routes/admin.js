const express = require('express');
const File = require('../models/File');
const User = require('../models/User');
const { adminAuth } = require('../middleware/auth');
const fs = require('fs-extra');
const path = require('path');

const router = express.Router();

// Get dashboard stats
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    // Total files
    const totalFiles = await File.countDocuments();
    
    // Files by type
    const filesByType = await File.aggregate([
      {
        $group: {
          _id: '$fileType',
          count: { $sum: 1 },
          totalSize: { $sum: '$originalSize' },
          totalSaved: { $sum: { $subtract: ['$originalSize', '$compressedSize'] } }
        }
      }
    ]);

    // Recent files (last 7 days)
    const recentFiles = await File.find({
      uploadedAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    })
    .sort({ uploadedAt: -1 })
    .limit(10)
    .populate('uploadedBy', 'name email');

    // Total users
    const totalUsers = await User.countDocuments();

    // Total storage saved
    const storageStats = await File.aggregate([
      {
        $group: {
          _id: null,
          totalOriginalSize: { $sum: '$originalSize' },
          totalCompressedSize: { $sum: '$compressedSize' },
          totalSaved: { $sum: { $subtract: ['$originalSize', '$compressedSize'] } }
        }
      }
    ]);

    const stats = storageStats[0] || { totalOriginalSize: 0, totalCompressedSize: 0, totalSaved: 0 };

    res.json({
      success: true,
      stats: {
        totalFiles,
        totalUsers,
        totalOriginalSize: stats.totalOriginalSize,
        totalCompressedSize: stats.totalCompressedSize,
        totalSaved: stats.totalSaved,
        filesByType,
        recentFiles
      }
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to get dashboard stats' });
  }
});

// Get all files with pagination
router.get('/files', adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const fileType = req.query.fileType || '';

    const query = {};
    
    if (search) {
      query.$or = [
        { fileName: { $regex: search, $options: 'i' } },
        { originalName: { $regex: search, $options: 'i' } }
      ];
    }

    if (fileType) {
      query.fileType = fileType;
    }

    const totalFiles = await File.countDocuments(query);
    const totalPages = Math.ceil(totalFiles / limit);

    const files = await File.find(query)
      .populate('uploadedBy', 'name email')
      .sort({ uploadedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      files,
      pagination: {
        page,
        limit,
        totalFiles,
        totalPages
      }
    });

  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({ error: 'Failed to get files' });
  }
});

// Delete file
router.delete('/files/:id', adminAuth, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete physical files
    try {
      if (fs.existsSync(file.originalPath)) {
        fs.unlinkSync(file.originalPath);
      }
      if (fs.existsSync(file.processedPath)) {
        fs.unlinkSync(file.processedPath);
      }
    } catch (fileError) {
      console.error('File deletion error:', fileError);
    }

    // Delete from database
    await File.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'File deleted successfully' });

  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// Get file analytics
router.get('/analytics', adminAuth, async (req, res) => {
  try {
    const { period = '7d' } = req.query;
    
    let startDate;
    switch (period) {
      case '24h':
        startDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    }

    // Files uploaded per day
    const dailyUploads = await File.aggregate([
      {
        $match: {
          uploadedAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$uploadedAt" }
          },
          count: { $sum: 1 },
          totalSize: { $sum: '$originalSize' },
          totalSaved: { $sum: { $subtract: ['$originalSize', '$compressedSize'] } }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // File type distribution
    const fileTypeDistribution = await File.aggregate([
      {
        $match: {
          uploadedAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$fileType',
          count: { $sum: 1 },
          totalSize: { $sum: '$originalSize' }
        }
      }
    ]);

    // Average compression ratio by file type
    const compressionStats = await File.aggregate([
      {
        $match: {
          uploadedAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$fileType',
          avgCompressionRatio: { $avg: '$savedPercent' },
          totalFiles: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      analytics: {
        dailyUploads,
        fileTypeDistribution,
        compressionStats,
        period
      }
    });

  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to get analytics' });
  }
});

// Get user management
router.get('/users', adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limit);

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      users,
      pagination: {
        page,
        limit,
        totalUsers,
        totalPages
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to get users' });
  }
});

// Update user role
router.put('/users/:id/role', adminAuth, async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, user });

  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

// Delete user
router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete user's files
    await File.deleteMany({ uploadedBy: user._id });

    // Delete user
    await User.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'User deleted successfully' });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router; 