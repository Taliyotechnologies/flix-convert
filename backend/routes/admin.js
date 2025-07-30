const express = require('express');
const File = require('../models/File');
const User = require('../models/User');
const { adminAuth } = require('../middleware/auth');
const { formatFileSize } = require('../utils/fileProcessor');

const router = express.Router();

// Get dashboard statistics
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const totalFiles = await File.countDocuments();
    const totalUsers = await User.countDocuments();
    
    // Files by type
    const filesByType = await File.aggregate([
      {
        $group: {
          _id: '$fileType',
          count: { $sum: 1 },
          totalSize: { $sum: '$originalSize' },
          totalCompressedSize: { $sum: '$compressedSize' }
        }
      }
    ]);

    // Recent files (last 7 days)
    const recentFiles = await File.countDocuments({
      uploadedAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    // Total space saved
    const totalSaved = await File.aggregate([
      {
        $group: {
          _id: null,
          totalOriginal: { $sum: '$originalSize' },
          totalCompressed: { $sum: '$compressedSize' }
        }
      }
    ]);

    const stats = {
      totalFiles,
      totalUsers,
      recentFiles,
      filesByType: filesByType.map(type => ({
        type: type._id,
        count: type.count,
        totalSize: formatFileSize(type.totalSize),
        totalCompressedSize: formatFileSize(type.totalCompressedSize),
        savedPercent: Math.round(((type.totalSize - type.totalCompressedSize) / type.totalSize) * 100)
      })),
      totalSpaceSaved: totalSaved.length > 0 ? {
        original: formatFileSize(totalSaved[0].totalOriginal),
        compressed: formatFileSize(totalSaved[0].totalCompressed),
        saved: formatFileSize(totalSaved[0].totalOriginal - totalSaved[0].totalCompressed),
        savedPercent: Math.round(((totalSaved[0].totalOriginal - totalSaved[0].totalCompressed) / totalSaved[0].totalOriginal) * 100)
      } : null
    };

    res.json(stats);
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

// Get all files with pagination
router.get('/files', adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const files = await File.find()
      .sort({ uploadedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name email');

    const total = await File.countDocuments();

    res.json({
      files: files.map(file => ({
        id: file._id,
        fileName: file.fileName,
        originalName: file.originalName,
        fileType: file.fileType,
        originalSize: formatFileSize(file.originalSize),
        compressedSize: formatFileSize(file.compressedSize),
        savedPercent: file.savedPercent,
        uploadedAt: file.uploadedAt,
        expiresAt: file.expiresAt,
        timeLeft: file.getTimeLeftFormatted(),
        isExpired: file.isExpired(),
        user: file.userId ? {
          name: file.userId.name,
          email: file.userId.email
        } : null,
        downloadUrl: `/uploads/${file.fileName}`
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Files error:', error);
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

    // Delete physical file
    const fs = require('fs').promises;
    try {
      await fs.unlink(file.filePath);
    } catch (error) {
      console.error('Failed to delete physical file:', error);
    }

    // Delete from database
    await File.findByIdAndDelete(req.params.id);

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// Get all users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    // Get file count for each user
    const usersWithFileCount = await Promise.all(
      users.map(async (user) => {
        const fileCount = await File.countDocuments({ userId: user._id });
        return {
          ...user.toJSON(),
          fileCount
        };
      })
    );

    res.json({
      users: usersWithFileCount,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Users error:', error);
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

    res.json({ message: 'User role updated successfully', user });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

// Deactivate/activate user
router.put('/users/:id/status', adminAuth, async (req, res) => {
  try {
    const { isActive } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ 
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`, 
      user 
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({ error: 'Failed to update user status' });
  }
});

// Get system info
router.get('/system', adminAuth, async (req, res) => {
  try {
    const os = require('os');
    const fs = require('fs').promises;
    const path = require('path');

    // Disk usage
    const uploadsDir = path.join(__dirname, '../uploads');
    let diskUsage = { free: 0, total: 0 };
    
    try {
      const stats = await fs.stat(uploadsDir);
      // This is a simplified version - in production you'd want to use a proper disk usage library
      diskUsage = {
        free: os.freemem(),
        total: os.totalmem()
      };
    } catch (error) {
      console.error('Failed to get disk usage:', error);
    }

    const systemInfo = {
      platform: os.platform(),
      arch: os.arch(),
      nodeVersion: process.version,
      uptime: process.uptime(),
      memory: {
        free: formatFileSize(os.freemem()),
        total: formatFileSize(os.totalmem()),
        used: formatFileSize(os.totalmem() - os.freemem())
      },
      disk: {
        free: formatFileSize(diskUsage.free),
        total: formatFileSize(diskUsage.total)
      },
      environment: process.env.NODE_ENV || 'development'
    };

    res.json(systemInfo);
  } catch (error) {
    console.error('System info error:', error);
    res.status(500).json({ error: 'Failed to get system info' });
  }
});

module.exports = router; 