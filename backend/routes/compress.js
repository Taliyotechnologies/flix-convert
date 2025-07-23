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
      return res.status(400).json({ error: 'No image file uploaded' });
    }
    const originalSize = req.file.size;
    if (originalSize > 10 * 1024 * 1024) {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
    }
    const ext = getExt(req.file.mimetype);
    const originalName = req.file.originalname;
    // Use sharp to compress (quality 65 for jpg/webp, 8 for png)
    let sharpStream = sharp(req.file.buffer);
    let compressedBuffer;
    if (ext === 'jpg' || ext === 'jpeg') {
      compressedBuffer = await sharpStream.jpeg({ quality: 65 }).toBuffer();
    } else if (ext === 'png') {
      compressedBuffer = await sharpStream.png({ quality: 65, compressionLevel: 8 }).toBuffer();
    } else if (ext === 'webp') {
      compressedBuffer = await sharpStream.webp({ quality: 65 }).toBuffer();
    } else if (ext === 'gif') {
      // GIF: just return original (sharp doesn't compress gif)
      compressedBuffer = req.file.buffer;
    } else {
      compressedBuffer = await sharpStream.jpeg({ quality: 65 }).toBuffer();
    }
    // If not at least 30% smaller, fallback to original
    const compressedSize = compressedBuffer.length;
    const ratio = ((originalSize - compressedSize) / originalSize) * 100;
    let finalBuffer = compressedBuffer;
    let finalSize = compressedSize;
    let alreadyCompressed = false;
    if (ratio < 30) {
      finalBuffer = req.file.buffer;
      finalSize = originalSize;
      alreadyCompressed = true;
    }
    res.setHeader('Content-Type', req.file.mimetype);
    res.setHeader('Content-Disposition', `attachment; filename="${path.parse(originalName).name}_compressed.${ext}"`);
    res.json({
      success: true,
      data: {
        originalName,
        originalSize,
        compressedSize: finalSize,
        compressionRatio: ratio.toFixed(2),
        alreadyCompressed,
        downloadUrl: null, // frontend expects a downloadUrl, but we send file directly
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Image compression failed', details: error.message });
  }
});

module.exports = router;
