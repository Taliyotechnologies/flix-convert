# ConvertFlix - Free File Compression & Conversion Tool

A modern, full-stack web application for compressing and converting images, videos, audio, and PDF files. Built with React, Node.js, and MongoDB.

## 🚀 Features

### File Processing
- **Image Compression**: JPEG, PNG, WebP, AVIF formats
- **Video Compression**: MP4, AVI, MOV, WebM formats  
- **Audio Compression**: MP3, AAC, OGG, WAV, FLAC formats
- **PDF Compression**: Optimize PDF files
- **Format Conversion**: Convert between different file formats
- **Up to 40% size reduction** without quality loss

### User Experience
- **Drag & Drop** file upload
- **Real-time processing** with progress indicators
- **Instant download** of processed files
- **Auto-delete** files after 24 hours for security
- **Responsive design** for mobile, tablet, and desktop
- **Dark/Light theme** with system preference detection

### Admin Features
- **Dashboard** with processing statistics
- **File management** with download/delete capabilities
- **User management** for creating admin accounts
- **Secure admin access** with JWT authentication

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **React Router DOM** for navigation
- **Custom CSS** (no UI libraries)
- **React Helmet Async** for SEO
- **Axios** for API communication

### Backend
- **Node.js** with Express
- **MongoDB Atlas** for database
- **Multer** for file uploads
- **Sharp** for image processing
- **FFmpeg** for video/audio processing
- **PDF-lib** for PDF compression
- **JWT** for authentication
- **Node-cron** for automated cleanup

## 📁 Project Structure

```
flixconvert/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   └── FileLog.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── compress.js
│   │   ├── convert.js
│   │   └── admin.js
│   ├── utils/
│   │   ├── fileProcessor.js
│   │   └── cronJobs.js
│   ├── uploads/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   └── Toast.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── CompressImage.jsx
│   │   │   ├── CompressVideo.jsx
│   │   │   ├── CompressAudio.jsx
│   │   │   ├── CompressPDF.jsx
│   │   │   ├── ConvertImage.jsx
│   │   │   ├── ConvertVideo.jsx
│   │   │   ├── ConvertAudio.jsx
│   │   │   ├── ConvertPDF.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminFiles.jsx
│   │   │   ├── AdminCreateUser.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── NotFound.jsx
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json
│   └── index.html
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- MongoDB Atlas account
- FFmpeg installed (for video/audio processing)

### Backend Setup

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Environment variables**:
   Create a `.env` file in the backend directory:
   ```
   MONGODB_URI=mongodb+srv://flixconvert_user:flixconvert123@cluster0.bscos9h.mongodb.net/flixconvert?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=flixconvert_jwt_secret_key_2024_taliyo_technologies
   PORT=5000
   ```

3. **Start the server**:
   ```bash
   npm start
   # or for development
   npm run dev
   ```

### Frontend Setup

1. **Install dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 🌐 Deployment

### Backend (Render)
- Connect your GitHub repository to Render
- Set environment variables
- Deploy to: `https://flix-convert.onrender.com`

### Frontend (Vercel)
- Connect your GitHub repository to Vercel
- Deploy to: `https://flixconvert.taliyotechnologies.com`

## 🔐 Admin Access

The admin account is hardcoded for security:
- **Email**: `harshbudhauliya882@gmail.com`
- **Password**: Set during first deployment

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/create-user` - Create user (admin only)

### Compression
- `POST /api/compress/image` - Compress images
- `POST /api/compress/video` - Compress videos
- `POST /api/compress/audio` - Compress audio
- `POST /api/compress/pdf` - Compress PDFs

### Conversion
- `POST /api/convert/image` - Convert images
- `POST /api/convert/video` - Convert videos
- `POST /api/convert/audio` - Convert audio
- `POST /api/convert/pdf` - Process PDFs

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/files` - List all files
- `GET /api/admin/files/:id/download` - Download file
- `DELETE /api/admin/files/:id` - Delete file
- `GET /api/admin/users` - List users
- `DELETE /api/admin/users/:id` - Delete user

## 🔧 Configuration

### File Size Limits
- Maximum file size: 10MB
- Supported formats vary by tool

### Security Features
- JWT token authentication
- File auto-deletion after 24 hours
- CORS protection
- Input validation and sanitization

### Cron Jobs
- **Hourly**: Clean up expired files
- **Every 6 hours**: Clean up orphaned files

## 📈 SEO Optimization

- **Meta tags** for all pages
- **Open Graph** and **Twitter Card** support
- **Structured data** (JSON-LD)
- **Sitemap** ready
- **Optimized** for "Taliyo Technologies" and "ConvertFlix" keywords

## 🎨 Design Features

- **Responsive design** for all devices
- **Dark/Light theme** with system detection
- **Custom CSS** with CSS variables
- **Smooth animations** and transitions
- **Accessibility** compliant

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Taliyo Technologies**
- Email: harshbudhauliya882@gmail.com
- Website: taliyotechnologies.com

## 🙏 Acknowledgments

- Built with modern web technologies
- Optimized for performance and user experience
- Designed for scalability and maintainability 