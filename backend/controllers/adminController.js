const FileLog = require('../models/FileLog');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs-extra');
const { JWT_SECRET } = require('../middlewares/auth');

// Admin credentials (in production, use environment variables)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: '$2a$10$rQZ8K9mN2pL1vX3yA7bC4dE5fG6hH7iJ8kL9mN0oP1qR2sT3uV4wX5yZ6'
};

// Admin login
const loginHandler = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({
        error: 'Missing credentials',
        message: 'Username and password are required'
      });
    }
    
    if (username !== ADMIN_CREDENTIALS.username) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Username or password is incorrect'
      });
    }
    
    const isValidPassword = await bcrypt.compare(password, ADMIN_CREDENTIALS.password);
    
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Username or password is incorrect'
      });
    }
    
    const token = jwt.sign(
      { username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      message: 'Login successful',
      token
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Login failed',
      message: error.message
    });
  }
};

// Get all files
const getFilesHandler = async (req, res) => {
  try {
    const { page = 1, limit = 20, fileType, operation } = req.query;
    const skip = (page - 1) * limit;
    
    let query = {};
    if (fileType) query.fileType = fileType;
    if (operation) query.operation = operation;
    
    const files = await FileLog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await FileLog.countDocuments(query);
    
    res.json({
      success: true,
      data: {
        files,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
    
  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({
      error: 'Failed to fetch files',
      message: error.message
    });
  }
};

// Download file
const downloadFileHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await FileLog.findById(id);
    
    if (!file) {
      return res.status(404).json({
        error: 'File not found',
        message: 'The requested file does not exist'
      });
    }
    
    const filePath = path.join(__dirname, '..', file.filePath);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        error: 'File not found',
        message: 'The file has been deleted or moved'
      });
    }
    
    res.download(filePath, file.fileName);
    
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({
      error: 'Download failed',
      message: error.message
    });
  }
};

// Delete file
const deleteFileHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await FileLog.findById(id);
    
    if (!file) {
      return res.status(404).json({
        error: 'File not found',
        message: 'The requested file does not exist'
      });
    }
    
    const filePath = path.join(__dirname, '..', file.filePath);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    await FileLog.findByIdAndDelete(id);
    
    res.json({
      success: true,
      message: 'File deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      error: 'Delete failed',
      message: error.message
    });
  }
};

// Get stats
const getStatsHandler = async (req, res) => {
  try {
    const totalFiles = await FileLog.countDocuments();
    const totalSizeSaved = await FileLog.aggregate([
      { $group: { _id: null, totalSaved: { $sum: { $subtract: ['$originalSize', '$processedSize'] } } } }
    ]);
    
    const filesByType = await FileLog.aggregate([
      { $group: { _id: '$fileType', count: { $sum: 1 } } }
    ]);
    
    const filesByOperation = await FileLog.aggregate([
      { $group: { _id: '$operation', count: { $sum: 1 } } }
    ]);
    
    res.json({
      success: true,
      data: {
        totalFiles,
        totalSizeSaved: totalSizeSaved[0]?.totalSaved || 0,
        filesByType,
        filesByOperation
      }
    });
    
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch stats',
      message: error.message
    });
  }
};

module.exports = {
  loginHandler,
  getFilesHandler,
  downloadFileHandler,
  deleteFileHandler,
  getStatsHandler
}; 