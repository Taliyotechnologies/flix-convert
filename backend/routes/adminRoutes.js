const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const { authenticateToken, isAdmin } = require('../middlewares/auth');

// Admin login
router.post('/login', AdminController.login);

// Protected admin routes
router.use(authenticateToken, isAdmin);

// Dashboard stats
router.get('/dashboard/stats', AdminController.getDashboardStats);

// Get all files with pagination
router.get('/files', AdminController.getAllFiles);

// Delete multiple files
router.delete('/files', AdminController.deleteMultipleFiles);

// Manual cleanup
router.post('/cleanup', AdminController.runManualCleanup);

// Storage stats
router.get('/storage/stats', AdminController.getStorageStats);

module.exports = router;