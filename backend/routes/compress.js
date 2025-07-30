const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const { uploadMiddleware } = require('../middleware/upload');
const FileLog = require('../models/FileLog');
const {
  compressImage,
  compressVideo,
  compressAudio,
  compressPDF,
  generateOutputFilename,
  getFileSize,
  calculateCompressionPercent
} = require('../utils/fileProcessor');

const router = express.Router();

// Helper function to create file log
const createFileLog = async (req, fileInfo, processedInfo) => {
  const retentionHours = parseInt(process.env.FILE_RETENTION_HOURS) || 24;
  const expiresAt = new Date(Date.now() + retentionHours * 60 * 60 * 1000);
  
  const fileLog = new FileLog({
    fileName: processedInfo.fileName,
    originalName: fileInfo.originalName,
    type: 'compress',
    operation: req.params.operation,
    format: processedInfo.format,
    originalSize: fileInfo.fileSize,
    processedSize: processedInfo.fileSize,
    savedPercent: processedInfo.savedPercent,
    filePath: processedInfo.filePath,
    downloadUrl: `/uploads/${processedInfo.fileName}`,
    uploadedAt: new Date(),
    expiresAt: expiresAt,
    ipAddress: req.ip,
    userAgent: req.get('User-Agent'),
    status: 'completed',
    processingTime: processedInfo.processingTime
  });

  return await fileLog.save();
};

// Image compression route
router.post('/image', uploadMiddleware, async (req, res, next) => {
  const startTime = Date.now();
  
  try {
    const { quality = 80, format = 'jpeg', width, height } = req.body;
    const fileInfo = req.fileInfo;
    
    // Generate output filename
    const outputFileName = generateOutputFilename(fileInfo.originalName, 'compressed', format);
    const outputPath = path.join(__dirname, '..', 'uploads', outputFileName);
    
    // Compress image
    await compressImage(fileInfo.filePath, outputPath, {
      quality: parseInt(quality),
      format,
      width: width ? parseInt(width) : undefined,
      height: height ? parseInt(height) : undefined
    });
    
    // Get processed file size
    const processedSize = await getFileSize(outputPath);
    const savedPercent = calculateCompressionPercent(fileInfo.fileSize, processedSize);
    const processingTime = Date.now() - startTime;
    
    // Create file log
    const fileLog = await createFileLog(req, fileInfo, {
      fileName: outputFileName,
      format,
      fileSize: processedSize,
      savedPercent,
      filePath: outputPath,
      processingTime
    });
    
    // Clean up original file
    await fs.remove(fileInfo.filePath);
    
    res.status(200).json({
      success: true,
      message: 'Image compressed successfully',
      data: {
        originalName: fileInfo.originalName,
        fileName: outputFileName,
        originalSize: fileInfo.fileSize,
        processedSize,
        savedPercent,
        downloadUrl: `/uploads/${outputFileName}`,
        expiresAt: fileLog.expiresAt,
        processingTime
      }
    });
    
  } catch (error) {
    // Clean up files on error
    if (req.fileInfo) {
      await fs.remove(req.fileInfo.filePath).catch(() => {});
    }
    next(error);
  }
});

// Video compression route
router.post('/video', uploadMiddleware, async (req, res, next) => {
  const startTime = Date.now();
  
  try {
    const { crf = 28, preset = 'medium', audioBitrate = '128k', videoBitrate = '1000k', resolution = '1280x720' } = req.body;
    const fileInfo = req.fileInfo;
    
    // Generate output filename
    const outputFileName = generateOutputFilename(fileInfo.originalName, 'compressed', 'mp4');
    const outputPath = path.join(__dirname, '..', 'uploads', outputFileName);
    
    // Compress video
    await compressVideo(fileInfo.filePath, outputPath, {
      crf: parseInt(crf),
      preset,
      audioBitrate,
      videoBitrate,
      resolution
    });
    
    // Get processed file size
    const processedSize = await getFileSize(outputPath);
    const savedPercent = calculateCompressionPercent(fileInfo.fileSize, processedSize);
    const processingTime = Date.now() - startTime;
    
    // Create file log
    const fileLog = await createFileLog(req, fileInfo, {
      fileName: outputFileName,
      format: 'mp4',
      fileSize: processedSize,
      savedPercent,
      filePath: outputPath,
      processingTime
    });
    
    // Clean up original file
    await fs.remove(fileInfo.filePath);
    
    res.status(200).json({
      success: true,
      message: 'Video compressed successfully',
      data: {
        originalName: fileInfo.originalName,
        fileName: outputFileName,
        originalSize: fileInfo.fileSize,
        processedSize,
        savedPercent,
        downloadUrl: `/uploads/${outputFileName}`,
        expiresAt: fileLog.expiresAt,
        processingTime
      }
    });
    
  } catch (error) {
    // Clean up files on error
    if (req.fileInfo) {
      await fs.remove(req.fileInfo.filePath).catch(() => {});
    }
    next(error);
  }
});

