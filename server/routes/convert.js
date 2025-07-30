const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const { PDFDocument } = require('pdf-lib');
const File = require('../models/File');

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
  }
});

// Helper function to get file size
const getFileSize = (filePath) => {
  const stats = fs.statSync(filePath);
  return stats.size;
};

// Convert Image
router.post('/image', upload.single('file'), async (req, res) => {
  try {
    const { format } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const originalPath = req.file.path;
    const originalSize = getFileSize(originalPath);
    const fileName = path.basename(originalPath, path.extname(originalPath));
    const outputPath = path.join(__dirname, '../uploads/processed', `${fileName}-converted.${format}`);

    // Ensure output directory exists
    fs.ensureDirSync(path.dirname(outputPath));

    // Convert image using sharp
    let sharpInstance = sharp(originalPath);

    switch (format.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
        await sharpInstance.jpeg({ quality: 90 }).toFile(outputPath);
        break;
      case 'png':
        await sharpInstance.png().toFile(outputPath);
        break;
      case 'webp':
        await sharpInstance.webp({ quality: 90 }).toFile(outputPath);
        break;
      case 'gif':
        await sharpInstance.gif().toFile(outputPath);
        break;
      default:
        return res.status(400).json({ error: 'Unsupported format' });
    }

    const convertedSize = getFileSize(outputPath);

    // Save to database
    const fileDoc = new File({
      fileName: `${fileName}-converted.${format}`,
      originalName: req.file.originalname,
      fileType: 'image',
      originalSize,
      compressedSize: convertedSize,
      savedPercent: 0, // No compression, just conversion
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
        convertedSize: fileDoc.getFormattedSize(convertedSize),
        downloadUrl: `/uploads/processed/${fileDoc.fileName}`,
        expiresAt: fileDoc.expiresAt
      }
    });

  } catch (error) {
    console.error('Image conversion error:', error);
    res.status(500).json({ error: 'Failed to convert image' });
  }
});

// Convert Video
router.post('/video', upload.single('file'), async (req, res) => {
  try {
    const { format } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const originalPath = req.file.path;
    const originalSize = getFileSize(originalPath);
    const fileName = path.basename(originalPath, path.extname(originalPath));
    const outputPath = path.join(__dirname, '../uploads/processed', `${fileName}-converted.${format}`);

    // Ensure output directory exists
    fs.ensureDirSync(path.dirname(outputPath));

    // Convert video using ffmpeg
    await new Promise((resolve, reject) => {
      let ffmpegInstance = ffmpeg(originalPath);

      switch (format.toLowerCase()) {
        case 'mp4':
          ffmpegInstance
            .videoCodec('libx264')
            .audioCodec('aac')
            .outputOptions(['-movflags +faststart'])
            .output(outputPath);
          break;
        case 'avi':
          ffmpegInstance
            .videoCodec('libx264')
            .audioCodec('mp3')
            .output(outputPath);
          break;
        case 'webm':
          ffmpegInstance
            .videoCodec('libvpx')
            .audioCodec('libvorbis')
            .output(outputPath);
          break;
        default:
          return reject(new Error('Unsupported format'));
      }

      ffmpegInstance
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    const convertedSize = getFileSize(outputPath);

    // Save to database
    const fileDoc = new File({
      fileName: `${fileName}-converted.${format}`,
      originalName: req.file.originalname,
      fileType: 'video',
      originalSize,
      compressedSize: convertedSize,
      savedPercent: 0,
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
        convertedSize: fileDoc.getFormattedSize(convertedSize),
        downloadUrl: `/uploads/processed/${fileDoc.fileName}`,
        expiresAt: fileDoc.expiresAt
      }
    });

  } catch (error) {
    console.error('Video conversion error:', error);
    res.status(500).json({ error: 'Failed to convert video' });
  }
});

// Convert Audio
router.post('/audio', upload.single('file'), async (req, res) => {
  try {
    const { format } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const originalPath = req.file.path;
    const originalSize = getFileSize(originalPath);
    const fileName = path.basename(originalPath, path.extname(originalPath));
    const outputPath = path.join(__dirname, '../uploads/processed', `${fileName}-converted.${format}`);

    // Ensure output directory exists
    fs.ensureDirSync(path.dirname(outputPath));

    // Convert audio using ffmpeg
    await new Promise((resolve, reject) => {
      let ffmpegInstance = ffmpeg(originalPath);

      switch (format.toLowerCase()) {
        case 'mp3':
          ffmpegInstance.audioCodec('libmp3lame').output(outputPath);
          break;
        case 'wav':
          ffmpegInstance.audioCodec('pcm_s16le').output(outputPath);
          break;
        case 'aac':
          ffmpegInstance.audioCodec('aac').output(outputPath);
          break;
        case 'ogg':
          ffmpegInstance.audioCodec('libvorbis').output(outputPath);
          break;
        default:
          return reject(new Error('Unsupported format'));
      }

      ffmpegInstance
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    const convertedSize = getFileSize(outputPath);

    // Save to database
    const fileDoc = new File({
      fileName: `${fileName}-converted.${format}`,
      originalName: req.file.originalname,
      fileType: 'audio',
      originalSize,
      compressedSize: convertedSize,
      savedPercent: 0,
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
        convertedSize: fileDoc.getFormattedSize(convertedSize),
        downloadUrl: `/uploads/processed/${fileDoc.fileName}`,
        expiresAt: fileDoc.expiresAt
      }
    });

  } catch (error) {
    console.error('Audio conversion error:', error);
    res.status(500).json({ error: 'Failed to convert audio' });
  }
});

module.exports = router; 