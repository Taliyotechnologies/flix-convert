# ConvertFlix Backend API

A powerful Node.js/Express backend for file compression and conversion services.

## 🚀 Features

### File Compression
- **Image Compression**: JPG, PNG, WebP, GIF, BMP using Sharp
- **Video Compression**: MP4, AVI, MOV, MKV, WebM using FFmpeg
- **Audio Compression**: MP3, WAV, AAC, OGG, FLAC using FFmpeg
- **PDF Compression**: PDF optimization using PDF-lib

### File Conversion
- **Image Conversion**: Convert between JPG, PNG, WebP, GIF, BMP
- **Audio Conversion**: Convert between MP3, WAV, AAC, OGG, FLAC
- **Video Conversion**: Convert between MP4, WebM, AVI, MOV
- **PDF Conversion**: PDF to DOCX, PDF to Image

### Admin Features
- **Dashboard**: Real-time statistics and analytics
- **File Management**: Search, filter, and delete files
- **System Monitoring**: Server health and storage stats
- **Data Export**: CSV export of file logs
- **Auto Cleanup**: Automatic deletion of expired files

## 🛠 Tech Stack

- **Runtime**: Node.js 16+
- **Framework**: Express.js
- **File Processing**: Sharp, FFmpeg, PDF-lib
- **File Upload**: Multer
- **Security**: Helmet, CORS
- **Logging**: Morgan
- **Compression**: Compression middleware

## 📦 Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Install FFmpeg** (required for video/audio processing)
   ```bash
   # Windows (using chocolatey)
   choco install ffmpeg
   
   # macOS (using homebrew)
   brew install ffmpeg
   
   # Ubuntu/Debian
   sudo apt update
   sudo apt install ffmpeg
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🏃‍♂️ Quick Start

```bash
# Clone the repository
git clone https://github.com/Taliyotechnologies/flix-convert.git
cd flix-convert/backend

# Install dependencies
npm install

# Start development server
npm run dev
```

Server will start on `http://localhost:5000`

## 📋 API Endpoints

### Compression Endpoints

#### POST `/api/compress/image`
Compress image files (JPG, PNG, WebP, GIF, BMP)

**Parameters:**
- `file`: Image file (multipart/form-data)
- `quality`: Compression quality (1-100, default: 80)
- `format`: Output format (jpeg, png, webp, gif, bmp)

**Response:**
```json
{
  "success": true,
  "originalSize": 1024000,
  "compressedSize": 512000,
  "savedPercent": 50.0,
  "downloadUrl": "/uploads/compressed-abc123.jpg"
}
```

#### POST `/api/compress/video`
Compress video files (MP4, AVI, MOV, MKV, WebM)

**Parameters:**
- `file`: Video file (multipart/form-data)
- `quality`: Compression quality (low, medium, high, default: medium)

#### POST `/api/compress/audio`
Compress audio files (MP3, WAV, AAC, OGG, FLAC)

**Parameters:**
- `file`: Audio file (multipart/form-data)
- `bitrate`: Audio bitrate (64k, 128k, 256k, default: 128k)

#### POST `/api/compress/pdf`
Compress PDF files

**Parameters:**
- `file`: PDF file (multipart/form-data)

### Conversion Endpoints

#### POST `/api/convert/image`
Convert image formats

**Parameters:**
- `file`: Image file (multipart/form-data)
- `format`: Target format (jpeg, png, webp, gif, bmp)
- `quality`: Output quality (1-100, default: 80)

#### POST `/api/convert/audio`
Convert audio formats

**Parameters:**
- `file`: Audio file (multipart/form-data)
- `format`: Target format (mp3, wav, aac, ogg, flac)
- `bitrate`: Audio bitrate (64k, 128k, 256k, default: 128k)

#### POST `/api/convert/video`
Convert video formats

**Parameters:**
- `file`: Video file (multipart/form-data)
- `format`: Target format (mp4, webm, avi, mov)
- `quality`: Output quality (low, medium, high, default: medium)

#### POST `/api/convert/pdf`
Convert PDF files

**Parameters:**
- `file`: PDF file (multipart/form-data)
- `format`: Target format (docx, jpg, png)

### Admin Endpoints

#### GET `/api/admin/dashboard`
Get dashboard statistics

#### GET `/api/admin/files`
Get file logs with pagination

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `type`: Filter by file type
- `search`: Search by filename

#### DELETE `/api/admin/files/:id`
Delete a specific file

#### POST `/api/admin/cleanup`
Clean up expired files

#### GET `/api/admin/export/csv`
Export file logs as CSV

#### GET `/api/admin/system`
Get system information

### Health Check

#### GET `/api/health`
Server health check

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# File Upload Limits
MAX_FILE_SIZE=100MB

# File Retention (in hours)
FILE_RETENTION_HOURS=24
```

### File Upload Limits

- **Maximum file size**: 100MB
- **Supported formats**: 
  - Images: JPG, PNG, WebP, GIF, BMP
  - Videos: MP4, AVI, MOV, MKV, WebM
  - Audio: MP3, WAV, AAC, OGG, FLAC
  - Documents: PDF

## 📁 Project Structure

```
backend/
├── routes/
│   ├── compress.js    # Compression endpoints
│   ├── convert.js     # Conversion endpoints
│   └── admin.js       # Admin endpoints
├── uploads/           # File storage directory
├── server.js          # Main server file
├── package.json       # Dependencies
└── README.md         # This file
```

## 🔒 Security Features

- **CORS Protection**: Configured for frontend domain
- **Helmet**: Security headers
- **File Validation**: Type and size checking
- **Input Sanitization**: XSS protection
- **Rate Limiting**: Built-in Express rate limiting

## 🚀 Deployment

### Production Setup

1. **Set environment variables**
   ```bash
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=https://your-frontend-domain.com
   ```

2. **Install production dependencies**
   ```bash
   npm install --production
   ```

3. **Start production server**
   ```bash
   npm start
   ```

### Docker Deployment

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

## 📊 Monitoring

### Health Checks

- **GET `/api/health`**: Basic health check
- **GET `/api/admin/system`**: Detailed system info

### Logging

- **Morgan**: HTTP request logging
- **Console**: Error and process logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@flixconvert.com or create an issue in the repository.

---

Built with ❤️ by the ConvertFlix team 