const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs-extra');
const path = require('path');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
fs.ensureDirSync(uploadsDir);

// Image compression and conversion
const processImage = async (file, operation, targetFormat = null) => {
  try {
    const originalSize = file.size;
    const originalFormat = path.extname(file.originalname).toLowerCase().slice(1);
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    
    let outputPath;
    let outputFormat = originalFormat;
    
    if (operation === 'convert' && targetFormat) {
      outputFormat = targetFormat;
      outputPath = path.join(uploadsDir, `${fileName}.${outputFormat}`);
    } else {
      outputPath = path.join(uploadsDir, `${fileName}.${outputFormat}`);
    }
    
    let sharpInstance = sharp(file.buffer);
    
    // Apply compression for both compress and convert operations
    if (operation === 'compress') {
      sharpInstance = sharpInstance.jpeg({ quality: 80, progressive: true });
    } else if (operation === 'convert') {
      switch (outputFormat) {
        case 'jpeg':
        case 'jpg':
          sharpInstance = sharpInstance.jpeg({ quality: 85, progressive: true });
          break;
        case 'png':
          sharpInstance = sharpInstance.png({ compressionLevel: 8 });
          break;
        case 'webp':
          sharpInstance = sharpInstance.webp({ quality: 85 });
          break;
        case 'avif':
          sharpInstance = sharpInstance.avif({ quality: 85 });
          break;
        default:
          sharpInstance = sharpInstance.jpeg({ quality: 85 });
      }
    }
    
    await sharpInstance.toFile(outputPath);
    
    const stats = await fs.stat(outputPath);
    const compressedSize = stats.size;
    
    return {
      fileName: path.basename(outputPath),
      originalSize,
      compressedSize,
      originalFormat,
      convertedFormat: outputFormat,
      filePath: outputPath
    };
  } catch (error) {
    throw new Error(`Image processing failed: ${error.message}`);
  }
};

// Video compression and conversion
const processVideo = async (file, operation, targetFormat = null) => {
  return new Promise((resolve, reject) => {
    try {
      const originalSize = file.size;
      const originalFormat = path.extname(file.originalname).toLowerCase().slice(1);
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
      
      let outputFormat = originalFormat;
      if (operation === 'convert' && targetFormat) {
        outputFormat = targetFormat;
      }
      
      const outputPath = path.join(uploadsDir, `${fileName}.${outputFormat}`);
      
      let ffmpegCommand = ffmpeg(file.buffer);
      
      if (operation === 'compress') {
        // Compress video with reduced bitrate
        ffmpegCommand = ffmpegCommand
          .videoCodec('libx264')
          .audioCodec('aac')
          .videoBitrate('1000k')
          .audioBitrate('128k')
          .outputOptions(['-preset', 'medium']);
      } else if (operation === 'convert') {
        // Convert to target format
        switch (outputFormat) {
          case 'mp4':
            ffmpegCommand = ffmpegCommand
              .videoCodec('libx264')
              .audioCodec('aac')
              .outputOptions(['-preset', 'medium']);
            break;
          case 'avi':
            ffmpegCommand = ffmpegCommand
              .videoCodec('libx264')
              .audioCodec('mp3');
            break;
          case 'mov':
            ffmpegCommand = ffmpegCommand
              .videoCodec('libx264')
              .audioCodec('aac');
            break;
          case 'webm':
            ffmpegCommand = ffmpegCommand
              .videoCodec('libvpx-vp9')
              .audioCodec('libopus');
            break;
          default:
            ffmpegCommand = ffmpegCommand
              .videoCodec('libx264')
              .audioCodec('aac');
        }
      }
      
      ffmpegCommand
        .output(outputPath)
        .on('end', async () => {
          try {
            const stats = await fs.stat(outputPath);
            const compressedSize = stats.size;
            
            resolve({
              fileName: path.basename(outputPath),
              originalSize,
              compressedSize,
              originalFormat,
              convertedFormat: outputFormat,
              filePath: outputPath
            });
          } catch (error) {
            reject(new Error(`Failed to get file stats: ${error.message}`));
          }
        })
        .on('error', (error) => {
          reject(new Error(`Video processing failed: ${error.message}`));
        })
        .run();
    } catch (error) {
      reject(new Error(`Video processing setup failed: ${error.message}`));
    }
  });
};

// Audio compression and conversion
const processAudio = async (file, operation, targetFormat = null) => {
  return new Promise((resolve, reject) => {
    try {
      const originalSize = file.size;
      const originalFormat = path.extname(file.originalname).toLowerCase().slice(1);
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
      
      let outputFormat = originalFormat;
      if (operation === 'convert' && targetFormat) {
        outputFormat = targetFormat;
      }
      
      const outputPath = path.join(uploadsDir, `${fileName}.${outputFormat}`);
      
      let ffmpegCommand = ffmpeg(file.buffer);
      
      if (operation === 'compress') {
        // Compress audio with reduced bitrate
        ffmpegCommand = ffmpegCommand
          .audioCodec('aac')
          .audioBitrate('128k');
      } else if (operation === 'convert') {
        // Convert to target format
        switch (outputFormat) {
          case 'mp3':
            ffmpegCommand = ffmpegCommand.audioCodec('mp3');
            break;
          case 'aac':
            ffmpegCommand = ffmpegCommand.audioCodec('aac');
            break;
          case 'ogg':
            ffmpegCommand = ffmpegCommand.audioCodec('libvorbis');
            break;
          case 'wav':
            ffmpegCommand = ffmpegCommand.audioCodec('pcm_s16le');
            break;
          case 'flac':
            ffmpegCommand = ffmpegCommand.audioCodec('flac');
            break;
          default:
            ffmpegCommand = ffmpegCommand.audioCodec('aac');
        }
      }
      
      ffmpegCommand
        .output(outputPath)
        .on('end', async () => {
          try {
            const stats = await fs.stat(outputPath);
            const compressedSize = stats.size;
            
            resolve({
              fileName: path.basename(outputPath),
              originalSize,
              compressedSize,
              originalFormat,
              convertedFormat: outputFormat,
              filePath: outputPath
            });
          } catch (error) {
            reject(new Error(`Failed to get file stats: ${error.message}`));
          }
        })
        .on('error', (error) => {
          reject(new Error(`Audio processing failed: ${error.message}`));
        })
        .run();
    } catch (error) {
      reject(new Error(`Audio processing setup failed: ${error.message}`));
    }
  });
};

// PDF compression
const processPDF = async (file, operation) => {
  try {
    const originalSize = file.size;
    const originalFormat = 'pdf';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.pdf`;
    const outputPath = path.join(uploadsDir, fileName);
    
    // For PDF compression, we'll use a simple approach
    // In a production environment, you might want to use more sophisticated PDF compression
    const pdfDoc = await PDFDocument.load(file.buffer);
    
    // Remove unnecessary metadata and compress
    const compressedPdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false
    });
    
    await fs.writeFile(outputPath, compressedPdfBytes);
    
    const stats = await fs.stat(outputPath);
    const compressedSize = stats.size;
    
    return {
      fileName,
      originalSize,
      compressedSize,
      originalFormat,
      convertedFormat: 'pdf',
      filePath: outputPath
    };
  } catch (error) {
    throw new Error(`PDF processing failed: ${error.message}`);
  }
};

module.exports = {
  processImage,
  processVideo,
  processAudio,
  processPDF,
  uploadsDir
}; 