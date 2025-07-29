const express = require('express');
const router = express.Router();
const CompressionController = require('../controllers/compressionController');
const { upload, handleUploadError } = require('../middlewares/fileUpload');

// Compress any file type
router.post('/compress', upload.single('file'), handleUploadError, CompressionController.compressFile);

// Download compressed file
router.get('/download/:fileId', CompressionController.downloadFile);

// Get file information
router.get('/info/:fileId', CompressionController.getFileInfo);

// Delete file (admin only)
router.delete('/delete/:fileId', CompressionController.deleteFile);

module.exports = router;