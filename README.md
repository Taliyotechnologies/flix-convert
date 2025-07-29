# 🎬 ConvertFlix - File Compression & Conversion Tool

A complete full-stack file compression and conversion service built with React, Node.js, and MongoDB.

## 🌟 Features

- **Multi-format Support**: Compress images, videos, audio files, and PDFs
- **Instant Compression**: Get results in seconds with optimized algorithms
- **40% Size Reduction**: Achieve significant file size reduction while maintaining quality
- **Auto-cleanup**: Files are automatically deleted after 24 hours
- **Admin Dashboard**: Complete file management system with statistics
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Dark/Light Theme**: Toggle between themes for better user experience

## 🛠 Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **React Router** for navigation
- **React Helmet** for SEO optimization
- **React Dropzone** for file uploads
- **React Icons** for beautiful icons
- **Custom CSS** with CSS variables for theming

### Backend
- **Node.js** with Express.js
- **MongoDB Atlas** for database
- **Sharp** for image compression
- **FFmpeg** for video/audio compression
- **PDF-lib** for PDF compression
- **JWT** for authentication
- **Multer** for file uploads
- **Node-cron** for automated cleanup

## 🚀 Live Demo

- **Frontend**: https://flixconvert.taliyotechnologies.com
- **Backend API**: https://flix-convert.onrender.com

## 📁 Project Structure

```
flixconvert/
├── backend/
│   ├── controllers/
│   │   ├── compressionController.js
│   │   └── adminController.js
│   ├── middlewares/
│   │   ├── fileUpload.js
│   │   └── auth.js
│   ├── models/
│   │   └── FileLog.js
│   ├── routes/
│   │   ├── fileRoutes.js
│   │   └── adminRoutes.js
│   ├── utils/
│   │   ├── sharpHelper.js
│   │   ├── ffmpegHelper.js
│   │   ├── pdfHelper.js
│   │   └── cleanupCron.js
│   ├── config.env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── FileUploader.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Tools.jsx
│   │   │   ├── CompressImage.jsx
│   │   │   ├── CompressVideo.jsx
│   │   │   ├── CompressAudio.jsx
│   │   │   ├── CompressPDF.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── NotFound.jsx
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   └── components.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🚀 Quick Start

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   - Copy `config.env.example` to `config.env`
   - Update MongoDB URI and other variables

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Start production server**:
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📊 API Endpoints

### File Compression
- `POST /api/files/compress` - Compress any file type
- `GET /api/files/download/:fileId` - Download compressed file
- `GET /api/files/info/:fileId` - Get file information
- `DELETE /api/files/delete/:fileId` - Delete file

### Admin Routes
- `POST /api/admin/login` - Admin login
- `GET /api/admin/dashboard/stats` - Get dashboard statistics
- `GET /api/admin/files` - Get all files with pagination
- `DELETE /api/admin/files` - Delete multiple files
- `POST /api/admin/cleanup` - Run manual cleanup
- `GET /api/admin/storage/stats` - Get storage statistics

## 🔧 Configuration

### Environment Variables

**Backend (`config.env`)**:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
```

### Database Schema

**FileLog Model**:
```javascript
{
  originalName: String,
  fileName: String,
  fileType: String, // 'image', 'video', 'audio', 'pdf'
  originalSize: Number,
  compressedSize: Number,
  compressionRatio: Number,
  uploadTime: Date,
  downloadCount: Number,
  status: String, // 'processing', 'completed', 'failed'
  error: String
}
```

## 🎯 Features in Detail

### File Compression
- **Images**: JPG, PNG, GIF, WebP, BMP, TIFF
- **Videos**: MP4, AVI, MOV, WMV, FLV, WebM, MKV, M4V
- **Audio**: MP3, WAV, AAC, FLAC, OGG, WMA, M4A
- **PDFs**: All PDF formats

### Compression Algorithms
- **Images**: Sharp library with quality optimization
- **Videos**: FFmpeg with H.264/H.265 codecs
- **Audio**: FFmpeg with AAC optimization
- **PDFs**: PDF-lib with object stream compression

### Admin Dashboard
- **Statistics**: Total files, recent uploads, downloads, storage usage
- **File Management**: View, download, delete files
- **Bulk Operations**: Select and delete multiple files
- **Real-time Updates**: Auto-refresh data

### Security Features
- **File Validation**: Type and size validation
- **Rate Limiting**: Prevent abuse
- **Auto-cleanup**: Files deleted after 24 hours
- **JWT Authentication**: Secure admin access

## 🎨 UI/UX Features

### Design System
- **Light/Dark Theme**: Toggle between themes
- **Responsive Design**: Mobile-first approach
- **Custom CSS**: No external UI libraries
- **Smooth Animations**: CSS transitions and transforms

### Components
- **FileUploader**: Drag & drop with progress tracking
- **Navbar**: Responsive navigation with theme toggle
- **Footer**: Links and social media
- **Admin Dashboard**: Complete file management interface

## 📈 Performance Optimizations

### Frontend
- **Vite**: Fast development and build times
- **Code Splitting**: Lazy-loaded components
- **Image Optimization**: WebP format support
- **SEO**: Meta tags and structured data

### Backend
- **Compression**: Gzip middleware
- **Caching**: Static file caching
- **Database Indexing**: Optimized queries
- **Error Handling**: Comprehensive error management

## 🔒 Security

- **CORS**: Configured for production domains
- **Helmet**: Security headers
- **Rate Limiting**: Prevent abuse
- **File Validation**: Type and size checks
- **JWT**: Secure authentication

## 🚀 Deployment

### Backend (Render)
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

### Frontend (Vercel)
1. Connect GitHub repository
2. Configure build settings
3. Deploy automatically

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

- **Email**: support@flixconvert.com
- **Documentation**: [API Docs](https://flixconvert.taliyotechnologies.com/api)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)

## 🙏 Acknowledgments

- **Sharp** for image processing
- **FFmpeg** for media compression
- **PDF-lib** for PDF manipulation
- **React Team** for the amazing framework
- **Vite** for the fast build tool

---

**Built with ❤️ by Taliyo Technologies**