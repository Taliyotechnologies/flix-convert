const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const FileLog = require('../models/FileLog');

// Helper function to get file type
const getFileType = (mimetype) => {
  if (mimetype.startsWith('image/')) return 'image';
  if (mimetype.startsWith('video/')) return 'video';
  if (mimetype.startsWith('audio/')) return 'audio';
  if (mimetype === 'application/pdf') return 'pdf';
  return null;
};

// Helper function to calculate saved percentage
const calculateSavedPercent = (originalSize, processedSize) => {
  return Math.round(((originalSize - processedSize) / originalSize) * 100);
};

// Image compression
const compressImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { file } = req;
    const fileType = getFileType(file.mimetype);
    
    if (fileType !== 'image') {
      return res.status(400).json({ error: 'Invalid file type. Only images are allowed.' });
    }

    const originalSize = file.size;
    const outputPath = path.join('uploads', `compressed-${file.filename}`);
    const fullOutputPath = path.join(__dirname, '..', outputPath);

    // Compress image using Sharp
    await sharp(file.path)
      .jpeg({ quality: 60, progressive: true })
      .toFile(fullOutputPath);

    const processedSize = fs.statSync(fullOutputPath).size;
    const savedPercent = calculateSavedPercent(originalSize, processedSize);

    // Save to database
    const fileLog = new FileLog({
      fileName: `compressed-${file.filename}`,
      originalName: file.originalname,
      fileType: 'image',
      originalSize,
      processedSize,
      savedPercent,
      filePath: outputPath
    });

    await fileLog.save();

    // Clean up original file
    fs.unlinkSync(file.path);

    res.json({
      success: true,
      data: {
        fileName: fileLog.fileName,
        originalSize,
        processedSize,
        savedPercent,
        downloadUrl: `/uploads/${fileLog.fileName}`,
        expiresAt: fileLog.expiresAt
      }
    });

  } catch (error) {
    console.error('Image compression error:', error);
    res.status(500).json({ error: 'Error compressing image' });
  }
};

// Video compression
const compressVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { file } = req;
    const fileType = getFileType(file.mimetype);
    
    if (fileType !== 'video') {
      return res.status(400).json({ error: 'Invalid file type. Only videos are allowed.' });
    }

    const originalSize = file.size;
    const outputPath = path.join('uploads', `compressed-${file.filename}`);
    const fullOutputPath = path.join(__dirname, '..', outputPath);

    // Compress video using FFmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(file.path)
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputOptions(['-crf 28', '-preset medium'])
        .output(fullOutputPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    const processedSize = fs.statSync(fullOutputPath).size;
    const savedPercent = calculateSavedPercent(originalSize, processedSize);

    // Save to database
    const fileLog = new FileLog({
      fileName: `compressed-${file.filename}`,
      originalName: file.originalname,
      fileType: 'video',
      originalSize,
      processedSize,
      savedPercent,
      filePath: outputPath
    });

    await fileLog.save();

    // Clean up original file
    fs.unlinkSync(file.path);

    res.json({
      success: true,
      data: {
        fileName: fileLog.fileName,
        originalSize,
        processedSize,
        savedPercent,
        downloadUrl: `/uploads/${fileLog.fileName}`,
        expiresAt: fileLog.expiresAt
      }
    });

  } catch (error) {
    console.error('Video compression error:', error);
    res.status(500).json({ error: 'Error compressing video' });
  }
};

// Audio compression
const compressAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { file } = req;
    const fileType = getFileType(file.mimetype);
    
    if (fileType !== 'audio') {
      return res.status(400).json({ error: 'Invalid file type. Only audio files are allowed.' });
    }

    const originalSize = file.size;
    const outputPath = path.join('uploads', `compressed-${file.filename}`);
    const fullOutputPath = path.join(__dirname, '..', outputPath);

    // Compress audio using FFmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(file.path)
        .audioCodec('aac')
        .audioBitrate(128)
        .output(fullOutputPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    const processedSize = fs.statSync(fullOutputPath).size;
    const savedPercent = calculateSavedPercent(originalSize, processedSize);

    // Save to database
    const fileLog = new FileLog({
      fileName: `compressed-${file.filename}`,
      originalName: file.originalname,
      fileType: 'audio',
      originalSize,
      processedSize,
      savedPercent,
      filePath: outputPath
    });

    await fileLog.save();

    // Clean up original file
    fs.unlinkSync(file.path);

    res.json({
      success: true,
      data: {
        fileName: fileLog.fileName,
        originalSize,
        processedSize,
        savedPercent,
        downloadUrl: `/uploads/${fileLog.fileName}`,
        expiresAt: fileLog.expiresAt
      }
    });

  } catch (error) {
    console.error('Audio compression error:', error);
    res.status(500).json({ error: 'Error compressing audio' });
  }
};

// PDF compression
const compressPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { file } = req;
    const fileType = getFileType(file.mimetype);
    
    if (fileType !== 'pdf') {
      return res.status(400).json({ error: 'Invalid file type. Only PDF files are allowed.' });
    }

    const originalSize = file.size;
    const outputPath = path.join('uploads', `compressed-${file.filename}`);
    const fullOutputPath = path.join(__dirname, '..', outputPath);

    // Read and compress PDF
    const pdfBytes = fs.readFileSync(file.path);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // Compress PDF by reducing image quality
    const compressedPdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false
    });

    fs.writeFileSync(fullOutputPath, compressedPdfBytes);

    const processedSize = fs.statSync(fullOutputPath).size;
    const savedPercent = calculateSavedPercent(originalSize, processedSize);

    // Save to database
    const fileLog = new FileLog({
      fileName: `compressed-${file.filename}`,
      originalName: file.originalname,
      fileType: 'pdf',
      originalSize,
      processedSize,
      savedPercent,
      filePath: outputPath
    });

    await fileLog.save();

    // Clean up original file
    fs.unlinkSync(file.path);

    res.json({
      success: true,
      data: {
        fileName: fileLog.fileName,
        originalSize,
        processedSize,
        savedPercent,
        downloadUrl: `/uploads/${fileLog.fileName}`,
        expiresAt: fileLog.expiresAt
      }
    });

  } catch (error) {
    console.error('PDF compression error:', error);
    res.status(500).json({ error: 'Error compressing PDF' });
  }
};

module.exports = {
  compressImage,
  compressVideo,
  compressAudio,
  compressPdf
}; 