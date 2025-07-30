# ConvertFlix - File Compression & Conversion Tool

A modern, responsive web application for compressing and converting files with a clean, professional interface.

## 🚀 Features

- **File Compression**: Compress images, videos, and PDFs while maintaining quality
- **Format Conversion**: Convert between different file formats
- **Drag & Drop**: Easy file upload with drag and drop functionality
- **Real-time Processing**: See compression stats and download processed files
- **Dark/Light Theme**: Automatic theme detection with manual toggle
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Admin Dashboard**: Track file processing history and statistics

## 🛠 Tech Stack

- **Frontend**: React 19 + Vite
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Styling**: Custom CSS with CSS Variables
- **Theme**: Dark/Light mode with localStorage persistence

## 📁 Project Structure

```
flixconvert/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── contexts/        # React contexts
│   │   ├── pages/          # Page components
│   │   └── App.jsx         # Main app component
│   └── package.json
├── backend/                 # Backend API (coming soon)
└── README.md
```

## 🎯 Pages & Features

### Home Page (`/`)
- Hero section with compelling copy
- Feature cards highlighting benefits
- Statistics showcase
- Call-to-action sections

### Tools Page (`/tools`)
- Grid layout of all available tools
- Organized by categories (Compress, Convert)
- Tool cards with format support and size limits

### Tool Pages (`/tool/:type`)
- Drag & drop file upload
- File preview and processing
- Compression statistics
- Download functionality
- Advanced settings

### Authentication (`/login`, `/signup`)
- Clean form design
- Password visibility toggle
- Form validation
- Responsive layout

### Dashboard (`/dashboard`)
- File processing statistics
- File type distribution charts
- Searchable file logs table
- Bulk actions for file management

## 🎨 Design Features

- **Clean & Modern**: Minimalist design with premium feel
- **Theme Support**: Dark/light mode with system preference detection
- **Responsive**: Mobile-first design approach
- **Accessible**: Proper focus states and keyboard navigation
- **Animations**: Smooth transitions and hover effects

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flixconvert
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🎯 Key Components

### Navbar
- Fixed position with backdrop blur
- Logo, navigation links, theme toggle
- User authentication dropdown
- Responsive mobile menu

### Theme System
- CSS variables for consistent theming
- Automatic system preference detection
- localStorage persistence
- Smooth transitions

### File Upload
- Drag & drop interface
- File type validation
- Size limit enforcement
- Progress indicators

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### File Structure

```
frontend/src/
├── components/
│   ├── Navbar.jsx
│   └── Navbar.css
├── contexts/
│   └── ThemeContext.jsx
├── pages/
│   ├── Home.jsx
│   ├── Home.css
│   ├── Tools.jsx
│   ├── Tools.css
│   ├── ToolPage.jsx
│   ├── ToolPage.css
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Auth.css
│   ├── Dashboard.jsx
│   └── Dashboard.css
├── App.jsx
├── App.css
└── main.jsx
```

## 🎨 Customization

### Colors & Themes
The application uses CSS variables for easy theming:

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #1a1a1a;
  --primary-color: #4285f4;
  /* ... more variables */
}
```

### Adding New Tools
1. Add tool configuration in `ToolPage.jsx`
2. Update navigation in `Navbar.jsx`
3. Add route in `App.jsx`

## 📊 Performance

- **Lazy Loading**: Components loaded on demand
- **Optimized Images**: WebP format support
- **Minimal Dependencies**: Only essential packages
- **Efficient CSS**: CSS variables and modern techniques

## 🔒 Security

- File type validation
- Size limit enforcement
- Secure file handling
- Auto-deletion after 24 hours

## 🚀 Deployment

### Build for Production
```bash
cd frontend
npm run build
```

### Deploy to Vercel/Netlify
The build output is ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@convertflix.com or create an issue in the repository.

---

**ConvertFlix** - Professional file compression and conversion tools for everyone.
