# ConvertFlix

A full-stack web application for compressing and converting files (images, videos, audio, PDFs) with a secure admin panel.

## Features

- **File Compression**: Compress images, videos, audio, and PDFs up to 80% smaller
- **Format Conversion**: Convert between different file formats
- **Drag & Drop Upload**: Easy file upload with drag and drop support
- **Admin Panel**: Secure admin dashboard to manage all processed files
- **Auto Cleanup**: Files are automatically deleted after 24 hours
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Dark/Light Mode**: Theme switching with system auto-detection

## Tech Stack

### Backend
- **Node.js** + **Express**
- **MongoDB Atlas** for database
- **Multer** for file uploads
- **Sharp** for image processing
- **FFmpeg** for video/audio processing
- **PDF-lib** for PDF processing
- **JWT** for authentication
- **node-cron** for automated cleanup

### Frontend
- **React** + **Vite**
- **React Router** for navigation
- **Lucide React** for icons
- **Custom CSS** with CSS variables for theming

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- FFmpeg installed on your system

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `env.example`:
```bash
cp env.example .env
```

4. Update the `.env` file with your MongoDB connection string and other settings:
```env
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/flixconvert?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
PORT=5000
NODE_ENV=development
```

5. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

### For Users
1. Visit the homepage and choose a tool
2. Drag and drop your file or click to browse
3. For conversion tools, select your desired output format
4. Click "Process File" to compress/convert
5. Download your processed file
6. Files are automatically deleted after 24 hours

### For Admins
1. Go to `/login` and use the default credentials:
   - Username: `admin`
   - Password: `admin123`
2. Access the admin dashboard at `/admin`
3. View all processed files with statistics
4. Download or delete files as needed
5. Monitor file types and storage savings

## API Endpoints

### Compression
- `POST /api/compress/image` - Compress images
- `POST /api/compress/video` - Compress videos
- `POST /api/compress/audio` - Compress audio files
- `POST /api/compress/pdf` - Compress PDFs

### Conversion
- `POST /api/convert/image` - Convert image formats
- `POST /api/convert/video` - Convert video formats
- `POST /api/convert/audio` - Convert audio formats
- `POST /api/convert/pdf` - Convert PDF to images

### Admin (Protected)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/files` - Get all files with pagination
- `GET /api/admin/files/:id/download` - Download file
- `DELETE /api/admin/files/:id` - Delete file
- `GET /api/admin/stats` - Get statistics

## File Size Limits

- Maximum file size: **10MB**
- Supported formats:
  - **Images**: JPEG, PNG, WebP, GIF
  - **Videos**: MP4, AVI, MOV, WMV, FLV, WebM
  - **Audio**: MP3, WAV, OGG, M4A, AAC
  - **PDFs**: PDF files

## Security Features

- JWT-based authentication for admin routes
- File type validation
- File size limits
- Automatic file cleanup
- CORS protection
- Helmet.js security headers

## Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Ensure MongoDB Atlas is accessible
3. Install FFmpeg on your server
4. Deploy using your preferred method (Heroku, Vercel, etc.)

### Frontend Deployment
1. Update API endpoints to point to your backend
2. Build the project: `npm run build`
3. Deploy the `dist` folder to your hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on GitHub or contact the development team. 