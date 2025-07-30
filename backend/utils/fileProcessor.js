const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configure FFmpeg path if provided
if (process.env.FFMPEG_PATH) {
  ffmpeg.setFfmpegPath(process.env.FFMPEG_PATH);
}

// Image compression using Sharp
const compressImage = async (inputPath, outputPath, options = {}) => {
  const {
    quality = 80,
    format = 'jpeg',
    width,
    height,
    fit = 'inside'
  } = options;

  try {
    let sharpInstance = sharp(inputPath);

    // Resize if dimensions provided
    if (width || height) {
      sharpInstance = sharpInstance.resize(width, height, { fit });
    }

    // Apply compression based on format
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
      default:
        sharpInstance = sharpInstance.jpeg({ quality });
    }

    await sharpInstance.toFile(outputPath);
    
    return {
      success: true,
      outputPath
    };
  } catch (error) {
    throw new Error(`Image compression failed: ${error.message}`);
  }
};

// Video compression using FFmpeg
const compressVideo = async (inputPath, outputPath, options = {}) => {
  const {
    crf = 28,
    preset = 'medium',
    audioBitrate = '128k',
    videoBitrate = '1000k',
    resolution = '1280x720'
  } = options;

  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .videoCodec('libx264')
      .audioCodec('aac')
      .outputOptions([
        `-crf ${crf}`,
        `-preset ${preset}`,
        `-b:a ${audioBitrate}`,
        `-b:v ${videoBitrate}`,
        `-vf scale=${resolution}:force_original_aspect_ratio=decrease`,
        '-movflags +faststart'
      ])
      .output(outputPath)
      .on('end', () => {
        resolve({
          success: true,
          outputPath
        });
      })
      .on('error', (err) => {
        reject(new Error(`Video compression failed: ${err.message}`));
      })
      .run();
  });
};

// Audio compression using FFmpeg
const compressAudio = async (inputPath, outputPath, options = {}) => {
  const {
    bitrate = '128k',
    sampleRate = '44100',
    channels = 2
  } = options;

  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .audioCodec('libmp3lame')
      .audioBitrate(bitrate)
      .audioFrequency(sampleRate)
      .audioChannels(channels)
      .output(outputPath)
      .on('end', () => {
        resolve({
          success: true,
          outputPath
        });
      })
      .on('error', (err) => {
        reject(new Error(`Audio compression failed: ${err.message}`));
      })
      .run();
  });
};

// PDF compression using PDF-lib
const compressPDF = async (inputPath, outputPath, options = {}) => {
  const {
    quality = 'medium' // low, medium, high
  } = options;

  try {
    const pdfBytes = await fs.readFile(inputPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // Set compression options based on quality
    const compressionOptions = {
      low: { compress: true, objectStreams: true },
      medium: { compress: true, objectStreams: true, linearize: true },
      high: { compress: true, objectStreams: true, linearize: true, preserveGraphicsState: false }
    };

    const pdfBytesCompressed = await pdfDoc.save(compressionOptions[quality] || compressionOptions.medium);
    await fs.writeFile(outputPath, pdfBytesCompressed);

    return {
      success: true,
      outputPath
    };
  } catch (error) {
    throw new Error(`PDF compression failed: ${error.message}`);
  }
};

// Image conversion
const convertImage = async (inputPath, outputPath, targetFormat, options = {}) => {
  const {
    quality = 80,
    width,
    height,
    fit = 'inside'
  } = options;

  try {
    let sharpInstance = sharp(inputPath);

    // Resize if dimensions provided
    if (width || height) {
      sharpInstance = sharpInstance.resize(width, height, { fit });
    }

    // Convert to target format
    switch (targetFormat.toLowerCase()) {
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
      default:
        throw new Error(`Unsupported format: ${targetFormat}`);
    }

    await sharpInstance.toFile(outputPath);
    
    return {
      success: true,
      outputPath
    };
  } catch (error) {
    throw new Error(`Image conversion failed: ${error.message}`);
  }
};

// Audio conversion
const convertAudio = async (inputPath, outputPath, targetFormat, options = {}) => {
  const {
    bitrate = '128k',
    sampleRate = '44100',
    channels = 2
  } = options;

  return new Promise((resolve, reject) => {
    let command = ffmpeg(inputPath);

    // Set codec based on target format
    switch (targetFormat.toLowerCase()) {
      case 'mp3':
        command = command.audioCodec('libmp3lame');
        break;
      case 'wav':
        command = command.audioCodec('pcm_s16le');
        break;
      case 'aac':
        command = command.audioCodec('aac');
        break;
      case 'ogg':
        command = command.audioCodec('libvorbis');
        break;
      default:
        reject(new Error(`Unsupported audio format: ${targetFormat}`));
        return;
    }

    command
      .audioBitrate(bitrate)
      .audioFrequency(sampleRate)
      .audioChannels(channels)
      .output(outputPath)
      .on('end', () => {
        resolve({
          success: true,
          outputPath
        });
      })
      .on('error', (err) => {
        reject(new Error(`Audio conversion failed: ${err.message}`));
      })
      .run();
  });
};

// Video conversion
const convertVideo = async (inputPath, outputPath, targetFormat, options = {}) => {
  const {
    crf = 23,
    preset = 'medium',
    audioBitrate = '128k',
    videoBitrate = '1000k'
  } = options;

  return new Promise((resolve, reject) => {
    let command = ffmpeg(inputPath);

    // Set codec based on target format
    switch (targetFormat.toLowerCase()) {
      case 'mp4':
        command = command.videoCodec('libx264').audioCodec('aac');
        break;
      case 'webm':
        command = command.videoCodec('libvpx-vp9').audioCodec('libvorbis');
        break;
      case 'avi':
        command = command.videoCodec('libx264').audioCodec('mp3');
        break;
      case 'mov':
        command = command.videoCodec('libx264').audioCodec('aac');
        break;
      default:
        reject(new Error(`Unsupported video format: ${targetFormat}`));
        return;
    }

    command
      .outputOptions([
        `-crf ${crf}`,
        `-preset ${preset}`,
        `-b:a ${audioBitrate}`,
        `-b:v ${videoBitrate}`,
        '-movflags +faststart'
      ])
      .output(outputPath)
      .on('end', () => {
        resolve({
          success: true,
          outputPath
        });
      })
      .on('error', (err) => {
        reject(new Error(`Video conversion failed: ${err.message}`));
      })
      .run();
  });
};

// Generate unique output filename
const generateOutputFilename = (originalName, operation, format) => {
  const nameWithoutExt = path.parse(originalName).name;
  const timestamp = Date.now();
  const uniqueId = uuidv4().substring(0, 8);
  
  return `${nameWithoutExt}-${operation}-${timestamp}-${uniqueId}.${format}`;
};

// Get file size in bytes
const getFileSize = async (filePath) => {
  const stats = await fs.stat(filePath);
  return stats.size;
};

// Calculate compression percentage
const calculateCompressionPercent = (originalSize, compressedSize) => {
  if (originalSize === 0) return 0;
  return Math.round(((originalSize - compressedSize) / originalSize) * 100);
};

module.exports = {
  compressImage,
  compressVideo,
  compressAudio,
  compressPDF,
  convertImage,
  convertAudio,
  convertVideo,
  generateOutputFilename,
  getFileSize,
  calculateCompressionPercent
}; 