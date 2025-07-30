# ConvertFlix Backend

A powerful Node.js backend for file compression, conversion, and admin control. Built with Express.js, MongoDB, and various file processing libraries.

## 🚀 Features

### File Compression
- **Image Compression**: JPG, PNG, WEBP using Sharp
- **Video Compression**: MP4, MOV using FFmpeg
- **Audio Compression**: MP3, WAV using FFmpeg
- **PDF Compression**: Using PDF-lib

### File Conversion
- **Image Conversion**: PNG ↔ JPG ↔ WEBP ↔ GIF
- **Audio Conversion**: WAV ↔ MP3 ↔ AAC ↔ OGG
- **Video Conversion**: MP4 ↔ WebM ↔ AVI ↔ MOV
- **PDF Conversion**: Coming soon

### Admin Features
- File management and monitoring
- System statistics and analytics
- Automatic file cleanup
- Storage usage tracking

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud)
- FFmpeg (for video/audio processing)

### Installing FFmpeg

**Windows:**
```bash
# Using chocolatey
choco install ffmpeg

# Or download from https://ffmpeg.org/download.html
```

**macOS:**
```bash
# Using Homebrew
brew install ffmpeg
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install ffmpeg
```

## 🛠 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd flixconvert/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment setup**
```bash
# Copy environment example
cp env.example .env

# Edit .env with your configuration
nano .env
```

4. **Start the server**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## ⚙️ Configuration

### Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/flixconvert
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/flixconvert

# File Upload Configuration
MAX_FILE_SIZE=100MB
UPLOAD_PATH=./uploads
TEMP_PATH=./temp

# File Retention (in hours)
FILE_RETENTION_HOURS=24

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com

# Admin Configuration
ADMIN_EMAIL=admin@flixconvert.com
ADMIN_PASSWORD=admin123

# FFmpeg Configuration
FFMPEG_PATH=/usr/bin/ffmpeg
FFMPEG_THREADS=4
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Health Check
```http
GET /health
```

### File Compression

#### Image Compression
```http
POST /compress/image
Content-Type: multipart/form-data

Parameters:
- file: Image file (JPG, PNG, WEBP, GIF)
- quality: 1-100 (default: 80)
- format: jpeg, png, webp (default: jpeg)
- width: Optional width
- height: Optional height
```

#### Video Compression
```http
POST /compress/video
Content-Type: multipart/form-data

Parameters:
- file: Video file (MP4, MOV, AVI, MKV, WEBM, FLV)
- crf: 0-51 (default: 28)
- preset: ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow (default: medium)
- audioBitrate: Audio bitrate (default: 128k)
- videoBitrate: Video bitrate (default: 1000k)
- resolution: Output resolution (default: 1280x720)
```

#### Audio Compression
```http
POST /compress/audio
Content-Type: multipart/form-data

Parameters:
- file: Audio file (MP3, WAV, AAC, OGG, FLAC)
- bitrate: Audio bitrate (default: 128k)
- sampleRate: Sample rate (default: 44100)
- channels: Number of channels (default: 2)
```

#### PDF Compression
```http
POST /compress/pdf
Content-Type: multipart/form-data

Parameters:
- file: PDF file
- quality: low, medium, high (default: medium)
```

### File Conversion

#### Image Conversion
```http
POST /convert/image
Content-Type: multipart/form-data

Parameters:
- file: Image file
- targetFormat: jpeg, png, webp, gif
- quality: 1-100 (default: 80)
- width: Optional width
- height: Optional height
```

#### Audio Conversion
```http
POST /convert/audio
Content-Type: multipart/form-data

Parameters:
- file: Audio file
- targetFormat: mp3, wav, aac, ogg
- bitrate: Audio bitrate (default: 128k)
- sampleRate: Sample rate (default: 44100)
- channels: Number of channels (default: 2)
```

#### Video Conversion
```http
POST /convert/video
Content-Type: multipart/form-data

Parameters:
- file: Video file
- targetFormat: mp4, webm, avi, mov
- crf: 0-51 (default: 23)
- preset: FFmpeg preset (default: medium)
- audioBitrate: Audio bitrate (default: 128k)
- videoBitrate: Video bitrate (default: 1000k)
```

### Admin Routes

#### Get All Files
```http
GET /admin/files?page=1&limit=20&type=compress&operation=image&status=completed&search=filename
Headers:
- email: admin@flixconvert.com
- password: admin123
```

#### Delete File
```http
DELETE /admin/files/:id
Headers:
- email: admin@flixconvert.com
- password: admin123
```

#### Get System Statistics
```http
GET /admin/stats
Headers:
- email: admin@flixconvert.com
- password: admin123
```

#### Manual Cleanup
```http
POST /admin/cleanup
Headers:
- email: admin@flixconvert.com
- password: admin123
```

### Public Statistics

#### Get Public Stats
```http
GET /stats
```

#### Get Recent Files
```http
GET /stats/recent?limit=10
```

#### Get Top Operations
```http
GET /stats/top-operations
```

#### Get Efficiency Stats
```http
GET /stats/efficiency
```

## 📝 Response Format

### Success Response
```json
{
  "success": true,
  "message": "File processed successfully",
  "data": {
    "originalName": "example.jpg",
    "fileName": "example-compressed-1234567890-abc123.jpg",
    "originalSize": 1024000,
    "processedSize": 512000,
    "savedPercent": 50,
    "downloadUrl": "/uploads/example-compressed-1234567890-abc123.jpg",
    "expiresAt": "2024-01-01T12:00:00.000Z",
    "processingTime": 1500
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "File too large. Maximum size is 100MB."
}
```

## 🔧 Development

### Project Structure
```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── middleware/
│   ├── errorHandler.js      # Error handling middleware
│   └── upload.js           # File upload middleware
├── models/
│   └── FileLog.js          # MongoDB schema
├── routes/
│   ├── compress.js         # Compression routes
│   ├── convert.js          # Conversion routes
│   ├── admin.js           # Admin routes
│   └── stats.js           # Statistics routes
├── utils/
│   ├── cleanup.js         # File cleanup utilities
│   └── fileProcessor.js   # File processing utilities
├── uploads/               # Processed files
├── temp/                  # Temporary files
├── server.js              # Main server file
├── package.json           # Dependencies
└── README.md             # This file
```

### Running Tests
```bash
# Install test dependencies
npm install --save-dev jest supertest

# Run tests
npm test
```

### Code Quality
```bash
# Install ESLint
npm install --save-dev eslint

# Run linting
npx eslint .
```

## 🚀 Deployment

### Docker Deployment
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN mkdir -p uploads temp

EXPOSE 5000

CMD ["npm", "start"]
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/flixconvert
ALLOWED_ORIGINS=https://yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=secure_password_here
```

## 🔒 Security Features

- **Rate Limiting**: Prevents abuse with configurable limits
- **CORS Protection**: Configurable allowed origins
- **File Validation**: Strict file type and size validation
- **Helmet**: Security headers
- **Input Sanitization**: All inputs are validated and sanitized
- **Error Handling**: Comprehensive error handling without exposing sensitive information

## 📊 Monitoring

### Health Check
```http
GET /health
```

Response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "uptime": 3600,
  "environment": "production"
}
```

### Logs
The application logs important events:
- File processing start/completion
- Errors and exceptions
- Cleanup operations
- Database connections

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API examples

## 🔄 Updates

The backend automatically:
- Cleans up expired files every 6 hours
- Removes temporary files older than 1 hour
- Logs all processing activities
- Maintains file retention policies 