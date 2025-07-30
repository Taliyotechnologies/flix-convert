const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');

// Ensure uploads directory exists
const ensureUploadsDir = async () => {
  const uploadsDir = path.join(__dirname, '../uploads');
  try {
    await fs.access(uploadsDir);
  } catch {
    await fs.mkdir(uploadsDir, { recursive: true });
  }
  return uploadsDir;
};

// Generate unique filename
const generateFileName = (originalName, format) => {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 15);
  const ext = format || path.extname(originalName);
  return `${timestamp}_${randomId}${ext}`;
};

// Format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Calculate compression percentage
const calculateCompression = (originalSize, compressedSize) => {
  return Math.round(((originalSize - compressedSize) / originalSize) * 100);
};

// Image compression
const compressImage = async (filePath, quality = 80) => {
  const uploadsDir = await ensureUploadsDir();
  const originalName = path.basename(filePath);
  const outputName = generateFileName(originalName, '.jpg');
  const outputPath = path.join(uploadsDir, outputName);

  await sharp(filePath)
    .jpeg({ quality })
    .toFile(outputPath);

  const originalStats = await fs.stat(filePath);
  const compressedStats = await fs.stat(outputPath);

  return {
    outputPath,
    outputName,
    originalSize: originalStats.size,
    compressedSize: compressedStats.size,
    savedPercent: calculateCompression(originalStats.size, compressedStats.size)
  };
};

// Image format conversion
const convertImage = async (filePath, targetFormat) => {
  const uploadsDir = await ensureUploadsDir();
  const originalName = path.basename(filePath);
  const outputName = generateFileName(originalName, `.${targetFormat}`);
  const outputPath = path.join(uploadsDir, outputName);

  const sharpInstance = sharp(filePath);
  
  switch (targetFormat.toLowerCase()) {
    case 'png':
      await sharpInstance.png().toFile(outputPath);
      break;
    case 'webp':
      await sharpInstance.webp().toFile(outputPath);
      break;
    case 'avif':
      await sharpInstance.avif().toFile(outputPath);
      break;
    case 'tiff':
      await sharpInstance.tiff().toFile(outputPath);
      break;
    default:
      await sharpInstance.jpeg({ quality: 90 }).toFile(outputPath);
  }

  const originalStats = await fs.stat(filePath);
  const convertedStats = await fs.stat(outputPath);

  return {
    outputPath,
    outputName,
    originalSize: originalStats.size,
    compressedSize: convertedStats.size,
    savedPercent: calculateCompression(originalStats.size, convertedStats.size)
  };
};

// Video compression
const compressVideo = async (filePath, quality = 'medium') => {
  const uploadsDir = await ensureUploadsDir();
  const originalName = path.basename(filePath);
  const outputName = generateFileName(originalName, '.mp4');
  const outputPath = path.join(uploadsDir, outputName);

  return new Promise((resolve, reject) => {
    ffmpeg(filePath)
      .videoCodec('libx264')
      .audioCodec('aac')
      .outputOptions([
        '-crf 23',
        '-preset medium',
        '-movflags +faststart'
      ])
      .on('end', async () => {
        try {
          const originalStats = await fs.stat(filePath);
          const compressedStats = await fs.stat(outputPath);
          
          resolve({
            outputPath,
            outputName,
            originalSize: originalStats.size,
            compressedSize: compressedStats.size,
            savedPercent: calculateCompression(originalStats.size, compressedStats.size)
          });
        } catch (error) {
          reject(error);
        }
      })
      .on('error', reject)
      .save(outputPath);
  });
};

// Video format conversion
const convertVideo = async (filePath, targetFormat) => {
  const uploadsDir = await ensureUploadsDir();
  const originalName = path.basename(filePath);
  const outputName = generateFileName(originalName, `.${targetFormat}`);
  const outputPath = path.join(uploadsDir, outputName);

  return new Promise((resolve, reject) => {
    const command = ffmpeg(filePath);
    
    switch (targetFormat.toLowerCase()) {
      case 'mp4':
        command.videoCodec('libx264').audioCodec('aac');
        break;
      case 'avi':
        command.videoCodec('libxvid').audioCodec('mp3');
        break;
      case 'mov':
        command.videoCodec('libx264').audioCodec('aac');
        break;
      case 'webm':
        command.videoCodec('libvpx').audioCodec('libvorbis');
        break;
      default:
        command.videoCodec('libx264').audioCodec('aac');
    }

    command
      .on('end', async () => {
        try {
          const originalStats = await fs.stat(filePath);
          const convertedStats = await fs.stat(outputPath);
          
          resolve({
            outputPath,
            outputName,
            originalSize: originalStats.size,
            compressedSize: convertedStats.size,
            savedPercent: calculateCompression(originalStats.size, convertedStats.size)
          });
        } catch (error) {
          reject(error);
        }
      })
      .on('error', reject)
      .save(outputPath);
  });
};

