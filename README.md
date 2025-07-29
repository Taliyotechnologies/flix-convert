# ConvertFlix - File Compression & Conversion Platform

A modern, full-stack web application for compressing and converting various file types with a beautiful, responsive UI.

## 🚀 Features

### Core Functionality
- **File Compression**: Compress images, videos, audio files, and PDFs
- **File Conversion**: Convert between different file formats
- **User Authentication**: Secure login/signup system with JWT
- **User Dashboard**: Personal file management and statistics
- **Real-time Progress**: Live progress tracking for file operations
- **Admin Panel**: Comprehensive admin dashboard for user management

### File Support
- **Images**: JPEG, PNG, WebP, GIF, BMP
- **Videos**: MP4, AVI, MOV, MKV, WebM
- **Audio**: MP3, WAV, FLAC, AAC, OGG
- **Documents**: PDF compression and optimization

### User Experience
- **Modern UI**: Clean, responsive design with dark/light theme
- **Drag & Drop**: Intuitive file upload interface
- **Progress Tracking**: Real-time operation status
- **File Management**: Download, delete, and organize files
- **Statistics**: User dashboard with file analytics

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **React Router** for navigation
- **Axios** for API communication
- **React Icons** for beautiful icons
- **Framer Motion** for animations
- **React Hot Toast** for notifications
- **React Helmet** for SEO

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Multer** for file uploads
- **Sharp** for image processing
- **FFmpeg** for video/audio processing
- **PDF-lib** for PDF operations

### Security & Performance
- **Helmet** for security headers
- **Rate limiting** to prevent abuse
- **CORS** configuration
- **File validation** and sanitization
- **Automatic cleanup** of temporary files

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- FFmpeg (for video/audio processing)

### Backend Setup
```bash
cd backend
npm install
cp env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
# Create .env file with VITE_API_URL=http://localhost:5000
npm run dev
```

### Environment Variables

#### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/convertflix
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
TEMP_PATH=./temp
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

## 🎯 Usage

### For Users
1. **Upload Files**: Drag and drop or click to upload files
2. **Choose Operation**: Select compression or conversion options
3. **Track Progress**: Monitor real-time progress
4. **Download Results**: Get optimized files instantly
5. **Manage Files**: Use dashboard to organize your files

### For Administrators
1. **User Management**: View and manage user accounts
2. **File Analytics**: Monitor platform usage statistics
3. **System Health**: Check server status and performance
4. **Content Moderation**: Review and manage uploaded files

## 📊 Dashboard Features

### User Dashboard
- **File Statistics**: Total files, sizes, and operations
- **Recent Files**: Latest uploads with status indicators
- **File Management**: Download and delete files
- **Progress Tracking**: Real-time operation status
- **Quick Actions**: Direct access to tools

### Admin Dashboard
- **User Analytics**: User registration and activity metrics
- **File Analytics**: Platform usage statistics
- **System Monitoring**: Server health and performance
- **Content Management**: File review and moderation tools

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### File Operations
- `POST /api/compress/image` - Compress images
- `POST /api/compress/video` - Compress videos
- `POST /api/compress/audio` - Compress audio
- `POST /api/compress/pdf` - Compress PDFs
- `POST /api/convert/*` - Convert file formats

### Dashboard
- `GET /api/compress/user-files` - Get user's files
- `GET /api/compress/user-stats` - Get user statistics
- `GET /api/compress/download/:fileId` - Download file
- `DELETE /api/compress/delete/:fileId` - Delete file

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/stats` - Get platform statistics
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

## 🎨 UI Components

### Progress Tracker
- Real-time progress visualization
- Status indicators (processing, completed, failed)
- Smooth animations and transitions
- Responsive design for all devices

### File Cards
- File information display
- Action buttons (download, delete)
- Status indicators
- Hover effects and animations

### Statistics Cards
- User activity metrics
- File operation statistics
- Visual data representation
- Interactive elements

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **File Validation**: Type and size validation
- **Rate Limiting**: Prevent API abuse
- **CORS Protection**: Cross-origin security
- **Input Sanitization**: Prevent injection attacks
- **File Cleanup**: Automatic temporary file removal

## 🚀 Deployment

### Backend Deployment
```bash
# Set production environment variables
NODE_ENV=production
# Configure MongoDB connection
# Set up file storage (local or cloud)
npm start
```

### Frontend Deployment
```bash
npm run build
# Deploy dist folder to your hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@convertflix.com or create an issue in the repository.

---

**ConvertFlix** - Making file compression and conversion accessible to everyone! 🚀 