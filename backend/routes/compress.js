const express = require('express');
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');
const File = require('../models/File');
const { upload, handleUploadError, getFileType, getFileFormat } = require('../middleware/upload');
const { optionalAuth, requireAuth } = require('../middleware/auth');

const router = express.Router();

// Helper function to calculate compression percentage
const calculateCompressionPercent = (originalSize, compressedSize) => {
  return Math.round(((originalSize - compressedSize) / originalSize) * 100);
};

// Helper function to set expiration date (24 hours from now)
const setExpirationDate = () => {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);
  return expiresAt;
};

// @route   POST /api/compress/image
// @desc    Compress image file
// @access  Public
router.post('/image', upload.single('file'), handleUploadError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
        message: 'Please upload an image file'
      });
    }

    const { quality = 80 } = req.body;
    const originalSize = req.file.size;
    const originalFormat = getFileFormat(req.file.mimetype);
    
    // Validate file type
    if (!req.file.mimetype.startsWith('image/')) {
      await fs.unlink(req.file.path);
      return res.status(400).json({
        error: 'Invalid file type',
        message: 'Please upload a valid image file'
      });
    }

    // Generate output filename
    const outputFilename = `compressed-${Date.now()}-${Math.round(Math.random() * 1E9)}.${originalFormat}`;
    const outputPath = path.join(process.env.UPLOAD_PATH || './uploads', outputFilename);

    // Compress image using Sharp
    await sharp(req.file.path)
      .jpeg({ quality: parseInt(quality) })
      .toFile(outputPath);

    // Get compressed file size
    const compressedStats = await fs.stat(outputPath);
    const compressedSize = compressedStats.size;
    const savedPercent = calculateCompressionPercent(originalSize, compressedSize);

    // Clean up original file
    await fs.unlink(req.file.path);

    // Save to database
    const fileRecord = await File.create({
      fileName: outputFilename,
      originalName: req.file.originalname,
      fileType: 'image',
      originalFormat,
      originalSize,
      compressedSize,
      savedPercent,
      operation: 'compress',
      filePath: outputFilename,
      uploadedBy: req.user?._id || null,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      status: 'completed',
      expiresAt: setExpirationDate()
    });

    res.json({
      success: true,
      message: 'Image compressed successfully',
      data: {
        file: fileRecord,
        downloadUrl: fileRecord.getDownloadUrl(),
        compressionInfo: {
          originalSize: fileRecord.originalSizeFormatted,
          compressedSize: fileRecord.compressedSizeFormatted,
          savedPercent: `${savedPercent}%`,
          savedBytes: originalSize - compressedSize
        }
      }
    });

  } catch (error) {
    console.error('Image compression error:', error);
    
    // Clean up files on error
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting original file:', unlinkError);
      }
    }

    res.status(500).json({
      error: 'Compression failed',
      message: 'Something went wrong while compressing the image'
    });
  }
});

// @route   POST /api/compress/video
// @desc    Compress video file
// @access  Public
router.post('/video', upload.single('file'), handleUploadError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
        message: 'Please upload a video file'
      });
    }

    const { quality = 'medium' } = req.body;
    const originalSize = req.file.size;
    const originalFormat = getFileFormat(req.file.mimetype);
    
    // Validate file type
    if (!req.file.mimetype.startsWith('video/')) {
      await fs.unlink(req.file.path);
      return res.status(400).json({
        error: 'Invalid file type',
        message: 'Please upload a valid video file'
      });
    }

    // Generate output filename
    const outputFilename = `compressed-${Date.now()}-${Math.round(Math.random() * 1E9)}.mp4`;
    const outputPath = path.join(process.env.UPLOAD_PATH || './uploads', outputFilename);

    // Set quality settings
    let crf = 23; // Default quality
    if (quality === 'high') crf = 18;
    if (quality === 'low') crf = 28;

    // Compress video using FFmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(req.file.path)
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputOptions([
          `-crf ${crf}`,
          '-preset medium',
          '-movflags +faststart'
        ])
        .output(outputPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    // Get compressed file size
    const compressedStats = await fs.stat(outputPath);
    const compressedSize = compressedStats.size;
    const savedPercent = calculateCompressionPercent(originalSize, compressedSize);

    // Clean up original file
    await fs.unlink(req.file.path);

    // Save to database
    const fileRecord = await File.create({
      fileName: outputFilename,
      originalName: req.file.originalname,
      fileType: 'video',
      originalFormat,
      convertedFormat: 'mp4',
      originalSize,
      compressedSize,
      savedPercent,
      operation: 'compress',
      filePath: outputFilename,
      uploadedBy: req.user?._id || null,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      status: 'completed',
      expiresAt: setExpirationDate()
    });

    res.json({
      success: true,
      message: 'Video compressed successfully',
      data: {
        file: fileRecord,
        downloadUrl: fileRecord.getDownloadUrl(),
        compressionInfo: {
          originalSize: fileRecord.originalSizeFormatted,
          compressedSize: fileRecord.compressedSizeFormatted,
          savedPercent: `${savedPercent}%`,
          savedBytes: originalSize - compressedSize
        }
      }
    });

  } catch (error) {
    console.error('Video compression error:', error);
    
    // Clean up files on error
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting original file:', unlinkError);
      }
    }

    res.status(500).json({
      error: 'Compression failed',
      message: 'Something went wrong while compressing the video'
    });
  }
});

