const express = require('express');
const { upload, handleUploadError } = require('../middlewares/upload');
const {
  convertImage,
  convertVideo,
  convertAudio,
  convertPdf
} = require('../controllers/conversionController');

const router = express.Router();

// Conversion routes
router.post('/image', upload.single('file'), handleUploadError, convertImage);
router.post('/video', upload.single('file'), handleUploadError, convertVideo);
router.post('/audio', upload.single('file'), handleUploadError, convertAudio);
router.post('/pdf', upload.single('file'), handleUploadError, convertPdf);

module.exports = router; 