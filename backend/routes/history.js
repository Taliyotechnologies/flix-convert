const express = require('express');
const { auth } = require('../middleware/auth');
const History = require('../models/History');

const router = express.Router();

// Get user's history summary
router.get('/summary', auth, async (req, res) => {
  try {
    const userId = req.user._id;

    // Get conversion history summary
    const conversionSummary = await History.aggregate([
      { $match: { userId: userId, type: 'conversion' } },
      { $group: {
        _id: '$fileType',
        count: { $sum: 1 },
        totalOriginalSize: { $sum: '$originalFileSize' },
        totalConvertedSize: { $sum: '$convertedFileSize' },
        successCount: { $sum: { $cond: [{ $eq: ['$status', 'success'] }, 1, 0] } },
        downloadCount: { $sum: '$downloadCount' }
      }},
      { $sort: { _id: 1 } }
    ]);

    // Get compression history summary
    const compressionSummary = await History.aggregate([
      { $match: { userId: userId, type: 'compression' } },
      { $group: {
        _id: '$fileType',
        count: { $sum: 1 },
        totalOriginalSize: { $sum: '$originalFileSize' },
        totalCompressedSize: { $sum: '$convertedFileSize' },
        successCount: { $sum: { $cond: [{ $eq: ['$status', 'success'] }, 1, 0] } },
        downloadCount: { $sum: '$downloadCount' }
      }},
      { $sort: { _id: 1 } }
    ]);

    // Format the data for frontend
    const fileTypes = ['image', 'video', 'pdf', 'audio'];
    const conversionData = {};
    const compressionData = {};

    // Initialize with zeros
    fileTypes.forEach(type => {
      conversionData[type] = { count: 0, successCount: 0, downloadCount: 0 };
      compressionData[type] = { count: 0, successCount: 0, downloadCount: 0 };
    });

    // Fill with real data
    conversionSummary.forEach(item => {
      conversionData[item._id] = {
        count: item.count,
        successCount: item.successCount,
        downloadCount: item.downloadCount
      };
    });

    compressionSummary.forEach(item => {
      compressionData[item._id] = {
        count: item.count,
        successCount: item.successCount,
        downloadCount: item.downloadCount
      };
    });

    res.json({
      conversion: conversionData,
      compression: compressionData
    });
  } catch (error) {
    console.error('Error fetching history summary:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// Get detailed history
router.get('/detailed', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { type, fileType, page = 1, limit = 10 } = req.query;

    const query = { userId };
    if (type) query.type = type;
    if (fileType) query.fileType = fileType;

    const skip = (page - 1) * limit;

    const history = await History.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('userId', 'name email');

    const total = await History.countDocuments(query);

    res.json({
      history,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching detailed history:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// Record a new history entry
router.post('/record', auth, async (req, res) => {
  try {
    const {
      type,
      fileType,
      originalFileName,
      originalFileSize,
      convertedFileName,
      convertedFileSize,
      format,
      status = 'success'
    } = req.body;

    const historyEntry = new History({
      userId: req.user._id,
      type,
      fileType,
      originalFileName,
      originalFileSize,
      convertedFileName,
      convertedFileSize,
      format,
      status
    });

    await historyEntry.save();
    res.status(201).json({ message: 'History recorded successfully' });
  } catch (error) {
    console.error('Error recording history:', error);
    res.status(500).json({ error: 'Failed to record history' });
  }
});

// Update download count
router.put('/download/:historyId', auth, async (req, res) => {
  try {
    const { historyId } = req.params;
    
    const history = await History.findById(historyId);
    if (!history) {
      return res.status(404).json({ error: 'History entry not found' });
    }

    // Check if user owns this history entry
    if (history.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    history.downloadCount += 1;
    await history.save();

    res.json({ message: 'Download count updated' });
  } catch (error) {
    console.error('Error updating download count:', error);
    res.status(500).json({ error: 'Failed to update download count' });
  }
});

module.exports = router; 