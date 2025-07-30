const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const { PDFDocument } = require('pdf-lib');
const File = require('../models/File');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/original');
    fs.ensureDirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = {
      image: /^image\/(jpeg|jpg|png|webp|gif)$/,
      video: /^video\/(mp4|avi|mov|wmv|flv|mkv|webm)$/,
      audio: /^audio\/(mp3|wav|aac|ogg|flac|m4a)$/,
      pdf: /^application\/pdf$/
    };

    const fileType = Object.keys(allowedTypes).find(type => 
      allowedTypes[type].test(file.mimetype)
    );

    if (fileType) {
      req.fileType = fileType;
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

// Helper function to get file size
const getFileSize = (filePath) => {
  const stats = fs.statSync(filePath);
  return stats.size;
};

// Helper function to calculate saved percentage
const calculateSavedPercent = (originalSize, compressedSize) => {
  return Math.round(((originalSize - compressedSize) / originalSize) * 100);
};

// Compress Image
router.post('/image', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const originalPath = req.file.path;
    const originalSize = getFileSize(originalPath);
    const fileName = path.basename(originalPath, path.extname(originalPath));
    const outputPath = path.join(__dirname, '../uploads/processed', `${fileName}-compressed.jpg`);

    // Ensure output directory exists
    fs.ensureDirSync(path.dirname(outputPath));

    // Compress image using sharp
    await sharp(originalPath)
      .jpeg({ quality: 80, progressive: true })
      .toFile(outputPath);

    const compressedSize = getFileSize(outputPath);
    const savedPercent = calculateSavedPercent(originalSize, compressedSize);

    // Save to database
    const fileDoc = new File({
      fileName: `${fileName}-compressed.jpg`,
      originalName: req.file.originalname,
      fileType: 'image',
      originalSize,
      compressedSize,
      savedPercent,
      originalPath,
      processedPath: outputPath,
      uploadedBy: req.user?._id || null,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await fileDoc.save();

    res.json({
      success: true,
      file: {
        id: fileDoc._id,
        fileName: fileDoc.fileName,
        originalSize: fileDoc.getFormattedSize(originalSize),
        compressedSize: fileDoc.getFormattedSize(compressedSize),
        savedPercent,
        downloadUrl: `/uploads/processed/${fileDoc.fileName}`,
        expiresAt: fileDoc.expiresAt
      }
    });

  } catch (error) {
    console.error('Image compression error:', error);
    res.status(500).json({ error: 'Failed to compress image' });
  }
});

// Compress Video
router.post('/video', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const originalPath = req.file.path;
    const originalSize = getFileSize(originalPath);
    const fileName = path.basename(originalPath, path.extname(originalPath));
    const outputPath = path.join(__dirname, '../uploads/processed', `${fileName}-compressed.mp4`);

    // Ensure output directory exists
    fs.ensureDirSync(path.dirname(outputPath));

    // Compress video using ffmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(originalPath)
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputOptions([
          '-crf 28',
          '-preset fast',
          '-movflags +faststart'
        ])
        .output(outputPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    const compressedSize = getFileSize(outputPath);
    const savedPercent = calculateSavedPercent(originalSize, compressedSize);

    // Save to database
    const fileDoc = new File({
      fileName: `${fileName}-compressed.mp4`,
      originalName: req.file.originalname,
      fileType: 'video',
      originalSize,
      compressedSize,
      savedPercent,
      originalPath,
      processedPath: outputPath,
      uploadedBy: req.user?._id || null,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await fileDoc.save();

    res.json({
      success: true,
      file: {
        id: fileDoc._id,
        fileName: fileDoc.fileName,
        originalSize: fileDoc.getFormattedSize(originalSize),
        compressedSize: fileDoc.getFormattedSize(compressedSize),
        savedPercent,
        downloadUrl: `/uploads/processed/${fileDoc.fileName}`,
        expiresAt: fileDoc.expiresAt
      }
    });

  } catch (error) {
    console.error('Video compression error:', error);
    res.status(500).json({ error: 'Failed to compress video' });
  }
});

// Compress Audio
router.post('/audio', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const originalPath = req.file.path;
    const originalSize = getFileSize(originalPath);
    const fileName = path.basename(originalPath, path.extname(originalPath));
    const outputPath = path.join(__dirname, '../uploads/processed', `${fileName}-compressed.mp3`);

    // Ensure output directory exists
    fs.ensureDirSync(path.dirname(outputPath));

    // Compress audio using ffmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(originalPath)
        .audioCodec('libmp3lame')
        .audioBitrate(128)
        .output(outputPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    const compressedSize = getFileSize(outputPath);
    const savedPercent = calculateSavedPercent(originalSize, compressedSize);

    // Save to database
    const fileDoc = new File({
      fileName: `${fileName}-compressed.mp3`,
      originalName: req.file.originalname,
      fileType: 'audio',
      originalSize,
      compressedSize,
      savedPercent,
      originalPath,
      processedPath: outputPath,
      uploadedBy: req.user?._id || null,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await fileDoc.save();

    res.json({
      success: true,
      file: {
        id: fileDoc._id,
        fileName: fileDoc.fileName,
        originalSize: fileDoc.getFormattedSize(originalSize),
        compressedSize: fileDoc.getFormattedSize(compressedSize),
        savedPercent,
        downloadUrl: `/uploads/processed/${fileDoc.fileName}`,
        expiresAt: fileDoc.expiresAt
      }
    });

  } catch (error) {
    console.error('Audio compression error:', error);
    res.status(500).json({ error: 'Failed to compress audio' });
  }
});

// Compress PDF
router.post('/pdf', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const originalPath = req.file.path;
    const originalSize = getFileSize(originalPath);
    const fileName = path.basename(originalPath, path.extname(originalPath));
    const outputPath = path.join(__dirname, '../uploads/processed', `${fileName}-compressed.pdf`);

    // Ensure output directory exists
    fs.ensureDirSync(path.dirname(outputPath));

    // Read and compress PDF
    const pdfBytes = fs.readFileSync(originalPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // Compress by removing unnecessary metadata
    const compressedPdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false
    });

    fs.writeFileSync(outputPath, compressedPdfBytes);

    const compressedSize = getFileSize(outputPath);
    const savedPercent = calculateSavedPercent(originalSize, compressedSize);

    // Save to database
    const fileDoc = new File({
      fileName: `${fileName}-compressed.pdf`,
      originalName: req.file.originalname,
      fileType: 'pdf',
      originalSize,
      compressedSize,
      savedPercent,
      originalPath,
      processedPath: outputPath,
      uploadedBy: req.user?._id || null,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await fileDoc.save();

    res.json({
      success: true,
      file: {
        id: fileDoc._id,
        fileName: fileDoc.fileName,
        originalSize: fileDoc.getFormattedSize(originalSize),
        compressedSize: fileDoc.getFormattedSize(compressedSize),
        savedPercent,
        downloadUrl: `/uploads/processed/${fileDoc.fileName}`,
        expiresAt: fileDoc.expiresAt
      }
    });

  } catch (error) {
    console.error('PDF compression error:', error);
    res.status(500).json({ error: 'Failed to compress PDF' });
  }
});

module.exports = router; 