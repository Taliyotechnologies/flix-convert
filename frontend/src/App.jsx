import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

import React, { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Persist theme in localStorage
    const stored = localStorage.getItem('darkMode');
    return stored ? JSON.parse(stored) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.classList.toggle('dark', darkMode);
    document.body.classList.toggle('light', !darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <Router>
      <div className={`app-container${darkMode ? ' dark' : ' light'}`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add other routes here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 