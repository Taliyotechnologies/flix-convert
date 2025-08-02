const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs-extra');
const path = require('path');

// Image compression using Sharp
const compressImage = async (inputPath, outputPath, quality = 80) => {
  try {
    await sharp(inputPath)
      .jpeg({ quality })
      .toFile(outputPath);
    
    return true;
  } catch (error) {
    throw new Error(`Image compression failed: ${error.message}`);
  }
};

// Image conversion using Sharp
const convertImage = async (inputPath, outputPath, format, quality = 80) => {
  try {
    let sharpInstance = sharp(inputPath);
    
    switch (format.toLowerCase()) {
      case 'jpeg':
      case 'jpg':
        sharpInstance = sharpInstance.jpeg({ quality });
        break;
      case 'png':
        sharpInstance = sharpInstance.png({ quality });
        break;
      case 'webp':
        sharpInstance = sharpInstance.webp({ quality });
        break;
      case 'gif':
        sharpInstance = sharpInstance.gif();
        break;
      case 'bmp':
        sharpInstance = sharpInstance.bmp();
        break;
      case 'tiff':
        sharpInstance = sharpInstance.tiff({ quality });
        break;
      default:
        throw new Error('Unsupported image format');
    }
    
    await sharpInstance.toFile(outputPath);
    return true;
  } catch (error) {
    throw new Error(`Image conversion failed: ${error.message}`);
  }
};

// Video compression using FFmpeg
const compressVideo = async (inputPath, outputPath, quality = 'medium') => {
  return new Promise((resolve, reject) => {
    let command = ffmpeg(inputPath);
    
    switch (quality) {
      case 'low':
        command = command.videoCodec('libx264').outputOptions(['-crf 28']);
        break;
      case 'medium':
        command = command.videoCodec('libx264').outputOptions(['-crf 23']);
        break;
      case 'high':
        command = command.videoCodec('libx264').outputOptions(['-crf 18']);
        break;
      default:
        command = command.videoCodec('libx264').outputOptions(['-crf 23']);
    }
    
    command
      .audioCodec('aac')
      .output(outputPath)
      .on('end', () => resolve(true))
      .on('error', (err) => reject(new Error(`Video compression failed: ${err.message}`)))
      .run();
  });
};

// Video conversion using FFmpeg
const convertVideo = async (inputPath, outputPath, format) => {
  return new Promise((resolve, reject) => {
    let command = ffmpeg(inputPath);
    
    switch (format.toLowerCase()) {
      case 'mp4':
        command = command.videoCodec('libx264').audioCodec('aac');
        break;
      case 'avi':
        command = command.videoCodec('libxvid').audioCodec('mp3');
        break;
      case 'mov':
        command = command.videoCodec('libx264').audioCodec('aac');
        break;
      case 'webm':
        command = command.videoCodec('libvpx').audioCodec('libvorbis');
        break;
      case 'mkv':
        command = command.videoCodec('libx264').audioCodec('aac');
        break;
      default:
        reject(new Error('Unsupported video format'));
        return;
    }
    
    command
      .output(outputPath)
      .on('end', () => resolve(true))
      .on('error', (err) => reject(new Error(`Video conversion failed: ${err.message}`)))
      .run();
  });
};

// Audio compression using FFmpeg
const compressAudio = async (inputPath, outputPath, quality = 'medium') => {
  return new Promise((resolve, reject) => {
    let command = ffmpeg(inputPath);
    
    switch (quality) {
      case 'low':
        command = command.audioCodec('mp3').audioBitrate('64k');
        break;
      case 'medium':
        command = command.audioCodec('mp3').audioBitrate('128k');
        break;
      case 'high':
        command = command.audioCodec('mp3').audioBitrate('320k');
        break;
      default:
        command = command.audioCodec('mp3').audioBitrate('128k');
    }
    
    command
      .output(outputPath)
      .on('end', () => resolve(true))
      .on('error', (err) => reject(new Error(`Audio compression failed: ${err.message}`)))
      .run();
  });
};

// Audio conversion using FFmpeg
const convertAudio = async (inputPath, outputPath, format) => {
  return new Promise((resolve, reject) => {
    let command = ffmpeg(inputPath);
    
    switch (format.toLowerCase()) {
      case 'mp3':
        command = command.audioCodec('mp3');
        break;
      case 'wav':
        command = command.audioCodec('pcm_s16le');
        break;
      case 'flac':
        command = command.audioCodec('flac');
        break;
      case 'aac':
        command = command.audioCodec('aac');
        break;
      case 'ogg':
        command = command.audioCodec('libvorbis');
        break;
      case 'm4a':
        command = command.audioCodec('aac');
        break;
      default:
        reject(new Error('Unsupported audio format'));
        return;
    }
    
    command
      .output(outputPath)
      .on('end', () => resolve(true))
      .on('error', (err) => reject(new Error(`Audio conversion failed: ${err.message}`)))
      .run();
  });
};

// PDF compression using PDF-lib
const compressPDF = async (inputPath, outputPath) => {
  try {
    const pdfBytes = await fs.readFile(inputPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // PDF-lib doesn't have built-in compression, so we'll use a different approach
    // For now, we'll just copy the file and let the client handle compression
    await fs.copy(inputPath, outputPath);
    
    return true;
  } catch (error) {
    throw new Error(`PDF compression failed: ${error.message}`);
  }
};

// PDF conversion (to images) using PDF-lib
const convertPDF = async (inputPath, outputPath, format) => {
  try {
    // For PDF conversion, we'll use a different approach
    // This is a placeholder - in a real implementation, you might use pdf2pic or similar
    throw new Error('PDF conversion not implemented yet');
  } catch (error) {
    throw new Error(`PDF conversion failed: ${error.message}`);
  }
};

// Get file size in bytes
const getFileSize = (filePath) => {
  const stats = fs.statSync(filePath);
  return stats.size;
};

// Calculate saved percentage
const calculateSavedPercent = (originalSize, processedSize) => {
  return Math.round(((originalSize - processedSize) / originalSize) * 100);
};

// Generate output filename
const generateOutputFilename = (originalName, operation, format = null) => {
  const nameWithoutExt = path.parse(originalName).name;
  const timestamp = Date.now();
  
  if (operation === 'convert' && format) {
    return `${nameWithoutExt}-converted-${timestamp}.${format}`;
  } else {
    return `${nameWithoutExt}-compressed-${timestamp}.${path.extname(originalName).slice(1)}`;
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
  convertPDF,
  getFileSize,
  calculateSavedPercent,
  generateOutputFilename
}; 