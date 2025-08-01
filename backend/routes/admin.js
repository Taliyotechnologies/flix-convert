const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Mock data storage (in real app, this would be MongoDB)
let fileLogs = [];
let statistics = {
  totalFiles: 0,
  totalSizeSaved: 0,
  averageCompressionRatio: 0,
  filesByType: {},
  dailyStats: {}
};

// Helper function to get file statistics
const getFileStats = () => {
  const uploadsDir = path.join(__dirname, '../uploads');
  if (!fs.existsSync(uploadsDir)) {
    return { totalFiles: 0, totalSize: 0 };
  }

  const files = fs.readdirSync(uploadsDir);
  let totalSize = 0;

  files.forEach(file => {
    const filePath = path.join(uploadsDir, file);
    const stats = fs.statSync(filePath);
    totalSize += stats.size;
  });

  return { totalFiles: files.length, totalSize };
};

// Get dashboard statistics
router.get('/dashboard', (req, res) => {
  try {
    const fileStats = getFileStats();
    const now = new Date();
    const today = now.toISOString().split('T')[0];

    // Calculate statistics
    const totalFiles = fileLogs.length;
    const totalSizeSaved = fileLogs.reduce((sum, log) => sum + (log.originalSize - log.processedSize), 0);
    const averageCompressionRatio = totalFiles > 0 ? fileLogs.reduce((sum, log) => sum + log.savedPercent, 0) / totalFiles : 0;

    // Group files by type
    const filesByType = fileLogs.reduce((acc, log) => {
      const type = log.type.split('-')[0]; // image, video, audio, pdf
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    // Daily statistics
    const dailyStats = fileLogs.reduce((acc, log) => {
      const date = new Date(log.uploadedAt).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { count: 0, sizeSaved: 0 };
      }
      acc[date].count++;
      acc[date].sizeSaved += (log.originalSize - log.processedSize);
      return acc;
    }, {});

    const dashboardData = {
      totalFiles,
      totalSizeSaved,
      averageCompressionRatio: parseFloat(averageCompressionRatio.toFixed(2)),
      filesByType,
      dailyStats,
      currentStorage: fileStats,
      lastUpdated: now.toISOString()
    };

    res.json({
      success: true,
      data: dashboardData
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to get dashboard data', details: error.message });
  }
});

// Get all file logs with pagination
router.get('/files', (req, res) => {
  try {
    const { page = 1, limit = 20, type, search } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    let filteredLogs = [...fileLogs];

    // Filter by type
    if (type) {
      filteredLogs = filteredLogs.filter(log => log.type.includes(type));
    }

    // Search by filename
    if (search) {
      filteredLogs = filteredLogs.filter(log => 
        log.fileName.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort by upload date (newest first)
    filteredLogs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

    const total = filteredLogs.length;
    const paginatedLogs = filteredLogs.slice(skip, skip + limitNum);

    res.json({
      success: true,
      data: {
        files: paginatedLogs,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum)
        }
      }
    });

  } catch (error) {
    console.error('Files list error:', error);
    res.status(500).json({ error: 'Failed to get files list', details: error.message });
  }
});

// Delete a specific file
router.delete('/files/:id', (req, res) => {
  try {
    const { id } = req.params;
    const fileLog = fileLogs.find(log => log.filePath.includes(id));

    if (!fileLog) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete physical file
    if (fs.existsSync(fileLog.filePath)) {
      fs.unlinkSync(fileLog.filePath);
    }

    // Remove from logs
    fileLogs = fileLogs.filter(log => !log.filePath.includes(id));

    res.json({
      success: true,
      message: 'File deleted successfully'
    });

  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({ error: 'Failed to delete file', details: error.message });
  }
});

// Clean up expired files
router.post('/cleanup', (req, res) => {
  try {
    const now = new Date();
    const expiredFiles = fileLogs.filter(log => new Date(log.expiresAt) < now);
    let deletedCount = 0;

    expiredFiles.forEach(log => {
      if (fs.existsSync(log.filePath)) {
        fs.unlinkSync(log.filePath);
        deletedCount++;
      }
    });

    // Remove expired files from logs
    fileLogs = fileLogs.filter(log => new Date(log.expiresAt) >= now);

    res.json({
      success: true,
      message: `Cleaned up ${deletedCount} expired files`,
      deletedCount
    });

  } catch (error) {
    console.error('Cleanup error:', error);
    res.status(500).json({ error: 'Failed to cleanup files', details: error.message });
  }
});

// Export file logs as CSV
router.get('/export/csv', (req, res) => {
  try {
    const csvHeader = 'FileName,Type,OriginalSize,ProcessedSize,SavedPercent,UploadedAt,ExpiresAt\n';
    const csvData = fileLogs.map(log => {
      return `${log.fileName},${log.type},${log.originalSize},${log.processedSize},${log.savedPercent},${log.uploadedAt},${log.expiresAt}`;
    }).join('\n');

    const csvContent = csvHeader + csvData;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=file-logs.csv');
    res.send(csvContent);

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Failed to export data', details: error.message });
  }
});

// Get system information
router.get('/system', (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '../uploads');
    const fileStats = getFileStats();

    const systemInfo = {
      nodeVersion: process.version,
      platform: process.platform,
      memoryUsage: process.memoryUsage(),
      uptime: process.uptime(),
      uploadsDirectory: uploadsDir,
      storageStats: fileStats,
      lastUpdated: new Date().toISOString()
    };

    res.json({
      success: true,
      data: systemInfo
    });

  } catch (error) {
    console.error('System info error:', error);
    res.status(500).json({ error: 'Failed to get system info', details: error.message });
  }
});

// Update file log (for testing purposes)
router.post('/update-log', (req, res) => {
  try {
    const newLog = req.body;
    fileLogs.push(newLog);
    
    res.json({
      success: true,
      message: 'File log updated',
      totalLogs: fileLogs.length
    });

  } catch (error) {
    console.error('Update log error:', error);
    res.status(500).json({ error: 'Failed to update log', details: error.message });
  }
});

module.exports = router; 