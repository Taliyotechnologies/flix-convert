import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Tools from './pages/Tools'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ToolPage from './pages/ToolPage'
import Company from './pages/Company'

function App() {
  return (
    <>
      <Helmet>
        <title>ConvertFlix - Free File Compression & Conversion Tool</title>
        <meta name="description" content="ConvertFlix - Free file compression and conversion tool. Compress images, convert audio, and more instantly." />
      </Helmet>
      
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tool/:type" element={<ToolPage />} />
            <Route path="/company" element={<Company />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App 