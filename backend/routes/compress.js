const express = require('express');
const sharp = require('sharp');
sharp.concurrency(4); // Speed up image processing
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const { PDFDocument } = require('pdf-lib');
const path = require('path');
const fs = require('fs').promises;
const jwt = require('jsonwebtoken');
const { uploadImage, uploadVideo, uploadPDF, uploadAudio, handleUploadError, createUploadMiddleware } = require('../middleware/upload');
const { auth } = require('../middleware/auth');
const File = require('../models/File');
const History = require('../models/History');

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegStatic);

const router = express.Router();

// Helper function to record history
async function recordHistory(req, fileType, originalName, originalSize, compressedName, compressedSize, status = 'success') {
  try {
    // Get user ID from auth token
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const historyEntry = new History({
          userId: decoded.userId,
          type: 'compression',
          fileType: fileType,
          originalFileName: originalName,
          originalFileSize: originalSize,
          convertedFileName: compressedName,
          convertedFileSize: compressedSize,
          format: path.extname(originalName).toLowerCase().slice(1) || 'unknown',
          status: status
        });
        await historyEntry.save();
      } catch (error) {
        console.error('Error recording history:', error);
      }
    }
  } catch (error) {
    console.error('Error in recordHistory:', error);
  }
}

// Helper to get file size limit based on auth
function getLimitMBFromAuth(req) {
  const authHeader = req.headers.authorization;
  if (authHeader) return 1024; // 1GB (effectively unlimited)
  return 10; // 10MB for guests
}

