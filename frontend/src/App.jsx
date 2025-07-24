import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Compress from './pages/Compress';
import CompressImage from './pages/CompressImage';
import CompressVideo from './pages/CompressVideo';
import CompressPDF from './pages/CompressPDF';
import CompressAudio from './pages/CompressAudio';
import Convert from './pages/Convert';
import ConvertImage from './pages/ConvertImage';
import ConvertVideo from './pages/ConvertVideo';
import ConvertPDF from './pages/ConvertPDF';
import ConvertAudio from './pages/ConvertAudio';
import './App.css';

function App() {
  // Theme state: 'light' | 'dark'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`app-container ${theme}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Router>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <div style={{ flex: 1, width: '100%' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/compress" element={<Compress />} />
            <Route path="/compress/image" element={<CompressImage />} />
            <Route path="/compress/video" element={<CompressVideo />} />
            <Route path="/compress/pdf" element={<CompressPDF />} />
            <Route path="/compress/audio" element={<CompressAudio />} />
            <Route path="/convert" element={<Convert />} />
            <Route path="/convert/image" element={<ConvertImage />} />
            <Route path="/convert/video" element={<ConvertVideo />} />
            <Route path="/convert/pdf" element={<ConvertPDF />} />
            <Route path="/convert/audio" element={<ConvertAudio />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
