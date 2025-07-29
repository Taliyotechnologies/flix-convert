const express = require('express');
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs').promises;
const path = require('path');
const File = require('../models/File');
const { upload, handleUploadError, getFileType, getFileFormat } = require('../middleware/upload');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Helper function to set expiration date (24 hours from now)
const setExpirationDate = () => {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);
  return expiresAt;
};

// @route   POST /api/convert/image
// @desc    Convert image to different format
// @access  Public
router.post('/image', upload.single('file'), handleUploadError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
        message: 'Please upload an image file'
      });
    }

    const { format = 'png', quality = 80 } = req.body;
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

    // Validate output format
    const allowedFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp'];
    if (!allowedFormats.includes(format.toLowerCase())) {
      await fs.unlink(req.file.path);
      return res.status(400).json({
        error: 'Invalid output format',
        message: `Supported formats: ${allowedFormats.join(', ')}`
      });
    }

    // Generate output filename
    const outputFilename = `converted-${Date.now()}-${Math.round(Math.random() * 1E9)}.${format}`;
    const outputPath = path.join(process.env.UPLOAD_PATH || './uploads', outputFilename);

    // Convert image using Sharp
    let sharpInstance = sharp(req.file.path);
    
    switch (format.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
        sharpInstance = sharpInstance.jpeg({ quality: parseInt(quality) });
        break;
      case 'png':
        sharpInstance = sharpInstance.png({ quality: parseInt(quality) });
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
    }

    await sharpInstance.toFile(outputPath);

    // Get converted file size
    const convertedStats = await fs.stat(outputPath);
    const convertedSize = convertedStats.size;

    // Clean up original file
    await fs.unlink(req.file.path);

    // Save to database
    const fileRecord = await File.create({
      fileName: outputFilename,
      originalName: req.file.originalname,
      fileType: 'image',
      originalFormat,
      convertedFormat: format.toLowerCase(),
      originalSize,
      compressedSize: convertedSize,
      operation: 'convert',
      filePath: outputFilename,
      uploadedBy: req.user?._id || null,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      status: 'completed',
      expiresAt: setExpirationDate()
    });

    res.json({
      success: true,
      message: 'Image converted successfully',
      data: {
        file: fileRecord,
        downloadUrl: fileRecord.getDownloadUrl(),
        conversionInfo: {
          originalFormat,
          convertedFormat: format.toLowerCase(),
          originalSize: fileRecord.originalSizeFormatted,
          convertedSize: fileRecord.compressedSizeFormatted
        }
      }
    });

  } catch (error) {
    console.error('Image conversion error:', error);
    
    // Clean up files on error
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting original file:', unlinkError);
      }
    }

    res.status(500).json({
      error: 'Conversion failed',
      message: 'Something went wrong while converting the image'
    });
  }
});

// @route   POST /api/convert/video
// @desc    Convert video to different format
// @access  Public
router.post('/video', upload.single('file'), handleUploadError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
        message: 'Please upload a video file'
      });
    }

    const { format = 'mp4', quality = 'medium' } = req.body;
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

    // Validate output format
    const allowedFormats = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv'];
    if (!allowedFormats.includes(format.toLowerCase())) {
      await fs.unlink(req.file.path);
      return res.status(400).json({
        error: 'Invalid output format',
        message: `Supported formats: ${allowedFormats.join(', ')}`
      });
    }

    // Generate output filename
    const outputFilename = `converted-${Date.now()}-${Math.round(Math.random() * 1E9)}.${format}`;
    const outputPath = path.join(process.env.UPLOAD_PATH || './uploads', outputFilename);

    // Set quality settings
    let crf = 23; // Default quality
    if (quality === 'high') crf = 18;
    if (quality === 'low') crf = 28;

    // Convert video using FFmpeg
    await new Promise((resolve, reject) => {
      let ffmpegCommand = ffmpeg(req.file.path);

      // Configure based on output format
      switch (format.toLowerCase()) {
        case 'mp4':
          ffmpegCommand
            .videoCodec('libx264')
            .audioCodec('aac')
            .outputOptions([
              `-crf ${crf}`,
              '-preset medium',
              '-movflags +faststart'
            ]);
          break;
        case 'webm':
          ffmpegCommand
            .videoCodec('libvpx-vp9')
            .audioCodec('libopus')
            .outputOptions([
              `-crf ${crf}`,
              '-b:v 0'
            ]);
          break;
        case 'avi':
          ffmpegCommand
            .videoCodec('libx264')
            .audioCodec('mp3');
          break;
        case 'mov':
          ffmpegCommand
            .videoCodec('libx264')
            .audioCodec('aac')
            .outputOptions([
              `-crf ${crf}`,
              '-preset medium'
            ]);
          break;
        default:
          ffmpegCommand
            .videoCodec('libx264')
            .audioCodec('aac');
      }

      ffmpegCommand
        .output(outputPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    // Get converted file size
    const convertedStats = await fs.stat(outputPath);
    const convertedSize = convertedStats.size;

    // Clean up original file
    await fs.unlink(req.file.path);

    // Save to database
    const fileRecord = await File.create({
      fileName: outputFilename,
      originalName: req.file.originalname,
      fileType: 'video',
      originalFormat,
      convertedFormat: format.toLowerCase(),
      originalSize,
      compressedSize: convertedSize,
      operation: 'convert',
      filePath: outputFilename,
      uploadedBy: req.user?._id || null,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      status: 'completed',
      expiresAt: setExpirationDate()
    });

    res.json({
      success: true,
      message: 'Video converted successfully',
      data: {
        file: fileRecord,
        downloadUrl: fileRecord.getDownloadUrl(),
        conversionInfo: {
          originalFormat,
          convertedFormat: format.toLowerCase(),
          originalSize: fileRecord.originalSizeFormatted,
          convertedSize: fileRecord.compressedSizeFormatted
        }
      }
    });

  } catch (error) {
    console.error('Video conversion error:', error);
    
    // Clean up files on error
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting original file:', unlinkError);
      }
    }

    res.status(500).json({
      error: 'Conversion failed',
      message: 'Something went wrong while converting the video'
    });
  }
});