// Image compression route (already supports guest uploads)
router.post('/image', createUploadMiddleware('image', getLimitMBFromAuth), handleUploadError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const originalSize = req.file.size;
    const originalPath = req.file.path;
    const filename = req.file.filename;
    const originalName = req.file.originalname;

    // Detect if image is already compressed (only check for downloaded compressed files)
    const isAlreadyCompressed = originalName.includes('compressed-') || 
                               originalName.includes('enhanced-') || 
                               originalName.includes('_compressed') ||
                               originalName.includes('_enhanced') ||
                               originalName.includes('optimized-') ||
                               originalName.includes('resized-');

    // Only show "already compressed" for files that were actually downloaded and re-uploaded
    if (isAlreadyCompressed) {
      console.log('Detected previously downloaded compressed image, returning message');
      
      // Clean up original file
      await fs.unlink(originalPath);
      
      return res.json({
        success: true,
        message: 'This image was already compressed and downloaded. Please use the original image for compression.',
        data: {
          originalName: originalName,
          originalSize: originalSize,
          compressedSize: originalSize,
          compressionRatio: '0%',
          downloadUrl: null,
          fileId: null,
          alreadyCompressed: true
        }
      });
    }
    
    const compressedFilename = `compressed-${filename}`;
    const compressedPath = path.join('uploads', compressedFilename);

    // Enhanced compression settings with automatic enhancement
    const compressionSettings = {
      quality: 70,
      resize: { width: 800, height: 600 },
      effort: 6,
      // Enhancement settings - subtle but effective
      enhance: true,
      sharpen: 0.3,        // Subtle sharpening
      contrast: 1.08,      // Slight contrast boost
      brightness: 1.02,    // Minimal brightness increase
      saturation: 1.05,    // Slight saturation boost
      gamma: 1.02          // Subtle gamma correction
    };

    console.log('Starting image compression with automatic enhancement...');

    // Detect image type for optimal enhancement
    const imageInfo = await sharp(originalPath).metadata();
    const isPortrait = imageInfo.width < imageInfo.height;
    const isDark = imageInfo.hasAlpha; // Simple heuristic for dark images
    
    // Adjust enhancement based on image type
    if (isPortrait) {
      compressionSettings.sharpen = 0.4; // More sharpening for portraits
      compressionSettings.contrast = 1.1; // Better contrast for faces
    }
    if (isDark) {
      compressionSettings.brightness = 1.05; // More brightness for dark images
      compressionSettings.gamma = 1.05; // Better gamma for dark images
    }

    // Compress and enhance image with Sharp using enhanced settings
    const compressedBuffer = await sharp(originalPath)
      .jpeg({ 
        quality: compressionSettings.quality,
        progressive: true,
        mozjpeg: true
      })
      .png({ 
        compressionLevel: 9,
        adaptiveFiltering: true
      })
      .webp({ 
        quality: compressionSettings.quality,
        effort: compressionSettings.effort
      })
      .resize(compressionSettings.resize.width, compressionSettings.resize.height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      // Automatic enhancement without size increase
      .sharpen(compressionSettings.sharpen)
      .modulate({
        brightness: compressionSettings.brightness,
        saturation: compressionSettings.saturation
      })
      .linear(1, compressionSettings.contrast - 1) // Contrast enhancement
      .gamma(compressionSettings.gamma) // Gamma correction for better colors
      .toBuffer();

    // Save compressed and enhanced file
    await fs.writeFile(compressedPath, compressedBuffer);

    // Get compressed file stats
    const compressedStats = await fs.stat(compressedPath);
    const compressedSize = compressedStats.size;
    const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);

    console.log('Image compression and enhancement completed:', {
      originalSize: `${(originalSize / 1024 / 1024).toFixed(2)} MB`,
      compressedSize: `${(compressedSize / 1024 / 1024).toFixed(2)} MB`,
      compressionRatio: `${compressionRatio}%`,
      enhancements: `Applied: Sharpening (${compressionSettings.sharpen}), Contrast (${compressionSettings.contrast}), Brightness (${compressionSettings.brightness}), Saturation (${compressionSettings.saturation}), Gamma (${compressionSettings.gamma})`,
      imageType: isPortrait ? 'Portrait' : 'Landscape',
      optimizedFor: isPortrait ? 'Face enhancement' : 'General enhancement'
    });

    // Check file size and auth requirement
    const isLargeFile = req.file.size > 10 * 1024 * 1024; // 10MB
    const authHeader = req.headers.authorization;
    
    if (isLargeFile && !authHeader) {
      return res.status(401).json({ 
        error: 'Authentication required for files larger than 10MB',
        requiresAuth: true 
      });
    }
    
    // Get user ID (either from auth or use anonymous)
    let userId = '000000000000000000000000'; // Anonymous user ID
    if (authHeader) {
      try {
        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
      } catch (error) {
        if (isLargeFile) {
          return res.status(401).json({ 
            error: 'Invalid token for large files',
            requiresAuth: true 
          });
        }
      }
    }
    
    // Create file record in database
    const fileRecord = new File({
      user: userId,
      originalName: originalName,
      filename: compressedFilename,
      fileType: 'image',
      mimeType: req.file.mimetype,
      originalSize: originalSize,
      compressedSize: compressedSize,
      compressionRatio: parseFloat(compressionRatio),
      quality: 85,
      status: 'completed',
      downloadUrl: `/api/files/download/${compressedFilename}`,
      processedAt: new Date()
    });

    await fileRecord.save();

    // Record history for authenticated users
    await recordHistory(req, 'image', originalName, originalSize, compressedFilename, compressedSize, 'success');

    // Clean up original file
    await fs.unlink(originalPath);

    res.json({
      success: true,
      message: 'Image compressed successfully',
      data: {
        originalName: originalName,
        originalSize: originalSize,
        compressedSize: compressedSize,
        compressionRatio: `${compressionRatio}%`,
        downloadUrl: `/api/files/download/${compressedFilename}`,
        fileId: fileRecord._id
      }
    });

  } catch (error) {
    console.error('Image compression error:', error);
    
    // Record failed history for authenticated users
    if (req.file) {
      await recordHistory(req, 'image', req.file.originalname, req.file.size, '', 0, 'failed');
    }
    
    // Clean up files on error
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (cleanupError) {
        console.error('Cleanup error:', cleanupError);
      }
    }

    res.status(500).json({ error: 'Image compression failed' });
  }
});

// Video compression route
router.post('/video', createUploadMiddleware('video', getLimitMBFromAuth), handleUploadError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }
    const originalSize = req.file.size;
    const originalPath = req.file.path;
    const filename = req.file.filename;
    const originalName = req.file.originalname;
    const compressedFilename = `compressed-${filename}`;
    const compressedPath = path.join('uploads', compressedFilename);
    let userId = '000000000000000000000000'; // Anonymous user ID
    const authHeader = req.headers.authorization;
    if (authHeader) {
      try {
        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
      } catch (error) {}
    }
    // Simple compression settings
    const crf = 28;
    const preset = 'ultrafast';
    await new Promise((resolve, reject) => {
      ffmpeg(originalPath)
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputOptions([
          `-crf ${crf}`,
          `-preset ${preset}`,
          '-movflags +faststart'
        ])
        .output(compressedPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });
    const compressedStats = await fs.stat(compressedPath);
    const compressedSize = compressedStats.size;
    const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);
    const fileRecord = new File({
      user: userId,
      originalName: originalName,
      filename: compressedFilename,
      fileType: 'video',
      mimeType: 'video/mp4',
      originalSize: originalSize,
      compressedSize: compressedSize,
      compressionRatio: parseFloat(compressionRatio),
      quality: 85,
      status: 'completed',
      downloadUrl: `/api/files/download/${compressedFilename}`,
      processedAt: new Date()
    });
    await fileRecord.save();
    await fs.unlink(originalPath);
    await recordHistory(req, 'video', originalName, originalSize, compressedFilename, compressedSize, 'success');
    res.json({
      success: true,
      message: 'Video compressed successfully',
      data: {
        originalName: originalName,
        originalSize: originalSize,
        compressedSize: compressedSize,
        compressionRatio: `${compressionRatio}%`,
        downloadUrl: `/api/files/download/${compressedFilename}`,
        fileId: fileRecord._id
      }
    });
  } catch (error) {
    if (req.file) {
      try { await fs.unlink(req.file.path); } catch {}
    }
    res.status(500).json({ error: 'Video compression failed', details: error.message });
  }
});

