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
const createFileLog = async (fileData, req, targetFormat) => {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours from now

  const fileLog = new FileLog({
    fileName: fileData.fileName,
    originalName: req.file.originalname,
    fileType: req.route.path.slice(1), // Remove leading slash
    operation: 'convert',
    originalSize: fileData.originalSize,
    compressedSize: fileData.compressedSize,
    originalFormat: fileData.originalFormat,
    convertedFormat: targetFormat || fileData.convertedFormat,
    filePath: fileData.filePath,
    expiresAt,
    userId: req.user ? req.user._id : null,
    ipAddress: req.ip,
    userAgent: req.get('User-Agent')
  });

  await fileLog.save();
  return fileLog;
};

// Convert image
router.post('/image', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { targetFormat } = req.body;
    
    if (!targetFormat) {
      return res.status(400).json({ message: 'Target format is required' });
    }

    // Validate target format
    const validFormats = ['jpeg', 'jpg', 'png', 'webp', 'avif'];
    if (!validFormats.includes(targetFormat.toLowerCase())) {
      return res.status(400).json({ message: 'Invalid target format' });
    }

    const result = await processImage(req.file, 'convert', targetFormat.toLowerCase());
    const fileLog = await createFileLog(result, req, targetFormat.toLowerCase());

    const percentSaved = ((result.originalSize - result.compressedSize) / result.originalSize * 100).toFixed(1);

    res.json({
      success: true,
      message: 'Image converted successfully',
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
    console.error('Image conversion error:', error);
    res.status(500).json({ message: error.message || 'Image conversion failed' });
  }
});

// Convert video
router.post('/video', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { targetFormat } = req.body;
    
    if (!targetFormat) {
      return res.status(400).json({ message: 'Target format is required' });
    }

    // Validate target format
    const validFormats = ['mp4', 'avi', 'mov', 'webm'];
    if (!validFormats.includes(targetFormat.toLowerCase())) {
      return res.status(400).json({ message: 'Invalid target format' });
    }

    const result = await processVideo(req.file, 'convert', targetFormat.toLowerCase());
    const fileLog = await createFileLog(result, req, targetFormat.toLowerCase());

    const percentSaved = ((result.originalSize - result.compressedSize) / result.originalSize * 100).toFixed(1);

    res.json({
      success: true,
      message: 'Video converted successfully',
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
    console.error('Video conversion error:', error);
    res.status(500).json({ message: error.message || 'Video conversion failed' });
  }
});

// Convert audio
router.post('/audio', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { targetFormat } = req.body;
    
    if (!targetFormat) {
      return res.status(400).json({ message: 'Target format is required' });
    }

    // Validate target format
    const validFormats = ['mp3', 'aac', 'ogg', 'wav', 'flac'];
    if (!validFormats.includes(targetFormat.toLowerCase())) {
      return res.status(400).json({ message: 'Invalid target format' });
    }

    const result = await processAudio(req.file, 'convert', targetFormat.toLowerCase());
    const fileLog = await createFileLog(result, req, targetFormat.toLowerCase());

    const percentSaved = ((result.originalSize - result.compressedSize) / result.originalSize * 100).toFixed(1);

    res.json({
      success: true,
      message: 'Audio converted successfully',
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
    console.error('Audio conversion error:', error);
    res.status(500).json({ message: error.message || 'Audio conversion failed' });
  }
});

// Convert PDF (limited conversion options)
router.post('/pdf', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // For PDF, we'll just compress it since conversion to other formats is complex
    const result = await processPDF(req.file, 'convert');
    const fileLog = await createFileLog(result, req, 'pdf');

    const percentSaved = ((result.originalSize - result.compressedSize) / result.originalSize * 100).toFixed(1);

    res.json({
      success: true,
      message: 'PDF processed successfully',
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
    console.error('PDF conversion error:', error);
    res.status(500).json({ message: error.message || 'PDF conversion failed' });
  }
});

module.exports = router; 