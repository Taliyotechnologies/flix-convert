# ConvertFlix - Free File Compression & Conversion Tool

A modern, responsive web application for compressing and converting files instantly. Built with React, Vite, and custom CSS.

## 🚀 Features

### Core Functionality
- **File Compression**: Reduce file sizes while maintaining quality
- **Format Conversion**: Convert between different file formats
- **Drag & Drop**: Intuitive file upload interface
- **Real-time Preview**: Preview images, videos, and audio files
- **Progress Tracking**: Visual feedback during processing
- **Download Management**: Easy file downloads with expiry notices

### Supported Formats
- **Images**: JPG, PNG, WebP, GIF, BMP, TIFF
- **Videos**: MP4, AVI, MOV, MKV, WebM
- **Audio**: MP3, WAV, AAC, OGG, FLAC
- **Documents**: PDF

### User Experience
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Dark/Light Theme**: Automatic theme detection with manual toggle
- **Modern UI**: Clean, premium design with smooth animations
- **Accessibility**: Keyboard navigation and screen reader support

### Admin Features
- **Dashboard**: Real-time statistics and analytics
- **File Management**: Advanced file search, filter, and bulk operations
- **User Management**: User roles, permissions, and activity monitoring
- **Analytics**: Traffic overview, performance metrics, and storage usage
- **System Settings**: Application configuration and system information
- **Export Tools**: CSV and report generation
- **Security**: Role-based access control and audit logs

## 🛠 Tech Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router DOM
- **Styling**: Custom CSS with CSS Variables
- **SEO**: React Helmet
- **State Management**: React Context API
- **Build Tool**: Vite

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/flixconvert.git
   cd flixconvert
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx      # Navigation component
│   └── Navbar.css
├── contexts/           # React contexts
│   └── ThemeContext.jsx # Theme management
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Home.css
│   ├── Tools.jsx       # Tools listing
│   ├── Tools.css
│   ├── ToolPage.jsx    # Individual tool page
│   ├── ToolPage.css
│   ├── Login.jsx       # Authentication
│   ├── SignUp.jsx
│   ├── Auth.css
│   ├── Dashboard.jsx   # User dashboard
│   ├── Dashboard.css
│   ├── AdminPanel.jsx  # Admin panel
│   └── AdminPanel.css
├── App.jsx             # Main app component
├── App.css
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## 🎨 Design System

### Color Scheme
- **Light Theme**: Clean whites and grays
- **Dark Theme**: Navy and dark grays
- **Accent Colors**: Blue primary, green success, red error

### Typography
- **Font Family**: System fonts (San Francisco, Segoe UI, etc.)
- **Font Weights**: 400, 500, 600, 700, 800
- **Responsive**: Scales appropriately on all devices

### Components
- **Cards**: Elevated with subtle shadows
- **Buttons**: Primary and secondary variants
- **Forms**: Clean inputs with validation
- **Tables**: Responsive with hover effects

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, email support@flixconvert.com or create an issue in this repository.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Vercel will automatically detect the Vite configuration
3. Deploy with zero configuration

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Manual Deployment
1. Run `npm run build`
2. Upload the `dist` folder to your web server
3. Configure your server for SPA routing

## 🔐 Admin Panel Access

### Admin Panel URL
- **Production**: `https://flixconvert.com/admin`
- **Development**: `http://localhost:3000/admin`

### Admin Features
- **Dashboard**: Real-time statistics and file processing metrics
- **File Management**: Search, filter, delete, and export file logs
- **User Management**: Manage user accounts, roles, and permissions
- **Analytics**: Traffic overview, performance metrics, and storage usage
- **System Settings**: Configure application settings and view system info
- **Security**: Role-based access control with admin-only features

### SEO Configuration
- **Admin Panel**: Blocked from search engines (`noindex, nofollow`)
- **Sitemap**: Includes all public pages with proper priorities
- **Robots.txt**: Blocks sensitive areas while allowing public content
- **Meta Tags**: Optimized for search engines and social sharing

### Search Engine Optimization
- **Sitemap**: `https://flixconvert.com/sitemap.xml`
- **Robots.txt**: `https://flixconvert.com/robots.txt`
- **Admin Panel**: Protected from search engine indexing
- **Public Pages**: Fully optimized for SEO

## 🔒 Security Features

- **File Validation**: Type and size checking
- **Automatic Cleanup**: Files deleted after 24 hours
- **HTTPS Only**: Secure file transfers
- **Input Sanitization**: XSS protection

## 📊 Performance

- **Lazy Loading**: Images and components
- **Code Splitting**: Route-based splitting
- **Optimized Assets**: Compressed images and fonts
- **Caching**: Browser and CDN caching strategies

---

Built with ❤️ by the ConvertFlix team 