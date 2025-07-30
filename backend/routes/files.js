const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const File = require('../models/File');
const { optionalAuth } = require('../middleware/auth');
const {
  compressImage,
  convertImage,
  compressVideo,
  convertVideo,
  compressAudio,
  convertAudio,
  compressPDF,
  formatFileSize,
  cleanupOldFiles
} = require('../utils/fileProcessor');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '../uploads');
    try {
      await fs.mkdir(uploadsDir, { recursive: true });
      cb(null, uploadsDir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const ext = path.extname(file.originalname);
    cb(null, `${timestamp}_${randomId}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      // Images
      'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif', 'image/tiff',
      // Videos
      'video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv', 'video/webm',
      // Audio
      'audio/mpeg', 'audio/wav', 'audio/aac', 'audio/ogg', 'audio/flac',
      // Documents
      'application/pdf'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File type not supported'), false);
    }
  }
});

// Helper function to determine file type
const getFileType = (mimetype) => {
  if (mimetype.startsWith('image/')) return 'image';
  if (mimetype.startsWith('video/')) return 'video';
  if (mimetype.startsWith('audio/')) return 'audio';
  if (mimetype === 'application/pdf') return 'pdf';
  return 'document';
};

// Helper function to save file record
const saveFileRecord = async (req, result, originalFormat, convertedFormat = null) => {
  const fileType = getFileType(req.file.mimetype);
  
  const fileRecord = new File({
    fileName: result.outputName,
    originalName: req.file.originalname,
    fileType,
    originalSize: result.originalSize,
    compressedSize: result.compressedSize,
    savedPercent: result.savedPercent,
    originalFormat,
    convertedFormat,
    filePath: result.outputPath,
    userId: req.user?._id,
    ipAddress: req.ip,
    userAgent: req.get('User-Agent')
  });

  await fileRecord.save();
  return fileRecord;
};

// Image compression
router.post('/compress/image', optionalAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await compressImage(req.file.path);
    const fileRecord = await saveFileRecord(req, result, path.extname(req.file.originalname).slice(1));

    // Clean up original file
    await fs.unlink(req.file.path);

    res.json({
      success: true,
      file: {
        id: fileRecord._id,
        fileName: fileRecord.fileName,
        originalName: fileRecord.originalName,
        originalSize: formatFileSize(fileRecord.originalSize),
        compressedSize: formatFileSize(fileRecord.compressedSize),
        savedPercent: fileRecord.savedPercent,
        downloadUrl: `/uploads/${fileRecord.fileName}`,
        expiresAt: fileRecord.expiresAt
      }
    });
  } catch (error) {
    console.error('Image compression error:', error);
    res.status(500).json({ error: 'Failed to compress image' });
  }
});

// Image conversion
router.post('/convert/image', optionalAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { targetFormat } = req.body;
    if (!targetFormat) {
      return res.status(400).json({ error: 'Target format is required' });
    }

    const result = await convertImage(req.file.path, targetFormat);
    const fileRecord = await saveFileRecord(
      req, 
      result, 
      path.extname(req.file.originalname).slice(1), 
      targetFormat
    );

    // Clean up original file
    await fs.unlink(req.file.path);

    res.json({
      success: true,
      file: {
        id: fileRecord._id,
        fileName: fileRecord.fileName,
        originalName: fileRecord.originalName,
        originalSize: formatFileSize(fileRecord.originalSize),
        compressedSize: formatFileSize(fileRecord.compressedSize),
        savedPercent: fileRecord.savedPercent,
        downloadUrl: `/uploads/${fileRecord.fileName}`,
        expiresAt: fileRecord.expiresAt
      }
    });
  } catch (error) {
    console.error('Image conversion error:', error);
    res.status(500).json({ error: 'Failed to convert image' });
  }
});

// Video compression
router.post('/compress/video', optionalAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await compressVideo(req.file.path);
    const fileRecord = await saveFileRecord(req, result, path.extname(req.file.originalname).slice(1));

    // Clean up original file
    await fs.unlink(req.file.path);

    res.json({
      success: true,
      file: {
        id: fileRecord._id,
        fileName: fileRecord.fileName,
        originalName: fileRecord.originalName,
        originalSize: formatFileSize(fileRecord.originalSize),
        compressedSize: formatFileSize(fileRecord.compressedSize),
        savedPercent: fileRecord.savedPercent,
        downloadUrl: `/uploads/${fileRecord.fileName}`,
        expiresAt: fileRecord.expiresAt
      }
    });
  } catch (error) {
    console.error('Video compression error:', error);
    res.status(500).json({ error: 'Failed to compress video' });
  }
});

// Video conversion
router.post('/convert/video', optionalAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { targetFormat } = req.body;
    if (!targetFormat) {
      return res.status(400).json({ error: 'Target format is required' });
    }

    const result = await convertVideo(req.file.path, targetFormat);
    const fileRecord = await saveFileRecord(
      req, 
      result, 
      path.extname(req.file.originalname).slice(1), 
      targetFormat
    );

    // Clean up original file
    await fs.unlink(req.file.path);

    res.json({
      success: true,
      file: {
        id: fileRecord._id,
        fileName: fileRecord.fileName,
        originalName: fileRecord.originalName,
        originalSize: formatFileSize(fileRecord.originalSize),
        compressedSize: formatFileSize(fileRecord.compressedSize),
        savedPercent: fileRecord.savedPercent,
        downloadUrl: `/uploads/${fileRecord.fileName}`,
        expiresAt: fileRecord.expiresAt
      }
    });
  } catch (error) {
    console.error('Video conversion error:', error);
    res.status(500).json({ error: 'Failed to convert video' });
  }
});

// Audio compression
router.post('/compress/audio', optionalAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await compressAudio(req.file.path);
    const fileRecord = await saveFileRecord(req, result, path.extname(req.file.originalname).slice(1));

    // Clean up original file
    await fs.unlink(req.file.path);

    res.json({
      success: true,
      file: {
        id: fileRecord._id,
        fileName: fileRecord.fileName,
        originalName: fileRecord.originalName,
        originalSize: formatFileSize(fileRecord.originalSize),
        compressedSize: formatFileSize(fileRecord.compressedSize),
        savedPercent: fileRecord.savedPercent,
        downloadUrl: `/uploads/${fileRecord.fileName}`,
        expiresAt: fileRecord.expiresAt
      }
    });
  } catch (error) {
    console.error('Audio compression error:', error);
    res.status(500).json({ error: 'Failed to compress audio' });
  }
});

// Audio conversion
router.post('/convert/audio', optionalAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { targetFormat } = req.body;
    if (!targetFormat) {
      return res.status(400).json({ error: 'Target format is required' });
    }

    const result = await convertAudio(req.file.path, targetFormat);
    const fileRecord = await saveFileRecord(
      req, 
      result, 
      path.extname(req.file.originalname).slice(1), 
      targetFormat
    );

    // Clean up original file
    await fs.unlink(req.file.path);

    res.json({
      success: true,
      file: {
        id: fileRecord._id,
        fileName: fileRecord.fileName,
        originalName: fileRecord.originalName,
        originalSize: formatFileSize(fileRecord.originalSize),
        compressedSize: formatFileSize(fileRecord.compressedSize),
        savedPercent: fileRecord.savedPercent,
        downloadUrl: `/uploads/${fileRecord.fileName}`,
        expiresAt: fileRecord.expiresAt
      }
    });
  } catch (error) {
    console.error('Audio conversion error:', error);
    res.status(500).json({ error: 'Failed to convert audio' });
  }
});

// PDF compression
router.post('/compress/pdf', optionalAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await compressPDF(req.file.path);
    const fileRecord = await saveFileRecord(req, result, 'pdf');

    // Clean up original file
    await fs.unlink(req.file.path);

    res.json({
      success: true,
      file: {
        id: fileRecord._id,
        fileName: fileRecord.fileName,
        originalName: fileRecord.originalName,
        originalSize: formatFileSize(fileRecord.originalSize),
        compressedSize: formatFileSize(fileRecord.compressedSize),
        savedPercent: fileRecord.savedPercent,
        downloadUrl: `/uploads/${fileRecord.fileName}`,
        expiresAt: fileRecord.expiresAt
      }
    });
  } catch (error) {
    console.error('PDF compression error:', error);
    res.status(500).json({ error: 'Failed to compress PDF' });
  }
});

// Get supported formats
router.get('/formats', (req, res) => {
  res.json({
    image: {
      compress: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'tiff'],
      convert: ['jpg', 'jpeg', 'png', 'webp', 'avif', 'tiff']
    },
    video: {
      compress: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'],
      convert: ['mp4', 'avi', 'mov', 'webm']
    },
    audio: {
      compress: ['mp3', 'wav', 'aac', 'ogg', 'flac'],
      convert: ['mp3', 'wav', 'aac', 'ogg']
    },
    pdf: {
      compress: ['pdf']
    }
  });
});

// Cleanup old files (cron job endpoint)
router.post('/cleanup', async (req, res) => {
  try {
    await cleanupOldFiles();
    res.json({ message: 'Cleanup completed successfully' });
  } catch (error) {
    console.error('Cleanup error:', error);
    res.status(500).json({ error: 'Cleanup failed' });
  }
});

module.exports = router; 