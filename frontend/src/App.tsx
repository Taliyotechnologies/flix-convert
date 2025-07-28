import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Tools from './pages/Tools';
import CompressImage from './pages/tools/CompressImage';
import ConvertImage from './pages/tools/ConvertImage';
import CompressVideo from './pages/tools/CompressVideo';
import ConvertVideo from './pages/tools/ConvertVideo';
import CompressAudio from './pages/tools/CompressAudio';
import ConvertAudio from './pages/tools/ConvertAudio';
import ConvertPDF from './pages/tools/ConvertPDF';
import Company from './pages/Company';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Router>
      <div className="App">
        <Navbar theme={theme} setTheme={setTheme} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/compress-image" element={<CompressImage />} />
            <Route path="/tools/convert-image" element={<ConvertImage />} />
            <Route path="/tools/compress-video" element={<CompressVideo />} />
            <Route path="/tools/convert-video" element={<ConvertVideo />} />
            <Route path="/tools/compress-audio" element={<CompressAudio />} />
            <Route path="/tools/convert-audio" element={<ConvertAudio />} />
            <Route path="/tools/convert-pdf" element={<ConvertPDF />} />
            <Route path="/company" element={<Company />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
