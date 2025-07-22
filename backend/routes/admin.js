const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const router = express.Router();
const { adminAuth } = require('../middleware/adminAuth');
const Admin = require('../models/Admin');
const User = require('../models/User');
const Contact = require('../models/Contact');
const History = require('../models/History');
const File = require('../models/File');

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!admin.isActive) {
      return res.status(401).json({ error: 'Account is deactivated' });
    }

    if (admin.isLocked()) {
      return res.status(423).json({ error: 'Account is temporarily locked due to too many failed attempts' });
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      await admin.incLoginAttempts();
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Reset login attempts on successful login
    await admin.resetLoginAttempts();

    const token = jwt.sign(
      { adminId: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Admin Dashboard Stats
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    // Get total users
    const totalUsers = await User.countDocuments();
    
    // Get total contacts
    const totalContacts = await Contact.countDocuments();
    
    // Get total conversions and compressions
    const totalConversions = await History.countDocuments({ type: 'conversion' });
    const totalCompressions = await History.countDocuments({ type: 'compression' });
    
    // Get total downloads
    const totalDownloads = await History.aggregate([
      { $group: { _id: null, totalDownloads: { $sum: '$downloadCount' } } }
    ]);
    
    // Get today's stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayConversions = await History.countDocuments({
      type: 'conversion',
      createdAt: { $gte: today }
    });
    
    const todayCompressions = await History.countDocuments({
      type: 'compression',
      createdAt: { $gte: today }
    });
    
    const todayDownloads = await History.aggregate([
      { $match: { createdAt: { $gte: today } } },
      { $group: { _id: null, totalDownloads: { $sum: '$downloadCount' } } }
    ]);
    
    // Get file type breakdown
    const fileTypeStats = await History.aggregate([
      { $group: {
        _id: '$fileType',
        count: { $sum: 1 },
        downloads: { $sum: '$downloadCount' }
      }},
      { $sort: { count: -1 } }
    ]);
    
    // Get recent activity
    const recentActivity = await History.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('userId', 'name email');
    
    // Get online users (users who logged in within last 24 hours)
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const onlineUsers = await User.countDocuments({
      lastLogin: { $gte: last24Hours }
    });

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalContacts,
        totalConversions,
        totalCompressions,
        totalDownloads: totalDownloads[0]?.totalDownloads || 0,
        todayConversions,
        todayCompressions,
        todayDownloads: todayDownloads[0]?.totalDownloads || 0,
        onlineUsers
      },
      fileTypeStats,
      recentActivity
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// Get all users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '' } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get all contacts
router.get('/contacts', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, status = '' } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (status) {
      query.status = status;
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Update contact status
router.put('/contacts/:id/status', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({
      success: true,
      contact
    });

  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({ error: 'Failed to update contact status' });
  }
});

// Get temporary data (files that expire in 1 day)
router.get('/data', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    // Get files created in the last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const files = await File.find({
      createdAt: { $gte: oneDayAgo }
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

    const total = await File.countDocuments({
      createdAt: { $gte: oneDayAgo }
    });

    res.json({
      success: true,
      files,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get data error:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Download file from admin panel
router.get('/data/download/:filename', adminAuth, async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = require('path').join(__dirname, '../uploads', filename);
    
    const fs = require('fs');
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.download(filePath, filename);

  } catch (error) {
    console.error('Admin download error:', error);
    res.status(500).json({ error: 'Download failed' });
  }
});

// Delete expired files (run this daily)
router.delete('/data/cleanup', adminAuth, async (req, res) => {
  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    // Find expired files
    const expiredFiles = await File.find({
      createdAt: { $lt: oneDayAgo }
    });

    // Delete files from disk
    const fs = require('fs').promises;
    const path = require('path');
    
    for (const file of expiredFiles) {
      try {
        const filePath = path.join(__dirname, '../uploads', file.filename);
        await fs.unlink(filePath);
      } catch (error) {
        console.error(`Error deleting file ${file.filename}:`, error);
      }
    }

    // Delete from database
    const result = await File.deleteMany({
      createdAt: { $lt: oneDayAgo }
    });

    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} expired files`,
      deletedCount: result.deletedCount
    });

  } catch (error) {
    console.error('Cleanup error:', error);
    res.status(500).json({ error: 'Cleanup failed' });
  }
});

// Admin forgot password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    admin.resetPasswordToken = resetToken;
    admin.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await admin.save();

    // In a real app, send email here
    // For now, return the token (in production, send via email)
    res.json({
      success: true,
      message: 'Password reset token generated',
      resetToken // Remove this in production
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

// Admin reset password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const admin = await Admin.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!admin) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    admin.password = newPassword;
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;
    await admin.save();

    res.json({
      success: true,
      message: 'Password reset successfully'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

// Get admin profile
router.get('/profile', adminAuth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    res.json({
      success: true,
      admin
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update admin profile
router.put('/profile', adminAuth, async (req, res) => {
  try {
    const { name, email } = req.body;

    const admin = await Admin.findByIdAndUpdate(
      req.admin._id,
      { name, email },
      { new: true }
    ).select('-password');

    res.json({
      success: true,
      admin
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Change admin password
router.put('/change-password', adminAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.admin._id);
    const isPasswordValid = await admin.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

module.exports = router; 