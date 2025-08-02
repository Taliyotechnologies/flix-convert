const express = require('express');
const FileLog = require('../models/FileLog');
const User = require('../models/User');
const { requireAdmin } = require('../middleware/auth');
const fs = require('fs-extra');
const path = require('path');
const router = express.Router();

// Get dashboard statistics
router.get('/dashboard', requireAdmin, async (req, res) => {
  try {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Get files from last 24 hours
    const recentFiles = await FileLog.find({
      uploadedAt: { $gte: twentyFourHoursAgo }
    });

    // Calculate statistics
    const totalFiles = recentFiles.length;
    const totalUsers = await User.countDocuments();
    const totalOriginalSize = recentFiles.reduce((sum, file) => sum + file.originalSize, 0);
    const totalCompressedSize = recentFiles.reduce((sum, file) => sum + file.compressedSize, 0);
    const totalSaved = totalOriginalSize - totalCompressedSize;
    const percentSaved = totalOriginalSize > 0 ? ((totalSaved / totalOriginalSize) * 100).toFixed(1) : 0;

    // Files by type
    const filesByType = recentFiles.reduce((acc, file) => {
      acc[file.fileType] = (acc[file.fileType] || 0) + 1;
      return acc;
    }, {});

    // Files by operation
    const filesByOperation = recentFiles.reduce((acc, file) => {
      acc[file.operation] = (acc[file.operation] || 0) + 1;
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        totalFiles,
        totalUsers,
        totalOriginalSize,
        totalCompressedSize,
        totalSaved,
        percentSaved: parseFloat(percentSaved),
        filesByType,
        filesByOperation,
        recentFiles: recentFiles.slice(0, 10) // Last 10 files
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Failed to get dashboard data' });
  }
});

// Get all files (with pagination)
router.get('/files', requireAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const files = await FileLog.find()
      .sort({ uploadedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'email');

    const total = await FileLog.countDocuments();

    res.json({
      success: true,
      data: {
        files,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({ message: 'Failed to get files' });
  }
});

// Download file
router.get('/files/:id/download', requireAdmin, async (req, res) => {
  try {
    const fileLog = await FileLog.findById(req.params.id);
    
    if (!fileLog) {
      return res.status(404).json({ message: 'File not found' });
    }

    const filePath = fileLog.filePath;
    
    if (!await fs.pathExists(filePath)) {
      return res.status(404).json({ message: 'File not found on disk' });
    }

    res.download(filePath, fileLog.originalName);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ message: 'Failed to download file' });
  }
});

// Delete file
router.delete('/files/:id', requireAdmin, async (req, res) => {
  try {
    const fileLog = await FileLog.findById(req.params.id);
    
    if (!fileLog) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Delete file from disk
    const filePath = fileLog.filePath;
    if (await fs.pathExists(filePath)) {
      await fs.remove(filePath);
    }

    // Delete from database
    await FileLog.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({ message: 'Failed to delete file' });
  }
});

// Get file details
router.get('/files/:id', requireAdmin, async (req, res) => {
  try {
    const fileLog = await FileLog.findById(req.params.id).populate('userId', 'email');
    
    if (!fileLog) {
      return res.status(404).json({ message: 'File not found' });
    }

    const percentSaved = ((fileLog.originalSize - fileLog.compressedSize) / fileLog.originalSize * 100).toFixed(1);

    res.json({
      success: true,
      data: {
        ...fileLog.toObject(),
        percentSaved: parseFloat(percentSaved)
      }
    });
  } catch (error) {
    console.error('Get file details error:', error);
    res.status(500).json({ message: 'Failed to get file details' });
  }
});

// Get users list
router.get('/users', requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Failed to get users' });
  }
});

// Delete user
router.delete('/users/:id', requireAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Don't allow deleting the main admin
    if (user.email === 'harshbudhauliya882@gmail.com') {
      return res.status(403).json({ message: 'Cannot delete main admin user' });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

module.exports = router; 