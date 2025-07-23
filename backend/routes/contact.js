const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

// POST /api/contact/submit
router.post('/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }
    await Contact.create({ name, email, message });
    res.json({ success: true, message: 'Contact form submitted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit contact form', details: err.message });
  }
});

module.exports = router;
