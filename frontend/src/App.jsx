import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useLocation, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common';
import { Footer } from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import ImageCompress from './pages/ImageCompress';
import VideoCompress from './pages/VideoCompress';
import PDFCompress from './pages/PDFCompress';
import AudioCompress from './pages/AudioCompress';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import FileConverter from './pages/FileConverter';
import ChangePassword from './pages/ChangePassword';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminContacts from './pages/AdminContacts';
import AdminData from './pages/AdminData';
import AdminSettings from './pages/AdminSettings';

function App() {
  // theme: 'light' | 'dark' | 'system'
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return 'system';
  });

  // Actual theme to apply
  const [appliedTheme, setAppliedTheme] = useState('dark');

  useEffect(() => {
    let t = theme;
    if (theme === 'system') {
      t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    setAppliedTheme(t);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(t);
  }, [theme]);

  // Listen to system theme changes if 'system' selected
  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      setAppliedTheme(mq.matches ? 'dark' : 'light');
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(mq.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
    // Save to localStorage
    setTimeout(() => localStorage.setItem('theme', theme), 0);
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar theme={appliedTheme} toggleTheme={toggleTheme} setTheme={setTheme} themeMode={theme} />
        <AppContent setTheme={setTheme} themeMode={theme} />
      </Router>
    </AuthProvider>
  );
}

function AppContent({ setTheme, themeMode }) {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isAdmin = location.pathname.startsWith('/admin');

  // Scroll to top on every route change
  // This ensures every new page starts at the top
  // Place just before <Routes>
  
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<ImageCompress />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/image-compress" element={<ImageCompress />} />
        <Route path="/video-compress" element={<VideoCompress />} />
        <Route path="/pdf-compress" element={<PDFCompress />} />
        <Route path="/audio-compress" element={<AudioCompress />} />
        <Route path="/file-converter" element={<FileConverter />} />
        <Route path="/dashboard/*" element={<Dashboard setTheme={setTheme} themeMode={themeMode} />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/contacts" element={<AdminContacts />} />
        <Route path="/admin/data" element={<AdminData />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Routes>
      
      {!isDashboard && !isAdmin && <Footer />}
    </>
  );
}

export default App;
