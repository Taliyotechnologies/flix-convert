# ConvertFlix - File Compression & Conversion Platform

A full-stack file compression and conversion platform built with React, Node.js, and MongoDB. ConvertFlix allows users to compress and convert image, video, audio, and PDF files up to 10MB for free with instant results and no quality loss.

## 🚀 Features

### Core Features
- **File Compression**: Compress images, videos, audio, and PDFs
- **Format Conversion**: Convert between different file formats
- **Auto-Delete System**: Files are automatically deleted after 24 hours
- **No Registration Required**: Use tools without creating an account
- **Quality Preservation**: Advanced algorithms ensure no quality loss
- **Cross-Platform**: Works on desktop, tablet, and mobile

### Supported Formats
- **Images**: JPEG, PNG, GIF, WebP, AVIF, TIFF
- **Videos**: MP4, AVI, MOV, WMV, FLV, WebM
- **Audio**: MP3, WAV, AAC, OGG, FLAC
- **Documents**: PDF

### Admin Features
- **Dashboard Analytics**: Real-time statistics and charts
- **File Management**: View, download, and delete files
- **User Management**: Manage user accounts and roles
- **System Monitoring**: Server health and performance metrics

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **React Router** for navigation
- **Custom CSS** with CSS variables for theming
- **React Icons** for icons
- **React Dropzone** for file uploads
- **Chart.js** for analytics
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Multer** for file uploads
- **Sharp** for image processing
- **FFmpeg** for video/audio processing
- **PDF-lib** for PDF compression
- **bcryptjs** for password hashing

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- FFmpeg (for video/audio processing)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/flixconvert.git
cd flixconvert
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Setup

#### Backend Configuration
Copy the example environment file and configure it:
```bash
cd backend
cp env.example .env
```

Edit `.env` with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/flixconvert
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:5173
```

#### Frontend Configuration
The frontend is configured to proxy API calls to the backend automatically.

### 4. Start the Application

#### Development Mode
```bash
# From the root directory
npm run dev
```

This will start both the backend (port 5000) and frontend (port 5173) concurrently.

#### Production Mode
```bash
# Build the frontend
cd frontend
npm run build

# Start the backend
cd ../backend
npm start
```

## 🗄️ Database Setup

### MongoDB Connection
The application will automatically create the necessary collections when it starts. Make sure MongoDB is running and accessible.

### Initial Admin User
To create an admin user, you can either:

1. **Register normally** and then manually update the user role in the database:
```javascript
// In MongoDB shell or MongoDB Compass
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

2. **Use the API** to create an admin user programmatically.

## 🔧 Configuration

### File Size Limits
- Maximum file size: 10MB (configurable in backend)
- Supported file types are validated on both frontend and backend

### Auto-Delete System
- Files are automatically deleted after 24 hours
- MongoDB TTL index handles automatic cleanup
- Manual cleanup endpoint available for admins

### Security Features
- Rate limiting on API endpoints
- CORS protection
- Helmet.js security headers
- JWT token authentication
- Password hashing with bcrypt

## 📁 Project Structure

```
flixconvert/
├── backend/                 # Node.js backend
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   └── uploads/            # File storage
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   └── index.css       # Global styles
│   └── public/             # Static assets
└── package.json            # Root package.json
```

## 🚀 Deployment

### Backend Deployment
1. Set up a MongoDB database (MongoDB Atlas recommended)
2. Configure environment variables for production
3. Deploy to your preferred platform (Heroku, Vercel, AWS, etc.)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Configure the API URL in the frontend

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
FRONTEND_URL=https://your-domain.com
```

## 🔒 Security Considerations

- All files are automatically deleted after 24 hours
- No permanent storage of user files
- JWT tokens for authentication
- Rate limiting to prevent abuse
- Input validation and sanitization
- CORS protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/flixconvert/issues) page
2. Create a new issue with detailed information
3. Contact us at support@flixconvert.com

## 🙏 Acknowledgments

- [Sharp](https://sharp.pixelplumbing.com/) for image processing
- [FFmpeg](https://ffmpeg.org/) for video/audio processing
- [PDF-lib](https://pdf-lib.js.org/) for PDF manipulation
- [React Icons](https://react-icons.github.io/react-icons/) for icons
- [Chart.js](https://www.chartjs.org/) for analytics

---

**ConvertFlix** - Making file compression and conversion accessible to everyone. 