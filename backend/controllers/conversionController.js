const FileLog = require('../models/FileLog');
const {
  convertImage,
  convertVideo,
  convertAudio,
  convertPDF,
  getFileSize,
  calculateSavedPercent,
  generateOutputFilename
} = require('../utils/fileProcessor');
const path = require('path');
const fs = require('fs-extra');

// Image conversion
const convertImageHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
        message: 'Please upload an image file'
      });
    }

    const { format, quality = 80 } = req.body;
    
    if (!format) {
      return res.status(400).json({
        error: 'Format required',
        message: 'Please specify the target format'
      });
    }

    const inputPath = req.file.path;
    const originalSize = getFileSize(inputPath);
    const originalFormat = path.extname(req.file.originalname).slice(1);
    
    const outputFilename = generateOutputFilename(req.file.originalname, 'convert', format);
    const outputPath = path.join(path.dirname(inputPath), outputFilename);
    
    // Convert image
    await convertImage(inputPath, outputPath, format, parseInt(quality));
    
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
      processedFormat: format,
      operation: 'convert'
    });
    
    await fileLog.save();
    
    // Clean up original file
    await fs.unlink(inputPath);
    
    res.json({
      success: true,
      message: 'Image converted successfully',
      data: {
        originalSize,
        processedSize,
        savedPercent,
        downloadUrl: `/uploads/${outputFilename}`,
        fileId: fileLog._id
      }
    });
    
  } catch (error) {
    console.error('Image conversion error:', error);
    res.status(500).json({
      error: 'Conversion failed',
      message: error.message
    });
  }
};

// Video conversion
const convertVideoHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
        message: 'Please upload a video file'
      });
    }

    const { format } = req.body;
    
    if (!format) {
      return res.status(400).json({
        error: 'Format required',
        message: 'Please specify the target format'
      });
    }

    const inputPath = req.file.path;
    const originalSize = getFileSize(inputPath);
    const originalFormat = path.extname(req.file.originalname).slice(1);
    
    const outputFilename = generateOutputFilename(req.file.originalname, 'convert', format);
    const outputPath = path.join(path.dirname(inputPath), outputFilename);
    
    // Convert video
    await convertVideo(inputPath, outputPath, format);
    
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
      processedFormat: format,
      operation: 'convert'
    });
    
    await fileLog.save();
    
    // Clean up original file
    await fs.unlink(inputPath);
    
    res.json({
      success: true,
      message: 'Video converted successfully',
      data: {
        originalSize,
        processedSize,
        savedPercent,
        downloadUrl: `/uploads/${outputFilename}`,
        fileId: fileLog._id
      }
    });
    
  } catch (error) {
    console.error('Video conversion error:', error);
    res.status(500).json({
      error: 'Conversion failed',
      message: error.message
    });
  }
};

// Audio conversion
const convertAudioHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
        message: 'Please upload an audio file'
      });
    }

    const { format } = req.body;
    
    if (!format) {
      return res.status(400).json({
        error: 'Format required',
        message: 'Please specify the target format'
      });
    }

    const inputPath = req.file.path;
    const originalSize = getFileSize(inputPath);
    const originalFormat = path.extname(req.file.originalname).slice(1);
    
    const outputFilename = generateOutputFilename(req.file.originalname, 'convert', format);
    const outputPath = path.join(path.dirname(inputPath), outputFilename);
    
    // Convert audio
    await convertAudio(inputPath, outputPath, format);
    
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
      processedFormat: format,
      operation: 'convert'
    });
    
    await fileLog.save();
    
    // Clean up original file
    await fs.unlink(inputPath);
    
    res.json({
      success: true,
      message: 'Audio converted successfully',
      data: {
        originalSize,
        processedSize,
        savedPercent,
        downloadUrl: `/uploads/${outputFilename}`,
        fileId: fileLog._id
      }
    });
    
  } catch (error) {
    console.error('Audio conversion error:', error);
    res.status(500).json({
      error: 'Conversion failed',
      message: error.message
    });
  }
};

// PDF conversion
const convertPDFHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
        message: 'Please upload a PDF file'
      });
    }

    const { format } = req.body;
    
    if (!format) {
      return res.status(400).json({
        error: 'Format required',
        message: 'Please specify the target format'
      });
    }

    const inputPath = req.file.path;
    const originalSize = getFileSize(inputPath);
    const originalFormat = 'pdf';
    
    const outputFilename = generateOutputFilename(req.file.originalname, 'convert', format);
    const outputPath = path.join(path.dirname(inputPath), outputFilename);
    
    // Convert PDF
    await convertPDF(inputPath, outputPath, format);
    
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
      processedFormat: format,
      operation: 'convert'
    });
    
    await fileLog.save();
    
    // Clean up original file
    await fs.unlink(inputPath);
    
    res.json({
      success: true,
      message: 'PDF converted successfully',
      data: {
        originalSize,
        processedSize,
        savedPercent,
        downloadUrl: `/uploads/${outputFilename}`,
        fileId: fileLog._id
      }
    });
    
  } catch (error) {
    console.error('PDF conversion error:', error);
    res.status(500).json({
      error: 'Conversion failed',
      message: error.message
    });
  }
};

module.exports = {
  convertImageHandler,
  convertVideoHandler,
  convertAudioHandler,
  convertPDFHandler
}; 