// Audio compression route
router.post('/audio', uploadMiddleware, async (req, res, next) => {
  const startTime = Date.now();
  
  try {
    const { bitrate = '128k', sampleRate = '44100', channels = 2 } = req.body;
    const fileInfo = req.fileInfo;
    
    // Generate output filename
    const outputFileName = generateOutputFilename(fileInfo.originalName, 'compressed', 'mp3');
    const outputPath = path.join(__dirname, '..', 'uploads', outputFileName);
    
    // Compress audio
    await compressAudio(fileInfo.filePath, outputPath, {
      bitrate,
      sampleRate: parseInt(sampleRate),
      channels: parseInt(channels)
    });
    
    // Get processed file size
    const processedSize = await getFileSize(outputPath);
    const savedPercent = calculateCompressionPercent(fileInfo.fileSize, processedSize);
    const processingTime = Date.now() - startTime;
    
    // Create file log
    const fileLog = await createFileLog(req, fileInfo, {
      fileName: outputFileName,
      format: 'mp3',
      fileSize: processedSize,
      savedPercent,
      filePath: outputPath,
      processingTime
    });
    
    // Clean up original file
    await fs.remove(fileInfo.filePath);
    
    res.status(200).json({
      success: true,
      message: 'Audio compressed successfully',
      data: {
        originalName: fileInfo.originalName,
        fileName: outputFileName,
        originalSize: fileInfo.fileSize,
        processedSize,
        savedPercent,
        downloadUrl: `/uploads/${outputFileName}`,
        expiresAt: fileLog.expiresAt,
        processingTime
      }
    });
    
  } catch (error) {
    // Clean up files on error
    if (req.fileInfo) {
      await fs.remove(req.fileInfo.filePath).catch(() => {});
    }
    next(error);
  }
});

// PDF compression route
router.post('/pdf', uploadMiddleware, async (req, res, next) => {
  const startTime = Date.now();
  
  try {
    const { quality = 'medium' } = req.body;
    const fileInfo = req.fileInfo;
    
    // Generate output filename
    const outputFileName = generateOutputFilename(fileInfo.originalName, 'compressed', 'pdf');
    const outputPath = path.join(__dirname, '..', 'uploads', outputFileName);
    
    // Compress PDF
    await compressPDF(fileInfo.filePath, outputPath, {
      quality
    });
    
    // Get processed file size
    const processedSize = await getFileSize(outputPath);
    const savedPercent = calculateCompressionPercent(fileInfo.fileSize, processedSize);
    const processingTime = Date.now() - startTime;
    
    // Create file log
    const fileLog = await createFileLog(req, fileInfo, {
      fileName: outputFileName,
      format: 'pdf',
      fileSize: processedSize,
      savedPercent,
      filePath: outputPath,
      processingTime
    });
    
    // Clean up original file
    await fs.remove(fileInfo.filePath);
    
    res.status(200).json({
      success: true,
      message: 'PDF compressed successfully',
      data: {
        originalName: fileInfo.originalName,
        fileName: outputFileName,
        originalSize: fileInfo.fileSize,
        processedSize,
        savedPercent,
        downloadUrl: `/uploads/${outputFileName}`,
        expiresAt: fileLog.expiresAt,
        processingTime
      }
    });
    
  } catch (error) {
    // Clean up files on error
    if (req.fileInfo) {
      await fs.remove(req.fileInfo.filePath).catch(() => {});
    }
    next(error);
  }
});

module.exports = router; 