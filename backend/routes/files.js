const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const jwt = require('jsonwebtoken');
const { auth } = require('../middleware/auth');
const File = require('../models/File');
const History = require('../models/History');

const router = express.Router();

// Download compressed file
router.get('/download/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const token = req.query.token || req.headers.authorization?.replace('Bearer ', '');

    // Find file record (public)
    const fileRecord = await File.findOne({ filename: filename });
    if (!fileRecord) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Check file size for auth requirement
    const TEN_MB = 10 * 1024 * 1024;
    if (fileRecord.compressedSize > TEN_MB) {
      // Require token for large files
      if (!token) {
        return res.status(401).json({ error: 'Sign up required to download files larger than 10MB', requiresAuth: true });
      }
      // Verify token
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Optionally, check if decoded.userId === fileRecord.user.toString()
      } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token. Please login again.', requiresAuth: true });
      }
    }

    const filePath = path.join('uploads', filename);
    // Check if file exists
    try {
      await fs.access(filePath);
    } catch (error) {
      return res.status(404).json({ error: 'File not found on server' });
    }

    // Update download count in history if user is authenticated
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const historyEntry = await History.findOne({
          userId: decoded.userId,
          convertedFileName: filename,
          status: 'success'
        });
        
        if (historyEntry) {
          historyEntry.downloadCount += 1;
          await historyEntry.save();
        }
      } catch (error) {
        console.error('Error updating download count:', error);
      }
    }

    // Set headers for download
    res.setHeader('Content-Type', fileRecord.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${fileRecord.originalName}"`);
    res.setHeader('Content-Length', fileRecord.compressedSize);

    // Stream file to response
    const fileStream = require('fs').createReadStream(filePath);
    fileStream.pipe(res);

  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Download failed' });
  }
});

// Get file info
router.get('/info/:fileId', auth, async (req, res) => {
  try {
    const { fileId } = req.params;
    
    const fileRecord = await File.findOne({ 
      _id: fileId,
      user: req.user._id 
    });

    if (!fileRecord) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.json({
      success: true,
      data: fileRecord
    });

  } catch (error) {
    console.error('Get file info error:', error);
    res.status(500).json({ error: 'Failed to get file info' });
  }
});

// Delete file
router.delete('/delete/:fileId', auth, async (req, res) => {
  try {
    const { fileId } = req.params;
    
    const fileRecord = await File.findOne({ 
      _id: fileId,
      user: req.user._id 
    });

    if (!fileRecord) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete file from disk
    const filePath = path.join('uploads', fileRecord.filename);
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error('File deletion error:', error);
    }

    // Delete record from database
    await File.findByIdAndDelete(fileId);

    res.json({
      success: true,
      message: 'File deleted successfully'
    });

  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

module.exports = router; 