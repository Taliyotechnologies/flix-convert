# ConvertFlix - File Compression & Conversion Tool

A full-stack web application for compressing and converting files online. Built with React, Node.js, Express, and MongoDB.

## 🌟 Features

- **File Compression**: Compress images, videos, audio, and PDFs
- **Format Conversion**: Convert files to different formats
- **Drag & Drop**: Easy file upload with drag & drop support
- **Real-time Processing**: See compression results instantly
- **Admin Dashboard**: Manage all processed files
- **Auto-cleanup**: Files automatically deleted after 24 hours
- **Responsive Design**: Works on all devices
- **Dark/Light Mode**: Theme switching with system preference detection

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- React Router DOM
- Custom CSS (no external UI libraries)
- React Helmet for SEO

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Multer (file upload)
- Sharp (image processing)
- FFmpeg (video/audio processing)
- PDF-lib (PDF processing)
- JWT (authentication)
- node-cron (auto-cleanup)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB Atlas account
- FFmpeg installed (for video/audio processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flixconvert
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` file in backend directory:
   ```env
   MONGODB_URI=mongodb+srv://flixconvert_user:flixconvert123@cluster0.bscos9h.mongodb.net/flixconvert?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=your-secret-key
   PORT=5000
   ```

5. **Start the development servers**

   Backend:
   ```bash
   cd backend
   npm run dev
   ```

   Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
flixconvert/
├── backend/                 # Node.js + Express API
│   ├── controllers/        # Route controllers
│   ├── middlewares/        # Auth & upload middleware
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── utils/             # File processing utilities
│   ├── uploads/           # Processed files storage
│   └── server.js          # Main server file
├── frontend/              # React + Vite application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── pages/         # Page components
│   │   └── App.jsx        # Main app component
│   ├── vercel.json        # Vercel deployment config
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Compression
- `POST /api/compress/image` - Compress images
- `POST /api/compress/video` - Compress videos
- `POST /api/compress/audio` - Compress audio
- `POST /api/compress/pdf` - Compress PDFs

### Conversion
- `POST /api/convert/image` - Convert images
- `POST /api/convert/video` - Convert videos
- `POST /api/convert/audio` - Convert audio
- `POST /api/convert/pdf` - Convert PDFs

### Admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/files` - List all files
- `GET /api/admin/files/:id/download` - Download file
- `DELETE /api/admin/files/:id` - Delete file
- `GET /api/admin/stats` - Get statistics

## 🌐 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy!

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables
5. Deploy!

## 🔐 Admin Access

Default admin credentials:
- Username: `admin`
- Password: `admin123`

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support, email support@flixconvert.com or create an issue on GitHub. 