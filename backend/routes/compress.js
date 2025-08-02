const express = require('express');
const multer = require('multer');
const FileLog = require('../models/FileLog');
const { processImage, processVideo, processAudio, processPDF } = require('../utils/fileProcessor');
const router = express.Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check file type based on route
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];
    const allowedVideoTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/webm', 'video/mkv'];
    const allowedAudioTypes = ['audio/mp3', 'audio/aac', 'audio/ogg', 'audio/wav', 'audio/flac'];
    const allowedPdfTypes = ['application/pdf'];

    const route = req.route.path;
    
    if (route === '/image' && allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else if (route === '/video' && allowedVideoTypes.includes(file.mimetype)) {
      cb(null, true);
    } else if (route === '/audio' && allowedAudioTypes.includes(file.mimetype)) {
      cb(null, true);
    } else if (route === '/pdf' && allowedPdfTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

// Helper function to create file log
const createFileLog = async (fileData, req) => {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours from now

  const fileLog = new FileLog({
    fileName: fileData.fileName,
    originalName: req.file.originalname,
    fileType: req.route.path.slice(1), // Remove leading slash
    operation: 'compress',
    originalSize: fileData.originalSize,
    compressedSize: fileData.compressedSize,
    originalFormat: fileData.originalFormat,
    convertedFormat: fileData.convertedFormat,
    filePath: fileData.filePath,
    expiresAt,
    userId: req.user ? req.user._id : null,
    ipAddress: req.ip,
    userAgent: req.get('User-Agent')
  });

  await fileLog.save();
  return fileLog;
};

// Compress image
router.post('/image', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await processImage(req.file, 'compress');
    const fileLog = await createFileLog(result, req);

    const percentSaved = ((result.originalSize - result.compressedSize) / result.originalSize * 100).toFixed(1);

    res.json({
      success: true,
      message: 'Image compressed successfully',
      data: {
        fileName: result.fileName,
        originalSize: result.originalSize,
        compressedSize: result.compressedSize,
        percentSaved: parseFloat(percentSaved),
        originalFormat: result.originalFormat,
        convertedFormat: result.convertedFormat,
        fileId: fileLog._id,
        expiresAt: fileLog.expiresAt
      }
    });
  } catch (error) {
    console.error('Image compression error:', error);
    res.status(500).json({ message: error.message || 'Image compression failed' });
  }
});

// Compress video
router.post('/video', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await processVideo(req.file, 'compress');
    const fileLog = await createFileLog(result, req);

    const percentSaved = ((result.originalSize - result.compressedSize) / result.originalSize * 100).toFixed(1);

    res.json({
      success: true,
      message: 'Video compressed successfully',
      data: {
        fileName: result.fileName,
        originalSize: result.originalSize,
        compressedSize: result.compressedSize,
        percentSaved: parseFloat(percentSaved),
        originalFormat: result.originalFormat,
        convertedFormat: result.convertedFormat,
        fileId: fileLog._id,
        expiresAt: fileLog.expiresAt
      }
    });
  } catch (error) {
    console.error('Video compression error:', error);
    res.status(500).json({ message: error.message || 'Video compression failed' });
  }
});

// Compress audio
router.post('/audio', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await processAudio(req.file, 'compress');
    const fileLog = await createFileLog(result, req);

    const percentSaved = ((result.originalSize - result.compressedSize) / result.originalSize * 100).toFixed(1);

    res.json({
      success: true,
      message: 'Audio compressed successfully',
      data: {
        fileName: result.fileName,
        originalSize: result.originalSize,
        compressedSize: result.compressedSize,
        percentSaved: parseFloat(percentSaved),
        originalFormat: result.originalFormat,
        convertedFormat: result.convertedFormat,
        fileId: fileLog._id,
        expiresAt: fileLog.expiresAt
      }
    });
  } catch (error) {
    console.error('Audio compression error:', error);
    res.status(500).json({ message: error.message || 'Audio compression failed' });
  }
});

// Compress PDF
router.post('/pdf', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await processPDF(req.file, 'compress');
    const fileLog = await createFileLog(result, req);

    const percentSaved = ((result.originalSize - result.compressedSize) / result.originalSize * 100).toFixed(1);

    res.json({
      success: true,
      message: 'PDF compressed successfully',
      data: {
        fileName: result.fileName,
        originalSize: result.originalSize,
        compressedSize: result.compressedSize,
        percentSaved: parseFloat(percentSaved),
        originalFormat: result.originalFormat,
        convertedFormat: result.convertedFormat,
        fileId: fileLog._id,
        expiresAt: fileLog.expiresAt
      }
    });
  } catch (error) {
    console.error('PDF compression error:', error);
    res.status(500).json({ message: error.message || 'PDF compression failed' });
  }
});

module.exports = router; 