// @route   POST /api/convert/audio
// @desc    Convert audio to different format
// @access  Public
router.post('/audio', upload.single('file'), handleUploadError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
        message: 'Please upload an audio file'
      });
    }

    const { format = 'mp3', quality = 'medium' } = req.body;
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

    // Validate output format
    const allowedFormats = ['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a'];
    if (!allowedFormats.includes(format.toLowerCase())) {
      await fs.unlink(req.file.path);
      return res.status(400).json({
        error: 'Invalid output format',
        message: `Supported formats: ${allowedFormats.join(', ')}`
      });
    }

    // Generate output filename
    const outputFilename = `converted-${Date.now()}-${Math.round(Math.random() * 1E9)}.${format}`;
    const outputPath = path.join(process.env.UPLOAD_PATH || './uploads', outputFilename);

    // Set quality settings
    let bitrate = '128k'; // Default quality
    if (quality === 'high') bitrate = '192k';
    if (quality === 'low') bitrate = '64k';

    // Convert audio using FFmpeg
    await new Promise((resolve, reject) => {
      let ffmpegCommand = ffmpeg(req.file.path);

      // Configure based on output format
      switch (format.toLowerCase()) {
        case 'mp3':
          ffmpegCommand.audioCodec('libmp3lame').audioBitrate(bitrate);
          break;
        case 'wav':
          ffmpegCommand.audioCodec('pcm_s16le');
          break;
        case 'flac':
          ffmpegCommand.audioCodec('flac');
          break;
        case 'aac':
          ffmpegCommand.audioCodec('aac').audioBitrate(bitrate);
          break;
        case 'ogg':
          ffmpegCommand.audioCodec('libvorbis').audioBitrate(bitrate);
          break;
        case 'm4a':
          ffmpegCommand.audioCodec('aac').audioBitrate(bitrate);
          break;
      }

      ffmpegCommand
        .output(outputPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    // Get converted file size
    const convertedStats = await fs.stat(outputPath);
    const convertedSize = convertedStats.size;

    // Clean up original file
    await fs.unlink(req.file.path);

    // Save to database
    const fileRecord = await File.create({
      fileName: outputFilename,
      originalName: req.file.originalname,
      fileType: 'audio',
      originalFormat,
      convertedFormat: format.toLowerCase(),
      originalSize,
      compressedSize: convertedSize,
      operation: 'convert',
      filePath: outputFilename,
      uploadedBy: req.user?._id || null,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      status: 'completed',
      expiresAt: setExpirationDate()
    });

    res.json({
      success: true,
      message: 'Audio converted successfully',
      data: {
        file: fileRecord,
        downloadUrl: fileRecord.getDownloadUrl(),
        conversionInfo: {
          originalFormat,
          convertedFormat: format.toLowerCase(),
          originalSize: fileRecord.originalSizeFormatted,
          convertedSize: fileRecord.compressedSizeFormatted
        }
      }
    });

  } catch (error) {
    console.error('Audio conversion error:', error);
    
    // Clean up files on error
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting original file:', unlinkError);
      }
    }

    res.status(500).json({
      error: 'Conversion failed',
      message: 'Something went wrong while converting the audio'
    });
  }
});

module.exports = router; 