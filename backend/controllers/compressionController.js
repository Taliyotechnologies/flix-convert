const SharpHelper = require('../utils/sharpHelper');
const FFmpegHelper = require('../utils/ffmpegHelper');
const PDFHelper = require('../utils/pdfHelper');
const FileLog = require('../models/FileLog');
const fs = require('fs').promises;
const path = require('path');

class CompressionController {
  static async compressFile(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }

      const { originalname, filename, size: originalSize, path: inputPath, fileType } = req.file;
      
      // Generate output filename
      const ext = path.extname(originalname);
      const outputFilename = `compressed-${filename}`;
      const outputPath = path.join('./uploads', outputFilename);
      
      let compressionResult;
      
      // Compress based on file type
      switch (fileType) {
        case 'image':
          compressionResult = await SharpHelper.compressImage(inputPath, outputPath, originalSize);
          break;
        case 'video':
          compressionResult = await FFmpegHelper.compressVideo(inputPath, outputPath, originalSize);
          break;
        case 'audio':
          compressionResult = await FFmpegHelper.compressAudio(inputPath, outputPath, originalSize);
          break;
        case 'pdf':
          compressionResult = await PDFHelper.compressPDF(inputPath, outputPath, originalSize);
          break;
        default:
          return res.status(400).json({
            success: false,
            message: 'Unsupported file type'
          });
      }
      
      if (!compressionResult.success) {
        return res.status(500).json({
          success: false,
          message: 'Compression failed'
        });
      }
      
      // Save file log to database
      const fileLog = new FileLog({
        originalName: originalname,
        fileName: outputFilename,
        fileType: fileType,
        originalSize: originalSize,
        compressedSize: compressionResult.compressedSize,
        compressionRatio: compressionResult.compressionRatio,
        status: 'completed'
      });
      
      await fileLog.save();
      
      // Clean up original file
      await fs.unlink(inputPath).catch(err => {
        console.log('Warning: Could not delete original file');
      });
      
      res.json({
        success: true,
        message: 'File compressed successfully',
        data: {
          originalName: originalname,
          fileName: outputFilename,
          originalSize: originalSize,
          compressedSize: compressionResult.compressedSize,
          compressionRatio: compressionResult.compressionRatio,
          fileType: fileType,
          downloadUrl: `/api/download/${fileLog._id}`
        }
      });
      
    } catch (error) {
      console.error('Compression error:', error);
      res.status(500).json({
        success: false,
        message: 'Compression failed',
        error: error.message
      });
    }
  }
  
  static async downloadFile(req, res) {
    try {
      const { fileId } = req.params;
      
      const fileLog = await FileLog.findById(fileId);
      if (!fileLog) {
        return res.status(404).json({
          success: false,
          message: 'File not found'
        });
      }
      
      const filePath = path.join('./uploads', fileLog.fileName);
      
      // Check if file exists
      try {
        await fs.access(filePath);
      } catch (error) {
        return res.status(404).json({
          success: false,
          message: 'File not found on server'
        });
      }
      
      // Update download count
      fileLog.downloadCount += 1;
      await fileLog.save();
      
      // Send file
      res.download(filePath, fileLog.originalName);
      
    } catch (error) {
      console.error('Download error:', error);
      res.status(500).json({
        success: false,
        message: 'Download failed',
        error: error.message
      });
    }
  }
  
  static async deleteFile(req, res) {
    try {
      const { fileId } = req.params;
      
      const fileLog = await FileLog.findById(fileId);
      if (!fileLog) {
        return res.status(404).json({
          success: false,
          message: 'File not found'
        });
      }
      
      // Delete physical file
      const filePath = path.join('./uploads', fileLog.fileName);
      await fs.unlink(filePath).catch(err => {
        console.log('Warning: Could not delete physical file');
      });
      
      // Delete from database
      await FileLog.findByIdAndDelete(fileId);
      
      res.json({
        success: true,
        message: 'File deleted successfully'
      });
      
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({
        success: false,
        message: 'Delete failed',
        error: error.message
      });
    }
  }
  
  static async getFileInfo(req, res) {
    try {
      const { fileId } = req.params;
      
      const fileLog = await FileLog.findById(fileId);
      if (!fileLog) {
        return res.status(404).json({
          success: false,
          message: 'File not found'
        });
      }
      
      res.json({
        success: true,
        data: fileLog
      });
      
    } catch (error) {
      console.error('Get file info error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get file info',
        error: error.message
      });
    }
  }
}

module.exports = CompressionController;