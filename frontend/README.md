# ConvertFlix Frontend

A modern, responsive React application for file compression and conversion tools. Built with Vite, React Router, and custom CSS.

## Features

- 🎨 **Modern UI/UX**: Clean, responsive design with dark/light theme support
- 📱 **Mobile-First**: Fully responsive across all devices
- 🌙 **Theme Support**: Automatic system theme detection with manual toggle
- 🛠 **File Processing**: Drag & drop file upload with preview
- 📊 **Admin Dashboard**: File logs, statistics, and management tools
- 🔒 **Security**: File encryption and automatic deletion after 24 hours
- ⚡ **Performance**: Optimized with Vite for fast development and builds

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **React Helmet Async** - SEO and meta tag management
- **Custom CSS** - No external UI libraries, fully custom design
- **LocalStorage** - Theme persistence

## Pages

- `/` - Home page with hero section and features
- `/tools` - All tools page with category filtering
- `/tool/:type` - Individual tool pages (compress-image, convert-audio, etc.)
- `/login` - User authentication
- `/signup` - User registration
- `/dashboard` - Admin panel with file logs and statistics
- `/company` - About page with team and company information

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

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

4. Open your browser and visit `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   ├── contexts/
│   │   └── ThemeContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── Tools.jsx
│   │   ├── Tools.css
│   │   ├── ToolPage.jsx
│   │   ├── ToolPage.css
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Auth.css
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── Company.jsx
│   │   └── Company.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Features Overview

### Theme System
- Automatic system theme detection
- Manual theme toggle in navbar
- Persistent theme preference in localStorage
- Smooth transitions between themes

### File Processing
- Drag & drop file upload
- File type validation
- File size limits (10MB)
- Image preview for supported formats
- Processing simulation with progress
- Download processed files

### Responsive Design
- Mobile-first approach
- Breakpoints: 480px, 768px, 1200px
- Flexible grid layouts
- Touch-friendly interactions

### SEO Optimization
- Dynamic meta tags with React Helmet
- Semantic HTML structure
- Alt tags for images
- Proper heading hierarchy

## Customization

### Colors and Themes
Edit CSS variables in `src/index.css`:

```css
:root {
  --bg-primary: #f8f8f8;
  --bg-secondary: #ffffff;
  --text-primary: #1a1a1a;
  --accent-primary: #3b82f6;
  /* ... more variables */
}
```

### Adding New Tools
1. Add tool configuration in `src/pages/Tools.jsx`
2. Create tool-specific logic in `src/pages/ToolPage.jsx`
3. Update routing in `src/App.jsx`

## Development

### Code Style
- Use functional components with hooks
- Prefer CSS modules or component-specific CSS files
- Follow React best practices
- Use semantic HTML elements

### Performance
- Lazy load components when needed
- Optimize images and assets
- Use React.memo for expensive components
- Minimize bundle size

## Deployment

The application can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for automatic deployment
- **AWS S3**: Upload the `dist` folder to an S3 bucket

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email hello@convertflix.com or create an issue in the repository. 