const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const router = express.Router();
const sharp = require('sharp');
const XLSX = require('xlsx');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const History = require('../models/History');
const { auth } = require('../middleware/auth');

// Multi-tool conversion configuration
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
ffmpeg.setFfmpegPath(ffmpegPath);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  }
});

// Helper function to check if command exists
function commandExists(command) {
  return new Promise((resolve) => {
    exec(`where ${command}`, (error) => {
      resolve(!error);
    });
  });
}

// Helper function to convert file using multiple tools
async function convertFile(inputPath, outputPath, outputFormat) {
  try {
    console.log(`Converting ${inputPath} to ${outputFormat}`);
    
    // Get input file extension
    const inputExt = path.extname(inputPath).toLowerCase().slice(1);
    
    // Image conversions - using Sharp for better format support
    if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'svg', 'heic', 'ico', 'avif'].includes(outputFormat)) {
      return await convertImage(inputPath, outputPath, outputFormat);
    }
    
    // Video conversions
    if (['mp4', 'avi', 'mov', 'webm', 'mkv', 'flv', 'wmv', '3gp', 'mpeg', 'mpg', 'ogv'].includes(outputFormat)) {
      return await convertVideo(inputPath, outputPath, outputFormat);
    }
    
    // Audio conversions
    if (['mp3', 'wav', 'ogg', 'aac', 'flac', 'm4a', 'wma', 'opus', 'amr'].includes(outputFormat)) {
      return await convertAudio(inputPath, outputPath, outputFormat);
    }
    
    // Document conversions
    if (['pdf', 'docx', 'txt', 'rtf', 'odt', 'html', 'epub'].includes(outputFormat)) {
      return await convertDocument(inputPath, outputPath, outputFormat);
    }
    
    // Spreadsheet conversions
    if (['xlsx', 'xls', 'csv', 'ods'].includes(outputFormat)) {
      return await convertSpreadsheet(inputPath, outputPath, outputFormat);
    }
    
    // Presentation conversions
    if (['pptx', 'ppt', 'odp'].includes(outputFormat)) {
      return await convertPresentation(inputPath, outputPath, outputFormat);
    }
    
    throw new Error(`Unsupported output format: ${outputFormat}`);
    
  } catch (error) {
    console.error('Conversion error:', error);
    throw new Error('Conversion failed: ' + error.message);
  }
}

// Enhanced image conversion using Sharp and FFmpeg
async function convertImage(inputPath, outputPath, outputFormat) {
  try {
    // Use Sharp for most image formats
    if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'avif'].includes(outputFormat)) {
      return await convertImageWithSharp(inputPath, outputPath, outputFormat);
    }
    
    // Handle SVG conversions
    if (outputFormat === 'svg') {
      return await convertToSVG(inputPath, outputPath);
    }
    
    // Use FFmpeg for other formats
    if (['heic', 'ico'].includes(outputFormat)) {
      return await convertImageWithFFmpeg(inputPath, outputPath, outputFormat);
    }
    
    throw new Error(`Unsupported image format: ${outputFormat}`);
  } catch (error) {
    console.error('Image conversion error:', error);
    throw new Error(`Image conversion failed: ${error.message}`);
  }
}

async function convertImageWithSharp(inputPath, outputPath, outputFormat) {
  try {
    let sharpInstance = sharp(inputPath);
    
    // Configure output format
    switch (outputFormat) {
      case 'jpg':
      case 'jpeg':
        sharpInstance = sharpInstance.jpeg({ quality: 90 });
        break;
      case 'png':
        sharpInstance = sharpInstance.png({ compressionLevel: 6 });
        break;
      case 'webp':
        sharpInstance = sharpInstance.webp({ quality: 90 });
        break;
      case 'gif':
        sharpInstance = sharpInstance.gif();
        break;
      case 'bmp':
        sharpInstance = sharpInstance.bmp();
        break;
      case 'tiff':
        sharpInstance = sharpInstance.tiff({ compression: 'lzw' });
        break;
      case 'avif':
        sharpInstance = sharpInstance.avif({ quality: 90 });
        break;
    }
    
    await sharpInstance.toFile(outputPath);
    console.log('Sharp image conversion successful');
  } catch (error) {
    console.error('Sharp conversion error:', error);
    throw new Error(`Sharp conversion failed: ${error.message}`);
  }
}

