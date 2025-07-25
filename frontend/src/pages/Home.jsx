import React from 'react';
import './Home.css';

const features = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="14" fill="#7F5AF0"/><path d="M16 24h16" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
    ),
    title: 'Compress',
    desc: 'Reduce file size for images, videos, audio, and PDFs with advanced algorithms.'
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="14" fill="#2CB67D"/><path d="M24 16v16" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
    ),
    title: 'Convert',
    desc: 'Convert files between formats quickly and easily, supporting all major types.'
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="14" fill="#FBBF24"/><path d="M16 32l8-8 8 8" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
    ),
    title: 'Quality',
    desc: 'Get great results with minimum 50% compression and no compromise on quality.'
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="14" fill="#FF6F91"/><path d="M24 12v24" stroke="#fff" strokeWidth="3" strokeLinecap="round"/><path d="M12 24h24" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
    ),
    title: 'Secure',
    desc: 'Your files are never stored. 100% privacy and security guaranteed.'
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="14" fill="#00C9A7"/><path d="M16 32l8-16 8 16" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
    ),
    title: 'Fast',
    desc: 'Process files in seconds with our optimized engine.'
  },
];

const howSteps = [
  { icon: '1', title: 'Upload', desc: 'Choose your file(s) to compress or convert.' },
  { icon: '2', title: 'Select Tool', desc: 'Pick the format or compression type you need.' },
  { icon: '3', title: 'Process', desc: 'Let ConvertFlix work its magic in seconds.' },
  { icon: '4', title: 'Download', desc: 'Get your optimized or converted file instantly.' },
];

const trustBadges = [
  { icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="#2CB67D"/><path d="M8 14l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>, label: 'Trusted by 10,000+ users' },
  { icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="#7F5AF0"/><path d="M14 8v8l4 2" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>, label: 'Lightning Fast' },
  { icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="#FBBF24"/><path d="M10 14l2 2 6-6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>, label: '100% Secure' },
  { icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="#FF6F91"/><path d="M14 8v8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><circle cx="14" cy="20" r="1.5" fill="#fff"/></svg>, label: 'No sign-up required' },
];

const explore = [
  { label: 'Image Compressor', desc: 'Shrink images for web, email, or storage.', to: '/compress/image', color: '#7F5AF0' },
  { label: 'Video Compressor', desc: 'Compress videos with high quality.', to: '/compress/video', color: '#2CB67D' },
  { label: 'Audio Compressor', desc: 'Reduce audio file size for sharing.', to: '/compress/audio', color: '#FBBF24' },
  { label: 'PDF Compressor', desc: 'Make PDFs smaller for easy upload.', to: '/compress/pdf', color: '#FF6F91' },
  { label: 'Image Converter', desc: 'Convert images between formats.', to: '/convert/image', color: '#00C9A7' },
  { label: 'Video Converter', desc: 'Convert videos between formats.', to: '/convert/video', color: '#7F5AF0' },
  { label: 'Audio Converter', desc: 'Convert audio files easily.', to: '/convert/audio', color: '#2CB67D' },
  { label: 'PDF Converter', desc: 'Convert PDFs to and from other formats.', to: '/convert/pdf', color: '#FBBF24' },
];

const faqs = [
  { q: 'Is ConvertFlix free to use?', a: 'Yes! All tools are free and require no sign-up.' },
  { q: 'Are my files safe?', a: 'Absolutely. Files are processed in-memory and never stored.' },
  { q: 'How fast is the compression/conversion?', a: 'Most files are processed in under 10 seconds.' },
  { q: 'What file types are supported?', a: 'All major image, video, audio, and PDF formats are supported.' },
];

const Home = () => null;
export default Home; 