import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Image, 
  Video, 
  FileText, 
  Music, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Image,
      title: 'Image Compression',
      description: 'Compress images without losing quality. Support for JPG, PNG, WebP, and more.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Video,
      title: 'Video Conversion',
      description: 'Convert videos between formats. MP4, AVI, MOV, and many more supported.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FileText,
      title: 'PDF Tools',
      description: 'Compress PDFs, convert to different formats, and merge documents.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Music,
      title: 'Audio Processing',
      description: 'Convert and compress audio files. MP3, WAV, FLAC, and more formats.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const benefits = [
    'Fast processing with cloud-powered servers',
    'Secure file handling with end-to-end encryption',
    'No registration required for basic features',
    'Support for all major file formats',
    'Batch processing for multiple files',
    'Free tier with generous limits'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary text-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Convert & Compress
              <span className="block text-accent-color">Everything</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Professional-grade file conversion and compression tools. 
              Images, videos, PDFs, and audio files - all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/tools"
                className="btn bg-white text-primary-color hover:bg-gray-100 text-lg px-8 py-4"
              >
                Start Converting
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/company"
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary-color text-lg px-8 py-4"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white rounded-full"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-bg-secondary">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Tools</h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Everything you need to convert and compress your files with professional quality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card group hover:shadow-lg transition-all duration-300">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-text-secondary">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Why Choose FlixConvert?
              </h2>
              <p className="text-xl text-text-secondary mb-8">
                We provide the fastest, most secure, and most reliable file conversion and compression services.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-success-color flex-shrink-0" />
                    <span className="text-text-primary">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  to="/tools"
                  className="btn btn-primary text-lg px-8 py-4"
                >
                  Try Our Tools
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="card p-8 bg-gradient-to-br from-primary-color/10 to-accent-color/10">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-color mb-2">50+</div>
                    <div className="text-text-secondary">File Formats</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-color mb-2">1M+</div>
                    <div className="text-text-secondary">Files Processed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-success-color mb-2">99.9%</div>
                    <div className="text-text-secondary">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-warning-color mb-2">24/7</div>
                    <div className="text-text-secondary">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-secondary text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of users who trust FlixConvert for their file conversion and compression needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="btn bg-white text-primary-color hover:bg-gray-100 text-lg px-8 py-4"
            >
              Create Free Account
            </Link>
            <Link
              to="/tools"
              className="btn border-2 border-white text-white hover:bg-white hover:text-primary-color text-lg px-8 py-4"
            >
              Try Without Signup
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 