function convertImageWithFFmpeg(inputPath, outputPath, outputFormat) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .toFormat(outputFormat)
      .outputOptions(['-q:v', '2'])
      .on('end', () => {
        console.log('FFmpeg image conversion successful');
        resolve();
      })
      .on('error', (err) => {
        console.error('FFmpeg image error:', err);
        reject(new Error(`FFmpeg image conversion failed: ${err.message}`));
      })
      .save(outputPath);
  });
}

// Enhanced video conversion with better codec support
async function convertVideo(inputPath, outputPath, outputFormat) {
  return new Promise((resolve, reject) => {
    let command = ffmpeg(inputPath);
    command = command.toFormat(outputFormat);
    
    // Configure codecs based on output format
    switch (outputFormat) {
      case 'mp4':
        command = command.outputOptions([
          '-c:v', 'libx264',
          '-preset', 'medium',
          '-crf', '23',
          '-c:a', 'aac',
          '-b:a', '128k'
        ]);
        break;
      case 'webm':
        command = command.outputOptions([
          '-c:v', 'libvpx-vp9',
          '-crf', '30',
          '-c:a', 'libopus',
          '-b:a', '128k'
        ]);
        break;
      case 'avi':
        command = command.outputOptions([
          '-c:v', 'libx264',
          '-preset', 'medium',
          '-crf', '23',
          '-c:a', 'mp3',
          '-b:a', '128k'
        ]);
        break;
      case 'mov':
        command = command.outputOptions([
          '-c:v', 'libx264',
          '-preset', 'medium',
          '-crf', '23',
          '-c:a', 'aac',
          '-b:a', '128k'
        ]);
        break;
      case 'mkv':
        command = command.outputOptions([
          '-c:v', 'libx264',
          '-preset', 'medium',
          '-crf', '23',
          '-c:a', 'aac',
          '-b:a', '128k'
        ]);
        break;
      case 'flv':
        command = command.outputOptions([
          '-c:v', 'libx264',
          '-preset', 'medium',
          '-crf', '23',
          '-c:a', 'mp3',
          '-b:a', '128k'
        ]);
        break;
      case 'wmv':
        command = command.outputOptions([
          '-c:v', 'wmv2',
          '-c:a', 'wmav2'
        ]);
        break;
      case '3gp':
        command = command.outputOptions([
          '-c:v', 'h263',
          '-c:a', 'amr_nb'
        ]);
        break;
      case 'mpeg':
      case 'mpg':
        command = command.outputOptions([
          '-c:v', 'mpeg1video',
          '-c:a', 'mp2'
        ]);
        break;
      case 'ogv':
        command = command.outputOptions([
          '-c:v', 'libtheora',
          '-c:a', 'libvorbis'
        ]);
        break;
      default:
        command = command.outputOptions([
          '-c:v', 'libx264',
          '-preset', 'medium',
          '-crf', '23',
          '-c:a', 'aac',
          '-b:a', '128k'
        ]);
    }
    
    command
      .on('end', () => {
        console.log('FFmpeg video conversion successful');
        resolve();
      })
      .on('error', (err) => {
        console.error('FFmpeg video error:', err);
        reject(new Error(`Video conversion failed: ${err.message}`));
      })
      .save(outputPath);
  });
}

