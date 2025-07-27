import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <section>
        <div>
          <h1>Convert Files with Ease</h1>
          <p>Professional file conversion tools for all your needs. Convert images, videos, audio, and documents with just a few clicks.</p>
          <Link to="/tools">Get Started</Link>
        </div>
      </section>

      <section>
        <div>
          <h2>Our Features</h2>
          <div>
            <div>
              <h3>Image Conversion</h3>
              <p>Convert between JPG, PNG, GIF, WebP and more formats</p>
            </div>
            <div>
              <h3>Video Conversion</h3>
              <p>Convert videos between MP4, AVI, MOV, MKV formats</p>
            </div>
            <div>
              <h3>Audio Conversion</h3>
              <p>Convert audio files between MP3, WAV, FLAC, AAC</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div>
          <h2>Why Choose FlixConvert?</h2>
          <div>
            <div>
              <h3>Fast Processing</h3>
              <p>Convert files in seconds with our optimized algorithms</p>
            </div>
            <div>
              <h3>Secure & Private</h3>
              <p>Your files are encrypted and automatically deleted after processing</p>
            </div>
            <div>
              <h3>Free to Use</h3>
              <p>No hidden fees or subscriptions required</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 