# 🎯 ConvertFlix - File Compression & Conversion Platform

A full-stack file compression and conversion platform built with React, Node.js, and MongoDB. ConvertFlix allows users to upload and compress/convert image, video, audio, and PDF files up to 10MB for free with instant results and no quality loss.

## ✨ Features

### 🎨 Frontend (React + Vite)
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Theme**: Auto-detects system preference with manual toggle
- **Modern UI**: Clean, premium design with smooth animations
- **File Upload**: Drag & drop interface with progress tracking
- **Real-time Processing**: Live status updates during file processing
- **Admin Dashboard**: Protected admin panel with analytics and file management

### 🔧 Backend (Node.js + Express)
- **File Processing**: Support for images, videos, audio, and PDFs
- **Compression**: Optimized algorithms for each file type
- **Conversion**: Convert between different formats
- **Auto-cleanup**: Files automatically deleted after 24 hours
- **Rate Limiting**: Protection against abuse
- **Security**: JWT authentication, input validation, CORS

### 📊 Database (MongoDB)
- **File Tracking**: Complete audit trail of all processed files
- **User Management**: Registration, login, and profile management
- **Analytics**: Detailed statistics and usage metrics
- **Auto-expiry**: Database cleanup for expired files

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- FFmpeg (for video/audio processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd convertflix
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. **Environment Setup**
   ```bash
   # Copy environment example
   cp env.example .env
   
   # Edit .env with your configuration
   nano .env
   ```

4. **Start the application**
   ```bash
   # Development mode (both frontend and backend)
   npm run dev
   
   # Or start separately
   npm run server    # Backend only
   npm run client    # Frontend only
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Admin Dashboard: http://localhost:5173/admin

## 📁 Project Structure

```
convertflix/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── pages/         # Page components
│   │   └── ...
│   └── ...
├── server/                 # Node.js backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── utils/             # Utility functions
│   └── uploads/           # File storage
├── package.json           # Root package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/convertflix

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./server/uploads

# Security Configuration
CORS_ORIGIN=http://localhost:5173,http://localhost:3000

# Admin Configuration
ADMIN_EMAIL=admin@convertflix.com
ADMIN_PASSWORD=admin123

# Cleanup Configuration
CLEANUP_INTERVAL=3600000
FILE_EXPIRY_HOURS=24
```

### FFmpeg Installation

For video and audio processing, install FFmpeg:

**Windows:**
```bash
# Using chocolatey
choco install ffmpeg

# Or download from https://ffmpeg.org/download.html
```

**macOS:**
```bash
# Using homebrew
brew install ffmpeg
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install ffmpeg

# CentOS/RHEL
sudo yum install ffmpeg
```

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### File Compression
- `POST /api/compress/image` - Compress images
- `POST /api/compress/video` - Compress videos
- `POST /api/compress/audio` - Compress audio
- `POST /api/compress/pdf` - Compress PDFs

### File Conversion
- `POST /api/convert/image` - Convert image formats
- `POST /api/convert/video` - Convert video formats
- `POST /api/convert/audio` - Convert audio formats

### Admin (Protected)
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/files` - List all files
- `DELETE /api/admin/files/:id` - Delete file
- `GET /api/admin/analytics` - Analytics data
- `GET /api/admin/users` - User management

## 🎨 Features in Detail

### File Processing
- **Image Compression**: JPEG, PNG, WebP, GIF support
- **Video Compression**: MP4, AVI, MOV, WMV, FLV, MKV, WebM
- **Audio Compression**: MP3, WAV, AAC, OGG, FLAC, M4A
- **PDF Compression**: Optimize PDF file size
- **Format Conversion**: Convert between supported formats

### Security Features
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Sanitize all inputs
- **File Type Validation**: Secure file uploads
- **Auto-cleanup**: Automatic file deletion

### Admin Features
- **Dashboard**: Real-time statistics and charts
- **File Management**: View, search, and delete files
- **User Management**: Manage user accounts and roles
- **Analytics**: Detailed usage metrics and trends
- **System Monitoring**: Storage and performance stats

## 🚀 Deployment

### Production Build
```bash
# Build frontend
cd client
npm run build

# Start production server
npm start
```

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
CORS_ORIGIN=https://yourdomain.com
```

### Docker Deployment
```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/convertflix/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🎯 Roadmap

- [ ] Cloud storage integration (AWS S3, Google Cloud)
- [ ] Batch file processing
- [ ] Advanced compression options
- [ ] API rate limiting tiers
- [ ] Webhook notifications
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

---

**Built with ❤️ by the ConvertFlix Team** 