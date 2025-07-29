# ConvertFlix Backend

A powerful Node.js backend for the ConvertFlix file compression and conversion platform.

## 🚀 Features

- **File Compression**: Images, videos, audio, and PDFs
- **Format Conversion**: Convert between different file formats
- **User Authentication**: JWT-based authentication system
- **Admin Dashboard**: Complete admin panel with analytics
- **Auto Cleanup**: Automatic deletion of expired files
- **Rate Limiting**: API rate limiting for security
- **File Validation**: Comprehensive file type and size validation

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
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

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd flixconvert/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp env.example .env
```

Edit `.env` file with your configuration:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/convertflix

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
TEMP_PATH=./temp

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

4. **Start MongoDB**
```bash
# Make sure MongoDB is running
mongod
```

5. **Run the server**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📁 Project Structure

```
backend/
├── models/           # MongoDB schemas
│   ├── User.js      # User model
│   └── File.js      # File model
├── routes/           # API routes
│   ├── auth.js       # Authentication routes
│   ├── compress.js   # Compression routes
│   ├── convert.js    # Conversion routes
│   └── admin.js      # Admin routes
├── middleware/       # Custom middleware
│   ├── auth.js       # Authentication middleware
│   └── upload.js     # File upload middleware
├── utils/            # Utility functions
│   └── cleanup.js    # File cleanup utility
├── uploads/          # Processed files (auto-created)
├── temp/             # Temporary files (auto-created)
├── server.js         # Main server file
├── package.json      # Dependencies
└── README.md         # This file
```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user profile |
| PUT | `/api/auth/profile` | Update user profile |
| PUT | `/api/auth/password` | Change password |

### File Compression

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/compress/image` | Compress image file |
| POST | `/api/compress/video` | Compress video file |
| POST | `/api/compress/audio` | Compress audio file |
| POST | `/api/compress/pdf` | Compress PDF file |

### File Conversion

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/convert/image` | Convert image format |
| POST | `/api/convert/video` | Convert video format |
| POST | `/api/convert/audio` | Convert audio format |

### Admin (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Get dashboard statistics |
| GET | `/api/admin/files` | Get all files with pagination |
| GET | `/api/admin/files/:id` | Get specific file details |
| DELETE | `/api/admin/files/:id` | Delete a file |
| POST | `/api/admin/files/cleanup` | Clean up expired files |
| GET | `/api/admin/users` | Get all users |
| PUT | `/api/admin/users/:id/status` | Toggle user status |
| GET | `/api/admin/analytics` | Get analytics data |

## 📊 File Processing

### Supported Formats

**Images:**
- Input: JPEG, PNG, WebP, GIF, BMP
- Output: JPEG, PNG, WebP, GIF, BMP
- Compression: Quality-based compression

**Videos:**
- Input: MP4, AVI, MOV, WMV, FLV, WebM, MKV
- Output: MP4, AVI, MOV, WMV, FLV, WebM, MKV
- Compression: CRF-based compression

**Audio:**
- Input: MP3, WAV, FLAC, AAC, OGG, M4A
- Output: MP3, WAV, FLAC, AAC, OGG, M4A
- Compression: Bitrate-based compression

**PDFs:**
- Input: PDF
- Output: PDF
- Compression: Metadata removal and optimization

### File Size Limits

- Maximum file size: 10MB (configurable)
- Files are automatically deleted after 24 hours
- Temporary files are cleaned up after 1 hour

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Protected Routes

To access protected routes, include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Admin Access

Admin routes require both authentication and admin role. To create an admin user:

1. Register a normal user
2. Manually update the user's role in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## 🧹 File Cleanup

The system automatically cleans up expired files. You can also run manual cleanup:

```bash
# Run cleanup utility
node utils/cleanup.js
```

### Cleanup Features

- **Expired Files**: Files older than 24 hours are automatically deleted
- **Temporary Files**: Files in temp directory older than 1 hour are cleaned up
- **Storage Statistics**: Provides detailed storage usage information

## 📈 Monitoring

### Health Check

```bash
GET /api/health
```

Response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600
}
```

### Error Handling

All API endpoints return consistent error responses:

```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 5000 | Server port |
| `NODE_ENV` | development | Environment mode |
| `MONGODB_URI` | mongodb://localhost:27017/convertflix | MongoDB connection string |
| `JWT_SECRET` | - | JWT secret key (required) |
| `JWT_EXPIRES_IN` | 7d | JWT expiration time |
| `MAX_FILE_SIZE` | 10485760 | Maximum file size in bytes (10MB) |
| `UPLOAD_PATH` | ./uploads | Directory for processed files |
| `TEMP_PATH` | ./temp | Directory for temporary files |
| `CORS_ORIGIN` | http://localhost:3000 | Allowed CORS origin |
| `RATE_LIMIT_WINDOW_MS` | 900000 | Rate limit window (15 minutes) |
| `RATE_LIMIT_MAX_REQUESTS` | 100 | Maximum requests per window |

## 🚀 Deployment

### Production Setup

1. **Set environment variables**
```bash
NODE_ENV=production
JWT_SECRET=your-super-secure-secret-key
MONGODB_URI=your-production-mongodb-uri
```

2. **Install dependencies**
```bash
npm install --production
```

3. **Start the server**
```bash
npm start
```

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

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue on GitHub. 