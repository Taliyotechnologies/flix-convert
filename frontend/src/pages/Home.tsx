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
      <section className="relative overflow-hidden bg-gradient-hero text-white section-padding">
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-40 h-40 bg-white/10 rounded-full animate-float blur-xl"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-white/10 rounded-full animate-float blur-xl" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full animate-float blur-xl" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-28 h-28 bg-white/5 rounded-full animate-pulse blur-lg"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-white/5 rounded-full animate-float blur-lg" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Convert & Compress
              <span className="block gradient-text-accent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Everything
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-4xl mx-auto leading-relaxed">
              Professional-grade file conversion and compression tools. 
              Images, videos, PDFs, and audio files - all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-in">
              <Link
                to="/tools"
                className="btn bg-white text-primary-color hover:bg-gray-100 text-lg px-10 py-5 shadow-2xl rounded-2xl"
              >
                Start Converting
                <ArrowRight size={24} />
              </Link>
              <Link
                to="/company"
                className="btn glass border-2 border-white/20 text-white hover:bg-white/10 text-lg px-10 py-5 rounded-2xl backdrop-blur-sm"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-bg-secondary">
        <div className="container">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Powerful Tools
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Everything you need to convert and compress your files with professional quality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="card group hover:shadow-2xl transition-all duration-500 animate-fade-in rounded-3xl"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div 
                    className="w-20 h-20 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                    style={{ background: feature.gradient }}
                  >
                    <Icon size={36} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-lg">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="animate-slide-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">
                Why Choose FlixConvert?
              </h2>
              <p className="text-xl text-text-secondary mb-10 leading-relaxed">
                We provide the fastest, most secure, and most reliable file conversion and compression services.
              </p>
              
              <div className="space-y-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-start gap-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                        <Icon size={24} className="text-white" />
                      </div>
                      <span className="text-text-primary leading-relaxed text-lg">{benefit.text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-12">
                <Link
                  to="/tools"
                  className="btn btn-primary text-lg px-10 py-5 shadow-2xl rounded-2xl"
                >
                  Try Our Tools
                  <ArrowRight size={24} />
                </Link>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="card p-10 bg-gradient-to-br from-primary-color/10 to-accent-color/10 border-0 shadow-2xl rounded-3xl">
                <div className="grid grid-cols-2 gap-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className={`text-4xl font-bold mb-3 ${stat.color}`}>{stat.number}</div>
                      <div className="text-text-secondary text-lg">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Enhanced floating elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-accent rounded-full opacity-20 animate-pulse blur-lg"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-secondary rounded-full opacity-20 animate-float blur-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-secondary text-white relative overflow-hidden">
        {/* Enhanced background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full animate-float blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-float blur-xl" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full animate-pulse blur-lg"></div>
        </div>
        
        <div className="container text-center relative z-10">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join thousands of users who trust FlixConvert for their file conversion and compression needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-in">
              <Link
                to="/signup"
                className="btn bg-white text-primary-color hover:bg-gray-100 text-lg px-10 py-5 shadow-2xl rounded-2xl"
              >
                Create Free Account
              </Link>
              <Link
                to="/tools"
                className="btn glass border-2 border-white/20 text-white hover:bg-white/10 text-lg px-10 py-5 rounded-2xl backdrop-blur-sm"
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