import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tools from './pages/Tools';
import ToolPage from './pages/ToolPage';
import Login from './pages/Login';
import Admin from './pages/Admin';
import './App.css';

function App() {
  return (
    <>
      <Helmet>
        <title>ConvertFlix - File Compression & Conversion Tool</title>
        <meta name="description" content="Free online file compression and conversion tool. Compress images, videos, audio, and PDFs. Convert files to different formats easily." />
      </Helmet>
      
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tool/:type" element={<ToolPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App; 