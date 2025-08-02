const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const FileLog = require('../models/FileLog');

// Admin login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if admin credentials are provided
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // For demo purposes, using hardcoded admin credentials
    // In production, this should be stored in database with proper hashing
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (username !== adminUsername) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // In production, use bcrypt.compare(password, hashedPassword)
    if (password !== adminPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

// Get all files
const getAllFiles = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', fileType = '' } = req.query;
    
    const query = { isExpired: false };
    
    if (search) {
      query.$or = [
        { fileName: { $regex: search, $options: 'i' } },
        { originalName: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (fileType) {
      query.fileType = fileType;
    }

    const skip = (page - 1) * limit;
    
    const files = await FileLog.find(query)
      .sort({ uploadedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await FileLog.countDocuments(query);

    // Calculate time remaining for each file
    const filesWithTimeRemaining = files.map(file => {
      const timeRemaining = file.expiresAt - new Date();
      const hoursRemaining = Math.max(0, Math.floor(timeRemaining / (1000 * 60 * 60)));
      const minutesRemaining = Math.max(0, Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)));
      
      return {
        ...file.toObject(),
        timeRemaining: {
          hours: hoursRemaining,
          minutes: minutesRemaining,
          total: timeRemaining
        }
      };
    });

    res.json({
      success: true,
      data: {
        files: filesWithTimeRemaining,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalFiles: total,
          filesPerPage: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({ error: 'Error fetching files' });
  }
};

// Download file
const downloadFile = async (req, res) => {
  try {
    const { id } = req.params;

    const file = await FileLog.findById(id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    if (file.isExpired) {
      return res.status(404).json({ error: 'File has expired' });
    }

    const filePath = path.join(__dirname, '..', file.filePath);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found on disk' });
    }

    // Set headers for download
    res.setHeader('Content-Disposition', `attachment; filename="${file.fileName}"`);
    res.setHeader('Content-Type', 'application/octet-stream');

    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Error downloading file' });
  }
};

// Delete file
const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;

    const file = await FileLog.findById(id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete physical file
    const filePath = path.join(__dirname, '..', file.filePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Mark as expired in database
    file.isExpired = true;
    await file.save();

    res.json({
      success: true,
      message: 'File deleted successfully'
    });

  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Error deleting file' });
  }
};

// Get file statistics
const getStats = async (req, res) => {
  try {
    const totalFiles = await FileLog.countDocuments({ isExpired: false });
    const imageFiles = await FileLog.countDocuments({ fileType: 'image', isExpired: false });
    const videoFiles = await FileLog.countDocuments({ fileType: 'video', isExpired: false });
    const audioFiles = await FileLog.countDocuments({ fileType: 'audio', isExpired: false });
    const pdfFiles = await FileLog.countDocuments({ fileType: 'pdf', isExpired: false });

    // Calculate total storage saved
    const files = await FileLog.find({ isExpired: false });
    const totalOriginalSize = files.reduce((sum, file) => sum + file.originalSize, 0);
    const totalProcessedSize = files.reduce((sum, file) => sum + file.processedSize, 0);
    const totalSaved = totalOriginalSize - totalProcessedSize;
    const averageSavedPercent = files.length > 0 
      ? Math.round(files.reduce((sum, file) => sum + file.savedPercent, 0) / files.length)
      : 0;

    res.json({
      success: true,
      data: {
        totalFiles,
        byType: {
          image: imageFiles,
          video: videoFiles,
          audio: audioFiles,
          pdf: pdfFiles
        },
        storage: {
          totalOriginalSize,
          totalProcessedSize,
          totalSaved,
          averageSavedPercent
        }
      }
    });

  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Error fetching statistics' });
  }
};

module.exports = {
  login,
  getAllFiles,
  downloadFile,
  deleteFile,
  getStats
}; 