// Audio compression
const compressAudio = async (filePath) => {
  const uploadsDir = await ensureUploadsDir();
  const originalName = path.basename(filePath);
  const outputName = generateFileName(originalName, '.mp3');
  const outputPath = path.join(uploadsDir, outputName);

  return new Promise((resolve, reject) => {
    ffmpeg(filePath)
      .audioCodec('libmp3lame')
      .audioBitrate(128)
      .on('end', async () => {
        try {
          const originalStats = await fs.stat(filePath);
          const compressedStats = await fs.stat(outputPath);
          
          resolve({
            outputPath,
            outputName,
            originalSize: originalStats.size,
            compressedSize: compressedStats.size,
            savedPercent: calculateCompression(originalStats.size, compressedStats.size)
          });
        } catch (error) {
          reject(error);
        }
      })
      .on('error', reject)
      .save(outputPath);
  });
};

// Audio format conversion
const convertAudio = async (filePath, targetFormat) => {
  const uploadsDir = await ensureUploadsDir();
  const originalName = path.basename(filePath);
  const outputName = generateFileName(originalName, `.${targetFormat}`);
  const outputPath = path.join(uploadsDir, outputName);

  return new Promise((resolve, reject) => {
    const command = ffmpeg(filePath);
    
    switch (targetFormat.toLowerCase()) {
      case 'mp3':
        command.audioCodec('libmp3lame');
        break;
      case 'wav':
        command.audioCodec('pcm_s16le');
        break;
      case 'aac':
        command.audioCodec('aac');
        break;
      case 'ogg':
        command.audioCodec('libvorbis');
        break;
      default:
        command.audioCodec('libmp3lame');
    }

    command
      .on('end', async () => {
        try {
          const originalStats = await fs.stat(filePath);
          const convertedStats = await fs.stat(outputPath);
          
          resolve({
            outputPath,
            outputName,
            originalSize: originalStats.size,
            compressedSize: convertedStats.size,
            savedPercent: calculateCompression(originalStats.size, convertedStats.size)
          });
        } catch (error) {
          reject(error);
        }
      })
      .on('error', reject)
      .save(outputPath);
  });
};

// PDF compression
const compressPDF = async (filePath) => {
  const uploadsDir = await ensureUploadsDir();
  const originalName = path.basename(filePath);
  const outputName = generateFileName(originalName, '.pdf');
  const outputPath = path.join(uploadsDir, outputName);

  const pdfBytes = await fs.readFile(filePath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  
  // Compress by removing unnecessary metadata
  const compressedPdfBytes = await pdfDoc.save({
    useObjectStreams: true,
    addDefaultPage: false
  });

  await fs.writeFile(outputPath, compressedPdfBytes);

  const originalStats = await fs.stat(filePath);
  const compressedStats = await fs.stat(outputPath);

  return {
    outputPath,
    outputName,
    originalSize: originalStats.size,
    compressedSize: compressedStats.size,
    savedPercent: calculateCompression(originalStats.size, compressedStats.size)
  };
};

// Clean up old files
const cleanupOldFiles = async () => {
  const uploadsDir = await ensureUploadsDir();
  const files = await fs.readdir(uploadsDir);
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours

  for (const file of files) {
    const filePath = path.join(uploadsDir, file);
    const stats = await fs.stat(filePath);
    
    if (now - stats.mtime.getTime() > maxAge) {
      try {
        await fs.unlink(filePath);
        console.log(`Cleaned up old file: ${file}`);
      } catch (error) {
        console.error(`Failed to delete file ${file}:`, error);
      }
    }
  }
};

module.exports = {
  compressImage,
  convertImage,
  compressVideo,
  convertVideo,
  compressAudio,
  convertAudio,
  compressPDF,
  formatFileSize,
  calculateCompression,
  generateFileName,
  cleanupOldFiles
}; 