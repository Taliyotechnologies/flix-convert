const express = require('express');
const router = express.Router();
const { upload, handleUploadError } = require('../middlewares/upload');
const {
  convertImageHandler,
  convertVideoHandler,
  convertAudioHandler,
  convertPDFHandler
} = require('../controllers/conversionController');

// Image conversion
router.post('/image', upload.single('file'), handleUploadError, convertImageHandler);

// Video conversion
router.post('/video', upload.single('file'), handleUploadError, convertVideoHandler);

// Audio conversion
router.post('/audio', upload.single('file'), handleUploadError, convertAudioHandler);

// PDF conversion
router.post('/pdf', upload.single('file'), handleUploadError, convertPDFHandler);

module.exports = router; 