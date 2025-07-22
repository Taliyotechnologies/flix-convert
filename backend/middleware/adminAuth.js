const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.adminId);

    if (!admin || !admin.isActive) {
      return res.status(401).json({ error: 'Invalid token or inactive account.' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = { adminAuth }; 