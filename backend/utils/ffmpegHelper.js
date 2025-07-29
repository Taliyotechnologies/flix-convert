const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs').promises;

class FFmpegHelper {
  static async compressVideo(inputPath, outputPath, originalSize) {
    return new Promise((resolve, reject) => {
      const command = ffmpeg(inputPath);
      
      // Determine quality based on file size
      let crf = 23; // Default quality
      if (originalSize > 5 * 1024 * 1024) { // > 5MB
        crf = 28;
      } else if (originalSize > 2 * 1024 * 1024) { // > 2MB
        crf = 25;
      }
      
      command
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputOptions([
          `-crf ${crf}`,
          '-preset medium',
          '-movflags +faststart',
          '-y' // Overwrite output file
        ])
        .output(outputPath)
        .on('end', async () => {
          try {
            const stats = await fs.stat(outputPath);
            const compressedSize = stats.size;
            const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;
            
            // Only return compressed file if compression is at least 40% or size is reduced
            if (compressionRatio >= 40 || compressedSize < originalSize) {
              resolve({
                success: true,
                compressedSize,
                compressionRatio,
                outputPath
              });
            } else {
              // If compression doesn't meet requirements, return original
              await fs.copyFile(inputPath, outputPath);
              resolve({
                success: true,
                compressedSize: originalSize,
                compressionRatio: 0,
                outputPath
              });
            }
          } catch (error) {
            reject(new Error(`Failed to get compressed file stats: ${error.message}`));
          }
        })
        .on('error', (err) => {
          reject(new Error(`Video compression failed: ${err.message}`));
        })
        .run();
    });
  }
  
  static async compressAudio(inputPath, outputPath, originalSize) {
    return new Promise((resolve, reject) => {
      const command = ffmpeg(inputPath);
      
      // Determine quality based on file size
      let bitrate = '128k'; // Default bitrate
      if (originalSize > 5 * 1024 * 1024) { // > 5MB
        bitrate = '96k';
      } else if (originalSize > 2 * 1024 * 1024) { // > 2MB
        bitrate = '112k';
      }
      
      command
        .audioCodec('aac')
        .audioBitrate(bitrate)
        .outputOptions([
          '-y' // Overwrite output file
        ])
        .output(outputPath)
        .on('end', async () => {
          try {
            const stats = await fs.stat(outputPath);
            const compressedSize = stats.size;
            const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;
            
            // Only return compressed file if compression is at least 40% or size is reduced
            if (compressionRatio >= 40 || compressedSize < originalSize) {
              resolve({
                success: true,
                compressedSize,
                compressionRatio,
                outputPath
              });
            } else {
              // If compression doesn't meet requirements, return original
              await fs.copyFile(inputPath, outputPath);
              resolve({
                success: true,
                compressedSize: originalSize,
                compressionRatio: 0,
                outputPath
              });
            }
          } catch (error) {
            reject(new Error(`Failed to get compressed file stats: ${error.message}`));
          }
        })
        .on('error', (err) => {
          reject(new Error(`Audio compression failed: ${err.message}`));
        })
        .run();
    });
  }
  
  static async getMediaInfo(filePath) {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) {
          reject(new Error(`Failed to get media info: ${err.message}`));
        } else {
          const videoStream = metadata.streams.find(s => s.codec_type === 'video');
          const audioStream = metadata.streams.find(s => s.codec_type === 'audio');
          
          resolve({
            duration: metadata.format.duration,
            size: metadata.format.size,
            bitrate: metadata.format.bit_rate,
            video: videoStream ? {
              codec: videoStream.codec_name,
              width: videoStream.width,
              height: videoStream.height,
              fps: videoStream.r_frame_rate
            } : null,
            audio: audioStream ? {
              codec: audioStream.codec_name,
              channels: audioStream.channels,
              sampleRate: audioStream.sample_rate
            } : null
          });
        }
      });
    });
  }
}

module.exports = FFmpegHelper;