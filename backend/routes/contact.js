const express = require('express');
const Contact = require('../models/Contact');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Submit contact form
router.post('/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (message.length < 10) {
      return res.status(400).json({ error: 'Message must be at least 10 characters long' });
    }

    // Create contact submission
    const contact = new Contact({
      name,
      email,
      message
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// Get all contact submissions (admin only)
router.get('/admin/all', adminAuth, async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({
      success: true,
      data: contacts
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Failed to get contact submissions' });
  }
});

// Update contact status (admin only)
router.patch('/admin/:contactId/status', adminAuth, async (req, res) => {
  try {
    const { contactId } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({ error: 'Failed to update contact status' });
  }
});

// Delete contact submission (admin only)
router.delete('/admin/:contactId', adminAuth, async (req, res) => {
  try {
    const { contactId } = req.params;

    const contact = await Contact.findByIdAndDelete(contactId);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({
      success: true,
      message: 'Contact submission deleted successfully'
    });

  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ error: 'Failed to delete contact submission' });
  }
});

// Get contact statistics (admin only)
router.get('/admin/stats', adminAuth, async (req, res) => {
  try {
    const total = await Contact.countDocuments();
    const newCount = await Contact.countDocuments({ status: 'new' });
    const readCount = await Contact.countDocuments({ status: 'read' });
    const repliedCount = await Contact.countDocuments({ status: 'replied' });

    res.json({
      success: true,
      data: {
        total,
        new: newCount,
        read: readCount,
        replied: repliedCount
      }
    });

  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({ error: 'Failed to get contact statistics' });
  }
});

module.exports = router; 