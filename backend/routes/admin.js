const express = require('express');
const authMiddleware = require('../middlewares/auth');
const {
  login,
  getAllFiles,
  downloadFile,
  deleteFile,
  getStats
} = require('../controllers/adminController');

const router = express.Router();

// Public routes
router.post('/login', login);

// Protected routes
router.get('/files', authMiddleware, getAllFiles);
router.get('/files/:id/download', authMiddleware, downloadFile);
router.delete('/files/:id', authMiddleware, deleteFile);
router.get('/stats', authMiddleware, getStats);

module.exports = router; 