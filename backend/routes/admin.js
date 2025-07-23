const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');
const File = require('../models/File');
const Contact = require('../models/Contact');
const History = require('../models/History');

const router = express.Router();

// Helper: generate JWT
function generateToken(admin) {
  return jwt.sign({ id: admin._id, admin: true }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// Admin JWT middleware
async function adminAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'No token provided.' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) return res.status(401).json({ error: 'Admin not found.' });
    req.admin = admin;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

// POST /api/admin/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials.' });
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials.' });
    const token = generateToken(admin);
    res.json({ success: true, token, admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
});

// GET /api/admin/dashboard
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalContacts = await Contact.countDocuments();
    const totalFiles = await File.countDocuments();
    const totalConversions = await History.countDocuments({ actionType: 'convert' });
    const totalCompressions = await History.countDocuments({ actionType: 'compress' });
    const totalDownloads = await File.countDocuments({ downloadUrl: { $exists: true } });
    // Today stats
    const today = new Date();
    today.setHours(0,0,0,0);
    const todayConversions = await History.countDocuments({ actionType: 'convert', createdAt: { $gte: today } });
    const todayCompressions = await History.countDocuments({ actionType: 'compress', createdAt: { $gte: today } });
    const todayDownloads = await File.countDocuments({ downloadUrl: { $exists: true }, createdAt: { $gte: today } });
    // Online users (dummy, for now)
    const onlineUsers = 0;
    // File type stats
    const fileTypes = ['image', 'video', 'pdf', 'audio'];
    const fileTypeStats = {};
    for (const type of fileTypes) {
      fileTypeStats[type] = await History.countDocuments({ fileType: type });
    }
    // Recent activity
    const recentActivity = await History.find().sort({ createdAt: -1 }).limit(10);
    res.json({
      stats: {
        totalUsers, totalContacts, totalFiles, totalConversions, totalCompressions, totalDownloads,
        todayConversions, todayCompressions, todayDownloads, onlineUsers
      },
      fileTypeStats,
      recentActivity
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dashboard', details: err.message });
  }
});

// GET /api/admin/users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const total = await User.countDocuments();
    const users = await User.find().sort({ createdAt: -1 }).skip(skip).limit(limit).select('-password');
    res.json({ total, page, limit, users });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users', details: err.message });
  }
});

// GET /api/admin/contacts
router.get('/contacts', adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const total = await Contact.countDocuments();
    const contacts = await Contact.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    res.json({ total, page, limit, contacts });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts', details: err.message });
  }
});

// GET /api/admin/data
router.get('/data', adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const total = await File.countDocuments();
    const files = await File.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    res.json({ total, page, limit, files });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch files', details: err.message });
  }
});

// GET/POST /api/admin/settings (placeholder)
router.get('/settings', adminAuth, (req, res) => {
  res.json({ settings: {} });
});
router.post('/settings', adminAuth, (req, res) => {
  res.json({ success: true });
});

module.exports = router;
