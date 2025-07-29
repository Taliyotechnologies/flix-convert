import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Tools from './pages/Tools'
import CompressImage from './pages/CompressImage'
import CompressVideo from './pages/CompressVideo'
import CompressAudio from './pages/CompressAudio'
import CompressPDF from './pages/CompressPDF'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import NotFound from './pages/NotFound'
import './styles/components.css'

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('flixconvert-theme')
    return savedTheme || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('flixconvert-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="app">
      <Helmet>
        <title>ConvertFlix - File Compression & Conversion Tool</title>
        <meta name="description" content="Compress and convert any file type (Image, Video, Audio, PDF) with instant compression and 40% size reduction. Free online file compression tool." />
        <meta name="keywords" content="file compression, image compression, video compression, audio compression, PDF compression, online tools, file converter" />
        <link rel="canonical" href="https://flixconvert.taliyotechnologies.com" />
      </Helmet>

      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/compress/image" element={<CompressImage />} />
          <Route path="/compress/video" element={<CompressVideo />} />
          <Route path="/compress/audio" element={<CompressAudio />} />
          <Route path="/compress/pdf" element={<CompressPDF />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App