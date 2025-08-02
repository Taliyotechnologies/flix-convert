import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CompressImage from './pages/CompressImage'
import CompressVideo from './pages/CompressVideo'
import CompressAudio from './pages/CompressAudio'
import CompressPDF from './pages/CompressPDF'
import ConvertImage from './pages/ConvertImage'
import ConvertVideo from './pages/ConvertVideo'
import ConvertAudio from './pages/ConvertAudio'
import ConvertPDF from './pages/ConvertPDF'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminDashboard from './pages/AdminDashboard'
import AdminFiles from './pages/AdminFiles'
import AdminCreateUser from './pages/AdminCreateUser'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Toast from './components/Toast'
import { AuthProvider } from './hooks/useAuth.jsx'

// Theme context
export const ThemeContext = React.createContext()

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme
    }
    // Auto-detect system theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  const [toast, setToast] = useState(null)

  const location = useLocation()

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 5000)
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <AuthProvider>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Helmet>
        <title>ConvertFlix - Free File Compression & Conversion Tool | Taliyo Technologies</title>
        <meta name="description" content="Free online file compression and conversion tool. Compress images, videos, audio, and PDF files with up to 40% size reduction. Fast, secure, and easy to use." />
        <meta name="keywords" content="file compression, file conversion, image compression, video compression, audio compression, PDF compression, free tools, Taliyo Technologies" />
        <meta name="author" content="Taliyo Technologies" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flixconvert.taliyotechnologies.com/" />
        <meta property="og:title" content="ConvertFlix - Free File Compression & Conversion Tool" />
        <meta property="og:description" content="Free online file compression and conversion tool. Compress images, videos, audio, and PDF files with up to 40% size reduction." />
        <meta property="og:image" content="https://flixconvert.taliyotechnologies.com/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://flixconvert.taliyotechnologies.com/" />
        <meta property="twitter:title" content="ConvertFlix - Free File Compression & Conversion Tool" />
        <meta property="twitter:description" content="Free online file compression and conversion tool. Compress images, videos, audio, and PDF files with up to 40% size reduction." />
        <meta property="twitter:image" content="https://flixconvert.taliyotechnologies.com/og-image.jpg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "ConvertFlix",
          "description": "Free online file compression and conversion tool",
          "url": "https://flixconvert.taliyotechnologies.com/",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "provider": {
            "@type": "Organization",
            "name": "Taliyo Technologies",
            "url": "https://taliyotechnologies.com"
          }
        }
        `}
        </script>
      </Helmet>

      <div className="app">
        <Navbar />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home showToast={showToast} />} />
            
            {/* Compression Routes */}
            <Route path="/compress/image" element={<CompressImage showToast={showToast} />} />
            <Route path="/compress/video" element={<CompressVideo showToast={showToast} />} />
            <Route path="/compress/audio" element={<CompressAudio showToast={showToast} />} />
            <Route path="/compress/pdf" element={<CompressPDF showToast={showToast} />} />
            
            {/* Conversion Routes */}
            <Route path="/convert/image" element={<ConvertImage showToast={showToast} />} />
            <Route path="/convert/video" element={<ConvertVideo showToast={showToast} />} />
            <Route path="/convert/audio" element={<ConvertAudio showToast={showToast} />} />
            <Route path="/convert/pdf" element={<ConvertPDF showToast={showToast} />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login showToast={showToast} />} />
            <Route path="/signup" element={<Signup showToast={showToast} />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard showToast={showToast} />} />
            <Route path="/admin/files" element={<AdminFiles showToast={showToast} />} />
            <Route path="/admin/create-user" element={<AdminCreateUser showToast={showToast} />} />
            
            {/* Company Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
      </ThemeContext.Provider>
    </AuthProvider>
  )
}

export default App 