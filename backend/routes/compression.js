const express = require('express');
const router = express.Router();
const { upload, handleUploadError } = require('../middlewares/upload');
const {
  compressImageHandler,
  compressVideoHandler,
  compressAudioHandler,
  compressPDFHandler
} = require('../controllers/compressionController');

// Image compression
router.post('/image', upload.single('file'), handleUploadError, compressImageHandler);

// Video compression
router.post('/video', upload.single('file'), handleUploadError, compressVideoHandler);

// Audio compression
router.post('/audio', upload.single('file'), handleUploadError, compressAudioHandler);

// PDF compression
router.post('/pdf', upload.single('file'), handleUploadError, compressPDFHandler);

module.exports = router; 