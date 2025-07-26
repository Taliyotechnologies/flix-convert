# FlixConvert - Modern Media Conversion Platform

A beautiful, modern web application for converting and compressing media files with a sleek glassmorphism UI design.

## 🚀 Features

### Core Functionality
- **Video Conversion**: Convert videos between multiple formats (MP4, AVI, MOV, MKV, WMV, FLV, WebM)
- **Image Conversion**: Transform images to various formats (JPG, PNG, GIF, BMP, WebP, SVG)
- **Image Compression**: Reduce file sizes while maintaining quality
- **Audio Conversion**: Convert audio files between different formats
- **PDF Conversion**: Convert PDFs to different formats

### User Experience
- **Modern UI**: Beautiful glassmorphism design with smooth animations
- **Drag & Drop**: Intuitive file upload with drag and drop support
- **Real-time Progress**: Live progress tracking for conversions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **User Authentication**: Secure login and signup system

### Technical Features
- **React 19**: Built with the latest React version
- **TypeScript**: Full type safety throughout the application
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful, consistent icons
- **React Router**: Client-side routing
- **Modern CSS**: Glassmorphism effects and responsive design

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **CSS3** - Styling with glassmorphism effects

### Backend (Planned)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Multer** - File upload handling
- **FFmpeg** - Media processing
- **Sharp** - Image processing
- **MongoDB** - Database

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flixconvert
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Backend Setup (Coming Soon)

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

## 🎯 Usage

### Converting Files
1. Navigate to the "Convert" page
2. Drag and drop your files or click to browse
3. Select your desired output format
4. Choose quality settings
5. Wait for the conversion to complete
6. Download your converted file

### Compressing Images
1. Navigate to the "Compress" page
2. Upload your images
3. Adjust compression settings:
   - Quality level (10-100%)
   - Maintain aspect ratio
   - Maximum dimensions
4. Monitor compression progress
5. Download compressed images

### User Account
- **Demo Login**: Use `demo@example.com` / `password` to test the application
- **Sign Up**: Create a new account for full features
- **Profile Management**: Manage your conversion history and settings

## 🎨 Design System

### Color Palette
- **Primary**: Purple/Indigo gradient (#667eea to #764ba2)
- **Accent**: Gold (#fbbf24)
- **Background**: Dark gradient with glassmorphism
- **Text**: White and light gray variants

### Components
- **Glass Cards**: Translucent cards with backdrop blur
- **Gradient Buttons**: Primary and secondary button styles
- **Progress Indicators**: Animated progress bars
- **Status Badges**: Color-coded status indicators

### Animations
- **Page Transitions**: Smooth fade-in animations
- **Hover Effects**: Subtle transform and shadow effects
- **Loading States**: Spinner animations
- **Micro-interactions**: Button and card hover effects

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full feature set with multi-column layouts
- **Tablet**: Adapted layouts with touch-friendly interactions
- **Mobile**: Single-column layouts with mobile-optimized navigation

## 🔧 Development

### Project Structure
```
flixconvert/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   └── Navbar.css
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Home.css
│   │   │   ├── Convert.tsx
│   │   │   ├── Convert.css
│   │   │   ├── Compress.tsx
│   │   │   ├── CompressImage.css
│   │   │   ├── About.tsx
│   │   │   ├── About.css
│   │   │   ├── Contact.tsx
│   │   │   ├── Contact.css
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   └── Auth.css
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── index.tsx
│   ├── package.json
│   └── README.md
├── backend/ (Coming Soon)
└── README.md
```

### Available Scripts

#### Frontend
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Code Style
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (recommended)
- **Component Structure**: Functional components with hooks

## 🚀 Deployment

### Frontend Deployment
1. **Build the application**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to your preferred platform**
   - **Vercel**: Connect your GitHub repository
   - **Netlify**: Drag and drop the build folder
   - **AWS S3**: Upload build files to S3 bucket
   - **Firebase**: Use Firebase Hosting

### Environment Variables
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENVIRONMENT=development
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Create React App** - Project scaffolding
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Router** - Routing solution
- **Glassmorphism Design** - UI inspiration

## 📞 Support

- **Email**: support@flixconvert.com
- **Documentation**: [Coming Soon]
- **Issues**: [GitHub Issues](https://github.com/yourusername/flixconvert/issues)

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Frontend UI/UX
- ✅ Responsive design
- ✅ User authentication UI
- ✅ File upload interface
- ✅ Progress tracking

### Phase 2 (Next)
- 🔄 Backend API development
- 🔄 File processing integration
- 🔄 Database setup
- 🔄 User authentication backend

### Phase 3 (Future)
- 📋 Advanced conversion options
- 📋 Batch processing
- 📋 Cloud storage integration
- 📋 API rate limiting
- 📋 Analytics dashboard

---

**Made with ❤️ by the FlixConvert Team** 