const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const FileLog = require('../models/FileLog');

// Helper function to get file type
const getFileType = (mimetype) => {
  if (mimetype.startsWith('image/')) return 'image';
  if (mimetype.startsWith('video/')) return 'video';
  if (mimetype.startsWith('audio/')) return 'audio';
  if (mimetype === 'application/pdf') return 'pdf';
  return null;
};

// Helper function to calculate saved percentage
const calculateSavedPercent = (originalSize, processedSize) => {
  return Math.round(((originalSize - processedSize) / originalSize) * 100);
};

// Image conversion
const convertImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { file } = req;
    const { format = 'jpeg' } = req.body;
    const fileType = getFileType(file.mimetype);
    
    if (fileType !== 'image') {
      return res.status(400).json({ error: 'Invalid file type. Only images are allowed.' });
    }

    const originalSize = file.size;
    const outputPath = path.join('uploads', `converted-${file.filename.replace(/\.[^/.]+$/, '')}.${format}`);
    const fullOutputPath = path.join(__dirname, '..', outputPath);

    // Convert image using Sharp
    let sharpInstance = sharp(file.path);
    
    switch (format.toLowerCase()) {
      case 'jpeg':
      case 'jpg':
        sharpInstance = sharpInstance.jpeg({ quality: 80 });
        break;
      case 'png':
        sharpInstance = sharpInstance.png({ compressionLevel: 6 });
        break;
      case 'webp':
        sharpInstance = sharpInstance.webp({ quality: 80 });
        break;
      case 'gif':
        sharpInstance = sharpInstance.gif();
        break;
      default:
        return res.status(400).json({ error: 'Unsupported format. Supported formats: jpeg, png, webp, gif' });
    }

    await sharpInstance.toFile(fullOutputPath);

    const processedSize = fs.statSync(fullOutputPath).size;
    const savedPercent = calculateSavedPercent(originalSize, processedSize);

    // Save to database
    const fileLog = new FileLog({
      fileName: path.basename(outputPath),
      originalName: file.originalname,
      fileType: 'image',
      originalSize,
      processedSize,
      savedPercent,
      filePath: outputPath
    });

    await fileLog.save();

    // Clean up original file
    fs.unlinkSync(file.path);

    res.json({
      success: true,
      data: {
        fileName: fileLog.fileName,
        originalSize,
        processedSize,
        savedPercent,
        downloadUrl: `/uploads/${fileLog.fileName}`,
        expiresAt: fileLog.expiresAt
      }
    });

  } catch (error) {
    console.error('Image conversion error:', error);
    res.status(500).json({ error: 'Error converting image' });
  }
};

