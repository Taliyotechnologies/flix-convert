import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './components/Navbar.css';
import './components/Footer.css';
import './pages/Home.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 