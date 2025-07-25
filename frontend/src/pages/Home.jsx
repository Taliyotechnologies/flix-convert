import React from 'react';
import './Home.css';

const icons = {
  image: (
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#6366F1"/><path d="M8 24l6-8 4 5 4-6 2 3v6H8z" fill="#fff"/><rect x="8" y="8" width="16" height="16" rx="4" stroke="#fff" strokeWidth="2"/></svg>
  ),
  video: (
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#6366F1"/><rect x="8" y="10" width="10" height="12" rx="2" stroke="#fff" strokeWidth="2"/><path d="M22 13v6l4 2V11l-4 2z" fill="#fff"/></svg>
  ),
  audio: (
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#6366F1"/><rect x="10" y="12" width="4" height="8" rx="2" fill="#fff"/><rect x="18" y="8" width="4" height="16" rx="2" fill="#fff"/></svg>
  ),
  pdf: (
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#6366F1"/><rect x="10" y="8" width="12" height="16" rx="2" stroke="#fff" strokeWidth="2"/><path d="M14 12h4M14 16h4M14 20h4" stroke="#fff" strokeWidth="2"/></svg>
  ),
  convert: (
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#6366F1"/><path d="M10 16c0-3.3 2.7-6 6-6h2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><path d="M22 16c0 3.3-2.7 6-6 6h-2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><polyline points="18,10 22,10 22,14" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="14,22 10,22 10,18" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  about: (
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#6366F1"/><circle cx="16" cy="16" r="6" stroke="#fff" strokeWidth="2"/><rect x="15" y="12" width="2" height="6" rx="1" fill="#fff"/><rect x="15" y="20" width="2" height="2" rx="1" fill="#fff"/></svg>
  ),
  contact: (
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#6366F1"/><rect x="8" y="10" width="16" height="12" rx="3" stroke="#fff" strokeWidth="2"/><path d="M8 12l8 6 8-6" stroke="#fff" strokeWidth="2"/></svg>
  ),
  owner: (
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#6366F1"/><circle cx="16" cy="14" r="4" fill="#fff"/><rect x="10" y="20" width="12" height="4" rx="2" fill="#fff"/></svg>
  ),
  login: (
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#6366F1"/><circle cx="16" cy="14" r="4" fill="#fff"/><rect x="12" y="20" width="8" height="2" rx="1" fill="#fff"/></svg>
  ),
  signup: (
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#6366F1"/><circle cx="16" cy="14" r="4" fill="#fff"/><rect x="12" y="20" width="8" height="2" rx="1" fill="#fff"/><rect x="15" y="23" width="2" height="4" rx="1" fill="#fff"/></svg>
  ),
  fast: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#6366F1"/><path d="M7 12h10M13 8l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  secure: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#6366F1"/><rect x="7" y="10" width="10" height="7" rx="2" stroke="#fff" strokeWidth="2"/><path d="M12 14v2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
  ),
  quality: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#6366F1"/><path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  free: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#6366F1"/><path d="M8 12h8M12 8v8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
  ),
  easy: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#6366F1"/><circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="2"/><path d="M12 8v4l2 2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
  ),
};

const details = [
  { href: '/compress/image', icon: icons.image, label: 'Image Compress', desc: 'Shrink images for web, email, or storage.' },
  { href: '/compress/video', icon: icons.video, label: 'Video Compress', desc: 'Reduce video file size with high quality.' },
  { href: '/compress/audio', icon: icons.audio, label: 'Audio Compress', desc: 'Compress audio files for sharing or archiving.' },
  { href: '/compress/pdf', icon: icons.pdf, label: 'PDF Compress', desc: 'Make PDF files smaller for easy upload.' },
  { href: '/convert', icon: icons.convert, label: 'File Convert', desc: 'Convert files between formats instantly.' },
  { href: '/about', icon: icons.about, label: 'About', desc: 'Learn more about ConvertFlix.' },
  { href: '/contact', icon: icons.contact, label: 'Contact', desc: 'Get in touch with our team.' },
  { href: '/owner', icon: icons.owner, label: 'Owner', desc: 'Meet the creator of ConvertFlix.' },
  { href: '/login', icon: icons.login, label: 'Login', desc: 'Access your account.' },
  { href: '/signup', icon: icons.signup, label: 'Sign Up', desc: 'Create a new account.' },
];

const trustBadges = [
  { icon: icons.fast, label: 'Super Fast' },
  { icon: icons.secure, label: 'Secure & Private' },
  { icon: icons.quality, label: 'No Quality Loss' },
  { icon: icons.free, label: 'Free to Use' },
  { icon: icons.easy, label: 'Easy to Use' },
];

const Home = () => null;
export default Home; 