// All video enhancement logic and routes have been completely removed as per user request.

// Get user's image compression history
router.get('/image/history', auth, async (req, res) => {
  try {
    const files = await File.find({ 
      user: req.user._id, 
      fileType: 'image' 
    })
    .sort({ createdAt: -1 })
    .limit(20);

    res.json({
      success: true,
      data: files
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ error: 'Failed to get compression history' });
  }
});

// PDF compression route
router.post('/pdf', createUploadMiddleware('pdf', getLimitMBFromAuth), handleUploadError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }
    const isLargeFile = req.file.size > 10 * 1024 * 1024;
    const authHeader = req.headers.authorization;
    let userId = '000000000000000000000000'; // Anonymous user ID
    if (isLargeFile && !authHeader) {
      return res.status(401).json({ error: 'Authentication required for files larger than 10MB', requiresAuth: true });
    }
    if (authHeader) {
      try {
        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
        req.user = { _id: userId };
      } catch (error) {
        if (isLargeFile) {
          return res.status(401).json({ error: 'Invalid token for large files', requiresAuth: true });
        }
      }
    }

    const originalSize = req.file.size;
    const originalPath = req.file.path;
    const filename = req.file.filename;
    const originalName = req.file.originalname;

    // Create compressed filename
    const compressedFilename = `compressed-${filename}`;
    const compressedPath = path.join('uploads', compressedFilename);

    // Read the original PDF
    const originalPdfBytes = await fs.readFile(originalPath);
    
    // Load PDF document
    const pdfDoc = await PDFDocument.load(originalPdfBytes);
    
    // Check if PDF is already compressed
    const isAlreadyCompressed = originalName.includes('compressed') || 
                               originalName.includes('optimized') ||
                               originalName.includes('_compressed') ||
                               originalName.includes('_optimized');
    
    if (isAlreadyCompressed) {
      console.log('PDF appears to be already compressed, applying minimal compression...');
    }
    
    // Get all pages for processing
    const pages = pdfDoc.getPages();
    
    // Efficient PDF compression with optimized settings
    console.log('Starting PDF compression...');
    
    // Add timeout for compression
    const compressionTimeout = setTimeout(() => {
      console.log('PDF compression taking too long, using basic compression...');
    }, 30000); // 30 seconds timeout
    
    try {
      // Single-pass compression with maximum efficiency
      let compressedPdfBytes = await pdfDoc.save({
      useObjectStreams: true,      // Enable object streams for compression
      addDefaultPage: false,       // Don't add default page
      objectsPerTick: 50,          // Balanced batch size for speed and compression
      updateFieldAppearances: false, // Don't update form field appearances
      throwOnInvalidObject: false,  // Don't throw on invalid objects
      // Optimized compression settings
      compress: true,              // Enable compression
      objectStreamMode: 'preserve', // Preserve object streams
      deflateLevel: 9,             // Maximum deflate compression
      removeUnusedObjects: true,   // Remove unused objects
    });
    
    const firstCompressionRatio = ((originalSize - compressedPdfBytes.length) / originalSize * 100);
    console.log(`Single-pass compression achieved ${firstCompressionRatio.toFixed(2)}%`);
    
    // If compression is poor, try one more pass with different settings
    if (firstCompressionRatio < 15 && originalSize > 500 * 1024) {
      console.log('Poor compression detected, applying second pass...');
      
      const secondPdfDoc = await PDFDocument.load(compressedPdfBytes);
      compressedPdfBytes = await secondPdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 20,        // Smaller batches for better compression
        updateFieldAppearances: false,
        throwOnInvalidObject: false,
        compress: true,
        objectStreamMode: 'preserve',
        deflateLevel: 9,
        removeUnusedObjects: true,
      });
      
      const finalCompressionRatio = ((originalSize - compressedPdfBytes.length) / originalSize * 100);
      console.log(`Second pass achieved ${finalCompressionRatio.toFixed(2)}%`);
    }
    
    // For PDFs that still don't compress well, try alternative approach
    const currentCompressionRatio = ((originalSize - compressedPdfBytes.length) / originalSize * 100);
    if (currentCompressionRatio < 10 && originalSize > 1 * 1024 * 1024) {
      console.log('Very poor compression detected, trying alternative approach...');
      
      // Try with different PDF-lib settings
      const alternativePdfDoc = await PDFDocument.load(originalPdfBytes);
      const alternativeCompressed = await alternativePdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 100,       // Larger batches for different approach
        updateFieldAppearances: false,
        throwOnInvalidObject: false,
        compress: true,
        objectStreamMode: 'preserve',
        deflateLevel: 9,
        removeUnusedObjects: true,
      });
      
      // Use the better result
      if (alternativeCompressed.length < compressedPdfBytes.length) {
        compressedPdfBytes = alternativeCompressed;
        const alternativeRatio = ((originalSize - compressedPdfBytes.length) / originalSize * 100);
        console.log(`Alternative approach achieved ${alternativeRatio.toFixed(2)}%`);
      }
    }
    
    clearTimeout(compressionTimeout);
    
    // Save compressed PDF
    await fs.writeFile(compressedPath, compressedPdfBytes);
    
    } catch (compressionError) {
      console.error('PDF compression error:', compressionError);
      clearTimeout(compressionTimeout);
      
      // Fallback to basic compression
      console.log('Using fallback compression...');
      compressedPdfBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 100,
        updateFieldAppearances: false,
        throwOnInvalidObject: false,
        compress: true,
      });
      
      await fs.writeFile(compressedPath, compressedPdfBytes);
    }

    // Get compressed file stats
    const compressedStats = await fs.stat(compressedPath);
    const compressedSize = compressedStats.size;
    const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);
    
    // Log compression results
    console.log('PDF Compression Results:', {
      originalSize: `${(originalSize / 1024 / 1024).toFixed(2)} MB`,
      compressedSize: `${(compressedSize / 1024 / 1024).toFixed(2)} MB`,
      compressionRatio: `${compressionRatio}%`,
      sizeReduction: `${((originalSize - compressedSize) / 1024 / 1024).toFixed(2)} MB`
    });
    
    // Provide feedback based on compression ratio
    let compressionMessage = 'PDF compressed successfully';
    if (parseFloat(compressionRatio) < 10) {
      compressionMessage = 'PDF was already well-compressed, minimal size reduction achieved';
    } else if (parseFloat(compressionRatio) < 20) {
      compressionMessage = 'PDF compressed with moderate size reduction';
    } else if (parseFloat(compressionRatio) < 40) {
      compressionMessage = 'PDF compressed with significant size reduction';
    } else {
      compressionMessage = 'PDF compressed with excellent size reduction';
    }

    // Create file record in database
    const fileRecord = new File({
      user: userId,
      originalName: originalName,
      filename: compressedFilename,
      fileType: 'pdf',
      mimeType: 'application/pdf',
      originalSize: originalSize,
      compressedSize: compressedSize,
      compressionRatio: parseFloat(compressionRatio),
      quality: 90,
      status: 'completed',
      downloadUrl: `/api/files/download/${compressedFilename}`,
      processedAt: new Date()
    });
    await fileRecord.save();

    // Clean up original file
    await fs.unlink(originalPath);

    // Record history for authenticated users
    await recordHistory(req, 'pdf', originalName, originalSize, compressedFilename, compressedSize, 'success');

    res.json({
      success: true,
      message: compressionMessage,
      data: {
        originalName: originalName,
        originalSize: originalSize,
        compressedSize: compressedSize,
        compressionRatio: `${compressionRatio}%`,
        downloadUrl: `/api/files/download/${compressedFilename}`,
        fileId: fileRecord._id
      }
    });

  } catch (error) {
    console.error('PDF compression error:', error);
    
    // Record failed history for authenticated users
    if (req.file) {
      await recordHistory(req, 'pdf', req.file.originalname, req.file.size, '', 0, 'failed');
    }
    
    // Clean up files on error
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (cleanupError) {
        console.error('Cleanup error:', cleanupError);
      }
    }

    res.status(500).json({ error: 'PDF compression failed' });
  }
});

