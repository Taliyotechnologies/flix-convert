const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    const allowedTypes = {
      image: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp'],
      video: ['video/mp4', 'video/avi', 'video/mov', 'video/mkv', 'video/webm'],
      audio: ['audio/mpeg', 'audio/wav', 'audio/aac', 'audio/ogg', 'audio/flac'],
      pdf: ['application/pdf']
    };
    
    const allAllowed = [...allowedTypes.image, ...allowedTypes.video, ...allowedTypes.audio, ...allowedTypes.pdf];
    
    if (allAllowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

// Helper function to save file log
const saveFileLog = async (fileData) => {
  // In a real app, this would save to MongoDB
  console.log('File processed:', fileData);
  return fileData;
};

// Image compression route
router.post('/image', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { quality = 80, format = 'jpeg' } = req.body;
    const inputPath = req.file.path;
    const originalSize = req.file.size;
    const outputFileName = `compressed-${uuidv4()}.${format}`;
    const outputPath = path.join(__dirname, '../uploads', outputFileName);

    // Compress image using Sharp
    await sharp(inputPath)
      .jpeg({ quality: parseInt(quality) })
      .toFile(outputPath);

    const compressedSize = fs.statSync(outputPath).size;
    const savedPercent = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);

    // Save file log
    const fileLog = await saveFileLog({
      fileName: req.file.originalname,
      type: 'image-compression',
      originalSize,
      processedSize: compressedSize,
      savedPercent: parseFloat(savedPercent),
      uploadedAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      filePath: outputPath
    });

    // Clean up original file
    fs.unlinkSync(inputPath);

    res.json({
      success: true,
      originalSize,
      compressedSize,
      savedPercent: parseFloat(savedPercent),
      downloadUrl: `/uploads/${outputFileName}`,
      fileLog
    });

  } catch (error) {
    console.error('Image compression error:', error);
    res.status(500).json({ error: 'Image compression failed', details: error.message });
  }
});

// Video compression route
router.post('/video', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { quality = 'medium' } = req.body;
    const inputPath = req.file.path;
    const originalSize = req.file.size;
    const outputFileName = `compressed-${uuidv4()}.mp4`;
    const outputPath = path.join(__dirname, '../uploads', outputFileName);

    // Video compression using FFmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputOptions([
          '-crf 23', // Constant Rate Factor for quality
          '-preset medium',
          '-movflags +faststart'
        ])
        .output(outputPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    const compressedSize = fs.statSync(outputPath).size;
    const savedPercent = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);

    // Save file log
    const fileLog = await saveFileLog({
      fileName: req.file.originalname,
      type: 'video-compression',
      originalSize,
      processedSize: compressedSize,
      savedPercent: parseFloat(savedPercent),
      uploadedAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      filePath: outputPath
    });

    // Clean up original file
    fs.unlinkSync(inputPath);

    res.json({
      success: true,
      originalSize,
      compressedSize,
      savedPercent: parseFloat(savedPercent),
      downloadUrl: `/uploads/${outputFileName}`,
      fileLog
    });

  } catch (error) {
    console.error('Video compression error:', error);
    res.status(500).json({ error: 'Video compression failed', details: error.message });
  }
});

// Audio compression route
router.post('/audio', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { bitrate = '128k' } = req.body;
    const inputPath = req.file.path;
    const originalSize = req.file.size;
    const outputFileName = `compressed-${uuidv4()}.mp3`;
    const outputPath = path.join(__dirname, '../uploads', outputFileName);

    // Audio compression using FFmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .audioCodec('libmp3lame')
        .audioBitrate(bitrate)
        .output(outputPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    const compressedSize = fs.statSync(outputPath).size;
    const savedPercent = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);

    // Save file log
    const fileLog = await saveFileLog({
      fileName: req.file.originalname,
      type: 'audio-compression',
      originalSize,
      processedSize: compressedSize,
      savedPercent: parseFloat(savedPercent),
      uploadedAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      filePath: outputPath
    });

    // Clean up original file
    fs.unlinkSync(inputPath);

    res.json({
      success: true,
      originalSize,
      compressedSize,
      savedPercent: parseFloat(savedPercent),
      downloadUrl: `/uploads/${outputFileName}`,
      fileLog
    });

  } catch (error) {
    console.error('Audio compression error:', error);
    res.status(500).json({ error: 'Audio compression failed', details: error.message });
  }
});

// PDF compression route
router.post('/pdf', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const inputPath = req.file.path;
    const originalSize = req.file.size;
    const outputFileName = `compressed-${uuidv4()}.pdf`;
    const outputPath = path.join(__dirname, '../uploads', outputFileName);

    // Read the PDF file
    const pdfBytes = fs.readFileSync(inputPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Compress PDF by removing unnecessary metadata
    const compressedPdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false
    });

    // Write compressed PDF
    fs.writeFileSync(outputPath, compressedPdfBytes);

    const compressedSize = fs.statSync(outputPath).size;
    const savedPercent = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);

    // Save file log
    const fileLog = await saveFileLog({
      fileName: req.file.originalname,
      type: 'pdf-compression',
      originalSize,
      processedSize: compressedSize,
      savedPercent: parseFloat(savedPercent),
      uploadedAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      filePath: outputPath
    });

    // Clean up original file
    fs.unlinkSync(inputPath);

    res.json({
      success: true,
      originalSize,
      compressedSize,
      savedPercent: parseFloat(savedPercent),
      downloadUrl: `/uploads/${outputFileName}`,
      fileLog
    });

  } catch (error) {
    console.error('PDF compression error:', error);
    res.status(500).json({ error: 'PDF compression failed', details: error.message });
  }
});

module.exports = router; 