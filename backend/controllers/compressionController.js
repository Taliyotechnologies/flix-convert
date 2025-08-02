const FileLog = require('../models/FileLog');
const {
  compressImage,
  compressVideo,
  compressAudio,
  compressPDF,
  getFileSize,
  calculateSavedPercent,
  generateOutputFilename
} = require('../utils/fileProcessor');
const path = require('path');
const fs = require('fs-extra');

// Image compression
const compressImageHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
        message: 'Please upload an image file'
      });
    }

    const { quality = 80 } = req.body;
    const inputPath = req.file.path;
    const originalSize = getFileSize(inputPath);
    const originalFormat = path.extname(req.file.originalname).slice(1);
    
    const outputFilename = generateOutputFilename(req.file.originalname, 'compress');
    const outputPath = path.join(path.dirname(inputPath), outputFilename);
    
    // Compress image
    await compressImage(inputPath, outputPath, parseInt(quality));
    
    const processedSize = getFileSize(outputPath);
    const savedPercent = calculateSavedPercent(originalSize, processedSize);
    
    // Create file log
    const fileLog = new FileLog({
      fileName: req.file.originalname,
      fileType: 'image',
      originalSize,
      processedSize,
      savedPercent,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      filePath: path.relative(path.join(__dirname, '..'), outputPath),
      originalFormat,
      processedFormat: originalFormat,
      operation: 'compress'
    });
    
    await fileLog.save();
    
    // Clean up original file
    await fs.unlink(inputPath);
    
    res.json({
      success: true,
      message: 'Image compressed successfully',
      data: {
        originalSize,
        processedSize,
        savedPercent,
        downloadUrl: `/uploads/${outputFilename}`,
        fileId: fileLog._id
      }
    });
    
  } catch (error) {
    console.error('Image compression error:', error);
    res.status(500).json({
      error: 'Compression failed',
      message: error.message
    });
  }
};

// Video compression
const compressVideoHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
        message: 'Please upload a video file'
      });
    }

    const { quality = 'medium' } = req.body;
    const inputPath = req.file.path;
    const originalSize = getFileSize(inputPath);
    const originalFormat = path.extname(req.file.originalname).slice(1);
    
    const outputFilename = generateOutputFilename(req.file.originalname, 'compress');
    const outputPath = path.join(path.dirname(inputPath), outputFilename);
    
    // Compress video
    await compressVideo(inputPath, outputPath, quality);
    
    const processedSize = getFileSize(outputPath);
    const savedPercent = calculateSavedPercent(originalSize, processedSize);
    
    // Create file log
    const fileLog = new FileLog({
      fileName: req.file.originalname,
      fileType: 'video',
      originalSize,
      processedSize,
      savedPercent,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      filePath: path.relative(path.join(__dirname, '..'), outputPath),
      originalFormat,
      processedFormat: originalFormat,
      operation: 'compress'
    });
    
    await fileLog.save();
    
    // Clean up original file
    await fs.unlink(inputPath);
    
    res.json({
      success: true,
      message: 'Video compressed successfully',
      data: {
        originalSize,
        processedSize,
        savedPercent,
        downloadUrl: `/uploads/${outputFilename}`,
        fileId: fileLog._id
      }
    });
    
  } catch (error) {
    console.error('Video compression error:', error);
    res.status(500).json({
      error: 'Compression failed',
      message: error.message
    });
  }
};

// Audio compression
const compressAudioHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
        message: 'Please upload an audio file'
      });
    }

    const { quality = 'medium' } = req.body;
    const inputPath = req.file.path;
    const originalSize = getFileSize(inputPath);
    const originalFormat = path.extname(req.file.originalname).slice(1);
    
    const outputFilename = generateOutputFilename(req.file.originalname, 'compress');
    const outputPath = path.join(path.dirname(inputPath), outputFilename);
    
    // Compress audio
    await compressAudio(inputPath, outputPath, quality);
    
    const processedSize = getFileSize(outputPath);
    const savedPercent = calculateSavedPercent(originalSize, processedSize);
    
    // Create file log
    const fileLog = new FileLog({
      fileName: req.file.originalname,
      fileType: 'audio',
      originalSize,
      processedSize,
      savedPercent,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      filePath: path.relative(path.join(__dirname, '..'), outputPath),
      originalFormat,
      processedFormat: originalFormat,
      operation: 'compress'
    });
    
    await fileLog.save();
    
    // Clean up original file
    await fs.unlink(inputPath);
    
    res.json({
      success: true,
      message: 'Audio compressed successfully',
      data: {
        originalSize,
        processedSize,
        savedPercent,
        downloadUrl: `/uploads/${outputFilename}`,
        fileId: fileLog._id
      }
    });
    
  } catch (error) {
    console.error('Audio compression error:', error);
    res.status(500).json({
      error: 'Compression failed',
      message: error.message
    });
  }
};

// PDF compression
const compressPDFHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
        message: 'Please upload a PDF file'
      });
    }

    const inputPath = req.file.path;
    const originalSize = getFileSize(inputPath);
    const originalFormat = 'pdf';
    
    const outputFilename = generateOutputFilename(req.file.originalname, 'compress');
    const outputPath = path.join(path.dirname(inputPath), outputFilename);
    
    // Compress PDF
    await compressPDF(inputPath, outputPath);
    
    const processedSize = getFileSize(outputPath);
    const savedPercent = calculateSavedPercent(originalSize, processedSize);
    
    // Create file log
    const fileLog = new FileLog({
      fileName: req.file.originalname,
      fileType: 'pdf',
      originalSize,
      processedSize,
      savedPercent,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      filePath: path.relative(path.join(__dirname, '..'), outputPath),
      originalFormat,
      processedFormat: originalFormat,
      operation: 'compress'
    });
    
    await fileLog.save();
    
    // Clean up original file
    await fs.unlink(inputPath);
    
    res.json({
      success: true,
      message: 'PDF compressed successfully',
      data: {
        originalSize,
        processedSize,
        savedPercent,
        downloadUrl: `/uploads/${outputFilename}`,
        fileId: fileLog._id
      }
    });
    
  } catch (error) {
    console.error('PDF compression error:', error);
    res.status(500).json({
      error: 'Compression failed',
      message: error.message
    });
  }
};

module.exports = {
  compressImageHandler,
  compressVideoHandler,
  compressAudioHandler,
  compressPDFHandler
}; 