// Get user's video compression history
router.get('/video/history', auth, async (req, res) => {
  try {
    // const files = await File.find({ 
    //   user: req.user._id, 
    //   fileType: 'video' 
    // })
    // .sort({ createdAt: -1 })
    // .limit(20);

    res.json({
      success: true,
      data: [] // Return empty array as File model is commented out
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ error: 'Failed to get compression history' });
  }
});

// Audio compression route
router.post('/audio', createUploadMiddleware('audio', getLimitMBFromAuth), handleUploadError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file uploaded' });
    }
    const isLargeFile = req.file.size > 10 * 1024 * 1024;
    const authHeader = req.headers.authorization;
    let userId = '000000000000000000000000'; // Anonymous user ID
    if (isLargeFile && !authHeader) {
      return res.status(401).json({ error: 'Authentication required for files larger than 10MB', requiresAuth: true });
    }
    if (authHeader) {
      try {
        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
        req.user = { _id: userId };
      } catch (error) {
        if (isLargeFile) {
          return res.status(401).json({ error: 'Invalid token for large files', requiresAuth: true });
        }
      }
    }

    const originalSize = req.file.size;
    const originalPath = req.file.path;
    const filename = req.file.filename;
    const originalName = req.file.originalname;

    // Create compressed filename
    const compressedFilename = `compressed-${filename}`;
    const compressedPath = path.join('uploads', compressedFilename);

    // Compress audio with FFmpeg
    return new Promise((resolve, reject) => {
      ffmpeg(originalPath)
        .audioCodec('aac')      // AAC codec for best quality/size ratio
        .audioBitrate('128k')   // 128kbps for good quality
        .audioChannels(2)       // Stereo output
        .audioFrequency(44100)  // 44.1kHz sample rate
        .outputOptions([
          '-q:a 2',            // Quality setting (0-9, lower is better)
          '-movflags +faststart', // Optimize for streaming
          '-profile:a aac_low'    // AAC low complexity profile
        ])
        .output(compressedPath)
        .on('end', async () => {
          try {
            // Get compressed file stats
            const compressedStats = await fs.stat(compressedPath);
            const compressedSize = compressedStats.size;
            const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);

            // Create file record in database
            const fileRecord = new File({
              user: userId,
              originalName: originalName,
              filename: compressedFilename,
              fileType: 'audio',
              mimeType: 'audio/mp4',
              originalSize: originalSize,
              compressedSize: compressedSize,
              compressionRatio: parseFloat(compressionRatio),
              quality: 85,
              status: 'completed',
              downloadUrl: `/api/files/download/${compressedFilename}`,
              processedAt: new Date()
            });
            await fileRecord.save();

            // Clean up original file
            await fs.unlink(originalPath);

            // Record history for authenticated users
            await recordHistory(req, 'audio', originalName, originalSize, compressedFilename, compressedSize, 'success');

            res.json({
              success: true,
              message: 'Audio compressed successfully',
              data: {
                originalName: originalName,
                originalSize: originalSize,
                compressedSize: compressedSize,
                compressionRatio: `${compressionRatio}%`,
                downloadUrl: `/api/files/download/${compressedFilename}`,
                fileId: fileRecord._id
              }
            });

            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error) => {
          console.error('FFmpeg audio error:', error);
          reject(new Error('Audio compression failed'));
        })
        .run();
    });

  } catch (error) {
    console.error('Audio compression error:', error);
    
    // Record failed history for authenticated users
    if (req.file) {
      await recordHistory(req, 'audio', req.file.originalname, req.file.size, '', 0, 'failed');
    }
    
    // Clean up files on error
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (cleanupError) {
        console.error('Cleanup error:', cleanupError);
      }
    }

    res.status(500).json({ error: 'Audio compression failed' });
  }
});

// Get user's PDF compression history
router.get('/pdf/history', auth, async (req, res) => {
  try {
    // const files = await File.find({ 
    //   user: req.user._id, 
    //   fileType: 'pdf' 
    // })
    // .sort({ createdAt: -1 })
    // .limit(20);

    res.json({
      success: true,
      data: [] // Return empty array as File model is commented out
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ error: 'Failed to get compression history' });
  }
});

// Get user's audio compression history
router.get('/audio/history', auth, async (req, res) => {
  try {
    // const files = await File.find({ 
    //   user: req.user._id, 
    //   fileType: 'audio' 
    // })
    // .sort({ createdAt: -1 })
    // .limit(20);

    res.json({
      success: true,
      data: [] // Return empty array as File model is commented out
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ error: 'Failed to get compression history' });
  }
});

module.exports = router; 