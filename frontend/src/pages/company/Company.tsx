import React from 'react';

const Company: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      {/* Header Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            About
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}FlixConvert
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're on a mission to make file conversion simple, fast, and accessible to everyone.
          </p>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Founded in 2024, FlixConvert was born from a simple idea: file conversion shouldn't be complicated. 
                We believe that powerful tools should be accessible to everyone, regardless of technical expertise.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Our team of developers, designers, and file processing experts work together to create 
                the most reliable and user-friendly conversion tools on the web.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Today, we serve millions of users worldwide, helping them convert files quickly and securely 
                for their personal and professional needs.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">10M+</div>
                  <div className="text-gray-600 dark:text-gray-300">Files Converted</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">200+</div>
                  <div className="text-gray-600 dark:text-gray-300">File Formats</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">99.9%</div>
                  <div className="text-gray-600 dark:text-gray-300">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">24/7</div>
                  <div className="text-gray-600 dark:text-gray-300">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mission & Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              What drives us to create the best file conversion experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                To democratize file conversion by making professional-grade tools accessible to everyone, 
                regardless of their technical background or budget.
              </p>
            </div>

            {/* Innovation */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Innovation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We constantly push the boundaries of what's possible in file processing, 
                using cutting-edge technology to deliver faster, more reliable conversions.
              </p>
            </div>

            {/* Security */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Security First
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your privacy and data security are our top priorities. We use enterprise-grade 
                encryption and automatically delete files after processing.
              </p>
            </div>

            {/* User Experience */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                User-Centric Design
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Every feature is designed with the user in mind. We believe powerful tools 
                should be intuitive and easy to use.
              </p>
            </div>

            {/* Reliability */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Reliability
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We maintain 99.9% uptime and process millions of files daily. 
                Our infrastructure is built for scale and reliability.
              </p>
            </div>

            {/* Community */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Community Driven
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We listen to our users and build features based on their needs. 
                Your feedback shapes the future of our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              The talented people behind FlixConvert
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                JD
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                John Doe
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">
                CEO & Founder
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Experienced entrepreneur with 10+ years in tech industry. 
                Passionate about making technology accessible to everyone.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                JS
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Jane Smith
              </h3>
              <p className="text-green-600 dark:text-green-400 font-semibold mb-4">
                CTO
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Expert in file processing and conversion technologies. 
                Leads our technical strategy and product development.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                MJ
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Mike Johnson
              </h3>
              <p className="text-purple-600 dark:text-purple-400 font-semibold mb-4">
                Lead Developer
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Full-stack developer specializing in modern web technologies. 
                Ensures our platform is fast, reliable, and user-friendly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Comprehensive file conversion solutions for all your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Image Conversion
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Convert images between JPG, PNG, GIF, WebP, and more formats with quality preservation.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Batch processing</li>
                <li>• Quality preservation</li>
                <li>• Multiple formats</li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Video Conversion
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Convert videos between MP4, AVI, MOV, MKV, and more formats with high quality output.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• High quality output</li>
                <li>• Fast processing</li>
                <li>• Multiple resolutions</li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Audio Conversion
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Convert audio files between MP3, WAV, FLAC, AAC, and more formats with lossless quality.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Lossless conversion</li>
                <li>• Metadata preservation</li>
                <li>• Batch processing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Company; 