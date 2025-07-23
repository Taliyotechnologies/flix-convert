const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Multer setup for 10MB limit
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// Helper: get extension from mimetype
function getExt(mimetype) {
  if (mimetype === 'image/jpeg') return 'jpg';
  if (mimetype === 'image/png') return 'png';
  if (mimetype === 'image/webp') return 'webp';
  if (mimetype === 'image/gif') return 'gif';
  return 'jpg';
}

// POST /api/compress/image
router.post('/image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      console.error('No image file uploaded');
      return res.status(400).json({ error: 'No image file uploaded' });
    }
    const originalSize = req.file.size;
    console.log(`Received image: ${req.file.originalname}, size: ${originalSize} bytes`);
    if (originalSize > 10 * 1024 * 1024) {
      console.error('File too large');
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
    }
    const ext = getExt(req.file.mimetype);
    const originalName = req.file.originalname;
    const baseName = path.parse(originalName).name;
    const outName = `compressed-${Date.now()}-${baseName}.${ext}`;
    const outPath = path.join(__dirname, '../uploads', outName);
    console.log(`Compressing image to ${outPath}...`);
    let sharpStream = sharp(req.file.buffer);
    let compressedBuffer;
    if (ext === 'jpg' || ext === 'jpeg') {
      compressedBuffer = await sharpStream.jpeg({ quality: 40 }).toBuffer();
    } else if (ext === 'png') {
      compressedBuffer = await sharpStream.png({ quality: 40, compressionLevel: 9 }).toBuffer();
    } else if (ext === 'webp') {
      compressedBuffer = await sharpStream.webp({ quality: 40 }).toBuffer();
    } else if (ext === 'gif') {
      compressedBuffer = req.file.buffer;
    } else {
      compressedBuffer = await sharpStream.jpeg({ quality: 40 }).toBuffer();
    }
    await fs.promises.writeFile(outPath, compressedBuffer);
    const compressedSize = compressedBuffer.length;
    const ratio = ((originalSize - compressedSize) / originalSize) * 100;
    const downloadUrl = `/api/compress/download/${outName}`;
    console.log(`Compression complete: ${outName}, original: ${originalSize}, compressed: ${compressedSize}, ratio: ${ratio.toFixed(2)}%`);
    res.json({
      success: true,
      data: {
        originalName,
        originalSize,
        compressedSize,
        compressionRatio: ratio.toFixed(2),
        downloadUrl,
      }
    });
  } catch (error) {
    console.error('Image compression failed:', error);
    res.status(500).json({ error: 'Image compression failed', details: error.message });
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
