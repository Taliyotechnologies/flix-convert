const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth');
const {
  loginHandler,
  getFilesHandler,
  downloadFileHandler,
  deleteFileHandler,
  getStatsHandler
} = require('../controllers/adminController');

// Admin login (no auth required)
router.post('/login', loginHandler);

// Protected routes (require auth)
router.get('/files', authMiddleware, getFilesHandler);
router.get('/files/:id/download', authMiddleware, downloadFileHandler);
router.delete('/files/:id', authMiddleware, deleteFileHandler);
router.get('/stats', authMiddleware, getStatsHandler);

module.exports = router; 