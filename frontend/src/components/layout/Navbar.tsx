import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <div>
        <Link to="/">FlixConvert</Link>
      </div>
      
      <div>
        <Link to="/">Home</Link>
        <Link to="/tools">Tools</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/company">About</Link>
      </div>
      
      <div>
        <button>Theme</button>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar; 