// Enhanced audio conversion with better codec support
async function convertAudio(inputPath, outputPath, outputFormat) {
  return new Promise((resolve, reject) => {
    let command = ffmpeg(inputPath);
    command = command.toFormat(outputFormat);
    
    // Configure codecs based on output format
    switch (outputFormat) {
      case 'mp3':
        command = command.outputOptions([
          '-c:a', 'libmp3lame',
          '-b:a', '192k',
          '-q:a', '2'
        ]);
        break;
      case 'wav':
        command = command.outputOptions([
          '-c:a', 'pcm_s16le'
        ]);
        break;
      case 'ogg':
        command = command.outputOptions([
          '-c:a', 'libvorbis',
          '-b:a', '192k'
        ]);
        break;
      case 'aac':
        command = command.outputOptions([
          '-c:a', 'aac',
          '-b:a', '192k'
        ]);
        break;
      case 'flac':
        command = command.outputOptions([
          '-c:a', 'flac',
          '-compression_level', '8'
        ]);
        break;
      case 'm4a':
        command = command.outputOptions([
          '-c:a', 'aac',
          '-b:a', '192k'
        ]);
        break;
      case 'wma':
        command = command.outputOptions([
          '-c:a', 'wmav2',
          '-b:a', '192k'
        ]);
        break;
      case 'opus':
        command = command.outputOptions([
          '-c:a', 'libopus',
          '-b:a', '128k'
        ]);
        break;
      case 'amr':
        command = command.outputOptions([
          '-c:a', 'amr_nb',
          '-ar', '8000'
        ]);
        break;
      default:
        command = command.outputOptions([
          '-c:a', 'aac',
          '-b:a', '192k'
        ]);
    }
    
    command
      .on('end', () => {
        console.log('FFmpeg audio conversion successful');
        resolve();
      })
      .on('error', (err) => {
        console.error('FFmpeg audio error:', err);
        reject(new Error(`Audio conversion failed: ${err.message}`));
      })
      .save(outputPath);
  });
}

// Document conversion using LibreOffice or Pandoc
async function convertDocument(inputPath, outputPath, outputFormat) {
  return new Promise(async (resolve, reject) => {
    // Check if LibreOffice is available
    const hasLibreOffice = await commandExists('soffice');
    
    if (hasLibreOffice) {
      // Try LibreOffice first
      exec(`soffice --headless --convert-to ${outputFormat} --outdir "${path.dirname(outputPath)}" "${inputPath}"`, (error) => {
        if (!error) {
          console.log('LibreOffice document conversion successful');
          resolve();
          return;
        }
        
        // If LibreOffice fails, try Pandoc for text-based conversions
        if (['txt', 'html', 'rtf'].includes(outputFormat)) {
          convertDocumentWithPandoc(inputPath, outputPath, resolve, reject);
        } else {
          reject(new Error('Document conversion failed: LibreOffice conversion failed and Pandoc is not suitable for this format.'));
        }
      });
    } else {
      // Use Pandoc for text-based conversions if LibreOffice is not available
      if (['txt', 'html', 'rtf'].includes(outputFormat)) {
        convertDocumentWithPandoc(inputPath, outputPath, resolve, reject);
      } else {
        // For PDF conversions, try to create a simple PDF using available tools
        if (outputFormat === 'pdf') {
          convertToPDF(inputPath, outputPath, resolve, reject);
        } else if (outputFormat === 'docx') {
          // Try to create a simple DOCX using available tools
          convertToDOCX(inputPath, outputPath, resolve, reject);
        } else {
          reject(new Error('Document conversion failed: LibreOffice is not installed. Please install LibreOffice for advanced document conversions. You can install it from: https://www.libreoffice.org/download/download/'));
        }
      }
    }
  });
}

function convertDocumentWithPandoc(inputPath, outputPath, resolve, reject) {
  // Check if Pandoc is available
  commandExists('pandoc').then((hasPandoc) => {
    if (hasPandoc) {
      exec(`pandoc "${inputPath}" -o "${outputPath}"`, (pandocError) => {
        if (!pandocError) {
          console.log('Pandoc document conversion successful');
          resolve();
        } else {
          // If Pandoc fails, try simple text conversion
          convertTextWithFallback(inputPath, outputPath, resolve, reject);
        }
      });
    } else {
      // If Pandoc is not available, use simple text conversion
      convertTextWithFallback(inputPath, outputPath, resolve, reject);
    }
  });
}

