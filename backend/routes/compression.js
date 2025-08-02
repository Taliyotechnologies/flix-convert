const express = require('express');
const { upload, handleUploadError } = require('../middlewares/upload');
const {
  compressImage,
  compressVideo,
  compressAudio,
  compressPdf
} = require('../controllers/compressionController');

const router = express.Router();

// Compression routes
router.post('/image', upload.single('file'), handleUploadError, compressImage);
router.post('/video', upload.single('file'), handleUploadError, compressVideo);
router.post('/audio', upload.single('file'), handleUploadError, compressAudio);
router.post('/pdf', upload.single('file'), handleUploadError, compressPdf);

module.exports = router; 