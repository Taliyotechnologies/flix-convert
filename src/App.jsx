import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import ToolPage from './pages/ToolPage';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tool/:type" element={<ToolPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App; 