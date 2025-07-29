const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const FileLog = require('../models/FileLog');
const CleanupCron = require('../utils/cleanupCron');

class AdminController {
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      
      // Simple admin credentials (in production, use environment variables)
      const ADMIN_USERNAME = 'admin';
      const ADMIN_PASSWORD = 'flixconvert2024';
      
      if (username !== ADMIN_USERNAME) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
      
      const isValidPassword = await bcrypt.compare(password, await bcrypt.hash(ADMIN_PASSWORD, 10));
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { username, role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      res.json({
        success: true,
        message: 'Login successful',
        data: {
          token,
          user: { username, role: 'admin' }
        }
      });
      
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Login failed',
        error: error.message
      });
    }
  }
  
  static async getDashboardStats(req, res) {
    try {
      // Get total files
      const totalFiles = await FileLog.countDocuments();
      
      // Get files by type
      const filesByType = await FileLog.aggregate([
        {
          $group: {
            _id: '$fileType',
            count: { $sum: 1 },
            totalOriginalSize: { $sum: '$originalSize' },
            totalCompressedSize: { $sum: '$compressedSize' }
          }
        }
      ]);
      
      // Get total sizes
      const totalSizes = await FileLog.aggregate([
        {
          $group: {
            _id: null,
            totalOriginalSize: { $sum: '$originalSize' },
            totalCompressedSize: { $sum: '$compressedSize' }
          }
        }
      ]);
      
      // Get recent files (last 24 hours)
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const recentFiles = await FileLog.countDocuments({
        uploadTime: { $gte: twentyFourHoursAgo }
      });
      
      // Get download stats
      const totalDownloads = await FileLog.aggregate([
        {
          $group: {
            _id: null,
            totalDownloads: { $sum: '$downloadCount' }
          }
        }
      ]);
      
      res.json({
        success: true,
        data: {
          totalFiles,
          filesByType,
          totalOriginalSize: totalSizes[0]?.totalOriginalSize || 0,
          totalCompressedSize: totalSizes[0]?.totalCompressedSize || 0,
          recentFiles,
          totalDownloads: totalDownloads[0]?.totalDownloads || 0
        }
      });
      
    } catch (error) {
      console.error('Dashboard stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get dashboard stats',
        error: error.message
      });
    }
  }
  
  static async getAllFiles(req, res) {
    try {
      const { page = 1, limit = 20, type, status } = req.query;
      
      const query = {};
      if (type) query.fileType = type;
      if (status) query.status = status;
      
      const files = await FileLog.find(query)
        .sort({ uploadTime: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      
      const total = await FileLog.countDocuments(query);
      
      res.json({
        success: true,
        data: {
          files,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalFiles: total,
            hasNextPage: page * limit < total,
            hasPrevPage: page > 1
          }
        }
      });
      
    } catch (error) {
      console.error('Get files error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get files',
        error: error.message
      });
    }
  }
  
  static async deleteMultipleFiles(req, res) {
    try {
      const { fileIds } = req.body;
      
      if (!fileIds || !Array.isArray(fileIds)) {
        return res.status(400).json({
          success: false,
          message: 'File IDs array is required'
        });
      }
      
      const deletedFiles = await FileLog.find({ _id: { $in: fileIds } });
      
      // Delete physical files
      for (const file of deletedFiles) {
        const filePath = path.join('./uploads', file.fileName);
        await fs.unlink(filePath).catch(err => {
          console.log(`Warning: Could not delete physical file: ${file.fileName}`);
        });
      }
      
      // Delete from database
      await FileLog.deleteMany({ _id: { $in: fileIds } });
      
      res.json({
        success: true,
        message: `Successfully deleted ${deletedFiles.length} files`,
        data: { deletedCount: deletedFiles.length }
      });
      
    } catch (error) {
      console.error('Delete multiple files error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete files',
        error: error.message
      });
    }
  }
  
  static async runManualCleanup(req, res) {
    try {
      await CleanupCron.manualCleanup();
      
      res.json({
        success: true,
        message: 'Manual cleanup completed successfully'
      });
      
    } catch (error) {
      console.error('Manual cleanup error:', error);
      res.status(500).json({
        success: false,
        message: 'Manual cleanup failed',
        error: error.message
      });
    }
  }
  
  static async getStorageStats(req, res) {
    try {
      const stats = await CleanupCron.getStorageStats();
      
      res.json({
        success: true,
        data: stats
      });
      
    } catch (error) {
      console.error('Storage stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get storage stats',
        error: error.message
      });
    }
  }
}

module.exports = AdminController;