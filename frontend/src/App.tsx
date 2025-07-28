import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Tools from './pages/tools/Tools';
import ConvertImage from './pages/tools/ConvertImage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Contact from './pages/Contact';
import Company from './pages/company/Company';
import About from './pages/company/About';
import CompanyContact from './pages/company/Contact';
import Owners from './pages/company/Owners';
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/convert/image" element={<ConvertImage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/company" element={<Company />} />
              <Route path="/company/about" element={<About />} />
              <Route path="/company/contact" element={<CompanyContact />} />
              <Route path="/company/owners" element={<Owners />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
