const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = /jpeg|jpg|png|gif|webp|bmp|tiff/;
  const allowedVideoTypes = /mp4|avi|mov|wmv|flv|webm|mkv|m4v/;
  const allowedAudioTypes = /mp3|wav|aac|flac|ogg|wma|m4a/;
  const allowedPdfTypes = /pdf/;

  const ext = path.extname(file.originalname).toLowerCase().substring(1);
  
  if (allowedImageTypes.test(ext)) {
    file.fileType = 'image';
    cb(null, true);
  } else if (allowedVideoTypes.test(ext)) {
    file.fileType = 'video';
    cb(null, true);
  } else if (allowedAudioTypes.test(ext)) {
    file.fileType = 'audio';
    cb(null, true);
  } else if (allowedPdfTypes.test(ext)) {
    file.fileType = 'pdf';
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type. Please upload image, video, audio, or PDF files.'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 1
  }
});

// Error handling middleware
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 10MB.'
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Only one file allowed.'
      });
    }
  }
  
  if (err.message) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  
  next(err);
};

module.exports = { upload, handleUploadError };