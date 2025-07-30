const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const { uploadMiddleware } = require('../middleware/upload');
const FileLog = require('../models/FileLog');
const {
  convertImage,
  convertAudio,
  convertVideo,
  generateOutputFilename,
  getFileSize,
  calculateCompressionPercent
} = require('../utils/fileProcessor');

const router = express.Router();

// Helper function to create file log for conversion
const createConversionLog = async (req, fileInfo, processedInfo) => {
  const retentionHours = parseInt(process.env.FILE_RETENTION_HOURS) || 24;
  const expiresAt = new Date(Date.now() + retentionHours * 60 * 60 * 1000);
  
  const fileLog = new FileLog({
    fileName: processedInfo.fileName,
    originalName: fileInfo.originalName,
    type: 'convert',
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

// Image conversion route
router.post('/image', uploadMiddleware, async (req, res, next) => {
  const startTime = Date.now();
  
  try {
    const { targetFormat = 'jpeg', quality = 80, width, height } = req.body;
    const fileInfo = req.fileInfo;
    
    // Validate target format
    const allowedFormats = ['jpeg', 'jpg', 'png', 'webp', 'gif'];
    if (!allowedFormats.includes(targetFormat.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: `Unsupported target format. Allowed formats: ${allowedFormats.join(', ')}`
      });
    }
    
    // Generate output filename
    const outputFileName = generateOutputFilename(fileInfo.originalName, 'converted', targetFormat);
    const outputPath = path.join(__dirname, '..', 'uploads', outputFileName);
    
    // Convert image
    await convertImage(fileInfo.filePath, outputPath, targetFormat, {
      quality: parseInt(quality),
      width: width ? parseInt(width) : undefined,
      height: height ? parseInt(height) : undefined
    });
    
    // Get processed file size
    const processedSize = await getFileSize(outputPath);
    const savedPercent = calculateCompressionPercent(fileInfo.fileSize, processedSize);
    const processingTime = Date.now() - startTime;
    
    // Create file log
    const fileLog = await createConversionLog(req, fileInfo, {
      fileName: outputFileName,
      format: targetFormat,
      fileSize: processedSize,
      savedPercent,
      filePath: outputPath,
      processingTime
    });
    
    // Clean up original file
    await fs.remove(fileInfo.filePath);
    
    res.status(200).json({
      success: true,
      message: 'Image converted successfully',
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

// Audio conversion route
router.post('/audio', uploadMiddleware, async (req, res, next) => {
  const startTime = Date.now();
  
  try {
    const { targetFormat = 'mp3', bitrate = '128k', sampleRate = '44100', channels = 2 } = req.body;
    const fileInfo = req.fileInfo;
    
    // Validate target format
    const allowedFormats = ['mp3', 'wav', 'aac', 'ogg'];
    if (!allowedFormats.includes(targetFormat.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: `Unsupported target format. Allowed formats: ${allowedFormats.join(', ')}`
      });
    }
    
    // Generate output filename
    const outputFileName = generateOutputFilename(fileInfo.originalName, 'converted', targetFormat);
    const outputPath = path.join(__dirname, '..', 'uploads', outputFileName);
    
    // Convert audio
    await convertAudio(fileInfo.filePath, outputPath, targetFormat, {
      bitrate,
      sampleRate: parseInt(sampleRate),
      channels: parseInt(channels)
    });
    
    // Get processed file size
    const processedSize = await getFileSize(outputPath);
    const savedPercent = calculateCompressionPercent(fileInfo.fileSize, processedSize);
    const processingTime = Date.now() - startTime;
    
    // Create file log
    const fileLog = await createConversionLog(req, fileInfo, {
      fileName: outputFileName,
      format: targetFormat,
      fileSize: processedSize,
      savedPercent,
      filePath: outputPath,
      processingTime
    });
    
    // Clean up original file
    await fs.remove(fileInfo.filePath);
    
    res.status(200).json({
      success: true,
      message: 'Audio converted successfully',
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

// Video conversion route
router.post('/video', uploadMiddleware, async (req, res, next) => {
  const startTime = Date.now();
  
  try {
    const { targetFormat = 'mp4', crf = 23, preset = 'medium', audioBitrate = '128k', videoBitrate = '1000k' } = req.body;
    const fileInfo = req.fileInfo;
    
    // Validate target format
    const allowedFormats = ['mp4', 'webm', 'avi', 'mov'];
    if (!allowedFormats.includes(targetFormat.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: `Unsupported target format. Allowed formats: ${allowedFormats.join(', ')}`
      });
    }
    
    // Generate output filename
    const outputFileName = generateOutputFilename(fileInfo.originalName, 'converted', targetFormat);
    const outputPath = path.join(__dirname, '..', 'uploads', outputFileName);
    
    // Convert video
    await convertVideo(fileInfo.filePath, outputPath, targetFormat, {
      crf: parseInt(crf),
      preset,
      audioBitrate,
      videoBitrate
    });
    
    // Get processed file size
    const processedSize = await getFileSize(outputPath);
    const savedPercent = calculateCompressionPercent(fileInfo.fileSize, processedSize);
    const processingTime = Date.now() - startTime;
    
    // Create file log
    const fileLog = await createConversionLog(req, fileInfo, {
      fileName: outputFileName,
      format: targetFormat,
      fileSize: processedSize,
      savedPercent,
      filePath: outputPath,
      processingTime
    });
    
    // Clean up original file
    await fs.remove(fileInfo.filePath);
    
    res.status(200).json({
      success: true,
      message: 'Video converted successfully',
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

// PDF conversion route (placeholder for future implementation)
router.post('/pdf', uploadMiddleware, async (req, res, next) => {
  const startTime = Date.now();
  
  try {
    const { targetFormat = 'docx' } = req.body;
    const fileInfo = req.fileInfo;
    
    // Validate target format
    const allowedFormats = ['docx', 'txt', 'html'];
    if (!allowedFormats.includes(targetFormat.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: `Unsupported target format. Allowed formats: ${allowedFormats.join(', ')}`
      });
    }
    
    // For now, return a placeholder response
    // PDF conversion would require additional libraries like pdf2pic, pdf-parse, etc.
    res.status(501).json({
      success: false,
      error: 'PDF conversion is not yet implemented. This feature will be available in a future update.'
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