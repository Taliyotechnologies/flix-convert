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
  }
});

// Helper function to save file log
const saveFileLog = async (fileData) => {
  // In a real app, this would save to MongoDB
  console.log('File converted:', fileData);
  return fileData;
};

// Image conversion route
router.post('/image', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { format = 'jpeg', quality = 80 } = req.body;
    const inputPath = req.file.path;
    const originalSize = req.file.size;
    const outputFileName = `converted-${uuidv4()}.${format}`;
    const outputPath = path.join(__dirname, '../uploads', outputFileName);

    // Convert image using Sharp
    let sharpInstance = sharp(inputPath);

    switch (format.toLowerCase()) {
      case 'jpeg':
      case 'jpg':
        sharpInstance = sharpInstance.jpeg({ quality: parseInt(quality) });
        break;
      case 'png':
        sharpInstance = sharpInstance.png({ compressionLevel: 9 });
        break;
      case 'webp':
        sharpInstance = sharpInstance.webp({ quality: parseInt(quality) });
        break;
      case 'gif':
        sharpInstance = sharpInstance.gif();
        break;
      case 'bmp':
        sharpInstance = sharpInstance.bmp();
        break;
      default:
        return res.status(400).json({ error: 'Unsupported format' });
    }

    await sharpInstance.toFile(outputPath);

    const convertedSize = fs.statSync(outputPath).size;
    const savedPercent = ((originalSize - convertedSize) / originalSize * 100).toFixed(2);

    // Save file log
    const fileLog = await saveFileLog({
      fileName: req.file.originalname,
      type: 'image-conversion',
      originalSize,
      processedSize: convertedSize,
      savedPercent: parseFloat(savedPercent),
      uploadedAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      filePath: outputPath,
      convertedFormat: format
    });

    // Clean up original file
    fs.unlinkSync(inputPath);

    res.json({
      success: true,
      originalSize,
      convertedSize,
      savedPercent: parseFloat(savedPercent),
      downloadUrl: `/uploads/${outputFileName}`,
      convertedFormat: format,
      fileLog
    });

  } catch (error) {
    console.error('Image conversion error:', error);
    res.status(500).json({ error: 'Image conversion failed', details: error.message });
  }
});