// @route   POST /api/compress/audio
// @desc    Compress audio file
// @access  Public
router.post('/audio', upload.single('file'), handleUploadError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
        message: 'Please upload an audio file'
      });
    }

    const { quality = 'medium' } = req.body;
    const originalSize = req.file.size;
    const originalFormat = getFileFormat(req.file.mimetype);
    
    // Validate file type
    if (!req.file.mimetype.startsWith('audio/')) {
      await fs.unlink(req.file.path);
      return res.status(400).json({
        error: 'Invalid file type',
        message: 'Please upload a valid audio file'
      });
    }

    // Generate output filename
    const outputFilename = `compressed-${Date.now()}-${Math.round(Math.random() * 1E9)}.mp3`;
    const outputPath = path.join(process.env.UPLOAD_PATH || './uploads', outputFilename);

    // Set quality settings
    let bitrate = '128k'; // Default quality
    if (quality === 'high') bitrate = '192k';
    if (quality === 'low') bitrate = '64k';

    // Compress audio using FFmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(req.file.path)
        .audioCodec('libmp3lame')
        .audioBitrate(bitrate)
        .output(outputPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    // Get compressed file size
    const compressedStats = await fs.stat(outputPath);
    const compressedSize = compressedStats.size;
    const savedPercent = calculateCompressionPercent(originalSize, compressedSize);

    // Clean up original file
    await fs.unlink(req.file.path);

    // Save to database
    const fileRecord = await File.create({
      fileName: outputFilename,
      originalName: req.file.originalname,
      fileType: 'audio',
      originalFormat,
      convertedFormat: 'mp3',
      originalSize,
      compressedSize,
      savedPercent,
      operation: 'compress',
      filePath: outputFilename,
      uploadedBy: req.user?._id || null,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      status: 'completed',
      expiresAt: setExpirationDate()
    });

    res.json({
      success: true,
      message: 'Audio compressed successfully',
      data: {
        file: fileRecord,
        downloadUrl: fileRecord.getDownloadUrl(),
        compressionInfo: {
          originalSize: fileRecord.originalSizeFormatted,
          compressedSize: fileRecord.compressedSizeFormatted,
          savedPercent: `${savedPercent}%`,
          savedBytes: originalSize - compressedSize
        }
      }
    });

  } catch (error) {
    console.error('Audio compression error:', error);
    
    // Clean up files on error
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting original file:', unlinkError);
      }
    }

    res.status(500).json({
      error: 'Compression failed',
      message: 'Something went wrong while compressing the audio'
    });
  }
});

