const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs-extra')
const sharp = require('sharp')
const ffmpeg = require('fluent-ffmpeg')
const { PDFDocument } = require('pdf-lib')
const File = require('../models/File')

const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '..', 'uploads')
    fs.ensureDirSync(uploadsDir)
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
      'video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv',
      'audio/mp3', 'audio/wav', 'audio/flac', 'audio/aac', 'audio/ogg',
      'application/pdf'
    ]
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type'), false)
    }
  }
})

// Image compression endpoint
router.post('/image', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const inputPath = req.file.path
    const outputFileName = `compressed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.jpg`
    const outputPath = path.join(__dirname, '..', 'uploads', outputFileName)

    // Compress image using Sharp
    await sharp(inputPath)
      .jpeg({ quality: 80, progressive: true })
      .toFile(outputPath)

    // Get file sizes
    const originalSize = req.file.size
    const compressedSize = await fs.stat(outputPath).then(stats => stats.size)
    const compressionRatio = Math.round((1 - compressedSize / originalSize) * 100)

    // Save to database
    const fileDoc = new File({
      originalName: req.file.originalname,
      originalSize: originalSize,
      compressedSize: compressedSize,
      type: req.file.mimetype,
      compressedFileName: outputFileName,
      compressionRatio: compressionRatio,
      status: 'completed'
    })

    await fileDoc.save()

    // Clean up original file
    await fs.remove(inputPath)

    res.json({
      fileId: fileDoc._id,
      originalSize: originalSize,
      compressedSize: compressedSize,
      compressionRatio: compressionRatio,
      compressedFile: `/uploads/${outputFileName}`
    })

  } catch (error) {
    console.error('Image compression error:', error)
    res.status(500).json({ error: 'Image compression failed' })
  }
})

// Video compression endpoint
router.post('/video', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const inputPath = req.file.path
    const outputFileName = `compressed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.mp4`
    const outputPath = path.join(__dirname, '..', 'uploads', outputFileName)

    // Compress video using FFmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions([
          '-c:v libx264',
          '-crf 28',
          '-preset fast',
          '-c:a aac',
          '-b:a 128k'
        ])
        .output(outputPath)
        .on('end', resolve)
        .on('error', reject)
        .run()
    })

    // Get file sizes
    const originalSize = req.file.size
    const compressedSize = await fs.stat(outputPath).then(stats => stats.size)
    const compressionRatio = Math.round((1 - compressedSize / originalSize) * 100)

    // Save to database
    const fileDoc = new File({
      originalName: req.file.originalname,
      originalSize: originalSize,
      compressedSize: compressedSize,
      type: req.file.mimetype,
      compressedFileName: outputFileName,
      compressionRatio: compressionRatio,
      status: 'completed'
    })

    await fileDoc.save()

    // Clean up original file
    await fs.remove(inputPath)

    res.json({
      fileId: fileDoc._id,
      originalSize: originalSize,
      compressedSize: compressedSize,
      compressionRatio: compressionRatio,
      compressedFile: `/uploads/${outputFileName}`
    })

  } catch (error) {
    console.error('Video compression error:', error)
    res.status(500).json({ error: 'Video compression failed' })
  }
})

// Audio compression endpoint
router.post('/audio', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const inputPath = req.file.path
    const outputFileName = `compressed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.mp3`
    const outputPath = path.join(__dirname, '..', 'uploads', outputFileName)

    // Compress audio using FFmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions([
          '-c:a mp3',
          '-b:a 128k',
          '-ar 44100'
        ])
        .output(outputPath)
        .on('end', resolve)
        .on('error', reject)
        .run()
    })

    // Get file sizes
    const originalSize = req.file.size
    const compressedSize = await fs.stat(outputPath).then(stats => stats.size)
    const compressionRatio = Math.round((1 - compressedSize / originalSize) * 100)

    // Save to database
    const fileDoc = new File({
      originalName: req.file.originalname,
      originalSize: originalSize,
      compressedSize: compressedSize,
      type: req.file.mimetype,
      compressedFileName: outputFileName,
      compressionRatio: compressionRatio,
      status: 'completed'
    })

    await fileDoc.save()

    // Clean up original file
    await fs.remove(inputPath)

    res.json({
      fileId: fileDoc._id,
      originalSize: originalSize,
      compressedSize: compressedSize,
      compressionRatio: compressionRatio,
      compressedFile: `/uploads/${outputFileName}`
    })

  } catch (error) {
    console.error('Audio compression error:', error)
    res.status(500).json({ error: 'Audio compression failed' })
  }
})

// PDF compression endpoint
router.post('/pdf', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const inputPath = req.file.path
    const outputFileName = `compressed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.pdf`
    const outputPath = path.join(__dirname, '..', 'uploads', outputFileName)

    // Read and compress PDF
    const pdfBytes = await fs.readFile(inputPath)
    const pdfDoc = await PDFDocument.load(pdfBytes)
    
    // Compress PDF by removing unnecessary metadata
    const compressedPdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false
    })

    await fs.writeFile(outputPath, compressedPdfBytes)

    // Get file sizes
    const originalSize = req.file.size
    const compressedSize = compressedPdfBytes.length
    const compressionRatio = Math.round((1 - compressedSize / originalSize) * 100)

    // Save to database
    const fileDoc = new File({
      originalName: req.file.originalname,
      originalSize: originalSize,
      compressedSize: compressedSize,
      type: req.file.mimetype,
      compressedFileName: outputFileName,
      compressionRatio: compressionRatio,
      status: 'completed'
    })

    await fileDoc.save()

    // Clean up original file
    await fs.remove(inputPath)

    res.json({
      fileId: fileDoc._id,
      originalSize: originalSize,
      compressedSize: compressedSize,
      compressionRatio: compressionRatio,
      compressedFile: `/uploads/${outputFileName}`
    })

  } catch (error) {
    console.error('PDF compression error:', error)
    res.status(500).json({ error: 'PDF compression failed' })
  }
})

module.exports = router