// Video conversion
const convertVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { file } = req;
    const { format = 'mp4' } = req.body;
    const fileType = getFileType(file.mimetype);
    
    if (fileType !== 'video') {
      return res.status(400).json({ error: 'Invalid file type. Only videos are allowed.' });
    }

    const originalSize = file.size;
    const outputPath = path.join('uploads', `converted-${file.filename.replace(/\.[^/.]+$/, '')}.${format}`);
    const fullOutputPath = path.join(__dirname, '..', outputPath);

    // Convert video using FFmpeg
    await new Promise((resolve, reject) => {
      let ffmpegCommand = ffmpeg(file.path);

      switch (format.toLowerCase()) {
        case 'mp4':
          ffmpegCommand = ffmpegCommand
            .videoCodec('libx264')
            .audioCodec('aac')
            .outputOptions(['-crf 23']);
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
            .videoCodec('libvpx')
            .audioCodec('libvorbis');
          break;
        default:
          return res.status(400).json({ error: 'Unsupported format. Supported formats: mp4, avi, mov, webm' });
      }

      ffmpegCommand
        .output(fullOutputPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    const processedSize = fs.statSync(fullOutputPath).size;
    const savedPercent = calculateSavedPercent(originalSize, processedSize);

    // Save to database
    const fileLog = new FileLog({
      fileName: path.basename(outputPath),
      originalName: file.originalname,
      fileType: 'video',
      originalSize,
      processedSize,
      savedPercent,
      filePath: outputPath
    });

    await fileLog.save();

    // Clean up original file
    fs.unlinkSync(file.path);

    res.json({
      success: true,
      data: {
        fileName: fileLog.fileName,
        originalSize,
        processedSize,
        savedPercent,
        downloadUrl: `/uploads/${fileLog.fileName}`,
        expiresAt: fileLog.expiresAt
      }
    });

  } catch (error) {
    console.error('Video conversion error:', error);
    res.status(500).json({ error: 'Error converting video' });
  }
};

// Audio conversion
const convertAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { file } = req;
    const { format = 'mp3' } = req.body;
    const fileType = getFileType(file.mimetype);
    
    if (fileType !== 'audio') {
      return res.status(400).json({ error: 'Invalid file type. Only audio files are allowed.' });
    }

    const originalSize = file.size;
    const outputPath = path.join('uploads', `converted-${file.filename.replace(/\.[^/.]+$/, '')}.${format}`);
    const fullOutputPath = path.join(__dirname, '..', outputPath);

    // Convert audio using FFmpeg
    await new Promise((resolve, reject) => {
      let ffmpegCommand = ffmpeg(file.path);

      switch (format.toLowerCase()) {
        case 'mp3':
          ffmpegCommand = ffmpegCommand.audioCodec('mp3').audioBitrate(192);
          break;
        case 'wav':
          ffmpegCommand = ffmpegCommand.audioCodec('pcm_s16le');
          break;
        case 'ogg':
          ffmpegCommand = ffmpegCommand.audioCodec('libvorbis').audioBitrate(128);
          break;
        case 'm4a':
          ffmpegCommand = ffmpegCommand.audioCodec('aac').audioBitrate(128);
          break;
        default:
          return res.status(400).json({ error: 'Unsupported format. Supported formats: mp3, wav, ogg, m4a' });
      }

      ffmpegCommand
        .output(fullOutputPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    const processedSize = fs.statSync(fullOutputPath).size;
    const savedPercent = calculateSavedPercent(originalSize, processedSize);

    // Save to database
    const fileLog = new FileLog({
      fileName: path.basename(outputPath),
      originalName: file.originalname,
      fileType: 'audio',
      originalSize,
      processedSize,
      savedPercent,
      filePath: outputPath
    });

    await fileLog.save();

    // Clean up original file
    fs.unlinkSync(file.path);

    res.json({
      success: true,
      data: {
        fileName: fileLog.fileName,
        originalSize,
        processedSize,
        savedPercent,
        downloadUrl: `/uploads/${fileLog.fileName}`,
        expiresAt: fileLog.expiresAt
      }
    });

  } catch (error) {
    console.error('Audio conversion error:', error);
    res.status(500).json({ error: 'Error converting audio' });
  }
};

// PDF conversion (to images)
const convertPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { file } = req;
    const { format = 'jpeg' } = req.body;
    const fileType = getFileType(file.mimetype);
    
    if (fileType !== 'pdf') {
      return res.status(400).json({ error: 'Invalid file type. Only PDF files are allowed.' });
    }

    const originalSize = file.size;
    const outputPath = path.join('uploads', `converted-${file.filename.replace(/\.[^/.]+$/, '')}.${format}`);
    const fullOutputPath = path.join(__dirname, '..', outputPath);

    // Convert PDF to image using Sharp
    const pdfBuffer = fs.readFileSync(file.path);
    
    let sharpInstance = sharp(pdfBuffer, { page: 0 }); // Convert first page
    
    switch (format.toLowerCase()) {
      case 'jpeg':
      case 'jpg':
        sharpInstance = sharpInstance.jpeg({ quality: 80 });
        break;
      case 'png':
        sharpInstance = sharpInstance.png({ compressionLevel: 6 });
        break;
      case 'webp':
        sharpInstance = sharpInstance.webp({ quality: 80 });
        break;
      default:
        return res.status(400).json({ error: 'Unsupported format. Supported formats: jpeg, png, webp' });
    }

    await sharpInstance.toFile(fullOutputPath);

    const processedSize = fs.statSync(fullOutputPath).size;
    const savedPercent = calculateSavedPercent(originalSize, processedSize);

    // Save to database
    const fileLog = new FileLog({
      fileName: path.basename(outputPath),
      originalName: file.originalname,
      fileType: 'pdf',
      originalSize,
      processedSize,
      savedPercent,
      filePath: outputPath
    });

    await fileLog.save();

    // Clean up original file
    fs.unlinkSync(file.path);

    res.json({
      success: true,
      data: {
        fileName: fileLog.fileName,
        originalSize,
        processedSize,
        savedPercent,
        downloadUrl: `/uploads/${fileLog.fileName}`,
        expiresAt: fileLog.expiresAt
      }
    });

  } catch (error) {
    console.error('PDF conversion error:', error);
    res.status(500).json({ error: 'Error converting PDF' });
  }
};

module.exports = {
  convertImage,
  convertVideo,
  convertAudio,
  convertPdf
}; 