// @route   POST /api/compress/pdf
// @desc    Compress PDF file
// @access  Public
router.post('/pdf', upload.single('file'), handleUploadError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
        message: 'Please upload a PDF file'
      });
    }

    const originalSize = req.file.size;
    
    // Validate file type
    if (req.file.mimetype !== 'application/pdf') {
      await fs.unlink(req.file.path);
      return res.status(400).json({
        error: 'Invalid file type',
        message: 'Please upload a valid PDF file'
      });
    }

    // Generate output filename
    const outputFilename = `compressed-${Date.now()}-${Math.round(Math.random() * 1E9)}.pdf`;
    const outputPath = path.join(process.env.UPLOAD_PATH || './uploads', outputFilename);

    // Read and compress PDF
    const pdfBytes = await fs.readFile(req.file.path);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // Compress PDF by removing unnecessary metadata
    const compressedPdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false
    });

    // Write compressed PDF
    await fs.writeFile(outputPath, compressedPdfBytes);

    const compressedSize = compressedPdfBytes.length;
    const savedPercent = calculateCompressionPercent(originalSize, compressedSize);

    // Clean up original file
    await fs.unlink(req.file.path);

    // Save to database
    const fileRecord = await File.create({
      fileName: outputFilename,
      originalName: req.file.originalname,
      fileType: 'pdf',
      originalFormat: 'pdf',
      originalSize,
      compressedSize,
      savedPercent,
      operation: 'compress',
      filePath: outputFilename,
      uploadedBy: req.user?._id || null,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      status: 'completed',
      expiresAt: setExpirationDate()
    });

    res.json({
      success: true,
      message: 'PDF compressed successfully',
      data: {
        file: fileRecord,
        downloadUrl: fileRecord.getDownloadUrl(),
        compressionInfo: {
          originalSize: fileRecord.originalSizeFormatted,
          compressedSize: fileRecord.compressedSizeFormatted,
          savedPercent: `${savedPercent}%`,
          savedBytes: originalSize - compressedSize
        }
      }
    });

  } catch (error) {
    console.error('PDF compression error:', error);
    
    // Clean up files on error
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting original file:', unlinkError);
      }
    }

    res.status(500).json({
      error: 'Compression failed',
      message: 'Something went wrong while compressing the PDF'
    });
  }
});

// @route   GET /api/compress/user-files
// @desc    Get user's files for dashboard
// @access  Private
router.get('/user-files', requireAuth, async (req, res) => {
  try {
    const files = await File.find({ uploadedBy: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      files: files
    });
  } catch (error) {
    console.error('Error fetching user files:', error);
    res.status(500).json({
      error: 'Failed to fetch files',
      message: 'Something went wrong while fetching your files'
    });
  }
});

// @route   GET /api/compress/user-stats
// @desc    Get user's file statistics for dashboard
// @access  Private
router.get('/user-stats', requireAuth, async (req, res) => {
  try {
    const files = await File.find({ uploadedBy: req.user._id });
    
    const stats = {
      totalFiles: files.length,
      totalSize: files.reduce((sum, file) => sum + (file.originalSize || 0), 0),
      compressedFiles: files.filter(file => file.operation === 'compress').length,
      convertedFiles: files.filter(file => file.operation === 'convert').length
    };

    res.json({
      success: true,
      stats: stats
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({
      error: 'Failed to fetch statistics',
      message: 'Something went wrong while fetching your statistics'
    });
  }
});

// @route   GET /api/compress/download/:fileId
// @desc    Download a user's file
// @access  Private
router.get('/download/:fileId', requireAuth, async (req, res) => {
  try {
    const file = await File.findOne({ 
      _id: req.params.fileId, 
      uploadedBy: req.user._id 
    });

    if (!file) {
      return res.status(404).json({
        error: 'File not found',
        message: 'The requested file could not be found'
      });
    }

    const filePath = path.join(process.env.UPLOAD_PATH || './uploads', file.fileName);
    
    // Check if file exists
    try {
      await fs.access(filePath);
    } catch (error) {
      return res.status(404).json({
        error: 'File not found',
        message: 'The file has been deleted or is no longer available'
      });
    }

    res.download(filePath, file.originalName);
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({
      error: 'Download failed',
      message: 'Something went wrong while downloading the file'
    });
  }
});

// @route   DELETE /api/compress/delete/:fileId
// @desc    Delete a user's file
// @access  Private
router.delete('/delete/:fileId', requireAuth, async (req, res) => {
  try {
    const file = await File.findOne({ 
      _id: req.params.fileId, 
      uploadedBy: req.user._id 
    });

    if (!file) {
      return res.status(404).json({
        error: 'File not found',
        message: 'The requested file could not be found'
      });
    }

    // Delete physical file
    const filePath = path.join(process.env.UPLOAD_PATH || './uploads', file.fileName);
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error('Error deleting physical file:', error);
    }

    // Delete from database
    await File.findByIdAndDelete(file._id);

    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({
      error: 'Delete failed',
      message: 'Something went wrong while deleting the file'
    });
  }
});

module.exports = router; 