import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../App';
import './Navbar.css';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Compress', dropdown: [
    { label: 'Image', to: '/compress/image' },
    { label: 'Video', to: '/compress/video' },
    { label: 'Audio', to: '/compress/audio' },
    { label: 'PDF', to: '/compress/pdf' },
  ]},
  { label: 'Convert', to: '/convert' },
  { label: 'Company', dropdown: [
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Owner', to: '/owner' },
  ]},
  { label: 'Login', to: '/login', className: 'btn-login' },
  { label: 'Sign Up', to: '/signup', className: 'btn-signup' },
];

const Navbar = () => null;
export default Navbar; 