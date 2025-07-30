const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    fs.ensureDirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = /jpeg|jpg|png|webp|gif/;
  const allowedVideoTypes = /mp4|mov|avi|mkv|webm|flv/;
  const allowedAudioTypes = /mp3|wav|aac|ogg|flac/;
  const allowedPdfTypes = /pdf/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  // Check file type based on operation
  const operation = req.params.operation || req.body.operation;
  
  let isValid = false;
  
  switch (operation) {
    case 'image':
      isValid = allowedImageTypes.test(extname) && 
                (mimetype.startsWith('image/'));
      break;
    case 'video':
      isValid = allowedVideoTypes.test(extname) && 
                (mimetype.startsWith('video/'));
      break;
    case 'audio':
      isValid = allowedAudioTypes.test(extname) && 
                (mimetype.startsWith('audio/'));
      break;
    case 'pdf':
      isValid = allowedPdfTypes.test(extname) && 
                (mimetype === 'application/pdf');
      break;
    default:
      isValid = allowedImageTypes.test(extname) || 
                allowedVideoTypes.test(extname) || 
                allowedAudioTypes.test(extname) || 
                allowedPdfTypes.test(extname);
  }

  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type for ${operation} operation. Allowed types: ${getAllowedTypes(operation)}`), false);
  }
};

function getAllowedTypes(operation) {
  switch (operation) {
    case 'image':
      return 'JPEG, JPG, PNG, WEBP, GIF';
    case 'video':
      return 'MP4, MOV, AVI, MKV, WEBM, FLV';
    case 'audio':
      return 'MP3, WAV, AAC, OGG, FLAC';
    case 'pdf':
      return 'PDF';
    default:
      return 'JPEG, JPG, PNG, WEBP, GIF, MP4, MOV, AVI, MKV, WEBM, FLV, MP3, WAV, AAC, OGG, FLAC, PDF';
  }
}

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 100 * 1024 * 1024, // 100MB default
    files: 1
  }
});

// Middleware for single file upload
const uploadSingle = upload.single('file');

// Wrapper middleware with error handling
const uploadMiddleware = (req, res, next) => {
  uploadSingle(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Multer-specific errors
      switch (err.code) {
        case 'LIMIT_FILE_SIZE':
          return res.status(400).json({
            success: false,
            error: 'File too large. Maximum size is 100MB.'
          });
        case 'LIMIT_FILE_COUNT':
          return res.status(400).json({
            success: false,
            error: 'Too many files. Only one file allowed.'
          });
        case 'LIMIT_UNEXPECTED_FILE':
          return res.status(400).json({
            success: false,
            error: 'Unexpected file field.'
          });
        default:
          return res.status(400).json({
            success: false,
            error: 'File upload error.'
          });
      }
    } else if (err) {
      // Other errors (like fileFilter errors)
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded.'
      });
    }

    // Add file info to request
    req.fileInfo = {
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
      fileSize: req.file.size,
      mimetype: req.file.mimetype,
      extension: path.extname(req.file.originalname).toLowerCase()
    };

    next();
  });
};

module.exports = { uploadMiddleware }; 