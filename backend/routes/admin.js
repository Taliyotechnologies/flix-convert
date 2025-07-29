const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const path = require('path')
const fs = require('fs-extra')
const File = require('../models/File')

const router = express.Router()

// Admin credentials (in production, use environment variables)
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // 'password'
const JWT_SECRET = 'flixconvert-secret-key-2024'

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Access token required' })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' })
    }
    req.user = user
    next()
  })
}

// Admin login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' })
    }

    // Check admin credentials
    if (username !== ADMIN_USERNAME) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isValidPassword = await bcrypt.compare(password, ADMIN_PASSWORD)
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({
      message: 'Login successful',
      token: token,
      user: { username: username, role: 'admin' }
    })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Login failed' })
  }
})

// Get all files with stats (protected)
router.get('/files', authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 50
    const skip = (page - 1) * limit

    // Get files with pagination
    const files = await File.find()
      .sort({ uploadedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    // Get total count
    const totalFiles = await File.countDocuments()

    // Get stats
    const stats = await File.getStats()

    res.json({
      files: files,
      stats: stats,
      pagination: {
        page: page,
        limit: limit,
        total: totalFiles,
        pages: Math.ceil(totalFiles / limit)
      }
    })

  } catch (error) {
    console.error('Get files error:', error)
    res.status(500).json({ error: 'Failed to fetch files' })
  }
})

// Download compressed file (protected)
router.get('/download/:fileId', authenticateToken, async (req, res) => {
  try {
    const { fileId } = req.params

    const file = await File.findById(fileId)
    if (!file) {
      return res.status(404).json({ error: 'File not found' })
    }

    const filePath = path.join(__dirname, '..', 'uploads', file.compressedFileName)

    // Check if file exists
    if (!await fs.pathExists(filePath)) {
      return res.status(404).json({ error: 'File not found on disk' })
    }

    // Set headers for download
    res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`)
    res.setHeader('Content-Type', file.type)

    // Stream the file
    const fileStream = fs.createReadStream(filePath)
    fileStream.pipe(res)

  } catch (error) {
    console.error('Download error:', error)
    res.status(500).json({ error: 'Download failed' })
  }
})

// Delete file (protected)
router.delete('/delete/:fileId', authenticateToken, async (req, res) => {
  try {
    const { fileId } = req.params

    const file = await File.findById(fileId)
    if (!file) {
      return res.status(404).json({ error: 'File not found' })
    }

    // Delete physical file
    const filePath = path.join(__dirname, '..', 'uploads', file.compressedFileName)
    if (await fs.pathExists(filePath)) {
      await fs.remove(filePath)
    }

    // Delete from database
    await File.findByIdAndDelete(fileId)

    res.json({ message: 'File deleted successfully' })

  } catch (error) {
    console.error('Delete error:', error)
    res.status(500).json({ error: 'Delete failed' })
  }
})

// Get dashboard stats (protected)
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const stats = await File.getStats()
    res.json(stats)
  } catch (error) {
    console.error('Stats error:', error)
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
})

// Get files by type (protected)
router.get('/files/by-type', authenticateToken, async (req, res) => {
  try {
    const fileTypeStats = await File.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          totalOriginalSize: { $sum: '$originalSize' },
          totalCompressedSize: { $sum: '$compressedSize' }
        }
      },
      {
        $project: {
          type: '$_id',
          count: 1,
          totalOriginalSize: 1,
          totalCompressedSize: 1,
          averageCompression: {
            $round: [
              {
                $multiply: [
                  { $subtract: [1, { $divide: ['$totalCompressedSize', '$totalOriginalSize'] }] },
                  100
                ]
              },
              2
            ]
          }
        }
      },
      { $sort: { count: -1 } }
    ])

    res.json(fileTypeStats)
  } catch (error) {
    console.error('File type stats error:', error)
    res.status(500).json({ error: 'Failed to fetch file type stats' })
  }
})

// Get recent activity (protected)
router.get('/activity', authenticateToken, async (req, res) => {
  try {
    const recentFiles = await File.find()
      .sort({ uploadedAt: -1 })
      .limit(10)
      .select('originalName type originalSize compressedSize compressionRatio uploadedAt')
      .lean()

    res.json(recentFiles)
  } catch (error) {
    console.error('Activity error:', error)
    res.status(500).json({ error: 'Failed to fetch activity' })
  }
})

module.exports = router