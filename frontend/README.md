# FlixConvert - Premium File Utility Platform

A modern, responsive file utility website built with React + TypeScript. Compress and convert images, videos, audio, and PDFs instantly - up to 10MB free.

## 🚀 Features

### Core Functionality
- **File Compression** - Reduce file sizes while maintaining quality
- **Format Conversion** - Convert between different file formats
- **Drag & Drop Upload** - Intuitive file upload interface
- **Real-time Processing** - Live progress indicators and status updates
- **Instant Downloads** - Processed files ready for immediate download

### Supported File Types
- **Images**: JPG, PNG, WebP, GIF, BMP
- **Videos**: MP4, AVI, MOV, MKV, WMV
- **Audio**: MP3, WAV, FLAC, AAC, OGG
- **Documents**: PDF to Word, Excel, Images

### Design & UX
- **Premium UI** - Clean, modern design inspired by Apple, Linear, Vercel
- **Dark/Light Theme** - Toggle between themes with localStorage persistence
- **Fully Responsive** - Mobile-first design with breakpoints
- **Smooth Animations** - Subtle hover effects and transitions
- **Accessibility** - WCAG compliant with proper ARIA labels

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Custom CSS with CSS Variables
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Inter)
- **Build Tool**: Create React App
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx      # Navigation with theme toggle
│   │   ├── Footer.tsx      # Site footer
│   │   └── LoadingSpinner.tsx # Loading component
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Landing page
│   │   ├── Tools.tsx       # Tools overview
│   │   ├── Company.tsx     # About/Contact page
│   │   ├── Login.tsx       # Authentication
│   │   ├── Signup.tsx      # User registration
│   │   ├── NotFound.tsx    # 404 page
│   │   └── tools/          # Individual tool pages
│   │       ├── CompressImage.tsx
│   │       ├── ConvertImage.tsx
│   │       ├── CompressVideo.tsx
│   │       ├── ConvertVideo.tsx
│   │       ├── CompressAudio.tsx
│   │       ├── ConvertAudio.tsx
│   │       └── ConvertPDF.tsx
│   ├── App.tsx             # Main app with routing
│   └── index.tsx           # Entry point
```

## 🎨 Design System

### Color Palette
- **Primary**: #007AFF (Blue)
- **Secondary**: #6C757D (Gray)
- **Success**: #28A745 (Green)
- **Error**: #DC3545 (Red)
- **Warning**: #FFC107 (Yellow)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Line Height**: 1.6 for body, 1.2 for headings

### Spacing
- **Base Unit**: 0.25rem (4px)
- **Container**: max-width 1200px
- **Padding**: 1rem, 1.5rem, 2rem, 3rem
- **Margins**: Consistent spacing system

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd flixconvert/frontend

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Development
```bash
# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build

# Deploy to Vercel
npm run deploy
```

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

## 🎯 Key Features

### 1. Theme System
- Light/Dark mode toggle
- localStorage persistence
- Smooth transitions
- CSS variables for theming

### 2. File Processing
- Drag & drop upload
- File type validation
- Size limits (10MB free)
- Progress indicators
- Download functionality

### 3. User Experience
- Loading states
- Error handling
- Form validation
- Accessibility features
- Mobile optimization

## 🔧 Customization

### Adding New Tools
1. Create new tool component in `src/pages/tools/`
2. Add route in `App.tsx`
3. Update navigation and footer links
4. Add tool to Tools overview page

### Styling
- CSS variables for theming
- Component-specific CSS files
- Responsive design patterns
- Animation utilities

## 📈 Performance

- **Lazy Loading**: Components loaded on demand
- **Optimized Images**: WebP format with fallbacks
- **Minified CSS**: Production builds optimized
- **CDN Ready**: Static assets optimized for CDN

## 🔒 Security

- **File Validation**: Type and size checking
- **XSS Protection**: Input sanitization
- **HTTPS Ready**: Secure deployment configuration
- **Privacy First**: No file storage on server

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Other Platforms
- **Netlify**: `npm run build` → deploy `build/` folder
- **GitHub Pages**: Configure in package.json
- **AWS S3**: Upload build folder to S3 bucket

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- **Icons**: Lucide React
- **Fonts**: Google Fonts (Inter)
- **Design Inspiration**: Apple, Linear, Vercel, Stripe

---

**Built with ❤️ for the community**
