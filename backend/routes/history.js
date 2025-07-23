const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const History = require('../models/History');

const router = express.Router();

// JWT middleware (user)
async function userAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'No token provided.' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ error: 'User not found.' });
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

// JWT middleware (admin)
async function adminAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'No token provided.' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user || !req.user.isAdmin) return res.status(401).json({ error: 'Admin access required.' });
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

// GET /api/history/summary (user)
router.get('/summary', userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const types = ['image', 'video', 'pdf', 'audio'];
    const summary = {};
    for (const type of types) {
      const total = await History.countDocuments({ userId, fileType: type });
      const success = await History.countDocuments({ userId, fileType: type, actionType: 'compress' });
      const downloadCount = await History.countDocuments({ userId, fileType: type, downloadUrl: { $exists: true } });
      summary[type] = { count: total, successCount: success, downloadCount };
    }
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch summary', details: err.message });
  }
});

// GET /api/history/list (user, paginated)
router.get('/list', userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const total = await History.countDocuments({ userId });
    const history = await History.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit);
    res.json({ total, page, limit, history });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history', details: err.message });
  }
});

// GET /api/history/admin/summary (admin)
router.get('/admin/summary', adminAuth, async (req, res) => {
  try {
    const types = ['image', 'video', 'pdf', 'audio'];
    const summary = {};
    for (const type of types) {
      const total = await History.countDocuments({ fileType: type });
      const success = await History.countDocuments({ fileType: type, actionType: 'compress' });
      const downloadCount = await History.countDocuments({ fileType: type, downloadUrl: { $exists: true } });
      summary[type] = { count: total, successCount: success, downloadCount };
    }
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admin summary', details: err.message });
  }
});

module.exports = router;
