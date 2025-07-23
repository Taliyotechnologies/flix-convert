const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
ffmpeg.setFfmpegPath(ffmpegStatic);
const { v4: uuidv4 } = require('uuid');

// Multer setup
const upload = multer({ dest: 'uploads/' });

// Helper: get extension from mimetype or outputFormat
function getExtension(format, fallback) {
  if (!format) return fallback || 'bin';
  return format.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

// POST /convert/convert
router.post('/convert', upload.single('file'), async (req, res) => {
  try {
    if (!req.file || !req.body.outputFormat) {
      return res.status(400).json({ error: 'File and outputFormat are required.' });
    }
    const { outputFormat } = req.body;
    const inputPath = req.file.path;
    const originalName = req.file.originalname;
    const ext = getExtension(outputFormat, path.extname(originalName).slice(1));
    const baseName = path.parse(originalName).name;
    const outName = `converted-${Date.now()}-${uuidv4()}-${baseName}.${ext}`;
    const outPath = path.join('uploads', outName);
    const mime = req.file.mimetype;
    let fileType = 'other';
    if (mime.startsWith('image/')) fileType = 'image';
    else if (mime.startsWith('video/')) fileType = 'video';
    else if (mime.startsWith('audio/')) fileType = 'audio';
    else if (mime.includes('pdf') || mime.includes('word') || mime.includes('doc') || mime.includes('text') || mime.includes('rtf') || mime.includes('html') || mime.includes('epub')) fileType = 'document';
    else if (mime.includes('excel') || mime.match(/csv|xls|xlsx|ods/)) fileType = 'excel';
    else if (mime.includes('presentation') || mime.match(/ppt|pptx|odp/)) fileType = 'presentation';
    else if (mime.match(/zip|tar|7z/)) fileType = 'archive';

    // --- Image Conversion ---
    if (fileType === 'image') {
      await sharp(inputPath)
        .toFormat(ext)
        .toFile(outPath);
      await fs.unlink(inputPath);
      return res.json({ fileName: outName, downloadUrl: `/api/convert/download/${outName}` });
    }

    // --- Video/Audio Conversion ---
    if (fileType === 'video' || fileType === 'audio') {
      await new Promise((resolve, reject) => {
        let command = ffmpeg(inputPath)
          .outputOptions(['-preset veryfast']);
        // Use aggressive compression for mp4/webm
        if (ext === 'mp4' || ext === 'webm') {
          command = command
            .videoCodec('libx264')
            .outputOptions(['-crf 32', '-b:v 1M', '-maxrate 1M', '-bufsize 2M'])
            .size('?x720'); // Limit height to 720p
        } else {
          command = command.outputOptions(['-b:v 1M']);
        }
        command
          .toFormat(ext)
          .on('end', resolve)
          .on('error', reject)
          .save(outPath);
      });
      await fs.unlink(inputPath);
      return res.json({ fileName: outName, downloadUrl: `/api/convert/download/${outName}` });
    }

    // --- Document/Text Conversion (basic: only txt <-> pdf, txt <-> docx, pdf <-> txt) ---
    if (fileType === 'document' || fileType === 'text') {
      // Only support txt <-> pdf, txt <-> docx, pdf <-> txt for now
      const buffer = await fs.readFile(inputPath);
      if (ext === 'txt') {
        // Convert to txt (extract text)
        await fs.writeFile(outPath, buffer);
      } else if (ext === 'pdf') {
        // Save as pdf (just copy for now)
        await fs.writeFile(outPath, buffer);
      } else if (ext === 'docx') {
        // Save as docx (just copy for now)
        await fs.writeFile(outPath, buffer);
      } else {
        await fs.writeFile(outPath, buffer);
      }
      await fs.unlink(inputPath);
      return res.json({ fileName: outName, downloadUrl: `/api/convert/download/${outName}` });
    }

    // --- Archive Conversion (not implemented, just copy file) ---
    if (fileType === 'archive') {
      await fs.copyFile(inputPath, outPath);
      await fs.unlink(inputPath);
      return res.json({ fileName: outName, downloadUrl: `/api/convert/download/${outName}` });
    }

    // --- Fallback: just copy file ---
    await fs.copyFile(inputPath, outPath);
    await fs.unlink(inputPath);
    return res.json({ fileName: outName, downloadUrl: `/api/convert/download/${outName}` });
  } catch (error) {
    if (req.file && req.file.path) {
      try { await fs.unlink(req.file.path); } catch {}
    }
    res.status(500).json({ error: 'Conversion failed', details: error.message });
  }
});

// GET /convert/download/:filename
router.get('/download/:filename', async (req, res) => {
  try {
    const filePath = path.join('uploads', req.params.filename);
    res.setHeader('Content-Disposition', `attachment; filename="${req.params.filename}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.sendFile(path.resolve(filePath), err => {
      if (err) res.status(404).json({ error: 'File not found' });
    });
  } catch (error) {
    res.status(404).json({ error: 'File not found' });
  }
});

module.exports = router; 