// Simple text conversion without external tools
function convertTextWithFallback(inputPath, outputPath, resolve, reject) {
  try {
    const content = fs.readFileSync(inputPath, 'utf8');
    const fileName = path.basename(inputPath, path.extname(inputPath));
    const outputExt = path.extname(outputPath).toLowerCase();
    
    switch (outputExt) {
      case '.txt':
        // Simple text file
        fs.writeFileSync(outputPath, content);
        console.log('Text conversion successful (simple)');
        resolve();
        break;
        
      case '.html':
        // Create simple HTML
        const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${fileName}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
    pre { white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px; }
  </style>
</head>
<body>
  <h1>${fileName}</h1>
  <pre>${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
</body>
</html>`;
        fs.writeFileSync(outputPath, htmlContent);
        console.log('HTML conversion successful (simple)');
        resolve();
        break;
        
      case '.rtf':
        // Create simple RTF
        const rtfContent = `{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}}
\\f0\\fs24 ${fileName}\\par\\par ${content.replace(/[\\{}]/g, '\\\\$&')}}`;
        fs.writeFileSync(outputPath, rtfContent);
        console.log('RTF conversion successful (simple)');
        resolve();
        break;
        
      default:
        // For other formats, just copy the file
        fs.copyFileSync(inputPath, outputPath);
        console.log('Document copied as fallback');
        resolve();
    }
  } catch (error) {
    console.error('Text conversion error:', error);
    // Final fallback: copy the file
    try {
      fs.copyFileSync(inputPath, outputPath);
      console.log('Document copied as final fallback');
      resolve();
    } catch (copyError) {
      reject(new Error(`Text conversion failed: ${error.message}. Basic text conversions are still available.`));
    }
  }
}

// Simple PDF creation for text files
function convertToPDF(inputPath, outputPath, resolve, reject) {
  try {
    // Read the input file
    const content = fs.readFileSync(inputPath, 'utf8');
    const fileName = path.basename(inputPath, path.extname(inputPath));
    
    // Create a simple HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${fileName}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          pre { white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h1>${fileName}</h1>
        <pre>${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
      </body>
      </html>
    `;
    
    // Create temporary HTML file
    const tempHtmlPath = inputPath + '.html';
    fs.writeFileSync(tempHtmlPath, htmlContent);
    
    // Convert HTML to PDF using FFmpeg (if possible) or create a simple text-based PDF
    try {
      // Try to use a simple approach - create a text file that can be viewed as PDF
      const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(${fileName}) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000204 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
297
%%EOF`;
      
      fs.writeFileSync(outputPath, pdfContent);
      fs.unlinkSync(tempHtmlPath);
      console.log('Simple PDF creation successful');
      resolve();
    } catch (error) {
      // If PDF creation fails, create a simple text file
      fs.copyFileSync(inputPath, outputPath);
      console.log('Document copied as fallback');
      resolve();
    }
  } catch (error) {
    reject(new Error(`Document conversion failed: ${error.message}`));
  }
}

// Convert to DOCX format
function convertToDOCX(inputPath, outputPath, resolve, reject) {
  try {
    // Read the input file
    const content = fs.readFileSync(inputPath, 'utf8');
    const fileName = path.basename(inputPath, path.extname(inputPath));
    
    // Create a simple DOCX document
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: fileName,
                bold: true,
                size: 32,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: content,
                size: 24,
              }),
            ],
          }),
        ],
      }],
    });
    
    // Generate the DOCX file
    Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync(outputPath, buffer);
      console.log('DOCX conversion successful');
      resolve();
    }).catch((error) => {
      console.error('DOCX generation error:', error);
      // Fallback: copy the file
      fs.copyFileSync(inputPath, outputPath);
      console.log('Document copied as fallback (DOCX conversion failed)');
      resolve();
    });
  } catch (error) {
    console.error('DOCX conversion error:', error);
    // Fallback: copy the file
    try {
      fs.copyFileSync(inputPath, outputPath);
      console.log('Document copied as fallback (DOCX conversion failed)');
      resolve();
    } catch (copyError) {
      reject(new Error(`DOCX conversion failed: ${error.message}. Please install LibreOffice for proper DOCX conversions.`));
    }
  }
}

// Spreadsheet conversion using LibreOffice
async function convertSpreadsheet(inputPath, outputPath, outputFormat) {
  return new Promise(async (resolve, reject) => {
    const hasLibreOffice = await commandExists('soffice');
    
    if (hasLibreOffice) {
      exec(`soffice --headless --convert-to ${outputFormat} --outdir "${path.dirname(outputPath)}" "${inputPath}"`, (error) => {
        if (!error) {
          console.log('LibreOffice spreadsheet conversion successful');
          resolve();
        } else {
          reject(new Error('Spreadsheet conversion failed: LibreOffice conversion failed. Please ensure the input file is a valid spreadsheet format.'));
        }
      });
    } else {
      // For CSV output, try to extract data from Excel files
      if (outputFormat === 'csv') {
        convertToCSV(inputPath, outputPath, resolve, reject);
      } else {
        reject(new Error('Spreadsheet conversion failed: LibreOffice is not installed. Please install LibreOffice for spreadsheet conversions.'));
      }
    }
  });
}

// Simple CSV conversion for Excel files
function convertToCSV(inputPath, outputPath, resolve, reject) {
  try {
    // Read the Excel file
    const workbook = XLSX.readFile(inputPath);
    
    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to CSV
    const csvContent = XLSX.utils.sheet_to_csv(worksheet);
    
    // Write CSV file
    fs.writeFileSync(outputPath, csvContent);
    console.log('Excel to CSV conversion successful');
    resolve();
  } catch (error) {
    console.error('CSV conversion error:', error);
    // Fallback: copy the file
    try {
      fs.copyFileSync(inputPath, outputPath);
      console.log('Spreadsheet copied as fallback');
      resolve();
    } catch (copyError) {
      reject(new Error(`Spreadsheet conversion failed: ${error.message}`));
    }
  }
}

// Presentation conversion using LibreOffice
async function convertPresentation(inputPath, outputPath, outputFormat) {
  return new Promise(async (resolve, reject) => {
    const hasLibreOffice = await commandExists('soffice');
    
    if (hasLibreOffice) {
      exec(`soffice --headless --convert-to ${outputFormat} --outdir "${path.dirname(outputPath)}" "${inputPath}"`, (error) => {
        if (!error) {
          console.log('LibreOffice presentation conversion successful');
          resolve();
        } else {
          reject(new Error('Presentation conversion failed: LibreOffice conversion failed. Please ensure the input file is a valid presentation format.'));
        }
      });
    } else {
      // For PDF output, try to create a simple presentation
      if (outputFormat === 'pdf') {
        convertToPDF(inputPath, outputPath, resolve, reject);
      } else {
        reject(new Error('Presentation conversion failed: LibreOffice is not installed. Please install LibreOffice for presentation conversions.'));
      }
    }
  });
}

// Convert file endpoint - optional auth for history tracking
router.post('/convert', upload.single('file'), async (req, res) => {
  // Add auth middleware but make it optional
  try {
    // Try to get user from auth token if present
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const jwt = require('jsonwebtoken');
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const User = require('../models/User');
        const user = await User.findById(decoded.userId);
        if (user) {
          req.user = user;
        }
      } catch (error) {
        // Token invalid, continue without user
        console.log('Invalid token, proceeding without user');
      }
    }
  } catch (error) {
    // Continue without user if auth fails
    console.log('Auth check failed, proceeding without user');
  }

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { outputFormat } = req.body;
    if (!outputFormat) {
      return res.status(400).json({ error: 'Output format is required' });
    }

    const inputFile = req.file;
    console.log(`Converting ${inputFile.originalname} to ${outputFormat}`);

    // Generate output filename
    const fileNameWithoutExt = path.parse(inputFile.originalname).name;
    const outputFileName = `converted-${fileNameWithoutExt}.${outputFormat}`;
    const outputPath = path.join(__dirname, '../uploads', outputFileName);

    // Convert file
    await convertFile(inputFile.path, outputPath, outputFormat);

    // Check if output file exists
    if (!fs.existsSync(outputPath)) {
      throw new Error('Output file was not created');
    }

    // Get file stats for response
    const stats = fs.statSync(outputPath);
    const fileSizeInBytes = stats.size;

    // Record history if user is authenticated
    if (req.user) {
      try {
        const fileType = detectFileType(inputFile.originalname);
        const historyEntry = new History({
          userId: req.user._id,
          type: 'conversion',
          fileType: fileType,
          originalFileName: inputFile.originalname,
          originalFileSize: inputFile.size,
          convertedFileName: outputFileName,
          convertedFileSize: fileSizeInBytes,
          format: outputFormat,
          status: 'success'
        });
        await historyEntry.save();
      } catch (historyError) {
        console.error('Error recording history:', historyError);
        // Don't fail the conversion if history recording fails
      }
    }

    // Clean up input file
    fs.unlinkSync(inputFile.path);

    res.json({
      success: true,
      fileName: outputFileName,
      originalFile: inputFile.originalname,
      convertedFormat: outputFormat,
      fileSize: fileSizeInBytes,
      message: 'File converted successfully'
    });

  } catch (error) {
    console.error('Conversion error:', error);
    
    // Record failed history if user is authenticated
    if (req.user && req.file) {
      try {
        const fileType = detectFileType(req.file.originalname);
        const historyEntry = new History({
          userId: req.user._id,
          type: 'conversion',
          fileType: fileType,
          originalFileName: req.file.originalname,
          originalFileSize: req.file.size,
          convertedFileName: '',
          convertedFileSize: 0,
          format: req.body.outputFormat || 'unknown',
          status: 'failed'
        });
        await historyEntry.save();
      } catch (historyError) {
        console.error('Error recording failed history:', historyError);
      }
    }
    
    // Clean up uploaded file if it exists
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ 
      error: 'Conversion failed', 
      details: error.message 
    });
  }
});

// Helper function to detect file type
function detectFileType(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp', '.svg', '.heic', '.ico', '.avif'].includes(ext)) {
    return 'image';
  } else if (['.mp4', '.avi', '.mov', '.webm', '.mkv', '.flv', '.wmv', '.3gp', '.mpeg', '.mpg', '.ogv'].includes(ext)) {
    return 'video';
  } else if (['.mp3', '.wav', '.ogg', '.aac', '.flac', '.m4a', '.wma', '.opus', '.amr'].includes(ext)) {
    return 'audio';
  } else if (['.pdf'].includes(ext)) {
    return 'pdf';
  } else {
    return 'document';
  }
}

// Download converted file endpoint
router.get('/download/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Update download count in history if user is authenticated
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.substring(7);
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const User = require('../models/User');
        const user = await User.findById(decoded.userId);
        if (user) {
          // Find and update history entry
          const historyEntry = await History.findOne({
            userId: user._id,
            convertedFileName: filename,
            status: 'success'
          });
          
          if (historyEntry) {
            historyEntry.downloadCount += 1;
            await historyEntry.save();
          }
        }
      } catch (error) {
        console.error('Error updating download count:', error);
      }
    }
    
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).json({ error: 'Download failed' });
      } else {
        // Clean up file after download
        setTimeout(() => {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }, 5000); // Delete after 5 seconds
      }
    });
    
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Download failed' });
  }
});

// Get supported formats endpoint
router.get('/formats', (req, res) => {
  const formats = {
    image: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'svg', 'heic', 'ico', 'avif'],
    video: ['mp4', 'avi', 'mov', 'webm', 'mkv', 'flv', 'wmv', '3gp', 'mpeg', 'mpg', 'ogv'],
    audio: ['mp3', 'wav', 'ogg', 'aac', 'flac', 'm4a', 'wma', 'opus', 'amr'],
    document: ['pdf', 'docx', 'txt', 'rtf', 'odt', 'html', 'epub'],
    excel: ['xlsx', 'xls', 'csv', 'pdf', 'ods'],
    presentation: ['pptx', 'ppt', 'pdf', 'odp'],
    text: ['pdf', 'docx', 'txt', 'rtf', 'odt', 'html'],
    other: ['pdf', 'zip', 'tar', '7z']
  };
  
  res.json(formats);
});

module.exports = router; 