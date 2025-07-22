const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  const allowedTypes = {
    image: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
    video: ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv', 'video/webm'],
    pdf: ['application/pdf'],
    audio: ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a', 'audio/aac']
  };

  // Check if file type is allowed
  const isAllowed = Object.values(allowedTypes).flat().includes(file.mimetype);
  
  if (isAllowed) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, videos, PDFs, and audio files are allowed.'), false);
  }
};

// Create upload middleware factory for dynamic file size limit
function createUploadMiddleware(fieldName, getLimitMB = () => 10) {
  return (req, res, next) => {
    // Determine file size limit (in MB)
    const limitMB = getLimitMB(req);
    const upload = multer({
      storage: storage,
      fileFilter: fileFilter,
      limits: {
        fileSize: limitMB * 1024 * 1024,
        files: 1
      }
    }).single(fieldName);
    upload(req, res, function (err) {
      if (err) {
        return handleUploadError(err, req, res, next);
      }
      next();
    });
  };
}

// Default upload middlewares (10MB limit)
const uploadImage = createUploadMiddleware('image');
const uploadVideo = createUploadMiddleware('video');
const uploadPDF = createUploadMiddleware('pdf');
const uploadAudio = createUploadMiddleware('audio');

// Error handling middleware
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
    }
    return res.status(400).json({ error: err.message });
  }
  
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  
  next();
};

module.exports = {
  uploadImage,
  uploadVideo,
  uploadPDF,
  uploadAudio,
  handleUploadError,
  createUploadMiddleware // export factory for custom use
}; 