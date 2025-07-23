const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

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

// POST /api/compress/image
router.post('/image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }
    if (req.file.size > 10 * 1024 * 1024) {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB. Please login for larger files.' });
    }
    const ext = getExt(req.file.mimetype);
    const originalName = req.file.originalname;
    const baseName = path.parse(originalName).name;
    const outName = `compressed-${Date.now()}-${baseName}.${ext}`;
    const outPath = path.join(__dirname, '../uploads', outName);
    // Try aggressive compression, but keep quality visually good
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
    // Save compressed image
    await fs.promises.writeFile(outPath, compressedBuffer);
    const compressedSize = compressedBuffer.length;
    const originalSize = req.file.size;
    const ratio = ((originalSize - compressedSize) / originalSize) * 100;
    const downloadUrl = `/api/compress/download/${outName}`;
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
