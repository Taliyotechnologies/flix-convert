const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const File = require('../models/File');
const History = require('../models/History');
const { spawn } = require('child_process');

const router = express.Router();

// Multer: 10MB limit, memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Helper: get extension from mimetype
function getExt(mimetype) {
  if (mimetype === 'image/jpeg') return 'jpg';
  if (mimetype === 'image/png') return 'png';
  if (mimetype === 'image/webp') return 'webp';
  return 'jpg';
}

// JWT middleware (optional)
async function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch (err) {
      req.user = null;
    }
  } else {
    req.user = null;
  }
  next();
}

// POST /api/compress/image
router.post('/image', optionalAuth, upload.single('image'), async (req, res) => {
  const startTime = Date.now();
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }
    // File size restriction logic
    if (req.file.size > 10 * 1024 * 1024 && !req.user) {
      return res.status(401).json({ error: 'Login required for files larger than 10MB.' });
    }
    const ext = getExt(req.file.mimetype);
    const originalName = req.file.originalname;
    const baseName = path.parse(originalName).name;
    const outName = `compressed-${Date.now()}-${baseName}.${ext}`;
    const outPath = path.join(__dirname, '../uploads', outName);
    let sharpStream = sharp(req.file.buffer);
    let compressedBuffer;
    if (ext === 'jpg' || ext === 'jpeg') {
      compressedBuffer = await sharpStream.jpeg({ quality: 35 }).toBuffer();
    } else if (ext === 'png') {
      compressedBuffer = await sharpStream.png({ compressionLevel: 9 }).toBuffer();
    } else if (ext === 'webp') {
      compressedBuffer = await sharpStream.webp({ quality: 35 }).toBuffer();
    } else {
      compressedBuffer = await sharpStream.jpeg({ quality: 35 }).toBuffer();
    }
    await fs.promises.writeFile(outPath, compressedBuffer);
    const compressedSize = compressedBuffer.length;
    const originalSize = req.file.size;
    const ratio = ((originalSize - compressedSize) / originalSize) * 100;
    const downloadUrl = `/api/compress/download/${outName}`;
    // DB Logging (File + History)
    let fileDoc = null;
    let historyDoc = null;
    try {
      fileDoc = await File.create({
        originalName,
        compressedName: outName,
        type: req.file.mimetype,
        originalSize,
        compressedSize,
        userId: req.user ? req.user._id : null,
        downloadUrl,
      });
      historyDoc = await History.create({
        userId: req.user ? req.user._id : null,
        actionType: 'compress',
        fileType: 'image',
        originalName,
        originalSize,
        compressedSize,
        ratio: Number(ratio.toFixed(2)),
        downloadUrl,
      });
    } catch (dbErr) {
      // DB error should not block response, but log it
      console.error('DB Logging error:', dbErr);
    }
    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
    res.json({
      success: true,
      data: {
        originalName,
        originalSize,
        compressedSize,
        compressionRatio: ratio.toFixed(2),
        downloadUrl,
        fileId: fileDoc ? fileDoc._id : null,
        historyId: historyDoc ? historyDoc._id : null,
        timeTaken,
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Image compression failed', details: error.message });
  }
});

// POST /api/compress/video
router.post('/video', optionalAuth, upload.single('video'), async (req, res) => {
  const startTime = Date.now();
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }
    // File size restriction logic
    if (req.file.size > 10 * 1024 * 1024 && !req.user) {
      return res.status(401).json({ error: 'Login required for files larger than 10MB.' });
    }
    // Accept only common video formats
    const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-matroska', 'video/x-msvideo'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: 'Unsupported video format.' });
    }
    const originalName = req.file.originalname;
    const baseName = path.parse(originalName).name;
    const outName = `compressed-${Date.now()}-${baseName}.mp4`;
    const outPath = path.join(__dirname, '../uploads', outName);
    // ffmpeg compress (H.264, CRF 24, fast preset)
    await new Promise((resolve, reject) => {
      const ffmpeg = spawn('ffmpeg', [
        '-i', 'pipe:0',
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '24',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-movflags', '+faststart',
        outPath
      ]);
      ffmpeg.stdin.write(req.file.buffer);
      ffmpeg.stdin.end();
      ffmpeg.stderr.on('data', () => {}); // suppress ffmpeg logs
      ffmpeg.on('close', (code) => {
        if (code === 0) resolve();
        else reject(new Error('ffmpeg failed'));
      });
      ffmpeg.on('error', reject);
    });
    // Get compressed file size
    const compressedBuffer = await fs.promises.readFile(outPath);
    const compressedSize = compressedBuffer.length;
    const originalSize = req.file.size;
    const ratio = ((originalSize - compressedSize) / originalSize) * 100;
    const downloadUrl = `/api/compress/download/${outName}`;
    // DB Logging (File + History)
    let fileDoc = null;
    let historyDoc = null;
    try {
      fileDoc = await File.create({
        originalName,
        compressedName: outName,
        type: req.file.mimetype,
        originalSize,
        compressedSize,
        userId: req.user ? req.user._id : null,
        downloadUrl,
      });
      historyDoc = await History.create({
        userId: req.user ? req.user._id : null,
        actionType: 'compress',
        fileType: 'video',
        originalName,
        originalSize,
        compressedSize,
        ratio: Number(ratio.toFixed(2)),
        downloadUrl,
      });
    } catch (dbErr) {
      console.error('DB Logging error:', dbErr);
    }
    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
    res.json({
      success: true,
      data: {
        originalName,
        originalSize,
        compressedSize,
        compressionRatio: ratio.toFixed(2),
        downloadUrl,
        fileId: fileDoc ? fileDoc._id : null,
        historyId: historyDoc ? historyDoc._id : null,
        timeTaken,
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Video compression failed', details: error.message });
  }
});

// POST /api/compress/audio
router.post('/audio', optionalAuth, upload.single('audio'), async (req, res) => {
  const startTime = Date.now();
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file uploaded' });
    }
    // File size restriction logic
    if (req.file.size > 10 * 1024 * 1024 && !req.user) {
      return res.status(401).json({ error: 'Login required for files larger than 10MB.' });
    }
    // Accept only common audio formats
    const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav', 'audio/aac', 'audio/x-aac', 'audio/ogg', 'audio/x-flac'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: 'Unsupported audio format.' });
    }
    const originalName = req.file.originalname;
    const baseName = path.parse(originalName).name;
    const outName = `compressed-${Date.now()}-${baseName}.mp3`;
    const outPath = path.join(__dirname, '../uploads', outName);
    // ffmpeg compress (mp3, 128kbps, high quality)
    await new Promise((resolve, reject) => {
      const ffmpeg = spawn('ffmpeg', [
        '-i', 'pipe:0',
        '-codec:a', 'libmp3lame',
        '-b:a', '128k',
        '-ar', '44100',
        '-ac', '2',
        outPath
      ]);
      ffmpeg.stdin.write(req.file.buffer);
      ffmpeg.stdin.end();
      ffmpeg.stderr.on('data', () => {});
      ffmpeg.on('close', (code) => {
        if (code === 0) resolve();
        else reject(new Error('ffmpeg failed'));
      });
      ffmpeg.on('error', reject);
    });
    // Get compressed file size
    const compressedBuffer = await fs.promises.readFile(outPath);
    const compressedSize = compressedBuffer.length;
    const originalSize = req.file.size;
    const ratio = ((originalSize - compressedSize) / originalSize) * 100;
    const downloadUrl = `/api/compress/download/${outName}`;
    // DB Logging (File + History)
    let fileDoc = null;
    let historyDoc = null;
    try {
      fileDoc = await File.create({
        originalName,
        compressedName: outName,
        type: req.file.mimetype,
        originalSize,
        compressedSize,
        userId: req.user ? req.user._id : null,
        downloadUrl,
      });
      historyDoc = await History.create({
        userId: req.user ? req.user._id : null,
        actionType: 'compress',
        fileType: 'audio',
        originalName,
        originalSize,
        compressedSize,
        ratio: Number(ratio.toFixed(2)),
        downloadUrl,
      });
    } catch (dbErr) {
      console.error('DB Logging error:', dbErr);
    }
    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
    res.json({
      success: true,
      data: {
        originalName,
        originalSize,
        compressedSize,
        compressionRatio: ratio.toFixed(2),
        downloadUrl,
        fileId: fileDoc ? fileDoc._id : null,
        historyId: historyDoc ? historyDoc._id : null,
        timeTaken,
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Audio compression failed', details: error.message });
  }
});

// POST /api/compress/pdf
router.post('/pdf', optionalAuth, upload.single('pdf'), async (req, res) => {
  const startTime = Date.now();
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }
    // File size restriction logic
    if (req.file.size > 10 * 1024 * 1024 && !req.user) {
      return res.status(401).json({ error: 'Login required for files larger than 10MB.' });
    }
    // Accept only PDF
    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({ error: 'Only PDF files are supported.' });
    }
    const originalName = req.file.originalname;
    const baseName = path.parse(originalName).name;
    const outName = `compressed-${Date.now()}-${baseName}.pdf`;
    const inPath = path.join(__dirname, '../uploads', `in-${Date.now()}-${baseName}.pdf`);
    const outPath = path.join(__dirname, '../uploads', outName);
    // Write input PDF to disk (Ghostscript needs file)
    await fs.promises.writeFile(inPath, req.file.buffer);
    // Ghostscript compress (screen quality, fast, best free)
    await new Promise((resolve, reject) => {
      const gs = spawn('gs', [
        '-sDEVICE=pdfwrite',
        '-dCompatibilityLevel=1.4',
        '-dPDFSETTINGS=/screen',
        '-dNOPAUSE',
        '-dQUIET',
        '-dBATCH',
        `-sOutputFile=${outPath}`,
        inPath
      ]);
      gs.on('close', (code) => {
        if (code === 0) resolve();
        else reject(new Error('Ghostscript failed'));
      });
      gs.on('error', reject);
    });
    // Get compressed file size
    const compressedBuffer = await fs.promises.readFile(outPath);
    const compressedSize = compressedBuffer.length;
    const originalSize = req.file.size;
    const ratio = ((originalSize - compressedSize) / originalSize) * 100;
    const downloadUrl = `/api/compress/download/${outName}`;
    // DB Logging (File + History)
    let fileDoc = null;
    let historyDoc = null;
    try {
      fileDoc = await File.create({
        originalName,
        compressedName: outName,
        type: req.file.mimetype,
        originalSize,
        compressedSize,
        userId: req.user ? req.user._id : null,
        downloadUrl,
      });
      historyDoc = await History.create({
        userId: req.user ? req.user._id : null,
        actionType: 'compress',
        fileType: 'pdf',
        originalName,
        originalSize,
        compressedSize,
        ratio: Number(ratio.toFixed(2)),
        downloadUrl,
      });
    } catch (dbErr) {
      console.error('DB Logging error:', dbErr);
    }
    // Clean up input file
    try { await fs.promises.unlink(inPath); } catch {}
    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
    res.json({
      success: true,
      data: {
        originalName,
        originalSize,
        compressedSize,
        compressionRatio: ratio.toFixed(2),
        downloadUrl,
        fileId: fileDoc ? fileDoc._id : null,
        historyId: historyDoc ? historyDoc._id : null,
        timeTaken,
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'PDF compression failed', details: error.message });
  }
});

// GET /api/compress/download/:filename
router.get('/download/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../uploads', req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  res.download(filePath);
});

module.exports = router;
