# ConvertFlix - File Compression & Conversion Platform

A full-stack web application for compressing and converting files (images, videos, audio, PDFs) with high performance and modern UI.

## 🌟 Features

- **File Compression**: Reduce file sizes by up to 40% while maintaining quality
- **Multiple Formats**: Support for images, videos, audio, and PDF files
- **Real-time Processing**: Instant compression with progress indicators
- **Admin Dashboard**: Complete file management with statistics and charts
- **Auto Cleanup**: Files automatically deleted after 24 hours
- **Responsive Design**: Works perfectly on mobile and desktop
- **Dark/Light Mode**: Premium theme with smooth transitions

## 🚀 Live Demo

- **Frontend**: https://flixconvert.taliyotechnologies.com
- **Backend API**: https://flix-convert.onrender.com

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **React Router** for navigation
- **Recharts** for data visualization
- **React Dropzone** for file uploads
- **Custom CSS** with CSS variables for theming

### Backend
- **Node.js** with Express.js
- **MongoDB Atlas** for database
- **Sharp** for image compression
- **FFmpeg** for video/audio compression
- **PDF-lib** for PDF compression
- **Multer** for file uploads
- **JWT** for authentication
- **Node-cron** for scheduled cleanup

## 📁 Project Structure

```
flixconvert/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   └── ...
│   └── package.json
├── backend/                 # Node.js backend
│   ├── routes/             # API routes
│   ├── models/             # MongoDB schemas
│   ├── uploads/            # Compressed files storage
│   └── package.json
└── package.json            # Root package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- FFmpeg installed (for video/audio compression)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flixconvert
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   Create `.env` file in backend directory:
   ```env
   MONGODB_URI=mongodb+srv://flixconvert_user:flixconvert123@cluster0.bscos9h.mongodb.net/flixconvert
   JWT_SECRET=your-secret-key
   PORT=5000
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 📊 API Endpoints

### Compression APIs
- `POST /api/compress/image` - Compress images
- `POST /api/compress/video` - Compress videos
- `POST /api/compress/audio` - Compress audio files
- `POST /api/compress/pdf` - Compress PDF files

### Admin APIs
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/files` - Get all files with stats
- `GET /api/admin/download/:fileId` - Download compressed file
- `DELETE /api/admin/delete/:fileId` - Delete file
- `GET /api/admin/stats` - Get dashboard statistics

## 🔐 Admin Access

- **Username**: `admin`
- **Password**: `password`
- **URL**: `/admin/login`

## 🎨 UI Features

### Design System
- **Colors**: Modern color palette with CSS variables
- **Typography**: Inter font from Google Fonts
- **Components**: Reusable, responsive components
- **Animations**: Smooth transitions and hover effects

### Responsive Design
- Mobile-first approach
- Breakpoints: 480px, 768px, 1200px
- Touch-friendly interactions
- Optimized for all screen sizes

## 🔧 Configuration

### File Size Limits
- Maximum file size: 100MB per file
- Supported formats: JPG, PNG, GIF, WebP, MP4, AVI, MOV, WMV, FLV, MP3, WAV, FLAC, AAC, OGG, PDF

### Compression Settings
- **Images**: JPEG quality 80%, progressive encoding
- **Videos**: H.264 codec, CRF 28, AAC audio 128k
- **Audio**: MP3 format, 128k bitrate, 44.1kHz sample rate
- **PDFs**: Object streams enabled, metadata optimization

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

### Backend (Render/Railway)
```bash
cd backend
npm start
# Set environment variables
```

## 📈 Performance

- **Compression Ratio**: 20-40% size reduction
- **Processing Time**: < 30 seconds for most files
- **Auto Cleanup**: Files deleted after 24 hours
- **Database**: MongoDB Atlas with indexes for fast queries

## 🔒 Security

- JWT authentication for admin routes
- File type validation
- Size limits enforcement
- CORS configuration
- Input sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Sharp for image processing
- FFmpeg for video/audio compression
- PDF-lib for PDF manipulation
- Recharts for data visualization
- MongoDB Atlas for database hosting

---

**Built with ❤️ by the ConvertFlix Team**