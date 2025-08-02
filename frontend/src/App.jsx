import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Tools from './pages/Tools.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ToolPage from './pages/ToolPage.jsx'
import Company from './pages/Company.jsx'

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