const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

class SharpHelper {
  static async compressImage(inputPath, outputPath, originalSize) {
    try {
      const image = sharp(inputPath);
      const metadata = await image.metadata();
      
      // Determine quality based on file size
      let quality = 80;
      if (originalSize > 5 * 1024 * 1024) { // > 5MB
        quality = 70;
      } else if (originalSize > 2 * 1024 * 1024) { // > 2MB
        quality = 75;
      }
      
      // Compress based on file type
      const ext = path.extname(inputPath).toLowerCase();
      let compressedBuffer;
      
      switch (ext) {
        case '.jpg':
        case '.jpeg':
          compressedBuffer = await image
            .jpeg({ quality, progressive: true })
            .toBuffer();
          break;
        case '.png':
          compressedBuffer = await image
            .png({ quality, compressionLevel: 9 })
            .toBuffer();
          break;
        case '.webp':
          compressedBuffer = await image
            .webp({ quality })
            .toBuffer();
          break;
        case '.gif':
          compressedBuffer = await image
            .gif()
            .toBuffer();
          break;
        default:
          // For other formats, try to convert to WebP
          compressedBuffer = await image
            .webp({ quality })
            .toBuffer();
      }
      
      // Write compressed file
      await fs.writeFile(outputPath, compressedBuffer);
      
      const compressedSize = compressedBuffer.length;
      const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;
      
      // Only return compressed file if compression is at least 40% or size is reduced
      if (compressionRatio >= 40 || compressedSize < originalSize) {
        return {
          success: true,
          compressedSize,
          compressionRatio,
          outputPath
        };
      } else {
        // If compression doesn't meet requirements, return original
        await fs.copyFile(inputPath, outputPath);
        return {
          success: true,
          compressedSize: originalSize,
          compressionRatio: 0,
          outputPath
        };
      }
      
    } catch (error) {
      throw new Error(`Image compression failed: ${error.message}`);
    }
  }
  
  static async getImageInfo(filePath) {
    try {
      const metadata = await sharp(filePath).metadata();
      return {
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        size: metadata.size
      };
    } catch (error) {
      throw new Error(`Failed to get image info: ${error.message}`);
    }
  }
}

module.exports = SharpHelper;