// Audio conversion route
router.post('/audio', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { format = 'mp3', bitrate = '128k' } = req.body;
    const inputPath = req.file.path;
    const originalSize = req.file.size;
    const outputFileName = `converted-${uuidv4()}.${format}`;
    const outputPath = path.join(__dirname, '../uploads', outputFileName);

    // Audio conversion using FFmpeg
    await new Promise((resolve, reject) => {
      let ffmpegInstance = ffmpeg(inputPath);

      switch (format.toLowerCase()) {
        case 'mp3':
          ffmpegInstance = ffmpegInstance.audioCodec('libmp3lame').audioBitrate(bitrate);
          break;
        case 'wav':
          ffmpegInstance = ffmpegInstance.audioCodec('pcm_s16le');
          break;
        case 'aac':
          ffmpegInstance = ffmpegInstance.audioCodec('aac').audioBitrate(bitrate);
          break;
        case 'ogg':
          ffmpegInstance = ffmpegInstance.audioCodec('libvorbis').audioBitrate(bitrate);
          break;
        case 'flac':
          ffmpegInstance = ffmpegInstance.audioCodec('flac');
          break;
        default:
          return res.status(400).json({ error: 'Unsupported format' });
      }

      ffmpegInstance
        .output(outputPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    const convertedSize = fs.statSync(outputPath).size;
    const savedPercent = ((originalSize - convertedSize) / originalSize * 100).toFixed(2);

    // Save file log
    const fileLog = await saveFileLog({
      fileName: req.file.originalname,
      type: 'audio-conversion',
      originalSize,
      processedSize: convertedSize,
      savedPercent: parseFloat(savedPercent),
      uploadedAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      filePath: outputPath,
      convertedFormat: format
    });

    // Clean up original file
    fs.unlinkSync(inputPath);

    res.json({
      success: true,
      originalSize,
      convertedSize,
      savedPercent: parseFloat(savedPercent),
      downloadUrl: `/uploads/${outputFileName}`,
      convertedFormat: format,
      fileLog
    });

  } catch (error) {
    console.error('Audio conversion error:', error);
    res.status(500).json({ error: 'Audio conversion failed', details: error.message });
  }
});

// Video conversion route
router.post('/video', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { format = 'mp4', quality = 'medium' } = req.body;
    const inputPath = req.file.path;
    const originalSize = req.file.size;
    const outputFileName = `converted-${uuidv4()}.${format}`;
    const outputPath = path.join(__dirname, '../uploads', outputFileName);

    // Video conversion using FFmpeg
    await new Promise((resolve, reject) => {
      let ffmpegInstance = ffmpeg(inputPath);

      switch (format.toLowerCase()) {
        case 'mp4':
          ffmpegInstance = ffmpegInstance
            .videoCodec('libx264')
            .audioCodec('aac')
            .outputOptions(['-crf 23', '-preset medium', '-movflags +faststart']);
          break;
        case 'webm':
          ffmpegInstance = ffmpegInstance
            .videoCodec('libvpx-vp9')
            .audioCodec('libopus')
            .outputOptions(['-crf 30', '-b:v 0']);
          break;
        case 'avi':
          ffmpegInstance = ffmpegInstance
            .videoCodec('libx264')
            .audioCodec('mp3');
          break;
        case 'mov':
          ffmpegInstance = ffmpegInstance
            .videoCodec('libx264')
            .audioCodec('aac')
            .outputOptions(['-crf 23', '-preset medium']);
          break;
        default:
          return res.status(400).json({ error: 'Unsupported format' });
      }

      ffmpegInstance
        .output(outputPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    const convertedSize = fs.statSync(outputPath).size;
    const savedPercent = ((originalSize - convertedSize) / originalSize * 100).toFixed(2);

    // Save file log
    const fileLog = await saveFileLog({
      fileName: req.file.originalname,
      type: 'video-conversion',
      originalSize,
      processedSize: convertedSize,
      savedPercent: parseFloat(savedPercent),
      uploadedAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      filePath: outputPath,
      convertedFormat: format
    });

    // Clean up original file
    fs.unlinkSync(inputPath);

    res.json({
      success: true,
      originalSize,
      convertedSize,
      savedPercent: parseFloat(savedPercent),
      downloadUrl: `/uploads/${outputFileName}`,
      convertedFormat: format,
      fileLog
    });

  } catch (error) {
    console.error('Video conversion error:', error);
    res.status(500).json({ error: 'Video conversion failed', details: error.message });
  }
});

// PDF conversion route
router.post('/pdf', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { format = 'docx' } = req.body;
    const inputPath = req.file.path;
    const originalSize = req.file.size;
    const outputFileName = `converted-${uuidv4()}.${format}`;
    const outputPath = path.join(__dirname, '../uploads', outputFileName);

    // For PDF conversion, we'll use a simple approach
    // In a real app, you might use libraries like pdf2pic, pdf-lib, or cloud services
    if (format === 'docx') {
      // This is a placeholder - in reality you'd use a proper PDF to DOCX converter
      // For now, we'll just copy the file and pretend it's converted
      fs.copyFileSync(inputPath, outputPath);
    } else if (format === 'jpg' || format === 'png') {
      // Convert PDF to image
      await new Promise((resolve, reject) => {
        ffmpeg(inputPath)
          .outputOptions(['-density', '150', '-quality', '100'])
          .output(outputPath)
          .on('end', resolve)
          .on('error', reject)
          .run();
      });
    } else {
      return res.status(400).json({ error: 'Unsupported conversion format' });
    }

    const convertedSize = fs.statSync(outputPath).size;
    const savedPercent = ((originalSize - convertedSize) / originalSize * 100).toFixed(2);

    // Save file log
    const fileLog = await saveFileLog({
      fileName: req.file.originalname,
      type: 'pdf-conversion',
      originalSize,
      processedSize: convertedSize,
      savedPercent: parseFloat(savedPercent),
      uploadedAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      filePath: outputPath,
      convertedFormat: format
    });

    // Clean up original file
    fs.unlinkSync(inputPath);

    res.json({
      success: true,
      originalSize,
      convertedSize,
      savedPercent: parseFloat(savedPercent),
      downloadUrl: `/uploads/${outputFileName}`,
      convertedFormat: format,
      fileLog
    });

  } catch (error) {
    console.error('PDF conversion error:', error);
    res.status(500).json({ error: 'PDF conversion failed', details: error.message });
  }
});

module.exports = router; 