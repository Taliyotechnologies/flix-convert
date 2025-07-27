import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Image, 
  Video, 
  FileText, 
  Music, 
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Clock,
  Users,
  Star,
  TrendingUp
} from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Image,
      title: 'Image Compression',
      description: 'Compress images without losing quality. Support for JPG, PNG, WebP, and more.',
      color: 'from-pink-500 to-rose-500',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)'
    },
    {
      icon: Video,
      title: 'Video Conversion',
      description: 'Convert videos between formats. MP4, AVI, MOV, and many more supported.',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)'
    },
    {
      icon: FileText,
      title: 'PDF Tools',
      description: 'Compress PDFs, convert to different formats, and merge documents.',
      color: 'from-red-500 to-pink-500',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)'
    },
    {
      icon: Music,
      title: 'Audio Processing',
      description: 'Convert and compress audio files. MP3, WAV, FLAC, and more formats.',
      color: 'from-green-500 to-emerald-500',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    }
  ];

  const benefits = [
    { icon: Zap, text: 'Lightning-fast processing with cloud-powered servers' },
    { icon: Shield, text: 'Secure file handling with end-to-end encryption' },
    { icon: Clock, text: 'No registration required for basic features' },
    { icon: Users, text: 'Support for all major file formats' },
    { icon: TrendingUp, text: 'Batch processing for multiple files' },
    { icon: Star, text: 'Free tier with generous limits' }
  ];

  const stats = [
    { number: '50+', label: 'File Formats', color: 'text-primary-color' },
    { number: '1M+', label: 'Files Processed', color: 'text-accent-color' },
    { number: '99.9%', label: 'Uptime', color: 'text-success-color' },
    { number: '24/7', label: 'Support', color: 'text-warning-color' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary text-white py-20 lg:py-32">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-white/5 rounded-full animate-pulse"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Convert & Compress
              <span className="block gradient-text-accent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Everything
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Professional-grade file conversion and compression tools. 
              Images, videos, PDFs, and audio files - all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in">
              <Link
                to="/tools"
                className="btn bg-white text-primary-color hover:bg-gray-100 text-lg px-8 py-4 shadow-xl"
              >
                Start Converting
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/company"
                className="btn glass border-2 border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4 backdrop-blur-sm"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-bg-secondary">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Powerful Tools
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Everything you need to convert and compress your files with professional quality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="card group hover:shadow-xl transition-all duration-500 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: feature.gradient }}
                  >
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="animate-slide-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                Why Choose FlixConvert?
              </h2>
              <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                We provide the fastest, most secure, and most reliable file conversion and compression services.
              </p>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                        <Icon size={20} className="text-white" />
                      </div>
                      <span className="text-text-primary leading-relaxed">{benefit.text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <Link
                  to="/tools"
                  className="btn btn-primary text-lg px-8 py-4 shadow-xl"
                >
                  Try Our Tools
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="card p-8 bg-gradient-to-br from-primary-color/10 to-accent-color/10 border-0 shadow-xl">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className={`text-3xl font-bold mb-2 ${stat.color}`}>{stat.number}</div>
                      <div className="text-text-secondary">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-accent rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-secondary rounded-full opacity-20 animate-float"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-secondary text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container text-center relative z-10">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join thousands of users who trust FlixConvert for their file conversion and compression needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in">
              <Link
                to="/signup"
                className="btn bg-white text-primary-color hover:bg-gray-100 text-lg px-8 py-4 shadow-xl"
              >
                Create Free Account
              </Link>
              <Link
                to="/tools"
                className="btn glass border-2 border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4 backdrop-blur-sm"
              >
                Try Without Signup
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 